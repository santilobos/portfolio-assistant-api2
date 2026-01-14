// lib/faq/presets.ts
import type { FAQPreset } from "../constants"

export const FAQ_PRESETS: FAQPreset[] = [


      {
    id: "quick_most_complex_project",
    locale: "es-ES",
    triggers: [
      "¿cuál fue tu proyecto más complejo?",
      "cual fue tu proyecto mas complejo",
      "tu proyecto mas complejo",
      "proyecto más complejo",
      "proyecto mas complejo",
    ],
    answer:
      "Sin duda, el reto más complejo de mi carrera fue el rediseño del **Portal Global del Empleado para Repsol**, un ecosistema digital con alcance en 15 países. Lo más complejo fue diseñar una experiencia coherente que funcionara para miles de personas **(más de 25 mil empleados)** con culturas, roles y necesidades técnicas totalmente distintas, todo sin perder la eficiencia operativa de la compañía.",
    followups: [
      "¿Qué metodología empleaste en Repsol?",
      "¿Cómo llevaste a cabo la fase de investigación en Repsol?",
      "¿Qué decisiones de diseño tomaste en Repsol?",
    ],
  },

  {
    id: "quick_methodologies",
    locale: "es-ES",
    triggers: [
      "¿qué metodologías utilizas?",
      "que metodologias utilizas",
      "metodologías utilizas",
      "metodologias utilizas",
      "tu metodología",
      "tu metodologia",
    ],
    answer:
      "Mi metodología de trabajo no es rígida, sino que adapto las herramientas según el reto y la fase del producto, pero por lo general suelo acudir con frecuencia a Design Thinking, Lean Ux o Atomic Design.",
    followups: [
      "¿Cuándo utilizas Design Thinking?",
      "¿Cuándo utilizas Lean UX?",
      "¿Cuándo utilizas Atomic Design?",
    ],
  },

  {
    id: "quick_leadership_focus",
    locale: "es-ES",
    triggers: [
      "¿cómo enfocas el liderazgo en diseño de producto?",
      "como enfocas el liderazgo en diseño de producto",
      "liderazgo en diseño de producto",
      "cómo lideras",
      "como lideras",
    ],
    answer:
      "Mi visión del liderazgo parte de entender el diseño como una disciplina al servicio de las personas, del producto y del negocio, no como un fin en sí mismo. Liderar, para mí, no significa imponer decisiones, sino crear el contexto adecuado para que los equipos puedan pensar mejor, tomar decisiones informadas y construir soluciones con impacto real. Creo en un liderazgo cercano, basado en la confianza, la claridad y la responsabilidad compartida.",
    followups: [
      "¿Cómo ejerciste liderazgo en el proyecto de Repsol?",
      "¿Cómo ejerciste liderazgo en el proyecto del FC Barcelona?",
      "¿Cómo ejerciste liderazgo en el proyecto de Cofares?",
    ],
  },

    
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
      "Hola. Soy Santi Lobos (portfolio assistant).\nPuedo contarte sobre mis proyectos, mi proceso end-to-end, leadership o design systems. ¿Por dónde empezamos?",
    followups: [
      "¿Puedes hacerme un resumen de tu portfolio?",
      "¿Por dónde recomiendas empezar si es la primera vez que lo veo?",
      "¿Qué casos de estudio recomiendas ver primero?",
    ],
  },

  {
    id: "thanks",
    locale: "es-ES",
    triggers: ["gracias", "muchas gracias", "thank you", "thanks", "thx"],
    answer:
      "Gracias. Si quieres, profundizamos en un caso de estudio o en cómo trabajo.",
    followups: [
      "¿Qué casos de estudio recomiendas ver primero?",
      "¿Qué contenidos destacados hay además de los case studies?",
      "¿Por dónde recomiendas empezar si es la primera vez que lo veo?",
    ],
  },

  {
    id: "help",
    locale: "es-ES",
    triggers: [
      "que puedo preguntarte",
      "qué puedo preguntarte",
      "ayuda",
      "help",
      "como funciona",
      "cómo funciona",
      "por donde empiezo",
      "por dónde empiezo",
    ],
    answer:
      "Puedes preguntarme por casos de estudio, metodología, proceso end-to-end, design systems, herramientas o liderazgo.",
    followups: [
      "¿Qué casos de estudio recomiendas ver primero?",
      "¿Cuándo utilizas Design Thinking?",
      "¿Qué es un Design System para ti?",
    ],
  },

  {
    id: "profile_shortcut",
    locale: "es-ES",
    triggers: [
      "perfil",
      "tu perfil",
      "quien eres",
      "quién eres",
      "sobre ti",
      "háblame de ti",
      "hablame de ti",
      "rol actual",
      "experiencia",
      "años de experiencia",
      "industria",
      "industrias",
    ],
    answer:
      "Puedo resumirte mi perfil (rol, experiencia, trayectoria e industrias) y, si quieres, profundizamos en proyectos o en mi forma de trabajar.",
    followups: [
      "¿Cuál es tu rol actual?",
      "¿Cuántos años de experiencia tienes?",
      "¿En qué industrias has trabajado?",
    ],
  },

  {
    id: "projects_shortcut",
    locale: "es-ES",
    triggers: [
      "proyectos",
      "casos de estudio",
      "case studies",
      "portfolio",
      "portafolio",
      "qué proyectos tienes",
      "que proyectos tienes",
      "ver tus trabajos",
      "ver tus proyectos",
      "casos recomendados",
    ],
    answer:
      "Puedo contarte mis casos de estudio y el impacto en cada uno. ¿Cuál quieres ver primero?",
    followups: [
      "¿Qué problema detectaste en Repsol?",
      "¿Qué problema detectaste en la App de Socios del FC Barcelona?",
      "¿Qué problema detectaste en Cofares?",
    ],
  },

  {
    id: "methodologies_shortcut",
    locale: "es-ES",
    triggers: [
      "metodologias",
      "metodologías",
      "design thinking",
      "lean ux",
      "atomic design",
      "metodo",
      "método",
      "tu proceso",
      "cómo trabajas",
      "como trabajas",
    ],
    answer:
      "Puedo contarte cuándo uso (y cuándo no) Design Thinking, Lean UX o Atomic Design según el contexto.",
    followups: [
      "¿Cuándo utilizas Design Thinking?",
      "¿Cuándo utilizas Lean UX?",
      "¿Cuándo utilizas Atomic Design?",
    ],
  },

  {
    id: "process_shortcut",
    locale: "es-ES",
    triggers: [
      "proceso",
      "end to end",
      "end-to-end",
      "workflow",
      "discovery",
      "research",
      "investigacion",
      "investigación",
      "problem framing",
      "hipotesis",
      "hipótesis",
      "handoff",
      "testing",
      "mejora continua",
    ],
    answer:
      "Puedo explicarte mi proceso end-to-end: discovery, definición, ideación, delivery e iteración, con ejemplos prácticos.",
    followups: [
      "¿Cómo realizas research cualitativo?",
      "¿Cómo defines correctamente un problema de diseño?",
      "¿Cómo realizas el handoff a desarrollo?",
    ],
  },

  {
    id: "leadership_shortcut",
    locale: "es-ES",
    triggers: [
      "liderazgo",
      "liderar",
      "como lideras",
      "cómo lideras",
      "mentoring",
      "stakeholders",
      "gestión de stakeholders",
      "gestion de stakeholders",
      "gestión de equipos",
      "gestion de equipos",
      "leadership",
    ],
    answer:
      "Puedo contarte mi enfoque de liderazgo (visión, stakeholders, mentoring y toma de decisiones) y cómo lo apliqué por contexto.",
    followups: [
      "¿Cómo entiendes el liderazgo en diseño?",
      "¿Cómo gestionas stakeholders en proyectos complejos?",
      "¿Cómo trabajas el mentoring y crecimiento de equipos?",
    ],
  },

  {
    id: "design_systems_shortcut",
    locale: "es-ES",
    triggers: [
      "design system",
      "design systems",
      "sistema de diseño",
      "sistemas de diseño",
      "tokens",
      "variables",
      "storybook",
      "style dictionary",
      "roi design system",
      "gobernanza",
    ],
    answer:
      "Puedo contarte cómo entiendo y construyo design systems (tokens, gobernanza, colaboración con dev y ROI).",
    followups: [
      "¿Qué es un Design System para ti?",
      "¿Cómo construyes un Design System desde cero?",
      "¿Cómo demuestras el ROI de un Design System?",
    ],
  },

  {
    id: "tools_shortcut",
    locale: "es-ES",
    triggers: [
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
      "vscode",
      "vs code",
      "vercel",
      "notion",
      "jira",
      "linear",
    ],
    answer:
      "Puedo contarte mi stack por áreas (diseño, prototipado, design systems, research/analytics, dev y gestión).",
    followups: [
      "¿Cómo utilizas Figma en tu día a día?",
      "¿Cómo realizas prototipado avanzado en Figma?",
      "¿Cuándo decides usar Framer o Webflow?",
    ],
  },

  {
    id: "services_shortcut",
    locale: "es-ES",
    triggers: [
      "servicios",
      "ofreces",
      "ofertas",
      "consultoria",
      "consultoría",
      "mentoring profesional",
      "ux strategy",
      "design ops",
    ],
    answer:
      "Puedo contarte qué servicios ofrezco (Product Design, Design Systems, UX Strategy, Design Ops, mentoring y consultoría).",
    followups: [
      "¿Qué servicios de Product Design ofreces?",
      "¿Ofreces servicios de Design Systems?",
      "¿Ofreces consultoría UX?",
    ],
  },

  {
    id: "impact_shortcut",
    locale: "es-ES",
    triggers: [
      "impacto",
      "resultados",
      "metricas",
      "métricas",
      "roi",
      "conversion",
      "conversión",
      "productividad",
      "casos con impacto",
      "impacto economico",
      "impacto económico",
      "decisiones dificiles",
      "decisiones difíciles",
      "aprendizajes",
      "errores",
    ],
    answer:
      "Puedo explicarte cómo mido impacto (ROI, conversión, productividad) y ejemplos de decisiones complejas y aprendizajes.",
    followups: [
      "¿Cómo defines tu enfoque sobre resultados e impacto?",
      "¿Puedes contarme casos con impacto económico medible?",
      "¿Qué métricas utilizas para demostrar ROI?",
    ],
  },
]
