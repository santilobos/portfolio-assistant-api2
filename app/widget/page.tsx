"use client"

import * as React from "react"
import { motion, Variants, AnimatePresence } from "framer-motion"
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

// --- 1. VARIANTES DE ANIMACIÓN ---
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
    <img src={src} alt={alt} width={18} height={18} style={{ display: "block" }} />
  )
}

function ChatHeader({ onReset, onClose }: { onReset: () => void; onClose: () => void }) {
  const [open, setOpen] = React.useState(false)
  const btnRef = React.useRef<HTMLButtonElement | null>(null)
  
  return (
    <div style={{
      height: 56, 
      position: "sticky", 
      top: 0, 
      zIndex: 50, 
      background: "#ffffff",
      borderBottom: "1px solid rgba(198, 209, 221, 1)", 
      padding: "0 16px",
      display: "flex", 
      alignItems: "center", 
      justifyContent: "space-between", 
      boxSizing: "border-box",
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10, position: "relative" }}>
        {/* Mantenemos fontWeight 400 pero aseguramos color negro puro y nitidez */}
        <div style={{ 
          fontSize: "0.9rem", 
          fontWeight: 400, 
          color: "#000000", 
          letterSpacing: 0.5, 
          fontFamily: azeret.style.fontFamily,
          WebkitFontSmoothing: "antialiased",
          MozOsxFontSmoothing: "grayscale"
        }}>
          CHATLLM
        </div>
        
        <button 
          ref={btnRef} 
          onClick={() => setOpen(!open)} 
          className="iconBtn"
        >
          <Icon src="/icons/info.svg" alt="Info" />
        </button>

        {open && (
          <>
            <div 
              style={{ position: 'fixed', inset: 0, zIndex: 60 }} 
              onClick={() => setOpen(false)} 
            />
            <div style={{
              position: "absolute",
              top: "100%",
              left: 0,
              marginTop: "8px",
              width: "240px",
              padding: "12px",
              backgroundColor: "#ffffff",
              border: "1px solid #e2e8f0",
              borderRadius: "8px",
              boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
              zIndex: 70,
              fontSize: "0.75rem",
              lineHeight: "1.4",
              color: "#000000", 
            }}>
              <strong style={{ fontWeight: 700 }}>CHATLLM</strong> is an AI chatbot. May contain hallucinations. Responses are logged for research and development purposes.
            </div>
          </>
        )}
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <button onClick={onReset} className="iconBtn">
          <Icon src="/icons/reset.svg" alt="Reset" />
        </button>
        <button 
          onClick={() => {
            if (typeof window !== "undefined") {
              window.parent.postMessage("close-widget", "*");
            }
            onClose();
          }} 
          className="iconBtn"
        >
          <Icon src="/icons/close.svg" alt="Close" />
        </button>
      </div>
    </div>
  )
}

// --- 3. COMPONENTE PRINCIPAL ---

type Msg = { role: "user" | "assistant"; content: string }

