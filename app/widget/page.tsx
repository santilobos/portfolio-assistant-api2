"use client"

import * as React from "react"
import { motion, Variants, AnimatePresence } from "framer-motion"
import styles from "./page.module.css"
import { Azeret_Mono } from "next/font/google"
import localFont from "next/font/local"

const azeret = Azeret_Mono({ subsets: ["latin"], weight: ["400", "600", "700"] })
const aeonik = localFont({ src: "../fonts/AeonikPro-Regular.woff", weight: "400" })

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
}

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 15 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } },
}

type Msg = { role: "user" | "assistant"; content: string }

export default function Widget() {
  const [messages, setMessages] = React.useState<Msg[]>([])
  const [input, setInput] = React.useState("")
  const [loading, setLoading] = React.useState(false)
  const listRef = React.useRef<HTMLDivElement | null>(null)

  // Auto-scroll
  React.useEffect(() => {
    if (listRef.current) listRef.current.scrollTop = listRef.current.scrollHeight
  }, [messages, loading])

  // Corrección flash loading mobile
  React.useEffect(() => {
    if (typeof window !== "undefined" && window.innerWidth <= 768) {
      document.body.style.overflow = "hidden"
      window.parent.postMessage({ type: "CHAT_OPEN_MOBILE" }, "*")
    }
  }, [])

  async function send(text?: string) {
    const q = (text ?? input).trim()
    if (!q || loading) return

    setInput("")
    setLoading(true)
    const newMessages: Msg[] = [...messages, { role: "user", content: q }]
    setMessages([...newMessages])

    try {
      // Usamos el fetch tradicional que funcionaba a las 14:14
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: newMessages }),
      })

      const data = await res.json()
      
      // Buscamos 'reply', que es lo que envía tu route.ts restaurado
      if (data.reply) {
        setMessages([...newMessages, { role: "assistant", content: data.reply }])
      }
    } catch (e) {
      console.error(e)
    } finally {
      setLoading(false)
    }
  }

  const quick = ["What projects have you worked on?", "What was your role?", "How do you approach design systems?"]

  return (
    <div className={`${styles.app} ${aeonik.className}`}>
      <div className={styles.header} style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 16px', borderBottom: '1px solid #eee' }}>
        <div style={{ fontFamily: azeret.style.fontFamily }}>CHATLLM</div>
        <button onClick={() => setMessages([])} className="iconBtn"><img src="/icons/reset.svg" width={18}/></button>
      </div>

      <div ref={listRef} className={styles.messages}>
        <AnimatePresence mode="wait">
          {messages.length === 0 ? (
            <motion.div className={styles.intro} variants={containerVariants} initial="hidden" animate="visible">
              <motion.div variants={itemVariants} className={styles.chatTitle}>Hey, what would you like to know?</motion.div>
              <div className={styles.quickGrid}>
                {quick.map(q => (
                  <motion.button key={q} variants={itemVariants} onClick={() => send(q)} className={styles.quickBtn}>
                    {q}
                  </motion.button>
                ))}
              </div>
            </motion.div>
          ) : (
            <div className={styles.messageList}>
              {messages.map((m, i) => (
                <div key={i} className={m.role === 'user' ? styles.userRow : styles.assistantRow}>
                  <div className={m.role === 'user' ? styles.userBubble : styles.assistantText}>
                    {m.content}
                  </div>
                </div>
              ))}
              {loading && <div className={styles.assistantRow}><div className={styles.thinking}>thinking…</div></div>}
            </div>
          )}
        </AnimatePresence>
      </div>

      <div className={styles.inputArea}>
        <div className={styles.inputWrapper} style={{ display: 'flex', gap: '10px', padding: '10px' }}>
          <input 
            value={input} 
            onChange={e => setInput(e.target.value)} 
            onKeyDown={e => e.key === "Enter" && send()}
            placeholder="Ask about my experience…" 
            style={{ flex: 1, border: '1px solid #ccc', borderRadius: '4px', padding: '8px' }}
          />
          <button onClick={() => send()} disabled={loading} className={styles.sendBtn}>
            <svg width="20" height="20" viewBox="0 0 960 960" fill="currentColor"><path d="M120 760v-240l320-80-320-80V120l760 320-760 320Z"/></svg>
          </button>
        </div>
      </div>
    </div>
  )
}