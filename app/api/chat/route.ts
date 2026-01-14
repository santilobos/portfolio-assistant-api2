// app/api/chat/route.ts
import OpenAI from "openai"
import { BASE_SYSTEM_PROMPT } from "../../lib/constants"

// ✅ Importa desde las fuentes reales (evita desync con constants.ts)
import { FAQ_PRESETS } from "../../lib/faq/presets"
import { FAQ_GRAPH } from "../../lib/faq/graph"
import { FAQ_ANTICIPATED } from "../../lib/faq/anticipated"

type Locale = "es-ES" | "en-US"

type ChatBody = {
  messages: Array<{ role: "user" | "assistant" | "system"; content: string }>
  locale?: Locale
}

type ChatResponse = {
  reply: string
  followups: string[]
}

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

function stripAccents(s: string) {
  return s.normalize("NFD").replace(/[\u0300-\u036f]/g, "")
}

function normalize(s: string) {
  return stripAccents(s).toLowerCase().trim()
}

function escapeRegExp(s: string) {
  return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")
}

/**
 * Match “seguro”:
 * - Triggers 1 palabra: boundaries
 * - Triggers frase: includes normalizado
 */
function matchPreset(userText: string, locale: Locale) {
  const t = normalize(userText)

  for (const p of FAQ_PRESETS) {
    if (p.locale !== locale) continue

    for (const trig of p.triggers) {
      const trigNorm = normalize(trig)
      const isSingleWord = trigNorm.split(/\s+/).length === 1

      if (isSingleWord) {
        const re = new RegExp(
          `(^|\\s|[¡!¿?.,;:()"'“”‘’\\-])${escapeRegExp(
            trigNorm
          )}($|\\s|[¡!¿?.,;:()"'“”‘’\\-])`,
          "i"
        )
        if (re.test(t)) return p
      } else {
        if (t.includes(trigNorm)) return p
      }
    }
  }

  return null
}

function matchAnticipated(userText: string, locale: Locale) {
  const t = normalize(userText)

  for (const a of FAQ_ANTICIPATED) {
    if (a.locale !== locale) continue
    for (const m of a.match) {
      const mNorm = normalize(m)
      if (mNorm.length < 3) continue
      if (t.includes(mNorm)) return a
    }
  }
  return null
}

/**
 * GRAPH:
 * 1) exact match (botón)
 * 2) soft match simple
 */
function matchGraph(userText: string, locale: Locale) {
  const t = normalize(userText)

  const exact = FAQ_GRAPH.find(
    (n: any) => n.locale === locale && normalize(n.question) === t
  )
  if (exact) return exact

  const candidates = FAQ_GRAPH.filter((n: any) => n.locale === locale)
  let best: any | null = null
  let bestScore = 0

  for (const n of candidates) {
    const q = normalize(n.question)
    if (q.length >= 10 && (t.includes(q) || q.includes(t))) {
      const score = Math.min(q.length, t.length)
      if (score > bestScore) {
        bestScore = score
        best = n
      }
    }
  }

  return best
}

function mapFollowupIdsToQuestions(ids: string[], locale: Locale) {
  const out: string[] = []
  for (const id of ids) {
    const node = FAQ_GRAPH.find((n: any) => n.id === id && n.locale === locale)
    if (node) out.push(node.question)
  }
  return out
}

/**
 * ✅ Resolver followups (strings) a preguntas reales del sistema (GRAPH/ANTICIPATED).
 * Si no hay destino, se descarta (para no sugerir rutas “rotas”).
 */
