import OpenAI from "openai"
import {
  BASE_SYSTEM_PROMPT,
  FAQ_PRESETS,
  FAQ_GRAPH,
  SAFE_FOLLOWUP_POOLS,
} from "../../lib/constants"

type ChatBody = {
  messages: Array<{ role: "user" | "assistant" | "system"; content: string }>
  locale?: "es-ES" | "en-US"
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
 * PRESETS:
 * - Triggers 1 palabra: boundaries
 * - Triggers frase: includes normalizado
 */
function matchPreset(userText: string, locale: "es-ES" | "en-US") {
  const t = normalize(userText)

  for (const p of FAQ_PRESETS) {
    if (p.locale !== locale) continue

    for (const trig of p.triggers) {
      const trigNorm = normalize(trig)
      const isSingleWord = trigNorm.split(/\s+/).length === 1

      if (isSingleWord) {
        const re = new RegExp(
          `(^|\\s|[¡!¿?.,;:()"'“”‘’\\-])${escapeRegExp(trigNorm)}($|\\s|[¡!¿?.,;:()"'“”‘’\\-])`,
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


/**
 * GRAPH:
 * 1) exact match (botón)
 * 2) soft match simple (por si el user copia/pega la pregunta)
 */
function matchGraph(userText: string, locale: "es-ES" | "en-US") {
  const t = normalize(userText)

  const exact = FAQ_GRAPH.find(
    (n) => n.locale === locale && normalize(n.question) === t
  )
  if (exact) return exact

  const candidates = FAQ_GRAPH.filter((n) => n.locale === locale)
  let best: typeof candidates[number] | null = null
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

function mapFollowupIdsToQuestions(ids: string[], locale: "es-ES" | "en-US") {
  const out: string[] = []
  for (const id of ids) {
    const node = FAQ_GRAPH.find((n) => n.id === id && n.locale === locale)
    if (node) out.push(node.question)
  }
  return out
}

function ensureThreeFollowups(
  followups: string[],
  fallbackPool: readonly string[]
) {
  const cleaned = (followups || [])
    .map((s) => (s || "").trim())
    .filter(Boolean)

  const unique: string[] = []
  for (const f of cleaned) {
    if (!unique.includes(f)) unique.push(f)
  }

  // prioridad: fallbackPool
  for (const f of fallbackPool) {
    if (unique.length >= 3) break
    if (!unique.includes(f)) unique.push(f)
  }

  // último fallback: safe general
  for (const f of SAFE_FOLLOWUP_POOLS.general) {
    if (unique.length >= 3) break
    if (!unique.includes(f)) unique.push(f)
  }

  return unique.slice(0, 3)
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

// Cache en memoria por locale (en server runtime)
const embeddingCache: Record<
  string,
  { ids: string[]; vectors: Vec[]; nodes: typeof FAQ_GRAPH }
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

async function ensureGraphEmbeddings(locale: "es-ES" | "en-US") {
  if (embeddingCache[locale]) return embeddingCache[locale]

  const nodes = FAQ_GRAPH.filter((n) => n.locale === locale)
  const texts = nodes.map((n) => buildSearchText(n))

  const res = await client.embeddings.create({
    model: "text-embedding-3-small",
    input: texts,
  })

  const vectors = res.data.map((d) => d.embedding as Vec)
  const ids = nodes.map((n) => n.id)

  embeddingCache[locale] = { ids, vectors, nodes: nodes as any }
  return embeddingCache[locale]
}

/**
 * Retrieve best match por cosine similarity sobre searchText embeddings.
 * threshold evita devolver “cualquier cosa”.
 */
async function semanticRetrieveNode(
  userText: string,
  locale: "es-ES" | "en-US",
  opts?: { topK?: number; threshold?: number }
) {
  const threshold = opts?.threshold ?? 0.3

  const query = userText.trim()
  if (!query) return null

  const { vectors, nodes } = await ensureGraphEmbeddings(locale)
  const qVec = await embedText(query)

  const scored = nodes.map((n, i) => ({
    node: n,
    score: cosineSim(qVec, vectors[i]),
  }))

  scored.sort((a, b) => b.score - a.score)
  const best = scored[0]
  if (!best || best.score < threshold) return null

  return best.node
}

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as ChatBody
    const locale = body.locale ?? "es-ES"
    const messages = body.messages ?? []
    const lastUser =
      [...messages].reverse().find((m) => m.role === "user")?.content ?? ""

    // 1) PRESETS (triggers duros)
    const preset = matchPreset(lastUser, locale)
    if (preset) {
      const followups = ensureThreeFollowups(
        preset.followups ?? [],
        SAFE_FOLLOWUP_POOLS.general
      )
      const res: ChatResponse = { reply: preset.answer, followups }
      return Response.json(res)
    }

    // 2) GRAPH (botones / exact / soft)
    const node = matchGraph(lastUser, locale)
    if (node) {
      const fromIds = node.followupIds
        ? mapFollowupIdsToQuestions(node.followupIds, locale)
        : []

      const followups = ensureThreeFollowups(fromIds, SAFE_FOLLOWUP_POOLS.general)

      return Response.json({
        reply: node.answer,
        followups,
      })
    }

  
    // 4) EMBEDDINGS RETRIEVAL
    const retrieved = await semanticRetrieveNode(lastUser, locale, {
      threshold: 0.3,
    })

    if (retrieved) {
      const fromIds = retrieved.followupIds
        ? mapFollowupIdsToQuestions(retrieved.followupIds, locale)
        : []

      const followups = ensureThreeFollowups(fromIds, SAFE_FOLLOWUP_POOLS.general)

      return Response.json({
        reply: retrieved.answer,
        followups,
      })
    }

    // 5) LLM (último fallback)
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

    const followups = ensureThreeFollowups(
      parsed.followups ?? [],
      SAFE_FOLLOWUP_POOLS.general
    )

    const res: ChatResponse = {
      reply: (parsed.reply ?? "").toString(),
      followups,
    }
    return Response.json(res)
  } catch (err: any) {
    return Response.json(
      {
        reply:
          "He tenido un problema técnico procesando tu mensaje. ¿Puedes repetirlo de otra forma?",
        followups: ensureThreeFollowups([], SAFE_FOLLOWUP_POOLS.general),
      },
      { status: 500 }
    )
  }
}
