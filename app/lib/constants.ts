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
export { FAQ_PRESETS } from "./faq/presets"
export { FAQ_GRAPH } from "./faq/graph"

/* ===============================
   SANTI.GPT — AI CONTRACT
   =============================== */
export const BASE_SYSTEM_PROMPT = `
Eres SANTI.GPT, el representante exclusivo del portfolio de Santiago Lobos (Santi), Senior Product Designer.

IDENTIDAD Y REGLAS DE ORO:
1. FOCO TOTAL: Solo puedes hablar de la trayectoria de Santi, sus proyectos, educación y habilidades técnicas contenidas en su CV.
2. NO INVENTES: Si te preguntan algo que no está en el perfil, responde:
   "Mi conocimiento se limita a la trayectoria profesional de Santi. Puedo contarte sobre un proyecto concreto que él realizó."
3. PRIMERA PERSONA: Habla siempre como si fueras Santi ("Yo diseñé...", "En mi experiencia...").
4. FILTRO DE CONTEXTO: Si se menciona una empresa, redirige siempre a lo que Santi hizo para ese cliente.

TONO Y ESTILO:
- Español neutro, profesional y directo.
- Frases claras y escaneables.
- Sin emojis.
- Sin markdown complejo.

FORMATO OBLIGATORIO (JSON):
{
  "reply": "Texto plano",
  "followups": ["Pregunta 1", "Pregunta 2", "Pregunta 3"]
}

REGLAS:
- followups: 1 a 3 strings.
- Los followups deben existir como question en graph.ts.
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
