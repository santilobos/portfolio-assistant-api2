/* =========================
   constants.ts (refactor pro)
   Objetivo: mejorar calidad, consistencia y control del asistente
   ========================= */

/* ---------- TYPES (opcionales pero recomendados) ---------- */
export type Locale = "es-ES" | "en-US"

export type Project = {
  id: string
  name: string
  client: string
  companyContext: string // dónde se hizo (Garaje / Elastic Heads / etc.)
  period?: string
  domain: Array<
    | "ecommerce"
    | "ticketing"
    | "design-systems"
    | "fintech"
    | "health"
    | "b2b"
    | "b2c"
    | "platform"
    | "mobile"
    | "retail"
  >
  role: string
  summary: string
  problems: string[]
  whatIDid: string[]
  outcomes: Array<
    | { kind: "metric"; value: string; note?: string }
    | { kind: "qualitative"; value: string }
  >
  methods?: string[]
  tools?: string[]
  keywords: string[]
}

export type ExperienceItem = {
  company: string
  period: string
  role: string
  highlights?: string[]
  projects?: Array<{ name: string; achievement: string }>
}

/* =========================
   1) PERFIL
   ========================= */
export const PROFESSIONAL_PROFILE = {
  name: "Santi",
  role: "Lead Product Designer",
  experience: "+8 años",
  currentLocation: "Lima, Perú (trasladado desde España por motivos familiares)",
  origin: {
    born: "Argentina (1991)",
    raised: "Málaga, España (desde los 8 años)",
    values: ["Respeto", "Esfuerzo", "Resiliencia", "Apertura cultural"],
  },
  bioNarrative:
    "Nací en Argentina y me crié en Málaga. Mi trayectoria va de ordenar problemas complejos a convertirlos en productos claros, escalables y bonitos (sin perder foco en negocio).",
  positioning: {
    strengths: [
      "UX strategy + ejecución (de discovery a delivery)",
      "Design systems y tokens (agnostic, multi-theme)",
      "Optimización de funnels y experiencia de compra",
      "Colaboración fuerte con PM/Engineering",
    ],
    whatImKnownFor: [
      "Bajar deuda de diseño",
      "Alinear stakeholders con decisiones basadas en evidencia",
      "Documentar sin burocracia",
      "Cuidar microinteracciones y calidad percibida",
    ],
  },
} as const

/* =========================
   2) EDUCACIÓN
   ========================= */
export const EDUCATION = {
  academic: [
    { title: "Grado en Diseño Multimedia", institution: "Universidad de Málaga", period: "2012 - 2016" },
    { title: "Master Digital Product Design", institution: "La Gauss, Málaga", period: "2016 - 2017" },
  ],
  specialization: [
    { title: "Curso Project Management (Liderazgo)", institution: "General Software, Madrid", period: "2023" },
    { title: "Bootcamp UI Development", institution: "General Software, Madrid", period: "2022" },
    { title: "Master Design System", institution: "Mr. Marcel School, Madrid", period: "2021" },
    { title: "Curso UX Writing", institution: "Mr. Marcel School, Madrid", period: "2018" },
  ],
} as const

/* =========================
   3) SKILLS & TOOLS
   ========================= */
export const SKILLS_AND_TOOLS = {
  hardSkills: {
    productDesign: [
      "Product Thinking",
      "Behavioural UX",
      "Heuristic Evaluation",
      "JTBD",
      "CRO",
      "A/B testing",
      "Lean UX",
    ],
    designSystems: [
      "Atomic Design",
      "Design Tokens",
      "Framework-agnostic systems",
      "Style Dictionary",
      "Storybook",
      "WCAG 2.1",
    ],
    strategy: ["MVP definition", "RICE/MoSCoW", "Roadmap planning", "Stakeholder management", "OKRs"],
  },
  softSkills: [
    "Liderazgo horizontal",
    "Gestión emocional",
    "Escucha activa",
    "Mentoring",
    "Resiliencia",
    "Visión centrada en negocio",
  ],
  tools: {
    design: ["Figma", "Framer", "Webflow", "Tokens Studio", "Style Dictionary", "Zeroheight", "Adobe CC", "Miro"],
    analytics: ["Google Analytics", "Amplitude", "Hotjar", "Optimal Workshop", "Lookback"],
    collaboration: ["Notion", "Jira", "Linear", "Confluence", "Slack", "Mural", "GitHub"],
  },
} as const

