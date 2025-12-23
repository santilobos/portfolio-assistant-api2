"use client"

import * as React from "react"

import styles from "./page.module.css"

import localFont from "next/font/local"

export const dynamic = "force-dynamic"

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
  const hasText = input.trim().length > 0

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

function ChatHeader({
  onReset,
  onClose,
}: {
  onReset: () => void
  onClose: () => void
}) {
  const [open, setOpen] = React.useState(false)
  const btnRef = React.useRef<HTMLButtonElement | null>(null)
  const cardRef = React.useRef<HTMLDivElement | null>(null)

  // click fuera + ESC
  React.useEffect(() => {
    if (!open) return

    const onDown = (e: PointerEvent) => {
      const t = e.target as Node
      if (cardRef.current?.contains(t)) return
      if (btnRef.current?.contains(t)) return
      setOpen(false)
    }

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false)
    }

    document.addEventListener("pointerdown", onDown, true)
    window.addEventListener("keydown", onKey)
    return () => {
      document.removeEventListener("pointerdown", onDown, true)
      window.removeEventListener("keydown", onKey)
    }
  }, [open])

  // posición del popover anclado al botón
  const [pos, setPos] = React.useState({ top: 56, left: 0, width: 520 })

  React.useEffect(() => {
    if (!open) return

    const update = () => {
      const rect = btnRef.current?.getBoundingClientRect()
      const vw = window.innerWidth
      const pad = 16
      const width = Math.min(520, vw - pad * 2)

      const idealLeft = rect ? rect.left + rect.width / 2 : vw / 2
      const minLeft = pad + width / 2
      const maxLeft = vw - pad - width / 2
      const left = Math.max(minLeft, Math.min(maxLeft, idealLeft))

      const top = rect ? rect.bottom + 10 : 56
      setPos({ top, left, width })
    }

    update()
    window.addEventListener("resize", update)
    window.addEventListener("scroll", update, true)
    return () => {
      window.removeEventListener("resize", update)
      window.removeEventListener("scroll", update, true)
    }
  }, [open])

  return (
    <>
      <div
        style={{
          position: "sticky",
          top: 0,
          zIndex: 50,
          background: "#fff",
          borderBottom: "1px solid rgba(0,0,0,0.08)",
          padding: "14px 16px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ fontWeight: 700, letterSpacing: 0.5 }}>CHAT LLM</div>

          <button
            ref={btnRef}
            onClick={() => setOpen((v) => !v)}
            aria-label="Info"
            style={{
              width: 32,
              height: 32,
              borderRadius: 999,
              border: "1px solid rgba(0,0,0,0.12)",
              background: "#fff",
              display: "grid",
              placeItems: "center",
              cursor: "pointer",
              font: "inherit",
              color: "rgba(0,0,0,0.65)",
            }}
          >
            i
          </button>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <button
            onClick={onReset}
            aria-label="Reset"
            style={{
              width: 32,
              height: 32,
              borderRadius: 999,
              border: "1px solid rgba(0,0,0,0.12)",
              background: "#fff",
              display: "grid",
              placeItems: "center",
              cursor: "pointer",
              font: "inherit",
              color: "rgba(0,0,0,0.65)",
            }}
          >
            ↻
          </button>

          <button
            onClick={onClose}
            aria-label="Close"
            style={{
              width: 32,
              height: 32,
              borderRadius: 999,
              border: "1px solid rgba(0,0,0,0.12)",
              background: "#fff",
              display: "grid",
              placeItems: "center",
              cursor: "pointer",
              font: "inherit",
              color: "rgba(0,0,0,0.65)",
            }}
          >
            ✕
          </button>
        </div>
      </div>

      {open && (
        <>
          {/* backdrop invisible para detectar click fuera */}
          <div
            style={{
              position: "fixed",
              inset: 0,
              zIndex: 9998,
              background: "transparent",
            }}
          />

          <div
            ref={cardRef}
            style={{
              position: "fixed",
              top: pos.top,
              left: pos.left,
              transform: "translateX(-50%)",
              width: pos.width,
              zIndex: 9999,
              background: "#F3F6FA",
              border: "1px solid rgba(0,0,0,0.10)",
              borderRadius: 14,
              padding: 14,
              boxShadow: "0 10px 30px rgba(0,0,0,0.12)",
              color: "rgba(0,0,0,0.65)",
              lineHeight: 1.4,
              font: "inherit",
              writingMode: "horizontal-tb",
            }}
          >
            ChatLLM is an AI chatbot. May contain hallucinations. Responses are
            logged for research and development purposes.
          </div>
        </>
      )}
    </>
  )
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

setMessages((prev) => [
  ...prev,
  { role: "user", content: q },
  { role: "assistant", content: "" },
])


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
       <ChatHeader
      onReset={() => {
        setMessages([])
        setInput("")
        setLoading(false)
      }}
      onClose={() => {
        // le pide a Framer que cierre el panel
        window.parent?.postMessage({ type: "CHAT_REQUEST_CLOSE" }, "*")
      }}
    />
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
    <div className={`${styles.assistantText} ${styles.assistantTyping}`}>
  {m.content}
</div>



    {/* Follow-up questions SOLO bajo la última respuesta */}
    {isLastAssistant && !loading && (
  <>
    <div className={styles.divider} />

    <div className={styles.followUps}>
      {followUps.map(q => (
        <button
          key={q}
          onClick={() => send(q)}
          className={styles.followUpBtn}
        >
          ↳ {q}
        </button>
      ))}
    </div>
  </>
)}


  </div>
)

})}


  {/* 👇 Intro pegado abajo cuando aún no hay conversación */}
  {messages.length <= 1 && (
  <div className={styles.intro}>
    <div className={styles.assistantRow}>
      <div className={styles.chatTitle}>
        Hey, what would you like to know?
      </div>
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
  disabled={loading || !hasText}
  className={`${styles.sendBtn} ${hasText ? styles.sendBtnActive : ""}`}
  aria-label="Send"
>
  <svg
    className={styles.sendIcon}
    width="24"
    height="24"
    viewBox="0 0 960 960"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    <path
      d="M120 760v-240l320-80-320-80V120l760 320-760 320Z"
      fill="currentColor"
    />
  </svg>
</button>




        </div>
      </div>
    </div>
  )
}


