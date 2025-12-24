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
  
  const hasText = input.trim().length > 0
  const listRef = React.useRef<HTMLDivElement | null>(null)
  const typingIntervalRef = React.useRef<ReturnType<typeof setInterval> | null>(null)

React.useEffect(() => {
  if (typeof window !== "undefined") {
    const isMobile = window.innerWidth <= 768;
    if (isMobile) {
      // Bloquea el scroll del sitio de fondo por completo
      document.documentElement.style.overflow = "hidden";
      document.body.style.overflow = "hidden";
      document.body.style.position = "fixed";
      document.body.style.width = "100%";
      
      window.parent.postMessage({ type: "CHAT_OPEN_MOBILE" }, "*");
    }
  }
  return () => {
    document.documentElement.style.overflow = "auto";
    document.body.style.overflow = "auto";
    document.body.style.position = "static";
  };
}, []);

  // Función de escritura integrada
  const typeText = (fullText: string) => {
    if (typingIntervalRef.current) clearInterval(typingIntervalRef.current)
    
    let i = 0
    typingIntervalRef.current = setInterval(() => {
      i += 2
      const chunk = fullText.slice(0, i)
      
      setMessages((prev) => {
        const next = [...prev]
        const last = next[next.length - 1]
        if (last && last.role === "assistant") {
          last.content = chunk
        }
        return next
      })

      if (i >= fullText.length) {
        if (typingIntervalRef.current) clearInterval(typingIntervalRef.current)
        setLoading(false)
      }
    }, 15)
  }

  const handleReset = () => {
    if (typingIntervalRef.current) clearInterval(typingIntervalRef.current)
    setMessages([])
    setInput("")
    setLoading(false)
    setIntroKey(prev => prev + 1)
  }

  async function send(text?: string) {
  const q = (text ?? input).trim();
  if (!q || loading) return;
  
  setInput("");
  setLoading(true);
  
  const newMessages: Msg[] = [...messages, { role: "user", content: q }];
  setMessages([...newMessages, { role: "assistant", content: "" }]);
  
  try {
    const res = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ messages: newMessages }), 
    });

    if (!res.ok) throw new Error("Error en la comunicación con el servidor");

    const data = await res.json();
    console.log("Datos recibidos:", data);

    // CAMBIO CLAVE: Tu API devuelve la respuesta en la propiedad 'reply'
    const assistantReply = data.reply;

    if (!assistantReply) {
      console.error("No se encontró la propiedad 'reply' en:", data);
      throw new Error("Formato de respuesta incorrecto");
    }
    
    // Iniciamos la animación de escritura con el texto real
    typeText(assistantReply);

  } catch (e) {
    console.error("Error detallado:", e);
    setLoading(false);
    setMessages(prev => {
      const next = [...prev];
      const last = next[next.length - 1];
      if (last) last.content = "Lo siento, no pude obtener una respuesta.";
      return next;
    });
  }
}

  const quick = ["What projects have you worked on?", "What was your role and impact?", "How do you approach design systems?"]
  const followUps = ["What makes your design approach unique?", "How do you approach product strategy?", "What technologies do you use?"]

  React.useEffect(() => {
    if (listRef.current) {
      listRef.current.scrollTop = listRef.current.scrollHeight
    }
  }, [messages, loading])

  return (
    <div className={`${styles.app} ${aeonik.className}`}>
      <ChatHeader 
        onReset={handleReset} 
        onClose={() => window.parent?.postMessage({ type: "CHAT_REQUEST_CLOSE" }, "*")} 
      />

      <div ref={listRef} className={styles.messages}>
  <AnimatePresence mode="wait">
    {messages.length === 0 ? (
      <motion.div 
        key={`intro-${introKey}`} 
        className={styles.intro} 
        variants={containerVariants} 
        initial="hidden" 
        animate="visible"
        exit={{ opacity: 0, y: -10 }}
        style={{ width: "100%" }} 
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
    ) : (
      <motion.div 
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  style={{ 
    width: "100%", 
    display: "flex", 
    flexDirection: "column", 
    gap: "32px", // Aumentamos el espacio entre pregunta y respuesta
    marginTop: "auto",
    paddingBottom: "20px" 
  }}
>
        {messages.map((m, i) => {
          const isLastAssistant = m.role === "assistant" && i === messages.length - 1
          
          if (m.role === "user") {
            return (
              <div key={i} className={styles.userRow}>
                <div className={styles.userBubble}>{m.content}</div>
              </div>
            )
          }

          if (m.content === "" && loading && isLastAssistant) {
            return (
              <div key={i} className={styles.assistantRow}>
                {/* Fix de carga móvil: evita el salto visual (Flash) */}
                <div className={styles.thinking} style={{ minHeight: '24px', display: 'flex', alignItems: 'center' }}>
                  thinking…
                </div>
              </div>
            )
          }

          return (
            <div key={i} className={styles.assistantRow}>
              <div className={styles.assistantText}>{m.content}</div>
              {isLastAssistant && !loading && m.content !== "" && (
                <motion.div 
                  variants={containerVariants} 
                  initial="hidden" 
                  animate="visible" 
                  className={styles.followUpsContainer}
                >
                  <div className={styles.divider} />
                  <div className={styles.followUps}>
                    {followUps.map(q => (
                      <motion.button 
                        key={q} 
                        variants={itemVariants} 
                        onClick={() => send(q)} 
                        className={styles.followUpBtn}
                      >
                        ↳ {q}
                      </motion.button>
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

      {/* ÁREA DE INPUT: Añadimos padding inferior para el área segura de móviles */}
      <div style={{ 
        padding: "14px 14px 24px 14px", 
        paddingBottom: "calc(env(safe-area-inset-bottom) + 14px)", 
        borderTop: "1px solid rgba(0,0,0,0.12)",
        background: "#fff" 
      }}>
        <div style={{ 
          display: "flex", 
          gap: 10, 
          alignItems: "center", 
          background: "#fff", 
          border: "1px solid rgba(0,0,0,0.15)", 
          borderRadius: 6, 
          padding: "10px 12px" 
        }}>
          <input 
            value={input} 
            onChange={e => setInput(e.target.value)} 
            onKeyDown={e => e.key === "Enter" && send()} 
            placeholder="Ask about me…" 
            style={{ 
              flex: 1, 
              border: "none", 
              outline: "none", 
              fontSize: "16px", 
              padding: "8px 0"
            }} 
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