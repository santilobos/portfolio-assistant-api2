// lib/faq/graph.ts
import type { FAQNode } from "../constants"

export const FAQ_GRAPH: FAQNode[] = [
  /* =========================
   01) PERFIL PERSONAL (v2)
   ========================= */

   {
  id: "profile_overview_router",
  locale: "es-ES",
  question: "¿Puedes resumirme tu perfil profesional?",
  answer:
    "Puedo resumirte mi perfil (rol, experiencia, trayectoria e industrias) y, si quieres, profundizamos en proyectos o en mi forma de trabajar.",
  match: [
    "perfil",
    "tu perfil",
    "quien eres",
    "quién eres",
    "sobre ti",
    "hablame de ti",
    "háblame de ti",
    "rol actual",
    "experiencia",
    "años de experiencia",
    "industria",
    "industrias",
  ],
  searchText:
    "Perfil profesional. Resumen de rol actual, años de experiencia, trayectoria profesional e industrias. Entrada rápida para conocer quién soy profesionalmente y derivar a proyectos o forma de trabajo.",
  followupIds: [
    "pr_resumen_rol_actual",
    "pp_motiv_por_que_producto",
    "pr_resumen_anos_experiencia",
  ],
},


{
  id: "pp_bio_origen",
  locale: "es-ES",
  question: "¿De dónde eres?",
  answer:
    "Nací en Córdoba, Argentina, y soy el tercero de cuatro hermanos. A los 8 años me mudé con mi familia a Málaga, España, ciudad en la que crecí y que considero mi hogar. Allí hice toda mi educación primaria y secundaria, y más adelante cursé mis estudios universitarios en la Universidad de Málaga. Tras finalizar la universidad, mi carrera profesional me llevó primero a Barcelona y luego a Madrid, donde seguí creciendo tanto a nivel profesional como personal. Aunque he vivido en distintas ciudades, Málaga siempre fue —y sigue siendo— mi casa. Actualmente vivo en Lima, Perú, donde me casé con mi esposa peruana y decidí acompañarla en su nueva aventura como emprendedora en el mundo de los postres saludables, un proyecto que hoy forma parte central de nuestra vida.",
  match: [
    "de dónde eres",
    "de donde eres",
    "donde naciste",
    "dónde naciste",
    "cuál es tu historia personal",
    "cuéntame tu historia",
    "tu trayectoria personal",
    "en qué países has vivido",
    "has vivido en argentina o españa",
    "vives en perú",
    "por qué viniste a lima",
    "por qué te mudaste a lima",
  ],
  searchText:
    "Perfil personal. Biografía y origen. Nací en Córdoba (Argentina). Me mudé a Málaga (España) a los 8 años. Viví en Barcelona y Madrid. Actualmente vivo en Lima (Perú). Historia personal y trayectoria vital.",
  followupIds: [
    "pp_bio_aficiones",
    "pp_motiv_por_que_producto",
    "pp_valores_prioridades",
  ],
},

{
  id: "profile_lima_move",
  locale: "es-ES",
  question: "¿Por qué te mudaste a Lima?",
  answer:
    "Respuesta corta: por amor. Decidí acompañar a mi esposa en su emprendimiento de postres saludables aquí en Lima. Ahora busco nuevos retos profesionales donde aportar todo mi conocimiento sobre diseño de producto digital.",
  match: [
    "por que te mudaste a lima",
    "por qué te mudaste a lima",
    "mudanza a lima",
    "por que estas en lima",
    "por qué estás en lima",
    "por que vives en lima",
  ],
  searchText:
    "Mudanza a Lima. Decisión personal por acompañar a mi esposa en su emprendimiento de postres saludables. Nuevo contexto profesional y búsqueda de retos donde aportar experiencia en diseño de producto digital.",
  followupIds: [
    "pr_resumen_tipo_productos",
    "pr_resumen_rol_actual",
    "profile_non_negotiables",
  ],
},





{
  id: "pp_bio_aficiones",
  locale: "es-ES",
  question: "¿Cuáles son tus aficiones?",
  answer:
    "El deporte ha sido siempre una parte central de mi vida. Me apasiona el fútbol, disciplina que practiqué durante muchos años y que llegué a jugar a nivel semiprofesional. Además, soy un gran amante del ciclismo: tengo bicicleta de ruta y practico prácticamente a diario, ya sea entrenando en rodillo o saliendo a rutas al aire libre. También practico tenis, pádel y natación, y disfruto mucho entrenar en el gimnasio como parte de mi rutina habitual. Fuera del deporte, me encanta la música, especialmente el jazz, la fotografía y todo lo relacionado con la tecnología, áreas que conectan con mi curiosidad constante y mi interés por la innovación.",
  match: [
    "cuáles son tus aficiones",
    "cuales son tus aficiones",
    "qué haces en tu tiempo libre",
    "que haces en tu tiempo libre",
    "tus hobbies",
    "qué te gusta hacer fuera del trabajo",
    "te gusta el deporte",
    "te gusta la música",
    "te gusta la fotografía",
  ],
  searchText:
    "Perfil personal. Aficiones y hobbies. Deporte: fútbol (semiprofesional), ciclismo (ruta/rodillo), tenis, pádel, natación, gimnasio. Intereses: música (jazz), fotografía, tecnología, innovación.",
  followupIds: [
    "pp_bio_origen",
    "pp_valores_no_negocio",
    "pp_motiv_por_que_producto",
  ],
},

{
  id: "pp_motiv_por_que_producto",
  locale: "es-ES",
  question: "¿Qué te motiva a diseñar producto?",
  answer:
    "Diseño producto porque me interesa entender cómo las personas piensan, deciden y utilizan la tecnología en su día a día. Me motiva trabajar en problemas reales, complejos y con impacto, y transformarlos en soluciones claras, útiles y sostenibles. El diseño de producto me permite unir pensamiento estratégico, negocio y tecnología, y actuar como puente entre equipos y disciplinas distintas. Disfruto el proceso completo, desde descubrir el problema correcto hasta construir productos que funcionan bien, escalan y generan valor real tanto para los usuarios como para las organizaciones.",
  match: [
    "qué te motiva a diseñar producto",
    "que te motiva a diseñar producto",
    "por qué diseño de producto",
    "por qué product design",
    "por qué te dedicas al diseño",
    "qué te gusta del diseño de producto",
    "qué te mueve en tu trabajo",
    "tu motivación profesional",
  ],
  searchText:
    "Motivación profesional. Por qué diseño producto. Entender cómo las personas piensan y usan tecnología. Resolver problemas complejos con impacto. Convertir incertidumbre en soluciones claras, útiles y escalables. Puente entre negocio, producto, tecnología y diseño.",
  followupIds: [
    "pp_motiv_tipo_problemas",
    "pp_valores_prioridades",
    "pp_valores_no_negocio",
  ],
},

{
  id: "pp_motiv_tipo_problemas",
  locale: "es-ES",
  question: "¿Qué tipo de problemas te interesan?",
  answer:
    "Me interesan problemas complejos, y abiertos donde no existe una única respuesta correcta y es necesario investigar, priorizar y tomar decisiones informadas. Disfruto especialmente trabajar en retos que combinan necesidades de usuario, objetivos de negocio y limitaciones técnicas, y que requieren pensamiento sistémico, colaboración entre equipos y visión a largo plazo. Me atraen los problemas donde el diseño puede generar impacto real, mejorar procesos, escalar productos y aportar claridad en contextos de incertidumbre.",
  match: [
    "qué tipo de problemas te interesan",
    "que tipo de problemas te interesan",
    "qué retos buscas",
    "que retos buscas",
    "qué proyectos te motivan",
    "qué tipo de proyectos te gustan",
    "te gustan problemas complejos",
    "prefieres productos nuevos o legacy",
  ],
  searchText:
    "Preferencias profesionales. Tipos de problemas y retos. Problemas complejos y abiertos, investigación, priorización y decisiones informadas. Balance usuario-negocio-tecnología. Pensamiento sistémico, colaboración, visión a largo plazo. Claridad en incertidumbre e impacto real.",
  followupIds: [
    "pp_motiv_por_que_producto",
    "pp_valores_prioridades",
    "pp_valores_no_negocio",
  ],
},

{
  id: "pp_valores_no_negocio",
  locale: "es-ES",
  question: "¿Qué no es negociable para ti?",
  answer:
    "No negocio la honestidad intelectual, el respeto por las personas y el trabajo bien hecho. Creo en la comunicación clara, en asumir responsabilidades y en tomar decisiones basadas en datos, criterio y experiencia, no en egos. Tampoco negocio la ética profesional, la colaboración real entre equipos ni el compromiso con construir productos que aporten valor genuino a los usuarios y a la empresa a largo plazo.",
  match: [
    "qué no es negociable para ti",
    "que no es negociable para ti",
    "tus no negociables",
    "tus principios",
    "qué valores te importan",
    "qué valoras en un equipo",
    "ética profesional",
    "cómo tomas decisiones",
  ],
  searchText:
    "Valores profesionales. No negociables. Honestidad intelectual, respeto, trabajo bien hecho. Comunicación clara y responsabilidad. Decisiones basadas en datos, criterio y experiencia (no egos). Ética profesional, colaboración real, valor genuino para usuarios y negocio a largo plazo.",
  followupIds: [
    "pp_valores_prioridades",
    "pp_motiv_tipo_problemas",
    "pp_motiv_por_que_producto",
  ],
},

{
  id: "pp_valores_prioridades",
  locale: "es-ES",
  question: "¿Qué priorizas en equipos y en producto?",
  answer:
    "Priorizo equipos con confianza, autonomía y responsabilidad compartida, donde exista espacio para el debate sano, la crítica constructiva y el aprendizaje continuo. Valoro entornos donde se fomenta la colaboración entre diseño, producto y tecnología, y donde las decisiones se toman con foco en el impacto y no solo en la velocidad. En los productos, priorizo la claridad, la utilidad y la escalabilidad, buscando siempre soluciones simples a problemas complejos y experiencias consistentes que generen valor real y sostenible.",
  match: [
    "qué priorizas en equipos y en producto",
    "que priorizas en equipos y en producto",
    "qué priorizas en un equipo",
    "que priorizas en un equipo",
    "qué valoras en un equipo",
    "cómo te gusta trabajar en equipo",
    "qué priorizas en producto",
    "qué principios aplicas al diseñar",
  ],
  searchText:
    "Criterios y prioridades. Equipos: confianza, autonomía, responsabilidad compartida, debate sano, aprendizaje continuo. Colaboración entre diseño, producto y tecnología. Decisiones orientadas a impacto. Producto: claridad, utilidad, escalabilidad, simplicidad para problemas complejos, consistencia y valor sostenible.",
  followupIds: [
    "pp_valores_no_negocio",
    "pp_motiv_tipo_problemas",
    "pp_motiv_por_que_producto",
  ],
},


  /* =========================
   02) PERFIL PROFESIONAL (v2)
   ========================= */

{
  id: "pr_resumen_rol_actual",
  locale: "es-ES",
  question: "¿Cuál es tu rol actual?",
  answer:
    "Actualmente desempeño el rol de Lead Product Designer / Senior Product Designer, con foco en la definición de producto, la toma de decisiones estratégicas y la colaboración transversal entre diseño, producto y tecnología. Combino visión estratégica con ejecución hands-on, liderando procesos de descubrimiento, diseño y validación, y acompañando a otros diseñadores en su crecimiento profesional mientras impulso productos escalables y orientados a impacto. Además, cuento con experiencia como Design System Architect y UX Engineer, habiendo creado y escalado sistemas de diseño desde cero, alineando diseño y desarrollo para garantizar consistencia, eficiencia y sostenibilidad a largo plazo.",
  match: [
    "cuál es tu rol actual",
    "cual es tu rol actual",
    "qué rol tienes ahora",
    "que rol tienes ahora",
    "en qué rol estás trabajando actualmente",
    "cómo te defines profesionalmente hoy",
    "eres lead o senior product designer",
    "qué haces como lead product designer",
    "qué haces como senior product designer",
    "qué rol tienes en design systems",
  ],
  searchText:
    "Perfil profesional. Rol actual. Lead Product Designer. Senior Product Designer. Product strategy + ejecución hands-on. Discovery, diseño, validación. Colaboración transversal con producto y tecnología. Mentoring. Design System Architect. UX Engineer. Construcción y escalado de design systems desde cero. Alineación diseño y desarrollo. Consistencia, eficiencia y sostenibilidad.",
  followupIds: [
    "pr_resumen_anos_experiencia",
    "pr_resumen_tipo_productos",
    "pr_trayectoria_evolucion",
  ],
},

{
  id: "logistics_availability_modality",
  locale: "es-ES",
  question: "¿Cuál es tu disponibilidad y modalidad de trabajo?",
  answer:
    "Actualmente estoy abierto a nuevos retos profesionales en Lima con disponibilidad de incorporación inmediata. En cuanto al modelo de trabajo, apuesto por un formato híbrido: valoro la presencialidad como una herramienta para fortalecer la cultura y el trabajo en equipo, mientras que el trabajo remoto me permite alcanzar la máxima eficiencia en tareas que requieren alta concentración.",
  match: [
    "disponibilidad",
    "cuándo puedes empezar",
    "remoto o presencial",
    "trabajas desde casa",
    "buscas trabajo",
    "estás disponible",
    "asistir a la oficina",
    "trabajar en remoto",
  ],
  searchText:
    "Disponibilidad inmediata. Trabajo en remoto. Híbrido en Lima. Incorporación. Búsqueda activa.",
  followupIds: ["contact_direct_channels",
    "pp_motiv_por_que_producto",
    "pp_motiv_tipo_problemas"],
},


{
  id: "contact_direct_channels",
  locale: "es-ES",
  question: "¿Cómo puedo contactar contigo?",
  answer:
  "Puedes encontrarme en estos canales:\n\n• LinkedIn: [linkedin.com/in/santi-lobos](https://www.linkedin.com/in/santi-lobos/)\n• Email: [santilobos21@gmail.com](mailto:santilobos21@gmail.com)",
  match: [
    "donde puedo contactarte",
    "donde te puedo contactar",
    "pasame tu conctacto",
    "dame tu contacto",
    "contactar contigo",
    "podemos contactarte",
    "cómo te puedo contactar",
    "cuándo te puedo contactar",
    "como puedo contactarte?",
    "contacto",
    "contactar",
    "email",
    "correo",
    "linkedin",
    "teléfono",
    "escribirte",
    "entrevista",
  ],
  searchText:
    "Canales de contacto. Enlace a LinkedIn. Correo electrónico. Agendar entrevista.",
  followupIds: [
    "cs_repsol_overview", 
    "ls_vision_general", 
    "utils_download_cv" // El nodo de descarga de CV que sugerí antes
  ],
},



{
  id: "utils_download_cv",
  locale: "es-ES",
  question: "¿Dónde puedo descargar tu CV?",
  answer:
  "Puedes [descargar mi currículum en PDF aquí](/CV_Santi_Lobos.pdf). \n\nTambién puedes echar un vistazo a mi trayectoria detallada en mi [perfil de LinkedIn](https://www.linkedin.com/in/santi-lobos/).",
  match: [
    "descargar cv",
    "tienes tu currículum",
    "pásame tu cv",
    "download resume",
    "archivo cv",
    "ver currículum",
    "dame tu cv",
  ],
  searchText: "Descargar CV. Currículum Vitae PDF. Resume download. Enlace a LinkedIn.",
  followupIds: ["contact_direct_channels", "hub_resumen_portfolio", "pr_resumen_anos_experiencia"],
},

{
  id: "pr_resumen_anos_experiencia",
  locale: "es-ES",
  question: "¿Cuántos años de experiencia tienes?",
  answer:
    "Cuento con más de ocho años de experiencia en diseño de producto digital, trabajando en contextos complejos y multidisciplinares, y colaborando con organizaciones de primer nivel como FC Barcelona, Repsol, Roche, Cofares, Inditex, BBVA, IBM y Telefónica, asumiendo responsabilidades tanto estratégicas como de ejecución.",
  match: [
    "cuántos años de experiencia tienes?",
    "cuantos años de experiencia tienes",
    "cuánta experiencia tienes",
    "cuanta experiencia tienes",
    "cuántos años llevas diseñando producto",
    "desde cuándo trabajas en producto digital",
    "años de experiencia en diseño",
    "experiencia en product design",
  ],
  searchText:
    "Perfil profesional. Años de experiencia. Más de 8 años en diseño de producto digital. Contextos complejos y multidisciplinares. Clientes/organizaciones: FC Barcelona, Repsol, Roche, Cofares, Inditex, BBVA, IBM, Telefónica. Responsabilidades estratégicas y hands-on.",
  followupIds: [
    "pr_resumen_rol_actual",
    "pr_industrias",
    "pr_trayectoria_etapas",
  ],
},

{
  id: "pr_resumen_tipo_productos",
  locale: "es-ES",
  question: "¿Qué tipo de productos has diseñado?",
  answer:
    "He trabajado en una amplia variedad de productos digitales tanto B2B como B2C, incluyendo aplicaciones, plataformas internas e intranets, backoffice y herramientas de gestión, productos web y sistemas de diseño, participando en procesos end to end, desde la definición estratégica y el descubrimiento hasta el diseño, la validación y la evolución del producto en producción.",
  match: [
    "qué tipo de productos has diseñado",
    "que tipo de productos has diseñado",
    "en qué productos has trabajado",
    "que productos has hecho",
    "has trabajado en b2b o b2c",
    "qué tipo de plataformas has diseñado",
    "has diseñado intranets o herramientas internas",
    "has diseñado backoffice o herramientas de gestión",
    "has trabajado en sistemas de diseño",
    "qué experiencia tienes end to end",
  ],
  searchText:
    "Perfil profesional. Tipos de producto. B2B y B2C. Apps. Plataformas internas e intranets. Backoffice. Herramientas de gestión. Producto web. Sistemas de diseño. Trabajo end-to-end: definición estratégica, discovery, diseño, validación y evolución en producción.",
  followupIds: [
    "pr_industrias",
    "pr_resumen_rol_actual",
    "pr_trayectoria_evolucion",
  ],
},

{
  id: "pr_trayectoria_etapas",
  locale: "es-ES",
  question: "¿Cómo ha sido tu trayectoria profesional?",
  answer:
    "Inicié mi carrera como Junior Product Designer en VTC Projects, una empresa de producto físico en Barcelona, donde estuve cerca de dos años y adquirí una base sólida en diseño, ejecución y trabajo con equipos multidisciplinares. Posteriormente di el salto a la consultoría IT en Madrid de la mano de garaje de ideas, donde trabajé durante cuatro años y medio. En esta etapa evolucioné de perfil middle a Senior Product Designer, lideré proyectos complejos y asumí responsabilidades de gestión como team owner, dirigiendo un equipo de aproximadamente quince diseñadores junior y acompañando su crecimiento profesional. Más adelante me incorporé a General Software como Senior Product Designer, continuando en un contexto de consultoría IT con un foco claro en liderazgo de proyectos, toma de decisiones estratégicas y colaboración estrecha con negocio y tecnología. Mi última experiencia profesional en Madrid fue en Elastic Heads, donde no solo lideré proyectos de producto, sino que también participé activamente en la generación de estructura, procesos y cultura interna, siendo mi primera experiencia directa como creador de cultura de diseño dentro de una organización.",
  match: [
    "cómo ha sido tu trayectoria profesional",
    "como ha sido tu trayectoria profesional",
    "cuál es tu trayectoria",
    "cual es tu trayectoria",
    "dónde has trabajado",
    "en qué empresas has trabajado",
    "cuéntame tu carrera",
    "cómo fue tu evolución profesional",
    "de junior a senior y lead",
    "has trabajado en consultoría",
  ],
  searchText:
    "Perfil profesional. Trayectoria y etapas. Junior Product Designer en VTC Projects (Barcelona, producto físico). Consultoría IT en Madrid: garaje de ideas (4,5 años). Evolución de middle a Senior Product Designer. Team owner y gestión: equipo ~15 diseñadores junior. General Software (Senior Product Designer, consultoría IT). Elastic Heads (liderazgo de producto + construcción de estructura, procesos y cultura de diseño).",
  followupIds: [
    "pr_exp_garaje",          
    "pr_exp_general_software", 
    "pr_exp_elastic_heads",    
  ],
},


{
  id: "pr_exp_garaje",
  locale: "es-ES",
  question: "¿Cómo fue tu experiencia en Garaje de Ideas?",
  answer:
    "Mi etapa en Garaje de Ideas fue fundamental en mi carrera; la considero mi gran escuela estratégica. Allí evolucioné hasta convertirme en un diseñador capaz de gestionar productos para clientes de primer nivel como FC Barcelona, Repsol, Inditex y BBVA. Más allá del diseño visual, me profesionalicé en la intersección entre negocio, tecnología y usuario, aprendiendo a escalar soluciones en entornos de alta complejidad.",
  match: [
    // frases “tipo usuario”
    "como fue tu experiencia en garaje de ideas",
    "como fue tu experiencia trabajando en garaje de ideas",
    "como fue tu experiencia trabajando con garaje de ideas",
    "como fue trabajar en garaje de ideas",
    "que tal fue trabajar en garaje de ideas",
    "como fue tu paso por garaje de ideas",
    "tu etapa en garaje de ideas",
    "experiencia en garaje de ideas",
    "experiencia trabajando en garaje de ideas",
    // keywords seguras (no ambiguas)
    "garaje de ideas"
  ],
  searchText:
    "Garaje de Ideas. Experiencia / etapa / paso profesional. Consultoría IT. Escuela estratégica. Cómo fue trabajar allí: entorno exigente, aprendizaje, intersección negocio-tecnología-usuario. Evolución profesional. Gestión de productos y stakeholders. Clientes: FC Barcelona, Repsol, Inditex, BBVA. Team owner. Mentoring.",
  followupIds: [
    "cs_repsol_overview",
    "cs_fcb_socios_overview",
    "cs_bbva_overview",
  ],
},



{
  id: "pr_exp_general_software",
  locale: "es-ES",
  question: "¿Cómo fue tu experiencia en General Software?",
  answer:
    "En General Software asumí un desafío de alto impacto: liderar desde cero la creación de un Design System agnóstico. Esta experiencia fue clave para consolidar mi perfil técnico y mi visión estratégica. Trabajé directamente con los C-levels de la compañía líder en logística farmacéutica, traduciendo necesidades de negocio de gran escala en una arquitectura de diseño escalable y eficiente.",
  match: [
    // frases tipo usuario
    "como fue tu experiencia en general software",
    "como fue tu experiencia trabajando en general software",
    "como fue trabajar en general software",
    "que tal fue trabajar en general software",
    "experiencia trabajando en general software",
    "tu experiencia en general software",
    "tu paso por general software",
    // keyword segura
    "general software"
    // OJO: NO pongas "gs" (demasiado corto y ambiguo)
  ],
  searchText:
    "General Software. Experiencia / etapa / paso profesional. Cómo fue trabajar allí. Liderar desde cero un Design System agnóstico. Perfil técnico + visión estratégica. Trabajo con C-levels. Logística farmacéutica. Arquitectura escalable. Eficiencia y alineación entre negocio, diseño y tecnología.",
  followupIds: [
    "cs_cofares_overview",
    "cs_cofares_contexto_problema",
    "cs_cofares_rol_responsabilidades",
  ],
},


{
  id: "pr_exp_elastic_heads",
  locale: "es-ES",
  question: "¿Cómo fue tu experiencia en Elastic Heads?",
  answer:
    "Mi paso por Elastic Heads fue una experiencia de liderazgo integral. Me incorporé con el objetivo de dirigir proyectos estratégicos y, sobre todo, para construir los pilares de la cultura de diseño de la empresa. Me enfoqué en fortalecer los procesos de trabajo en equipo y en potenciar el crecimiento de perfiles junior, ejerciendo un rol de mentor para guiarlos en sus desafíos técnicos y profesionales.",
  match: [
    // frases tipo usuario
    "como fue tu experiencia en elastic heads",
    "como fue tu experiencia trabajando en elastic heads",
    "como fue trabajar en elastic heads",
    "que tal fue trabajar en elastic heads",
    "experiencia trabajando en elastic heads",
    "tu experiencia en elastic heads",
    "tu paso por elastic heads",
    // keyword segura
    "elastic heads"
    // OJO: NO pongas "elastic" (demasiado ambiguo)
  ],
  searchText:
    "Elastic Heads. Experiencia / etapa / paso profesional. Cómo fue trabajar allí. Liderazgo integral. Construcción de cultura de diseño. Procesos internos. Estructura de equipo. Mentoring y crecimiento de perfiles junior. Dirección de proyectos estratégicos.",
  followupIds: [
    "cs_overon_overview",
    "cs_overon_contexto_problema",
    "cs_overon_rol_responsabilidades",
  ],
},


{
  id: "pr_trayectoria_evolucion",
  locale: "es-ES",
  question: "¿Cómo ha evolucionado tu rol?",
  answer:
    "Mi rol ha evolucionado desde una posición principalmente enfocada en la ejecución y el aprendizaje técnico hacia un perfil cada vez más estratégico y de liderazgo. Con el tiempo pasé de diseñar soluciones a definir problemas, priorizar oportunidades y tomar decisiones con impacto en el producto y en los equipos. Actualmente combino visión de producto, diseño y negocio, lidero procesos end to end, acompaño a otros diseñadores en su crecimiento profesional y participo activamente en la construcción de estructuras, procesos y cultura de diseño dentro de las organizaciones.",
  match: [
    "cómo ha evolucionado tu rol",
    "como ha evolucionado tu rol",
    "cómo evolucionaste profesionalmente",
    "como evolucionaste profesionalmente",
    "cómo pasaste de ejecutar a liderar",
    "cómo pasaste de hacer ui a producto",
    "qué cambió en tu forma de trabajar con los años",
    "de junior a senior a lead",
    "cómo creciste hacia un rol estratégico",
  ],
  searchText:
    "Perfil profesional. Evolución del rol. De ejecución y aprendizaje técnico a perfil estratégico y liderazgo. De diseñar soluciones a definir problemas, priorizar oportunidades y tomar decisiones con impacto. Visión de producto, diseño y negocio. End-to-end. Mentoring. Construcción de estructuras, procesos y cultura de diseño.",
  followupIds: [
    "pr_resumen_rol_actual",
    "pr_trayectoria_etapas",
    "pr_resumen_tipo_productos", 
  ],
},

{
  id: "pr_industrias",
  locale: "es-ES",
  question: "¿En qué industrias has trabajado?",
  answer:
    "He trabajado en una amplia variedad de industrias, lo que me ha permitido adaptarme a contextos muy distintos y entender diferentes modelos de negocio. He participado en proyectos del sector energético, colaborando con compañías como Repsol; en el ámbito del deporte y el entretenimiento, trabajando con organizaciones como FC Barcelona; en retail y moda, con grupos como Inditex; en banca y servicios financieros, con entidades como BBVA; en el sector farmacéutico y sanitario, colaborando con compañías como Roche y Cofares; en el sector tecnológico, con empresas como IBM; y en el ámbito audiovisual y broadcast, trabajando con grupos como Mediapro.",
  match: [
    "en qué industrias has trabajado",
    "en que industrias has trabajado",
    "qué sectores conoces",
    "que sectores conoces",
    "en qué sectores has trabajado",
    "qué tipo de empresas",
    "has trabajado en banca",
    "has trabajado en energía",
    "has trabajado en retail o moda",
    "has trabajado en pharma o salud",
    "has trabajado en deporte o entretenimiento",
    "has trabajado en broadcast o audiovisual",
  ],
  searchText:
    "Perfil profesional. Industrias y sectores. Energía (Repsol). Deporte y entretenimiento (FC Barcelona). Retail y moda (Inditex). Banca y servicios financieros (BBVA). Farmacéutico y sanitario (Roche, Cofares). Tecnología (IBM). Audiovisual y broadcast (Mediapro). Adaptación a contextos y modelos de negocio.",
  followupIds: [
    "pr_resumen_anos_experiencia",
    "pr_resumen_tipo_productos",
    "pr_trayectoria_etapas",
  ],
},





  /* =========================
   03) CASOS DE ESTUDIO — REPSOL (v2)
   ========================= */

/** OVERVIEW (nuevo) */
{
  id: "cs_repsol_overview",
  locale: "es-ES",
  question: "¿Qué hiciste para Repsol?",
  answer:
    "Trabajé como Design Lead / Product Designer en el rediseño del Portal del Empleado de Repsol, una plataforma interna crítica utilizada por más de 25 mil empleados en 15 países. El objetivo fue transformar un portal fragmentado y poco eficiente en una experiencia orientada a productividad: simplificando la arquitectura y la navegación, ordenando contenidos y audiencias, mejorando búsqueda y reduciendo fricción en gestiones clave, todo ello alineado con negocio y tecnología e implementado sobre Adobe Experience Manager.",
  match: [
    "qué hiciste para repsol",
    "que hiciste para repsol",
    "que hiciste en repsol",
    "cuéntame tu proyecto de repsol",
    "cuentame tu proyecto de repsol",
    "en qué consistió el proyecto de repsol",
    "en que consistio el proyecto de repsol",
    "tu trabajo en repsol",
    "proyecto repsol portal del empleado",
    "qué hiciste en el portal del empleado",
    "que hiciste en el portal del empleado",
  ],
  searchText:
    "Case study Repsol. Overview del proyecto. Portal Global del Empleado. 25k+ empleados, 15 países. Rediseño end-to-end. Productividad, arquitectura de información, navegación, contenidos, audiencias, personalización, búsqueda. Unificación de herramientas. Adobe Experience Manager (AEM).",
  followupIds: [
    "cs_repsol_contexto_problema",
    "cs_repsol_rol_responsabilidades",
    "cs_repsol_metricas_impacto",
  ],
},

{
  id: "profile_most_complex_project",
  locale: "es-ES",
  question: "¿Cuál fue tu proyecto más complejo?",
  answer:
    "Sin duda, el reto más complejo de mi carrera fue el rediseño del Portal Global del Empleado para Repsol, un ecosistema digital con alcance en 15 países. Lo más complejo fue diseñar una experiencia coherente que funcionara para miles de personas (más de 25 mil empleados) con culturas, roles y necesidades técnicas totalmente distintas, todo sin perder la eficiencia operativa de la compañía.",
  match: [
    "¿cuál fue tu proyecto más complejo?",
    "cual fue tu proyecto mas complejo",
    "tu proyecto mas complejo",
    "proyecto más complejo",
    "proyecto mas complejo",
    "reto mas complejo",
    "reto más complejo",
  ],
  searchText:
    "Proyecto más complejo. Repsol. Rediseño Portal Global del Empleado. Alcance 15 países. +25.000 empleados. Diseñar experiencia coherente para múltiples culturas, roles y necesidades técnicas sin perder eficiencia operativa.",
  followupIds: [
    "cs_repsol_contexto_problema",
    "cs_repsol_rol_responsabilidades",
    "cs_repsol_decisiones_diseno",
  ],
},


{
  id: "cs_repsol_contexto_problema",
  locale: "es-ES",
  question: "¿Qué problema detectaste en Repsol?",
  answer:
    "El Portal del Empleado de Repsol (25K+ empleados en 15 países) se había convertido en una herramienta poco eficaz para el día a día: navegación compleja, contenidos desordenados, buscador poco útil y una experiencia fragmentada entre Portal/Intranet/Workday/Gestiones Personales, además de una percepción “campuscentrista”, estética desactualizada y limitaciones de acceso.",
  match: [
    "qué problema detectaste en repsol",
    "que problema detectaste en repsol",
    "qué fallaba en el portal del empleado",
    "que fallaba en el portal del empleado",
    "cuál era el problema del portal",
    "cuales eran los dolores del portal",
    "por qué había que rediseñarlo",
    "navegación compleja y buscador",
    "fragmentación portal intranet workday",
  ],
  searchText:
    "Case study Repsol. Problema y contexto. Portal del Empleado (25k+ en 15 países). Navegación compleja. Contenidos desordenados. Buscador poco útil. Experiencia fragmentada entre Portal/Intranet/Workday/Gestiones Personales. Percepción campuscentrista. UI desactualizada. Limitaciones de acceso. Adobe Experience Manager (AEM).",
  followupIds: [
    "cs_repsol_research_discovery",
    "cs_repsol_decisiones_diseno",
    "cs_repsol_overview",
  ],
},

{
  id: "cs_repsol_rol_responsabilidades",
  locale: "es-ES",
  question: "¿Cual fue tu rol y responsabilidad en Repsol?",
  answer:
    "Actué como Design Lead / Product Designer liderando un proyecto de 18 meses, desde la estrategia y discovery hasta la definición de arquitectura, navegación y contenidos, prototipado y validación con usuarios. Diseñé la nueva arquitectura y el modelo de navegación orientado a productividad y multitarea, y definí la estructura de contenidos y audiencias para personalización en Adobe Experience Manager.",
  match: [
    "cuál fue tu rol en repsol",
    "cual fue tu rol en repsol",
    "cual fue tu rol y responsabilidad en repsol",
    "cuál fue tu responsabilidad en repsol",
    "qué responsabilidad tuviste en repsol",
    "qué hiciste tú exactamente en repsol",
    "eras design lead",
    "lideraste el proyecto de repsol",
    "proyecto de 18 meses repsol",
  ],
  searchText:
    "Case study Repsol. Rol y responsabilidades. Design Lead / Product Designer. Proyecto 18 meses. Estrategia y discovery. Arquitectura de información, navegación y contenidos. Prototipado y validación con usuarios. Modelo de navegación orientado a productividad y multitarea. Audiencias y personalización en Adobe Experience Manager (AEM).",
  followupIds: [
    "cs_repsol_metodologia",
    "cs_repsol_colaboracion",
    "cs_repsol_overview",
  ],
},

{
  id: "cs_repsol_metodologia",
  locale: "es-ES",
  question: "¿Qué metodología empleaste en Repsol?",
  answer:
    "Se aplicó una metodología de Design Thinking apoyada en research cualitativo, workshops estratégicos y validación progresiva, integrada dentro de un marco de trabajo ágil. El proceso combinó discovery profundo, definición estratégica, arquitectura de la información y validación con usuarios, adaptándose a un entorno corporativo de gran escala y a un producto interno crítico.",
  match: [
    "qué metodología empleaste en repsol",
    "que metodología empleaste en repsol",
    "qué proceso seguiste en repsol",
    "que proceso seguiste en repsol",
    "cómo organizaste el trabajo en repsol",
    "metodología design thinking repsol",
    "trabajaste en agile en repsol",
    "hiciste discovery y validación",
  ],
  searchText:
    "Case study Repsol. Metodología. Design Thinking + research cualitativo + workshops estratégicos + validación progresiva. Integrado en un marco ágil. Discovery profundo, definición estratégica, arquitectura de información y validación con usuarios. Entorno corporativo de gran escala. Producto interno crítico.",
  followupIds: [
    "cs_repsol_research_discovery",
    "cs_repsol_decisiones_diseno",
    "cs_repsol_colaboracion",
  ],
},

{
  id: "cs_repsol_research_discovery",
  locale: "es-ES",
  question: "¿Cómo llevaste a cabo la fase de investigación en Repsol?",
  answer:
    "Realicé investigación cualitativa con entrevistas a empleados (37) y stakeholders (10) para entender dolores reales, barreras y el “portal ideal”. Complementamos con análisis del portal actual, inventario/mapeo de contenidos, y dinámicas como card sorting para construir una arquitectura con lógica, equilibrio y profundidad. Los hallazgos clave apuntaron a: baja intuición de navegación, confusión entre herramientas, exceso/rotación de contenido, lenguaje poco claro y dificultad para encontrar cosas concretas.",
  match: [
    "cómo hiciste la investigación en repsol",
    "como hiciste la investigacion en repsol",
    "cómo fue el discovery en repsol",
    "como fue el discovery en repsol",
    "qué research hiciste en repsol",
    "entrevistas 37 empleados 10 stakeholders",
    "hiciste card sorting",
    "inventario de contenidos",
    "hallazgos de navegación y búsqueda",
  ],
  searchText:
    "Case study Repsol. Research y discovery. Investigación cualitativa. Entrevistas: 37 empleados y 10 stakeholders. Análisis del portal actual. Inventario y mapeo de contenidos. Card sorting. Hallazgos: navegación poco intuitiva, confusión entre herramientas, exceso/rotación de contenido, lenguaje poco claro, dificultad para encontrar tareas concretas. Arquitectura de información.",
  followupIds: [
    "cs_repsol_contexto_problema",
    "cs_repsol_decisiones_diseno",
    "cs_repsol_metodologia",
  ],
},

{
  id: "cs_repsol_decisiones_diseno",
  locale: "es-ES",
  question: "¿Qué decisiones de diseño tomaste en Repsol?",
  answer:
    "Definí el concepto del nuevo portal apoyado en 4 principios (colaborativo, corporativo, centrado en el empleado y orientado a productividad) y en 6 necesidades detectadas (colaboración transversal, personalización por momento profesional, multidispositivo, experiencia unificada, vínculo con la compañía y diseño actualizado). Aterricé esto en decisiones concretas: nueva arquitectura más simple, navegación jerárquica y flexible con multitarea (ventanas flotantes), quick links/atajos, etiquetado sin ambigüedades con lenguaje natural, buscador predictivo con filtros y recuperación rápida, y una sección de ayuda con FAQs y sitemap.",
  match: [
    "qué decisiones de diseño tomaste en repsol",
    "que decisiones de diseño tomaste en repsol",
    "cómo resolviste la navegación en repsol",
    "como resolviste la navegacion en repsol",
    "qué cambios hiciste en la arquitectura",
    "que cambios hiciste en la arquitectura",
    "multitarea ventanas flotantes",
    "quick links y atajos",
    "buscador predictivo con filtros",
    "faq y sitemap",
  ],
  searchText:
    "Case study Repsol. Decisiones de diseño. Principios: colaborativo, corporativo, centrado en el empleado, productividad. Necesidades: colaboración transversal, personalización por momento profesional, multidispositivo, experiencia unificada, vínculo con compañía, diseño actualizado. Soluciones: arquitectura más simple, navegación jerárquica y flexible, multitarea con ventanas flotantes, quick links/atajos, lenguaje natural, buscador predictivo con filtros, ayuda con FAQs y sitemap.",
  followupIds: [
    "cs_repsol_research_discovery",
    "cs_repsol_colaboracion",
    "cs_repsol_metricas_impacto",
  ],
},

{
  id: "cs_repsol_colaboracion",
  locale: "es-ES",
  question: "¿Cómo fue la relación con negocio y desarrollo en Repsol?",
  answer:
    "Trabajé con un equipo extendido de stakeholders y facilitamos workshops de alineamiento para acelerar transferencia de contexto, alinear intereses/prioridades y co-definir la narrativa y la propuesta de valor del nuevo portal. Con tecnología, bajamos decisiones a viabilidad (especialmente el nivel real de personalización posible) y definimos cómo operativizar audiencias y contenidos en Adobe Experience Manager. Además, incorporamos integraciones clave (por ejemplo Workfront) para reducir herramientas externas y centralizar gestión dentro del portal.",
  match: [
    "cómo fue la relación con negocio y desarrollo en repsol",
    "como fue la relacion con negocio y desarrollo en repsol",
    "cómo colaboraste con stakeholders en repsol",
    "como colaboraste con stakeholders en repsol",
    "hiciste workshops de alineamiento",
    "cómo trabajaste con tecnología en repsol",
    "viabilidad técnica personalización",
    "audiencias y contenidos en aem",
    "integración workfront",
  ],
  searchText:
    "Case study Repsol. Colaboración con negocio y desarrollo. Equipo extendido de stakeholders. Workshops de alineamiento. Transferencia de contexto. Priorización y narrativa/propuesta de valor. Viabilidad técnica (personalización real). Operativizar audiencias y contenidos en Adobe Experience Manager (AEM). Integraciones clave (Workfront). Centralizar gestión y reducir herramientas externas.",
  followupIds: [
    "cs_repsol_metodologia",
    "cs_repsol_decisiones_diseno",
    "cs_repsol_metricas_impacto",
  ],
},

{
  id: "cs_repsol_metricas_impacto",
  locale: "es-ES",
  question: "¿Cuál fue el impacto de tu trabajo en Repsol?",
  answer:
    "El rediseño mejoró la eficiencia en gestiones críticas: tareas como pedir vacaciones, descargar recibos o actualizar datos pasaron a resolverse en menos de un minuto. Se registró una mejora del índice de satisfacción (+75%), una reducción de costes de producción de contenidos (-40%) gracias a plantillas reutilizables que permiten autoservicio sin depender de equipos técnicos, y una disminución de solicitudes a la mesa de ayuda (-65%) por flujos más claros y navegación simplificada. (Métricas obtenidas vía Adobe Experience Manager).",
  match: [
    "cuál fue el impacto en repsol",
    "cual fue el impacto en repsol",
    "qué resultados lograste en repsol",
    "que resultados lograste en repsol",
    "qué métricas tuvo el proyecto de repsol",
    "que metricas tuvo el proyecto de repsol",
    "impacto +75 -40 -65",
    "reducción helpdesk",
    "costes de contenidos",
    "tareas críticas menos de un minuto",
  ],
  searchText:
    "Case study Repsol. Impacto y métricas. Eficiencia en gestiones críticas (vacaciones, recibos, datos) en < 1 minuto. +75% satisfacción. -40% costes de producción de contenidos con plantillas reutilizables y autoservicio. -65% solicitudes a helpdesk por navegación simplificada. Métricas vía Adobe Experience Manager (AEM).",
  followupIds: [
    "cs_repsol_decisiones_diseno",
    "cs_repsol_aprendizajes",
    "cs_repsol_overview",
  ],
},

{
  id: "cs_repsol_aprendizajes",
  locale: "es-ES",
  question: "¿Qué aprendiste en el proyecto de Repsol?",
  answer:
    "En productos internos de gran escala, la diferencia no la hace “rediseñar pantallas”, sino ordenar el sistema completo: arquitectura + navegación + lenguaje + búsqueda + personalización. También confirmé que la adopción mejora cuando reduces fragmentación (unificar herramientas/entradas), diseñas para tareas recurrentes (rapidez y autoservicio) y validas pronto con prototipos reales (iteración basada en evidencia, no en opiniones).",
  match: [
    "qué aprendiste en repsol",
    "que aprendiste en repsol",
    "principales aprendizajes del proyecto",
    "lecciones aprendidas en repsol",
    "qué te llevaste de repsol",
    "qué funcionó y qué no funcionó",
    "aprendizajes sobre productos internos",
    "arquitectura navegación búsqueda personalización",
    "validar con prototipos reales",
  ],
  searchText:
    "Case study Repsol. Aprendizajes y lecciones. En productos internos de gran escala el impacto está en ordenar el sistema: arquitectura, navegación, lenguaje, búsqueda y personalización (no solo pantallas). Mejor adopción al reducir fragmentación (unificar herramientas/entradas). Diseñar para tareas recurrentes (rapidez, autoservicio). Validación temprana con prototipos reales e iteración basada en evidencia.",
  followupIds: [
    "cs_repsol_metricas_impacto",
    "cs_repsol_contexto_problema",
    "cs_repsol_overview",
  ],
},

/* =========================
   03) CASOS — FC BARCELONA APP SOCIOS (v2)
   ========================= */

/** OVERVIEW (nuevo) */
{
  id: "cs_fcb_socios_overview",
  locale: "es-ES",
  question: "¿Qué hiciste en la App de Socios del FC Barcelona?",
  answer:
    "Trabajé como Lead Product Designer en el rediseño del flujo core de gestión de partidos dentro de la App de Socios del FC Barcelona. El objetivo fue aumentar la liberación de asientos cuando los socios no podían asistir (impacto directo en ingresos de matchday), simplificando una experiencia que se percibía fragmentada y poco transparente. Lideré discovery y definición del problema, diseñé la nueva arquitectura y flujos (UX/UI) y trabajé en alineación con negocio y tecnología para equilibrar adopción, objetivos económicos y viabilidad técnica.",
  match: [
    "qué hiciste en la app de socios del fc barcelona",
    "que hiciste en la app de socios del fc barcelona",
    "qué hiciste para el fc barcelona?",
    "que hiciste para el fc barcelona?",
    "cuéntame el proyecto del fc barcelona",
    "cuentame el proyecto del fc barcelona",
    "en qué consistió tu proyecto del fcb",
    "en que consistio tu proyecto del fcb",
    "tu trabajo en la app de socios",
    "app de socios fc barcelona proyecto",
  ],
  searchText:
    "Case study FC Barcelona. App de socios. Overview del proyecto. Lead Product Designer. Rediseño del flujo core de gestión de partidos. Objetivo: aumentar liberación de asientos (matchday revenue). Problema de adopción y comportamiento. Simplificación, nueva arquitectura, UX/UI, alineación con negocio y tecnología, validación y métricas.",
  followupIds: [
    "cs_fcb_socios_contexto_problema",
    "cs_fcb_socios_rol_responsabilidades",
    "cs_fcb_socios_metricas_impacto",
  ],
},

{
  id: "cs_fcb_socios_contexto_problema",
  locale: "es-ES",
  question: "¿Qué problema detectaste en la App de Socios del FC Barcelona?",
  answer:
    "El FC Barcelona necesitaba aumentar la liberación de asientos por parte de los socios cuando no podían asistir a un partido, porque las butacas vacías se traducían directamente en ingresos perdidos en matchday. El reto no era solo “meter un botón”, sino resolver por qué la experiencia actual no estaba funcionando: la gestión se percibía fragmentada, poco transparente y difícil, obligaba a operar partido por partido, generaba confusión por la terminología y aumentaba el abandono por falta de visibilidad y seguridad en el proceso.",
  match: [
    "qué problema detectaste en la app de socios del fc barcelona",
    "que problema detectaste en la app de socios del fc barcelona",
    "qué fallaba en la app de socios",
    "que fallaba en la app de socios",
    "por qué no funcionaba la liberación de asientos",
    "por qué había butacas vacías",
    "problema de adopción en la gestión de partidos",
    "gestión fragmentada poco transparente",
    "confusión por terminología y abandono",
    "matchday ingresos perdidos",
  ],
  searchText:
    "Case study FC Barcelona App socios. Contexto y problema. Aumentar liberación de asientos. Butacas vacías = ingresos perdidos matchday. Experiencia fragmentada, poco transparente, difícil. Operar partido por partido. Terminología confusa. Abandono por falta de visibilidad y seguridad en el proceso.",
  followupIds: [
    "cs_fcb_socios_research_discovery",
    "cs_fcb_socios_decisiones_diseno",
    "cs_fcb_socios_overview",
  ],
},

{
  id: "cs_fcb_socios_rol_responsabilidades",
  locale: "es-ES",
  question: "¿Cual fue tu rol y responsabilidad en la App de socios de FC Barcelona?",
  answer:
    "Asumí el rol de Lead Product Designer del rediseño del flujo core de gestión de partidos dentro de la app de socios. Lideré discovery y definición del problema, propuse la estrategia de simplificación y nueva arquitectura, diseñé los flujos y la solución final (UX/UI), y trabajé en alineación con stakeholders para equilibrar necesidades de usuario, objetivos económicos del club y viabilidad técnica",
  match: [
    "cuál fue tu rol en la app de socios del fc barcelona",
    "cual fue tu rol en la app de socios del fc barcelona",
    "cuál fue tu responsabilidad en el proyecto del fcb",
    "cual fue tu responsabilidad en el proyecto del fcb",
    "qué hiciste tú exactamente en la app de socios",
    "eras lead product designer en el fcb",
    "lideraste discovery y definición del problema",
    "definiste arquitectura y flujos",
    "trabajaste con stakeholders del club",
  ],
  searchText:
    "Case study FC Barcelona App socios. Rol y responsabilidades. Lead Product Designer. Rediseño del flujo core de gestión de partidos. Discovery, problem framing, estrategia de simplificación, nueva arquitectura, diseño de flujos y solución UX/UI. Alineación con stakeholders. Equilibrio usuario, objetivos económicos y viabilidad técnica.",
  followupIds: [
    "cs_fcb_socios_metodologia",
    "cs_fcb_socios_colaboracion",
    "cs_fcb_socios_overview",
  ],
},

{
  id: "cs_fcb_socios_metodologia",
  locale: "es-ES",
  question: "¿Qué metodología empleaste en la App de socios del FC Barcelona?",
  answer:
    "El proyecto combinó un enfoque de Lean UX con prácticas de Design Thinking, utilizando Design Thinking de forma intensiva en la fase de research y discovery para entender en profundidad las necesidades, motivaciones y fricciones de los socios. Posteriormente, Lean UX permitió iterar con rapidez, validar hipótesis de manera continua y evolucionar la solución de forma progresiva, manteniendo el foco en impacto real, aprendizaje y alineación con los objetivos de negocio.",
  match: [
    "qué metodología empleaste en la app de socios del fc barcelona",
    "que metodología empleaste en la app de socios del fc barcelona",
    "qué proceso seguiste en el proyecto del fcb",
    "que proceso seguiste en el proyecto del fcb",
    "usaste lean ux en el fc barcelona",
    "usaste design thinking en el fc barcelona",
    "hiciste design sprint",
    "validación continua de hipótesis",
    "cómo iteraste la solución",
  ],
  searchText:
    "Case study FC Barcelona App socios. Metodología. Lean UX + Design Thinking. Design Thinking en research y discovery para entender necesidades, motivaciones y fricciones. Lean UX para iterar rápido, validar hipótesis continuamente y evolucionar la solución. Foco en impacto, aprendizaje y objetivos de negocio.",
  followupIds: [
    "cs_fcb_socios_research_discovery",
    "cs_fcb_socios_decisiones_diseno",
    "cs_fcb_socios_colaboracion",
  ],
},

{
  id: "cs_fcb_socios_research_discovery",
  locale: "es-ES",
  question: "¿Cómo llevaste a cabo la fase de investigación en la App de socios de FC Barcelona?",
  answer:
    "El descubrimiento se apoyó en una investigación profunda combinando Design Thinking, research cualitativo y journey mapping para entender cómo los socios toman decisiones sobre sus asientos. Complementé esto con una auditoría UX/UI que identificó flujos complejos, conceptos confusos, alta carga cognitiva y limitaciones técnicas. Además, realicé entrevistas con usuarios reales para empatizar con sus circunstancias, segmenté tipos de usuarios para mapear casuísticas y escenarios, y utilicé análisis de datos y métricas reales aportadas por los equipos de data del club para orientar decisiones de producto y diseño.",
  match: [
    "cómo hiciste la investigación en la app de socios del fc barcelona",
    "como hiciste la investigacion en la app de socios del fc barcelona",
    "cómo fue el discovery en el fcb",
    "como fue el discovery en el fcb",
    "qué research hiciste con socios",
    "journey mapping de socios",
    "auditoría ux ui de la app",
    "hiciste entrevistas con usuarios reales",
    "segmentaste tipos de socios",
    "usaste datos y métricas del club",
  ],
  searchText:
    "Case study FC Barcelona App socios. Research y discovery. Design Thinking, research cualitativo, journey mapping. Auditoría UX/UI: flujos complejos, conceptos confusos, carga cognitiva, limitaciones técnicas. Entrevistas con usuarios reales. Segmentación de usuarios y escenarios. Datos y métricas del club para orientar decisiones.",
  followupIds: [
    "cs_fcb_socios_contexto_problema",
    "cs_fcb_socios_decisiones_diseno",
    "cs_fcb_socios_metodologia",
  ],
},

{
  id: "cs_fcb_socios_decisiones_diseno",
  locale: "es-ES",
  question: "¿Qué decisiones de diseño tomaste en la App de socios del FC Barcelona?",
  answer:
    "La solución se centró en maximizar impacto priorizando el flujo core bajo principio de Pareto y rediseñando la arquitectura para que fuese más clara, lógica y alineada al comportamiento real del socio. A nivel de producto, se introdujo gestión en bloque (modo de gestión múltiple) para acciones como liberar partidos o transferir el asiento a un tercero invitado, y se incorporó gestión multiperfil para casos familiares (por ejemplo, abonos de menores) facilitando la entrada al estadio. Para resolver la gestión a largo plazo se añadió un calendario que permite buscar y seleccionar partidos por mes. Para el momento de partido se planteó un modo “Día de partido” con accesos rápidos y entradas dinámicas con QR renovable cada 3 minutos para reducir fraude y falsificación. También se reforzó la experiencia con un Wallet para credenciales y accesos en menos de 3 clics, onboarding de highlights, un “Socímetro” para fomentar compromiso y un apartado de bonificación que muestra saldo acumulado canjeable en tienda oficial cuando el socio cede su asiento al club.",
  match: [
    "qué decisiones de diseño tomaste en la app de socios del fc barcelona",
    "que decisiones de diseño tomaste en la app de socios del fc barcelona",
    "cómo simplificaste el flujo core",
    "que cambios hiciste en la arquitectura",
    "gestión en bloque liberar partidos",
    "gestión multiperfil abonos familiares",
    "calendario de partidos por mes",
    "modo día de partido",
    "qr renovable antifraude",
    "wallet onboarding socímetro bonificación",
  ],
  searchText:
    "Case study FC Barcelona App socios. Decisiones de diseño y producto. Principio de Pareto: priorizar flujo core. Nueva arquitectura clara y alineada a lógica mental del socio. Gestión en bloque (múltiple) para liberar/transferir. Gestión multiperfil (familias, abonos menores). Calendario para selección por mes. Modo Día de partido con accesos rápidos. Entradas dinámicas QR renovable cada 3 minutos (antifraude). Wallet para credenciales en <3 clics. Onboarding highlights. Socímetro para engagement. Bonificación/saldo canjeable por ceder asiento.",
  followupIds: [
    "cs_fcb_socios_research_discovery",
    "cs_fcb_socios_colaboracion",
    "cs_fcb_socios_metricas_impacto",
  ],
},

{
  id: "cs_fcb_socios_colaboracion",
  locale: "es-ES",
  question: "¿Cómo fue la relación con negocio y tecnología en la App de socios del FC Barcelona?",
  answer:
    "El trabajo se desarrolló bajo el marco de Design Sprint, lo que permitió validar de forma temprana tanto las funcionalidades como la viabilidad técnica de las soluciones propuestas. La colaboración con los equipos de tecnología fue continua, trabajando de manera iterativa para asegurar coherencia entre diseño, desarrollo y limitaciones del sistema. En paralelo, se realizaron varios workshops de alineamiento con negocio para conceptualizar la nueva app, definir prioridades y cocrear la solución final, garantizando que la experiencia respondiera tanto a las necesidades de los socios como a los objetivos estratégicos del club.",
  match: [
    "cómo fue la relación con negocio y tecnología en el fc barcelona",
    "como fue la relacion con negocio y tecnologia en el fc barcelona",
    "cómo colaboraste con tecnología en el fcb",
    "como colaboraste con tecnologia en el fcb",
    "trabajaste con design sprint",
    "hiciste workshops con negocio",
    "cómo validaste la viabilidad técnica",
    "trabajo iterativo diseño desarrollo",
    "alineamiento de prioridades con el club",
  ],
  searchText:
    "Case study FC Barcelona App socios. Colaboración con negocio y tecnología. Design Sprint para validar temprano funcionalidades y viabilidad técnica. Colaboración continua e iterativa con tecnología. Workshops de alineamiento con negocio para conceptualizar, priorizar y cocrear solución. Equilibrio necesidades de socios y objetivos estratégicos del club.",
  followupIds: [
    "cs_fcb_socios_metodologia",
    "cs_fcb_socios_decisiones_diseno",
    "cs_fcb_socios_metricas_impacto",
  ],
},

{
  id: "cs_fcb_socios_metricas_impacto",
  locale: "es-ES",
  question: "¿Cuál fue el impacto de tu trabajo en la App de socios del FC Barcelona?",
  answer:
    "El proyecto se orientó a impacto medible: la mejora del flujo de gestión se asocia a un beneficio estimado de 1,6M€ por temporada. En resultados de uso, el 85% de los usuarios utiliza activamente la nueva funcionalidad (indicador de adopción y simplicidad), y se consiguió que los socios gestionen los partidos de sus abonos hasta 3 veces más rápido que antes. Además, se redujo el “asiento inverso”a un 4% de los usuarios partiendo desde un 18% (mejorando el compromiso del socio con el club) y se redujeron los tickets de soporte (reportado como una disminución del 40%) gracias a una interfaz y narrativa más simple e intuitiva. Estas métricas fueron proporcionadas por el club tras el primer año de uso de la app.",
  match: [
    "cuál fue el impacto en la app de socios del fc barcelona",
    "cual fue el impacto en la app de socios del fc barcelona",
    "qué resultados lograste en el fcb",
    "que resultados lograste en el fcb",
    "qué métricas tuvo el proyecto del fc barcelona",
    "impacto 1,6m por temporada",
    "85% adopción",
    "3 veces más rápido",
    "asiento inverso 18 a 4",
    "tickets soporte menos 40",
  ],
  searchText:
    "Case study FC Barcelona App socios. Impacto y métricas. Beneficio estimado 1,6M€ por temporada. 85% adopción de funcionalidad. Gestión hasta 3x más rápida. Asiento inverso 18% → 4%. Tickets de soporte -40%. Métricas del club tras el primer año de uso.",
  followupIds: [
    "cs_fcb_socios_decisiones_diseno",
    "cs_fcb_socios_aprendizajes",
    "cs_fcb_socios_overview",
  ],
},

{
  id: "cs_fcb_socios_aprendizajes",
  locale: "es-ES",
  question: "¿Qué aprendiste en el proyecto de la App de socios del FC Barcelona?",
  answer:
    "Este case consolidó una idea clave: cuando el problema es de comportamiento y adopción, la solución no es solo UI, sino empatía + estructura + claridad. Aprendí a apoyarme en una combinación fuerte de auditoría, entrevistas, segmentación y datos reales para tomar decisiones con confianza, y a priorizar el flujo core para generar impacto rápido y sostenible. También reforzó la importancia de diseñar alineado a la “lógica mental” del usuario (calendario y gestión en bloque) y no a la estructura interna del sistema o del negocio.",
  match: [
    "qué aprendiste en el proyecto del fc barcelona",
    "que aprendiste en el proyecto del fc barcelona",
    "aprendizajes del case del fcb",
    "lecciones aprendidas app de socios",
    "qué te llevaste de este proyecto",
    "qué aprendiste sobre adopción y comportamiento",
    "por qué no era solo ui",
    "auditoría entrevistas segmentación datos",
    "priorizar el flujo core pareto",
    "diseñar según lógica mental calendario y gestión en bloque",
  ],
  searchText:
    "Case study FC Barcelona App socios. Aprendizajes. Problemas de comportamiento y adopción requieren empatía + estructura + claridad (no solo UI). Decisiones con evidencia: auditoría + entrevistas + segmentación + datos reales. Priorizar flujo core (Pareto) para impacto rápido y sostenible. Diseñar alineado a lógica mental del usuario (calendario, gestión en bloque) vs estructura interna del sistema/negocio.",
  followupIds: [
    "cs_fcb_socios_metricas_impacto",
    "cs_fcb_socios_contexto_problema",
    "cs_fcb_socios_overview",
  ],
},

/* =========================
   03) CASOS — FC BARCELONA ECOMMERCE (v2)
   ========================= */

/** OVERVIEW (nuevo) */
{
  id: "cs_fcb_ecom_overview",
  locale: "es-ES",
  question: "¿Qué hiciste en el ecommerce del FC Barcelona?",
  answer:
    "Trabajé como Product Designer/Lead en la optimización del ecommerce del FC Barcelona (Barça Store), con foco en mejorar conversión y rendimiento mobile. El reto era reducir fugas claras del funnel —especialmente en checkout y en el paso final de pago/confirmación— en un contexto de tráfico mayoritariamente mobile, baja recurrencia y comportamiento estacional. Lideré discovery (data + workshops), redefiní arquitectura y navegación para facilitar el encuentro del producto en la primera sesión, y diseñé mejoras mobile-first orientadas a conversión, dejando además base preparada para CRO (instrumentación, tests y personalización progresiva).",
  match: [
    "qué hiciste en el ecommerce del fc barcelona",
    "que hiciste en el ecommerce del fc barcelona",
    "qué hiciste en la barça store",
    "que hiciste en la barça store",
    "cuéntame tu proyecto del ecommerce del fcb",
    "cuentame tu proyecto del ecommerce del fcb",
    "en qué consistió tu trabajo en la fc barcelona store",
    "en que consistio tu trabajo en la fc barcelona store",
    "tu trabajo en el checkout del barcelona",
    "proyecto de conversión y mobile en la barça store",
  ],
  searchText:
    "Case study FC Barcelona ecommerce. Overview del proyecto. Barça Store. Conversión baja. Tráfico mayoritariamente mobile (80%). Estacionalidad por momentos del primer equipo. Funnel con fugas: inicio de checkout y especialmente pago/confirmación. Brecha mobile vs desktop. Reposicionamiento a retail/moda. Mobile-first. CRO: instrumentación, tests, personalización progresiva. Adobe Analytics. Workshops con BLM, marketing y tecnología.",
  followupIds: [
    "cs_fcb_ecom_contexto_problema",
    "cs_fcb_ecom_rol_responsabilidades",
    "cs_fcb_ecom_metricas_impacto",
  ],
},

{
  id: "cs_fcb_ecom_contexto_problema",
  locale: "es-ES",
  question: "¿Qué problema detectaste en la FC Barcelona Store?",
  answer:
    "La Barça Store dependía fuertemente de “momentos del primer equipo” como partidos, fichajes o lanzamientos, lo que generaba un comportamiento altamente estacional. La conversión global era baja y el tráfico se concentraba mayoritariamente en mobile, donde el rendimiento era sensiblemente peor que en desktop. El funnel presentaba fugas claras, con elevados abandonos tanto al inicio del checkout como, especialmente, en el paso final de pago y confirmación. Además, la recurrencia era muy reducida, lo que hacía que la primera visita fuera prácticamente la única oportunidad real para convertir.",
  match: [
    "qué problema detectaste en la fc barcelona store",
    "que problema detectaste en la fc barcelona store",
    "qué fallaba en la barça store",
    "que fallaba en la barça store",
    "por qué la conversión era baja",
    "problemas de conversión en mobile",
    "fugas en el checkout",
    "abandono en pago y confirmación",
    "baja recurrencia primera sesión",
    "comportamiento estacional del ecommerce",
  ],
  searchText:
    "Case study FC Barcelona ecommerce. Contexto y problema. Estacionalidad por partidos, fichajes, lanzamientos. Conversión global baja. Tráfico mayoritariamente mobile, rendimiento peor que desktop. Funnel con fugas: abandono en inicio de checkout y especialmente en pago/confirmación. Recurrencia muy baja: la primera sesión es la oportunidad principal.",
  followupIds: [
    "cs_fcb_ecom_research_discovery",
    "cs_fcb_ecom_decisiones_diseno",
    "cs_fcb_ecom_overview",
  ],
},

{
  id: "cs_fcb_ecom_metodologia",
  locale: "es-ES",
  question: "¿Qué metodología empleaste en FC Barcelona Store?",
  answer:
    "Enfoque de Design Thinking con discovery mixto (data + workshops), seguido de iteración ágil orientada a conversión: hipótesis basadas en analítica, priorización de fricciones del funnel, diseño mobile-first, validación con usuarios y preparación de un marco para CRO (instrumentación, tests y personalización progresiva).",
  match: [
    "qué metodología empleaste en la fc barcelona store",
    "que metodología empleaste en la fc barcelona store",
    "qué proceso seguiste en el ecommerce del fcb",
    "que proceso seguiste en el ecommerce del fcb",
    "cómo organizaste el proyecto de conversión",
    "design thinking con data y workshops",
    "iteración ágil orientada a conversión",
    "mobile first y cro",
    "cómo planteaste hipótesis y validación",
  ],
  searchText:
    "Case study FC Barcelona ecommerce. Metodología. Design Thinking con discovery mixto (data + workshops). Iteración ágil enfocada en conversión. Hipótesis basadas en analítica. Priorización de fricciones del funnel. Diseño mobile-first. Validación con usuarios. Framework CRO: instrumentación, tests A/B, personalización progresiva.",
  followupIds: [
    "cs_fcb_ecom_research_discovery",
    "cs_fcb_ecom_decisiones_diseno",
    "cs_fcb_ecom_colaboracion",
  ],
},

{
  id: "cs_fcb_ecom_rol_responsabilidades",
  locale: "es-ES",
  question: "¿Cual fue tu rol y responsabilidad en FC Barcelona Store?",
  answer:
    "Actué como Product Designer/Lead dentro del equipo, enfocándome en optimizar flujos críticos (especialmente checkout), redefinir arquitectura de información y navegación, y traducir insights de negocio/research en decisiones de diseño medibles. También participé en sesiones estratégicas con stakeholders para alinear el reposicionamiento del ecommerce (de merchandising a moda/retail) y el nuevo enfoque de audiencia/target.",
  match: [
    "cuál fue tu rol en la fc barcelona store",
    "cual fue tu rol en la fc barcelona store",
    "cuál fue tu responsabilidad en el ecommerce del fcb",
    "cual fue tu responsabilidad en el ecommerce del fcb",
    "qué hiciste tú exactamente en la barça store",
    "te enfocaste en checkout",
    "redefiniste arquitectura y navegación",
    "reposicionamiento de merchandising a retail moda",
    "trabajaste con stakeholders del club",
  ],
  searchText:
    "Case study FC Barcelona ecommerce. Rol y responsabilidades. Product Designer/Lead. Optimización de flujos críticos (checkout). Redefinición de arquitectura de información y navegación. Traducción de insights de negocio y research en decisiones medibles. Sesiones estratégicas con stakeholders. Reposicionamiento del ecommerce de merchandising a retail/moda. Audiencia/target.",
  followupIds: [
    "cs_fcb_ecom_metodologia",
    "cs_fcb_ecom_colaboracion",
    "cs_fcb_ecom_overview",
  ],
},

{
  id: "cs_fcb_ecom_research_discovery",
  locale: "es-ES",
  question: "¿Cómo llevaste a cabo la fase de investigación en FC Barcelona Store?",
  answer:
    "La fase de discovery combinó análisis cuantitativo profundo (Adobe Analytics) con trabajo cualitativo y alineamiento interno. Se identificó el peso real de mobile (80% del tráfico), la baja recurrencia, los puntos de fuga por canal y dispositivo, y el rendimiento de home/categorías/fichas de producto. También se detectaron oportunidades claras en Social Media (mucho tráfico, baja conversión) y en tráfico Barça (mucho volumen, conversión por debajo del 1%). En paralelo, se realizaron workshops fundacionales con BLM, marketing y tecnología para mapear retos, expectativas, segmentos/actores y definir atributos del nuevo ecommerce.",
  match: [
    "cómo hiciste la investigación en la fc barcelona store",
    "como hiciste la investigacion en la fc barcelona store",
    "cómo fue el discovery del ecommerce del fcb",
    "como fue el discovery del ecommerce del fcb",
    "usaste adobe analytics",
    "mobile 80% del tráfico",
    "análisis por canal y dispositivo",
    "social media mucho tráfico baja conversión",
    "tráfico barça conversión menor al 1",
    "workshops con blm marketing y tecnología",
  ],
  searchText:
    "Case study FC Barcelona ecommerce. Research y discovery. Análisis cuantitativo con Adobe Analytics. Mobile 80% del tráfico. Baja recurrencia. Puntos de fuga por canal/dispositivo. Rendimiento de home, categorías y fichas de producto (PDP). Oportunidades: Social Media (alto tráfico, baja conversión) y tráfico Barça (alto volumen, conversión <1%). Workshops fundacionales con BLM, marketing y tecnología para mapear retos, segmentos/actores y atributos del nuevo ecommerce.",
  followupIds: [
    "cs_fcb_ecom_contexto_problema",
    "cs_fcb_ecom_decisiones_diseno",
    "cs_fcb_ecom_metodologia",
  ],
},

{
  id: "cs_fcb_ecom_decisiones_diseno",
  locale: "es-ES",
  question: "¿Qué decisiones de diseño tomaste en FC Barcelona Store?",
  answer:
    "Se priorizó un enfoque mobile-first real y la simplificación del funnel (menos fricción y menos “puertas” de abandono), atacando especialmente: el arranque del checkout (donde solo una parte de usuarios continuaba) y el último paso de pago/confirmación (con abandonos muy por encima de benchmark). A nivel de IA y navegación, se replanteó la arquitectura para facilitar el “encuentro” del producto en la primera sesión, reforzando categorías clave, búsqueda y fichas de producto como “escaparate” (incluyendo señales para personalización, talla y confianza). A nivel de propuesta de valor, se trabajó el reposicionamiento hacia una experiencia más cercana al retail/moda, con presentación premium, coherencia con el ecosistema Barça y base preparada para personalización y CRO.",
  match: [
    "qué decisiones de diseño tomaste en la fc barcelona store",
    "que decisiones de diseño tomaste en la fc barcelona store",
    "cómo mejoraste el checkout",
    "como mejoraste el checkout",
    "simplificaste el funnel",
    "mobile first real",
    "mejoraste inicio de checkout y pago confirmación",
    "cambiaste la arquitectura y navegación",
    "reforzaste búsqueda y fichas de producto",
    "reposicionamiento a retail moda",
    "base para personalización y cro",
  ],
  searchText:
    "Case study FC Barcelona ecommerce. Decisiones de diseño. Mobile-first real. Simplificación del funnel. Reducir fricción y puntos de abandono. Priorizar inicio de checkout y paso final de pago/confirmación (abandono por encima de benchmark). Replantear IA y navegación para encuentro del producto en primera sesión. Reforzar categorías, búsqueda y PDP como escaparate (personalización, talla, señales de confianza). Reposicionamiento hacia retail/moda con presentación premium y coherencia Barça. Base preparada para personalización y CRO.",
  followupIds: [
    "cs_fcb_ecom_research_discovery",
    "cs_fcb_ecom_colaboracion",
    "cs_fcb_ecom_metricas_impacto",
  ],
},

{
  id: "cs_fcb_ecom_colaboracion",
  locale: "es-ES",
  question: "¿Cómo fue la relación con negocio y tecnología en FC Barcelona Store?",
  answer:
    "Se trabajó de forma coordinada con BLM, marketing y tecnología mediante workshops de alineamiento para conceptualizar la nueva experiencia, acordar objetivos (conversión, recurrencia, omnicanalidad, personalización) y aterrizar restricciones del stack actual (limitaciones para vídeo, zoom, multicarrito, pagos fraccionados, etc.). La colaboración permitió priorizar decisiones con impacto directo en conversión y viabilidad (métodos de pago, reducción de pasos, instrumentación/medición), y mantener una visión común del producto.",
  match: [
    "cómo fue la relación con negocio y tecnología en la fc barcelona store",
    "como fue la relacion con negocio y tecnologia en la fc barcelona store",
    "cómo trabajaste con blm marketing y tecnología",
    "como trabajaste con blm marketing y tecnologia",
    "hiciste workshops de alineamiento",
    "restricciones del stack actual",
    "limitaciones de vídeo zoom multicarrito",
    "pagos fraccionados",
    "instrumentación y medición para cro",
    "priorización por impacto y viabilidad",
  ],
  searchText:
    "Case study FC Barcelona ecommerce. Colaboración con negocio y tecnología. Workshops de alineamiento con BLM, marketing y tecnología. Objetivos: conversión, recurrencia, omnicanalidad, personalización. Restricciones del stack (vídeo, zoom, multicarrito, pagos fraccionados). Priorización por impacto y viabilidad: métodos de pago, reducción de pasos, instrumentación/medición. Visión común del producto.",
  followupIds: [
    "cs_fcb_ecom_metodologia",
    "cs_fcb_ecom_decisiones_diseno",
    "cs_fcb_ecom_metricas_impacto",
  ],
},

{
  id: "cs_fcb_ecom_metricas_impacto",
  locale: "es-ES",
  question: "¿Cuál fue el impacto de tu trabajo en FC Barcelona Store?",
  answer:
    "En baseline, el análisis mostró una conversión global en torno al 1% con objetivo 1,6%, un funnel largo (7 pasos) con abandono muy alto en el inicio del checkout y especialmente en el tramo final de pago/confirmación, y una brecha clara mobile vs desktop (mobile inicia más, pero convierte menos). A nivel de resultados del rediseño (según el case de CV), el impacto más destacado fue el incremento de conversión en checkout del 6% al 14% optimizando flujos críticos, arquitectura de información y validando con usuarios, reforzando además el reposicionamiento del ecommerce hacia patrones de compra retail/moda.",
  match: [
    "cuál fue el impacto en la fc barcelona store",
    "cual fue el impacto en la fc barcelona store",
    "qué métricas tuvo el ecommerce del fcb",
    "que metricas tuvo el ecommerce del fcb",
    "conversión global 1% objetivo 1,6",
    "funnel de 7 pasos",
    "abandono en checkout y pago confirmación",
    "brecha mobile vs desktop",
    "impacto checkout 6 a 14",
  ],
  searchText:
    "Case study FC Barcelona ecommerce. Impacto y métricas. Baseline: conversión ~1% (objetivo 1,6%). Funnel largo de 7 pasos. Abandono alto en inicio de checkout y especialmente en pago/confirmación. Brecha mobile vs desktop (mobile inicia más, convierte menos). Resultado: conversión en checkout 6% → 14% optimizando flujos críticos e IA, validación con usuarios y reposicionamiento hacia retail/moda.",
  followupIds: [
    "cs_fcb_ecom_decisiones_diseno",
    "cs_fcb_ecom_aprendizajes",
    "cs_fcb_ecom_overview",
  ],
},

{
  id: "cs_fcb_ecom_aprendizajes",
  locale: "es-ES",
  question: "¿Qué aprendiste en el proyecto de FC Barcelona Store?",
  answer:
    "Cuando la recurrencia es baja, la primera sesión lo es todo: arquitectura, navegación y confianza deben funcionar “a la primera” y especialmente en mobile. También confirmé que la conversión no se arregla solo con UI: requiere lectura fina de datos por canal/dispositivo, decisiones de funnel (pasos, pagos, fricciones) y un sistema de medición sólido para iterar con CRO. Y, a nivel organizativo, los workshops iniciales aceleran muchísimo la alineación y evitan rediseñar “a ciegas”.",
  match: [
    "qué aprendiste en el ecommerce del fc barcelona",
    "que aprendiste en el ecommerce del fc barcelona",
    "aprendizajes del proyecto de la barça store",
    "lecciones aprendidas ecommerce fcb",
    "qué te llevaste de este proyecto",
    "primera sesión lo es todo",
    "arquitectura navegación confianza en mobile",
    "la conversión no es solo ui",
    "decisiones de funnel pagos fricciones",
    "sistema de medición cro",
    "workshops aceleran alineación",
  ],
  searchText:
    "Case study FC Barcelona ecommerce. Aprendizajes. Con recurrencia baja, la primera sesión es crítica: arquitectura, navegación y confianza deben funcionar a la primera (especialmente en mobile). Conversión requiere datos por canal/dispositivo, decisiones de funnel (pasos, pagos, fricciones) y un sistema de medición sólido para CRO. Workshops iniciales aceleran alineación y evitan rediseñar a ciegas.",
  followupIds: [
    "cs_fcb_ecom_metricas_impacto",
    "cs_fcb_ecom_contexto_problema",
    "cs_fcb_ecom_overview",
  ],
},


  /* =========================
   03) CASOS — COFARES (v2)
   ========================= */

/** OVERVIEW (nuevo) */
{
  id: "cs_cofares_overview",
  locale: "es-ES",
  question: "¿Qué hiciste para Cofares?",
  answer:
    "Trabajé como Design Lead / UX Engineer liderando la creación de un Design System agnóstico al framework para un ecosistema digital fragmentado (React, Angular, Vue y Liferay). El objetivo fue establecer una única fuente de verdad que aportara consistencia visual y de interacción, redujera retrabajo y acelerara la construcción de nuevas interfaces. Definí principios, arquitectura de tokens, modelo de librerías, gobernanza federada y la integración diseño-desarrollo mediante automatización (desde tokens en Figma hasta outputs consumibles por distintos frameworks).",
  match: [
    "qué hiciste para cofares",
    "que hiciste para cofares",
    "cuéntame tu proyecto de cofares",
    "cuentame tu proyecto de cofares",
    "en qué consistió tu proyecto en cofares",
    "en que consistio tu proyecto en cofares",
    "tu trabajo en el design system de cofares",
    "design system cofares agnóstico al framework",
    "qué hiciste como ux engineer en cofares",
    "que hiciste como ux engineer en cofares",
  ],
  searchText:
    "Case study Cofares. Overview del proyecto. Design System agnóstico al framework. Ecosistema digital fragmentado con React, Angular, Vue y Liferay. Única fuente de verdad. Consistencia visual y patrones. Reducir divergencias y retrabajo. Acelerar delivery. Arquitectura de tokens. Gobernanza federada. Integración diseño-desarrollo. Automatización desde Figma a pipelines (Style Dictionary / outputs consumibles).",
  followupIds: [
    "cs_cofares_contexto_problema",
    "cs_cofares_rol_responsabilidades",
    "cs_cofares_metricas_impacto",
  ],
},

{
  id: "cs_cofares_contexto_problema",
  locale: "es-ES",
  question: "¿Qué problema detectaste en Cofares?",
  answer:
    "Cofares, líder español en logística y distribución de productos farmacéuticos, enfrentaba un ecosistema digital fragmentado con múltiples productos web construidos en diferentes tecnologías (React, Angular, Vue y Liferay) sin consistencia visual ni patrones compartidos. Esta falta de coherencia dificultaba la escalabilidad, aumentaba el retrabajo técnico y visual, y ralentizaba la creación de nuevas interfaces a medida que crecía el portafolio digital interno. El reto principal fue construir desde cero un Design System agnóstico al framework que funcionara como única fuente de verdad, aplicable a todo el ecosistema y que redujera divergencias entre productos.",
  match: [
    "qué problema detectaste en cofares",
    "que problema detectaste en cofares",
    "qué estaba fallando en el ecosistema digital de cofares",
    "que estaba fallando en el ecosistema digital de cofares",
    "por qué necesitaban un design system",
    "por qué hacía falta consistencia entre productos",
    "react angular vue liferay sin consistencia",
    "mucho retrabajo técnico y visual",
    "ecosistema fragmentado sin patrones compartidos",
    "design system agnóstico al framework",
  ],
  searchText:
    "Case study Cofares. Contexto y problema. Ecosistema digital fragmentado. Múltiples tecnologías: React, Angular, Vue, Liferay. Sin consistencia visual ni patrones compartidos. Dificulta escalabilidad. Aumenta retrabajo técnico y visual. Ralentiza creación de nuevas interfaces. Necesidad: Design System desde cero, agnóstico al framework, como única fuente de verdad para todo el ecosistema.",
  followupIds: [
    "cs_cofares_research_discovery",
    "cs_cofares_decisiones_diseno",
    "cs_cofares_overview",
  ],
},

{
  id: "cs_cofares_rol_responsabilidades",
  locale: "es-ES",
  question: "¿Cuál fue tu rol y responsabilidades en Cofares?",
  answer:
    "Actué como Design Lead / UX Engineer liderando la estrategia para crear un sistema de diseño verdaderamente agnóstico al framework y adaptable a cualquier tecnología. Definí los principios del sistema, la arquitectura de tokens, la gobernanza federada, las librerías de componentes y la forma de integrar diseño y desarrollo de forma automatizada, desde la extracción de tokens en Figma hasta pipelines técnicos que generan salidas consumibles por React, Angular, Vue y Liferay.",
  match: [
    "cuál fue tu rol en cofares",
    "cual fue tu rol en cofares",
    "cuáles fueron tus responsabilidades en cofares",
    "cuales fueron tus responsabilidades en cofares",
    "qué hiciste tú exactamente en el design system",
    "que hiciste tu exactamente en el design system",
    "eras design lead y ux engineer",
    "definiste la arquitectura de tokens",
    "gobernanza federada cofares",
    "pipelines de tokens desde figma a react angular vue liferay",
  ],
  searchText:
    "Case study Cofares. Rol y responsabilidades. Design Lead / UX Engineer. Estrategia de Design System agnóstico al framework. Principios del sistema. Arquitectura de tokens. Gobernanza federada. Librerías de componentes. Integración diseño-desarrollo automatizada. Extracción de tokens desde Figma. Pipelines técnicos y outputs consumibles por React, Angular, Vue y Liferay. Storybook / Style Dictionary.",
  followupIds: [
    "cs_cofares_decisiones_diseno",
    "cs_cofares_colaboracion",
    "cs_cofares_overview",
  ],
},

{
  id: "cs_cofares_metodologia",
  locale: "es-ES",
  question: "¿Qué metodología empleaste en el proyecto de Cofares?",
  answer:
    "El proyecto se desarrolló bajo metodología ágil Scrum, combinada con el enfoque de Atomic Design para la construcción del sistema de diseño. Este marco permitió estructurar los componentes de forma modular y escalable, definir claramente foundations, componentes y patrones, y facilitar la reutilización y evolución del sistema a largo plazo, manteniendo una integración estrecha entre diseño y desarrollo.",
  match: [
    "qué metodología empleaste en cofares",
    "que metodología empleaste en cofares",
    "cómo organizaste el trabajo del design system",
    "como organizaste el trabajo del design system",
    "usaste scrum en cofares",
    "atomic design en cofares",
    "cómo estructuraste foundations componentes patrones",
    "marco ágil para design systems",
  ],
  searchText:
    "Case study Cofares. Metodología. Scrum (ágil). Atomic Design para construir un sistema modular y escalable. Definir foundations, componentes y patrones. Reutilización y evolución a largo plazo. Integración estrecha entre diseño y desarrollo.",
  followupIds: [
    "cs_cofares_research_discovery",
    "cs_cofares_decisiones_diseno",
    "cs_cofares_colaboracion",
  ],
},

{
  id: "cs_cofares_research_discovery",
  locale: "es-ES",
  question: "¿Cómo llevaste a cabo la fase de investigación en Cofares?",
  answer:
    "El proceso de descubrimiento inició con una auditoría exhaustiva de UI de todos los productos digitales existentes para identificar inconsistencias visuales, duplicidad de componentes y diferencias en patrones de interacción. Esto permitió mapear el estado actual, detectar los principales puntos de fricción y establecer una base objetiva sobre la cual construir una arquitectura de diseño unificada.",
  match: [
    "cómo hiciste la investigación en cofares",
    "como hiciste la investigacion en cofares",
    "cómo fue el discovery del design system",
    "como fue el discovery del design system",
    "hiciste una auditoría de ui",
    "hiciste una auditoria de ui",
    "inconsistencias visuales y duplicidad de componentes",
    "patrones de interacción diferentes",
    "mapear el estado actual de productos",
  ],
  searchText:
    "Case study Cofares. Research y discovery. Auditoría exhaustiva de UI de todos los productos. Identificar inconsistencias visuales, duplicidad de componentes y diferencias en patrones de interacción. Mapear estado actual. Detectar fricciones. Base objetiva para arquitectura unificada y definición del Design System.",
  followupIds: [
    "cs_cofares_contexto_problema",
    "cs_cofares_decisiones_diseno",
    "cs_cofares_metodologia",
  ],
},

{
  id: "cs_cofares_decisiones_diseno",
  locale: "es-ES",
  question: "¿Qué decisiones de diseño tomaste en Cofares?",
  answer:
    "El sistema se diseñó con principios claros: coherencia y consistencia, agnosticismo a la tecnología, accesibilidad por defecto (criterios mínimo AA según WCAG 2), y escalabilidad/modularidad para crecer sin fricción. Se estandarizaron foundations (colores, tipografías, espaciado, motion) y se creó una arquitectura de design tokens (primitives → semantic → component) como fuente única de verdad. La arquitectura de librerías funcionó con un modelo Padre → Hijas para asegurar reutilización y escalabilidad",
  match: [
    "qué decisiones de diseño tomaste en cofares",
    "que decisiones de diseño tomaste en cofares",
    "qué principios definiste para el design system",
    "que principios definiste para el design system",
    "accesibilidad wcag aa",
    "arquitectura de tokens primitives semantic component",
    "fundations colores tipografías espaciado motion",
    "modelo padre hijas librerías",
    "cómo aseguraste agnosticismo al framework",
  ],
  searchText:
    "Case study Cofares. Decisiones de diseño. Principios: coherencia y consistencia, agnosticismo a la tecnología, accesibilidad por defecto (WCAG 2 AA), escalabilidad y modularidad. Foundations: color, tipografía, espaciado, motion. Arquitectura de design tokens: primitives → semantic → component como fuente única de verdad. Arquitectura de librerías: modelo Padre → Hijas para reutilización y escalabilidad.",
  followupIds: [
    "cs_cofares_rol_responsabilidades",
    "cs_cofares_colaboracion",
    "cs_cofares_metricas_impacto",
  ],
},

{
  id: "cs_cofares_colaboracion",
  locale: "es-ES",
  question: "¿Cómo fue la relación con negocio y tecnología en Cofares?",
  answer:
    "El trabajo se desarrolló bajo metodología Scrum, colaborando de forma continua con los equipos de desarrollo para validar decisiones de diseño y asegurar su correcta implementación técnica. Desde mi rol como UX Engineer, me encargué de definir la nomenclatura y la arquitectura de los design tokens, así como de preparar y dejar listo el CSS base del sistema, de modo que el equipo de desarrollo pudiera integrarlo realizando cambios mínimos sobre la base de los componentes existentes. Esto permitió reducir fricción, acelerar la adopción del sistema y mantener coherencia entre diseño y código desde el inicio. El modelo de gobernanza federada promovió feedback continuo de equipos de producto y validación de propuestas por un comité mixto, asegurando alineamiento entre diseño, desarrollo y necesidades de negocio.",
  match: [
    "cómo fue la relación con negocio y tecnología en cofares",
    "como fue la relacion con negocio y tecnologia en cofares",
    "cómo colaboraste con desarrollo",
    "como colaboraste con desarrollo",
    "preparaste el css base del sistema",
    "definiste nomenclatura y arquitectura de tokens",
    "integración con cambios mínimos en componentes",
    "gobernanza federada comité mixto",
    "alineamiento diseño desarrollo negocio",
  ],
  searchText:
    "Case study Cofares. Colaboración con negocio y tecnología. Scrum. Trabajo continuo con desarrollo para validar e implementar. Rol UX Engineer: nomenclatura y arquitectura de tokens, CSS base del sistema. Integración con cambios mínimos sobre componentes existentes. Reducir fricción y acelerar adopción. Coherencia diseño-código. Gobernanza federada: feedback continuo y comité mixto para validar propuestas y asegurar alineamiento con negocio.",
  followupIds: [
    "cs_cofares_decisiones_diseno",
    "cs_cofares_metricas_impacto",
    "cs_cofares_aprendizajes",
  ],
},

{
  id: "cs_cofares_metricas_impacto",
  locale: "es-ES",
  question: "¿Cuál fue el impacto de tu trabajo en Cofares?",
  answer:
    "Tras los primeros seis meses de adopción, el Design System permitió desarrollar interfaces hasta 4 veces más rápido gracias a la estandarización de estilos y componentes; redujo divergencias entre productos y retrabajo técnico; y facilitó que nuevos productos partieran del trabajo ya resuelto (tokens, estilos, componentes). Además, se logró un impacto positivo en el retorno de inversión (ROI 180%), considerando un ahorro estimado de 1,9 Millones de euros en horas de desarrollo, disminución de incidencias y reutilización de activos a través del ecosistema digital.",
  match: [
    "cuál fue el impacto en cofares",
    "cual fue el impacto en cofares",
    "qué resultados tuvo el design system",
    "que resultados tuvo el design system",
    "cuánto aceleró el desarrollo",
    "hasta 4 veces más rápido",
    "roi 180",
    "ahorro 1,9 millones",
    "reducción de retrabajo y divergencias",
    "impacto en productividad y coste",
  ],
  searchText:
    "Case study Cofares. Impacto y métricas. Adopción en 6 meses. Desarrollo de interfaces hasta 4x más rápido por estandarización de estilos y componentes. Reducción de divergencias y retrabajo técnico. Nuevos productos parten de tokens, estilos y componentes ya resueltos. ROI 180%. Ahorro estimado 1,9 millones de euros por horas de desarrollo, disminución de incidencias y reutilización de activos.",
  followupIds: [
    "cs_cofares_decisiones_diseno",
    "cs_cofares_aprendizajes",
    "cs_cofares_overview",
  ],
},

{
  id: "cs_cofares_aprendizajes",
  locale: "es-ES",
  question: "¿Qué aprendiste en el proyecto de Cofares?",
  answer:
    "A nivel profesional, este proyecto consolidó la idea de que un Design System no es solo un conjunto visual, sino una infraestructura de diseño y desarrollo que requiere principios sólidos, una arquitectura escalable y procesos automatizados de sincronización y gobernanza. La adopción efectiva depende tanto de la tecnología como de un modelo de colaboración claro entre equipos y de una documentación accesible como Storybook, que actúa como fuente de verdad e impulsa la coherencia en todo el ecosistema.",
  match: [
    "qué aprendiste en cofares",
    "que aprendiste en cofares",
    "aprendizajes del proyecto del design system",
    "lecciones aprendidas design system cofares",
    "por qué un design system es infraestructura",
    "sincronización y gobernanza automatizada",
    "importancia de la adopción y colaboración",
    "storyboard como fuente de verdad",
    "storybook como fuente de verdad",
    "coherencia en todo el ecosistema",
  ],
  searchText:
    "Case study Cofares. Aprendizajes. Design System como infraestructura de diseño y desarrollo (no solo visual). Requiere principios sólidos, arquitectura escalable y automatización de sincronización y gobernanza. Adopción depende de tecnología + modelo de colaboración claro entre equipos. Documentación accesible: Storybook como fuente de verdad para coherencia del ecosistema.",
  followupIds: [
    "cs_cofares_metricas_impacto",
    "cs_cofares_contexto_problema",
    "cs_cofares_overview",
  ],
},


  /* =========================
   03) CASOS — OVERON (v2)
   ========================= */

/** OVERVIEW (nuevo) */
{
  id: "cs_overon_overview",
  locale: "es-ES",
  question: "¿Qué hiciste en Overon?",
  answer:
    "Trabajé como Design Lead diseñando una plataforma de control y monitorización de señales audiovisuales dentro del grupo Mediapro, concebida como solución “marca blanca” reutilizable para distintos clientes y productos (Overon, Agencia EFE, LaLiga VAR). El reto fue crear una arquitectura única, coherente y escalable que pudiera adaptarse a contextos operativos diferentes sin perder consistencia, claridad ni eficiencia. Definí la arquitectura de la plataforma, el modelo de navegación común y los patrones de interacción compartidos, asegurando reutilización de la base y capacidad de evolución para nuevos escenarios.",
  match: [
    "qué hiciste en overon",
    "que hiciste en overon",
    "cuéntame tu proyecto de overon",
    "cuentame tu proyecto de overon",
    "en qué consistió tu trabajo en overon",
    "en que consistio tu trabajo en overon",
    "proyecto overon mediapro",
    "plataforma de monitorización mediapro",
    "plataforma marca blanca overon",
    "overon agencia efe laliga var",
  ],
  searchText:
    "Case study Overon. Mediapro. Overview del proyecto. Plataforma de control y monitorización de señales audiovisuales. Solución marca blanca reutilizable para distintos clientes: Overon, Agencia EFE, LaLiga VAR. Arquitectura única, coherente y escalable. Navegación común y patrones compartidos. Reutilización de base de producto en múltiples escenarios. Eficiencia operativa y consistencia.",
  followupIds: [
    "cs_overon_contexto_problema",
    "cs_overon_rol_responsabilidades",
    "cs_overon_decisiones_diseno",
  ],
},

{
  id: "cs_overon_contexto_problema",
  locale: "es-ES",
  question: "¿Qué problema detectaste en Overon?",
  answer:
    "El grupo Mediapro, necesitaba una plataforma de control y monitorización de señales audiovisuales que pudiera funcionar como solución “marca blanca” para distintos productos y clientes con necesidades específicas, como Overon, Agencia EFE y LaLiga VAR. El principal reto era diseñar una plataforma única, coherente y escalable, capaz de adaptarse a distintos contextos operativos sin perder consistencia, claridad ni eficiencia, y que permitiera reutilizar la misma base de producto en múltiples escenarios.",
  match: [
    "qué problema detectaste en overon",
    "que problema detectaste en overon",
    "qué necesitaba mediapro con overon",
    "que necesitaba mediapro con overon",
    "por qué una plataforma marca blanca",
    "monitorización de señales audiovisuales",
    "plataforma de control y monitorización",
    "necesidades distintas de clientes",
    "overon agencia efe laliga var",
    "reutilizar base de producto en múltiples escenarios",
  ],
  searchText:
    "Case study Overon (Mediapro). Contexto y problema. Plataforma de control y monitorización de señales audiovisuales. Solución marca blanca para distintos clientes y productos: Overon, Agencia EFE, LaLiga VAR. Necesidad de plataforma única, coherente y escalable. Adaptación a contextos operativos distintos manteniendo consistencia, claridad y eficiencia. Reutilización de base de producto.",
  followupIds: [
    "cs_overon_research_discovery",
    "cs_overon_decisiones_diseno",
    "cs_overon_overview",
  ],
},

{
  id: "cs_overon_rol_responsabilidades",
  locale: "es-ES",
  question: "¿Cuál fue tu rol y responsabilidades en Overon?",
  answer:
    "Actué como Design Lead responsable del diseño de la plataforma transversal. Mi rol incluyó la definición de la arquitectura de la plataforma, el modelo de navegación común, la experiencia de usuario y los patrones de interacción compartidos, asegurando que la solución funcionara de forma consistente para todos los productos y pudiera escalarse a futuros casos de uso dentro del grupo",
  match: [
    "cuál fue tu rol en overon",
    "cual fue tu rol en overon",
    "cuáles fueron tus responsabilidades en overon",
    "cuales fueron tus responsabilidades en overon",
    "eras design lead en mediapro",
    "definiste arquitectura y navegación común",
    "patrones de interacción compartidos",
    "plataforma transversal marca blanca",
    "escalabilidad para futuros casos de uso",
  ],
  searchText:
    "Case study Overon. Rol y responsabilidades. Design Lead. Diseño de plataforma transversal. Definición de arquitectura de plataforma. Modelo de navegación común. Experiencia de usuario. Patrones de interacción compartidos. Consistencia entre productos. Escalabilidad para futuros casos de uso dentro de Mediapro.",
  followupIds: [
    "cs_overon_metodologia",
    "cs_overon_colaboracion",
    "cs_overon_overview",
  ],
},

{
  id: "cs_overon_metodologia",
  locale: "es-ES",
  question: "¿Qué metodología empleaste en el proyecto de Overon?",
  answer:
    "Se utilizó una metodología ágil con foco en diseño de plataformas, apoyada en discovery inicial mediante entrevistas, workshops y benchmark, seguida de iteraciones sucesivas de definición y validación. El proceso priorizó la creación de una arquitectura común reutilizable y la validación continua con equipos técnicos para garantizar viabilidad y escalabilidad.",
  match: [
    "qué metodología empleaste en overon",
    "que metodología empleaste en overon",
    "qué proceso seguiste en el proyecto overon",
    "que proceso seguiste en el proyecto overon",
    "metodología ágil para plataformas",
    "discovery con entrevistas workshops benchmark",
    "iteraciones de definición y validación",
    "validación continua con equipos técnicos",
    "arquitectura común reutilizable",
  ],
  searchText:
    "Case study Overon. Metodología. Enfoque ágil para diseño de plataformas. Discovery inicial: entrevistas, workshops y benchmark. Iteraciones sucesivas de definición y validación. Prioridad: arquitectura común reutilizable. Validación continua con equipos técnicos para garantizar viabilidad y escalabilidad.",
  followupIds: [
    "cs_overon_research_discovery",
    "cs_overon_decisiones_diseno",
    "cs_overon_colaboracion",
  ],
},

{
  id: "cs_overon_research_discovery",
  locale: "es-ES",
  question: "¿Cómo llevaste a cabo la fase de investigación en Overon?",
  answer:
    "El proceso de discovery incluyó entrevistas con usuarios de la plataforma anterior para entender flujos reales, puntos de fricción y necesidades operativas en contextos críticos. Se realizó un benchmark de productos competidores y un análisis de buenas prácticas de otras empresas del sector para identificar patrones efectivos de monitorización y control. Además, se facilitaron ejercicios de workshop orientados a discovery, enfocados en mapear cómo los usuarios utilizaban la herramienta actual, detectar dependencias entre tareas, identificar información crítica y priorizar qué elementos debían ser visibles de forma inmediata dentro de la nueva arquitectura de plataforma.",
  match: [
    "cómo hiciste la investigación en overon",
    "como hiciste la investigacion en overon",
    "cómo fue el discovery de la plataforma",
    "como fue el discovery de la plataforma",
    "entrevistas con usuarios de la plataforma anterior",
    "benchmark de competidores",
    "buenas prácticas de monitorización y control",
    "workshops para mapear tareas y dependencias",
    "identificar información crítica visible",
  ],
  searchText:
    "Case study Overon. Research y discovery. Entrevistas con usuarios de plataforma anterior para entender flujos reales, fricciones y necesidades operativas en contextos críticos. Benchmark de competidores. Buenas prácticas del sector. Workshops de discovery para mapear uso actual, dependencias entre tareas, información crítica y priorización de visibilidad inmediata en la nueva arquitectura.",
  followupIds: [
    "cs_overon_contexto_problema",
    "cs_overon_decisiones_diseno",
    "cs_overon_metodologia",
  ],
},

{
  id: "cs_overon_decisiones_diseno",
  locale: "es-ES",
  question: "¿Qué decisiones de diseño tomaste en Overon?",
  answer:
    "Diseñé una arquitectura de plataforma modular y reutilizable basada en un modelo de navegación único. Definí un menú principal en formato sidebar como eje de la navegación, una zona central de dashboards con paneles de monitorización, navegación por pestañas para gestionar contextos simultáneos, indicadores luminosos para visualizar estados de señal en tiempo real y menús laterales tipo overlay para acciones secundarias. Este enfoque agilizó el proceso de diseño de los distintos productos, redujo dependencias entre equipos y permitió adaptar la plataforma a las necesidades específicas de cada product owner sin comprometer la coherencia ni la consistencia del sistema.",
  match: [
    "qué decisiones de diseño tomaste en overon",
    "que decisiones de diseño tomaste en overon",
    "arquitectura modular y reutilizable",
    "navegación única con sidebar",
    "dashboards de monitorización",
    "pestañas para contextos simultáneos",
    "indicadores luminosos en tiempo real",
    "overlays para acciones secundarias",
    "patrones de interacción compartidos",
    "librería eva angular",
  ],
  searchText:
    "Case study Overon. Decisiones de diseño. Arquitectura de plataforma modular y reutilizable. Modelo de navegación único. Sidebar como eje principal. Zona central con dashboards/paneles de monitorización. Navegación por pestañas para múltiples contextos simultáneos. Indicadores luminosos/estados de señal en tiempo real. Overlays laterales para acciones secundarias. Coherencia y consistencia entre productos. Reutilización y reducción de dependencias entre equipos. Integración con librería Eva en Angular.",
  followupIds: [
    "cs_overon_colaboracion",
    "cs_overon_metricas_impacto",
    "cs_overon_aprendizajes",
  ],
},

{
  id: "cs_overon_colaboracion",
  locale: "es-ES",
  question: "¿Cómo fue la relación con negocio y tecnología en Overon?",
  answer:
    "Trabajé en estrecha colaboración con los equipos de desarrollo para asegurar que las decisiones de diseño se alinearan con la implementación técnica. La plataforma se construyó sobre la librería de componentes Eva para Angular, lo que implicó diseñar soluciones coherentes con el sistema existente y adaptarlo a las necesidades específicas de la plataforma, garantizando consistencia, reutilización y eficiencia en el desarrollo.",
  match: [
    "cómo fue la relación con negocio y tecnología en overon",
    "como fue la relacion con negocio y tecnologia en overon",
    "cómo colaboraste con desarrollo",
    "como colaboraste con desarrollo",
    "alineación con implementación técnica",
    "angular y librería eva",
    "coherencia con el sistema existente",
    "adaptar componentes para la plataforma",
    "reutilización y eficiencia en desarrollo",
  ],
  searchText:
    "Case study Overon. Colaboración con negocio y tecnología. Trabajo estrecho con desarrollo. Alineación diseño-implementación. Plataforma construida sobre librería de componentes Eva para Angular. Diseñar coherente con el sistema existente y adaptarlo a necesidades de plataforma. Consistencia, reutilización y eficiencia en desarrollo.",
  followupIds: [
    "cs_overon_decisiones_diseno",
    "cs_overon_metodologia",
    "cs_overon_metricas_impacto",
  ],
},

{
  id: "cs_overon_metricas_impacto",
  locale: "es-ES",
  question: "¿Cuál fue el impacto de tu trabajo en Overon?",
  answer:
    "La creación de una plataforma marca blanca permitió reutilizar la misma base de producto en distintos contextos, reduciendo tiempos de diseño y desarrollo para nuevos proyectos y facilitando la escalabilidad dentro del grupo Mediapro. La estandarización de la navegación y los patrones de interacción mejoró la eficiencia operativa y la curva de aprendizaje de los usuarios en productos críticos.",
  match: [
    "cuál fue el impacto en overon",
    "cual fue el impacto en overon",
    "qué resultados tuvo la plataforma marca blanca",
    "que resultados tuvo la plataforma marca blanca",
    "reutilizar la misma base de producto",
    "reducción de tiempos de diseño y desarrollo",
    "escalabilidad dentro de mediapro",
    "mejora de eficiencia operativa",
    "mejor curva de aprendizaje",
    "productos críticos de monitorización",
  ],
  searchText:
    "Case study Overon. Impacto. Plataforma marca blanca reutilizable. Reutilización de base de producto en distintos contextos. Reducción de tiempos de diseño y desarrollo para nuevos proyectos. Escalabilidad dentro de Mediapro. Estandarización de navegación y patrones. Mejora de eficiencia operativa y curva de aprendizaje en productos críticos.",
  followupIds: [
    "cs_overon_decisiones_diseno",
    "cs_overon_aprendizajes",
    "cs_overon_overview",
  ],
},

{
  id: "cs_overon_aprendizajes",
  locale: "es-ES",
  question: "¿Qué aprendiste en el proyecto de Overon?",
  answer:
    "Este proyecto reforzó la importancia de pensar en términos de plataforma y no de producto aislado. Aprendí a diseñar arquitecturas flexibles que equilibran estandarización y adaptabilidad, y a priorizar claridad, consistencia y rapidez de uso en sistemas complejos y de alta criticidad, donde el diseño impacta directamente en la operativa diaria.",
  match: [
    "qué aprendiste en overon",
    "que aprendiste en overon",
    "aprendizajes del proyecto de mediapro",
    "lecciones aprendidas plataforma marca blanca",
    "pensar en términos de plataforma",
    "arquitecturas flexibles",
    "equilibrio estandarización adaptabilidad",
    "claridad consistencia rapidez de uso",
    "sistemas complejos y de alta criticidad",
  ],
  searchText:
    "Case study Overon. Aprendizajes. Pensar en plataforma vs producto aislado. Arquitecturas flexibles. Equilibrio entre estandarización y adaptabilidad. Priorizar claridad, consistencia y rapidez de uso. Sistemas complejos y de alta criticidad donde el diseño impacta la operativa diaria.",
  followupIds: [
    "cs_overon_metricas_impacto",
    "cs_overon_contexto_problema",
    "cs_overon_overview",
  ],
},

/* =========================
   03) CASOS — BBVA (v2)
   ========================= */

/** OVERVIEW (nuevo) */
{
  id: "cs_bbva_overview",
  locale: "es-ES",
  question: "¿Qué hiciste en BBVA?",
  answer:
    "Formé parte del squad de BBVA Open Innovation contribuyendo desde Product Design a la definición de la experiencia de la tarjeta de débito Aqua. El reto era responder al aumento del fraude en pagos online mejorando control y seguridad sin añadir fricción en un entorno regulado. Participé en discovery (research + benchmark + workshops), en la conceptualización de funcionalidades clave y en el trabajo colaborativo con negocio y tecnología para equilibrar innovación, viabilidad e integración dentro del ecosistema digital del banco.",
  match: [
    "qué hiciste en bbva",
    "que hiciste en bbva",
    "cuéntame tu proyecto en bbva",
    "cuentame tu proyecto en bbva",
    "en qué consistió tu trabajo en bbva",
    "en que consistio tu trabajo en bbva",
    "tarjeta aqua bbva proyecto",
    "bbva open innovation squad",
    "proyecto de seguridad pagos online bbva",
    "tu trabajo con la tarjeta de débito aqua",
    "tu trabajo con la tarjeta de debito aqua",
  ],
  searchText:
    "Case study BBVA. Overview del proyecto. Tarjeta de débito Aqua. Aumento de fraude en pagos online. Necesidad de control y seguridad para clientes. Diseñar seguridad sin fricción en un entorno regulado. Squad BBVA Open Innovation. Discovery: research cualitativo, entrevistas, benchmark y workshops internos. Conceptualización de funcionalidades de seguridad (CVV dinámico, apagado digital). Colaboración con negocio y tecnología para viabilidad e integración en ecosistema digital del banco.",
  followupIds: [
    "cs_bbva_contexto_problema",
    "cs_bbva_decisiones_diseno",
    "cs_bbva_colaboracion",
  ],
},

{
  id: "cs_bbva_contexto_problema",
  locale: "es-ES",
  question: "¿Qué problema detectaste en BBVA?",
  answer:
    "BBVA buscaba redefinir la experiencia de la tarjeta de débito para responder a un contexto creciente de fraude en pagos online y a la necesidad de ofrecer a los clientes mayor control y seguridad en sus operaciones digitales. El reto era diseñar una tarjeta innovadora que aumentara la confianza del usuario, redujera el riesgo de uso fraudulento y fuera fácilmente comprensible y usable dentro del ecosistema digital del banco.",
  match: [
    "qué problema detectaste en bbva",
    "que problema detectaste en bbva",
    "por qué había que rediseñar la tarjeta",
    "fraude en pagos online bbva",
    "necesidad de control y seguridad",
    "aumentar confianza del usuario",
    "reducir riesgo de uso fraudulento",
    "tarjeta aqua bbva",
  ],
  searchText:
    "Case study BBVA. Contexto y problema. Fraude creciente en pagos online. Necesidad de aumentar control y seguridad de clientes en operaciones digitales. Diseñar una tarjeta innovadora que aumente confianza, reduzca riesgo de fraude y sea comprensible y usable dentro del ecosistema digital del banco. Tarjeta Aqua.",
  followupIds: [
    "cs_bbva_research_discovery",
    "cs_bbva_decisiones_diseno",
    "cs_bbva_overview",
  ],
},

{
  id: "cs_bbva_rol_responsabilidades",
  locale: "es-ES",
  question: "¿Cuál fue tu rol y responsabilidades en BBVA?",
  answer:
    "Formé parte del squad de BBVA Open Innovation, contribuyendo desde diseño de producto a la definición de la experiencia de la tarjeta de débito Aqua. Participé en la conceptualización de funcionalidades clave orientadas a seguridad y control del usuario, trabajando de forma colaborativa con producto, tecnología y negocio.",
  match: [
    "cuál fue tu rol en bbva",
    "cual fue tu rol en bbva",
    "cuáles fueron tus responsabilidades en bbva",
    "cuales fueron tus responsabilidades en bbva",
    "bbva open innovation",
    "trabajaste en un squad de innovación",
    "aportaste desde diseño de producto",
    "conceptualización de funcionalidades de seguridad",
    "tarjeta de débito aqua",
    "tarjeta de debito aqua",
  ],
  searchText:
    "Case study BBVA. Rol y responsabilidades. Miembro del squad BBVA Open Innovation. Contribución desde Product Design a la experiencia de la tarjeta de débito Aqua. Conceptualización de funcionalidades clave de seguridad y control. Trabajo colaborativo con producto, tecnología y negocio.",
  followupIds: [
    "cs_bbva_metodologia",
    "cs_bbva_colaboracion",
    "cs_bbva_overview",
  ],
},

{
  id: "cs_bbva_metodologia",
  locale: "es-ES",
  question: "¿Qué metodología empleaste en el proyecto de BBVA?",
  answer:
    "El trabajo se desarrolló dentro de un squad de innovación bajo un marco ágil, combinando Design Thinking, research cualitativo y workshops colaborativos. La metodología permitió explorar soluciones innovadoras en un entorno regulado, validar conceptos con distintos equipos del banco y equilibrar seguridad, negocio y experiencia de usuario.",
  match: [
    "qué metodología empleaste en bbva",
    "que metodología empleaste en bbva",
    "cómo trabajaba el squad de innovación",
    "como trabajaba el squad de innovacion",
    "marco ágil en bbva open innovation",
    "design thinking y research cualitativo",
    "workshops colaborativos",
    "innovación en entorno regulado",
    "equilibrar seguridad negocio y ux",
  ],
  searchText:
    "Case study BBVA. Metodología. Squad de innovación bajo marco ágil. Design Thinking. Research cualitativo. Workshops colaborativos. Explorar soluciones innovadoras en un entorno regulado. Validar conceptos con equipos del banco. Equilibrar seguridad, negocio y experiencia de usuario.",
  followupIds: [
    "cs_bbva_research_discovery",
    "cs_bbva_decisiones_diseno",
    "cs_bbva_colaboracion",
  ],
},

{
  id: "cs_bbva_research_discovery",
  locale: "es-ES",
  question: "¿Cómo llevaste a cabo la fase de investigación en BBVA?",
  answer:
    "Mi papel en la fase de discovery incluyó la realización de entrevistas con usuarios, investigación de design research orientada a entender comportamientos y percepciones sobre seguridad en pagos digitales, y un benchmark de otros bancos y buenas prácticas del sector financiero. De forma complementaria, facilité workshops con distintos equipos del banco para alinear conocimiento, compartir insights y cocrear soluciones que equilibraran innovación, seguridad y usabilidad dentro del contexto regulado de BBVA.",
  match: [
    "cómo hiciste la investigación en bbva",
    "como hiciste la investigacion en bbva",
    "cómo fue el discovery de aqua",
    "como fue el discovery de aqua",
    "entrevistas con usuarios sobre seguridad",
    "design research pagos digitales",
    "benchmark de bancos",
    "buenas prácticas sector financiero",
    "workshops con equipos del banco",
    "cocrear soluciones en entorno regulado",
  ],
  searchText:
    "Case study BBVA. Research y discovery. Entrevistas con usuarios. Design research sobre comportamientos y percepciones de seguridad en pagos digitales. Benchmark de otros bancos y buenas prácticas del sector financiero. Workshops internos para alinear conocimiento, compartir insights y cocrear soluciones que equilibren innovación, seguridad y usabilidad en entorno regulado.",
  followupIds: [
    "cs_bbva_contexto_problema",
    "cs_bbva_decisiones_diseno",
    "cs_bbva_metodologia",
  ],
},

{
  id: "cs_bbva_decisiones_diseno",
  locale: "es-ES",
  question: "¿Qué decisiones de diseño tomaste en BBVA?",
  answer:
    "Una de las decisiones clave fue impulsar el uso de un CVV dinámico, eliminando la numeración fija en la tarjeta física para reducir el riesgo de fraude en pagos online. Además, aporté el concepto de apagado digital de la tarjeta, permitiendo al usuario activar o desactivar su uso de forma inmediata desde canales digitales, reforzando la sensación de control y seguridad sin añadir complejidad a la experiencia.",
  match: [
    "qué decisiones de diseño tomaste en bbva",
    "que decisiones de diseño tomaste en bbva",
    "por qué cvv dinámico",
    "por que cvv dinamico",
    "sin numeración fija en la tarjeta",
    "sin numeracion fija en la tarjeta",
    "apagado digital de la tarjeta",
    "activar desactivar tarjeta desde la app",
    "control y seguridad sin fricción",
    "control y seguridad sin friccion",
  ],
  searchText:
    "Case study BBVA. Decisiones de diseño. CVV dinámico. Eliminar numeración fija en la tarjeta física para reducir fraude en pagos online. Apagado digital: activar/desactivar tarjeta desde canales digitales. Aumentar sensación de control y seguridad sin añadir complejidad ni fricción en la experiencia. Tarjeta Aqua.",
  followupIds: [
    "cs_bbva_metricas_impacto",
    "cs_bbva_colaboracion",
    "cs_bbva_overview",
  ],
},

{
  id: "cs_bbva_colaboracion",
  locale: "es-ES",
  question: "¿Cómo fue la relación con negocio y tecnología en BBVA?",
  answer:
    "El trabajo se realizó en estrecha colaboración dentro del squad, alineando diseño, tecnología y negocio para validar la viabilidad técnica de las soluciones propuestas y asegurar su correcta integración en los sistemas del banco. La colaboración permitió equilibrar innovación, seguridad y usabilidad dentro de un entorno regulado.",
  match: [
    "cómo fue la relación con negocio y tecnología en bbva",
    "como fue la relacion con negocio y tecnologia en bbva",
    "cómo colaboraste con tecnología y negocio",
    "como colaboraste con tecnologia y negocio",
    "validar viabilidad técnica",
    "validar viabilidad tecnica",
    "integración en sistemas del banco",
    "integracion en sistemas del banco",
    "equilibrar innovación seguridad y usabilidad",
    "entorno regulado",
  ],
  searchText:
    "Case study BBVA. Colaboración con negocio y tecnología. Trabajo estrecho en squad. Alinear diseño, tecnología y negocio. Validar viabilidad técnica. Asegurar integración en sistemas del banco. Equilibrar innovación, seguridad y usabilidad en un entorno regulado.",
  followupIds: [
    "cs_bbva_decisiones_diseno",
    "cs_bbva_metricas_impacto",
    "cs_bbva_metodologia",
  ],
},

{
  id: "cs_bbva_metricas_impacto",
  locale: "es-ES",
  question: "¿Cuál fue el impacto de tu trabajo en BBVA?",
  answer:
    "La tarjeta Aqua impulsó la adopción de un nuevo modelo de tarjeta más segura, reduciendo el riesgo de fraude en pagos online y mejorando la percepción de control y confianza por parte de los usuarios. La introducción de funcionalidades como el CVV dinámico y el apagado digital contribuyó a posicionar a BBVA como referente en innovación y seguridad bancaria",
  match: [
    "cuál fue el impacto en bbva",
    "cual fue el impacto en bbva",
    "qué resultados tuvo la tarjeta aqua",
    "que resultados tuvo la tarjeta aqua",
    "reducción de riesgo de fraude",
    "reduccion de riesgo de fraude",
    "mejora percepción de control y confianza",
    "mejora percepcion de control y confianza",
    "posicionar a bbva como referente",
    "innovación y seguridad bancaria",
  ],
  searchText:
    "Case study BBVA. Impacto. Tarjeta Aqua. Adopción de un modelo de tarjeta más segura. Reducción de riesgo de fraude en pagos online. Mejora de percepción de control y confianza. Funcionalidades: CVV dinámico y apagado digital. Posicionamiento de BBVA como referente en innovación y seguridad bancaria.",
  followupIds: [
    "cs_bbva_decisiones_diseno",
    "cs_bbva_aprendizajes",
    "cs_bbva_overview",
  ],
},

{
  id: "cs_bbva_aprendizajes",
  locale: "es-ES",
  question: "¿Qué aprendiste en el proyecto de BBVA?",
  answer:
    "Este proyecto reforzó la importancia de diseñar soluciones de seguridad centradas en el usuario, donde la protección no se percibe como fricción sino como valor. También evidenció cómo la innovación en entornos regulados requiere una estrecha colaboración entre diseño, negocio y tecnología para convertir conceptos complejos en experiencias simples y adoptables.",
  match: [
    "qué aprendiste en bbva",
    "que aprendiste en bbva",
    "aprendizajes del proyecto aqua",
    "lecciones aprendidas tarjeta aqua",
    "seguridad centrada en el usuario",
    "seguridad como valor no fricción",
    "seguridad como valor no friccion",
    "innovación en entornos regulados",
    "convertir conceptos complejos en experiencias simples",
    "colaboración estrecha diseño negocio tecnología",
  ],
  searchText:
    "Case study BBVA. Aprendizajes. Diseñar seguridad centrada en el usuario: protección como valor, no fricción. Innovación en entornos regulados requiere colaboración estrecha entre diseño, negocio y tecnología. Convertir conceptos complejos en experiencias simples, comprensibles y adoptables.",
  followupIds: [
    "cs_bbva_metricas_impacto",
    "cs_bbva_contexto_problema",
    "cs_bbva_overview",
  ],
},


  /* =========================
   03) CASOS — INDITEX (v2)
   ========================= */

/** OVERVIEW (nuevo) */
{
  id: "cs_inditex_overview",
  locale: "es-ES",
  question: "¿Qué hiciste en Inditex?",
  answer:
    "Trabajé como Product Designer contribuyendo a mejorar los flujos de descubrimiento y compra dentro del ecommerce de Inditex, en un contexto de alto volumen de usuarios y catálogos amplios. El objetivo fue reducir fricción en navegación y conversión y explorar nuevas formas de inspiración que conectaran mejor con el comportamiento real de los usuarios. Mi aportación más destacada fue proponer y diseñar la funcionalidad de compra sobre vídeo, integrando contenido audiovisual con acceso directo a compra para unir inspiración y conversión en una única experiencia.",
  match: [
    "qué hiciste en inditex",
    "que hiciste en inditex",
    "cuéntame tu proyecto en inditex",
    "cuentame tu proyecto en inditex",
    "en qué consistió tu trabajo en inditex",
    "en que consistio tu trabajo en inditex",
    "tu proyecto de ecommerce en inditex",
    "inditex compra sobre vídeo",
    "inditex compra sobre video",
    "nuevos flujos de descubrimiento y compra inditex",
    "optimización navegación y conversión inditex",
  ],
  searchText:
    "Case study Inditex. Overview del proyecto. Ecommerce de alto volumen y catálogo amplio. Mejorar descubrimiento y compra. Optimizar navegación y conversión. Reducir fricción en el proceso de compra. Explorar inspiración más allá de patrones tradicionales. Innovación: compra sobre vídeo para conectar contenido audiovisual con compra directa. Unir inspiración y conversión. Product Design.",
  followupIds: [
    "cs_inditex_contexto_problema",
    "cs_inditex_decisiones_diseno",
    "cs_inditex_colaboracion",
  ],
},

{
  id: "cs_inditex_contexto_problema",
  locale: "es-ES",
  question: "¿Qué problema detectaste en Inditex?",
  answer:
    "Inditex buscaba mejorar los procesos de descubrimiento y compra dentro de sus plataformas digitales, en un contexto de alto volumen de usuarios y catálogos amplios. El reto era optimizar la experiencia de navegación y conversión, reduciendo fricción en el proceso de compra y explorando nuevas formas de inspirar a los usuarios más allá de los patrones tradicionales de ecommerce.",
  match: [
    "qué problema detectaste en inditex",
    "que problema detectaste en inditex",
    "qué reto había en el ecommerce de inditex",
    "que reto habia en el ecommerce de inditex",
    "alto volumen de usuarios y catálogo amplio",
    "alto volumen de usuarios y catalogo amplio",
    "mejorar descubrimiento y compra",
    "optimizar navegación y conversión",
    "reducir fricción en el proceso de compra",
    "inspirar más allá de patrones tradicionales",
  ],
  searchText:
    "Case study Inditex. Contexto y problema. Alto volumen de usuarios. Catálogos amplios. Mejorar procesos de descubrimiento y compra. Optimizar navegación y conversión. Reducir fricción del funnel de compra. Explorar nuevas formas de inspiración más allá del ecommerce tradicional.",
  followupIds: [
    "cs_inditex_research_discovery",
    "cs_inditex_metodologia",
    "cs_inditex_overview",
  ],
},

{
  id: "cs_inditex_rol_responsabilidades",
  locale: "es-ES",
  question: "¿Cuál fue tu rol y responsabilidades en Inditex?",
  answer:
    "Participé como Product Designer contribuyendo al rediseño de los flujos de descubrimiento y compra, trabajando en la definición de nuevas interacciones y funcionalidades orientadas a mejorar la experiencia del usuario y el rendimiento del ecommerce.",
  match: [
    "cuál fue tu rol en inditex",
    "cual fue tu rol en inditex",
    "cuáles fueron tus responsabilidades en inditex",
    "cuales fueron tus responsabilidades en inditex",
    "product designer en inditex",
    "rediseño de flujos de descubrimiento y compra",
    "definición de nuevas interacciones",
    "nuevas funcionalidades para mejorar ecommerce",
    "mejorar experiencia de usuario y rendimiento",
  ],
  searchText:
    "Case study Inditex. Rol y responsabilidades. Product Designer. Rediseño de flujos de descubrimiento y compra. Definición de nuevas interacciones y funcionalidades. Mejorar experiencia de usuario y rendimiento del ecommerce.",
  followupIds: [
    "cs_inditex_decisiones_diseno",
    "cs_inditex_colaboracion",
    "cs_inditex_overview",
  ],
},

{
  id: "cs_inditex_metodologia",
  locale: "es-ES",
  question: "¿Qué metodología empleaste en el proyecto de Inditex?",
  answer:
    "Se aplicó una metodología iterativa centrada en el usuario, combinando análisis de comportamiento, benchmarking y exploración de tendencias en retail digital. El proceso estuvo orientado a la experimentación y a la validación temprana de nuevas funcionalidades, permitiendo introducir formatos innovadores como la compra sobre vídeo.",
  match: [
    "qué metodología empleaste en inditex",
    "que metodología empleaste en inditex",
    "metodología iterativa centrada en el usuario",
    "analisis de comportamiento y benchmarking",
    "tendencias en retail digital",
    "experimentación y validación temprana",
    "introducir formatos innovadores",
    "compra sobre vídeo como experimento",
    "compra sobre video como experimento",
  ],
  searchText:
    "Case study Inditex. Metodología. Iterativa centrada en el usuario. Análisis de comportamiento. Benchmarking. Exploración de tendencias en retail digital. Experimentación. Validación temprana de nuevas funcionalidades. Formatos innovadores como compra sobre vídeo.",
  followupIds: [
    "cs_inditex_research_discovery",
    "cs_inditex_decisiones_diseno",
    "cs_inditex_colaboracion",
  ],
},

{
  id: "cs_inditex_research_discovery",
  locale: "es-ES",
  question: "¿Cómo llevaste a cabo la fase de investigación en Inditex?",
  answer:
    "El trabajo de discovery se apoyó en el análisis del comportamiento de los usuarios dentro del ecommerce, la identificación de puntos de fricción en los flujos de navegación y compra, y el estudio de tendencias emergentes en retail digital. Se tuvieron en cuenta buenas prácticas del sector y señales tempranas de consumo de contenido audiovisual aplicado al ecommerce.",
  match: [
    "cómo hiciste la investigación en inditex",
    "como hiciste la investigacion en inditex",
    "discovery en el ecommerce de inditex",
    "análisis de comportamiento de usuarios",
    "identificar fricción en navegación y compra",
    "tendencias emergentes en retail digital",
    "buenas prácticas del sector",
    "señales de consumo audiovisual en ecommerce",
    "contenido audiovisual aplicado a ecommerce",
  ],
  searchText:
    "Case study Inditex. Research y discovery. Análisis de comportamiento de usuarios en ecommerce. Identificación de fricciones en navegación y compra. Estudio de tendencias emergentes en retail digital. Buenas prácticas del sector. Señales de consumo de contenido audiovisual aplicado al ecommerce.",
  followupIds: [
    "cs_inditex_contexto_problema",
    "cs_inditex_decisiones_diseno",
    "cs_inditex_metodologia",
  ],
},

{
  id: "cs_inditex_decisiones_diseno",
  locale: "es-ES",
  question: "¿Qué decisiones de diseño tomaste en Inditex?",
  answer:
    "Una de las principales aportaciones fue la propuesta y diseño de la funcionalidad de compra sobre vídeo, permitiendo a los usuarios descubrir productos en contexto audiovisual y acceder a la compra de forma directa desde el contenido. En ese momento se trató de una funcionalidad innovadora, que amplió las posibilidades de descubrimiento, redujo pasos en el funnel y conectó inspiración y conversión en una única experiencia.",
  match: [
    "qué decisiones de diseño tomaste en inditex",
    "que decisiones de diseño tomaste en inditex",
    "compra sobre vídeo",
    "compra sobre video",
    "descubrir productos en contexto audiovisual",
    "comprar directamente desde el contenido",
    "reducir pasos en el funnel",
    "conectar inspiración y conversión",
    "funcionalidad innovadora en ecommerce",
  ],
  searchText:
    "Case study Inditex. Decisiones de diseño. Compra sobre vídeo: descubrir productos en contexto audiovisual y comprar desde el contenido. Reducir pasos del funnel. Conectar inspiración y conversión en una única experiencia. Innovación aplicada al ecommerce y retail digital.",
  followupIds: [
    "cs_inditex_metricas_impacto",
    "cs_inditex_colaboracion",
    "cs_inditex_overview",
  ],
},

{
  id: "cs_inditex_colaboracion",
  locale: "es-ES",
  question: "¿Cómo fue la relación con negocio y tecnología en Inditex?",
  answer:
    "Trabajé de forma colaborativa con equipos de negocio y desarrollo para validar la viabilidad de la nueva funcionalidad y asegurar su correcta integración dentro de la plataforma existente, alineando objetivos comerciales con una experiencia fluida y escalable.",
  match: [
    "cómo fue la relación con negocio y tecnología en inditex",
    "como fue la relacion con negocio y tecnologia en inditex",
    "cómo colaboraste con negocio y desarrollo",
    "como colaboraste con negocio y desarrollo",
    "validar viabilidad de la funcionalidad",
    "asegurar integración en la plataforma existente",
    "alinear objetivos comerciales con experiencia",
    "experiencia fluida y escalable",
  ],
  searchText:
    "Case study Inditex. Colaboración con negocio y tecnología. Trabajo colaborativo con negocio y desarrollo. Validar viabilidad de nueva funcionalidad. Asegurar integración en plataforma existente. Alinear objetivos comerciales con experiencia fluida y escalable.",
  followupIds: [
    "cs_inditex_decisiones_diseno",
    "cs_inditex_metodologia",
    "cs_inditex_metricas_impacto",
  ],
},

{
  id: "cs_inditex_metricas_impacto",
  locale: "es-ES",
  question: "¿Cuál fue el impacto de tu trabajo en Inditex?",
  answer:
    "La introducción de nuevos flujos de descubrimiento y la compra sobre vídeo sentó las bases de un estándar que hoy está ampliamente adoptado en el sector ecommerce. Estas mejoras contribuyeron a enriquecer la experiencia de usuario y a evolucionar los modelos de conversión digital en retail.",
  match: [
    "cuál fue el impacto en inditex",
    "cual fue el impacto en inditex",
    "qué impacto tuvo la compra sobre vídeo",
    "que impacto tuvo la compra sobre video",
    "bases de un estándar en ecommerce",
    "bases de un estandar en ecommerce",
    "mejoras en experiencia de usuario",
    "evolución de modelos de conversión",
    "evolucion de modelos de conversion",
    "retail digital",
  ],
  searchText:
    "Case study Inditex. Impacto. Nuevos flujos de descubrimiento. Compra sobre vídeo como base de un estándar hoy adoptado en ecommerce. Enriquecer experiencia de usuario. Evolucionar modelos de conversión digital en retail.",
  followupIds: [
    "cs_inditex_decisiones_diseno",
    "cs_inditex_aprendizajes",
    "cs_inditex_overview",
  ],
},

{
  id: "cs_inditex_aprendizajes",
  locale: "es-ES",
  question: "¿Qué aprendiste en el proyecto de Inditex?",
  answer:
    "Este proyecto reforzó la importancia de explorar nuevos formatos y canales de interacción para mejorar la experiencia de compra, y de anticiparse a tendencias emergentes. También evidenció cómo pequeñas innovaciones bien integradas pueden convertirse en estándares de la industria cuando están alineadas con el comportamiento real de los usuarios.",
  match: [
    "qué aprendiste en inditex",
    "que aprendiste en inditex",
    "aprendizajes del proyecto de inditex",
    "lecciones aprendidas inditex ecommerce",
    "explorar nuevos formatos y canales",
    "anticiparse a tendencias emergentes",
    "innovaciones pequeñas bien integradas",
    "convertirse en estándares de industria",
    "comportamiento real de los usuarios",
  ],
  searchText:
    "Case study Inditex. Aprendizajes. Explorar nuevos formatos y canales de interacción para mejorar experiencia de compra. Anticipar tendencias emergentes. Innovaciones pequeñas bien integradas pueden convertirse en estándares si están alineadas con comportamiento real de usuarios.",
  followupIds: [
    "cs_inditex_metricas_impacto",
    "cs_inditex_contexto_problema",
    "cs_inditex_overview",
  ],
},


  /* =========================
   03) CASOS — ROCHE (mySugr) (v2)
   ========================= */

/** OVERVIEW (nuevo) */
{
  id: "cs_roche_overview",
  locale: "es-ES",
  question: "¿Qué hiciste en Roche (mySugr)?",
  answer:
    "Participé como Product Designer en la evolución de mySugr, una app de salud digital para personas con diabetes con millones de usuarios y un contexto médico especialmente sensible. Mi foco estuvo en mejorar la arquitectura de la información y optimizar funcionalidades clave sin comprometer simplicidad, adherencia ni confianza. El trabajo se apoyó en análisis de uso real, evaluación de flujos críticos y un enfoque fuerte de accesibilidad y usabilidad (especialmente por limitaciones visuales habituales), colaborando con producto, desarrollo y stakeholders del ámbito sanitario para asegurar viabilidad y coherencia con estándares del sector.",
  match: [
    "qué hiciste en roche",
    "que hiciste en roche",
    "qué hiciste en mysugr",
    "que hiciste en mysugr",
    "cuéntame tu proyecto en roche",
    "cuentame tu proyecto en roche",
    "en qué consistió tu trabajo en mysugr",
    "en que consistio tu trabajo en mysugr",
    "proyecto de salud digital en roche",
    "producto de diabetes mysugr",
    "app de diabetes mysugr",
  ],
  searchText:
    "Case study Roche mySugr. Overview del proyecto. App de salud digital para diabetes con millones de usuarios. Contexto médico sensible. Evolución del producto manteniendo simplicidad, adherencia y confianza. Mejora de arquitectura de información y funcionalidades clave. Enfoque de accesibilidad y usabilidad (limitaciones visuales). Análisis de uso real, flujos críticos, heurística. Colaboración con producto, desarrollo y stakeholders de salud. Viabilidad técnica y estándares del sector.",
  followupIds: [
    "cs_roche_contexto_problema",
    "cs_roche_decisiones_diseno",
    "cs_roche_colaboracion",
  ],
},

{
  id: "cs_roche_contexto_problema",
  locale: "es-ES",
  question: "¿Qué problema detectaste en Roche (mySugr)?",
  answer:
    "mySugr es una aplicación de salud digital orientada a personas con diabetes, con millones de usuarios activos y un alto nivel de responsabilidad sobre la experiencia, la claridad de la información y el uso diario. El reto era evolucionar la app para seguir siendo relevante y usable a gran escala, mejorando la arquitectura de la información y las funcionalidades clave sin comprometer simplicidad, adherencia ni confianza en un contexto médico sensible.",
  match: [
    "qué problema detectaste en roche",
    "que problema detectaste en roche",
    "qué problema detectaste en mysugr",
    "que problema detectaste en mysugr",
    "reto de evolucionar la app",
    "mejorar arquitectura de información",
    "mejorar arquitectura de la informacion",
    "mantener simplicidad adherencia y confianza",
    "contexto médico sensible",
    "contexto medico sensible",
    "salud digital diabetes",
  ],
  searchText:
    "Case study Roche mySugr. Contexto y problema. App de salud digital para diabetes con millones de usuarios. Alta responsabilidad sobre claridad de información y uso diario. Reto: evolucionar la app a gran escala. Mejorar arquitectura de información y funcionalidades clave sin comprometer simplicidad, adherencia ni confianza en contexto médico sensible.",
  followupIds: [
    "cs_roche_research_discovery",
    "cs_roche_metodologia",
    "cs_roche_overview",
  ],
},

{
  id: "cs_roche_rol_responsabilidades",
  locale: "es-ES",
  question: "¿Cuál fue tu rol y responsabilidades en Roche (mySugr)?",
  answer:
    "Participé como Product Designer en el rediseño de la aplicación mySugr, trabajando en la mejora de la arquitectura de la información, la definición y optimización de funcionalidades clave y la evolución de la experiencia de usuario para pacientes con diabetes, con foco en claridad, consistencia y uso recurrente.",
  match: [
    "cuál fue tu rol en roche",
    "cual fue tu rol en roche",
    "cuál fue tu rol en mysugr",
    "cual fue tu rol en mysugr",
    "responsabilidades en mysugr",
    "product designer en mysugr",
    "mejora de arquitectura de la información",
    "mejora de arquitectura de la informacion",
    "optimización de funcionalidades clave",
    "claridad consistencia uso recurrente",
  ],
  searchText:
    "Case study Roche mySugr. Rol y responsabilidades. Product Designer. Rediseño/evolución de la app. Mejora de arquitectura de información. Definición y optimización de funcionalidades clave. Evolución de experiencia de usuario para pacientes con diabetes. Foco en claridad, consistencia y uso recurrente.",
  followupIds: [
    "cs_roche_decisiones_diseno",
    "cs_roche_research_discovery",
    "cs_roche_overview",
  ],
},

{
  id: "cs_roche_metodologia",
  locale: "es-ES",
  question: "¿Qué metodología empleaste en el proyecto de Roche (mySugr)?",
  answer:
    "Se siguió una metodología de diseño centrado en el usuario con especial foco en accesibilidad y usabilidad en salud digital. El proceso combinó análisis heurístico, evaluación de flujos críticos, revisión de buenas prácticas del sector sanitario y validación continua, priorizando decisiones basadas en impacto real y seguridad del paciente.",
  match: [
    "qué metodología empleaste en roche",
    "que metodología empleaste en roche",
    "qué metodología empleaste en mysugr",
    "que metodología empleaste en mysugr",
    "diseño centrado en el usuario salud digital",
    "accesibilidad y usabilidad",
    "análisis heurístico",
    "analisis heuristico",
    "evaluación de flujos críticos",
    "evaluacion de flujos criticos",
    "validación continua",
    "validacion continua",
    "seguridad del paciente",
  ],
  searchText:
    "Case study Roche mySugr. Metodología. Diseño centrado en el usuario. Foco en accesibilidad y usabilidad en salud digital. Análisis heurístico. Evaluación de flujos críticos. Revisión de buenas prácticas del sector sanitario. Validación continua. Decisiones basadas en impacto real y seguridad del paciente.",
  followupIds: [
    "cs_roche_research_discovery",
    "cs_roche_decisiones_diseno",
    "cs_roche_colaboracion",
  ],
},

{
  id: "cs_roche_research_discovery",
  locale: "es-ES",
  question: "¿Cómo llevaste a cabo la fase de investigación en Roche (mySugr)?",
  answer:
    " El proceso de discovery incluyó el análisis del uso real de la aplicación por parte de los pacientes, la identificación de fricciones en flujos críticos y un análisis heurístico de la app para detectar en qué puntos no estaba respondiendo adecuadamente a las necesidades y expectativas de los usuarios. Este trabajo se complementó con la revisión de buenas prácticas en productos de salud digital y con criterios de usabilidad específicos para aplicaciones médicas de uso frecuente, permitiendo fundamentar las decisiones de diseño en evidencia y no solo en intuición.",
  match: [
    "cómo hiciste la investigación en roche",
    "como hiciste la investigacion en roche",
    "cómo hiciste el discovery en mysugr",
    "como hiciste el discovery en mysugr",
    "análisis de uso real de pacientes",
    "analisis de uso real de pacientes",
    "fricciones en flujos críticos",
    "fricciones en flujos criticos",
    "análisis heurístico de la app",
    "analisis heuristico de la app",
    "buenas prácticas salud digital",
    "buenas practicas salud digital",
    "criterios de usabilidad médica",
    "criterios de usabilidad medica",
    "decisiones basadas en evidencia",
  ],
  searchText:
    "Case study Roche mySugr. Research y discovery. Análisis de uso real por pacientes. Identificación de fricciones en flujos críticos. Análisis heurístico. Revisión de buenas prácticas en salud digital. Criterios de usabilidad específicos para apps médicas de uso frecuente. Fundamentar decisiones en evidencia vs intuición.",
  followupIds: [
    "cs_roche_contexto_problema",
    "cs_roche_decisiones_diseno",
    "cs_roche_metodologia",
  ],
},

{
  id: "cs_roche_decisiones_diseno",
  locale: "es-ES",
  question: "¿Qué decisiones de diseño tomaste en Roche (mySugr)?",
  answer:
    "Las decisiones de diseño estuvieron fuertemente condicionadas por criterios de accesibilidad propios del contexto sanitario. Se tuvieron en cuenta patologías habituales en pacientes diabéticos como problemas de visión, daltonismo, glaucoma y otras afecciones visuales, lo que influyó directamente en la selección de colores y contrastes. Se realizaron tests de paletas cromáticas para distintos tipos de limitaciones visuales y se evitó depender exclusivamente del color como código informativo, incorporando siempre información textual y apoyos visuales complementarios. Estas decisiones permitieron mejorar la comprensión, reducir errores y garantizar una experiencia más inclusiva y segura para todos los usuarios",
  match: [
    "qué decisiones de diseño tomaste en roche",
    "que decisiones de diseño tomaste en roche",
    "qué decisiones de diseño tomaste en mysugr",
    "que decisiones de diseño tomaste en mysugr",
    "accesibilidad en salud digital",
    "problemas de visión daltonismo glaucoma",
    "problemas de vision daltonismo glaucoma",
    "colores y contrastes",
    "tests de paletas cromáticas",
    "tests de paletas cromaticas",
    "no depender del color",
    "información textual y apoyos visuales",
    "informacion textual y apoyos visuales",
    "reducir errores y mejorar comprensión",
    "reducir errores y mejorar comprension",
  ],
  searchText:
    "Case study Roche mySugr. Decisiones de diseño. Accesibilidad en contexto sanitario. Patologías visuales en pacientes diabéticos: problemas de visión, daltonismo, glaucoma. Selección de colores y contrastes. Tests de paletas para limitaciones visuales. Evitar depender solo del color como código informativo. Información textual y apoyos visuales complementarios. Mejorar comprensión, reducir errores, experiencia inclusiva y segura.",
  followupIds: [
    "cs_roche_metricas_impacto",
    "cs_roche_aprendizajes",
    "cs_roche_overview",
  ],
},

{
  id: "cs_roche_colaboracion",
  locale: "es-ES",
  question: "¿Cómo fue la relación con negocio y tecnología en Roche (mySugr)?",
  answer:
    "Trabajé de forma colaborativa con equipos de producto, desarrollo y stakeholders del ámbito de la salud para asegurar que las decisiones de diseño fueran viables técnicamente, coherentes con el roadmap del producto y alineadas con estándares y necesidades del sector sanitario.",
  match: [
    "cómo fue la relación con negocio y tecnología en roche",
    "como fue la relacion con negocio y tecnologia en roche",
    "cómo colaboraste con producto y desarrollo en mysugr",
    "como colaboraste con producto y desarrollo en mysugr",
    "stakeholders del ámbito de la salud",
    "stakeholders del ambito de la salud",
    "viabilidad técnica",
    "viabilidad tecnica",
    "coherencia con el roadmap",
    "estándares del sector sanitario",
    "estandares del sector sanitario",
  ],
  searchText:
    "Case study Roche mySugr. Colaboración con negocio y tecnología. Trabajo con equipos de producto, desarrollo y stakeholders de salud. Asegurar viabilidad técnica. Coherencia con roadmap. Alineación con estándares y necesidades del sector sanitario.",
  followupIds: [
    "cs_roche_decisiones_diseno",
    "cs_roche_metodologia",
    "cs_roche_metricas_impacto",
  ],
},

{
  id: "cs_roche_metricas_impacto",
  locale: "es-ES",
  question: "¿Cuál fue el impacto de tu trabajo en Roche (mySugr)?",
  answer:
    "La aplicación superó los 5 millones de descargas y fue reconocida en múltiples ocasiones por su calidad y aportación al sector de la salud digital. mySugr fue elegida tres veces como la mejor aplicación de diabetes por Healthline y destacada en medios como Forbes, TechCrunch y The Washington Post, consolidándose como una referencia en su categoría.",
  match: [
    "cuál fue el impacto en roche",
    "cual fue el impacto en roche",
    "cuál fue el impacto en mysugr",
    "cual fue el impacto en mysugr",
    "5 millones de descargas",
    "cinco millones de descargas",
    "healthline mejor app de diabetes",
    "forbes techcrunch the washington post",
    "reconocida por su calidad salud digital",
    "referencia en su categoría",
    "referencia en su categoria",
  ],
  searchText:
    "Case study Roche mySugr. Impacto. Más de 5 millones de descargas. Reconocimientos por calidad en salud digital. Elegida 3 veces como mejor app de diabetes por Healthline. Destacada en Forbes, TechCrunch y The Washington Post. Referente en su categoría.",
  followupIds: [
    "cs_roche_decisiones_diseno",
    "cs_roche_aprendizajes",
    "cs_roche_overview",
  ],
},

{
  id: "cs_roche_aprendizajes",
  locale: "es-ES",
  question: "¿Qué aprendiste en el proyecto de Roche (mySugr)?",
  answer:
    "Este proyecto reforzó la importancia de diseñar con extrema empatía y responsabilidad en productos de salud, donde la claridad, la confianza y la facilidad de uso son críticas. También consolidó la necesidad de tomar decisiones de arquitectura y funcionalidad basadas en uso real, especialmente en productos con impacto directo en la vida diaria de las personas.",
  match: [
    "qué aprendiste en roche",
    "que aprendiste en roche",
    "qué aprendiste en mysugr",
    "que aprendiste en mysugr",
    "empatía y responsabilidad en salud",
    "empatia y responsabilidad en salud",
    "claridad confianza y facilidad de uso",
    "decisiones basadas en uso real",
    "impacto en la vida diaria",
    "productos médicos sensibles",
    "productos medicos sensibles",
  ],
  searchText:
    "Case study Roche mySugr. Aprendizajes. Empatía y responsabilidad en productos de salud. Claridad, confianza y facilidad de uso como factores críticos. Decisiones de arquitectura y funcionalidad basadas en uso real. Impacto directo en la vida diaria de las personas.",
  followupIds: [
    "cs_roche_metricas_impacto",
    "cs_roche_contexto_problema",
    "cs_roche_overview",
  ],
},


  /* =========================
   04) LIDERAZGO Y SOFT SKILLS
========================= */


{
  id: "ls_vision_general",
  locale: "es-ES",
  question: "¿Cómo enfocas el liderazgo en diseño de producto?",
  answer:
    "Entiendo el liderazgo en diseño como la capacidad de crear contexto para que los equipos puedan pensar mejor y tomar decisiones informadas. Para mí, liderar no es imponer soluciones, sino alinear personas, producto y negocio, generar confianza, dar claridad y asumir responsabilidad compartida. Mi foco está en habilitar impacto real, no en protagonismo individual.",
  match: [
    "¿cómo enfocas el liderazgo en diseño de producto?",
    "como enfocas el liderazgo en diseño de producto",
    "liderazgo en diseño de producto",
    "cómo lideras",
    "como lideras",
    "liderazgo en diseño",
    "liderazgo",
    "cómo lideras",
    "estilo de liderazgo",
    "gestión de equipos",
  ],
  searchText:
    "Liderazgo en diseño de producto. Liderar creando contexto, alineando personas, producto y negocio. Confianza, claridad, responsabilidad compartida. Decisiones informadas y foco en impacto real.",
  followupIds: [
    "ls_contexto_repsol",
    "ls_contexto_fcb",
    "ls_contexto_cofares",
  ],
},


{
  id: "ls_contexto_repsol",
  locale: "es-ES",
  question: "¿Cómo ejerciste liderazgo en el proyecto de Repsol?",
  answer: "En Repsol ejercí un liderazgo orientado a la claridad y a la construcción de consenso en un entorno corporativo complejo y de gran escala. Mi foco estuvo en aportar estructura y dirección en un proyecto con muchos stakeholders, ayudando a alinear a negocio, diseño y tecnología alrededor de una visión común del producto. Lideré desde la facilitación, utilizando workshops y research como herramientas clave para generar entendimiento compartido y tomar decisiones informadas. Mi rol fue reducir ambigüedad, priorizar con criterio y traducir necesidades estratégicas en soluciones claras y accionables, asegurando que el equipo avanzara con foco y coherencia en un contexto de alta complejidad organizativa.",
  match: ["Repsol", "liderazgo", "stakeholders", "workshops", "research", "consenso"],
  searchText:
    "Liderazgo en Repsol. Liderazgo en entorno corporativo complejo. Alinear negocio diseño y tecnología. Workshops, research, consenso, reducción de ambigüedad.",
  followupIds: [
    "ls_vision_general",
    "ls_stakeholders",
    "ls_decisiones_incertidumbre"
  ],
},

{
  id: "ls_contexto_fcb",
  locale: "es-ES",
  question: "¿Cómo ejerciste liderazgo en el proyecto del FC Barcelona?",
  answer: "En el FC Barcelona mi liderazgo estuvo muy ligado al impacto y a la toma de decisiones basada en evidencia. Actué como referente de diseño dentro de un entorno altamente orientado a negocio y resultados, impulsando una cultura de validación continua con usuarios y datos. Lideré el proceso ayudando al equipo a enfocarse en los problemas correctos, priorizar el flujo core y equilibrar necesidades de los socios con objetivos económicos del club. Mi estilo fue cercano y colaborativo, fomentando la confianza entre disciplinas y utilizando metodologías como Lean UX y Design Thinking para iterar rápido, aprender pronto y maximizar impacto en productos con millones de usuarios.",
  match: ["FC Barcelona", "liderazgo", "impacto", "datos", "usuarios", "Lean UX"],
  searchText:
    "Liderazgo en FC Barcelona. Decisiones basadas en evidencia, usuarios y datos. Priorizar flujo core. Lean UX y Design Thinking en productos de alto impacto.",
  followupIds: [
    "ls_vision_general",
    "ls_comunicacion_facilitacion",
    "ls_decisiones_incertidumbre"
  ],
},

{
  id: "ls_contexto_cofares",
  locale: "es-ES",
  question: "¿Cómo ejerciste liderazgo en el proyecto de Cofares?",
  answer: "En Cofares ejercí un liderazgo técnico y estructural, enfocado en la creación de un sistema de diseño sostenible y escalable. Asumí un rol claro de referente en design systems y UX engineering, marcando estándares, definiendo procesos y acompañando a los equipos en la adopción del sistema. Mi liderazgo se basó en la colaboración estrecha con desarrollo, trabajando bajo metodologías ágiles y promoviendo una cultura de responsabilidad compartida sobre la calidad del producto. Más que dirigir desde la jerarquía, lideré desde el conocimiento y el ejemplo, construyendo una infraestructura que permitió a los equipos trabajar con mayor autonomía, eficiencia y coherencia a largo plazo.",
  match: ["Cofares", "liderazgo técnico", "design systems", "UX engineering", "estándares"],
  searchText:
    "Liderazgo en Cofares. Liderazgo técnico y estructural. Design systems, UX engineering, estándares, procesos y adopción. Colaboración con desarrollo.",
  followupIds: [
    "ls_vision_general",
    "ls_mentoring",
    "ls_comunicacion_facilitacion"
  ],
},

{
  id: "ls_stakeholders",
  locale: "es-ES",
  question: "¿Cómo gestionas stakeholders en proyectos complejos?",
  answer: "Gestiono a los stakeholders desde la claridad, la escucha activa y la alineación temprana. Para mí, la clave está en entender primero sus objetivos, preocupaciones y métricas de éxito, y traducirlas a un lenguaje común que conecte negocio, diseño y tecnología. Dedico tiempo a compartir contexto, explicar decisiones y hacer visible el porqué detrás de cada propuesta, evitando sorpresas y malentendidos a lo largo del proceso.Trabajo con los stakeholders de forma colaborativa, involucrándolos en momentos clave como workshops, sesiones de discovery o validaciones, para que formen parte de la toma de decisiones y no solo del resultado final. Al mismo tiempo, soy claro a la hora de marcar límites, priorizar y tomar decisiones cuando hay conflicto de intereses, siempre apoyándome en datos, research y objetivos de producto. Mi enfoque busca generar confianza, reducir fricción y convertir a los stakeholders en aliados activos del proceso, no en simples validadores finales.",
  match: ["stakeholders", "gestión", "alineación", "workshops", "discovery", "priorización"],
  searchText:
    "Gestión de stakeholders en proyectos complejos. Alineación temprana, escucha activa, compartir contexto, explicar decisiones, workshops, discovery y priorización con datos.",
  followupIds: [
    "ls_vision_general",
    "ls_comunicacion_facilitacion",
    "ls_decisiones_incertidumbre"
  ],
},

{
  id: "ls_mentoring",
  locale: "es-ES",
  question: "¿Cómo trabajas el mentoring y crecimiento de equipos?",
  answer: "Entiendo el mentoring y el crecimiento de equipos como una inversión a largo plazo, no como una tarea puntual. Mi enfoque se basa en acompañar a cada persona según su nivel de madurez, contexto y objetivos, combinando guía, autonomía y feedback continuo. Me esfuerzo por crear un entorno seguro donde preguntar, equivocarse y aprender forme parte natural del trabajo diario. Practico un mentoring cercano y práctico, liderando desde el ejemplo y compartiendo criterio en la toma de decisiones, más allá de enseñar herramientas o procesos. Ayudo a los diseñadores a desarrollar pensamiento crítico, a entender el impacto de su trabajo en el producto y el negocio, y a ganar confianza para asumir responsabilidades progresivamente. Fomento conversaciones honestas, revisiones constructivas y objetivos claros de crecimiento, tanto a nivel individual como de equipo. A nivel de equipo, priorizo la construcción de bases sólidas: procesos claros, estándares compartidos y una cultura de calidad que permita crecer sin perder coherencia. Creo en equipos autónomos, responsables y alineados, donde el crecimiento individual se traduce en productos mejores y organizaciones más fuertes.",
  match: ["mentoring", "crecimiento", "feedback", "autonomía", "pensamiento crítico"],
  searchText:
    "Mentoring y crecimiento de equipos. Acompañamiento, autonomía, feedback continuo, pensamiento crítico, objetivos claros y cultura de calidad.",
  followupIds: [
    "ls_vision_general",
    "ls_contexto_cofares",
    "ls_comunicacion_facilitacion"
  ],
},

{
  id: "ls_comunicacion_facilitacion",
  locale: "es-ES",
  question: "¿Cómo facilitas la toma de decisiones en equipos multidisciplinares?",
  answer: "Concibo la comunicación y la facilitación como herramientas clave para reducir complejidad y generar alineación. Mi forma de comunicar se basa en la claridad, la síntesis y la adaptación al interlocutor, asegurándome de que cada persona tenga el contexto necesario para tomar decisiones informadas. Evito el exceso de jerga y priorizo explicar el porqué de las decisiones, no solo el qué o el cómo.En la facilitación, mi rol es crear espacios donde el equipo pueda pensar mejor de forma colectiva. Diseño y conduzco workshops con objetivos claros, dinámicas adecuadas al momento del proyecto y resultados accionables, evitando sesiones ambiguas o poco productivas. Me enfoco en dar voz a todos los perfiles, equilibrar opiniones y transformar la discusión en decisiones concretas. Para mí, facilitar no es solo moderar conversaciones, sino ayudar a que equipos y stakeholders avancen con foco, confianza y sentido de dirección",
  match: ["comunicación", "facilitación", "workshops", "decisiones", "equipos multidisciplinares"],
  searchText:
    "Comunicación y facilitación en equipos multidisciplinares. Claridad, síntesis, workshops efectivos, decisiones accionables y alineación.",
  followupIds: [
    "ls_vision_general",
    "ls_stakeholders",
    "ls_decisiones_incertidumbre"
  ],
},

{
  id: "ls_decisiones_incertidumbre",
  locale: "es-ES",
  question: "¿Cómo tomas decisiones en contextos de alta incertidumbre?",
  answer: "La toma de decisiones en contextos de incertidumbre forma parte central de mi forma de trabajar. Asumo que no siempre se dispone de toda la información necesaria y que esperar certeza absoluta suele bloquear el avance. Por eso, mi enfoque se basa en formular hipótesis claras, priorizar el aprendizaje y tomar decisiones progresivas apoyadas en la mejor evidencia disponible en cada momento. Utilizo research, datos y experiencia para reducir incertidumbre, pero también acepto el riesgo cuando es necesario, siempre de forma consciente y controlada. Prefiero decisiones reversibles, iteraciones cortas y validaciones tempranas que permitan corregir el rumbo rápido, frente a grandes apuestas cerradas. En este contexto, mi rol como líder es aportar criterio, dar dirección cuando hace falta y generar confianza en el equipo para avanzar incluso cuando no todo está definido, manteniendo el foco en impacto real y objetivos de producto.",
  match: ["incertidumbre", "decisiones", "hipótesis", "aprendizaje", "validación"],
  searchText:
    "Toma de decisiones en incertidumbre. Hipótesis, aprendizaje, evidencia disponible, decisiones reversibles, iteraciones cortas y validaciones tempranas.",
  followupIds: [
    "ls_vision_general",
    "ls_stakeholders",
    "ls_comunicacion_facilitacion"
  ],
},


 /* =========================
   05) METODOLOGÍAS
========================= */

{
  id: "methods_overview",
  locale: "es-ES",
  question: "¿Qué metodologías utilizas en tu trabajo?",
  answer:
    "Mi metodología de trabajo no es rígida. Adapto las herramientas según el tipo de problema, el contexto del producto y la fase en la que nos encontremos. En mi día a día recurro con frecuencia a Design Thinking, Lean UX y Atomic Design, pero siempre desde una mirada crítica: entendiendo cuándo aportan valor y cuándo no.",
  match: [
    "¿qué metodologías utilizas?",
    "que metodologias utilizas",
    "metodologías utilizas",
    "metodologias utilizas",
    "tu metodología",
    "tu metodologia",
    "metodologia de trabajo",
    "como trabajas metodologicamente",
  ],
  searchText:
    "Metodologías de trabajo en diseño de producto. Uso de Design Thinking, Lean UX y Atomic Design según contexto, tipo de problema y fase del producto. Enfoque flexible, no dogmático, orientado a aportar valor real.",
  followupIds: [
   "mt_dt_cuando_usarlo",
    "mt_lean_cuando_usarlo",
     "mt_atomic_cuando_lo_uso",
  ],
},






{
  id: "mt_dt_cuando_usarlo",
  locale: "es-ES",
  question: "¿Cuándo utilizas Design Thinking?",
  answer: "Utilizo Design Thinking principalmente en fases tempranas, cuando el problema aún no está bien definido y es necesario entender en profundidad a los usuarios, el contexto y las verdaderas necesidades detrás de una demanda inicial. Es especialmente útil en escenarios de alta ambigüedad, cuando hay muchos stakeholders, hipótesis contradictorias o falta de alineación sobre qué problema resolver. En estos casos, Design Thinking me permite estructurar el discovery, generar empatía, alinear equipos y tomar decisiones basadas en insights reales y compartidos.",
  match: [
    "design thinking",
    "cuando utilizas design thinking",
    "cuándo utilizas design thinking",
    "fases tempranas",
    "discovery",
    "alta ambigüedad",
    "alineación",
    "alinear equipos",
    "insights"
  ],
  searchText:
    "Metodologías. Design Thinking: cuándo usarlo. Fases tempranas, discovery, problema no definido, alta ambigüedad, alineación entre stakeholders, decisiones basadas en insights.",
  followupIds: [
    "mt_dt_cuando_no",
    "mt_lean_cuando_usarlo",
    "mt_atomic_cuando_lo_uso"
  ],
},

{
  id: "mt_dt_cuando_no",
  locale: "es-ES",
  question: "¿Cuándo decides no utilizar Design Thinking?",
  answer: "No recurro a Design Thinking cuando el problema ya está claro, las métricas están bien definidas o el producto se encuentra en una fase de optimización y evolución. En esos contextos, prefiero enfoques más ágiles y orientados a ejecución y aprendizaje continuo, donde iterar rápido, medir y ajustar aporta más valor que volver a fases extensas de exploración. Para mí, Design Thinking no es un fin en sí mismo, sino una herramienta que debe usarse con criterio, solo cuando el contexto lo requiere.",
  match: [
    "design thinking",
    "cuando no utilizas design thinking",
    "cuándo no utilizas design thinking",
    "no usar design thinking",
    "optimización",
    "evolución",
    "métricas definidas",
    "iterar rápido"
  ],
  searchText:
    "Metodologías. Design Thinking: cuándo no usarlo. Problema claro, métricas definidas, fase de optimización/evolución. Mejor iterar, medir y ajustar con enfoques ágiles.",
  followupIds: [
    "mt_dt_cuando_usarlo",
    "mt_lean_cuando_usarlo",
    "mt_lean_cuando_no"
  ],
},

{
  id: "mt_lean_cuando_usarlo",
  locale: "es-ES",
  question: "¿Cuándo utilizas Lean UX?",
  answer: "Lean UX es la metodología que utilizo cuando el foco está en aprender rápido y reducir riesgo mediante experimentación continua. La aplico especialmente en productos digitales en evolución, donde existen hipótesis claras que necesitan validarse con usuarios reales sin depender de procesos largos o documentación excesiva. Lean UX me permite avanzar en ciclos cortos, lanzar versiones incrementales y ajustar decisiones en función de evidencia y feedback constante.",
  match: [
    "lean ux",
    "cuando utilizas lean ux",
    "cuándo utilizas lean ux",
    "aprender rápido",
    "experimentación",
    "validar hipótesis",
    "ciclos cortos",
    "feedback constante"
  ],
  searchText:
    "Metodologías. Lean UX: cuándo usarlo. Aprendizaje rápido, experimentación continua, validar hipótesis con usuarios reales, ciclos cortos, iteración basada en evidencia y feedback.",
  followupIds: [
    "mt_lean_cuando_no",
    "mt_dt_cuando_usarlo",
    "mt_atomic_cuando_lo_uso"
  ],
},

{
  id: "mt_lean_cuando_no",
  locale: "es-ES",
  question: "¿Cuándo decides no utilizar Lean UX?",
  answer: "No utilizo Lean UX cuando el contexto requiere estabilidad, alta previsibilidad o cumplimiento estricto de requisitos, como en productos muy regulados, sistemas críticos o entornos donde los cambios frecuentes pueden generar riesgo operativo o legal. En estos casos, es más adecuado trabajar con procesos más estructurados, decisiones bien cerradas desde el inicio y validaciones formales antes de pasar a ejecución. Tampoco recurro a Lean UX cuando el problema ya está completamente definido y la solución es conocida, o cuando el foco está en escalar y mantener un sistema existente sin introducir variaciones significativas. En estos escenarios, la experimentación continua aporta poco valor y puede generar ruido o ineficiencia. Para mí, Lean UX es una herramienta potente, pero debe usarse con criterio y solo cuando el contexto permite y necesita aprendizaje rápido.",
  match: [
    "lean ux",
    "cuando no utilizas lean ux",
    "cuándo no utilizas lean ux",
    "no usar lean ux",
    "regulado",
    "sistemas críticos",
    "estabilidad",
    "previsibilidad",
    "requisitos"
  ],
  searchText:
    "Metodologías. Lean UX: cuándo no usarlo. Entornos regulados o críticos, necesidad de estabilidad y previsibilidad, requisitos estrictos, riesgo operativo/legal. Mantenimiento sin variaciones o solución conocida.",
  followupIds: [
    "mt_lean_cuando_usarlo",
    "mt_dt_cuando_no",
    "mt_atomic_cuando_lo_uso"
  ],
},

{
  id: "mt_atomic_cuando_lo_uso",
  locale: "es-ES",
  question: "¿Cuándo utilizas Atomic Design?",
  answer: "Utilizo Atomic Design cuando necesito construir o escalar sistemas de diseño de forma consistente, modular y sostenible en el tiempo. Es especialmente útil en organizaciones con múltiples productos, equipos o tecnologías, donde la coherencia y la reutilización son clave para reducir deuda de diseño y desarrollo. Lo aplico cuando el objetivo no es solo diseñar interfaces, sino crear una infraestructura que permita a los equipos trabajar de manera más eficiente y alineada.",
  match: [
    "atomic design",
    "cuando utilizas atomic design",
    "cuándo utilizas atomic design",
    "sistemas de diseño",
    "modular",
    "sostenible",
    "reutilización",
    "deuda de diseño",
    "infraestructura"
  ],
  searchText:
    "Metodologías. Atomic Design: cuándo usarlo. Construir o escalar design systems consistentes, modulares y sostenibles. Coherencia y reutilización en múltiples productos, equipos o tecnologías.",
  followupIds: [
    "mt_atomic_como_lo_uso",
    "mt_lean_cuando_usarlo",
    "mt_dt_cuando_usarlo"
  ],
},

{
  id: "mt_atomic_como_lo_uso",
  locale: "es-ES",
  question: "¿Cómo aplicas Atomic Design en proyectos reales?",
  answer: "En la práctica, uso Atomic Design como marco estructural, no como una regla rígida. Empiezo definiendo foundations sólidas (colores, tipografía, espaciado, tokens), continúo con componentes bien abstraídos y documentados, y establezco patrones y composiciones que reflejan casos de uso reales del producto. Este enfoque me permite mantener consistencia visual y funcional, facilitar la colaboración con desarrollo y asegurar que el sistema pueda evolucionar sin romperse a medida que crece el ecosistema digital.",
  match: [
    "atomic design",
    "como aplicas atomic design",
    "cómo aplicas atomic design",
    "foundations",
    "tokens",
    "componentes",
    "patrones",
    "documentación",
    "casos de uso"
  ],
  searchText:
    "Metodologías. Atomic Design: cómo aplicarlo. Foundations (colores, tipografía, espaciado, tokens), componentes abstraídos y documentados, patrones y composiciones basadas en casos reales. Consistencia y colaboración con desarrollo.",
  followupIds: [
    "mt_atomic_cuando_lo_uso",
    "mt_lean_cuando_usarlo",
    "mt_dt_cuando_no"
  ],
},


  /* =========================
   06) PROCESO END-TO-END
========================= */

{
  id: "process_design_overview",
  locale: "es-ES",
  question: "¿Cómo es tu proceso de diseño?",
  answer:
    "Mi proceso de diseño consiste en un enfoque iterativo y end-to-end, orientado a resolver problemas reales de forma viable y con impacto.\n\n" +
    "• Entendimiento: Profundizo en el espacio del problema investigando a los usuarios, los objetivos de negocio y las limitaciones técnicas.\n" +
    "• Ideación: Genero soluciones potenciales basadas en los hallazgos e insights obtenidos durante la fase de investigación.\n" +
    "• Prototipado: Creo prototipos rápidos para visualizar ideas y testearlas de forma temprana con usuarios y stakeholders.\n" +
    "• Validación: Recopilo feedback de los usuarios para identificar qué funciona, qué no y qué debe ajustarse.\n" +
    "• Iteración: Refino los diseños basándome en los aprendizajes hasta equilibrar necesidades de usuario, objetivos de negocio y viabilidad técnica.\n\n" +
    "Mantengo las consideraciones de ingeniería presentes en todo momento para asegurar que todo lo que diseño sea factible de construir y sostenible en producción.",
  match: [
    "proceso de diseño",
    "tu proceso de diseño",
    "como es tu proceso",
    "cómo es tu proceso",
    "end to end",
    "end-to-end",
    "como trabajas",
    "cómo trabajas",
  ],
  searchText:
    "Proceso de diseño end to end. Entendimiento del problema mediante research de usuarios, negocio y tecnología. Ideación basada en insights. Prototipado rápido. Validación con usuarios. Iteración continua. Diseño factible, alineado con ingeniería y preparado para producción.",
  followupIds: [
    "methods_research_overview",
    "pd_definicion_framing",
    "pd_definicion_solving",
  ],
},




{
  id: "methods_research_overview",
  locale: "es-ES",
  question: "¿Cómo llevas a cabo la investigación en un proyecto?",
  answer:
    "La investigación es una fase clave en mis proyectos porque define la calidad de las decisiones posteriores. No la concibo como un entregable aislado, sino como una herramienta para reducir incertidumbre y alinear al equipo.\n\n" +
    "Mi enfoque combina distintas técnicas según el contexto:\n\n" +
    "• Entendimiento del contexto: Analizo objetivos de negocio, restricciones técnicas, métricas existentes y estado del producto para entender el problema desde todos los ángulos.\n" +
    "• Research cualitativo: Realizo entrevistas, sesiones de observación o shadowing para comprender comportamientos, motivaciones y fricciones reales de los usuarios.\n" +
    "• Research cuantitativo: Utilizo datos, analítica y métricas para validar patrones, dimensionar problemas y priorizar oportunidades.\n" +
    "• Síntesis e insights: Cruzo la información cualitativa y cuantitativa para identificar patrones claros y convertirlos en insights accionables.\n" +
    "• Alineación con el equipo: Comparto los aprendizajes con diseño, negocio y tecnología para asegurar una comprensión común antes de avanzar.\n\n" +
    "El objetivo final no es investigar por investigar, sino generar claridad suficiente para definir bien el problema, priorizar correctamente y tomar decisiones de diseño con mayor impacto y menor riesgo.",
  match: [
    "como llevas a cabo la investigacion",
    "cómo llevas a cabo la investigación",
    "investigacion en un proyecto",
    "research en un proyecto",
    "fase de investigacion",
    "discovery",
    "research",
  ],
  searchText:
    "Investigación en proyectos de diseño. Enfoque de research para reducir incertidumbre y alinear equipos. Análisis de contexto, research cualitativo y cuantitativo, síntesis de insights accionables y alineación con negocio y tecnología antes de definir el problema y diseñar soluciones.",
  followupIds: [
    "pd_discovery_qual",
    "pd_discovery_quant",
    "pd_definicion_framing",
  ],
},


{
  id: "pd_discovery_qual",
  locale: "es-ES",
  question: "¿Cómo realizas research cualitativo?",
  answer: "Recurro al research cualitativo cuando el objetivo es entender el porqué: motivaciones, comportamientos, fricciones y necesidades que no son evidentes en los datos. Es especialmente útil en problemas abiertos, en fases tempranas o cuando necesito generar empatía y contexto antes de tomar decisiones.",
  match: [
    "research cualitativo",
    "investigación cualitativa",
    "entrevistas",
    "motivaciones",
    "comportamientos",
    "fricciones",
    "empatía"
  ],
  searchText:
    "Proceso end-to-end. Discovery. Research cualitativo: entender el porqué, motivaciones, comportamientos, fricciones y necesidades. Fases tempranas, problemas abiertos, generar empatía y contexto.",
  followupIds: [
    "pd_discovery_quant",
    "pd_definicion_framing",
    "pd_ideacion_cocreacion"
  ],
},

{
  id: "pd_discovery_quant",
  locale: "es-ES",
  question: "¿Cómo realizas research cuantitativo?",
  answer: "Utilizo research cuantitativo cuando necesito dimensionar un problema, priorizar oportunidades o validar si un patrón se repite a escala. Me sirve para identificar dónde están los puntos críticos del funnel, comparar comportamientos entre segmentos o medir el impacto de cambios en el producto. Para mí, el verdadero valor está en combinar ambos enfoques: usar lo cualitativo para descubrir y formular hipótesis, y lo cuantitativo para validar, priorizar y tomar decisiones con mayor seguridad.",
  match: [
    "research cuantitativo",
    "investigación cuantitativa",
    "datos",
    "funnel",
    "segmentos",
    "impacto"
  ],
  searchText:
    "Proceso end-to-end. Discovery. Research cuantitativo: dimensionar problemas, priorizar oportunidades, analizar funnel, comparar segmentos y medir impacto. Complementar cualitativo.",
  followupIds: [
    "pd_definicion_framing",
    "pd_definicion_hipotesis",
    "pd_impacto_metricas"
  ],
},

{
  id: "pd_definicion_framing",
  locale: "es-ES",
  question: "¿Cómo defines correctamente un problema de diseño?",
  answer: "Gestiono el problem framing dedicando tiempo a entender y encuadrar correctamente el problema antes de pensar en soluciones. Sintetizo research cualitativo y cuantitativo, datos de negocio y contexto del producto para identificar patrones, cuestionar supuestos y alinear al equipo sobre qué problema merece realmente ser resuelto. Mi objetivo es asegurar que todos trabajemos sobre la causa y no sobre los síntomas, construyendo una definición clara, compartida y accionable del problema.",
  match: [
    "problem framing",
    "definir problema",
    "síntesis",
    "supuestos",
    "alinear equipo",
    "causa",
    "síntomas"
  ],
  searchText:
    "Proceso end-to-end. Definición. Problem framing: sintetizar research, datos de negocio y contexto, cuestionar supuestos, alinear equipo y definir problema accionable.",
  followupIds: [
    "pd_definicion_solving",
    "pd_definicion_hipotesis",
    "pd_ideacion_cocreacion"
  ],
},

{
  id: "pd_definicion_solving",
  locale: "es-ES",
  question: "¿Cómo abordas el problem solving en producto?",
  answer: "Una vez el problema está bien definido, abordo el problem solving desde un enfoque pragmático y orientado a impacto. Exploro distintas alternativas, evalúo cada opción en función de valor para el usuario, viabilidad técnica y alineación con objetivos de negocio, y priorizo soluciones que permitan avanzar de forma progresiva. No busco la solución perfecta desde el inicio, sino decisiones informadas que puedan evolucionar a través de iteraciones y aprendizaje continuo.",
  match: [
    "problem solving",
    "resolver problemas",
    "alternativas",
    "viabilidad",
    "negocio",
    "iteraciones"
  ],
  searchText:
    "Proceso end-to-end. Definición. Problem solving: explorar alternativas, evaluar valor usuario, viabilidad técnica y objetivos de negocio, priorizar soluciones progresivas.",
  followupIds: [
    "pd_definicion_hipotesis",
    "pd_ideacion_workshops",
    "pd_delivery_ux"
  ],
},

{
  id: "pd_definicion_hipotesis",
  locale: "es-ES",
  question: "¿Cómo defines y validas hipótesis?",
  answer: "Formulo hipótesis como una herramienta para reducir incertidumbre y guiar la toma de decisiones. Conecto cada posible solución con un resultado esperado en usuarios y negocio, definiendo criterios claros que permitan validar o refutar la hipótesis. De esta forma, las hipótesis se convierten en el hilo conductor entre el problema y la solución, ayudando al equipo a aprender rápido, ajustar el rumbo y mantener el foco en generar impacto real.",
  match: [
    "hipótesis",
    "definir hipótesis",
    "validar hipótesis",
    "reducir incertidumbre",
    "resultado esperado"
  ],
  searchText:
    "Proceso end-to-end. Definición. Hipótesis: reducir incertidumbre, conectar solución con resultados esperados, criterios de validación o refutación.",
  followupIds: [
    "pd_ideacion_cocreacion",
    "pd_ideacion_workshops",
    "pd_iteracion_testing"
  ],
},

{
  id: "pd_ideacion_cocreacion",
  locale: "es-ES",
  question: "¿Cómo trabajas la co-creación con equipos?",
  answer: "Utilizo la co-creación para involucrar activamente a los distintos perfiles del equipo en la generación de soluciones, aprovechando la diversidad de perspectivas de diseño, producto, tecnología y negocio. Mi enfoque se basa en crear un entorno seguro y estructurado donde las ideas se construyen de forma colectiva, partiendo de insights y problemas bien definidos. La co-creación me permite generar mayor alineación, compromiso y sentido de pertenencia sobre las decisiones tomadas.",
  match: [
    "co-creación",
    "cocreación",
    "equipos multidisciplinares",
    "alineación",
    "colaboración"
  ],
  searchText:
    "Proceso end-to-end. Ideación. Co-creación con equipos: involucrar perfiles, entorno seguro y estructurado, construir ideas desde insights, generar alineación y compromiso.",
  followupIds: [
    "pd_ideacion_workshops",
    "pd_delivery_ux",
    "pd_definicion_solving"
  ],
},

{
  id: "pd_ideacion_workshops",
  locale: "es-ES",
  question: "¿Cómo facilitas workshops de ideación?",
  answer: "Diseño y facilito workshops con objetivos claros y orientados a resultados concretos. Selecciono dinámicas adecuadas al momento del proyecto, como ideación guiada, sketching colaborativo, priorización por impacto y viabilidad o definición de flujos a alto nivel. Mi rol como facilitador es guiar la conversación, equilibrar las aportaciones del grupo y transformar la exploración en decisiones accionables que impulsen el avance del producto.",
  match: [
    "workshops",
    "facilitar workshops",
    "ideación",
    "priorización",
    "impacto",
    "viabilidad"
  ],
  searchText:
    "Proceso end-to-end. Ideación. Workshops: objetivos claros, dinámicas según fase, ideación guiada, sketching, priorización impacto/viabilidad y decisiones accionables.",
  followupIds: [
    "pd_delivery_ux",
    "pd_delivery_prototipado",
    "pd_definicion_hipotesis"
  ],
},

{
  id: "pd_delivery_ux",
  locale: "es-ES",
  question: "¿Cómo defines flujos y wireframes en UX?",
  answer: "En la fase de delivery empiezo consolidando la experiencia a nivel de UX, trabajando sobre wireframes y flujos que traduzcan las decisiones estratégicas en soluciones claras y usables. Me enfoco en asegurar coherencia, jerarquía de información y simplicidad, validando que los recorridos respondan a los problemas definidos y que funcionen correctamente en los distintos contextos y dispositivos antes de entrar en detalle visual.",
  match: [
    "wireframes",
    "flujos",
    "ux",
    "jerarquía",
    "simplicidad",
    "multidispositivo"
  ],
  searchText:
    "Proceso end-to-end. Delivery UX: wireframes y flujos, coherencia, jerarquía de información, simplicidad, validar recorridos y contextos antes de UI.",
  followupIds: [
    "pd_delivery_ui",
    "pd_delivery_prototipado",
    "pd_delivery_handoff"
  ],
},

{
  id: "pd_delivery_ui",
  locale: "es-ES",
  question: "¿Cómo trabajas la capa visual UI?",
  answer: "El diseño de interfaz lo abordo como una capa al servicio de la experiencia y del producto, no como un ejercicio estético aislado. Aplico sistemas de diseño, principios de consistencia y accesibilidad, cuidando que la interfaz refuerce la comprensión, la confianza y la identidad del producto. Busco soluciones visuales escalables y alineadas con el ecosistema existente.",
  match: [
    "ui",
    "diseño visual",
    "sistemas de diseño",
    "consistencia",
    "accesibilidad"
  ],
  searchText:
    "Proceso end-to-end. Delivery UI: interfaz al servicio del producto, sistemas de diseño, consistencia y accesibilidad, soluciones visuales escalables.",
  followupIds: [
    "pd_delivery_prototipado",
    "pd_delivery_handoff",
    "pd_iteracion_testing"
  ],
},

{
  id: "pd_delivery_prototipado",
  locale: "es-ES",
  question: "¿Cómo utilizas prototipos dentro del proceso?",
  answer: "Utilizo el prototipado como herramienta para validar decisiones, comunicar ideas y reducir ambigüedad. Ajusto el nivel de fidelidad según el objetivo: prototipos rápidos para validar flujos o conceptos, y prototipos de alta fidelidad para test con usuarios, alineamiento con stakeholders o validación técnica. El objetivo es aprender y asegurar que lo diseñado funciona antes de pasar a desarrollo. Puedo llevarlo a cabo tanto en figma, como en webflow como en framer.",
  match: [
    "prototipos",
    "prototipado",
    "figma",
    "webflow",
    "framer",
    "validación"
  ],
  searchText:
    "Proceso end-to-end. Delivery. Prototipado: validar decisiones, comunicar ideas, reducir ambigüedad, prototipos rápidos y alta fidelidad. Figma, Webflow y Framer.",
  followupIds: [
    "pd_iteracion_testing",
    "pd_delivery_handoff",
    "pd_impacto_metricas"
  ],
},

{
  id: "pd_delivery_handoff",
  locale: "es-ES",
  question: "¿Cómo realizas el handoff a desarrollo?",
  answer: "Concibo el handoff como un proceso colaborativo, no como una entrega final. Trabajo de forma cercana con desarrollo para asegurar que las decisiones de diseño se entienden, son viables y están bien documentadas. Entrego especificaciones claras, componentes reutilizables y criterios de comportamiento, resolviendo dudas de forma continua y acompañando la implementación para garantizar coherencia entre diseño y producto final.",
  match: [
    "handoff",
    "desarrollo",
    "especificaciones",
    "componentes",
    "documentación"
  ],
  searchText:
    "Proceso end-to-end. Delivery. Handoff: proceso colaborativo con desarrollo, especificaciones claras, componentes reutilizables, criterios de comportamiento y acompañamiento en implementación.",
  followupIds: [
    "pd_iteracion_testing",
    "pd_iteracion_mejora_continua",
    "pd_impacto_metricas"
  ],
},

{
  id: "pd_iteracion_testing",
  locale: "es-ES",
  question: "¿Cómo haces testing con usuarios?",
  answer: "En la fase de iteración utilizo el testing como una herramienta para validar decisiones y reducir riesgo. Realizo tests con usuarios, pruebas de usabilidad y validaciones sobre prototipos o producto en producción, adaptando el método al momento del proyecto. El objetivo no es confirmar que el diseño “gusta”, sino identificar fricciones reales, comprobar si las hipótesis se cumplen y obtener aprendizajes accionables que permitan ajustar la solución.",
  match: [
    "testing",
    "tests con usuarios",
    "usabilidad",
    "validación",
    "hipótesis"
  ],
  searchText:
    "Proceso end-to-end. Iteración. Testing con usuarios: validar decisiones, reducir riesgo, pruebas de usabilidad en prototipos o producción, aprendizajes accionables.",
  followupIds: [
    "pd_iteracion_mejora_continua",
    "pd_impacto_metricas",
    "pd_impacto_aprendizajes"
  ],
},

{
  id: "pd_iteracion_mejora_continua",
  locale: "es-ES",
  question: "¿Cómo gestionas la mejora continua del producto?",
  answer: "La mejora continua forma parte natural del ciclo de diseño. Analizo métricas de uso, feedback de usuarios y señales del negocio para detectar oportunidades de optimización y evolución del producto. Trabajo con iteraciones pequeñas y progresivas, priorizando cambios que generen impacto real y sostenible. Este enfoque permite que el producto evolucione de forma constante, manteniendo calidad, coherencia y alineación con las necesidades reales de los usuarios",
  match: [
    "mejora continua",
    "iteración",
    "métricas",
    "feedback",
    "impacto"
  ],
  searchText:
    "Proceso end-to-end. Iteración. Mejora continua: analizar métricas, feedback de usuarios y señales de negocio, iteraciones pequeñas y progresivas con impacto sostenible.",
  followupIds: [
    "pd_impacto_metricas",
    "pd_impacto_aprendizajes",
    "pd_definicion_framing"
  ],
},

{
  id: "pd_impacto_metricas",
  locale: "es-ES",
  question: "¿Cómo mides el impacto de tu trabajo?",
  answer: "En la fase de medición de impacto utilizo métricas como herramienta para evaluar si las decisiones de diseño están generando el resultado esperado. Defino indicadores claros y alineados con los objetivos del producto, combinando métricas de uso, comportamiento y negocio. Las métricas me permiten entender qué está funcionando, qué no y dónde enfocar los siguientes esfuerzos, evitando decisiones basadas únicamente en percepción u opinión.",
  match: [
    "impacto",
    "métricas",
    "indicadores",
    "negocio",
    "comportamiento"
  ],
  searchText:
    "Proceso end-to-end. Medición de impacto: definir indicadores alineados a objetivos de producto, métricas de uso, comportamiento y negocio.",
  followupIds: [
    "pd_impacto_aprendizajes",
    "pd_iteracion_mejora_continua",
    "pd_definicion_solving"
  ],
},

{
  id: "pd_impacto_aprendizajes",
  locale: "es-ES",
  question: "¿Cómo utilizas las métricas para aprender y mejorar producto?",
  answer: "Los aprendizajes se obtienen al interpretar las métricas en contexto, no solo al observar números. Analizo los resultados para extraer insights accionables, validar o refutar hipótesis y ajustar la estrategia del producto. Este proceso de aprendizaje continuo alimenta decisiones futuras, mejora la calidad del diseño y ayuda al equipo a evolucionar con mayor criterio y foco en impacto real.",
  match: [
    "aprendizajes",
    "interpretar métricas",
    "insights",
    "estrategia",
    "mejora producto"
  ],
  searchText:
    "Proceso end-to-end. Medición de impacto. Aprendizajes: interpretar métricas en contexto, extraer insights accionables, validar o refutar hipótesis y ajustar estrategia.",
  followupIds: [
    "pd_definicion_framing",
    "pd_iteracion_mejora_continua",
    "pd_impacto_metricas"
  ],
},


  /* =========================
   07) DESIGN SYSTEMS & ESCALABILIDAD
========================= */

{
  id: "ds_que_es",
  locale: "es-ES",
  question: "¿Qué es un Design System para ti?",
  answer: "Para mí, un Design System es una infraestructura compartida que conecta diseño, desarrollo y producto, y permite construir experiencias consistentes, escalables y sostenibles en el tiempo. No es solo una librería visual, sino un sistema vivo que define principios, reglas y decisiones comunes, reduciendo ambigüedad y facilitando que los equipos trabajen mejor y más rápido alineados a un mismo estándar.",
  match: ["Design System", "infraestructura", "consistencia", "escalable", "sostenible"],
  searchText:
    "Design Systems. Qué es un Design System para mí: infraestructura compartida que conecta diseño, desarrollo y producto. Permite construir experiencias consistentes, escalables y sostenibles en el tiempo. No es solo una librería visual, sino un sistema vivo que define principios, reglas y decisiones comunes. Reduce ambigüedad y facilita que los equipos trabajen mejor y más rápido alineados a un mismo estándar.",
  followupIds: ["ds_creacion", "ds_tokens_variables", "ds_roi_eficiencia"],
},

{
  id: "ds_creacion",
  locale: "es-ES",
  question: "¿Cómo construyes un Design System desde cero?",
  answer: "Concibo la creación de un Design System como un proceso estratégico y progresivo. Empiezo por entender el contexto del producto, las necesidades reales de los equipos y el ecosistema tecnológico, para después definir foundations sólidas y una arquitectura modular que pueda evolucionar. Priorizo resolver problemas reales de escalabilidad y consistencia, evitando sistemas sobredimensionados que no se adoptan.",
  match: ["crear", "construir", "foundations", "arquitectura modular", "evolucionar", "adopción"],
  searchText:
    "Design Systems. Creación de Design Systems: proceso estratégico y progresivo. Empiezo por entender el contexto del producto, las necesidades reales de los equipos y el ecosistema tecnológico. Después defino foundations sólidas y una arquitectura modular que pueda evolucionar. Priorizo resolver problemas reales de escalabilidad y consistencia, evitando sistemas sobredimensionados que no se adoptan.",
  followupIds: ["ds_gobernanza", "ds_tokens_variables", "ds_colaboracion_dev"],
},

{
  id: "ds_gobernanza",
  locale: "es-ES",
  question: "¿Cómo defines la gobernanza de un Design System?",
  answer: "La gobernanza es clave para que un Design System funcione a largo plazo. Defino modelos claros de toma de decisiones, roles y responsabilidades, promoviendo una gobernanza federada donde los equipos pueden aportar y evolucionar el sistema sin perder coherencia. El objetivo es equilibrar control y autonomía, facilitando adopción, mejora continua y alineación entre equipos.",
  match: ["gobernanza", "federada", "roles", "responsabilidades", "toma de decisiones"],
  searchText:
    "Design Systems. Gobernanza: clave para que un Design System funcione a largo plazo. Defino modelos claros de toma de decisiones, roles y responsabilidades. Promuevo una gobernanza federada donde los equipos pueden aportar y evolucionar el sistema sin perder coherencia. El objetivo es equilibrar control y autonomía.",
  followupIds: ["ds_colaboracion_dev", "ds_tokens_variables", "ds_roi_eficiencia"],
},

{
  id: "ds_tokens_variables",
  locale: "es-ES",
  question: "¿Cómo trabajas tokens y variables?",
  answer: "Los tokens y variables son la base técnica del sistema. Los utilizo como fuente única de verdad para colores, tipografías, espaciado, motion y estados, separando decisiones de diseño de su implementación visual. Esta abstracción permite mantener consistencia, facilitar cambios globales y asegurar una integración fluida entre diseño y código, independientemente de la tecnología.",
  match: ["tokens", "variables", "fuente única de verdad", "colores", "tipografías", "espaciado", "motion"],
  searchText:
    "Design Systems. Tokens y variables: base técnica del sistema. Uso tokens como fuente única de verdad para colores, tipografías, espaciado, motion y estados. Separan decisiones de diseño de la implementación visual y facilitan consistencia, cambios globales e integración fluida entre diseño y código.",
  followupIds: ["ds_colaboracion_dev", "ds_gobernanza", "ds_roi_eficiencia"],
},

{
  id: "ds_colaboracion_dev",
  locale: "es-ES",
  question: "¿Cómo colaboras con desarrollo en un Design System?",
  answer: "Trabajo el Design System de forma conjunta con desarrollo desde el inicio. Colaboro en la definición de nomenclaturas, estructuras y flujos técnicos para que el sistema sea realmente usable y adoptable. Esta colaboración estrecha reduce fricción, evita retrabajo y garantiza que diseño y código evolucionen de forma sincronizada.",
  match: ["colaboración", "desarrollo", "nomenclatura", "arquitectura", "adopción"],
  searchText:
    "Design Systems. Colaboración con desarrollo: trabajo el Design System junto a desarrollo desde el inicio. Defino nomenclaturas, estructuras y flujos técnicos para asegurar que el sistema sea usable, adoptable y que diseño y código evolucionen sincronizados.",
  followupIds: ["ds_tokens_variables", "ds_gobernanza", "ds_roi_eficiencia"],
},

{
  id: "ds_roi_eficiencia",
  locale: "es-ES",
  question: "¿Cómo demuestras el ROI de un Design System?",
  answer: "Un Design System bien construido genera impacto medible. Reduce tiempos de diseño y desarrollo, minimiza inconsistencias, disminuye errores y acelera la entrega de producto. Para mí, el éxito del sistema se mide en eficiencia, calidad y ahorro de costes, pero también en la capacidad de los equipos para trabajar con más foco, autonomía y confianza",
  match: ["ROI", "eficiencia", "ahorro", "tiempos", "consistencia"],
  searchText:
    "Design Systems. ROI y eficiencia: un Design System bien construido reduce tiempos de diseño y desarrollo, minimiza inconsistencias y errores, acelera la entrega y genera ahorro de costes. El éxito se mide en eficiencia, calidad y autonomía de los equipos.",
  followupIds: ["ds_creacion", "ds_gobernanza", "ds_tokens_variables"],
},


  /* =========================
   08) HERRAMIENTAS Y STACK
========================= */

{
  id: "tools_overview",
  locale: "es-ES",
  question: "¿Qué herramientas manejas?",
  answer:
    "Trabajo con un stack orientado a producto y escalabilidad. En diseño y colaboración utilizo Figma y FigJam como núcleo del proceso. Para prototipado avanzado y validación rápida empleo Figma, Framer y Webflow según el contexto. En sistemas de diseño trabajo con Tokens Studio, Storybook y Style Dictionary para conectar diseño y código. Para research y análisis uso Google Analytics, Hotjar y Lookback. En el lado técnico trabajo con GitHub, VS Code y despliegues en Vercel. Para gestión y alineación de equipos utilizo Notion, Jira y Linear. Mi foco no está en la herramienta en sí, sino en elegir la adecuada para cada fase del producto y del equipo.",
  match: [
    "herramientas",
    "stack",
    "tooling",
    "qué herramientas usas",
    "qué herramientas dominas",
    "qué herramientas utilizas",
    "qué herramientas conoces",
    "qué herramientas prefieres",
    "qué herramientas manejas",
    "figma",
    "design tools",
    "stack de diseño"
  ],
  searchText:
    "Herramientas de diseño y producto. Stack profesional: Figma, FigJam, Framer, Webflow, Tokens Studio, Storybook, Style Dictionary, Google Analytics, Hotjar, Lookback, GitHub, VS Code, Vercel, Notion, Jira y Linear. Herramientas orientadas a producto, design systems, research, prototipado, desarrollo y gestión de equipos.",
  followupIds: [
    "tools_figma",
    "tools_figjam",
    "tools_prototyping_figma_advanced",
  ],
},


// Diseño
{
  id: "tools_figma",
  locale: "es-ES",
  question: "¿Cómo utilizas Figma en tu día a día?",
  answer:
    "Manejo Figma a nivel experto como herramienta central de diseño de producto y sistemas de diseño. La utilizo para definir y escalar interfaces complejas, construir librerías robustas, trabajar con componentes avanzados, variantes, auto layout y variables, y mantener coherencia a gran escala entre múltiples productos y equipos. Figma es para mí un entorno de trabajo colaborativo donde diseño, documento decisiones, gestiono sistemas de diseño, versiono cambios y facilito la comunicación entre diseño, producto y desarrollo, reduciendo fricción y acelerando la toma de decisiones.",
  match: ["Figma", "componentes", "variantes", "auto layout", "variables", "librerías", "documentar"],
  searchText:
    "Herramientas y stack. Diseño. Figma: nivel experto. Herramienta central para diseño de producto y sistemas de diseño. Definir y escalar interfaces complejas. Librerías robustas. Componentes avanzados, variantes, auto layout y variables. Mantener coherencia a gran escala entre múltiples productos y equipos. Entorno colaborativo para diseñar, documentar decisiones, gestionar sistemas de diseño, versionar cambios y facilitar comunicación entre diseño, producto y desarrollo.",
  followupIds: ["tools_figjam", "tools_prototyping_figma_advanced", "tools_tokens_studio"],
},
{
  id: "tools_figjam",
  locale: "es-ES",
  question: "¿Cómo utilizas FigJam en workshops?",
  answer:
    "Uso FigJam para discovery, ideación y alineamiento. Facilito workshops, mapeo de journeys, síntesis de research y dinámicas de co-creación que ayudan a generar entendimiento compartido y decisiones claras.",
  match: ["FigJam", "discovery", "ideación", "journey", "síntesis", "workshops", "co-creación"],
  searchText:
    "Herramientas y stack. Diseño. FigJam: discovery, ideación y alineamiento. Facilito workshops, mapeo journeys, síntesis de research y dinámicas de co-creación para generar entendimiento compartido y decisiones claras.",
  followupIds: ["pd_ideacion_workshops", "pd_ideacion_cocreacion", "tools_lookback"],
},

// Prototipado
{
  id: "tools_prototyping_figma_advanced",
  locale: "es-ES",
  question: "¿Cómo realizas prototipado avanzado en Figma?",
  answer:
    "Realizo prototipado avanzado en Figma utilizando variables, condicionales y estados complejos para simular comportamientos reales de producto y validar flujos antes de desarrollo. Ajusto el nivel de fidelidad según el objetivo, desde prototipos rápidos hasta simulaciones muy cercanas a producción.",
  match: ["prototipado", "Figma", "variables", "condicionales", "estados", "simular", "validar flujos"],
  searchText:
    "Herramientas y stack. Prototipado. Figma advanced: prototipado avanzado con variables, condicionales y estados complejos para simular comportamientos reales y validar flujos antes de desarrollo. Ajusto fidelidad según objetivo, desde prototipos rápidos hasta simulaciones cercanas a producción.",
  followupIds: ["tools_prototyping_framer_webflow", "pd_delivery_prototipado", "tools_vercel"],
},
{
  id: "tools_prototyping_framer_webflow",
  locale: "es-ES",
  question: "¿Cuándo decides usar Framer o Webflow?",
  answer:
    "Cuando el objetivo es lanzar o validar una experiencia directamente en entorno real, utilizo herramientas como Framer y Webflow para construir prototipos funcionales o piezas listas para producción, permitiendo testear con usuarios y stakeholders en contextos reales.",
  match: ["Framer", "Webflow", "prototipos funcionales", "entorno real", "validar", "stakeholders"],
  searchText:
    "Herramientas y stack. Prototipado. Framer y Webflow: cuando el objetivo es lanzar o validar en entorno real, construyo prototipos funcionales o piezas listas para producción. Permite testear con usuarios y stakeholders en contextos reales.",
  followupIds: ["tools_vercel", "pd_iteracion_testing", "tools_github"],
},

// Design Systems
{
  id: "tools_tokens_studio",
  locale: "es-ES",
  question: "¿Cómo utilizas Tokens Studio?",
  answer:
    "Herramienta clave para la gestión de design tokens, permitiéndome definir y mantener una fuente única de verdad para estilos, facilitando sincronización entre diseño y código.",
  match: ["Tokens Studio", "design tokens", "fuente única de verdad", "sincronización", "estilos"],
  searchText:
    "Herramientas y stack. Design Systems. Tokens Studio: herramienta clave para gestionar design tokens. Definir y mantener fuente única de verdad para estilos y facilitar la sincronización entre diseño y código.",
  followupIds: ["tools_style_dictionary", "ds_tokens_variables", "tools_storybook"],
},
{
  id: "tools_storybook",
  locale: "es-ES",
  question: "¿Cómo utilizas Storybook?",
  answer:
    "Uso Storybook como espacio de documentación viva y colaboración con desarrollo, donde los componentes se prueban, documentan y validan de forma aislada y consistente.",
  match: ["Storybook", "documentación", "componentes", "aislado", "validar", "desarrollo"],
  searchText:
    "Herramientas y stack. Design Systems. Storybook: documentación viva y colaboración con desarrollo. Componentes se prueban, documentan y validan de forma aislada y consistente.",
  followupIds: ["tools_style_dictionary", "tools_github", "ds_colaboracion_dev"],
},
{
  id: "tools_style_dictionary",
  locale: "es-ES",
  question: "¿Cómo utilizas Style Dictionary?",
  answer:
    "Trabajo con Style Dictionary para transformar tokens en salidas consumibles por distintas tecnologías, asegurando agnosticismo y escalabilidad del sistema de diseño",
  match: ["Style Dictionary", "transformar tokens", "salidas", "tecnologías", "agnóstico", "escalabilidad"],
  searchText:
    "Herramientas y stack. Design Systems. Style Dictionary: transformar tokens en salidas consumibles por distintas tecnologías, asegurando agnosticismo y escalabilidad del sistema de diseño.",
  followupIds: ["ds_gobernanza", "ds_tokens_variables", "tools_tokens_studio"],
},

// Research & analytics
{
  id: "tools_google_analytics",
  locale: "es-ES",
  question: "¿Cómo utilizas Google Analytics?",
  answer:
    "Utilizo Google Analytics para analizar comportamiento, funnels y métricas clave, apoyando decisiones de producto basadas en datos reales.",
  match: ["Google Analytics", "funnels", "comportamiento", "métricas", "datos", "producto"],
  searchText:
    "Herramientas y stack. Research & analytics. Google Analytics: analizar comportamiento, funnels y métricas clave para apoyar decisiones de producto basadas en datos reales.",
  followupIds: ["pd_impacto_metricas", "pd_discovery_quant", "tools_hotjar"],
},
{
  id: "tools_hotjar",
  locale: "es-ES",
  question: "¿Cómo utilizas Hotjar?",
  answer:
    "Uso Hotjar para entender cómo interactúan los usuarios mediante heatmaps, grabaciones y feedback directo, identificando fricciones y oportunidades de mejora.",
  match: ["Hotjar", "heatmaps", "grabaciones", "feedback", "fricciones", "oportunidades"],
  searchText:
    "Herramientas y stack. Research & analytics. Hotjar: entender interacción mediante heatmaps, grabaciones y feedback directo para identificar fricciones y oportunidades de mejora.",
  followupIds: ["tools_lookback", "pd_iteracion_testing", "pd_discovery_qual"],
},
{
  id: "tools_lookback",
  locale: "es-ES",
  question: "¿Cómo utilizas Lookback?",
  answer:
    "Herramienta principal para entrevistas y tests de usabilidad remotos, facilitando validación temprana y aprendizaje continuo con usuarios reales.",
  match: ["Lookback", "entrevistas", "tests de usabilidad", "remoto", "validación", "aprendizaje"],
  searchText:
    "Herramientas y stack. Research & analytics. Lookback: entrevistas y tests de usabilidad remotos para validación temprana y aprendizaje continuo con usuarios reales.",
  followupIds: ["pd_iteracion_testing", "pd_discovery_qual", "pd_definicion_hipotesis"],
},

// Desarrollo
{
  id: "tools_github",
  locale: "es-ES",
  question: "¿Cómo utilizas Github?",
  answer:
    "Uso GitHub para seguimiento de issues, revisión de trabajo y colaboración con equipos técnicos dentro del ciclo de desarrollo.",
  match: ["GitHub", "issues", "revisión", "colaboración", "desarrollo", "ciclo"],
  searchText:
    "Herramientas y stack. Desarrollo. GitHub: seguimiento de issues, revisión de trabajo y colaboración con equipos técnicos dentro del ciclo de desarrollo.",
  followupIds: ["tools_vscode", "tools_vercel", "pd_delivery_handoff"],
},
{
  id: "tools_vscode",
  locale: "es-ES",
  question: "¿Cómo utilizas VsCode?",
  answer:
    "Utilizo esta herramienta para revisar código, ajustar estilos, entender la base técnica y colaborar de forma más fluida con desarrollo.",
  match: ["VS Code", "revisar código", "ajustar estilos", "base técnica", "colaborar"],
  searchText:
    "Herramientas y stack. Desarrollo. VS Code: revisar código, ajustar estilos, entender la base técnica y colaborar de forma más fluida con desarrollo.",
  followupIds: ["pd_delivery_handoff", "ds_colaboracion_dev", "tools_github"],
},
{
  id: "tools_vercel",
  locale: "es-ES",
  question: "¿Cómo utilizas Vercel?",
  answer:
    "Utilizo Vercel para despliegues rápidos, validación de prototipos funcionales y testing de soluciones en entornos cercanos a producción",
  match: ["Vercel", "deploy", "despliegues", "prototipos", "producción", "testing"],
  searchText:
    "Herramientas y stack. Desarrollo. Vercel: despliegues rápidos, validación de prototipos funcionales y testing de soluciones en entornos cercanos a producción.",
  followupIds: ["tools_github", "tools_prototyping_framer_webflow", "pd_iteracion_testing"],
},

// Gestión
{
  id: "tools_notion",
  locale: "es-ES",
  question: "¿Cómo utilizas Notion?",
  answer:
    "Uso Notion como espacio central de documentación, alineamiento, planificación y seguimiento de procesos y decisiones.",
  match: ["Notion", "documentación", "alineamiento", "planificación", "seguimiento"],
  searchText:
    "Herramientas y stack. Gestión. Notion: espacio central de documentación, alineamiento, planificación y seguimiento de procesos y decisiones.",
  followupIds: ["tools_jira", "pd_delivery_handoff", "ls_stakeholders"],
},
{
  id: "tools_jira",
  locale: "es-ES",
  question: "¿Cómo utilizas Jira?",
  answer:
    "Trabajo con Jira para la gestión de proyectos ágiles, seguimiento de tareas y coordinación con equipos multidisciplinares",
  match: ["Jira", "agile", "gestión de proyectos", "tareas", "squads", "coordinación"],
  searchText:
    "Herramientas y stack. Gestión. Jira: gestión de proyectos ágiles, seguimiento de tareas y coordinación con equipos multidisciplinares.",
  followupIds: ["tools_linear", "ls_comunicacion_facilitacion", "pd_iteracion_mejora_continua"],
},
{
  id: "tools_linear",
  locale: "es-ES",
  question: "¿Cómo utilizas Linear?",
  answer:
    "Utilizo Linear en contextos donde se prioriza rapidez, claridad y eficiencia en la gestión de issues y ciclos de trabajo.",
  match: ["Linear", "issues", "rapidez", "claridad", "eficiencia", "ciclos"],
  searchText:
    "Herramientas y stack. Gestión. Linear: uso en contextos donde se prioriza rapidez, claridad y eficiencia en la gestión de issues y ciclos de trabajo.",
  followupIds: ["tools_github", "tools_jira", "pd_iteracion_mejora_continua"],
},


 /* =========================
   09) SERVICIOS PROFESIONALES
========================= */

{
  id: "services_product_design",
  locale: "es-ES",
  question: "¿Qué servicios de Product Design ofreces?",
  answer:
    "Ofrezco servicios de diseño de producto end to end, desde discovery y definición estratégica hasta diseño, validación y evolución en producción. Trabajo sobre problemas complejos, alineando necesidades de usuario, objetivos de negocio y viabilidad técnica para construir productos claros, escalables y con impacto real.",
  match: ["servicios", "Product Design", "end to end", "discovery", "estrategia", "validación", "producción"],
  searchText:
    "Servicios profesionales. Product Design: diseño de producto end to end, desde discovery y definición estratégica hasta diseño, validación y evolución en producción. Trabajo sobre problemas complejos alineando necesidades de usuario, objetivos de negocio y viabilidad técnica para construir productos claros, escalables y con impacto real.",
  followupIds: ["services_ux_strategy", "pd_discovery_qual", "services_ux_consulting"],
},

{
  id: "services_design_systems",
  locale: "es-ES",
  question: "¿Ofreces servicios de Design Systems?",
  answer:
    "Diseño y escalo sistemas de diseño como infraestructura de producto, orientados a mejorar consistencia, eficiencia y colaboración entre equipos. Trabajo tanto en la definición conceptual como en la implementación técnica, asegurando adopción real y sostenibilidad a largo plazo.",
  match: ["servicios", "Design Systems", "infraestructura", "consistencia", "eficiencia", "implementación técnica"],
  searchText:
    "Servicios profesionales. Design Systems: diseño y escalo sistemas de diseño como infraestructura de producto para mejorar consistencia, eficiencia y colaboración. Trabajo en definición conceptual e implementación técnica, asegurando adopción real y sostenibilidad.",
  followupIds: ["ds_creacion", "ds_gobernanza", "services_design_ops"],
},

{
  id: "services_ux_strategy",
  locale: "es-ES",
  question: "¿Ofreces servicios de UX Strategy?",
  answer:
    "Acompaño a equipos y organizaciones en la definición de estrategia de experiencia, ayudando a identificar oportunidades, priorizar iniciativas y tomar decisiones basadas en research, datos y objetivos de negocio. Mi foco está en conectar visión, ejecución y resultados medibles.",
  match: ["servicios", "UX Strategy", "estrategia", "oportunidades", "priorizar", "research", "datos"],
  searchText:
    "Servicios profesionales. UX Strategy: acompaño a equipos y organizaciones en estrategia de experiencia, identificando oportunidades, priorizando iniciativas y tomando decisiones basadas en research, datos y objetivos de negocio. Conecto visión, ejecución y resultados medibles.",
  followupIds: ["pd_definicion_framing", "pd_impacto_metricas", "services_product_design"],
},

{
  id: "services_design_ops",
  locale: "es-ES",
  question: "¿Ofreces servicios de Design Ops?",
  answer:
    "Trabajo en la optimización de procesos, herramientas y dinámicas de equipo para mejorar la eficiencia del diseño a escala. Ayudo a establecer estructuras, flujos de trabajo y estándares que permitan a los equipos operar con mayor claridad, foco y previsibilidad.",
  match: ["servicios", "Design Ops", "procesos", "herramientas", "eficiencia", "estándares", "estructura"],
  searchText:
    "Servicios profesionales. Design Ops: optimización de procesos, herramientas y dinámicas de equipo para mejorar eficiencia del diseño a escala. Establezco estructuras, flujos de trabajo y estándares para operar con claridad, foco y previsibilidad.",
  followupIds: ["services_design_systems", "ls_stakeholders", "tools_notion"],
},

{
  id: "services_mentoring",
  locale: "es-ES",
  question: "¿Ofreces servicios de mentoring?",
  answer:
    "Ofrezco mentoring a diseñadores y equipos, acompañando su crecimiento profesional y ayudándolos a desarrollar criterio, autonomía y pensamiento estratégico. Mi enfoque es práctico, cercano y orientado a impacto real en su día a día",
  match: ["servicios", "mentoring", "criterio", "autonomía", "crecimiento", "equipos"],
  searchText:
    "Servicios profesionales. Mentoring: mentoring a diseñadores y equipos para desarrollar criterio, autonomía y pensamiento estratégico. Enfoque práctico, cercano y orientado a impacto en el día a día.",
  followupIds: ["ls_mentoring", "ls_decisiones_incertidumbre", "services_product_design"],
},

{
  id: "services_ux_consulting",
  locale: "es-ES",
  question: "¿Ofreces consultoría UX?",
  answer:
    "Brindo consultoría UX para evaluar productos, procesos y organizaciones, identificando problemas, oportunidades de mejora y líneas de acción claras. Aporto una visión externa, basada en experiencia, research y datos, para ayudar a tomar mejores decisiones de diseño y producto.",
  match: ["servicios", "consultoría UX", "evaluar", "auditoría", "oportunidades", "plan de acción"],
  searchText:
    "Servicios profesionales. Consultoría UX: evalúo productos, procesos y organizaciones, identifico problemas y oportunidades, y defino líneas de acción claras. Aporto visión externa basada en experiencia, research y datos para apoyar mejores decisiones.",
  followupIds: ["services_ux_strategy", "pd_discovery_quant", "services_product_design"],
},


  /* =========================
   10) RESULTADOS E IMPACTO
========================= */

{
  id: "impact_overview",
  locale: "es-ES",
  question: "¿Cómo defines tu enfoque sobre resultados e impacto?",
  answer:
    "Como diseñador senior, mido mi trabajo por el impacto real que genera en producto, negocio y equipos. Mi foco no está en outputs, sino en outcomes: mejoras medibles, decisiones sostenibles y productos que funcionan mejor en contextos complejos. Entiendo el diseño como una palanca estratégica capaz de reducir riesgo, generar eficiencia y crear valor económico tangible cuando se conecta correctamente con datos, tecnología y objetivos de negocio.",
  match: ["impacto", "outcomes", "outputs", "valor", "estratégico", "reducir riesgo", "eficiencia"],
  searchText:
    "Resultados e impacto. Enfoque general: mido mi trabajo por el impacto real en producto, negocio y equipos. Foco en outcomes (mejoras medibles, decisiones sostenibles y productos que funcionan mejor) por encima de outputs. Diseño como palanca estratégica para reducir riesgo, generar eficiencia y crear valor económico cuando se conecta con datos, tecnología y objetivos de negocio.",
  followupIds: ["impact_economic_cases", "impact_conversion", "impact_productivity"],
},

{
  id: "impact_roi",
  locale: "es-ES",
  question: "¿Qué métricas utilizas para demostrar ROI?",
  answer:
    "He contribuido a generar retornos de inversión significativos a través de decisiones de diseño bien estructuradas, especialmente en proyectos de sistemas de diseño y optimización de flujos críticos. Casos como la creación de infraestructuras de diseño escalables han demostrado que el diseño puede traducirse directamente en ahorro de costes, eficiencia operativa y retorno económico medible.",
  match: ["ROI", "retorno", "ahorro", "costes", "eficiencia", "design system", "optimización"],
  searchText:
    "Resultados e impacto. Métricas clave. ROI: he contribuido a retornos de inversión significativos a través de decisiones de diseño bien estructuradas, especialmente en sistemas de diseño y optimización de flujos críticos. El diseño puede traducirse en ahorro de costes, eficiencia operativa y retorno económico medible.",
  followupIds: ["impact_economic_cases", "cs_cofares_metricas_impacto", "ds_roi_eficiencia"],
},

{
  id: "impact_conversion",
  locale: "es-ES",
  question: "¿Cómo impactas en métricas de conversión?",
  answer:
    "He trabajado en productos digitales donde el impacto se refleja directamente en métricas de conversión, optimizando funnels, arquitectura de información y experiencias clave. La mejora de procesos de compra y flujos críticos ha permitido incrementos sustanciales en tasas de conversión, especialmente en contextos mobile y de alta complejidad, siempre apoyado en datos y validación con usuarios.",
  match: ["conversión", "funnel", "checkout", "arquitectura de información", "mobile", "CRO"],
  searchText:
    "Resultados e impacto. Métricas clave. Conversión: optimizo funnels, arquitectura de información y experiencias clave para incrementar conversión, especialmente en contextos mobile y de alta complejidad, apoyándome en datos y validación con usuarios.",
  followupIds: ["cs_fcb_ecom_metricas_impacto", "pd_discovery_quant", "cs_fcb_ecom_decisiones_diseno"],
},

{
  id: "impact_productivity",
  locale: "es-ES",
  question: "¿Cómo impactas en productividad de equipos?",
  answer:
    "Una parte importante de mi impacto está en mejorar cómo trabajan los equipos. A través de sistemas de diseño, procesos claros y colaboración estrecha con desarrollo, he logrado reducir retrabajo, acelerar tiempos de entrega y aumentar la autonomía de los equipos, mejorando la productividad de forma sostenible.",
  match: ["productividad", "equipos", "autonomía", "retrabajo", "tiempos de entrega", "sistemas de diseño"],
  searchText:
    "Resultados e impacto. Métricas clave. Productividad: mejoro cómo trabajan los equipos mediante sistemas de diseño, procesos claros y colaboración con desarrollo. Reduzco retrabajo, acelero entrega y aumento autonomía de forma sostenible.",
  followupIds: ["cs_repsol_metricas_impacto", "cs_cofares_metricas_impacto", "ds_colaboracion_dev"],
},

{
  id: "impact_economic_cases",
  locale: "es-ES",
  question: "¿Puedes contarme casos con impacto económico medible?",
  answer:
    "He trabajado en proyectos donde el diseño ha tenido un impacto económico directo y medible. En la app de socios del FC Barcelona, el rediseño del flujo de gestión de partidos y liberación de asientos contribuyó a un impacto estimado de 1,6 millones de euros por temporada, al reducir butacas vacías y mejorar la adopción de funcionalidades clave por parte de los socios. En el caso de Cofares, la creación de un Design System agnóstico a la tecnología generó un ROI del 180%, equivalente a aproximadamente 1,9 millones de euros, gracias a la reducción de tiempos de desarrollo, menor retrabajo, reutilización de componentes y mayor eficiencia operativa de los equipos. Estos casos refuerzan mi forma de entender el diseño como una inversión estratégica capaz de generar valor económico real cuando se alinea con objetivos de negocio y ejecución técnica.",
  match: ["1,6M", "1.6M", "FC Barcelona", "Cofares", "1,9M", "1.9M", "180%"],
  searchText:
    "Resultados e impacto. Casos con impacto económico: FC Barcelona app de socios, rediseño del flujo de gestión y liberación de asientos, impacto estimado 1,6M€ por temporada. Cofares, Design System agnóstico a la tecnología, ROI 180% equivalente a ~1,9M€ por reducción de tiempos, menor retrabajo, reutilización de componentes y eficiencia operativa.",
  followupIds: ["cs_fcb_socios_metricas_impacto", "cs_cofares_metricas_impacto", "impact_roi"],
},

{
  id: "impact_hard_decisions",
  locale: "es-ES",
  question: "¿Qué tipo de decisiones difíciles has tenido que tomar?",
  answer:
    "A lo largo de mi trayectoria he tenido que tomar decisiones complejas en las que las necesidades de los usuarios no siempre estaban alineadas con los objetivos de negocio. En estos casos, mi enfoque ha sido analizar el impacto real de cada opción, evaluar riesgos y buscar soluciones de compromiso que protegieran la experiencia del usuario sin comprometer la sostenibilidad del producto. Cuando no ha sido posible conciliar ambos intereses, he asumido la responsabilidad de priorizar decisiones estratégicas, explicando de forma clara el porqué y las implicaciones, y utilizando datos, research y métricas para respaldar elecciones que, aunque difíciles, eran necesarias para el éxito a largo plazo del producto.",
  match: ["decisiones difíciles", "trade-offs", "usuario vs negocio", "riesgos", "explicar porqué", "métricas"],
  searchText:
    "Resultados e impacto. Decisiones difíciles: cuando necesidades de usuario no alinean con objetivos de negocio, analizo impacto, evalúo riesgos y busco compromisos que protejan experiencia sin comprometer sostenibilidad. Si no es posible conciliar, priorizo decisiones estratégicas y explico el porqué con datos, research y métricas.",
  followupIds: ["ls_stakeholders", "ls_decisiones_incertidumbre", "pd_definicion_framing"],
},

{
  id: "impact_learning_from_errors",
  locale: "es-ES",
  question: "¿Qué aprendizajes te has llevado de errores?",
  answer:
    "Los errores han sido una fuente constante de aprendizaje. He aprendido a detectar señales tempranas, a ajustar el rumbo rápidamente y a transformar fallos en mejoras de proceso, diseño o comunicación. Esta experiencia me ha permitido desarrollar un criterio más sólido, tomar mejores decisiones en contextos de incertidumbre y construir productos y equipos más resilientes.",
  match: ["errores", "aprendizajes", "señales tempranas", "ajustar rumbo", "resiliencia", "incertidumbre"],
  searchText:
    "Resultados e impacto. Aprendizajes de errores: aprendo a detectar señales tempranas, ajustar rumbo rápido y transformar fallos en mejoras de proceso, diseño o comunicación. Refuerza criterio, decisiones en incertidumbre y productos/equipos más resilientes.",
  followupIds: ["ls_decisiones_incertidumbre", "pd_iteracion_mejora_continua", "ls_mentoring"],
},


  /* =========================
   11) EDUCACIÓN Y FORMACIÓN
========================= */

{
  id: "education_academic",
  locale: "es-ES",
  question: "¿Cuál es tu formación académica?",
  answer:
    "Cursé el Grado en Comunicación Audiovisual con especialización en Diseño Multimedia en la Universidad de Málaga, donde adquirí una base sólida en diseño, comunicación visual, narrativa digital y pensamiento crítico, fundamentales para mi posterior desarrollo en producto digital.",
  match: ["Universidad de Málaga",
    "Comunicación Audiovisual",
    "Diseño Multimedia",
    "formación académica",
    "¿qué has estudidado?",
    "¿cuál es tu carrera?",
    "¿qué carrera has estudiado?",
    "estudios",
    "estudiado",
    "carrera",
    "¿cuáles son tus estudios?",
],
  searchText:
    "Educación y formación. Formación académica: Grado en Comunicación Audiovisual con especialización en Diseño Multimedia en la Universidad de Málaga. Base en diseño, comunicación visual, narrativa digital y pensamiento crítico.",
  followupIds: ["education_masters_specializations", "education_continuous_learning", "hub_resumen_portfolio"],
},

{
  id: "education_masters_specializations",
  locale: "es-ES",
  question: "¿Qué másters o especializaciones tienes?",
  answer:
    "Complementé mi formación con estudios especializados en diseño y producto digital, incluyendo el Máster en Digital Product Design en La Gauss. Además, me he formado en escuelas y programas orientados a práctica profesional y excelencia técnica como Mr. Marcel School, The Bridge y programas internos y formativos vinculados a General Software, ampliando mis competencias en producto, sistemas de diseño, UX engineering y colaboración con desarrollo.",
  match: ["Máster", "Digital Product Design", "La Gauss", "Mr. Marcel School", "The Bridge", "General Software"],
  searchText:
    "Educación y formación. Másters y especializaciones: Máster en Digital Product Design en La Gauss. Formación en Mr. Marcel School, The Bridge y programas internos/formativos vinculados a General Software. Competencias en producto, sistemas de diseño, UX engineering y colaboración con desarrollo.",
  followupIds: ["education_continuous_learning", "ds_creacion", "hub_resumen_portfolio"],
},

{
  id: "education_continuous_learning",
  locale: "es-ES",
  question: "¿Cómo mantienes tu aprendizaje continuo?",
  answer:
    "El aprendizaje continuo es una parte central de mi trayectoria. Mantengo una formación constante a través de cursos, autoaprendizaje, práctica diaria y exposición a proyectos complejos, lo que me permite actualizar criterio, profundizar en nuevas herramientas y metodologías, y seguir aportando valor en entornos de producto en constante evolución.",
  match: ["aprendizaje continuo", "cursos", "autoaprendizaje", "práctica diaria", "actualizar criterio"],
  searchText:
    "Educación y formación. Aprendizaje continuo: formación constante mediante cursos, autoaprendizaje, práctica diaria y exposición a proyectos complejos. Actualizo criterio, profundizo herramientas y metodologías, y aporto valor en entornos en evolución.",
  followupIds: ["mt_dt_cuando_usarlo", "ls_mentoring", "hub_resumen_portfolio"],
},

/* =========================
   12) RESUMEN Y NAVEGACIÓN (HUB)
========================= */

{
  id: "router_greeting",
  locale: "es-ES",
  question: "Hola",
  answer:
    "¡Hola! ¿Cómo estás?\nHe diseñado este espacio para contarte sobre mi experiencia profesional, mi proceso de trabajo, aprendizajes y reflexiones dentro del mundo del diseño de producto. ¿Qué área te interesa explorar hoy?",
  match: [
    "hola",
    "hey",
    "buenas",
    "hello",
    "hi",
    "hola que tal",
    "hola, que tal",
    "hola como estas",
    "hola, como estas",
    "buenos dias",
    "buenas tardes",
    "buenas noches",
  ],
  searchText:
    "Saludo e introducción. Presentación del portfolio. Experiencia profesional, proceso de trabajo, aprendizajes, reflexiones. Invita a explorar resumen, por dónde empezar y casos recomendados.",
  followupIds: [
    "hub_resumen_portfolio",
    "hub_por_donde_empezar",
    "hub_casos_recomendados",
  ],
},

{
  id: "hub_help_how_it_works",
  locale: "es-ES",
  question: "¿Qué puedo preguntarte?",
  answer:
    "Puedes preguntarme por mis casos de estudio, mi forma de trabajar, metodologías, proceso end to end, liderazgo, design systems, herramientas o impacto en negocio. Mi objetivo es ayudarte a entender cómo pienso y cómo aporto valor como diseñador de producto senior.",
  match: [
    "que puedo preguntarte",
    "qué puedo preguntarte",
    "ayuda",
    "help",
    "como funciona",
    "cómo funciona",
    "por donde empiezo",
    "por dónde empiezo",
    "qué puedo preguntarte aquí",
    "qué me puedes contar",
  ],
  searchText:
    "Ayuda y orientación del portfolio. Qué puedo preguntar. Cómo funciona el asistente. Casos de estudio, metodología, proceso end to end, liderazgo, design systems, herramientas e impacto en negocio. Visión general del contenido disponible.",
  followupIds: [
    "hub_casos_recomendados",
    "methods_overview",
    "pp_motiv_por_que_producto",
  ],
},



{
  id: "hub_resumen_portfolio",
  locale: "es-ES",
  question: "¿Puedes hacerme un resumen de tu portfolio?",
  answer:
    "Mi portfolio recoge más de ocho años de experiencia en diseño de producto digital, trabajando en contextos complejos y de alto impacto. He liderado proyectos end to end en entornos B2B y B2C, desde discovery y definición estratégica hasta diseño, validación e implementación, con especial foco en sistemas de diseño, optimización de flujos críticos y productos con impacto medible en negocio.",
  match: ["resumen", "portfolio", "experiencia", "8 años", "end to end", "alto impacto"],
  searchText:
    "Resumen del portfolio: más de ocho años de experiencia en diseño de producto digital. Contextos complejos y de alto impacto. Proyectos end to end desde discovery y definición estratégica hasta diseño, validación e implementación. Foco en sistemas de diseño, optimización de flujos críticos y productos con impacto medible en negocio.",
  followupIds: ["hub_por_donde_empezar", "hub_casos_recomendados", "impact_overview"],
},

{
  id: "hub_por_donde_empezar",
  locale: "es-ES",
  question: "¿Por dónde recomiendas empezar si es la primera vez que lo veo?",
  answer:
    "Si es la primera vez que visitas el portfolio, recomiendo empezar por los casos donde mejor se refleja mi forma de trabajar y mi impacto como diseñador senior: proyectos donde diseño, negocio y tecnología se alinean para resolver problemas reales y generar resultados tangibles.",
  match: ["por dónde empiezo", "primera vez", "recomendación", "casos", "qué ver primero"],
  searchText:
    "Por dónde empezar: si es la primera vez que visitas el portfolio, recomiendo empezar por los casos donde mejor se refleja mi forma de trabajar y mi impacto como diseñador senior: proyectos donde diseño, negocio y tecnología se alinean para resolver problemas reales y generar resultados tangibles.",
  followupIds: ["cs_repsol_overview", "cs_fcb_overview", "cs_cofares_overview"],
},

{
  id: "hub_casos_recomendados",
  locale: "es-ES",
  question: "¿Qué casos de estudio recomiendas ver primero?",
  answer:
    "App de socios del FC Barcelona: ejemplo de diseño orientado a impacto económico y adopción, combinando research, Lean UX y métricas reales. Cofares: creación de un Design System agnóstico a la tecnología con ROI medible y enfoque en escalabilidad. Repsol: rediseño de una plataforma interna de gran escala, centrada en productividad, arquitectura de la información y eficiencia operativa.",
  match: ["casos recomendados", "recomendados", "qué casos", "mejores casos", "proyectos clave"],
  searchText:
    "Casos recomendados: App de socios del FC Barcelona (impacto económico y adopción, research, Lean UX y métricas reales). Cofares (Design System agnóstico a la tecnología con ROI medible y enfoque en escalabilidad). Repsol (rediseño de plataforma interna de gran escala centrada en productividad, arquitectura de información y eficiencia operativa).",
  followupIds: ["cs_fcb_socios_contexto_problema", "cs_cofares_contexto_problema", "cs_repsol_contexto_problema"],
},

{
  id: "hub_contenidos_destacados",
  locale: "es-ES",
  question: "¿Qué contenidos destacados hay además de los case studies?",
  answer:
    "Además de los case studies, el portfolio incluye mi visión sobre liderazgo, metodologías de trabajo, diseño end to end, sistemas de diseño y colaboración con equipos. Estos contenidos ayudan a entender no solo qué he hecho, sino cómo pienso, cómo tomo decisiones y cómo aporto valor más allá de la ejecución visual.",
  match: ["contenidos destacados", "qué más hay", "además de casos", "liderazgo", "metodologías", "proceso"],
  searchText:
    "Contenidos destacados: además de case studies, el portfolio incluye visión sobre liderazgo, metodologías de trabajo, diseño end to end, sistemas de diseño y colaboración con equipos. Ayuda a entender no solo qué hice, sino cómo pienso, cómo tomo decisiones y cómo aporto valor más allá de la ejecución visual.",
  followupIds: ["ls_vision_general", "mt_dt_cuando_usarlo", "pd_discovery_qual"],
},

/* =========================
     UI / ENTRYPOINTS (antes presets)
  ========================= */


{
  id: "ui_help_navigation",
  locale: "es-ES",
  question: "¿Cómo funciona este asistente?",
  answer:
    "Puedes preguntarme por proyectos, liderazgo, metodología, proceso, design systems o impacto. Si prefieres, puedo guiarte paso a paso.",
  match: [
    "que puedo preguntarte",
    "qué puedo preguntarte",
    "ayuda",
    "help",
    "como funciona",
    "cómo funciona",
  ],
  searchText:
    "Ayuda y navegación. Cómo funciona el asistente. Qué puedo preguntar. Proyectos, liderazgo, metodología, proceso, design systems, impacto. Guía paso a paso.",
  followupIds: [
    "hub_por_donde_empezar",
    "hub_casos_recomendados",
    "hub_contenidos_destacados",
  ],
},

{
  id: "ui_portfolio_entrypoint",
  locale: "es-ES",
  question: "¿Qué puedo encontrar en tu portfolio?",
  answer:
    "Mi portfolio se estructura en casos de estudio y contenidos transversales (proceso, liderazgo, sistemas de diseño e impacto).",
  match: [
    "portfolio",
    "portafolio",
    "ver portfolio",
    "ver trabajos",
    "ver proyectos",
    "casos",
    "case studies",
  ],
  searchText:
    "Entrada portfolio. Estructura del portfolio. Casos de estudio y contenidos transversales. Proceso, liderazgo, sistemas de diseño e impacto.",
  followupIds: [
    "hub_casos_recomendados",
    "hub_resumen_portfolio",
    "hub_contenidos_destacados",
  ],
},

{
  id: "ui_projects_entrypoint",
  locale: "es-ES",
  question: "¿En qué proyectos has trabajado?",
  answer:
    "A lo largo de mi carrera, he liderado el diseño de proyectos de alta complejidad tanto en entornos B2B como B2C. Esta experiencia me ha permitido entender desde las necesidades operativas y técnicas de una empresa, hasta el comportamiento emocional de los consumidores finales. Si te interesa, podemos profundizar en los retos específicos y las soluciones aplicadas en cada caso.",
  match: [
    "proyectos",
    "casos de estudio",
    "case studies",
    "clientes",
    "trabajos",
  ],
  searchText:
    "Entrada proyectos. Casos de estudio. Clientes. Trabajos. Contextos B2B y B2C. Explorar casos al detalle.",
  followupIds: [
    "cs_repsol_overview",
    "cs_fcb_overview",
    "cs_cofares_overview",
  ],
},

{
  id: "ui_profile_entrypoint",
  locale: "es-ES",
  question: "¿Qué puedes contarme sobre ti?",
  answer:
    "¿Qué te gustaría saber? Puedo contarte sobre sobre mi perfil, trayectoria y enfoque profesional.",
  match: [
    "perfil",
    "quien eres",
    "quién eres",
    "sobre ti",
    "háblame de ti",
    "hablame de ti",
    "experiencia",
    "trayectoria",
  ],
  searchText:
    "Entrada perfil. Quién eres. Sobre ti. Experiencia. Trayectoria profesional. Enfoque profesional.",
  followupIds: [
    "pr_resumen_rol_actual",
    "pr_resumen_anos_experiencia",
    "pr_resumen_tipo_productos",
  ],
},

{
  id: "ui_thanks",
  locale: "es-ES",
  question: "Gracias",
  answer:
    "¡Gracias a ti! Si quieres seguir explorando, dime qué área te interesa.",
  match: ["gracias", "muchas gracias", "thank you", "thanks", "thx"],
  searchText:
    "Cierre. Agradecimiento. Continuar explorando el portfolio. Elegir área: proyectos, proceso, liderazgo, design systems, impacto.",
  followupIds: [
    "hub_casos_recomendados",
    "hub_por_donde_empezar",
    "hub_contenidos_destacados",
  ],
},

]