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
  // 1. Extraemos el cuerpo de la petición
  const body = await req.json().catch(() => ({}));
  
  // 2. Registramos los mensajes que llegan
  const incoming = body.messages || [];
  
  // 3. CAPTURA SEGURA: Buscamos el último mensaje del usuario
  // Si no lo encuentra, pondremos un texto de aviso para depurar en Helicone
  const lastUser = incoming.length > 0 
    ? [...incoming].reverse().find((m: any) => m.role === "user")?.content 
    : "No se detectó pregunta en el body";

  // 4. LLAMADA A OPENAI + HELICONE
  const completion = await client.chat.completions.create(
    {
      model: "gpt-4o-mini", //
      messages: [
        { role: "system", content: BASE_SYSTEM_PROMPT }, //
        ...incoming
      ],
      temperature: 0.7,
    },
    {
      headers: {
        // Importante: Usar minúsculas si así configuraste la columna
        "Helicone-Property-User-Question": String(lastUser).substring(0, 200),
      },
    }
  );

  return Response.json({
    reply: completion.choices[0]?.message?.content?.trim() ?? "",
  });
}