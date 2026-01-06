import OpenAI from "openai";
import { BASE_SYSTEM_PROMPT } from "../../lib/constants";

export const runtime = "edge";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  baseURL: "https://ai-gateway.helicone.ai/v1",
  defaultHeaders: {
    "Helicone-Auth": `Bearer ${process.env.HELICONE_API_KEY}`,
  },
});

type IncomingMsg = { role: "user" | "assistant"; content: string };

function safeJSONParse(text: string): any | null {
  try {
    return JSON.parse(text);
  } catch {
    return null;
  }
}

function normalizeFollowups(value: any): string[] {
  if (!Array.isArray(value)) return [];
  return value
    .map((x) => (typeof x === "string" ? x.trim() : ""))
    .filter((x) => x.length >= 6 && x.length <= 90)
    .slice(0, 3);
}

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => ({}));
    const incoming: IncomingMsg[] = Array.isArray(body.messages) ? body.messages : [];

    const lastUser =
      [...incoming].reverse().find((m) => m.role === "user")?.content ?? "";

    const completion = await client.chat.completions.create(
      {
        model: "gpt-4o-mini",
        temperature: 0.7,
        response_format: { type: "json_object" },
        messages: [
          { role: "system", content: BASE_SYSTEM_PROMPT },
          ...incoming.map((m) => ({ role: m.role, content: m.content })),
        ],
      },
      {
        headers: {
          "Helicone-Property-User-Question": lastUser,
        },
      } as any
    );

    const raw = completion.choices[0]?.message?.content?.trim() ?? "";
    const parsed = safeJSONParse(raw);

    const reply =
      (parsed && typeof parsed.reply === "string" ? parsed.reply : raw).trim();

    let followups = normalizeFollowups(parsed?.followups);

    // Fallback (si el modelo no manda followups bien)
    if (followups.length < 1) {
      followups = [
        "¿Quieres que te lo explique con un caso real?",
        "¿Qué métricas usarías para validarlo?",
      ];
    }

    return Response.json({ reply, followups });
  } catch (error) {
    console.error("Error en /api/chat:", error);
    return Response.json({ error: "Failed to fetch" }, { status: 500 });
  }
}
