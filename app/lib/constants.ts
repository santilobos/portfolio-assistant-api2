/* =========================
   constants.ts — Portfolio Assistant Knowledge Pack
   Fuente: CV Santiago Lobos (métricas publicables)
   ========================= */

/* ---------- 0) CORE TYPES ---------- */
export type Locale = "es-ES" | "en-US"

/** Tags normalizados en minúsculas */
export const DOMAIN_TAGS = [
  // industrias
  "fintech",
  "energy",
  "retail",
  "health",
  "broadcast",
  "sports",
  "pharma",
  "banca",

  // tipos de producto
  "ecommerce",
  "platform",
  "saas",
  "mobile",
  "app",
  "design-system",
  "intranet",

  // audiencias
  "b2b",
  "b2c",
  "employee-experience",
  "customer-experience",
  "fan-experience",

  // capacidades/temas
  "design-systems",
  "access-control",
  "ticketing",
  "membership",
  "digital-wallet",
  "security",
  "conversion",
  "governance",
  "tokens",
  "framework-agnostic",
] as const

export type DomainTag = (typeof DOMAIN_TAGS)[number]

export type ImpactMetric =
  | { kind: "metric"; value: string; note?: string; source?: "reported" | "estimated" }
  | { kind: "qualitative"; value: string; note?: string }

export type Project = {
  id: string
  title: string
  client: string
  company: string

  /** Para priorizar ejemplos cuando hay duda */
  priority: number // 1 = máximo

  oneLiner: string

  context: {
    productType: "ecommerce" | "platform" | "app" | "design-system" | "other"
    stage: "discovery" | "delivery" | "end-to-end"
    timeframe?: string
    team?: string
    users?: string
    markets?: string
    constraints?: string[]
  }

  tags: DomainTag[]

  problems: Array<{ label: string; detail?: string }>
  contributions: Array<{ label: string; detail?: string }>

  methods?: string[]
  deliverables?: string[]
  impact: ImpactMetric[]

  tools?: string[]
  keywords: string[]

  disclosure?: {
    tellsafe?: string[]
    cannotSay?: string[]
  }
}

export type Experience = {
  company: string
  period: string
  title: string
  location?: string
  overview?: string
  highlights?: string[]
  projects: string[] // project ids
}

export type FAQPreset = {
  id: string
  locale: Locale
  triggers: string[]
  answer: string
  followups?: string[]
}

/* =========================
   1) PROFILE
   ========================= */
export const PROFILE = {
  localeDefault: "es-ES" as Locale,
  person: {
    name: "Santi",
    role: "Lead Product Designer | Design System Architect",
    years: 8,
    baseLocation: "Lima, Perú",
    origin: "Argentina",
    raised: "Madrid, Spain",
    languages: ["es", "en"],
    contact: {
      email: "santilobos21@gmail.com",
      phone: "+51 932513317",
      linkedin: "https://www.linkedin.com/in/santi-lobos/",
      portfolio: "https://santiagolobos.framer.website/",
    },
  },
  positioning: {
    headline:
      "Lead Product Designer con más de 8 años en consultoría IT, especializado en Design Systems agnósticos y productos digitales complejos.",
    valueProposition: [
      "Alineación transversal entre negocio, tecnología y diseño para reducir fricción y avanzar con claridad.",
      "Sistemas de diseño robustos que reducen costes, aumentan coherencia y multiplican velocidad de entrega.",
      "Estrategia de producto basada en investigación, datos y validación continua.",
      "Liderazgo operativo de equipos multidisciplinares, impulsando colaboración y autonomía.",
      "Diseño centrado en impacto: mayor conversión y eficiencia, menos errores y deuda técnica.",
    ],
    industries: ["fintech", "energy", "retail", "health", "broadcast", "sports", "pharma", "banca"],
    values: [
      "Honestidad",
      "Transparencia",
      "Comunicación clara",
      "Escucha activa",
      "Colaboración",
      "Curiosidad",
      "Resiliencia",
      "Liderazgo horizontal",
    ],
  },
} as const

