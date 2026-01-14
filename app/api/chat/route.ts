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

  const langHint = locale === "es-ES" ? "Language: Spanish\n" : "Language: English\n"
  return langHint + joined
}

/* ===============================
   TOPIC SHIFT (cambio de tema)
   =============================== */

// stopwords mínimos para overlap (no hace falta que sea perfecto)
const STOP_ES = new Set([
  "que","qué","como","cómo","cuando","cuándo","donde","dónde","por","para","con","sin","de","del","la","el","los","las",
  "un","una","unos","unas","y","o","u","a","al","en","es","son","fue","era","ser","hacer","hiciste","trabajo","proyecto",
  "me","mi","tu","tus","su","sus","se","lo","le","les","ya","pero","mas","más","muy","sobre"
])
const STOP_EN = new Set([
  "what","how","when","where","why","the","a","an","and","or","to","of","in","on","for","with","without","is","are","was",
  "were","be","been","do","did","you","your","me","my","we","our","it","this","that","as","at"
])

function tokenizeForOverlap(text: string, locale: Locale) {
  const t = normalize(text)
  const tokens = t
    .split(/[^a-z0-9áéíóúñ]+/i)
    .map((x) => x.trim())
    .filter(Boolean)
    .filter((x) => x.length >= 3)

  const stop = locale === "es-ES" ? STOP_ES : STOP_EN
  return tokens.filter((x) => !stop.has(x))
}

function jaccard(a: string[], b: string[]) {
  const A = new Set(a)
  const B = new Set(b)
  if (!A.size || !B.size) return 0
  let inter = 0
  for (const x of A) if (B.has(x)) inter++
  const union = A.size + B.size - inter
  return union ? inter / union : 0
}

/**
 * Heurística:
 * - compara el último user vs. el último assistant
 * - si overlap bajo -> probable cambio de tema
 */
function isTopicShift(messages: ChatBody["messages"], locale: Locale) {
  const lastUser =
    [...(messages || [])].reverse().find((m) => m.role === "user")?.content?.trim() ??
    ""
  const lastAssistant =
    [...(messages || [])].reverse().find((m) => m.role === "assistant")?.content?.trim() ??
    ""

  if (!lastUser) return false
  if (!lastAssistant) return false

  // si el user es muy corto, nos interesa detectar shift
  const userShort = lastUser.trim().length <= 80

  const uTok = tokenizeForOverlap(lastUser, locale)
  const aTok = tokenizeForOverlap(lastAssistant, locale)
  const overlap = jaccard(uTok, aTok)

  // overlap muy bajo + pregunta corta => shift
  if (userShort && overlap < 0.06) return true

  return false
}

/**
 * Si hay cambio de tema, usamos SOLO lastUser para embeddings (evita contaminación).
 */
function buildEmbeddingQuery(messages: ChatBody["messages"], locale: Locale) {
  const lastUser =
    [...(messages || [])].reverse().find((m) => m.role === "user")?.content?.trim() ??
    ""
  const langHint = locale === "es-ES" ? "Language: Spanish\n" : "Language: English\n"

  if (isTopicShift(messages, locale)) {
    return langHint + `User (current): ${lastUser.slice(0, 800)}`
  }

  return buildContextQuery(messages, locale)
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

function norm(a: Vec) {
  return Math.sqrt(dot(a, a))
}

function cosineSim(a: Vec, b: Vec) {
  const na = norm(a)
  const nb = norm(b)
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
   CASE OVERVIEW ROUTER
   =============================== */

/**
 * Si el usuario pregunta algo genérico sobre “qué hiciste en X / cuéntame el caso X”,
 * fuerza el nodo *_overview si existe, evitando caer en research/impact/etc.
 */
function matchCaseOverview(userText: string, locale: Locale): GraphNode | null {
  const t = normalize(userText)

  // términos típicos de overview
  const wantsOverview =
    t.includes("que hiciste") ||
    t.includes("qué hiciste") ||
    t.includes("cuentame") ||
    t.includes("cuéntame") ||
    t.includes("resumen") ||
    t.includes("de que fue") ||
    t.includes("de qué fue") ||
    t.includes("caso") ||
    t.includes("proyecto") ||
    t.includes("experiencia")

  if (!wantsOverview) return null

  // si el user está preguntando algo específico, NO forzar overview
  const isSpecific =
    t.includes("investig") ||
    t.includes("research") ||
    t.includes("metodolog") ||
    t.includes("impact") ||
    t.includes("metric") ||
    t.includes("rol") ||
    t.includes("respons") ||
    t.includes("decisi") ||
    t.includes("arquitect") ||
    t.includes("handoff") ||
    t.includes("stakeholder")

  if (isSpecific) return null

  const overviewNodes = (FAQ_GRAPH as any[])
    .filter((n) => n.locale === locale && typeof n.id === "string" && n.id.includes("_overview"))

  // intenta detectar por match/searchText/id
  for (const n of overviewNodes) {
    const idKey = normalize(String(n.id).replace(/^cs_/, "").replace(/_overview$/, ""))
    const st = normalize(String(n.searchText ?? ""))
    const q = normalize(String(n.question ?? ""))

    // señales de compañía: idKey o palabras fuertes en searchText/question
    const companyHit =
      (idKey.length >= 3 && t.includes(idKey)) ||
      (st && t.split(/\s+/).some((w) => w.length >= 4 && st.includes(w) && t.includes(w))) ||
      (q && t.split(/\s+/).some((w) => w.length >= 4 && q.includes(w) && t.includes(w)))

    if (companyHit) return n as GraphNode
  }

  return null
}

/* ===============================
   FOLLOWUPS: SIEMPRE DESDE GRAPH
   =============================== */

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

  for (const s of scored) {
    if (picked.length >= 3) break
    if (exclude.has(s.node.id)) continue

    const nq = normalize(s.node.question)
    if (pickedNorm.has(nq)) continue

    picked.push(s.node.question)
    pickedNorm.add(nq)
  }

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

    /* =====================================================
       0) CASE OVERVIEW ROUTER (antes de embeddings)
       ===================================================== */
    const forcedOverview = matchCaseOverview(lastUser, locale)
    if (forcedOverview) {
      const fromIds = forcedOverview.followupIds
        ? mapFollowupIdsToQuestions(forcedOverview.followupIds, locale)
        : []

      const followups = await completeFollowupsFromGraph({
        locale,
        seedText: `${forcedOverview.question}\n${forcedOverview.answer}`.slice(0, 2000),
        existingQuestions: fromIds,
        excludeNodeIds: [forcedOverview.id],
      })

      const res: ChatResponse = { reply: forcedOverview.answer, followups }
      return Response.json(res)
    }

    // ✅ query para embeddings: contextual o solo lastUser si hay cambio de tema
    const embeddingQuery = buildEmbeddingQuery(messages, locale)

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
       4) EMBEDDINGS RETRIEVAL
       - Usa contexto o solo lastUser si hay cambio de tema
       ===================================================== */
    const retrieved = await semanticRetrieveNode(embeddingQuery, locale, {
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
      seedText: embeddingQuery.slice(0, 2000),
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
