import { BASE_SYSTEM_PROMPT } from "../../lib/constants";
import OpenAI from "openai";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const client = new OpenAI({ 
  apiKey: process.env.OPENAI_API_KEY,
  baseURL: "https://ai-gateway.helicone.ai/v1",
  defaultHeaders: {
    "Helicone-Auth": `Bearer ${process.env.HELICONE_API_KEY}`,
  },
});

type Msg = { role: "system" | "user" | "assistant"; content: string };

function clampHistory(messages: Msg[], max = 12) {
  return Array.isArray(messages) ? messages.slice(-max) : [];
}

function detectIntent(lastUser: string) {
  const t = (lastUser || "").toLowerCase();
  if (/(cv|resume|curriculum|pdf)/.test(t)) return "cv";
  if (/(contacto|contact|email|correo|linkedin)/.test(t)) return "contact";
  if (/(proyecto|case|caso|fc barcelona|inditex|repsol|cofares)/.test(t)) return "cases";
  if (/(stack|tech|tecnolog|framer|react|next|tokens|design system)/.test(t)) return "tech";
  return "general";
}

function buildSystemPrompt(intent: string) {
  // Ahora usamos la constante que viene del otro archivo
  const base = BASE_SYSTEM_PROMPT;

  const addon = 
    intent === "cv" ? "\nEnfócate en resumen profesional + qué incluye el CV.\n" :
    intent === "contact" ? "\nEnfócate en cómo contactar y qué info necesita.\n" :
    intent === "cases" ? "\nRecomienda 2 casos relevantes y por qué.\n" :
    intent === "tech" ? "\nExplica stack/herramientas y decisiones.\n" : 
    "\n";

  return base + addon;
}

// En app/api/chat/route.ts

// En app/api/chat/route.ts

export async function POST(req: Request) {
  const body = await req.json().catch(() => ({}));
  const incoming: Msg[] = clampHistory(body.messages || []);

  // Extraemos la última pregunta para Helicone
  const lastUser = [...incoming].reverse().find(m => m.role === "user")?.content ?? "";

  const completion = await client.chat.completions.create(
    {
      model: "gpt-4o-mini",
      messages: [
        // 1. Ponemos el System Prompt puro (el de constants.ts)
        { role: "system", content: BASE_SYSTEM_PROMPT },
        // 2. Pasamos todo el historial que viene de la web
        ...incoming 
      ],
      temperature: 0.7, // Subimos un poco para mejorar la fluidez como en el Playground
    },
    {
      headers: {
        "Helicone-Property-User-Question": lastUser,
      },
    }
  );

  return Response.json({
    reply: completion.choices[0]?.message?.content?.trim() ?? "",
  });
}
