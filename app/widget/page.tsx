"use client"

export const dynamic = "force-dynamic"

import * as React from "react"

import styles from "./page.module.css"

import localFont from "next/font/local"

const aeonik = localFont({
  src: "../fonts/AeonikPro-Regular.woff",
  weight: "400",
  style: "normal",
})


type Msg = { role: "user" | "assistant"; content: string }

export default function Widget() {
  const [messages, setMessages] = React.useState<Msg[]>([])
  const [input, setInput] = React.useState("")
  const [loading, setLoading] = React.useState(false)

  const listRef = React.useRef<HTMLDivElement | null>(null)

const typingIntervalRef = React.useRef<number | null>(null)

function typeAssistantMessage(fullText: string) {
  if (typingIntervalRef.current) {
    window.clearInterval(typingIntervalRef.current)
    typingIntervalRef.current = null
  }

  let i = 0
  const speed = 10

  typingIntervalRef.current = window.setInterval(() => {
    i += 2

    setMessages((prev) => {
      const next = [...prev]
      const last = next[next.length - 1]
      if (last?.role === "assistant") {
        next[next.length - 1] = { ...last, content: fullText.slice(0, i) }
      }
      return next
    })

    if (i >= fullText.length) {
      if (typingIntervalRef.current) {
        window.clearInterval(typingIntervalRef.current)
        typingIntervalRef.current = null
      }
      setLoading(false)
    }
  }, speed)
}

React.useEffect(() => {
  return () => {
    if (typingIntervalRef.current) window.clearInterval(typingIntervalRef.current)
  }
}, [])


  React.useEffect(() => {
    if (!listRef.current) return
    listRef.current.scrollTop = listRef.current.scrollHeight
  }, [messages, loading])

  async function send(text?: string) {
  const q = (text ?? input).trim()
  if (!q || loading) return

  setInput("")
  setLoading(true)

  // 1️⃣ mensaje del usuario
  setMessages((prev) => [...prev, { role: "user", content: q }])

  // 2️⃣ placeholder del assistant (VACÍO)
  setMessages((prev) => [...prev, { role: "assistant", content: "" }])

  try {
    const res = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: q }),
    })

    const data = await res.json()
    const answer = data.answer ?? data.text ?? data.reply ?? ""

    // 3️⃣ escribir letra a letra
    typeAssistantMessage(answer)
  } catch (e) {
    typeAssistantMessage("Sorry, something went wrong.")
  }
}


  const quick = [
    "What projects have you worked on?",
    "What was your role and impact?",
    "How do you approach design systems?",
  ]
 
  const followUps = [
  "What makes your design approach unique?",
  "How do you approach product strategy?",
  "What technologies do you use?"
]
  return (
    <div className={`${styles.app} ${aeonik.className}`}>
      {/* Messages */}
      <div ref={listRef} className={styles.messages}>
  {messages.map((m, i) => {
    const isFirstAssistant = i === 0
    const isLastAssistant = m.role === "assistant" && i === messages.length - 1


  if (m.role === "user") {
    return (
      <div key={i} className={styles.userRow}>
        <div className={styles.userBubble}>{m.content}</div>
      </div>
    )
  }

  // Si el mensaje assistant está vacío y estás cargando -> thinking…
  if (m.content === "" && loading) {
    return (
      <div key={i} className={styles.assistantRow}>
        <div className={styles.thinkingRow}>
          <span className={styles.thinking}>thinking…</span>
        </div>
      </div>
    )
  }

  return (
  <div key={i} className={styles.assistantRow}>
    <div className={isFirstAssistant ? styles.assistantText : styles.assistantTextSmall}>
      {m.content}
    </div>

    {/* Follow-up questions SOLO bajo la última respuesta */}
    {isLastAssistant && !loading && (
      <div className={styles.followUps}>
        {followUps.map((q) => (
          <button
            key={q}
            onClick={() => send(q)}
            className={styles.followUpBtn}
          >
            ↳ {q}
          </button>
        ))}
      </div>
    )}
  </div>
)

})}


  {/* 👇 Intro pegado abajo cuando aún no hay conversación */}
  {messages.length <= 1 && (
    <div className={styles.intro}>
      <div className={styles.assistantRow}>
        <div className={styles.assistantText}>Hey, what would you like to know?</div>
      </div>

      <div className={styles.quickGrid}>
        {quick.map((q) => (
          <button key={q} onClick={() => send(q)} className={styles.quickBtn}>
            {q}
          </button>
        ))}
      </div>
    </div>
  )}
</div>


      {/* Input */}
      <div style={{ padding: 14, borderTop: "1px solid rgba(0,0,0,0.12)" }}>
        <div
          style={{
            display: "flex",
            gap: 10,
            alignItems: "center",
            background: "#fff",
            border: "1px solid rgba(0,0,0,0.15)",
            borderRadius: 6,
            padding: "10px 12px",
          }}
        >
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && send()}
            placeholder="Ask about me…"
            style={{ flex: 1, border: "none", outline: "none", fontSize: 14 }}
          />
          <button
            onClick={() => send()}
            disabled={loading || input.trim().length === 0}
            style={{
              width: 36,
              height: 36,
              border: "none",
              background: "transparent",
              cursor: loading ? "not-allowed" : "pointer",
              opacity: loading ? 0.4 : 1,
              fontSize: 18,
            }}
          >
            ↑
          </button>
        </div>
      </div>
    </div>
  )
}


