"use client"

import * as React from "react"

import styles from "./page.module.css"

import { Azeret_Mono } from "next/font/google"

const azeret = Azeret_Mono({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
})


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

function Icon({ src, alt }: { src: string; alt: string }) {
  return (
    <img
      src={src}
      alt={alt}
      width={18}
      height={18}
      style={{ display: "block" }}
    />
  )
}

const iconBtnBase: React.CSSProperties = {
  width: 32,
  height: 32,
  borderRadius: 4,
  border: "none",
  background: "transparent",
  display: "grid",
  placeItems: "center",
  cursor: "pointer",
  padding: 0,
  transition: "background-color 0.15s ease",
}

const iconInfo: React.CSSProperties = {
  color: "rgba(0,0,0,0.45)", // gris
}

const iconAction: React.CSSProperties = {
  color: "#000", // negro
}



function withHover(bg = "rgba(0,0,0,0.06)") {
  return {
    onMouseEnter: (e: React.MouseEvent<HTMLButtonElement>) => {
      e.currentTarget.style.backgroundColor = bg
    },
    onMouseLeave: (e: React.MouseEvent<HTMLButtonElement>) => {
      e.currentTarget.style.backgroundColor = "transparent"
    },
  }
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
    height: 56,
    minHeight: 56,
    maxHeight: 56,
    position: "sticky",
    top: 0,
    zIndex: 50,
    background: "#fff",
    borderBottom: "1px solid rgba(198,209,221,100)",
    padding: "0 16px",              // 👈 sin padding vertical
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    boxSizing: "border-box",
  }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 10, fontFamily: azeret.style.fontFamily }}>
  <div style={{ fontSize:"0.9rem", fontWeight: 400, letterSpacing: 0.5 }}>
    CHATLLM
  </div>

  <button
  ref={btnRef}
  onClick={() => setOpen(v => !v)}
  aria-label="Info"
  style={{ ...iconBtnBase, ...iconInfo }}
  {...withHover("rgba(0,0,0,0.06)")}
>
  <Icon src="/icons/info.svg" alt="Info" />
</button>

</div>

<div style={{ display: "flex", alignItems: "center", gap: 10 }}>
  <button
  onClick={onReset}
  aria-label="Reset"
  style={{ ...iconBtnBase, ...iconAction }}
  {...withHover("rgba(0,0,0,0.08)")}
>
  <Icon src="/icons/reset.svg" alt="Reset" />
</button>


  <button
  onClick={() => {
    window.parent?.postMessage({ type: "CHAT_REQUEST_CLOSE" }, "*")
   }}
  aria-label="Close"
  style={{ ...iconBtnBase, ...iconAction }}
  {...withHover("rgba(0,0,0,0.08)")}
>
  <Icon src="/icons/close.svg" alt="Close" />
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
    border: "1px solid rgba(0,0,0,0.08)",
    borderRadius: 4,

    padding: "14px 16px",
    boxShadow: "0px 1px 2px rgba(0,0,0,0.06), 0px 2px 6px rgba(0,0,0,0.04)",
    fontFamily: azeret.style.fontFamily,
    fontSize: "0.85rem",
    lineHeight: 1.45,
    letterSpacing: 0.2,
    color: "rgba(0,0,0,0.65)",

    writingMode: "horizontal-tb",
  }}
>
  ChatLLM is an AI chatbot. May contain hallucinations. Responses are logged
  for research and development purposes.
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


