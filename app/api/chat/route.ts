import OpenAI from "openai";
import { NextResponse } from "next/server";
// Importamos 'type Project' para que el casting del punto 4 funcione
import { BASE_SYSTEM_PROMPT, FAQ_PRESETS, FAQ_GRAPH, FAQ_ANTICIPATED, PROJECTS, type Project } from "../../lib/constants";

export const runtime = "edge";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  baseURL: "https://ai-gateway.helicone.ai/v1",
  defaultHeaders: {
    "Helicone-Auth": `Bearer ${process.env.HELICONE_API_KEY}`,
  },
});

type IncomingMsg = { role: "user" | "assistant"; content: string };

/* =========================
   Normalizer
   ========================= */
function normalizeText(text: string) {
  return (text ?? "")
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "") 
    .replace(/[¿?¡!.,;:]/g, "")      
    .replace(/[^\w\s]/gi, "")       
    .replace(/\s+/g, " ")           
    .trim();
}

/* =========================
   Matchers
   ========================= */
function matchFAQPreset(question: string, locale: string = "es-ES") {
  const q = (question ?? "").toLowerCase().trim();
  if (!q) return undefined;

  return FAQ_PRESETS.find(
    (preset) =>
      preset.locale === locale &&
      preset.triggers.some((trigger) => q.includes(trigger.toLowerCase()))
  );
}

function matchFAQAnticipated(question: string, locale: string = "es-ES") {
  const q = normalizeText(question);
  if (!q) return undefined;

  return FAQ_ANTICIPATED.find((item) => {
    if (item.locale !== locale) return false;
    return item.match.some((k) => q.includes(normalizeText(k)));
  });
}

function matchFAQGraph(question: string, locale: string = "es-ES") {
  const q = (question ?? "").toLowerCase().trim();
  if (!q) return undefined;

  return FAQ_GRAPH.find(
    (node) => node.locale === locale && node.question.toLowerCase().trim() === q
  );
}

function resolveGraphFollowups(node: (typeof FAQ_GRAPH)[number]) {
  const ids = (node.followupIds ?? []).slice(0, 5);

  return ids
    .map((id) => FAQ_GRAPH.find((n) => n.id === id))
    .filter(Boolean)
    .map((n) => n!.question);
}

/* =========================
   Helpers
   ========================= */
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

/* =========================
   POST
   ========================= */
export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => ({}));
    const incoming: IncomingMsg[] = Array.isArray(body.messages) ? body.messages : [];

    const lastUser =
      [...incoming].reverse().find((m) => m.role === "user")?.content ?? "";

    /* ======================================================
       1) FAQ GRAPH — conversación guiada
       ====================================================== */
    const graphNode = matchFAQGraph(lastUser, "es-ES");
    if (graphNode) {
      return NextResponse.json({
        reply: graphNode.answer,
        followups: resolveGraphFollowups(graphNode),
      });
    }

    /* ======================================================
       2) FAQ PRESETS — respuestas deterministas
       ====================================================== */
    const preset = matchFAQPreset(lastUser, "es-ES");
    if (preset) {
      return NextResponse.json({
        reply: preset.answer,
        followups: preset.followups ?? [],
      });
    }

    /* ======================================================
       3) FAQ_ANTICIPATED — preguntas esperables
       ====================================================== */
    const anticipated = matchFAQAnticipated(lastUser, "es-ES");
    if (anticipated) {
      return NextResponse.json({
        reply: anticipated.answer,
        followups: anticipated.followups ?? [], 
      });
    }

    /* ======================================================
       4) LLM — fallback inteligente
       ====================================================== */
    const completion = await client.chat.completions.create({
      model: "gpt-4o-mini",
      temperature: 0, 
      response_format: { type: "json_object" },
      messages: [
        { role: "system", content: BASE_SYSTEM_PROMPT },
        ...incoming.map((m) => ({ role: m.role, content: m.content })),
      ],
    });

    const raw = completion.choices[0]?.message?.content?.trim() ?? "";
    const parsed = safeJSONParse(raw);
    
    let reply = (parsed && typeof parsed.reply === "string" ? parsed.reply : raw).trim();
    let followups = normalizeFollowups(parsed?.followups);

    // Casting seguro a Project[]
    const safeProjects = (Array.isArray(PROJECTS) ? PROJECTS : []) as Project[];
    const userInput = lastUser.toLowerCase();

    const projectFound = safeProjects.find(p => {
      const clientName = p.client?.toLowerCase() || "";
      const projectId = p.id?.toLowerCase() || "";
      return (clientName && userInput.includes(clientName)) || 
             (projectId && userInput.includes(projectId.split('-')[0]));
    });

    if (projectFound) {
      const projectKey = projectFound.id.split('-')[0].toLowerCase();
      const mainNode = FAQ_GRAPH.find(node => node.id.toLowerCase().startsWith(projectKey));
      
      if (mainNode) {
        const clientName = projectFound.client;
        const summary = projectFound.oneLiner || "mejorar la experiencia digital";
        const cleanSummary = summary.charAt(0).toLowerCase() + summary.slice(1);
        
        reply = `Mi trabajo en **${clientName}** consistió en ${cleanSummary}. \n\n¿Qué te gustaría profundizar sobre este proyecto?`;
        
        if (mainNode.followupIds) {
          const realQuestions = mainNode.followupIds
            .map(id => FAQ_GRAPH.find(n => n.id === id)?.question)
            .filter(Boolean) as string[];
            
          if (realQuestions.length > 0) {
            followups = realQuestions.slice(0, 3);
          }
        }
      }
    }

    if (followups.length === 0) {
      followups = ["Ver mis proyectos", "¿Qué metodologías utilizas?", "Hablemos de mi formación"];
    }

    return NextResponse.json({ reply, followups });

  } catch (error) {
    console.error("Error en POST:", error);
    return NextResponse.json(
      { reply: "Lo siento, he tenido un error técnico. ¿Podemos intentarlo de nuevo?", followups: [] },
      { status: 500 }
    );
  }
}