function resolveFollowupStringsToKnownQuestions(
  followups: string[],
  locale: Locale
) {
  const cleaned = (followups || [])
    .map((s) => (s || "").trim())
    .filter(Boolean)

  if (!cleaned.length) return []

  const graphNodes = FAQ_GRAPH.filter((n: any) => n.locale === locale)
  const anticipatedNodes = FAQ_ANTICIPATED.filter((a: any) => a.locale === locale)

  const out: string[] = []

  for (const f of cleaned) {
    const nf = normalize(f)

    // 1) exact contra graph.question
    const gExact = graphNodes.find((n: any) => normalize(n.question) === nf)
    if (gExact) {
      if (!out.includes(gExact.question)) out.push(gExact.question)
      continue
    }

    // 2) soft contra graph.question
    let best: any | null = null
    let bestScore = 0
    for (const n of graphNodes) {
      const q = normalize(n.question)
      if (q.length >= 10 && (nf.includes(q) || q.includes(nf))) {
        const score = Math.min(q.length, nf.length)
        if (score > bestScore) {
          bestScore = score
          best = n
        }
      }
    }
    if (best) {
      if (!out.includes(best.question)) out.push(best.question)
      continue
    }

    // 3) exact contra anticipated.question
    const aExact = anticipatedNodes.find((a: any) => normalize(a.question) === nf)
    if (aExact) {
      if (!out.includes(aExact.question)) out.push(aExact.question)
      continue
    }
  }

  return out
}

/* ===============================
   INTENT OVERRIDES (topic switch)
   =============================== */

function hasAny(t: string, arr: string[]) {
  return arr.some((k) => t.includes(normalize(k)))
}

/**
 * (1) Asegura que “proyecto más complejo” dispare PRESET.
 * Motivo: suele parecerse semánticamente a nodos de casos y los embeddings lo “secuestran”.
 */
function isMostComplexProjectIntent(userText: string, locale: Locale) {
  const t = normalize(userText)
  if (locale === "en-US") {
    return hasAny(t, [
      "most complex project",
      "hardest project",
      "most challenging project",
      "your toughest project",
      "what was your most complex project",
    ])
  }
  return hasAny(t, [
    "proyecto mas complejo",
    "proyecto más complejo",
    "proyecto mas dificil",
    "proyecto más difícil",
    "reto mas complejo",
    "reto más complejo",
    "proyecto mas desafiante",
    "proyecto más desafiante",
    "mas challenging",
    "más challenging",
  ])
}

/**
 * (2) “carrera” es ambigua (deporte vs trayectoria).
 * Aquí la forzamos a intención PROFESIONAL/ACADÉMICA (y cortamos el contexto).
 */
function isCareerOrEducationIntent(userText: string, locale: Locale) {
  const t = normalize(userText)

  if (locale === "en-US") {
    return hasAny(t, [
      "your career",
      "tell me about your career",
      "your background",
      "your education",
      "what did you study",
      "what have you studied",
      "academic background",
      "training",
    ])
  }

  return hasAny(t, [
    "cual es tu carrera",
    "cuál es tu carrera",
    "carrera profesional",
    "trayectoria",
    "cuentame tu carrera",
    "cuéntame tu carrera",
    "que has estudiado",
    "qué has estudiado",
    "que estudiaste",
    "qué estudiaste",
    "formacion",
    "formación",
    "estudios",
    "perfil profesional",
    "trayectoria profesional",
  ])
}

/**
 * Elige un nodo “ancla” del graph para carrera/educación.
 * - Primero intenta educación
 * - Si no existe, intenta resumen/portfolio o perfil profesional
 *
 * ⚠️ Ajusta estos IDs a los que realmente tengas en tu graph.
 */
function pickCareerAnchorNode(locale: Locale) {
  const preferredIds = [
    // educación
    "education_academic",
    "education_masters_specializations",
    "education_continuous_learning",

    // perfil/overview (por si no hay education en el graph)
    "profile_overview",
    "hub_resumen_portfolio",
  ]

  for (const id of preferredIds) {
    const n = (FAQ_GRAPH as any[]).find(
      (x) => x.locale === locale && x.id === id
    )
    if (n) return n
  }

  // fallback: cualquier nodo de educación si existe por tema/id pattern
  const eduLike = (FAQ_GRAPH as any[]).find(
    (x) =>
      x.locale === locale &&
      typeof x.id === "string" &&
      (x.id.startsWith("education_") || x.id.includes("education"))
  )
  if (eduLike) return eduLike

  return null
}

