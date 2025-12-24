"use client"

import * as React from "react"
import { motion, Variants } from "framer-motion"
import styles from "./page.module.css"
import { Azeret_Mono } from "next/font/google"
import localFont from "next/font/local"

const azeret = Azeret_Mono({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
})

const aeonik = localFont({
  src: "../fonts/AeonikPro-Regular.woff",
  weight: "400",
  style: "normal",
})

// --- 1. VARIANTES PARA EL EFECTO RACHEL CHEN ---
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
}

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 15 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } 
  },
}

// --- 2. COMPONENTES AUXILIARES ---

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
      <div style={{
        height: 56, position: "sticky", top: 0, zIndex: 50, background: "#fff",
        borderBottom: "1px solid rgba(198,209,221,100)", padding: "0 16px",
        display: "flex", alignItems: "center", justifyContent: "space-between", boxSizing: "border-box",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, fontFamily: azeret.style.fontFamily }}>
          <div style={{ fontSize: "0.9rem", fontWeight: 400, letterSpacing: 0.5 }}>CHATLLM</div>
          <button ref={btnRef} onClick={() => setOpen(v => !v)} style={{ ...iconBtnBase, color: "rgba(0,0,0,0.45)" }} {...withHover()}>
            <Icon src="/icons/info.svg" alt="Info" />
          </button>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <button onClick={onReset} style={{ ...iconBtnBase, color: "#000" }} {...withHover("rgba(0,0,0,0.08)")}>
            <Icon src="/icons/reset.svg" alt="Reset" />
          </button>
          <button onClick={onClose} style={{ ...iconBtnBase, color: "#000" }} {...withHover("rgba(0,0,0,0.08)")}>
            <Icon src="/icons/close.svg" alt="Close" />
          </button>
        </div>
      </div>
      {open && (
        <div ref={cardRef} style={{
          position: "fixed", top: pos.top, left: pos.left, transform: "translateX(-50%)",
          width: pos.width, zIndex: 9999, background: "#F3F6FA", border: "1px solid rgba(0,0,0,0.08)",
          borderRadius: 4, padding: "14px 16px", boxShadow: "0px 1px 2px rgba(0,0,0,0.06)",
          fontFamily: azeret.style.fontFamily, fontSize: "0.85rem", color: "rgba(0,0,0,0.65)",
        }}>
          ChatLLM is an AI chatbot. May contain hallucinations. Responses are logged for research and development purposes.
        </div>
      )}
    </>
  )
}

// --- 3. COMPONENTE PRINCIPAL WIDGET ---

type Msg = { role: "user" | "assistant"; content: string }

export default function Widget() {
  const [messages, setMessages] = React.useState<Msg[]>([])
  const [input, setInput] = React.useState("")
  const [loading, setLoading] = React.useState(false)
  const [introKey, setIntroKey] = React.useState(0) // Clave para reiniciar animación
  
  const hasText = input.trim().length > 0
  const listRef = React.useRef<HTMLDivElement | null>(null)
  const typingIntervalRef = React.useRef<number | null>(null)

  function typeAssistantMessage(fullText: string) {
    if (typingIntervalRef.current) window.clearInterval(typingIntervalRef.current)
    let i = 0
    typingIntervalRef.current = window.setInterval(() => {
      i += 2
      setMessages((prev) => {
        const next = [...prev]
        const last = next[next.length - 1]
        if (last?.role === "assistant") next[next.length - 1] = { ...last, content: fullText.slice(0, i) }
        return next
      })
      if (i >= fullText.length) {
        if (typingIntervalRef.current) window.clearInterval(typingIntervalRef.current)
        setLoading(false)
      }
    }, 10)
  }

  const handleReset = () => {
    setMessages([]);
    setInput("");
    setLoading(false);
    setIntroKey(prev => prev + 1); // Incrementamos la key para forzar re-animación
  };

  async function send(text?: string) {
    const q = (text ?? input).trim()
    if (!q || loading) return
    setInput("")
    setLoading(true)
    setMessages(prev => [...prev, { role: "user", content: q }, { role: "assistant", content: "" }])
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: q }),
      })
      const data = await res.json()
      typeAssistantMessage(data.answer ?? data.text ?? "")
    } catch (e) {
      typeAssistantMessage("Sorry, something went wrong.")
    }
  }

  const quick = ["What projects have you worked on?", "What was your role and impact?", "How do you approach design systems?"]
  const followUps = ["What makes your design approach unique?", "How do you approach product strategy?", "What technologies do you use?"]

  React.useEffect(() => {
    if (listRef.current) listRef.current.scrollTop = listRef.current.scrollHeight
  }, [messages, loading])

  return (
    <div className={`${styles.app} ${aeonik.className}`}>
      <ChatHeader 
        onReset={handleReset} 
        onClose={() => window.parent?.postMessage({ type: "CHAT_REQUEST_CLOSE" }, "*")} 
      />

      <div ref={listRef} className={styles.messages}>
        {messages.map((m, i) => {
          const isLastAssistant = m.role === "assistant" && i === messages.length - 1
          if (m.role === "user") return <div key={i} className={styles.userRow}><div className={styles.userBubble}>{m.content}</div></div>
          if (m.content === "" && loading) return <div key={i} className={styles.assistantRow}><div className={styles.thinking}>thinking…</div></div>

          return (
            <div key={i} className={styles.assistantRow}>
              <div className={styles.assistantText}>{m.content}</div>
              {isLastAssistant && !loading && (
                <motion.div variants={containerVariants} initial="hidden" animate="visible" className={styles.followUpsContainer}>
                  <div className={styles.divider} />
                  <div className={styles.followUps}>
                    {followUps.map(q => (
                      <motion.button key={q} variants={itemVariants} onClick={() => send(q)} className={styles.followUpBtn}>
                        ↳ {q}
                      </motion.button>
                    ))}
                  </div>
                </motion.div>
              )}
            </div>
          )
        })}

        {messages.length === 0 && (
          <motion.div 
            key={introKey} // <--- Key dinámica para reiniciar animación
            className={styles.intro} 
            variants={containerVariants} 
            initial="hidden" 
            animate="visible"
          >
            <motion.div variants={itemVariants} className={styles.chatTitle}>
              Hey, what would you like to know?
            </motion.div>
            <div className={styles.quickGrid}>
              {quick.map(q => (
                <motion.button key={q} variants={itemVariants} onClick={() => send(q)} className={styles.quickBtn}>
                  {q}
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}
      </div>

      <div style={{ padding: 14, borderTop: "1px solid rgba(0,0,0,0.12)" }}>
        <div style={{ display: "flex", gap: 10, alignItems: "center", background: "#fff", border: "1px solid rgba(0,0,0,0.15)", borderRadius: 6, padding: "10px 12px" }}>
          <input 
            value={input} 
            onChange={e => setInput(e.target.value)} 
            onKeyDown={e => e.key === "Enter" && send()} 
            placeholder="Ask about me…" 
            style={{ flex: 1, border: "none", outline: "none", fontSize: 14 }} 
          />
          <button 
            onClick={() => send()} 
            disabled={loading || !hasText} 
            className={`${styles.sendBtn} ${hasText ? styles.sendBtnActive : ""}`}
          >
            <svg width="24" height="24" viewBox="0 0 960 960" fill="currentColor">
              <path d="M120 760v-240l320-80-320-80V120l760 320-760 320Z"/>
            </svg>
          </button>
        </div>
      </div>
    </div>
  )
}