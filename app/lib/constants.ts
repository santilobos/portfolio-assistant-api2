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
      "liderar el rediseño integral del portal global para 25.000 empleados en 15 países, creando una experiencia personalizada y segmentada por país, sede y rol que transformó una plataforma compleja en una herramienta de alta productividad",
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
    id: "home-mayor-complejidad",
    locale: "es-ES",
    triggers: [
      "¿Cuál fue tu proyecto más complejo?",
      "¿Cuál fue tu proyecto más difícil?",
      "¿Cuál es tu proyecto más destacado?",
      "¿Qué proyecto destacarías más?",
      "hazme un resumen del proyecto de repsol",
      "hazme un resumen del proyecto del portal del empleado",
      "employee experience platform"
    ],
    answer:
      "Sin duda, el reto más complejo de mi carrera fue el rediseño del **Portal Global del Empleado para Repsol**, un ecosistema digital con alcance en 15 países. Lo más complejo fue diseñar una experiencia coherente que funcionara para miles de personas **(más de 25 mil empleados)** con culturas, roles y necesidades técnicas totalmente distintas, todo sin perder la eficiencia operativa de la compañía.\n\nLa clave del éxito fue una fase profunda de investigación **(Design Research)** donde pude empatizar con los usuarios reales. Esto me permitió segmentar la experiencia por país, sede y rol profesional, transformando un portal genérico en una **herramienta personalizada** y de **alto impacto**.",
   
    followups: [
      "¿Cómo llevaste a cabo el proceso de investigación?",
      "¿Qué funcionalidades clave diseñaste para mejorar la productividad?",
      "¿Cómo lograste personalizar la experiencia para 25,000 empleados?",
    ],
  },
  {
    id: "home-methodologies",
    locale: "es-ES",
    triggers: [
      "¿Qué metodologías utilizas?",
      "¿Qué metodologías conoces?",
      "¿Qué metodologías aplicas en tus proyectos?",
      "¿Cuál es tu proceso de trabajo?",
      "¿Cómo sueles abordar un proyecto?",
      "metodologías",
      "cómo trabajas",
      "tu proceso"
    ],
    answer:
      "Mi enfoque no es dogmático: **adapto la metodología** según la madurez del producto y los objetivos de negocio. No uso una fórmula única, sino un **'toolkit' estratégico**.\n\nSi el reto es definir una visión desde cero o desbloquear problemas complejos, aplico **Design Thinking** para alinear stakeholders y empatizar con el usuario real.\n\nEn cambio, si el foco es la velocidad y la optimización de métricas, prefiero **Lean UX**: ciclos rápidos de construcción, medición y aprendizaje (Build-Measure-Learn) para reducir el riesgo sin frenar el desarrollo.\n\nEn casos donde el reto es estructural, utilizo **Atomic Design** para construir soluciones escalables que me ayudan a establecer un lenguaje común entre diseño y desarrollo.\n\nEn definitiva, mi prioridad es equilibrar el rigor del diseño con la agilidad técnica, asegurando que cada iteración aporte valor real tanto al usuario como a la compañía.",
    followups: [
      "Cuéntame sobre algún proyecto utilizando Design Thinking",
      "Cuéntame sobre algún proyecto utilizando Lean UX",
      "Cuéntame sobre algún proyecto utilizando Atomic Design",
    ],
  },
  {
    id: "liderazgo-preset",
    locale: "es-ES",
    triggers: [
    "¿Cómo enfocas el liderazgo en diseño de producto?",
    "liderazgo",
    "gestión de equipos",
    "gestión de personas",
    "cómo lideras",
    "experiencia liderando",
    "lead",
    "liderar",
    "mentoring",
    "stakeholders",
    "gestión de proyectos",
    "cómo es tu forma de liderar"
    ],
    answer:
      "Entiendo el **liderazgo en diseño de producto** no solo como la gestión de equipos, sino también como la capacidad de influir en la estrategia de negocio a través del diseño. Mi enfoque se centra en tres ejes: \n\n• **Cultura de diseño:** Crear entornos donde el feedback constructivo y la excelencia técnica sean la norma.\n• **Escalabilidad:** Implementar dinámicas que permitan al equipo ser autónomo y eficiente.\n• **Evangelización de diseño:** Transmitir al resto de áreas la importancia de colocar al diseño en el centro de las decisiones en beneficio del crecimiento de la empresa.",
    followups: [
      "Cuéntame tu experiencia de liderazgo en Repsol.",
      "Quiero saber acerca de tu liderazgo en FC Barcelona",
      "Cuéntame sobre tu liderazgo en el sistema de diseño de Cofares",
    ],
  },
]


