import OpenAI from "openai"
import { BASE_SYSTEM_PROMPT, KNOWLEDGE, FAQ_PRESETS } from "../../lib/constants"

// Configuramos el cliente de OpenAI con la Gateway de Helicone
const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  baseURL: "https://ai-gateway.helicone.ai/v1",
  defaultHeaders: {
    "Helicone-Auth": `Bearer ${process.env.HELICONE_API_KEY}`,
  },
})

export const runtime = "edge"

/* =========================
   Helpers
   ========================= */
function normalizeText(s: string) {
  return (s || "").trim().toLowerCase()
}

function matchFaqPreset(userText: string) {
  const t = normalizeText(userText)
  const candidates = FAQ_PRESETS.filter((p) => p.locale === "es-ES")
  for (const p of candidates) {
    if (p.triggers.some((tr) => t.includes(normalizeText(tr)))) return p
  }
  return null
}

function formatFaqReply(answer: string, followups?: string[]) {
  if (!followups || followups.length === 0) return answer.trim()
  const lines = followups.slice(0, 3).map((q) => `↳ ${q}`)
  return `${answer.trim()}\n\n###\n${lines.join("\n")}`.trim()
}

/**
 * Normaliza la salida del modelo al contrato del widget:
 * - main + (opcional) "###" + followups "↳ ..."
 * - bullets a <div class="bulletLine">• <strong>Concepto:</strong> Texto</div>
 */
function normalizeAssistantOutput(raw: string) {
  const text = (raw || "").trim()
  if (!text) return ""

  const [mainRaw, followRaw] = text.split("###", 2)

  // 1) Normaliza bullets
  const lines = (mainRaw || "").split("\n")

  const normalizedMain = lines
    .map((line) => line.trim())
    .filter((line) => line.length > 0)
    .map((line) => {
      // Si ya viene con bulletLine, lo respetamos
      if (line.includes('class="bulletLine"')) return line

      // Detecta bullets tipo "• " o "- "
      const m = line.match(/^([•\-])\s+(.*)$/)
      if (!m) return line

      const body = m[2].trim()

      // Si ya trae <strong> al inicio, lo envolvemos
      if (body.startsWith("<strong>")) {
        return `<div class="bulletLine">• ${body}</div>`
      }

      // Si es "Concepto: resto", convierte a <strong>Concepto:</strong>
      const parts = body.split(":")
      if (parts.length >= 2) {
        const head = parts.shift()?.trim() || ""
        const rest = parts.join(":").trim()
        if (head) {
          return `<div class="bulletLine">• <strong>${head}:</strong> ${rest}</div>`
        }
      }

      // Si no hay ":", bullet sin strong
      return `<div class="bulletLine">• ${body}</div>`
    })
    .join("\n")

  // 2) Normaliza followups
  const normalizedFollowups = followRaw
    ? followRaw
        .split("\n")
        .map((s) => s.trim())
        .filter((s) => s.startsWith("↳"))
        .slice(0, 3)
        .join("\n")
    : ""

  return normalizedFollowups
    ? `${normalizedMain}\n\n###\n${normalizedFollowups}`.trim()
    : normalizedMain.trim()
}

/* =========================
   Route handler
   ========================= */
export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => ({}))
    const incoming = body.messages || []

    const lastUser =
      incoming
        .slice()
        .reverse()
        .find((m: any) => m.role === "user")?.content || "Pregunta no encontrada"

    // 1) Atajo FAQ Home (sin LLM)
    const preset = matchFaqPreset(lastUser)
    if (preset) {
      const raw = formatFaqReply(preset.answer, preset.followups)
      return Response.json({ reply: normalizeAssistantOutput(raw) })
    }

    // 2) LLM con knowledge inyectado
    const completion = await client.chat.completions.create(
      {
        model: "gpt-4o-mini",
        messages: [
          { role: "system", content: BASE_SYSTEM_PROMPT },
          {
            role: "system",
            content:
              "KNOWLEDGE (fuente de verdad; no inventes fuera de esto):\n" +
              JSON.stringify(KNOWLEDGE),
          },
          ...incoming,
        ],
        temperature: 0.3,
      },
      {
        headers: {
          "Helicone-Property-User-Question": lastUser,
        },
      } as any
    )

    const raw = completion.choices[0]?.message?.content?.trim() ?? ""
    return Response.json({ reply: normalizeAssistantOutput(raw) })
  } catch (error) {
    console.error("Error en el servidor:", error)
    return Response.json({ error: "Failed to fetch" }, { status: 500 })
  }
}