/* =========================
   4) EXPERIENCE (normalizado)
   ========================= */
export const EXPERIENCE: ExperienceItem[] = [
  {
    company: "Elastic Heads",
    period: "2024 - 2025",
    role: "Lead Product Designer",
    highlights: [
      "Mediapro: Reducción del 30% en detección de incidencias mediante Lean UX y priorización de señales críticas.",
      "Depasify: Incremento del 25% en captación B2B/B2C aplicando Behavioral UX en procesos de inversión.",
    ],
  },
  {
    company: "General Software",
    period: "2023 - 2024",
    role: "Design System Architect",
    highlights: [
      "Liderazgo de sistema agnóstico multi-theme con ROI del 180% (1.9M€ de ahorro anual).",
      "Puente entre diseño e ingeniería mediante Storybook y Style Dictionary.",
    ],
  },
  {
    company: "Garaje de Ideas",
    period: "2019 - 2023",
    role: "Design Lead / Senior Product Designer",
    projects: [
      { name: "FC Barcelona", achievement: "Conversión e-commerce del 6% al 14% y +1.6M€ en ticketing app." },
      { name: "Repsol", achievement: "Reducción de costes del 40% en portal global (15 países)." },
      { name: "BBVA", achievement: "Diseño de tarjeta Aqua y concepto de apagado digital." },
      { name: "Roche", achievement: "Rediseño app mySugr (+5M descargas)." },
      { name: "Inditex", achievement: "Feature de compra sobre vídeo (estándar de industria)." },
    ],
  },
  {
    company: "VTC Projects",
    period: "2016 - 2019",
    role: "Middle Product Designer",
    highlights: ["Optimización de conversión para expansión en China y EE.UU."],
  },
]

/* =========================
   5) PROJECTS DB (para respuestas con contexto + match por keywords)
   ========================= */