/* ===============================
   CONTEXT QUERY (Rachel-style)
   =============================== */

/**
 * Construye una query contextual para embeddings usando ambos:
 * - últimos turnos user + assistant (recortados)
 * - el último user completo (dentro de un límite)
 */
function buildContextQuery(messages: ChatBody["messages"], locale: Locale) {
  const maxTurns = 6 // últimos 6 mensajes (3 turnos aprox)
  const maxUserChars = 800
  const maxAssistantChars = 500
  const maxTotalChars = 2000

  const slice = (messages || []).filter(Boolean).slice(-maxTurns)

  const parts: string[] = []
  for (const m of slice) {
    const role =
      m.role === "user" ? "User" : m.role === "assistant" ? "Assistant" : "System"
    let content = (m.content || "").trim()
    if (!content) continue

    if (m.role === "user") content = content.slice(0, maxUserChars)
    if (m.role === "assistant") content = content.slice(0, maxAssistantChars)
    if (m.role === "system") continue // no metemos system en embeddings

    parts.push(`${role}: ${content}`)
  }

  // Prioriza el último user al final (anchor fuerte)
  const lastUser =
    [...(messages || [])].reverse().find((m) => m.role === "user")?.content?.trim() ??
    ""
  if (lastUser) {
    parts.push(`User (current): ${lastUser.slice(0, maxUserChars)}`)
  }

  let joined = parts.join("\n")
  if (joined.length > maxTotalChars) {
    joined = joined.slice(joined.length - maxTotalChars) // recorta por el final
  }

  // Pequeño hint de idioma (opcional, pero ayuda)
  const langHint = locale === "es-ES" ? "Language: Spanish\n" : "Language: English\n"
  return langHint + joined
}

/**
 * Query “solo última intención” (para cuando el usuario cambia de tema).
 * Evita que embeddings “secuestren” por contexto anterior.
 */
function buildLastUserOnlyQuery(messages: ChatBody["messages"], locale: Locale) {
  const lastUser =
    [...(messages || [])].reverse().find((m) => m.role === "user")?.content?.trim() ??
    ""
  const langHint = locale === "es-ES" ? "Language: Spanish\n" : "Language: English\n"
  return langHint + `User (current): ${lastUser.slice(0, 1200)}`
}

/* ===============================
   EMBEDDINGS RETRIEVAL (cache)
   =============================== */

type Vec = number[]

function dot(a: Vec, b: Vec) {
  let s = 0
  for (let i = 0; i < a.length; i++) s += a[i] * b[i]
  return s
}

function vecNorm(a: Vec) {
  return Math.sqrt(dot(a, a))
}

function cosineSim(a: Vec, b: Vec) {
  const na = vecNorm(a)
  const nb = vecNorm(b)
  if (na === 0 || nb === 0) return 0
  return dot(a, b) / (na * nb)
}

type GraphNode = (typeof FAQ_GRAPH)[number] & {
  id: string
  locale: Locale
  question: string
  answer: string
  followupIds?: string[]
  searchText?: string
}

// Cache en memoria por locale (en server runtime)
const embeddingCache: Record<
  string,
  { ids: string[]; vectors: Vec[]; nodes: GraphNode[] }
> = {}

async function embedText(input: string): Promise<Vec> {
  const res = await client.embeddings.create({
    model: "text-embedding-3-small",
    input,
  })
  return res.data[0]?.embedding as Vec
}

function buildSearchText(n: any) {
  const st = (n?.searchText as string | undefined) ?? ""
  const q = (n?.question as string | undefined) ?? ""
  const combined = [st.trim(), q.trim()].filter(Boolean).join(" ")
  return combined.trim()
}

