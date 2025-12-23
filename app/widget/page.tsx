"use client"

export const dynamic = "force-dynamic"

import * as React from "react"
import styles from "./page.module.css"
import localFont from "next/font/local"
import { Azeret_Mono } from "next/font/google"

const aeonik = localFont({
  src: "../fonts/AeonikPro-Regular.woff",
  weight: "400",
  style: "normal",
})

const azeret = Azeret_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
})

type Msg = { role: "user" | "assistant"; content: string }

function Icon({ src, alt }: { src: string; alt: string }) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt={alt}
      width={24}
      height={24}
      style={{ width: 24, height: 24, display: "block" }}
      draggable={false}
    />
  )
}

/** hover simple sin CSS extra */
function withHover(bgHover: string) {
  return {
    onMouseEnter: (e: React.MouseEvent<HTMLElement>) => {
      ;(e.currentTarget as HTMLElement).style.background = bgHover
    },
    onMouseLeave: (e: React.MouseEvent<HTMLElement>) => {
      ;(e.currentTarget as HTMLElement).style.background = "transparent"
    },
  }
}

export default function Widget() {
  const [messages, setMessages] = React.useState<Msg[]>([])
  const [input, setInput] = React.useState("")
  const [loading, setLoading] = React.useState(false)
  const hasText = input.trim().length > 0

  const listRef = React.useRef<HTMLDivElement | null>(null)
  const typingIntervalRef = React.useRef<number | null>(null)

  // Popover info
  const [infoOpen, setInfoOpen] = React.useState(false)

  // ✅ MOBILE: altura real (teclado) dentro de iframe
  React.useEffect(() => {
    const setAppHeight = () => {
      const vv = window.visualViewport
      const h = Math.round(vv?.height ?? window.innerHeight)
      document.documentElement.style.setProperty("--app-height", `${h}px`)
    }

    setAppHeight()

    window.visualViewport?.addEventListener("resize", setAppHeight)
    window.visualViewport?.addEventListener("scroll", setAppHeight)
    window.addEventListener("resize", setAppHeight)
    window.addEventListener("orientationchange", setAppHeight)
    window.addEventListener("focusin", setAppHeight)
    window.addEventListener("focusout", setAppHeight)

    return () => {
      window.visualViewport?.removeEventListener("resize", setAppHeight)
      window.visualViewport?.removeEventListener("scroll", setAppHeight)
      window.removeEventListener("resize", setAppHeight)
      window.removeEventListener("orientationchange", setAppHeight)
      window.removeEventListener("focusin", setAppHeight)
      window.removeEventListener("focusout", setAppHeight)
    }
  }, [])

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

    setInfoOpen(false)
    setInput("")
    setLoading(true)

    // 1) user
    setMessages((prev) => [...prev, { role: "user", content: q }])
    // 2) assistant placeholder
    setMessages((prev) => [...prev, { role: "assistant", content: "" }])

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: q }),
      })

      const data = await res.json()
      const answer = data.answer ?? data.text ?? data.reply ?? ""
      typeAssistantMessage(answer || "—")
    } catch (e) {
      typeAssistantMessage("Sorry, something went wrong.")
    }
  }

  function resetChat() {
    setInfoOpen(false)
    setLoading(false)
    setInput("")
    setMessages([])
  }

  function requestClose() {
    // 🔑 esto lo escucha Framer y cierra el panel
    window.parent?.postMessage({ type: "CHAT_REQUEST_CLOSE" }, "*")
    setInfoOpen(false)
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

  // Styles inline del header (sin pelearte con CSS modules)
  const headerH = 56
  const headerDivider = "rgba(0,0,0,0.12)"

  const iconBtnBase: React.CSSProperties = {
    width: 40,
    height: 40,
    display: "grid",
    placeItems: "center",
    border: "none",
    outline: "none",
    background: "transparent",
    borderRadius: 999,
    padding: 0,
    cursor: "pointer",
    WebkitTapHighlightColor: "transparent",
  }

  const iconMuted: React.CSSProperties = { opacity: 0.55 }
  const iconAction: React.CSSProperties = { opacity: 1 }

  return (
    <div className={`${styles.app} ${aeonik.className}`}>
      {/* HEADER */}
      <div
        style={{
          height: headerH,
          minHeight: headerH,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 10px 0 14px",
          background: "#fff",
          borderBottom: `1px solid ${headerDivider}`,
          position: "sticky",
          top: 0,
          zIndex: 20,
          fontFamily: azeret.style.fontFamily,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ fontSize: 14, fontWeight: 500, letterSpacing: 0.6 }}>
            CHATLLM
          </div>

          <button
            type="button"
            aria-label="Info"
            onClick={() => setInfoOpen((v) => !v)}
            style={{ ...iconBtnBase, ...iconMuted }}
            {...withHover("rgba(0,0,0,0.06)")}
          >
            <Icon src="/icons/info.svg" alt="Info" />
          </button>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
          <button
            type="button"
            aria-label="Reset"
            onClick={resetChat}
            style={{ ...iconBtnBase, ...iconAction }}
            {...withHover("rgba(0,0,0,0.08)")}
          >
            <Icon src="/icons/reset.svg" alt="Reset" />
          </button>

          <button
            type="button"
            aria-label="Close"
            onClick={requestClose}
            style={{ ...iconBtnBase, ...iconAction }}
            {...withHover("rgba(0,0,0,0.08)")}
          >
            <Icon src="/icons/close.svg" alt="Close" />
          </button>
        </div>

        {/* POPOVER */}
        {infoOpen && (
          <>
            {/* Backdrop */}
            <button
              type="button"
              aria-label="Close info"
              onClick={() => setInfoOpen(false)}
              style={{
                position: "fixed",
                inset: 0,
                background: "transparent",
                border: "none",
                zIndex: 30,
              }}
            />
            {/* Card */}
            <div
              style={{
                position: "absolute",
                right: 12,
                top: headerH + 8,
                width: 310,
                background: "#fff",
                borderRadius: 12,
                border: "1px solid rgba(0,0,0,0.10)",
                boxShadow: "0 6px 16px rgba(0,0,0,0.10)",
                padding: 12,
                zIndex: 40,
                fontFamily: azeret.style.fontFamily,
                fontSize: 12,
                lineHeight: 1.35,
                color: "rgba(0,0,0,0.72)",
              }}
            >
              CHATLLM is an AI chatbot. May contain hallucinations. Responses are logged
              for research and development purposes.
            </div>
          </>
        )}
      </div>

      {/* MESSAGES */}
      <div ref={listRef} className={styles.messages}>
        {messages.map((m, i) => {
          const isLastAssistant = m.role === "assistant" && i === messages.length - 1

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

              {isLastAssistant && !loading && (
                <>
                  <div className={styles.divider} />

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
                </>
              )}
            </div>
          )
        })}

        {/* Intro cuando no hay conversación */}
        {messages.length <= 1 && (
          <div className={styles.intro}>
            <div className={styles.assistantRow}>
              <div className={styles.chatTitle}>Hey, what would you like to know?</div>
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

      {/* INPUT */}
      <div
        style={{
          padding: 14,
          paddingBottom: `calc(14px + env(safe-area-inset-bottom))`,
          borderTop: "1px solid rgba(0,0,0,0.12)",
          background: "#fff",
        }}
      >
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
            onFocus={() =>
              setTimeout(() => listRef.current?.scrollTo(0, listRef.current.scrollHeight), 50)
            }
            placeholder="Ask about me…"
            style={{
              flex: 1,
              border: "none",
              outline: "none",
              fontSize: 16, // 👈 importante en iOS para evitar zoom
              fontFamily: aeonik.style.fontFamily,
              background: "transparent",
            }}
          />

          <button
            onClick={() => send()}
            disabled={loading || !hasText}
            className={`${styles.sendBtn} ${hasText ? styles.sendBtnActive : ""}`}
            aria-label="Send"
            type="button"
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


