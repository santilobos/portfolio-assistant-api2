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

const OUT_OF_SCOPE_FOLLOWUPS = [
  "¿Quieres que te cuente un proyecto con métricas (Barça / Mediapro / Depasify)?",
  "¿Te interesa más Design Systems (tokens) o optimización de conversión (CRO)?",
  "¿Prefieres que te hable de mi proceso (discovery → delivery) o de impacto?",
] as const;

function isCompensationQuestion(q: string) {
  const t = q.toLowerCase();
  return (
    t.includes("salario") ||
    t.includes("sueldo") ||
    t.includes("cuanto cobras") ||
    t.includes("cuánto cobras") ||
    t.includes("expectativa salarial") ||
    t.includes("compensación") ||
    t.includes("remuneración") ||
    t.includes("rate") ||
    t.includes("day rate") ||
    t.includes("hourly") ||
    t.includes("salary")
  );
}

function sanitizeAssistantText(text: string) {
  return text
    // remove markdown emphasis/code
    .replace(/\*\*/g, "")
    .replace(/\*/g, "")
    .replace(/`/g, "")
    .replace(/_/g, "")

    // remove markdown headings ONLY at start of line (e.g., "### Title")
    .replace(/^\s*#{1,6}\s+/gm, "")

    // remove dash bullets at line start
    .replace(/^\s*-\s+/gm, "")

    // tidy excessive blank lines
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}



export default function Widget() {
  const [messages, setMessages] = React.useState<Msg[]>([]);
  const [input, setInput] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [introKey, setIntroKey] = React.useState(0);
  const [dynamicFollowUps, setDynamicFollowUps] = React.useState<string[]>([]);
  const [lastUserQuestion, setLastUserQuestion] = React.useState("");


  const hasText = input.trim().length > 0;
  const listRef = React.useRef<HTMLDivElement | null>(null);
  const typingIntervalRef = React.useRef<ReturnType<typeof setInterval> | null>(null);

  // Variantes para animaciones
  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 }
  };

  // Preguntas sugeridas iniciales
  const quick = [
    "¿En qué proyectos has trabajado?", 
    "¿Qué metodologías utilizas?", 
    "¿Cómo generas impacto?"
  ];

  // Auto-scroll al final
  React.useEffect(() => {
    if (listRef.current) {
      listRef.current.scrollTop = listRef.current.scrollHeight;
    }
  }, [messages, loading, dynamicFollowUps]);

// Enviar posición del mouse a Framer para el Trailing Dot
    React.useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            window.parent.postMessage({
                type: "widget-mouse-move",
                x: e.clientX,
                y: e.clientY
            }, "*");
        };

        window.addEventListener("mousemove", handleMouseMove);
        return () => window.removeEventListener("mousemove", handleMouseMove);
    }, []);

  const handleFocus = (e: React.FocusEvent<HTMLTextAreaElement>) => {
    e.stopPropagation();
    const target = e.target;
    setTimeout(() => {
      target.scrollIntoView({ behavior: "smooth", block: "center" });
    }, 100);
  };

  const typeText = (fullText: string, suggestions?: string[]) => {
    if (typingIntervalRef.current) clearInterval(typingIntervalRef.current);
    let i = 0;
    typingIntervalRef.current = setInterval(() => {
      i += 2;
      const chunk = fullText.slice(0, i);
      setMessages((prev) => {
        const next = [...prev];
        const last = next[next.length - 1];
        if (last && last.role === "assistant") last.content = chunk;
        return next;
      });
      if (i >= fullText.length) {
        if (typingIntervalRef.current) clearInterval(typingIntervalRef.current);
        setLoading(false);
        if (suggestions && suggestions.length > 0) setDynamicFollowUps(suggestions);
      }
    }, 15);
  };

  const handleReset = () => {
    if (typingIntervalRef.current) clearInterval(typingIntervalRef.current);
    setMessages([]);
    setInput("");
    setLoading(false);
    setDynamicFollowUps([]);
    setIntroKey(prev => prev + 1);
  };

  async function send(text?: string) {
    const q = (text ?? input).trim();
    if (!q || loading) return;
    
    setInput("");
    setLoading(true);
    setDynamicFollowUps([]); 

    const newMessages: Msg[] = [...messages, { role: "user", content: q }];
    setMessages([...newMessages, { role: "assistant", content: "" }]);
    
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: newMessages }), 
      });
      const data = await res.json();
      
      const [mainRaw, followRaw] = data.reply.split("###", 2);
      const mainContent = sanitizeAssistantText(mainRaw ?? "");

      const suggestions = followRaw
  ?  followRaw
      .split("\n")
      .map((s: string) => s.trim())
      .filter((s: string) => s.startsWith("↳"))
      .map((s: string) => sanitizeAssistantText(s.replace(/^↳\s?/, "")))
      .filter((s: string) => s.length >= 6 && s.length <= 90)
  : [];


      const finalSuggestions =
  suggestions.length > 0
    ? suggestions
    : isCompensationQuestion(q)
      ? [...OUT_OF_SCOPE_FOLLOWUPS]
      : [];

typeText(mainContent, finalSuggestions);

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

  return (
    <div className={`${styles.app} ${aeonik.className}`}>
      <ChatHeader 
        onReset={handleReset} 
        onClose={() => window.parent?.postMessage({ type: "CHAT_REQUEST_CLOSE" }, "*")} 
      />

      <div ref={listRef} className={styles.messages}>
        <AnimatePresence mode="popLayout">
          {messages.length === 0 ? (
            <motion.div key={`intro-${introKey}`} className={styles.intro} initial="hidden" animate="visible">
              <motion.div variants={itemVariants} className={styles.chatTitle}>
                Hola, ¿qué te gustaría saber?
              </motion.div>
              <div className={styles.quickGrid}>
                {quick.map(q => (
                  <button key={q} onClick={() => send(q)} className={styles.quickBtn}>
                    {q}
                  </button>
                ))}
              </div>
            </motion.div>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
              {messages.map((m, i) => {
                const isLastAssistant = m.role === "assistant" && i === messages.length - 1;
                
                if (m.role === "user") return (
                  <div key={i} className={styles.userRow}>
                    <div className={styles.userBubble}>{m.content}</div>
                  </div>
                );

                return (
                  <div key={i} className={styles.assistantRow}>
                    {m.content === "" && loading && isLastAssistant ? (
                      <div className={styles.thinking}>Thinking...</div>
                    ) : (
                      <div
                        className={styles.assistantText}
                        dangerouslySetInnerHTML={{ __html: m.content }}
                        />
                    )}
                    
                    {isLastAssistant && !loading && dynamicFollowUps.length > 0 && (
                      <motion.div 
                        initial={{ opacity: 0, y: 5 }} 
                        animate={{ opacity: 1, y: 0 }} 
                        className={styles.followUpsContainer}
                      >
                        <div className={styles.followUps}>
                          {dynamicFollowUps.map(q => (
                            <button key={q} onClick={() => send(q)} className={styles.followUpBtn}>
                               {q}
                            </button>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </AnimatePresence>
      </div>

      <div className={styles.inputContainer}>
        <div className={styles.composer}>
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
            className={styles.textArea}
            placeholder="Pregúntame algo" 
            rows={1}
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
  );
}