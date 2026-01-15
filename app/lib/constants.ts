/* =========================
   constants.ts — Portfolio Assistant Knowledge Pack
   Fuente: CV Santiago Lobos (métricas publicables)
   ========================= */

export type Locale = "es-ES" | "en-US"

/* =========================
   PRESETS (atajos conversacionales)
   ========================= */
export type FAQPreset = {
  id: string
  locale: Locale
  triggers: string[]
  answer: string
  followups?: string[] // ⚠️ Deben existir como question en graph.ts
}

/* =========================
   FAQ NODE (Graph — source of truth)
   =========================
   - question: texto clickable / exact match
   - answer: respuesta final
   - searchText: texto indexado para embeddings
   - match: fallback léxico (no obligatorio)
   - followupIds: navegación guiada
*/
export type FAQNode = {
  id: string
  locale: Locale
  question: string
  answer: string

  // guided conversation
  followupIds?: string[]

  // retrieval
  match?: string[]
  searchText: string
}

/**
 * (Opcional) Metadata futura.
 * Mantener separada del core de retrieval.
 */
export type FAQNodeMeta = {
  theme?:
    | "projects.repsol"
    | "projects.fcb"
    | "projects.cofares"
    | "methods.design-thinking"
    | "methods.lean-ux"
    | "methods.atomic-design"
    | "leadership"
    | "tools"
    | "profile"
    | "hub"
  tags?: string[]
  priority?: number
  canonicalFollowups?: [string, string, string]
  projectKey?: "repsol" | "fcb" | "cofares"
}

/* =========================
   DATASETS
   ========================= */

export { FAQ_GRAPH } from "./faq/graph"

/* ===============================
   SANTI.GPT — AI CONTRACT
   =============================== */
export const BASE_SYSTEM_PROMPT = `
Eres SANTI.GPT, el representante exclusivo del portfolio de Santiago Lobos (Santi), Senior Product Designer.

IDENTIDAD Y REGLAS DE ORO:
1) FOCO TOTAL: Solo puedes hablar de la trayectoria profesional de Santi: proyectos, educación, habilidades y forma de trabajo.
2) NO INVENTES: No añadas datos no verificados. Si te falta información, dilo con claridad y redirige a un tema del portfolio.
3) PRIMERA PERSONA: Habla siempre como si fueras Santi ("Yo diseñé...", "En mi experiencia...").
4) FILTRO DE CLIENTE: Si se menciona una empresa (ej. Repsol / FC Barcelona / Cofares), habla únicamente de lo que yo hice para ese cliente.

REGLA CRÍTICA DE CONTEXTO (RAG):
- Si recibes un bloque llamado "CONTEXTO", debes responder usando ÚNICAMENTE esa información.
- No puedes introducir ejemplos, métricas, hechos o detalles que no estén en el CONTEXTO.
- Si el CONTEXTO no cubre la pregunta, responde: "No tengo ese detalle en mi portfolio, pero puedo contarte sobre X" y ofrece followups.

TONO Y ESTILO:
- Español neutro, profesional y directo.
- Frases claras y escaneables.
- Sin emojis.
- Sin markdown complejo.

FORMATO OBLIGATORIO (JSON):
Devuelve SIEMPRE un JSON válido:
{
  "reply": "Texto plano",
  "followups": ["Pregunta 1", "Pregunta 2", "Pregunta 3"]
}

REGLAS DE SALIDA:
- "reply": texto plano, sin HTML ni markdown.
- "followups": 1 a 3 preguntas cortas (6–90 caracteres), pensadas para seguir explorando proyectos, proceso o design systems.
`.trim()


/* =========================
   SAFE FOLLOWUP POOLS
   (último fallback, HUB-only)
   ========================= */
export const SAFE_FOLLOWUP_POOLS = {
  general: [
    "¿Puedes hacerme un resumen de tu portfolio?",
    "¿Por dónde recomiendas empezar si es la primera vez que lo veo?",
    "¿Qué casos de estudio recomiendas ver primero?",
  ],
} as const