/* =========================
   2) EDUCATION
   ========================= */
export const EDUCATION = {
  academic: [
    { title: "Bachiller en Diseño Multimedia", institution: "Universidad de Málaga", period: "2012 - 2016" },
    { title: "Master Digital Product Design", institution: "La Gauss, Málaga", period: "2016 - 2017" },
    { title: "Master Design System", institution: "Mr. Marcel School, Madrid", period: "2021" },
  ],
  specialization: [
    { title: "Curso UX Writing", institution: "Mr. Marcel School, Madrid", period: "2018" },
    { title: "Bootcamp UI Development", institution: "General Software, Madrid", period: "Jun 2022 - Aug 2022" },
    { title: "Curso Project Management (Liderazgo)", institution: "General Software, Madrid", period: "Mar 2023 - Sep 2023" },
  ],
} as const

/* =========================
   3) SKILLS & TOOLS
   ========================= */
export const SKILLS = {
  hard: {
    productDesignUX: [
      "Product thinking",
      "UX/UI",
      "User Research",
      "Information Architecture",
      "User flows",
      "Journey mapping",
      "Prototyping",
      "Behavioural UX",
      "Heuristic evaluation",
      "Usability testing",
      "UX writing",
      "JTBD",
      "User stories",
      "KPI definition",
      "CRO",
      "A/B testing",
      "Experimentation",
      "Double Diamond",
      "Design Thinking",
      "Lean UX",
    ],
    designSystemUI: [
      "Design Systems",
      "Atomic Design",
      "Design tokens",
      "Framework-agnostic Design Systems",
      "Component libraries governance",
      "Pattern libraries",
      "Variants & Figma variables",
      "Multi-brand theming",
      "Microinteractions",
      "Accessibility (WCAG 2.1)",
      "Style Dictionary",
      "Storybook",
    ],
    productStrategy: [
      "MVP definition",
      "Feature prioritization (RICE, MoSCoW, Kano)",
      "Backlog management",
      "Roadmap planning",
      "Agile/Scrum",
      "Workshop facilitation",
      "Stakeholder management",
      "Alignment workshops",
      "OKRs",
    ],
  },
  soft: [
    "Honestidad",
    "Transparencia",
    "Comunicación clara y cercana",
    "Escucha activa",
    "Gestión emocional",
    "Creación de confianza",
    "Mentoring",
    "Storytelling",
    "Resolución de conflictos",
    "Liderazgo horizontal",
    "Visión de producto centrada en personas y negocio",
  ],
  tools: {
    design: ["Figma", "Framer", "Webflow", "Tokens Studio", "Storybook", "Style Dictionary", "Zeroheight", "Adobe CC", "Miro"],
    analytics: ["Google Analytics", "Adobe Experience Manager", "Amplitude", "Hotjar", "Optimal Workshop", "Lookback"],
    collaboration: ["Notion", "Jira", "Linear", "Confluence", "Slack", "Mural", "Trello", "Teams", "GitHub"],
  },
} as const

/* =========================
   4) PROJECTS DB (single source of truth)
   Prioridad definida por ti: Repsol → FCB → Cofares → Mediapro → Depasify
   ========================= */
