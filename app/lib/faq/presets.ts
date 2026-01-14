// lib/faq/presets.ts
import type { FAQPreset } from "../constants"

export const FAQ_PRESETS: FAQPreset[] = [
  {
    id: "greeting",
    locale: "es-ES",
    triggers: [
      "hola",
      "hey",
      "buenas",
      "hello",
      "hi",
      "hola que tal",
      "hola, que tal",
      "hola como estas",
      "hola, como estas",
    ],
    answer:
      "¡Hola! Este asistente está pensado para ayudarte a explorar mi perfil profesional, mis proyectos y mi forma de trabajar. ¿Por dónde te gustaría empezar?",
    followups: [
      "¿Puedes hacerme un resumen de tu portfolio?",
      "¿Por dónde recomiendas empezar si es la primera vez que lo veo?",
      "¿Qué casos de estudio recomiendas ver primero?",
    ],
  },

  {
    id: "help_navigation",
    locale: "es-ES",
    triggers: [
      "que puedo preguntarte",
      "qué puedo preguntarte",
      "ayuda",
      "help",
      "como funciona",
      "cómo funciona",
    ],
    answer:
      "Puedes preguntarme por proyectos, liderazgo, metodología, proceso, design systems o impacto. Si prefieres, puedo guiarte paso a paso.",
    followups: [
      "¿Por dónde recomiendas empezar si es la primera vez que lo veo?",
      "¿Qué casos de estudio recomiendas ver primero?",
      "¿Qué contenidos destacados hay además de los case studies?",
    ],
  },

  {
    id: "portfolio_entrypoint",
    locale: "es-ES",
    triggers: [
      "portfolio",
      "portafolio",
      "ver portfolio",
      "ver trabajos",
      "ver proyectos",
      "casos",
      "case studies",
    ],
    answer:
      "Mi portfolio se estructura en casos de estudio y contenidos transversales (proceso, liderazgo, sistemas de diseño e impacto).",
    followups: [
      "¿Qué casos de estudio recomiendas ver primero?",
      "¿Puedes hacerme un resumen de tu portfolio?",
      "¿Qué contenidos destacados hay además de los case studies?",
    ],
  },

  {
    id: "projects_entrypoint",
    locale: "es-ES",
    triggers: [
      "proyectos",
      "casos de estudio",
      "case studies",
      "clientes",
      "trabajos",
    ],
    answer:
      "He trabajado en proyectos complejos en contextos B2B y B2C. Podemos entrar al detalle de cada caso.",
    followups: [
      "¿Qué problema detectaste en Repsol?",
      "¿Qué problema detectaste en la App de Socios del FC Barcelona?",
      "¿Qué problema detectaste en Cofares?",
    ],
  },

  {
    id: "profile_entrypoint",
    locale: "es-ES",
    triggers: [
      "perfil",
      "quien eres",
      "quién eres",
      "sobre ti",
      "háblame de ti",
      "hablame de ti",
      "experiencia",
      "trayectoria",
    ],
    answer:
      "Puedo contarte sobre mi perfil, trayectoria y enfoque profesional.",
    followups: [
      "¿Cuál es tu rol actual?",
      "¿Cuántos años de experiencia tienes?",
      "¿En qué industrias has trabajado?",
    ],
  },

  {
    id: "thanks",
    locale: "es-ES",
    triggers: ["gracias", "muchas gracias", "thank you", "thanks", "thx"],
    answer:
      "¡Gracias a ti! Si quieres seguir explorando, dime qué área te interesa.",
    followups: [
      "¿Qué casos de estudio recomiendas ver primero?",
      "¿Por dónde recomiendas empezar si es la primera vez que lo veo?",
      "¿Qué contenidos destacados hay además de los case studies?",
    ],
  },
]
