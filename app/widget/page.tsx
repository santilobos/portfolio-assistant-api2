"use client"

import * as React from "react"
import styles from "./page.module.css"

import { Azeret_Mono } from "next/font/google"
import localFont from "next/font/local"

export const dynamic = "force-dynamic"

const azeret = Azeret_Mono({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
})

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
  const [isOpen, setIsOpen] = React.useState(false) // ⬅️ pon false luego
  const hasText = input.trim().length > 0

  const listRef = React.useRef<HTMLDivElement | null>(null)
  const typingIntervalRef = React.useRef<number | null>(null)

  React.useEffect(() => {
  if (!isOpen) return
  const prev = document.documentElement.style.overflow
  document.documentElement.style.overflow = "hidden"
  return () => {
    document.documentElement.style.overflow = prev
  }
}, [isOpen])


  /* ===============================
     Escuchar mensajes desde Framer
  =============================== */
  React.useEffect(() => {
    const onMsg = (e: MessageEvent) => {
      if (!e?.data) return
      if (e.data.type === "CHAT_OPEN") setIsOpen(true)
      if (e.data.type === "CHAT_CLOSE") setIsOpen(false)
      if (e.data.type === "CHAT_TOGGLE") setIsOpen((v) => !v)
    }
    window.addEventListener("message", onMsg)
    return () => window.removeEventListener("message", onMsg)
  }, [])

  /* ===============================
     Autoscroll
  =============================== */
  React.useEffect(() => {
    if (!listRef.current) return
    listRef.current.scrollTop = listRef.current.scrollHeight
  }, [messages, loading])

  /* ===============================
     Cleanup typing
  =============================== */
  React.useEffect(() => {
    return () => {
      if (typingIntervalRef.current)
        window.clearInterval(typingIntervalRef.current)
    }
  }, [])

  /* ===============================
     Typing effect
  =============================== */
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
          next[next.length - 1] = {
            ...last,
            content: fullText.slice(0, i),
          }
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

  /* ===============================
     Send message
  =============================== */
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
      typeAssistantMessage(answer)
    } catch {
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
    "What technologies do you use?",
  ]

  /* ===============================
     HEADER
  =============================== */
  function ChatHeader({
    onReset,
    onClose,
  }: {
    onReset: () => void
    onClose: () => void
  }) {
    return (
      <div
        style={{
          height: 56,
          position: "sticky",
          top: 0,
          zIndex: 50,
          background: "#fff",
          borderBottom: "1px solid rgba(198,209,221,1)",
          padding: "0 16px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          fontFamily: azeret.style.fontFamily,
        }}
      >
        <div>CHATLLM</div>
        <button onClick={onReset}>Reset</button>
        <button onClick={onClose}>Close</button>
      </div>
    )
  }

  /* ===============================
     RENDER
  =============================== */

  return (
  <div
    className={`${styles.app} ${aeonik.className} ${
      isOpen ? styles.appOn : styles.appOff
    }`}
  >
    <ChatHeader
      onReset={() => {
        setMessages([])
        setInput("")
        setLoading(false)
      }}
      onClose={() => {
        window.parent?.postMessage({ type: "CHAT_REQUEST_CLOSE" }, "*")
      }}
    />

    {/* Messages */}
    <div ref={listRef} className={styles.messages}>
      {messages.map((m, i) => {
        const isLast = m.role === "assistant" && i === messages.length - 1

        if (m.role === "user") {
          return (
            <div key={i} className={styles.userRow}>
              <div className={styles.userBubble}>{m.content}</div>
            </div>
          )
        }

        if (m.content === "" && loading) {
          return (
            <div key={i} className={styles.assistantRow}>
              <span className={styles.thinking}>thinking…</span>
            </div>
          )
        }

        return (
          <div key={i} className={styles.assistantRow}>
            <div className={styles.assistantText}>{m.content}</div>

            {isLast && !loading && (
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

      {messages.length <= 1 && (
        <div className={styles.intro}>
          <div className={styles.chatTitle}>
            Hey, what would you like to know?
          </div>
          <div className={styles.quickGrid}>
            {quick.map((q) => (
              <button
                key={q}
                onClick={() => send(q)}
                className={styles.quickBtn}
              >
                {q}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>

    {/* Input */}
    <div style={{ padding: 14, borderTop: "1px solid rgba(0,0,0,0.12)" }}>
      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && send()}
        placeholder="Ask about me…"
      />
      <button onClick={() => send()} disabled={loading || !hasText}>
        Send
      </button>
    </div>
  </div>
)
}