export const PROJECTS: Project[] = [
  {
    id: "repsol-portal-del-empleado",
    title: "Portal global del empleado de Repsol",
    client: "Repsol",
    company: "Garaje de Ideas",
    priority: 1,
    oneLiner:
      "Rediseño de experiencia del empleado a escala global para reducir costes, soporte interno y aumentar autonomía de equipos locales.",
    context: {
      productType: "platform",
      stage: "end-to-end",
      markets: "15 países",
      users: "Equipos y empleados a escala global",
      constraints: ["Escala multinacional", "Necesidades por país/rol", "Alineación con stakeholders globales"],
    },
    tags: ["energy", "platform", "b2b", "employee-experience"],
    problems: [
      { label: "Costes altos de producción", detail: "Dependencia operativa y baja autonomía de equipos locales." },
      { label: "Soporte interno elevado", detail: "Fricción por experiencia desactualizada y poco clara." },
      { label: "Necesidad de consistencia global", detail: "Coherencia sin perder necesidades locales." },
    ],
    contributions: [
      { label: "Investigación profunda", detail: "Discovery para entender necesidades por rol/país y puntos de fricción." },
      { label: "Co-creación y alineación", detail: "Workshops con líderes y equipos globales para converger en una visión común." },
      { label: "Plantillas escalables", detail: "Diseño de plantillas para aumentar autonomía y reducir dependencia." },
      { label: "Definición de experiencia", detail: "Arquitectura de información y patrones para claridad y eficiencia." },
    ],
    methods: ["Design Thinking"],
    deliverables: ["Research synthesis", "IA", "Templates", "Prototipos", "Specs"],
    impact: [
      { kind: "metric", value: "-40% costes de producción", source: "reported" },
      { kind: "metric", value: "-65% soporte interno", source: "reported" },
      { kind: "qualitative", value: "Experiencia más moderna y centrada en el empleado", note: "Más claridad y eficiencia." },
    ],
    keywords: ["repsol", "portal", "empleado", "global", "15 países", "plantillas", "autonomía", "costes", "soporte"],
  },

  {
    id: "fcb-store-checkout",
    title: "FC Barcelona Store — Optimización de checkout",
    client: "FC Barcelona",
    company: "Garaje de Ideas",
    priority: 2,
    oneLiner:
      "Reposicionamiento del e-commerce y optimización de flujos críticos para mejorar conversión y alinearlo con estándares retail.",
    context: {
      productType: "ecommerce",
      stage: "end-to-end",
      constraints: ["Cambio de posicionamiento", "Validación con usuarios", "Optimización de flujos críticos"],
    },
    tags: ["sports", "ecommerce", "retail", "b2c", "conversion", "fan-experience"],
    problems: [
      { label: "Conversión baja en checkout", detail: "Fricción en pasos críticos y falta de claridad en el funnel." },
      { label: "IA poco alineada a moda/retail", detail: "E-commerce orientado a merchandising más que a experiencia fashion." },
      { label: "Necesidad de validar con usuarios", detail: "Reducir incertidumbre con evidencia cualitativa." },
    ],
    contributions: [
      { label: "Optimización de flujos críticos", detail: "Mejora de pasos y microdecisiones del checkout." },
      { label: "Rediseño de IA", detail: "Nueva arquitectura alineada a experiencia retail." },
      { label: "Validación con usuarios", detail: "Iteración y ajuste según feedback." },
      { label: "Reposicionamiento", detail: "De merchandising a moda: redefinición de target y narrativa de compra." },
    ],
    methods: ["Design Thinking", "CRO", "User validation"],
    deliverables: ["IA", "User flows", "Prototipos", "UI specs"],
    impact: [{ kind: "metric", value: "Conversión checkout: 6% → 14%", source: "reported" }],
    keywords: ["fc barcelona", "store", "ecommerce", "checkout", "conversión", "arquitectura de información", "retail"],
  },

  {
    id: "fcb-socis-ticketing",
    title: "App FCB Socis — Socios y ticketing",
    client: "FC Barcelona",
    company: "Garaje de Ideas",
    priority: 3,
    oneLiner:
      "Rediseño de app de socios y ticketing para aumentar participación, facilitar liberación y reventa de asientos.",
    context: {
      productType: "app",
      stage: "end-to-end",
      constraints: ["Flujos críticos de ticketing", "Gestión múltiple de partidos", "Impacto en ingresos"],
    },
    tags: ["sports", "app", "mobile", "b2c", "ticketing", "membership", "fan-experience", "access-control"],
    problems: [
      { label: "Gestión compleja de partidos", detail: "Usuarios necesitaban gestionar múltiples partidos de forma más clara." },
      { label: "Baja eficiencia en liberación/reventa", detail: "Fricción para operar con asientos." },
      { label: "Necesidad de elevar compromiso", detail: "Mejorar participación y engagement con el club." },
    ],
    contributions: [
      { label: "Discovery de necesidades", detail: "Identificación del pain principal: gestión múltiple de partidos." },
      { label: "Rediseño de flujos ticketing", detail: "Liberación y reventa simplificadas y más evidentes." },
      { label: "Mejora de UX end-to-end", detail: "Claridad, microinteracciones y reducción de fricción." },
    ],
    methods: ["Design Thinking"],
    deliverables: ["User flows", "Prototipos", "IA", "Specs"],
    impact: [{ kind: "metric", value: "+1,6M€ anuales adicionales", source: "reported", note: "Por facilitar liberación y reventa." }],
    keywords: ["fcb socis", "ticketing", "socios", "reventa", "asientos", "app", "ingresos"],
  },

  {
    id: "cofares-design-system",
    title: "Design System agnóstico multi-theme",
    client: "Cofares",
    company: "General Software",
    priority: 4,
    oneLiner:
      "Creación de Design System framework-agnostic con Atomic Design + tokens para reducir costes y aumentar velocidad y coherencia.",
    context: {
      productType: "design-system",
      stage: "end-to-end",
      constraints: ["Escalabilidad", "Gobernanza", "Alineación con C-levels y stakeholders"],
    },
    tags: ["pharma", "design-system", "design-systems", "platform", "b2b", "tokens", "governance", "framework-agnostic"],
    problems: [
      { label: "Inconsistencia y deuda de UI", detail: "Coste alto de mantenimiento y entregas desalineadas." },
      { label: "Necesidad de escalabilidad", detail: "Sistema que aguante crecimiento, multi-brand y cambios futuros." },
      { label: "Fricción diseño/ingeniería", detail: "Falta de un lenguaje común entre disciplinas." },
    ],
    contributions: [
      { label: "Metodología Atomic Design", detail: "Estructura de componentes y reglas de composición." },
      { label: "Arquitectura de tokens", detail: "Componentes basados en design tokens para consistencia y theming." },
      { label: "Gobernanza y roadmap", detail: "Escalabilidad definida con stakeholders y C-levels." },
      { label: "Medición de impacto", detail: "Métricas y ROI obtenidos con Knapsack." },
    ],
    methods: ["Atomic Design", "Design tokens", "Governance"],
    deliverables: ["Component library", "Tokens", "Docs", "Guidelines", "Roadmap"],
    impact: [
      { kind: "metric", value: "ROI 180%", source: "reported", note: "Métricas obtenidas con Knapsack." },
      { kind: "metric", value: "1,9M€ ahorro anual estimado", source: "reported", note: "Estimación basada en Knapsack." },
      { kind: "qualitative", value: "Mayor coherencia y velocidad de entrega", note: "Lenguaje común entre equipos." },
    ],
    keywords: ["cofares", "design system", "agnóstico", "tokens", "atomic design", "knapsack", "roi", "storybook", "style dictionary"],
  },

  {
    id: "mediapro-signal-incidents",
    title: "Plataforma de control broadcast — Detección de incidencias",
    client: "Mediapro",
    company: "Elastic Heads",
    priority: 5,
    oneLiner:
      "Rediseño de IA y priorización de señales críticas para acelerar detección y verificación continua en tiempo real.",
    context: {
      productType: "platform",
      stage: "end-to-end",
      constraints: ["Operación en tiempo real", "Ruido de señales", "Decisiones críticas bajo presión"],
    },
    tags: ["broadcast", "platform", "b2b"],
    problems: [
      { label: "Detección lenta de incidencias", detail: "Demasiado ruido y baja claridad operativa." },
      { label: "Prioridad poco evidente", detail: "Señales críticas y alarmas no estaban bien jerarquizadas." },
      { label: "Verificación poco fluida", detail: "Flujos de comprobación mejorables para decisiones rápidas." },
    ],
    contributions: [
      { label: "Lean UX", detail: "Iteración rápida orientada a reducir incertidumbre y mover la aguja." },
      { label: "Rediseño de IA", detail: "Arquitectura enfocada en lectura operativa y prioridades reales." },
      { label: "Priorización de señales críticas", detail: "Alarmas y flujos de verificación continua para acelerar decisiones." },
    ],
    methods: ["Lean UX"],
    deliverables: ["IA", "User flows", "Prototipos", "UI specs"],
    impact: [{ kind: "metric", value: "-30% tiempo para detectar incidencias de señal", source: "reported" }],
    keywords: ["mediapro", "broadcast", "incidencias", "señal", "tiempo real", "arquitectura de información", "lean ux"],
  },

  {
    id: "depasify-b2b2c-growth",
    title: "Producto financiero B2B/B2C — Captación y confianza",
    client: "Depasify",
    company: "Elastic Heads",
    priority: 6,
    oneLiner:
      "Mejora de flujos clave (onboarding, KYC, inversión y portfolio) aplicando behavioural UX para reducir fricción y aumentar confianza.",
    context: {
      productType: "platform",
      stage: "end-to-end",
      constraints: ["Procesos críticos (KYC)", "Confianza/seguridad", "Conversión en pasos sensibles"],
    },
    tags: ["fintech", "platform", "b2b", "b2c", "conversion", "customer-experience"],
    problems: [
      { label: "Fricción en onboarding y KYC", detail: "Pérdida de usuarios en pasos sensibles." },
      { label: "Dudas en inversión/portfolio", detail: "Necesidad de confianza en procesos críticos." },
      { label: "Baja captación del nuevo producto", detail: "Optimización del journey completo." },
    ],
    contributions: [
      { label: "Design Thinking", detail: "Replanteo de flujos clave con enfoque discovery → delivery." },
      { label: "Behavioural UX", detail: "Principios para reducir fricción y aumentar confianza en decisiones." },
      { label: "Optimización de journeys críticos", detail: "Onboarding, KYC, inversión y portfolio." },
    ],
    methods: ["Design Thinking", "Behavioural UX"],
    deliverables: ["User flows", "Prototipos", "IA", "Copy adjustments", "Specs"],
    impact: [{ kind: "metric", value: "+25% captación B2B/B2C", source: "reported" }],
    keywords: ["depasify", "fintech", "captación", "b2b", "b2c", "kyc", "onboarding", "behavioural ux", "inversión"],
  },

  /* ---- Proyectos secundarios (útiles para preguntas específicas) ---- */
  {
    id: "bbva-aqua-card",
    title: "Tarjeta Aqua + apagado digital",
    client: "BBVA",
    company: "Garaje de Ideas",
    priority: 20,
    oneLiner:
      "Contribución al diseño de tarjeta Aqua y concepto de apagado digital; mejora de seguridad en pagos online con CVV dinámico.",
    context: { productType: "other", stage: "delivery", constraints: ["Seguridad antifraude", "Adopción de nuevo modelo"] },
    tags: ["fintech", "security", "b2c", "digital-wallet"],
    problems: [
      { label: "Riesgo de fraude en pagos online", detail: "Necesidad de elevar seguridad con CVV dinámico." },
      { label: "Adopción de nuevo modelo de tarjeta", detail: "Claridad y confianza en el producto." },
    ],
    contributions: [
      { label: "Diseño de producto", detail: "Aportación dentro del squad de Open Innovation." },
      { label: "Concepto apagado digital", detail: "Propuesta para control del usuario sobre su tarjeta." },
    ],
    impact: [{ kind: "qualitative", value: "Mejora de seguridad percibida y control del usuario", note: "CVV dinámico + apagado digital." }],
    keywords: ["bbva", "aqua", "cvv dinámico", "apagado digital", "fraude", "pagos online"],
  },

  {
    id: "inditex-video-shopping",
    title: "Compra sobre vídeo",
    client: "Inditex",
    company: "Garaje de Ideas",
    priority: 21,
    oneLiner:
      "Rediseño de descubrimiento y compra; aporte de feature de compra sobre vídeo cuando era innovación y hoy es estándar.",
    context: { productType: "ecommerce", stage: "delivery", constraints: ["Innovación en discovery", "Alineación con negocio y viabilidad"] },
    tags: ["retail", "ecommerce", "b2c", "customer-experience"],
    problems: [
      { label: "Mejorar discovery y compra", detail: "Optimizar proceso de exploración y conversión." },
      { label: "Nuevos formatos de compra", detail: "Explorar vídeo como palanca de engagement." },
    ],
    contributions: [
      { label: "Rediseño de procesos", detail: "Mejoras en discovery y compra." },
      { label: "Feature compra sobre vídeo", detail: "Aporte conceptual y de UX." },
    ],
    impact: [{ kind: "qualitative", value: "Compra sobre vídeo como estándar actual", note: "Adopción amplia en ecommerces." }],
    keywords: ["inditex", "video shopping", "compra sobre vídeo", "discovery", "retail"],
  },

  {
    id: "roche-mysugr",
    title: "mySugr — App para diabetes",
    client: "Roche",
    company: "Garaje de Ideas",
    priority: 22,
    oneLiner:
      "Rediseño de arquitectura de información y funcionalidades clave en una app líder del sector con +5M descargas.",
    context: { productType: "app", stage: "delivery", constraints: ["Producto con alta base instalada", "Health domain"] },
    tags: ["health", "mobile", "app", "b2c", "customer-experience"],
    problems: [
      { label: "IA mejorable", detail: "Necesidad de mayor claridad en navegación y estructura." },
      { label: "Optimizar funcionalidades core", detail: "Mejorar experiencia en tareas críticas para usuarios." },
    ],
    contributions: [
      { label: "Rediseño de IA", detail: "Arquitectura más clara y alineada a necesidades." },
      { label: "Mejora de funcionalidades clave", detail: "Ajustes de UX en flujos principales." },
    ],
    impact: [{ kind: "metric", value: "+5M descargas", source: "reported", note: "Producto reconocido en el sector." }],
    keywords: ["roche", "mysugr", "diabetes", "health", "arquitectura de información", "app"],
  },

  {
    id: "vtc-expansion-cn-us",
    title: "Expansión de producto a China y Estados Unidos",
    client: "VTC Projects (Producto)",
    company: "VTC Projects",
    priority: 30,
    oneLiner:
      "Mejoras de UX localizadas y optimizaciones de conversión para expansión internacional y crecimiento sostenido en ventas.",
    context: { productType: "platform", stage: "delivery", markets: "China y Estados Unidos", constraints: ["Localización", "Optimización conversión"] },
    tags: ["platform", "b2c", "conversion", "customer-experience"],
    problems: [
      { label: "Retos de localización", detail: "Adaptación de UX a mercados con necesidades distintas." },
      { label: "Optimización de conversión", detail: "Mejoras para elevar ventas en expansión." },
    ],
    contributions: [
      { label: "UX localizada", detail: "Adaptaciones por mercado para mejorar comprensión y uso." },
      { label: "Optimización de conversión", detail: "Ajustes para mejorar performance del funnel." },
    ],
    impact: [{ kind: "qualitative", value: "Crecimiento sostenido de ventas en ambos mercados", note: "Contribución mediante mejoras UX + conversión." }],
    keywords: ["vtc projects", "china", "usa", "localización", "conversión", "expansión"],
  },
]