export const PROJECTS: Project[] = [
  {
    id: "mediapro-incidents",
    name: "Señales críticas y detección de incidencias",
    client: "Mediapro",
    companyContext: "Elastic Heads",
    domain: ["platform", "b2b"],
    role: "Lead Product Designer",
    summary:
      "Optimización de una plataforma operativa priorizando señales críticas para detectar incidencias antes y con menos fricción.",
    problems: [
      "Demasiadas señales/inputs → baja claridad operativa",
      "Fricción para identificar lo importante a tiempo",
    ],
    whatIDid: [
      "Alineé objetivos con negocio/operaciones",
      "Reduje ruido y prioricé señales críticas",
      "Iteré con Lean UX (prototipos + validación rápida)",
    ],
    outcomes: [{ kind: "metric", value: "-30% en detección de incidencias", note: "reportado en highlights" }],
    methods: ["Lean UX", "Heuristic review", "Prioritización"],
    keywords: ["mediapro", "incidencias", "b2b", "operaciones", "plataforma"],
  },

  {
    id: "depasify-growth",
    name: "Captación B2B/B2C para inversión",
    client: "Depasify",
    companyContext: "Elastic Heads",
    domain: ["fintech", "b2b", "b2c"],
    role: "Lead Product Designer",
    summary:
      "Mejora de journeys de captación aplicando Behavioral UX para reducir fricción y aumentar intención/acción.",
    problems: ["Baja conversión en captación", "Fricción y dudas en el journey de inversión"],
    whatIDid: [
      "Replanteé el journey con Behavioral UX",
      "Ajusté copy/arquitectura y microdecisiones del flujo",
      "Iteración con feedback y analítica",
    ],
    outcomes: [{ kind: "metric", value: "+25% captación B2B/B2C", note: "reportado en highlights" }],
    methods: ["Behavioural UX", "CRO", "Lean UX"],
    keywords: ["depasify", "fintech", "captación", "behavioural", "conversion"],
  },

  {
    id: "general-software-ds",
    name: "Design System agnóstico multi-theme",
    client: "General Software",
    companyContext: "General Software",
    domain: ["design-systems", "platform", "b2b"],
    role: "Design System Architect",
    summary:
      "Sistema agnóstico y multi-theme para escalar consistencia, velocidad y reducir deuda entre equipos.",
    problems: [
      "Inconsistencias visuales + deuda de UI",
      "Coste alto de mantenimiento y escalado",
      "Desalineación diseño/ingeniería",
    ],
    whatIDid: [
      "Definí arquitectura de tokens (base/semantic/alias)",
      "Conecté diseño y código (Storybook + Style Dictionary)",
      "Definí reglas de gobernanza para escalar sin caos",
    ],
    outcomes: [
      { kind: "metric", value: "ROI 180%", note: "1.9M€ ahorro anual (según highlights)" },
      { kind: "qualitative", value: "Mayor consistencia y velocidad de entrega entre equipos" },
    ],
    methods: ["Design Tokens", "Governance", "Storybook workflows"],
    tools: ["Tokens Studio", "Style Dictionary", "Storybook", "Figma"],
    keywords: ["design system", "tokens", "multi-theme", "agnostic", "style dictionary", "storybook", "roi"],
  },

  {
    id: "fcb-commerce-ticketing",
    name: "E-commerce + ticketing app",
    client: "FC Barcelona",
    companyContext: "Garaje de Ideas",
    domain: ["ecommerce", "ticketing", "mobile", "b2c"],
    role: "Design Lead / Senior Product Designer",
    summary:
      "Mejoras de experiencia de compra y flujos críticos en e-commerce y ticketing, enfocadas en conversión y claridad.",
    problems: ["Fricción en compra", "Necesidad de mejorar conversión y rendimiento del funnel"],
    whatIDid: [
      "Lideré mejoras del funnel (IA/flow/UI patterns)",
      "Colaboré con stakeholders para priorizar entregables de impacto",
      "Cuidé microinteracciones y calidad percibida",
    ],
    outcomes: [
      { kind: "metric", value: "Conversión e-commerce: 6% → 14%", note: "reportado en experience" },
      { kind: "metric", value: "+1.6M€ en ticketing app", note: "reportado en experience" },
    ],
    methods: ["CRO", "Heurística", "Lean UX"],
    keywords: ["barça", "fc barcelona", "fcb", "ticketing", "ecommerce", "conversión"],
  },

  {
    id: "repsol-portal",
    name: "Portal global",
    client: "Repsol",
    companyContext: "Garaje de Ideas",
    domain: ["platform", "b2b"],
    role: "Design Lead / Senior Product Designer",
    summary: "Reducción de costes y estandarización de experiencia en un portal global multi-país.",
    problems: ["Coste alto de operación", "Necesidad de coherencia entre países"],
    whatIDid: ["Estandaricé patrones", "Priorización por impacto", "Alineación cross-country"],
    outcomes: [{ kind: "metric", value: "-40% costes en portal global (15 países)", note: "reportado en experience" }],
    keywords: ["repsol", "portal", "global", "15 países", "costes"],
  },

  {
    id: "inditex-video-shopping",
    name: "Compra sobre vídeo",
    client: "Inditex",
    companyContext: "Garaje de Ideas",
    domain: ["ecommerce", "retail", "b2c"],
    role: "Design Lead / Senior Product Designer",
    summary: "Diseño de una funcionalidad de compra sobre vídeo como innovación en experiencia retail.",
    problems: ["Aumentar engagement y conversión con nuevos formatos"],
    whatIDid: ["Diseño de flujo y patrones", "Alineación con negocio y viabilidad técnica"],
    outcomes: [{ kind: "qualitative", value: "Feature adoptada como estándar de industria (según experience)" }],
    keywords: ["inditex", "video", "compra sobre vídeo", "retail", "ecommerce"],
  },
]