// ===============================
// FAQ_NODE (CONVERSACIÓN GUIADA)
// ===============================


export type FAQNode = {
  id: string
  locale: Locale
  question: string
  answer: string
  followupIds?: string[]
}

/* =========================
   8.2) FAQ GRAPH (Guided conversation)
   ========================= */
export const FAQ_GRAPH: FAQNode[] = [

/* =========================
  REPSOL, PORTAL DEL EMPLEADO
   ========================= */

  {
    id: "repsol-research",
    locale: "es-ES",
    question: "¿Cómo llevaste a cabo el proceso de investigación?",
    answer:
    "El proceso de investigación fue la clave para transformar un portal genérico en una herramienta de alta productividad. Realicé una fase de descubrimiento profundo dividida en tres pilares:\n\n1. **Inmersión Cualitativa**: Realicé entrevistas en profundidad a **37 empleados y 10 stakeholders**. Esto me permitió identificar que la navegación era la principal barrera ('demasiadas puertas de entrada poco usables') y que el 70% de los usuarios no pasaba de la Home.\n\n2. **Síntesis con Affinity Diagram**: Agrupé los hallazgos para detectar patrones. El insight principal fue que el portal no debía ser solo un canal de noticias, sino un **hub de servicios** que priorizara el ahorro de tiempo en trámites administrativos.\n\n3. **Definición de Ideales**: Los empleados demandaban una experiencia similar a sus productos digitales personales. De aquí nacieron conceptos como la **'Navegación centrada en la productividad'** y un diseño visual amigable inspirado en redes sociales (stories y buscadores inteligentes).\n\nEl resultado fue una hoja de ruta basada en datos reales, pasando de un modelo estático a uno centrado 100% en el usuario.",
    followupIds: [
      
      //1. Preguntas relacionadas con Repsol
      "repsol-key-features",
      "repsol-personalizacion",
      "repsol-impacto-negocio",

      //2. Preguntas de otros cases
      "cofares-intro",
      "fcb-intro",
    ],
  },

  {
    id: "repsol-key-features",
    locale: "es-ES",
    question: "¿Qué funcionalidades clave diseñaste para mejorar la productividad?",
    answer:
      "El foco principal fue crear una **navegación flexible** orientada a la multitarea. Introduje tres innovaciones principales:\n\n1. **Ventanas Flotantes**: Permiten realizar gestiones (como reservar el comedor o consultar la agenda) sin perder el contexto de la tarea actual.\n2. **Modo Lectura**: Una interfaz limpia para documentos legales y burocráticos, mejorando la comprensión y reduciendo el estrés cognitivo.\n3. **Centralización de Herramientas**: Eliminamos la dispersión de enlaces externos, integrando todo en un único punto de acceso. Esto redujo drásticamente el coste de gestión de cuentas y mejoró la seguridad operativa.",
    followupIds: [

      //1. Preguntas relacionadas con Repsol
      "repsol-research",
      "repsol-personalizacion",
      "repsol-impacto-negocio",

      //2. Preguntas de otros cases
      "cofares-intro",
      "fcb-intro",
    ],
  },

  {
    id: "repsol-personalizacion",
    locale: "es-ES",
    question: "¿Cómo lograste personalizar la experiencia para 25,000 empleados?",
    answer:
      "Utilicé una estrategia de **Generación de Audiencias** mediante **Adobe Experience Manager**. \n\nDiseñé una estructura de contenidos modular que permitía segmentar la información según el rol, el país (15 países), el momento profesional y los intereses del empleado. Así, conseguimos que el portal dejara de ser una 'caja de herramientas' genérica para convertirse en una plataforma que entrega el contenido adecuado a la persona adecuada en el momento justo.",

    followupIds: [

      //1. Preguntas relacionadas con Repsol
      "repsol-research",
      "repsol-key-features",
      "repsol-impacto-negocio",

      //2. Preguntas de otros cases
      "cofares-intro",
      "fcb-intro",
    ],
  },

  {
  id: "repsol-impacto-negocio",
  locale: "es-ES",
  question: "¿Cuál fue el impacto real del nuevo portal?",
  answer:
   "El éxito del proyecto se validó tras 18 meses de investigación y diseño, transformando por completo la operatividad interna de Repsol. Los resultados clave fueron:\n\n1. **Aceleración de procesos clave (x5 más rápido)**: Logré que trámites críticos, como la gestión de documentación personal o la solicitud de permisos, se completen cinco veces más rápido (algunas tareas en menos de 1 minuto) eliminando la fricción administrativa.\n2. **Reducción de costos de desarrollo**: Gracias a la nueva arquitectura modular y al sistema de plantillas que diseñé, **logré reducir los costes de producción en un 40%**, optimizando el mantenimiento global y permitiendo realizar iteraciones de manera mas rápida e intuitiva.\n3. **Reducción de soporte técnico**: La mejora en la arquitectura de información logró reducir un **65% las peticiones a soporte** y a las mesas de ayuda durante el primer trimestre respecto al portal anterior.\n4. **Satisfacción y Consistencia**: Alcanzamos un **75% de satisfacción** de los empleados según índice de satisfacción interno, unificando la marca en **15 países** bajo un ecosistema digital coherente que respeta las audiencias locales.",

   followupIds: [

    //1. Preguntas relacionadas con Repsol
    "repsol-research",    
    "repsol-key-features",    
    "repsol-personalizacion",  

    //2. Preguntas de otros cases
    "cofares-intro",
    "fcb-intro",
    ],
},

 {
    id: "design-thinking-project",
    locale: "es-ES",
    question: "Cuéntame sobre algún proyecto utilizando Design Thinking",
    answer:
    "El proyecto donde apliqué Design Thinking con mayor impacto fue el rediseño del Portal Global de Repsol. El desafío consistió en transformar un ecosistema digital genérico y fragmentado en una herramienta personalizada de alto impacto, optimizando la experiencia para 25.000 empleados en 15 países.",
    followupIds: [
      
      //1. Preguntas relacionadas con Repsol
      "repsol-key-features",
      "repsol-personalizacion",
      "repsol-impacto-negocio",

      //2. Preguntas de otros cases
      "cofares-intro",
      "fcb-intro",
    ],
  },

/* =========================
  FCB, REDISEÑO APP SOCIOS
   ========================= */

{
  id: "fcb-intro",
  locale: "es-ES",
  question: "Cuéntame sobre el proyecto del FC Barcelona",
  answer: "En el FC Barcelona, rediseñé la experiencia de gestión de partidos para socios. El reto era optimizar el sistema de 'Seient Lliure' y ticketing. Al final de la temporada, la mejora en el flujo generó un beneficio de **1,6M€**.",
  followupIds: ["cofares-intro", "home-portfolio-summary"]
},   

  /* =========================
  COFARES, DESIGN SYSTEM
   ========================= */


{
  id: "cofares-intro",
  locale: "es-ES",
  question: "Cuéntame sobre el proyecto de Cofares",
  answer: "Para Cofares, el reto fue crear un sistema de diseño desde cero que unificara sus herramientas logísticas. No solo mejoramos la consistencia, sino que logramos un **180% de ROI** al reducir tiempos de diseño y desarrollo.",
  followupIds: ["fcb-intro", "home-portfolio-summary"]
}

]

