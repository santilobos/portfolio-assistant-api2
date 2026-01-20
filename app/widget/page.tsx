"use client"

import * as React from "react"
import { motion, Variants, AnimatePresence } from "framer-motion"
import styles from "./page.module.css"
import { Azeret_Mono } from "next/font/google"
import localFont from "next/font/local"

const azeret = Azeret_Mono({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: '--font-azeret',
})

const aeonik = localFont({
  src: "../fonts/AeonikPro-Regular.woff",
  weight: "400",
  style: "normal",
  variable: "--font-aeonik"
})

// --- Esta línea es solo para el git push ---

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
      background: "#f5f5f5",
      borderBottom: "1px solid rgba(198, 209, 221, 1)", 
      padding: "0 16px",
      display: "flex", 
      alignItems: "center", 
      justifyContent: "space-between", 
      boxSizing: "border-box",
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10, position: "relative" }}>
        <div style={{ 
          fontSize: "0.9rem", 
          fontWeight: 400, 
          color: "#000000", 
          letterSpacing: 0.5, 
          fontFamily: azeret.style.fontFamily,
          WebkitFontSmoothing: "antialiased",
          MozOsxFontSmoothing: "grayscale"
        }}>
          SANTI.GPT
        </div>
        
        <button 
          ref={btnRef} 
          onClick={() => setOpen(!open)} 
          className={styles.iconBtn}
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
              marginTop: "4px",
              width: "240px",
              padding: "12px",
              backgroundColor: "#ffffff",
              border: "1px solid rgba(198, 209, 221, 1)", 
              borderRadius: "4px",
              boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
              zIndex: 70,
              fontSize: "0.75rem",
              fontFamily: azeret.style.fontFamily,
              fontWeight: 400, 
              lineHeight: "1.4",
              color: "#656565ff", 
            }}>
               He programado este asistente para ayudarte a conocer mi trabajo, metodologías y experiencia de manera rápida y sencilla.
            </div>
          </>
        )}
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <button onClick={onReset} className={styles.iconBtn}>
          <Icon src="/icons/reset.svg" alt="Reset" />
        </button>
        <button 
          onClick={() => {
            if (typeof window !== "undefined") {
              window.parent.postMessage("close-widget", "*");
            }
            onClose();
          }} 
          className={styles.iconBtn}
        >
          <Icon src="/icons/close.svg" alt="Close" />
        </button>
      </div>
    </div>
  )
}

// --- 3. LOGICA Y RENDERIZADO ---

type Msg = { role: "user" | "assistant"; content: string }

