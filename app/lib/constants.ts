/* =========================
   constants.ts — Portfolio Assistant Knowledge Pack
   Fuente: CV Santiago Lobos (métricas publicables)
   ========================= */

export type Locale = "es-ES" | "en-US"

export type FAQPreset = {
  id: string
  locale: Locale
  triggers: string[]
  answer: string
  followups?: string[]
}

/**
 * FAQ_NODE (embeddings-first)
 * - Source of truth: answer + searchText
 * - match: fallback lexical
 * - followupIds: conversación guiada
 */
export type FAQNode = {
  id: string
  locale: Locale
  question: string
  answer: string

  // guided conversation
  followupIds?: string[]

  // Retrieval
  match?: string[]
  searchText: string
}

/**
 * (Opcional) Si mañana vuelves a introducir metadata,
 * hazlo sin ensuciar el retrieval core.
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

export type FAQAnticipated = {
  id: string
  locale: Locale
  question: string
  match: string[]
  answer: string
  followups?: string[]
}

// ✅ Re-export de datasets (sin romper imports)
export { FAQ_PRESETS } from "./faq/presets"
export { FAQ_GRAPH } from "./faq/graph"
export { FAQ_ANTICIPATED } from "./faq/anticipated"

// ===============================
// SANTI.GPT – AI CONTRACT
// ===============================

export const BASE_SYSTEM_PROMPT = `
Eres SANTI.GPT, el representante exclusivo del portfolio de Santiago Lobos (Santi), Senior Product Designer.

IDENTIDAD Y REGLAS DE ORO:
1. FOCO TOTAL: Solo puedes hablar de la trayectoria de Santi, sus proyectos, educación y habilidades técnicas contenidas en su CV.
2. NO INVENTES: Si te preguntan algo que no está en el perfil (ej. datos históricos del FC Barcelona, clima, política, o vida personal no profesional), responde: "Mi conocimiento se limita a la trayectoria profesional de Santi. Puedo contarte sobre el proyecto de [Proyecto Relacionado] que él realizó, pero no tengo información sobre otros temas."
3. PRIMERA PERSONA: Habla siempre como si fueras Santi (ej: "Yo diseñé...", "En mi experiencia...").
4. FILTRO DE CONTEXTO: Si el usuario menciona una institución (ej. "FC Barcelona"), redirige la respuesta inmediatamente a los aportes de Santi para ese cliente (Checkout y App de Socios). Nunca hables del club como institución deportiva.

TONO Y ESTILO:
- Español neutro, profesional y directo.
- Respuestas escaneables con frases cortas.
- Cero emojis y cero markdown complejo.

FORMATO OBLIGATORIO (JSON):
Devuelve SIEMPRE un JSON válido:
{
  "reply": "Tu respuesta aquí. Si el usuario pregunta '¿donde estudiaste?', responde basándote exclusivamente en su educación: Bachiller en Diseño Multimedia (U. de Málaga) y Másteres en Digital Product Design y Design Systems.",
  "followups": ["pregunta corta 1", "pregunta corta 2"]
}

Reglas de campos:
- "reply": Texto plano.
- "followups": Array de 1 a 3 strings (6-90 caracteres). Deben invitar a seguir explorando los proyectos de Santi.

REGLA DE REDIRECCIÓN (FOLLOWUPS):
- Si el usuario pregunta por un tema general (ej. Historia del FC Barcelona, ubicación de una oficina, etc.) y no puedes responder directamente:
- Los followups DEBEN ser invitaciones directas a tus proyectos relacionados.
- Ejemplo: Si preguntan por el Barça, los followups deben ser: ["Cuéntame sobre el rediseño del FCB Store", "Cómo rediseñaste la app de socios del FC Barcelona"]. Si preguntan por Repsol, los followups deben ser: ["Cuéntame sobre el rediseño del portal del empleado de Repsol"] 
- Si preguntan por estudios generales, los followups deben ser: ["¿Cuál es tu formación?", "¿Qué herramientas de diseño dominas?"]
`.trim()

/* =========================
   11) SAFE FOLLOWUP POOLS
   ========================= */
export const SAFE_FOLLOWUP_POOLS = {
  general: [
    "¿Quieres que te cuente un proyecto con métricas (Repsol / FC Barcelona / Cofares)?",
    "¿Te interesa más mi enfoque en Design Systems o en optimización de conversión?",
    "¿Prefieres proceso (discovery → delivery) o resultados e impacto?",
  ],
  topPriorityExamples: [
    "¿Empezamos por el portal global de Repsol o por el e-commerce de FC Barcelona?",
    "¿Quieres un ejemplo de Design System con ROI (Cofares) o una plataforma operativa (Mediapro)?",
    "¿Te interesa un caso fintech con behavioural UX (Depasify)?",
  ],
  designSystems: [
    "¿Cómo estructuro tokens y gobernanza en un Design System agnóstico?",
    "¿Qué trade-offs manejo entre consistencia y velocidad de entrega?",
    "¿Quieres un ejemplo práctico con tokens + Storybook/Style Dictionary?",
  ],
  ecommerce: [
    "¿Qué palancas movimos en el checkout de FC Barcelona y por qué?",
    "¿Cómo priorizo hipótesis en CRO cuando hay presión por resultados?",
    "¿Te interesa más checkout o discovery/catálogo?",
  ],
  leadership: [
    "¿Cómo alineo diseño, negocio e ingeniería cuando hay visiones opuestas?",
    "¿Cómo facilito workshops para desbloquear decisiones y avanzar?",
    "¿Quieres ejemplos de mentoring o liderazgo horizontal?",
  ],
  outOfScopeRedirect: [
    "¿Qué tipo de rol estás cubriendo y qué esperas de esa posición?",
    "¿Te interesa que hable de impacto y métricas en proyectos similares?",
    "¿Quieres ver cómo tomo decisiones y trade-offs en un caso real?",
  ],
} as const

/* =========================
   12) MAPA FOLLOWUP FIJOS
   ========================= */
export const FIXED_FOLLOWUPS = {
  repsol: [
    "¿Cómo llevaste a cabo el proceso de investigación?",
    "¿Qué funcionalidades clave diseñaste para mejorar la productividad?",
    "¿Cuál fue el impacto real del nuevo portal?",
  ],
  fcb: [
    "Cuéntame sobre el proyecto del FC Barcelona",
    "¿Qué palancas movimos en el checkout de FC Barcelona y por qué?",
    "¿Cómo rediseñaste la app de socios y ticketing?",
  ],
  cofares: [
    "Cuéntame sobre el proyecto de Cofares",
    "¿Cómo estructuro tokens y gobernanza en un Design System agnóstico?",
    "¿Qué impacto y ROI generó el Design System?",
  ],
} as const