export type FAQAnticipated = {
  id: string
  locale: Locale
  question: string
  match: string[]    
  answer: string
  followups?: string[]; 
}

/* =========================
   8.3) FAQ ANTICIPATED (Preguntas esperables)
   ========================= */
export const FAQ_ANTICIPATED: FAQAnticipated[] = [
  {
    id: "profile-origin",
    locale: "es-ES",
    question: "¿De dónde eres?",
    match: [
      "¿de donde eres?",
      "¿Dónde naciste?",
      "cuentame de ti",
      "cuentame sobre ti",
      "hablame de ti",
      "nacimiento",
      "eres español?",
      "eres peruano?",
      "eres argentino?",
      "donde te has criado?",
      "cual es tu origen",
      "origen",
      "vida personal"
    ],
    answer:
      "Mi historia es un viaje de ida y vuelta. Nací en Argentina, en la ciudad de Córdoba, pero con solo 8 años crucé el charco con mi familia hacia la tierra de mis abuelos: España.\n\nMe crié en Málaga, frente al mar. Es la ciudad donde crecí, donde me formé y el lugar que, sin importar dónde esté, siempre llamo casa.\n\nCuando terminé la carrera, mis ganas de aprender de los mejores me llevó a .Ese impulso me llevó a moverme a Barcelona donde trabajé dos años en producto. Finalmente la vida me presentó una gran oportunidad laboral y me mudé a Madrid, una ciudad que me atrapó por completo. He pasado los últimos 7 años allí, trabajando en consultoría IT y disfrutando de cada rincón de la capital. Madrid ha sido mi escenario profesional y personal más intenso, y es una ciudad de la que sigo profundamente enamorado.",
      followups:[
        "¿Dónde has estudiado?",
        "¿Cuál es tu trayectoria profesional?",
        "¿Qué te hace destacar como diseñador?",
      ]
  },

  {
    id: "profile-education",
    locale: "es-ES",
    question: "¿Dónde has estudiado?",
    match: [
      "¿Dónde has estudiado?",
      "que estudios tienes",
      "en que universidad estudiaste",
      "cual es tu carrera",
      "que has estudiado",
      "donde has estudiado",
      "cual es tu titulo",
      "tienes alguna maestría",
      "cuál es tu formación",
      "que formacion tienes",
      "formación",
      "donde estudiaste"
    ],
    answer:
      "Mi camino profesional empezó en la Universidad de Málaga, donde me gradué en Comunicación Audiovisual con la **especialidad de Diseño Multimedia**. Tras la carrera, sentí que necesitaba dar un paso más hacia la parte técnica y me decidí por el **Máster de Digital Product Design** en La Gauss, en Málaga. Soy de los que cree que este sector te obliga a estar en constante movimiento. Por eso, a lo largo de estos años he seguido completando mi perfil con formación en **Design Systems**, UX Writing y UI Development, aprendiendo de grandes profesionales en escuelas como Mr. Marcel o The Bridge, en Madrid. Mi objetivo siempre es el mismo: combinar el diseño y la tecnología para crear productos que conecten de verdad con las personas.",

    followups:[
      "¿Cuál es tu trayectoria profesional?",
      "¿Cómo gestionas el liderazgo en tus proyectos?",
      ] 
  },

    {
    id: "profile-trajectory-full",
    locale: "es-ES",
    question: "¿Cuál es tu trayectoria profesional?",
    match: [
      "cuentame tu trayectoria",
      "resumen de tu carrera",
      "donde has trabajado",
      "cual es tu historia profesional",
      "que has hecho hasta ahora",
      "cuentame de ti",
      "trayectoria",
      "en qué empresas has estado",
      "en qué empresas has trabajado",
      "¿Cuál es tu trayectoria profesional?"
    ],
    answer:
      "Mi camino en el diseño de producto empezó en **Barcelona**, trabajando para **VTC Projects**. Fue una etapa fascinante porque, al ser una empresa con gran presencia en China y Estados Unidos, me dio desde el primer día una visión global sobre cómo mantener ecommerces y productos digitales a gran escala.\n\nCon esa base, decidí dar el salto a **Madrid** para sumergirme en el mundo de la consultoría IT de la mano de **Garaje de Ideas (EDG Group)** una de las mejores consultoras en España. Allí pasé cuatro años intensos donde mi perfil dio un salto de gigante; tuve la suerte de trabajar para clientes como Inditex, BBVA, Repsol o Telefónica, aprendiendo a adaptar el diseño a industrias y necesidades totalmente distintas.\n\nEsa experiencia me preparó para uno de los retos más apasionantes de mi carrera en **General Software**: construir desde cero el sistema de diseño para Cofares. Ese proyecto marcó un antes y un después, ya que me permitió especializarme como Design System Architect y reforzar mi perfil híbrido como UX Engineer. Fue ahí donde descubrí cuánto me apasionaba no solo el diseño técnico, sino también la gestión de equipos y stakeholders.\n\nFinalmente, ese interés por la cultura de diseño me llevó a **Elastic Heads**, donde ejercí como **Design Lead**. Mi misión allí fue ayudar a crecer la estructura de la compañía y mentorizar a perfiles junior, asegurando que la calidad y la metodología fueran de la mano.\n\nHoy, la vida me ha traído a **Lima**. Me he mudado a la ciudad natal de mi esposa para acompañarla en su nuevo emprendimiento laboral, y me hace mucha ilusión afrontar esta etapa buscando nuevos retos donde pueda aportar toda esta experiencia acumulada en liderazgo y estrategia de diseño.",

      followups:[
        "Qué proyecto destacarías en Garaje de Ideas?",
        "Cuéntame sobre tu proyecto en Cofares",
        "Cuál fue tu rol como diseñador en Repsol?",
      ]
  },

  {
    id: "profile-move-lima",
    locale: "es-ES",
    question: "¿Por qué te mudaste a Lima?",
    match: [
      "por que te mudaste a lima",
      "por que te viniste a lima",
      "por que estas en lima",
      "que haces en lima",
      "motivo de vivir en lima",
      "por que vives en lima",
      "peru"
    ],
    answer:
      "Crucé el charco y me mudé a Lima por amor ❤️. En Madrid conocí a Carolina, mi esposa, y no dudé en acompañarla de vuelta a su ciudad natal para apoyarla en su emprendimiento de postres saludables. Esta etapa está siendo una **oportunidad para entender el diseño y el negocio en un contexto nuevo y diferente para mí**, donde busco nuevos retos profesionales que me permitan seguir creciendo como diseñador y aportar la experiencia que tengo acumulada en estos años trabajando con clientes de alto nivel en europa, con la misma ilusión con la que empecé.",
  },
  {
    id: "profile-tools",
    locale: "es-ES",
    question: "¿Qué herramientas manejas?",
    match: [
      "¿Qué herramientas manejas?",
      "que herramientas dominas",
      "que herramientas de diseño utilizas",
      "que herramientas conoces",
      "que usas para diseñar",
      "cual es tu herramienta de diseño favorita",
      "stack",
      "tecnologias",
      "gestion de trabajo",
      "proceso de trabajo"
    ],
    answer:
      "Mi proceso de trabajo nace y crece en **Figma**, donde centralizo todo: desde el research inicial y los workshops en **FigJam**, hasta prototipos avanzados y la colaboración real entre equipos. Cuando el proyecto necesita saltar a producción o requiere una presencia web rápida y sólida, confío en **Framer** y **Webflow** para la maquetación. Me apasiona el orden y la escalabilidad, por lo que gestiono Design Systems integrando herramientas como **Tokens Studio**, **Storybook**, **Style Dictionary** y **Zeroheight**. Además, no entiendo el diseño sin datos; por eso analizo comportamientos con **Google Analytics**, **Hotjar**, y **Helicone**, y profundizo en la experiencia del usuario mediante **Optimal Workshop** y **Lookback**. También me siento cómodo en el lado del desarrollo: manejo el stack técnico con **VS Code**, **Node.js** y **GitHub**, realizando despliegues en **Vercel** y gestionando contenidos con **Adobe Experience Manager** o **Storyblok**. Para que todo esto funcione en equipo, mantengo el orden y la comunicación apoyándome en **Notion**, **Jira**, **Linear** y el resto de herramientas de gestión que nos permiten remar en la misma dirección.",
  },

  {
    id: "figma-level",
    locale: "es-ES",
    question: "¿Cuál es tu nivel de figma?",
    match: [
      "cual es tu nivel en figma",
      "que sabes hacer en figma",
      "dominio de figma",
      "figma experto",
      "sabes usar figma",
      "prototipado en figma",
      "figma componentes",
      "figma skill",
      "usas figma",
      "nivel de figma",
      "variables en figma",
      "librerias figma",
      "themes figma",
    ],
    answer:
      "Mi dominio de **Figma es a nivel experto** y está totalmente orientado a la creación de productos profesionales escalables. No me limito a diseñar pantallas; construyo **Sistemas de Diseño** robustos utilizando Variables para gestionar colores, espaciados y radios, aprovechando los Modos para implementar temas (como el Light/Dark mode) o diferentes densidades de espaciados de forma automática.\n\nEn cuanto a la arquitectura de componentes, domino el uso de **Auto Layout 5.0**, las propiedades de componentes (Boolean, Instance swap, Text) y el uso de Variants, Instances y Slot components para mantener librerías que sean flexibles pero controladas.\n\nTengo la capacidad de crear, gestionar y escalar liberías de componentes que dan soporte a distintos productos y equipos.\n\nAdemás mi proceso de prototipado incluye **lógica avanzada** con variables y expresiones condicionales, lo que me permite realizar tests de usuario realistas con flujos que reaccionan a las acciones del usuario sin salir de la herramienta.\n\nFinalmente, priorizo un **handoff impecable**: organizo los archivos para que el equipo de desarrollo encuentre especificaciones claras, nombres de capas semánticos y una estructura de tokens que coincida con el código (apoyándome en plugins como Tokens Studio). Además, utilizo FigJam en las fases estratégicas para facilitar workshops de ideación y definir flujos de usuario de manera colaborativa.",
  },

{
    id: "home-portfolio-summary",
    locale: "es-ES",
    question: "¿Puedes hacerme un resumen de este portfolio?",
    match: [
      "quiero un resumen de este portfolio",
      "hazme un resumen de tu portfolio",
      "resumeme tu portfolio",
      "resume este portfolio",
      "resumen del portfolio",
      "qué proyectos tienes",
      "ver tus trabajos",
      "experiencia",
      "proyectos destacados",
      "casos de estudio",
      "¿qué has hecho?",
      "cuéntame de tu experiencia",
      "qué puedo encontrar en este portfolio"
    ],
    answer:
      "Mi portfolio se centra en productos digitales de alta complejidad y sistemas de diseño escalables, uniendo estrategia de UX con viabilidad técnica. Para contarte sobre mi experinecia he seleccionado tres casos de estudio clave que muestran diferentes procesos, metodologías y aprendizajes:\n\n**1. Repsol**: Te cuento cómo lideré este proyecto estratégico de diseño e investigación UX para redefinir el Portal del Empleado de Repsol con el objetivo de mejorar el día a día de los más de 25 mil empleados repartidos a lo largo de 15 países.\n **2. FC Barcelona**: En este case te cuento cómo una mejora en la experiencia de gestión de los partidos de los socios generó un beneficio de 1,6M€ al final de la temporada.\n **3. Cofares**: Aquí cuento los detalles de cómo un sistema de diseño bien estructurado ayudó a la empresa líder en logística farmacéutica de España a conseguir un 180% de ROI\n\nEn cada uno detallo el proceso de investigación, las decisiones de arquitectura y los resultados obtenidos.",
    followups: [
      "Quiero más detalles sobre el study case del FC Barcelona",
      "Quiero más detalles sobre el study case de Repsol",
      "Quiero más detalles sobre el study case de Cofares",
    ],
  },

  {
    id: "design-thinking-project",
    locale: "es-ES",
    question: "Cuéntame sobre algún proyecto utilizando Design Thinking",
    match: [
      "en qué proyectos has utilizado design thinking",
      "Cuéntame sobre algún proyecto donde hayas utilizado Design Thinking",
      "Cuéntame sobre algún proyecto donde hayas aplicado Design Thinking",
      "en que proyecto has aplicado design thinking",
      "siguiendo la metodologia design thinking",
      "a través de design thinking",
      "mediante Design Thinking",
      "usando Design Thinking",
      "con design thinking",
      "donde has usado design thinking"
    ],
    answer:
    "El proyecto donde apliqué Design Thinking con mayor impacto fue el rediseño del Portal Global de Repsol. El desafío consistió en transformar un ecosistema digital genérico y fragmentado en una herramienta personalizada de alto impacto, optimizando la experiencia para 25.000 empleados en 15 países.",
    followups: [
      "¿Cómo llevaste a cabo el proceso de investigación?",
      "¿Qué funcionalidades clave diseñaste para mejorar la productividad?",
      "¿Cómo lograste personalizar la experiencia para 25,000 empleados?",
    ],
  },

]




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
// ... dentro de tu BASE_SYSTEM_PROMPT ...

REGLA DE REDIRECCIÓN (FOLLOWUPS):
- Si el usuario pregunta por un tema general (ej. Historia del FC Barcelona, ubicación de una oficina, etc.) y no puedes responder directamente:
- Los followups DEBEN ser invitaciones directas a tus proyectos relacionados.
- Ejemplo: Si preguntan por el Barça, los followups deben ser: ["Cuéntame sobre el rediseño del FCB Store", "Cómo rediseñaste la app de socios del FC Barcelona"]. Si preguntan por Repsol, los followups deben ser: ["Cuéntame sobre el rediseño del portal del empleado de Repsol"] 
- Si preguntan por estudios generales, los followups deben ser: ["¿Cuál es tu formación?", "¿Qué herramientas de diseño dominas?"]

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