/* =========================
   5) EXPERIENCE (agrupa IDs, no duplica detalle)
   ========================= */
export const EXPERIENCE: Experience[] = [
  {
    company: "Elastic Heads (IT Consulting)",
    period: "Sep 2024 - May 2025",
    title: "Lead Product Designer",
    location: "Madrid",
    overview: "Consultoría IT enfocada en producto digital complejo y plataformas operativas.",
    highlights: [
      "Mediapro: -30% tiempo de detección de incidencias en plataforma broadcast.",
      "Depasify: +25% captación en producto financiero B2B/B2C.",
    ],
    projects: ["mediapro-signal-incidents", "depasify-b2b2c-growth"],
  },
  {
    company: "General Software (IT Consulting)",
    period: "Apr 2023 - Aug 2024",
    title: "Design System Architect",
    location: "Madrid",
    overview: "Arquitectura y gobernanza de Design Systems agnósticos y escalables.",
    highlights: ["Cofares: ROI 180% y 1,9M€ ahorro anual estimado (Knapsack)."],
    projects: ["cofares-design-system"],
  },
  {
    company: "Garaje de Ideas (IT Consulting)",
    period: "Jan 2019 - Mar 2023",
    title: "Lead / Senior Product Designer",
    location: "Madrid",
    overview: "Diseño de producto end-to-end en grandes cuentas y squads multidisciplinares.",
    highlights: [
      "FCB Store: conversión checkout 6% → 14%.",
      "FCB Socis: +1,6M€ anuales adicionales en ticketing.",
      "Repsol: -40% costes producción y -65% soporte interno en portal global.",
    ],
    projects: ["fcb-store-checkout", "fcb-socis-ticketing", "repsol-employee-portal", "bbva-aqua-card", "inditex-video-shopping", "roche-mysugr"],
  },
  {
    company: "VTC Projects (Empresa de producto)",
    period: "Sep 2016 - Jan 2019",
    title: "Junior → Middle Product Designer",
    location: "Barcelona",
    overview: "Producto propio con expansión internacional y optimización de conversión.",
    highlights: ["Expansión a China y EE.UU. con mejoras UX localizadas y optimización de conversión."],
    projects: ["vtc-expansion-cn-us"],
  },
]

