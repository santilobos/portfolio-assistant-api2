import OpenAI from "openai"
import {
  BASE_SYSTEM_PROMPT,
  FAQ_GRAPH,
  SAFE_FOLLOWUP_POOLS,
} from "../../lib/constants"

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

/* =========================
   NORMALIZERS
   ========================= */

function stripAccents(s: string) {
  return s.normalize("NFD").replace(/[\u0300-\u036f]/g, "")
}

function normalizeQuestion(s: string) {
  return stripAccents(s)
    .toLowerCase()
    .replace(/\s+/g, " ")
    .replace(/[¡!¿?.,;:()"'“”‘’\[\]{}<>/\\|@#%^&*_+=~`-]/g, "")
    .trim()
}

function filterFollowupsToGraph(
  followups: string[],
  locale: Locale
): string[] {
  const allowed = new Set(
    FAQ_GRAPH
      .filter((n) => n.locale === locale)
      .map((n) => normalizeQuestion(n.question))
      .concat(
        SAFE_FOLLOWUP_POOLS.general.map((q) => normalizeQuestion(q))
      )
  )

  return (followups || []).filter((q) =>
    allowed.has(normalizeQuestion(q))
  )
}


/* =========================
   ANSWERED-QUESTIONS DETECTOR
   (marca como “ya preguntado” si el user incluyó una
    pregunta del graph (question o match) dentro del texto)
   ========================= */

type GraphNode = (typeof FAQ_GRAPH)[number]

const answeredKeyCache: Record<Locale, string[] | undefined> = {
  "es-ES": undefined,
  "en-US": undefined,
}

function getAnswerKeysForLocale(locale: Locale) {
  if (answeredKeyCache[locale]) return answeredKeyCache[locale]!

  const keys: string[] = []
  for (const n of FAQ_GRAPH) {
    if (n.locale !== locale) continue

    const qKey = normalizeQuestion(n.question)
    if (qKey) keys.push(qKey)

    if (n.match?.length) {
      for (const m of n.match) {
        const mKey = normalizeQuestion(m)
        if (mKey) keys.push(mKey)
      }
    }
  }

  // unique
  answeredKeyCache[locale] = Array.from(new Set(keys))
  return answeredKeyCache[locale]!
}

function extractAnsweredQuestions(
  messages: Array<{ role: "user" | "assistant" | "system"; content: string }>,
  locale: Locale
): Set<string> {
  const keys = getAnswerKeysForLocale(locale)
  const answered = new Set<string>()

  for (const m of messages) {
    if (m.role !== "user") continue
    const t = normalizeQuestion(m.content)
    if (!t) continue

    for (const k of keys) {
      // evita micro-matches tipo “rol”
      if (k.length < 8) continue
      if (t.includes(k)) answered.add(k)
    }
  }

  return answered
}

/* =========================
   GRAPH INDEX (cache)
   ========================= */

const graphIndexCache: Record<Locale, Record<string, GraphNode> | undefined> = {
  "es-ES": undefined,
  "en-US": undefined,
}

/**
 * GRAPH:
 * 1) exact match determinista por question
 * 2) exact match determinista por match[]
 * 3) soft match seguro: solo si hay 1 candidato claro
 */
function matchGraph(userText: string, locale: Locale): GraphNode | null {
  const t = normalizeQuestion(userText)
  if (!t) return null

  if (!graphIndexCache[locale]) {
    const idx: Record<string, GraphNode> = {}

    for (const n of FAQ_GRAPH) {
      if (n.locale !== locale) continue

      const qKey = normalizeQuestion(n.question)
      if (qKey) idx[qKey] = n

      if (n.match?.length) {
        for (const m of n.match) {
          const mKey = normalizeQuestion(m)
          if (mKey && !idx[mKey]) idx[mKey] = n
        }
      }
    }

    graphIndexCache[locale] = idx
  }

  const exact = graphIndexCache[locale]![t]
  if (exact) return exact

  const candidates = FAQ_GRAPH
    .filter((n) => n.locale === locale)
    .filter((n) => {
      const q = normalizeQuestion(n.question)
      if (q.length < 10) return false
      return q.includes(t) || t.includes(q)
    })

  if (candidates.length === 1) return candidates[0]
  return null
}

function mapFollowupIdsToQuestions(ids: string[], locale: Locale) {
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

  for (const f of fallbackPool) {
    if (unique.length >= 3) break
    if (!unique.includes(f)) unique.push(f)
  }

  for (const f of SAFE_FOLLOWUP_POOLS.general) {
    if (unique.length >= 3) break
    if (!unique.includes(f)) unique.push(f)
  }

  return unique.slice(0, 3)
}

/* =========================
   EMBEDDINGS RETRIEVAL (cache)
   ========================= */

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

const embeddingCache: Record<
  Locale,
  { vectors: Vec[]; nodes: GraphNode[] } | undefined
> = {
  "es-ES": undefined,
  "en-US": undefined,
}

async function embedText(input: string): Promise<Vec> {
  const res = await client.embeddings.create({
    model: "text-embedding-3-small",
    input,
  })
  return res.data[0]?.embedding as Vec
}

function buildSearchText(n: GraphNode) {
  const st = (n.searchText ?? "").trim()
  const q = (n.question ?? "").trim()
  return [st, q].filter(Boolean).join(" ").trim()
}

async function ensureGraphEmbeddings(locale: Locale) {
  if (embeddingCache[locale]) return embeddingCache[locale]!

  const nodes = FAQ_GRAPH.filter((n) => n.locale === locale)
  const texts = nodes.map((n) => buildSearchText(n))

  const res = await client.embeddings.create({
    model: "text-embedding-3-small",
    input: texts,
  })

  const vectors = res.data.map((d) => d.embedding as Vec)
  embeddingCache[locale] = { vectors, nodes }
  return embeddingCache[locale]!
}

async function semanticRetrieveTopKWithScore(
  userText: string,
  locale: Locale,
  opts?: { threshold?: number; topK?: number }
) {
  const threshold = opts?.threshold ?? 0.3
  const topK = opts?.topK ?? 3

  const query = userText.trim()
  if (!query) return []

  const { vectors, nodes } = await ensureGraphEmbeddings(locale)
  const qVec = await embedText(query)

  const scored = nodes.map((n, i) => ({
    node: n,
    score: cosineSim(qVec, vectors[i]),
  }))

  scored.sort((a, b) => b.score - a.score)
  return scored.filter((x) => x.score >= threshold).slice(0, topK)
}

async function semanticRetrieveTopKNodes(
  userText: string,
  locale: Locale,
  opts?: { threshold?: number; topK?: number }
) {
  const threshold = opts?.threshold ?? 0.28
  const topK = opts?.topK ?? 6
  const query = userText.trim()
  if (!query) return []

  const { vectors, nodes } = await ensureGraphEmbeddings(locale)
  const qVec = await embedText(query)

  const scored = nodes
    .map((n, i) => ({ node: n, score: cosineSim(qVec, vectors[i]) }))
    .sort((a, b) => b.score - a.score)

  return scored.filter((x) => x.score >= threshold).slice(0, topK).map((x) => x.node)
}

function buildLLMContextFromNodes(nodes: GraphNode[]) {
  return nodes
    .map((n) => {
      const q = (n.question ?? "").trim()
      const a = (n.answer ?? "").trim()
      const st = (n.searchText ?? "").trim()
      return `- Q: ${q}\n  A: ${a}\n  Keywords: ${st}`
    })
    .join("\n\n")
}

/* =========================
   INTENT HINTS (muy simple)
   ========================= */

function inferIntentHint(userText: string) {
  const t = normalizeQuestion(userText)

  // intención “opinión/experiencia”
  const isExperience =
    t.includes("experiencia") ||
    t.includes("que tal") ||
    t.includes("como fue") ||
    t.includes("fue buena") ||
    t.includes("fue mala") ||
    t.includes("te gusto") ||
    t.includes("te gustó")

  if (isExperience) {
    return (
      "Si el usuario pregunta por experiencia (qué tal / cómo fue trabajar), " +
      "responde con una valoración breve (positiva/retadora) y luego sustenta con hechos del contexto."
    )
  }

  return (
    "Ajusta la respuesta a la intención real de la pregunta. " +
    "Si el usuario pide un resumen, resume. Si pide detalles, entra al detalle."
  )
}

/* =========================
   ROUTE
   ========================= */

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as ChatBody
    const locale: Locale = body.locale ?? "es-ES"
    const messages = body.messages ?? []

    const lastUser =
      [...messages].reverse().find((m) => m.role === "user")?.content ?? ""

    // Guard: input vacío
    if (!lastUser.trim()) {
      return Response.json({
        reply:
          "¿Qué te gustaría explorar del portfolio: proyectos, proceso, design systems o impacto?",
        followups: ensureThreeFollowups([], SAFE_FOLLOWUP_POOLS.general),
      })
    }

    // ✅ Importante: aquí asumo que extractAnsweredQuestions devuelve Set<string>
    const answered = extractAnsweredQuestions(messages, locale)

    const filterAlreadyAnswered = (qs: string[]) =>
      (qs || []).filter((q) => !answered.has(normalizeQuestion(q)))

    // 1) GRAPH (determinista)
    const node = matchGraph(lastUser, locale)
    if (node) {
      const fromIds = node.followupIds
        ? mapFollowupIdsToQuestions(node.followupIds, locale)
        : []

      const followups = ensureThreeFollowups(
        filterAlreadyAnswered(fromIds),
        SAFE_FOLLOWUP_POOLS.general
      )

      return Response.json({ reply: node.answer, followups })
    }

    // 2) EMBEDDINGS → RAG-lite con LLM (ajuste de intención)
    const retrievedList = await semanticRetrieveTopKWithScore(lastUser, locale, {
      threshold: 0.3,
      topK: 3,
    })

    if (retrievedList.length) {
      const top = retrievedList[0].node

      // followups "guiados" del nodo top (siempre preferibles)
      const fromIds = top.followupIds
        ? mapFollowupIdsToQuestions(top.followupIds, locale)
        : []

      // ✅ followups deterministas del nodo, filtrados por "ya preguntado"
      const followups = ensureThreeFollowups(
        filterAlreadyAnswered(fromIds),
        SAFE_FOLLOWUP_POOLS.general
      )

      const context = retrievedList
        .map(
          (r, i) =>
            `# Nodo ${i + 1} (score ${r.score.toFixed(3)})\n` +
            `Q: ${r.node.question}\n` +
            `A: ${r.node.answer}\n` +
            `Search: ${r.node.searchText}\n`
        )
        .join("\n")

      const completion = await client.chat.completions.create({
        model: "gpt-4o-mini",
        temperature: 0.25,
        messages: [
          { role: "system", content: BASE_SYSTEM_PROMPT },
          {
            role: "system",
            content:
              "CONTEXTO (fuente de verdad). Usa SOLO esta información. " +
              "No inventes datos fuera de este contexto.\n\n" +
              context,
          },
          {
            role: "system",
            content: "REGLA DE INTENCIÓN: " + inferIntentHint(lastUser),
          },
          {
            role: "user",
            content:
              `Pregunta del usuario: ${lastUser}\n\n` +
              `Devuelve JSON válido con:\n` +
              `{ "reply": "...", "followups": [] }`,
          },
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

      // ✅ Blindaje: solo followups que existan en graph o safe pools
      const safeFollowups = filterFollowupsToGraph(parsed.followups ?? [], locale)
      const filteredSafe = filterAlreadyAnswered(safeFollowups)

      // ⚠️ En RAG-lite, mantenemos followups deterministas del nodo (los de arriba).
      // Si quieres que el LLM pueda proponer followups (pero filtrados), usa:
      // const followups = ensureThreeFollowups(filteredSafe, SAFE_FOLLOWUP_POOLS.general)

      return Response.json({
        reply: (parsed.reply ?? "").toString(),
        followups,
      })
    }

    // 3) LLM fallback ANCLADO A GRAPH
    const ctxNodes = await semanticRetrieveTopKNodes(lastUser, locale, {
      topK: 6,
      threshold: 0.28,
    })

    const CONTEXTO =
      ctxNodes.length > 0
        ? `CONTEXTO (extraído de mi portfolio):\n${buildLLMContextFromNodes(ctxNodes)}`
        : `CONTEXTO (extraído de mi portfolio):\n- No se ha encontrado un nodo suficientemente relevante.`

    const completion = await client.chat.completions.create({
      model: "gpt-4o-mini",
      temperature: 0.2,
      messages: [
        { role: "system", content: BASE_SYSTEM_PROMPT },
        { role: "system", content: CONTEXTO },
        { role: "system", content: "REGLA DE INTENCIÓN: " + inferIntentHint(lastUser) },
        ...messages.map((m) => ({
          role: m.role as "user" | "assistant" | "system",
          content: m.content,
        })),
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

    // ✅ Blindaje + no repetir ya respondidas
    const safeFollowups = filterFollowupsToGraph(parsed.followups ?? [], locale)
    const filteredSafe = filterAlreadyAnswered(safeFollowups)

    const followups = ensureThreeFollowups(filteredSafe, SAFE_FOLLOWUP_POOLS.general)

    return Response.json({
      reply: (parsed.reply ?? "").toString(),
      followups,
    })
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