/* =========================
   6) INTENT ROUTER (para elegir mejor qué responder)
   ========================= */
export const INTENTS = {
  recruiter: {
    signals: ["salario", "disponibilidad", "rol", "años", "cv", "resume", "location", "remoto", "hybrid"],
    defaultAnswerStyle: "resumen + bullets + CTA",
  },
  hiringManager: {
    signals: ["proceso", "metodología", "impacto", "métricas", "stakeholders", "decisiones", "tradeoffs"],
    defaultAnswerStyle: "contexto → decisiones → impacto → aprendizajes",
  },
  designerPeer: {
    signals: ["tokens", "storybook", "style dictionary", "componentes", "governance", "wcag", "a11y"],
    defaultAnswerStyle: "técnico, concreto, con ejemplos",
  },
  casual: {
    signals: ["de dónde", "historia", "lima", "españa", "argentina", "málaga"],
    defaultAnswerStyle: "humano + corto + 1 anécdota si aplica",
  },
} as const

/* =========================
   7) OUTPUT FORMAT (control de calidad)
   ========================= */
export const OUTPUT = {
  maxLengthGuideline: "Respuesta por defecto 6–12 líneas. Si el usuario pide detalle, ampliar.",
  structure: [
    "1) Respuesta directa (1–2 líneas)",
    "2) Detalle en bullets (3–6)",
    "3) Ejemplo aplicado (1 mini-ejemplo si encaja)",
    "4) Cierre con pregunta + 3 follow-ups",
  ],
  followups: {
    prefix: "###",
    arrow: "↳",
    max: 3,
  },
  ctas: {
    offerProject: "¿Quieres que te lo cuente con un ejemplo real (Barça / Inditex / Design System)?",
    offerDeepDive: "¿Te interesa más el proceso, el impacto o cómo lo implementé con el equipo?",
  },
} as const

/* =========================
   8) BASE SYSTEM PROMPT (limpio y estable)
   - OJO: aquí NO metemos JSON.stringify gigante
   - En runtime tú ya podrás “inyectar” data si quieres, pero mejor pasarla como contexto separado
   ========================= */
export const BASE_SYSTEM_PROMPT = `
Eres la extensión digital de Santi (Lead Product Designer, +8 años).
Objetivo: responder sobre su perfil, proyectos, metodología y encaje para roles de producto/diseño.

VOZ
- Cercano, profesional y directo.
- Con chispa, pero sin fliparte.
- Cero frases vacías. Prioriza hechos, decisiones y resultados.
- Si una métrica no está confirmada, dilo (no inventes números).

CÓMO RESPONDER
- Detecta la intención del usuario (recruiter, hiring manager, designer peer o casual).
- Elige el proyecto más relevante según keywords (Barça, Inditex, Design System, Mediapro, Depasify, Repsol).
- Estructura siempre:
  1) Respuesta directa (1–2 líneas)
  2) Detalle en bullets (3–6)
  3) Ejemplo aplicado si encaja
  4) Cierre con pregunta + 3 follow-ups

LANGUAGE RULES
- Detecta automáticamente el idioma del usuario.
- Responde SIEMPRE en el mismo idioma.
- Si el usuario escribe en inglés:
  - Usa un tono claro, directo y natural.
  - Evita frases corporativas largas.
  - Prioriza verbos de acción y ejemplos concretos.
  - Mantén el mismo nivel de cercanía que en español.

ENGLISH VOICE GUIDELINES
- Write like a senior product designer talking to another senior.
- Short sentences. Clear structure.
- No buzzwords without context.
- Show impact before process when possible.
- Prefer:
  "I led", "I designed", "I helped teams"
  over:
  "I was responsible for", "This experience allowed me to"

OUT-OF-SCOPE & PERSONAL QUESTIONS
- Si el usuario pregunta algo personal o que no está en el conocimiento disponible:
  - NO inventes información.
  - Responde de forma honesta y natural.
  - Explica brevemente que no tienes ese dato o que prefieres no entrar en ese nivel.
  - Redirige suavemente la conversación hacia el ámbito profesional.

- Mantén siempre un tono humano y cercano.
  Evita respuestas frías o tipo “no puedo responder eso”.

- Ejemplos de redirección válidos:
  - “Eso no lo tengo documentado, pero si te sirve puedo contarte cómo trabajo en proyectos similares.”
  - “Prefiero mantener eso en un plano personal, aunque encantado de hablar de mi experiencia profesional.”
  - “No tengo ese dato concreto, pero sí puedo explicarte cómo suelo abordar ese tipo de decisiones en producto.”

FOLLOW-UPS: SOLO PREGUNTAS RESPONDIBLES
- Los 3 follow-ups deben ser SIEMPRE respondibles con el conocimiento disponible (perfil, skills, experiencia, proyectos, metodología).
- Nunca sugieras follow-ups sobre:
  salario, compensación, política salarial de una empresa, vida personal, familia, religión, política, datos privados o internos.
- Si el usuario hace una pregunta fuera de alcance (ej: salario):
  - Responde de forma corta y amable.
  - Y los follow-ups deben REDIRIGIR a temas que sí puedes responder (impacto, proyectos, forma de trabajar, disponibilidad general si la tienes).

  

DETALLES QUE DAN CALIDAD
- Cuando salga mobile/UX: menciona microinteracciones, performance percibida y evitar flashes/cargas bruscas.
- Conecta diseño con negocio: ROI, escalabilidad, deuda técnica, time-to-market.
- Menciona clientes potentes SOLO si aporta contexto (no como name-dropping).

PLAIN TEXT (NO MARKDOWN)
- Escribe SIEMPRE en texto plano.
- No uses símbolos de formato Markdown: no uses "*", "**", "-", "_", "#".
- No uses listas con guiones. Si necesitas enumerar, usa formato "1) ... 2) ... 3) ..." en líneas separadas.
- No uses negritas ni cursivas. Si quieres enfatizar, usa mayúsculas puntuales o frases cortas.


`.trim()