async function ensureGraphEmbeddings(locale: Locale) {
  if (embeddingCache[locale]) return embeddingCache[locale]

  const nodes = FAQ_GRAPH.filter((n: any) => n.locale === locale) as GraphNode[]
  const texts = nodes.map((n) => buildSearchText(n)).filter(Boolean)

  // Guard: evita llamar embeddings con array vacío
  if (!texts.length) {
    embeddingCache[locale] = { ids: [], vectors: [], nodes }
    return embeddingCache[locale]
  }

  const res = await client.embeddings.create({
    model: "text-embedding-3-small",
    input: texts,
  })

  const vectors = res.data.map((d) => d.embedding as Vec)
  const ids = nodes.map((n) => n.id)

  embeddingCache[locale] = { ids, vectors, nodes }
  return embeddingCache[locale]
}

/**
 * Retrieve best node por cosine similarity sobre searchText embeddings.
 * Usa threshold para evitar devolver “cualquier cosa”.
 */
async function semanticRetrieveNode(
  queryText: string,
  locale: Locale,
  opts?: { threshold?: number }
) {
  const threshold = opts?.threshold ?? 0.34
  const query = queryText.trim()
  if (!query) return null

  const { vectors, nodes } = await ensureGraphEmbeddings(locale)
  if (!nodes.length || !vectors.length) return null

  const qVec = await embedText(query)

  let bestNode: GraphNode | null = null
  let bestScore = -1

  for (let i = 0; i < nodes.length; i++) {
    const score = cosineSim(qVec, vectors[i])
    if (score > bestScore) {
      bestScore = score
      bestNode = nodes[i]
    }
  }

  if (!bestNode || bestScore < threshold) return null
  return bestNode
}

/* ===============================
   FOLLOWUPS: SIEMPRE DESDE GRAPH
   =============================== */

/**
 * Completa hasta 3 followups usando SOLO nodos del graph.
 * - Prioriza las existingQuestions (si son del graph)
 * - Rellena con top similares por embeddings usando seedText
 * - Nunca devuelve texto “libre”
 */
async function completeFollowupsFromGraph(opts: {
  locale: Locale
  seedText: string
  existingQuestions?: string[]
  excludeNodeIds?: string[]
}) {
  const { locale, seedText } = opts
  const existing = (opts.existingQuestions ?? [])
    .map((s) => (s || "").trim())
    .filter(Boolean)

  // Mantén solo las que existan como question en graph
  const graphQuestions = new Map(
    (FAQ_GRAPH as any[])
      .filter((n) => n.locale === locale)
      .map((n) => [normalize(n.question), n.question])
  )

  const picked: string[] = []
  const pickedNorm = new Set<string>()

  for (const q of existing) {
    const nq = normalize(q)
    const real = graphQuestions.get(nq)
    if (real && !pickedNorm.has(nq)) {
      picked.push(real)
      pickedNorm.add(nq)
    }
    if (picked.length >= 3) return picked.slice(0, 3)
  }

  const { nodes, vectors } = await ensureGraphEmbeddings(locale)
  if (!nodes.length || !vectors.length) return picked.slice(0, 3)

  const exclude = new Set(opts.excludeNodeIds ?? [])

  const qVec = await embedText(seedText || "")
  const scored = nodes.map((n, i) => ({
    node: n,
    score: cosineSim(qVec, vectors[i]),
  }))

  scored.sort((a, b) => b.score - a.score)

  // Rellena con similares
  for (const s of scored) {
    if (picked.length >= 3) break
    if (exclude.has(s.node.id)) continue

    const nq = normalize(s.node.question)
    if (pickedNorm.has(nq)) continue

    picked.push(s.node.question)
    pickedNorm.add(nq)
  }

  // Si aún faltan (graph muy pequeño), rellena con lo que quede (determinista)
  if (picked.length < 3) {
    for (const n of nodes) {
      if (picked.length >= 3) break
      if (exclude.has(n.id)) continue
      const nq = normalize(n.question)
      if (pickedNorm.has(nq)) continue
      picked.push(n.question)
      pickedNorm.add(nq)
    }
  }

  return picked.slice(0, 3)
}