/* =========================
   6) INTENT ROUTER
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
    signals: ["tokens", "storybook", "style dictionary", "componentes", "governance", "wcag", "a11y", "atomic"],
    defaultAnswerStyle: "técnico, concreto, con ejemplos",
  },
  casual: {
    signals: ["de dónde", "historia", "lima", "españa", "argentina", "málaga"],
    defaultAnswerStyle: "humano + corto + 1 anécdota si aplica",
  },
} as const

/* =========================
   7) OUTPUT CONTRACT
   ========================= */
export const OUTPUT = {
  maxLengthGuideline: "Respuesta por defecto 6–12 líneas. Si el usuario pide detalle, ampliar.",
  structure: [
    "1) Respuesta directa (1–2 líneas)",
    "2) Detalle en bullets (3–6)",
    "3) (Opcional) Ejemplo aplicado",
    "4) (Opcional) 3 follow-ups",
  ],
  bullets: {
    htmlClass: "bulletLine",
    symbol: "•",
    strongTag: true,
  },
  followups: {
    prefix: "###",
    arrow: "↳",
    max: 3,
  },
} as const

/* =========================
   8) FAQ PRESETS (Home)
   ========================= */
export const FAQ_PRESETS: FAQPreset[] = [
  {
    id: "home-most-complex",
    locale: "es-ES",
    triggers: ["¿Cuál fue tu proyecto más complejo?", "proyecto más complejo", "más complejo"],
    answer:
      "Sin duda fue el portal global del empleado de Repsol, con alcance en 15 países. Lo complejo fue diseñar una experiencia coherente que funcionara para culturas, roles y necesidades distintas sin perder eficiencia operativa. La clave estuvo en una fase profunda de investigación y co-creación para aterrizar una solución escalable con plantillas que aumentaran la autonomía local.",
    followups: [
      "¿Cómo planteaste la investigación para un entorno multinacional?",
      "¿Qué decisiones de diseño tuvieron más impacto en costes y soporte?",
      "¿Qué aprendiste trabajando con stakeholders globales?",
    ],
  },
  {
    id: "home-methodologies",
    locale: "es-ES",
    triggers: ["¿Qué metodologías utilizas?", "metodologías", "cómo trabajas", "tu proceso"],
    answer:
      "No trabajo con una fórmula única: elijo el enfoque según el tipo de incertidumbre y el contexto. Si necesitamos descubrir bien el problema, uso Design Thinking para investigar a fondo y alinear stakeholders. Si el reto es iterar rápido y mover una métrica, prefiero Lean UX: lanzar pequeño, medir, aprender y ajustar. El objetivo siempre es reducir incertidumbre sin frenar el ritmo del equipo.",
    followups: [
      "¿Me cuentas un ejemplo donde Lean UX movió una métrica rápido?",
      "¿Cómo decides qué validar primero cuando hay poco tiempo?",
      "¿Cómo aplicas behavioural UX en procesos críticos como KYC o ticketing?",
    ],
  },
  {
    id: "home-portfolio-summary",
    locale: "es-ES",
    triggers: ["Quiero un resumen de este portfolio", "resumen del portfolio", "qué hay en tu portfolio"],
    answer:
      "Aquí verás proyectos donde he trabajado en producto digital complejo y design systems, con foco en impacto medible. Hay casos en Repsol (portal global), FC Barcelona (e-commerce y ticketing), Cofares (design system con ROI), Mediapro (plataforma broadcast) y Depasify (fintech). En cada uno cuento el problema, lo que hice y el impacto que generó.",
    followups: ["¿Quieres que empecemos por Repsol o por FC Barcelona?", "¿Te interesa más Design Systems o Producto (UX/UI)?", "¿Prefieres ver impacto y métricas o el proceso paso a paso?"],
  },
]