function sanitizeAssistantText(text: string) {
  return (text ?? "")
    .replace(/<\/?[^>]+>/g, "")
    .replace(/`/g, "") 
    .replace(/^\s*#{1,6}\s+/gm, "")
    .replace(/^\s*-\s+/gm, "• ")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

function RenderAssistantText({ text }: { text: string }) {
  if (!text) return null;

  const renderLineWithBold = (line: string) => {
    const parts = line.split(/(\*\*.*?\*\*|\[.*?\]\(.*?\))/g);

    return parts.map((part, i) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        return (
          <strong key={i} style={{ fontWeight: 700, color: '#000' }}>
            {part.slice(2, -2)}
          </strong>
        );
      }

      if (part.startsWith('[') && part.includes('](')) {
        const match = part.match(/\[(.*?)\]\((.*?)\)/);
        if (match) {
          const [_, label, url] = match;
          return (
            <a
              key={i}
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                color: 'rgb(255, 92, 0)',
                textDecoration: 'underline',
                fontWeight: 600,
                cursor: 'pointer'
              }}
            >
              {label}
            </a>
          );
        }
      }
      return part;
    });
  };

  const normalized = text.replace(/\s*(•|·|↳|-)\s+/g, "\n• ").trim();
  const lines = normalized.split("\n").map(l => l.trim()).filter(Boolean);

  return (
    <div className={styles.assistantText}>
      {lines.map((line, idx) => {
        const isBullet = line.startsWith("• ") || /^\d+\.\s+/.test(line);

        return isBullet ? (
          <div key={idx} className={styles.bulletLine} style={{ marginBottom: '8px', display: 'flex', gap: '8px' }}>
            <span>•</span>
            <div>{renderLineWithBold(line.replace(/^•\s*/, ""))}</div>
          </div>
        ) : (
          <p key={idx} className={styles.paragraphLine} style={{ marginBottom: '12px' }}>
            {renderLineWithBold(line)}
          </p>
        );
      })}
    </div>
  );
}

// --- 4. COMPONENTE PRINCIPAL WIDGET ---

const OUT_OF_SCOPE_FOLLOWUPS = [
  "¿Quieres que te cuente un proyecto con métricas?" ,
  "¿Te interesa más mis conocimientos en Design System?",
  "¿Prefieres que te hable de mi proceso de diseño?",
] as const;

function isCompensationQuestion(q: string) {
  const t = q.toLowerCase();
  return (
    t.includes("salario") || t.includes("sueldo") || t.includes("cuanto cobras") ||
    t.includes("expectativa salarial") || t.includes("salary")
  );
}

export default function Widget() {
  const [messages, setMessages] = React.useState<Msg[]>([]);
  const [input, setInput] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [introKey, setIntroKey] = React.useState(0);
  const [dynamicFollowUps, setDynamicFollowUps] = React.useState<string[]>([]);
  const [askedQuestions, setAskedQuestions] = React.useState<string[]>([]);
  const hasText = input.trim().length > 0;
  const listRef = React.useRef<HTMLDivElement | null>(null);
  const typingIntervalRef = React.useRef<ReturnType<typeof setInterval> | null>(null);

  const quick = [
    "¿Cuál fue tu proyecto más complejo?", 
    "¿Qué metodologías utilizas?", 
    "¿Cómo enfocas el liderazgo en diseño de producto?"
  ];

  React.useEffect(() => {
  const vv = window.visualViewport
  if (!vv) return

  const setVars = () => {
    // keyboard height aproximada (Android Chrome)
    const kbd = Math.max(0, window.innerHeight - vv.height - vv.offsetTop)
    document.documentElement.style.setProperty("--kbd", `${kbd}px`)
  }

  // 1) inicial
  setVars()

  // 2) cambios reales del visual viewport
  vv.addEventListener("resize", setVars)
  vv.addEventListener("scroll", setVars)

  // 3) IMPORTANTÍSIMO: cuando haces focus, a veces NO hay resize hasta que tecleas
  const onFocusIn = () => requestAnimationFrame(setVars)
  const onFocusOut = () => requestAnimationFrame(setVars)
  window.addEventListener("focusin", onFocusIn)
  window.addEventListener("focusout", onFocusOut)

  return () => {
    vv.removeEventListener("resize", setVars)
    vv.removeEventListener("scroll", setVars)
    window.removeEventListener("focusin", onFocusIn)
    window.removeEventListener("focusout", onFocusOut)
  }
}, [])


  React.useEffect(() => {
    if (listRef.current) {
      listRef.current.scrollTop = listRef.current.scrollHeight;
    }
  }, [messages, loading, dynamicFollowUps]);

  React.useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      window.parent.postMessage({ type: "widget-mouse-move", x: e.clientX, y: e.clientY }, "*");
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

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

        if (suggestions && suggestions.length > 0) {
          const notAskedYet = suggestions.filter(s => !askedQuestions.includes(s.toLowerCase().trim()));
          const PROJECT_KEYWORDS = ["repsol", "fc barcelona", "fcb", "cofares", "mediapro", "depasify", "bbva", "inditex"];
          
          const sortedSuggestions = [...notAskedYet].sort((a, b) => {
            const aIsJump = PROJECT_KEYWORDS.some(key => a.toLowerCase().includes(key));
            const bIsJump = PROJECT_KEYWORDS.some(key => b.toLowerCase().includes(key));
            if (aIsJump && !bIsJump) return 1;
            if (!aIsJump && bIsJump) return -1;
            return 0;
          });
          setDynamicFollowUps(sortedSuggestions.slice(0, 3));
        }
      }
    }, 15);
  };

  const handleReset = () => {
    if (typingIntervalRef.current) clearInterval(typingIntervalRef.current);
    setMessages([]);
    setInput("");
    setLoading(false);
    setDynamicFollowUps([]);
    setAskedQuestions([]);
    setIntroKey(prev => prev + 1);
  };

  async function send(text?: string) {
    const q = (text ?? input).trim();
    if (!q || loading) return;
    
    setAskedQuestions(prev => [...prev, q.toLowerCase().trim()]);
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
      const mainContent = sanitizeAssistantText(data?.reply ?? "");
      const apiFollowups = Array.isArray(data?.followups) ? data.followups : [];
      const finalSuggestions = apiFollowups.length > 0 ? apiFollowups : isCompensationQuestion(q) ? [...OUT_OF_SCOPE_FOLLOWUPS] : [];
      typeText(mainContent, finalSuggestions);
    } catch (e) {
      setLoading(false);
      setMessages(prev => {
        const next = [...prev];
        const last = next[next.length - 1];
        if (last) last.content = "Mmm parece que algo ha fallado en la conexión.";
        return next;
      });
    }
  }

  return (
    <div className={`${styles.app} ${azeret.variable}`}>
      <ChatHeader 
        onReset={handleReset} 
        onClose={() => window.parent?.postMessage({ type: "CHAT_REQUEST_CLOSE" }, "*")} 
      />

      <div ref={listRef} className={styles.messages}>
        <AnimatePresence mode="popLayout">
          {messages.length === 0 ? (
            <motion.div key={`intro-${introKey}`} className={styles.intro} variants={containerVariants} initial="hidden" animate="visible">
              <motion.div variants={itemVariants} className={styles.chatTitle}>Pregúntame sobre mi trabajo</motion.div>
              <motion.div variants={containerVariants} className={styles.quickGrid}>
                {quick.filter(q => !askedQuestions.includes(q.toLowerCase().trim())).map((q) => (
                  <motion.button key={q} variants={itemVariants} onClick={() => send(q)} className={styles.quickBtn} whileTap={{ scale: 0.98 }}>
                    {q}
                  </motion.button>
                ))}
              </motion.div>
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
                      <div className={styles.thinking}>Pensando</div>
                    ) : (
                      <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }}>
                        <RenderAssistantText text={m.content} />
                      </motion.div>
                    )}
                    {isLastAssistant && !loading && dynamicFollowUps.length > 0 && (
                      <motion.div initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} className={styles.followUpsContainer}>
                        <div className={styles.divider} />
                        <div className={styles.followUps}>
                          {dynamicFollowUps.map(q => (
                            <button key={q} onClick={() => send(q)} className={styles.followUpBtn}>{q}</button>
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
            onKeyDown={e => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); send(); } }} 
            className={styles.textArea}
            placeholder="Escribe aquí..." 
            rows={1}
          />
          <button onClick={() => send()} disabled={loading || !hasText} className={`${styles.sendBtn} ${hasText ? styles.sendBtnActive : ""}`}>
            <svg width="24" height="24" viewBox="0 0 960 960" fill="currentColor"><path d="M120 760v-240l320-80-320-80V120l760 320-760 320Z"/></svg>
          </button>
        </div>
      </div>
    </div>
  );
}