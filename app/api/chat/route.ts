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

export async function POST(req: Request) {
  const body = await req.json().catch(() => ({}));
  
  // ESTO ES PARA DEPURAR: Veremos en la consola de Vercel qué llega
  console.log("Cuerpo recibido:", JSON.stringify(body));

  // Intentamos capturar los mensajes de varias formas comunes
  const incoming = body.messages || body.history || [];
  
  // Capturamos la pregunta
  const lastUser = [...incoming].reverse().find((m: any) => m.role === "user")?.content 
    || body.prompt // A veces los widgets envían el texto en 'prompt'
    || "Pregunta no encontrada en el JSON";

  const completion = await client.chat.completions.create(
    {
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: BASE_SYSTEM_PROMPT },
        ...incoming
      ],
      temperature: 0.7,
    },
    {
      headers: {
        "Helicone-Property-User-Question": String(lastUser),
      },
    }
  );

  return Response.json({
    reply: completion.choices[0]?.message?.content?.trim() ?? "",
  });
}