// ===============================
// SANTI.GPT – AI CONTRACT
// ===============================

export const BASE_SYSTEM_PROMPT = `
Eres SANTI.GPT, un asistente que representa el portfolio de un Senior Product Designer.

Idioma y tono:
- Responde siempre en español neutro (salvo que el usuario escriba en inglés).
- Tono profesional, claro y directo.
- Respuestas fáciles de escanear.
- Evita emojis y markdown complejo.

Contenido:
- Responde como si el diseñador hablara en primera persona.
- Prioriza impacto, métricas, decisiones y trade-offs.
- Si la pregunta es sobre salario/compensación, responde de forma neutral y redirige a temas de valor (proyectos, proceso, impacto).

FORMATO OBLIGATORIO:
Devuelve SIEMPRE un JSON válido con esta forma exacta:

{
  "reply": "texto de la respuesta",
  "followups": ["pregunta 1", "pregunta 2"]
}

Reglas:
- "reply": texto plano, sin HTML.
- "followups": un array de 1 a 3 strings.
- Cada followup: pregunta corta (6–90 caracteres), relacionada con lo que acabas de responder.
- No repitas la pregunta del usuario.
- No uses comillas, markdown ni emojis en followups.
`.trim();


/* =========================
   10) KNOWLEDGE PACK
   ========================= */
export const KNOWLEDGE = {
  locale: "es-ES" as Locale,
  profile: PROFILE,
  education: EDUCATION,
  skills: SKILLS,
  experience: EXPERIENCE,
  projects: PROJECTS,
  intents: INTENTS,
  output: OUTPUT,
  faq: FAQ_PRESETS,
} as const

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