/* ===============================
   POST
   =============================== */

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as ChatBody
    const locale: Locale = body.locale ?? "es-ES"
    const messages = body.messages ?? []
    const lastUser =
      [...messages].reverse().find((m) => m.role === "user")?.content ?? ""

    const normalizedLastUser = normalize(lastUser)

    // Query contextual (para embeddings cuando NO hay cambio de tema)
    const contextQuery = buildContextQuery(messages, locale)

    /* =====================================================
       0) INTENT OVERRIDES (antes de todo lo demás)
       - (1) Proyecto más complejo => PRESET
       - (2) Carrera/educación => ancla educación/perfil y corta contexto
       ===================================================== */

    // (1) Asegura preset de “proyecto más complejo”
    if (isMostComplexProjectIntent(lastUser, locale)) {
      const preset = matchPreset(lastUser, locale)
      if (preset) {
        const resolved = resolveFollowupStringsToKnownQuestions(
          preset.followups ?? [],
          locale
        )
        const followups = await completeFollowupsFromGraph({
          locale,
          seedText: `${lastUser}\n${preset.answer}`.slice(0, 2000),
          existingQuestions: resolved,
        })
        const res: ChatResponse = { reply: preset.answer, followups }
        return Response.json(res)
      }
      // Si por cualquier razón no encontró preset (desync triggers),
      // seguimos con el flujo normal (no cortamos).
    }

    // (2) Carrera / educación: fuerza nodo ancla y evita “carrera = deporte”
    if (isCareerOrEducationIntent(lastUser, locale)) {
      // intenta primero: si hay preset directo para estudios/carrera
      const preset = matchPreset(lastUser, locale)
      if (preset) {
        const resolved = resolveFollowupStringsToKnownQuestions(
          preset.followups ?? [],
          locale
        )
        const followups = await completeFollowupsFromGraph({
          locale,
          seedText: `${lastUser}\n${preset.answer}`.slice(0, 2000),
          existingQuestions: resolved,
        })
        const res: ChatResponse = { reply: preset.answer, followups }
        return Response.json(res)
      }

      // si no hay preset, ancla a educación (graph) y corta contexto
      const anchor = pickCareerAnchorNode(locale)
      if (anchor) {
        const fromIds = anchor.followupIds
          ? mapFollowupIdsToQuestions(anchor.followupIds, locale)
          : []

        const followups = await completeFollowupsFromGraph({
          locale,
          seedText: `${anchor.question}\n${anchor.answer}`.slice(0, 2000),
          existingQuestions: fromIds,
          excludeNodeIds: [anchor.id],
        })

        const res: ChatResponse = { reply: anchor.answer, followups }
        return Response.json(res)
      }

      // si no hay anchor, hacemos retrieval SOLO con lastUser (sin contexto)
      const retrieved = await semanticRetrieveNode(
        buildLastUserOnlyQuery(messages, locale),
        locale,
        { threshold: 0.34 }
      )
      if (retrieved) {
        const fromIds = retrieved.followupIds
          ? mapFollowupIdsToQuestions(retrieved.followupIds, locale)
          : []

        const followups = await completeFollowupsFromGraph({
          locale,
          seedText: `${retrieved.question}\n${retrieved.answer}`.slice(0, 2000),
          existingQuestions: fromIds,
          excludeNodeIds: [retrieved.id],
        })

        const res: ChatResponse = { reply: retrieved.answer, followups }
        return Response.json(res)
      }
      // y si no, cae al flujo normal
    }

    /* =====================================================
       1) GRAPH · EXACT MATCH (clicks / followups)
       ===================================================== */
    const exactGraphNode = (FAQ_GRAPH as any[]).find(
      (n) => n.locale === locale && normalize(n.question) === normalizedLastUser
    ) as GraphNode | undefined

    if (exactGraphNode) {
      const fromIds = exactGraphNode.followupIds
        ? mapFollowupIdsToQuestions(exactGraphNode.followupIds, locale)
        : []

      const followups = await completeFollowupsFromGraph({
        locale,
        seedText: `${exactGraphNode.question}\n${exactGraphNode.answer}`.slice(0, 2000),
        existingQuestions: fromIds,
        excludeNodeIds: [exactGraphNode.id],
      })

      const res: ChatResponse = { reply: exactGraphNode.answer, followups }
      return Response.json(res)
    }

    /* =====================================================
       2) PRESETS (shortcuts genéricos)
       ===================================================== */
    const preset = matchPreset(lastUser, locale)
    if (preset) {
      const resolved = resolveFollowupStringsToKnownQuestions(
        preset.followups ?? [],
        locale
      )

      const followups = await completeFollowupsFromGraph({
        locale,
        seedText: `${lastUser}\n${preset.answer}`.slice(0, 2000),
        existingQuestions: resolved,
      })

      const res: ChatResponse = { reply: preset.answer, followups }
      return Response.json(res)
    }

    /* =====================================================
       3) ANTICIPATED (coverage)
       ===================================================== */
    const anticipated = matchAnticipated(lastUser, locale)
    if (anticipated) {
      const resolved = resolveFollowupStringsToKnownQuestions(
        anticipated.followups ?? [],
        locale
      )

      const followups = await completeFollowupsFromGraph({
        locale,
        seedText: `${anticipated.question ?? lastUser}\n${anticipated.answer}`.slice(0, 2000),
        existingQuestions: resolved,
      })

      const res: ChatResponse = { reply: anticipated.answer, followups }
      return Response.json(res)
    }

    /* =====================================================
       4) EMBEDDINGS RETRIEVAL (contextual textarea)
       ===================================================== */
    const retrieved = await semanticRetrieveNode(contextQuery, locale, {
      threshold: 0.34,
    })

    if (retrieved) {
      const fromIds = retrieved.followupIds
        ? mapFollowupIdsToQuestions(retrieved.followupIds, locale)
        : []

      const followups = await completeFollowupsFromGraph({
        locale,
        seedText: `${retrieved.question}\n${retrieved.answer}`.slice(0, 2000),
        existingQuestions: fromIds,
        excludeNodeIds: [retrieved.id],
      })

      const res: ChatResponse = { reply: retrieved.answer, followups }
      return Response.json(res)
    }

    /* =====================================================
       5) LLM FALLBACK (último recurso)
       ===================================================== */
    const completion = await client.chat.completions.create({
      model: "gpt-4o-mini",
      temperature: 0.4,
      messages: [
        { role: "system", content: BASE_SYSTEM_PROMPT },
        ...messages.map((m) => ({ role: m.role, content: m.content })),
      ],
      response_format: { type: "json_object" },
    })

    const raw = completion.choices[0]?.message?.content || "{}"
    let parsed: ChatResponse = { reply: "", followups: [] }

    try {
      parsed = JSON.parse(raw) as ChatResponse
    } catch {
      parsed = { reply: raw, followups: [] }
    }

    const followups = await completeFollowupsFromGraph({
      locale,
      seedText: contextQuery.slice(0, 2000),
      existingQuestions: resolveFollowupStringsToKnownQuestions(
        parsed.followups ?? [],
        locale
      ),
    })

    const res: ChatResponse = {
      reply: (parsed.reply ?? "").toString(),
      followups,
    }
    return Response.json(res)
  } catch {
    return Response.json(
      {
        reply:
          "He tenido un problema técnico procesando tu mensaje. ¿Puedes repetirlo de otra forma?",
        followups: (FAQ_GRAPH as any[])
          .filter((n) => n.locale === "es-ES")
          .slice(0, 3)
          .map((n) => n.question),
      },
      { status: 500 }
    )
  }
}