/* =========================
   9) “KNOWLEDGE PACK” (para inyectarlo en tu app sin stringify en prompt base)
   - Esto es lo que tú le pasas como contexto adicional al modelo
   ========================= */
export const KNOWLEDGE = {
  locale: "es-ES" as Locale,
  profile: PROFESSIONAL_PROFILE,
  education: EDUCATION,
  skills: SKILLS_AND_TOOLS,
  experience: EXPERIENCE,
  projects: PROJECTS,
  intents: INTENTS,
  output: OUTPUT,
} as const



/* =========================
   Preguntas relacionadas
   ========================= */
export const SAFE_FOLLOWUP_POOLS = {
  general: [
    "¿Quieres que te cuente un proyecto con métricas (Barça / Mediapro / Depasify)?",
    "¿Te interesa más mi enfoque en Design Systems o en optimización de conversión?",
    "¿Prefieres que te hable de mi proceso (discovery → delivery) o de resultados?",
  ],
  designSystems: [
    "¿Cómo estructuro tokens y gobernanza en un Design System agnóstico?",
    "¿Qué trade-offs suelo manejar entre consistencia y velocidad de entrega?",
    "¿Quieres un ejemplo práctico con Storybook y Style Dictionary?",
  ],
  ecommerce: [
    "¿Quieres que te cuente el caso de Barça y qué palancas movimos en el funnel?",
    "¿Cómo decido qué testear primero en CRO?",
    "¿Te interesa más UX de checkout o exploración/catálogo?",
  ],
  leadership: [
    "¿Cómo trabajo con PM y Engineering para priorizar?",
    "¿Cómo manejo stakeholders cuando hay visiones opuestas?",
    "¿Quieres ejemplos de mentoring o liderazgo horizontal?",
  ],
  outOfScopeRedirect: [
    "¿Qué tipo de rol estás cubriendo (Lead, Senior, DS) y qué esperas de esa posición?",
    "¿Te interesa que hable de impacto y métricas en proyectos similares?",
    "¿Quieres ver cómo abordo decisiones y trade-offs en un caso real?",
  ],
} as const