export default function Widget() {
  const [messages, setMessages] = React.useState<Msg[]>([])
  const [input, setInput] = React.useState("")
  const [loading, setLoading] = React.useState(false)
  const [introKey, setIntroKey] = React.useState(0)
  
  // Estado para las preguntas sugeridas dinámicas
  const [dynamicFollowUps, setDynamicFollowUps] = React.useState<string[]>([])

  const hasText = input.trim().length > 0
  const listRef = React.useRef<HTMLDivElement | null>(null)
  const typingIntervalRef = React.useRef<ReturnType<typeof setInterval> | null>(null)

  // CORRECCIÓN DEL ERROR: Tipado explícito para evitar el error en onFocus
  const handleFocus = (e: React.FocusEvent<HTMLTextAreaElement>) => {
    e.stopPropagation();
    const target = e.target; // Referencia local para los timeouts
    const doScroll = () => {
        target.scrollIntoView({ behavior: "smooth", block: "center" });
        window.scrollTo({ top: target.offsetTop - 50, behavior: 'smooth' });
    };
    setTimeout(doScroll, 100);
    setTimeout(doScroll, 500); 
  };

  React.useEffect(() => {
    if ('scrollRestoration' in window.history) {
        window.history.scrollRestoration = 'manual';
    }

    if (typeof window !== "undefined") {
      const isMobile = window.innerWidth <= 768;
      if (isMobile) {
        document.documentElement.style.overflow = "hidden";
        document.documentElement.style.overscrollBehavior = "none";
        document.body.style.overflow = "hidden";
        document.body.style.position = "fixed";
        document.body.style.width = "100%";
        document.body.style.height = "100%";
        
        window.parent.postMessage({ type: "CHAT_OPEN_MOBILE" }, "*");
      }
    }
    return () => {
      document.documentElement.style.overflow = "auto";
      document.body.style.overflow = "auto";
      document.body.style.position = "static";
    };
  }, []);

  const typeText = (fullText: string, suggestions?: string[]) => {
    if (typingIntervalRef.current) clearInterval(typingIntervalRef.current)
    let i = 0
    typingIntervalRef.current = setInterval(() => {
      i += 2
      const chunk = fullText.slice(0, i)
      setMessages((prev) => {
        const next = [...prev]
        const last = next[next.length - 1]
        if (last && last.role === "assistant") last.content = chunk
        return next
      })
      if (i >= fullText.length) {
        if (typingIntervalRef.current) clearInterval(typingIntervalRef.current)
        setLoading(false)
        // Se activan las sugerencias al terminar de escribir para evitar el "flash" visual
        if (suggestions) setDynamicFollowUps(suggestions)
      }
    }, 15)
  }

  const handleReset = () => {
    if (typingIntervalRef.current) clearInterval(typingIntervalRef.current)
    setMessages([])
    setInput("")
    setLoading(false)
    setDynamicFollowUps([])
    setIntroKey(prev => prev + 1)
  }

  async function send(text?: string) {
    const q = (text ?? input).trim();
    if (!q || loading) return;
    
    setInput("");
    setLoading(true);
    setDynamicFollowUps([]); // Limpieza de botones previos

    const newMessages: Msg[] = [...messages, { role: "user", content: q }];
    setMessages([...newMessages, { role: "assistant", content: "" }]);
    
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: newMessages }), 
      });
      const data = await res.json();
      
      // Enviamos la respuesta y las sugerencias a la función de tipeo
      typeText(data.reply, data.suggestions);
    } catch (e) {
      setLoading(false);
      setMessages(prev => {
        const next = [...prev];
        const last = next[next.length - 1];
        if (last) last.content = "Lo siento, no pude obtener una respuesta.";
        return next;
      });
    }
  }

  React.useEffect(() => {
    if (listRef.current) {
      listRef.current.scrollTop = listRef.current.scrollHeight
    }
  }, [messages, loading])

  // Preguntas sugeridas fijas para la pantalla de inicio
  const quick = ["What projects have you worked on?", "What was your role and impact?", "How do you approach design systems?"]

  return (
    <div className={`${styles.app} ${aeonik.className}`} 
         style={{ 
           background: "#ffffff", 
           height: "100dvh", 
           display: "flex", 
           flexDirection: "column",
           overflow: "hidden", 
           overscrollBehavior: "none", 
           position: "relative"
         }}>
      
      <div style={{ touchAction: "none" }}>
        <ChatHeader 
          onReset={handleReset} 
          onClose={() => window.parent?.postMessage({ type: "CHAT_REQUEST_CLOSE" }, "*")} 
        />
      </div>

      <div ref={listRef} className={styles.messages} 
           style={{ 
             flex: 1, 
             overflowY: "auto", 
             WebkitOverflowScrolling: "touch",
             touchAction: "pan-y" 
           }}>
        <AnimatePresence mode="popLayout">
          {messages.length === 0 ? (
            <motion.div key={`intro-${introKey}`} className={styles.intro} variants={containerVariants} initial="hidden" animate="visible" exit={{ opacity: 0, y: -10 }} style={{ width: "100%" }}>
              <motion.div variants={itemVariants} className={styles.chatTitle}>Hey, what would you like to know?</motion.div>
              <div className={styles.quickGrid}>
                {quick.map(q => (
                  <motion.button key={q} variants={itemVariants} onClick={() => send(q)} className={styles.quickBtn}>{q}</motion.button>
                ))}
              </div>
            </motion.div>
          ) : (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ width: "100%", display: "flex", flexDirection: "column", gap: "32px", marginTop: "auto", paddingBottom: "20px" }}>
              {messages.map((m, i) => {
                const isLastAssistant = m.role === "assistant" && i === messages.length - 1
                if (m.role === "user") return <div key={i} className={styles.userRow}><div className={styles.userBubble}>{m.content}</div></div>
                if (m.content === "" && loading && isLastAssistant) return <div key={i} className={styles.assistantRow}><div className={styles.thinking}>thinking…</div></div>
                return (
                  <div key={i} className={styles.assistantRow}>
                    <div className={styles.assistantText}>{m.content}</div>
                    {isLastAssistant && !loading && dynamicFollowUps.length > 0 && (
                      <motion.div variants={containerVariants} initial="hidden" animate="visible" className={styles.followUpsContainer}>
                        <div className={styles.divider} />
                        <div className={styles.followUps}>
                          {dynamicFollowUps.map(q => (
                            <motion.button key={q} variants={itemVariants} onClick={() => send(q)} className={styles.followUpBtn}>↳ {q}</motion.button>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </div>
                )
              })}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div style={{ 
        padding: "14px", 
        paddingBottom: "calc(env(safe-area-inset-bottom) + 14px)", 
        borderTop: "1px solid rgba(0,0,0,0.12)", 
        background: "#ffffff",
        touchAction: "none"
      }}>
        <div style={{ display: "flex", gap: 10, alignItems: "flex-end", background: "#ffffff", border: "1px solid rgba(0,0,0,0.15)", borderRadius: 6, padding: "10px 12px" }}>
          <textarea 
            value={input} 
            onChange={e => {
              setInput(e.target.value);
              e.target.style.height = 'auto';
              e.target.style.height = `${e.target.scrollHeight}px`;
            }} 
            onKeyDown={e => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                send();
              }
            }} 
            onFocus={handleFocus}
            onTouchStart={(e) => e.stopPropagation()}
            placeholder="Ask about me…" 
            rows={1}
            style={{ 
              flex: 1, 
              border: "none", 
              outline: "none", 
              fontSize: "16px", 
              padding: "8px 0",
              background: "transparent",
              resize: "none",
              maxHeight: "150px",
              fontFamily: "inherit",
              lineHeight: "1.4",
              overflowY: "auto"
            }} 
          />
          <button 
            onClick={() => send()} 
            disabled={loading || !hasText} 
            className={`${styles.sendBtn} ${hasText ? styles.sendBtnActive : ""}`}
            style={{ marginBottom: "4px" }}
          >
            <svg width="24" height="24" viewBox="0 0 960 960" fill="currentColor"><path d="M120 760v-240l320-80-320-80V120l760 320-760 320Z"/></svg>
          </button>
        </div>
      </div>
    </div>
  )
}