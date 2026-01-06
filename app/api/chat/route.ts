import OpenAI from "openai";
import { NextResponse } from "next/server";
import { BASE_SYSTEM_PROMPT, FAQ_PRESETS, FAQ_GRAPH } from "../../lib/constants";

export const runtime = "edge";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  baseURL: "https://ai-gateway.helicone.ai/v1",
  defaultHeaders: {
    "Helicone-Auth": `Bearer ${process.env.HELICONE_API_KEY}`,
  },
});

type IncomingMsg = { role: "user" | "assistant"; content: string };

function matchFAQPreset(question: string, locale: string = "es-ES") {
  const q = (question ?? "").toLowerCase().trim();
  if (!q) return undefined;

  return FAQ_PRESETS.find(
    (preset) =>
      preset.locale === locale &&
      preset.triggers.some((trigger) => q.includes(trigger.toLowerCase()))
  );
}

/**
 * Para conversación guiada:
 * match exacto por "question" (porque viene de tus botones).
 */
function matchFAQGraph(question: string, locale: string = "es-ES") {
  const q = (question ?? "").toLowerCase().trim();
  if (!q) return undefined;

  return FAQ_GRAPH.find(
    (node) => node.locale === locale && node.question.toLowerCase().trim() === q
  );
}

function resolveGraphFollowups(node: (typeof FAQ_GRAPH)[number]) {
  const ids = (node.followupIds ?? []).slice(0, 3);

  return ids
    .map((id) => FAQ_GRAPH.find((n) => n.id === id))
    .filter(Boolean)
    .map((n) => n!.question);
}

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

    /* ======================================================
       1) FAQ GRAPH — conversación guiada (prioridad alta)
       ====================================================== */
    const graphNode = matchFAQGraph(lastUser, "es-ES");
    if (graphNode) {
      return NextResponse.json({
        reply: graphNode.answer,
        followups: resolveGraphFollowups(graphNode),
      });
    }

    /* ======================================================
       2) FAQ PRESETS — respuestas deterministas (home)
       ====================================================== */
    const preset = matchFAQPreset(lastUser, "es-ES");
    if (preset) {
      return NextResponse.json({
        reply: preset.answer,
        followups: preset.followups ?? [],
      });
    }

    /* ======================================================
       3) LLM — solo si NO hay preset ni graph
       ====================================================== */
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

    if (followups.length < 1) {
      followups = [
        "¿Quieres que te lo explique con un caso real?",
        "¿Qué métricas usarías para validarlo?",
      ];
    }

    return NextResponse.json({ reply, followups });
  } catch (error) {
    console.error("Error en /api/chat:", error);
    return NextResponse.json({ error: "Failed to fetch" }, { status: 500 });
  }
}
