import OpenAI from "openai";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

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
  const base = `
Eres el asistente del portfolio de Santi (Lead/Senior Product Designer).
Solo respondes sobre su experiencia, proyectos, habilidades, proceso, herramientas, impacto y contacto.
Si no tienes la info, dilo y sugiere ver el portfolio o contactar.

Responde en 3–8 líneas, directo, con bullets si ayuda.
Cierra con 1 CTA (ej: “¿Quieres ver FC Barcelona o Inditex?”).

Contexto:
- Product/UX, estrategia, research, UX/UI, design systems, IA de información.
- Casos: FC Barcelona, Inditex, Cofares, Repsol.
`.trim();

  const addon =
    intent === "cv"
      ? "\nEnfócate en resumen profesional + qué incluye el CV.\n"
      : intent === "contact"
      ? "\nEnfócate en cómo contactar y qué info necesita.\n"
      : intent === "cases"
      ? "\nRecomienda 2 casos relevantes y por qué.\n"
      : intent === "tech"
      ? "\nExplica stack/herramientas y decisiones.\n"
      : "\n";

  return base + addon;
}

export async function POST(req: Request) {
  const body = await req.json().catch(() => ({}));
  const incoming: Msg[] = clampHistory(body.messages || []);

  const lastUser = [...incoming].reverse().find(m => m.role === "user")?.content ?? "";
  const intent = detectIntent(lastUser);

  const completion = await client.chat.completions.create({
    model: "gpt-4.1-mini",
    temperature: 0.4,
    messages: [{ role: "system", content: buildSystemPrompt(intent) }, ...incoming],
  });

  return Response.json({
    intent,
    reply: completion.choices[0]?.message?.content?.trim() ?? "",
  });
}
