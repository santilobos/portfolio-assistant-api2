// lib/faq/anticipated.ts
import type { FAQAnticipated } from "../constants"

export const FAQ_ANTICIPATED: FAQAnticipated[] = [
  {
    id: "profile_origin_router",
    locale: "es-ES",
    question: "¿De dónde eres?",
    match: [
      "de donde eres",
      "dónde eres",
      "donde naciste",
      "naciste",
      "origen",
      "te has criado",
      "vida personal",
      "hablame de ti",
      "háblame de ti",
      "cuentame de ti",
      "cuéntame de ti",
      "sobre ti",
    ],
    answer:
      "Puedo contarte mi origen y contexto personal (Córdoba → Málaga → Barcelona/Madrid → Lima). ¿Qué parte te interesa?",
    followups: [
      "¿De dónde eres?",
      "¿Cómo ha sido tu trayectoria profesional?",
      "¿Qué te motiva a diseñar producto?",
    ],
  },

  {
    id: "profile_education_router",
    locale: "es-ES",
    question: "¿Dónde has estudiado?",
    match: [
      "donde has estudiado",
      "dónde has estudiado",
      "donde estudiaste",
      "dónde estudiaste",
      "estudios",
      "formación",
      "formacion",
      "universidad",
      "titulo",
      "máster",
      "master",
      "la gauss",
      "universidad de malaga",
      "universidad de málaga",
      "mr marcel",
      "the bridge",
    ],
    answer:
      "Te cuento mi formación académica y especializaciones, y cómo se conectan con mi perfil en producto y design systems.",
    followups: [
      "¿Cuál es tu formación académica?",
      "¿Qué másters o especializaciones tienes?",
      "¿Cómo mantienes tu aprendizaje continuo?",
    ],
  },

  {
    id: "profile_trajectory_router",
    locale: "es-ES",
    question: "¿Cuál es tu trayectoria profesional?",
    match: [
      "trayectoria",
      "experiencia",
      "donde has trabajado",
      "dónde has trabajado",
      "empresas",
      "garaje de ideas",
      "general software",
      "elastic heads",
      "barcelona",
      "madrid",
      "lead product designer",
      "senior product designer",
    ],
    answer:
      "Puedo resumirte mi rol actual, años de experiencia, tipo de productos y mi evolución profesional.",
    followups: [
      "¿Cuál es tu rol actual?",
      "¿Cuántos años de experiencia tienes?",
      "¿Cómo ha sido tu trayectoria profesional?",
    ],
  },

  {
    id: "profile_why_design_router",
    locale: "es-ES",
    question: "¿Por qué diseñas producto?",
    match: [
      "por que diseñas",
      "por qué diseñas",
      "por que producto",
      "por qué producto",
      "motivaciones",
      "que te motiva",
      "qué te motiva",
      "por que te gusta",
      "por qué te gusta",
    ],
    answer:
      "Te cuento por qué diseño producto y qué tipo de problemas me interesan.",
    followups: [
      "¿Qué te motiva a diseñar producto?",
      "¿Qué tipo de problemas te interesan?",
      "¿Qué no es negociable para ti?",
    ],
  },

  {
    id: "profile_tools_router",
    locale: "es-ES",
    question: "¿Qué herramientas manejas?",
    match: [
      "herramientas",
      "stack",
      "tooling",
      "figma",
      "figjam",
      "framer",
      "webflow",
      "tokens studio",
      "storybook",
      "style dictionary",
      "google analytics",
      "hotjar",
      "lookback",
      "github",
      "vs code",
      "vercel",
      "notion",
      "jira",
      "linear",
    ],
    answer:
      "Puedo contarte mi stack por áreas: diseño, prototipado, design systems, research/analytics, desarrollo y gestión.",
    followups: [
      "¿Cómo utilizas Figma en tu día a día?",
      "¿Cómo realizas prototipado avanzado en Figma?",
      "¿Cuándo decides usar Framer o Webflow?",
    ],
  },

  {
    id: "portfolio_summary_router",
    locale: "es-ES",
    question: "¿Puedes hacerme un resumen de este portfolio?",
    match: [
      "resumen del portfolio",
      "resume tu portfolio",
      "resumen de tu portfolio",
      "qué puedo encontrar en este portfolio",
      "que puedo encontrar en este portfolio",
      "por donde empezar",
      "por dónde empezar",
      "casos recomendados",
      "contenidos destacados",
    ],
    answer:
      "Si quieres ir rápido, te recomiendo empezar por los casos con más impacto y luego explorar proceso, liderazgo y design systems.",
    followups: [
      "¿Puedes hacerme un resumen de tu portfolio?",
      "¿Por dónde recomiendas empezar si es la primera vez que lo veo?",
      "¿Qué casos de estudio recomiendas ver primero?",
    ],
  },
]
