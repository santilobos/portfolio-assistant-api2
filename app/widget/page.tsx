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

// --- 1. VARIANTES DE ANIMACIÓN ---
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.1 },
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
  return <img src={src} alt={alt} width={18} height={18} style={{ display: "block" }} />
}

function ChatHeader({ onReset, onClose }: { onReset: () => void; onClose: () => void }) {
  const [open, setOpen] = React.useState(false)
  const btnRef = React.useRef<HTMLButtonElement | null>(null)
  
  return (
    <div style={{
      height: 56, position: "sticky", top: 0, zIndex: 50, background: "#f5f5f5",
      borderBottom: "1px solid rgba(198, 209, 221, 1)", padding: "0 16px",
      display: "flex", alignItems: "center", justifyContent: "space-between", boxSizing: "border-box",
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10, position: "relative" }}>
        <div style={{ 
          fontSize: "0.9rem", fontWeight: 400, color: "#000000", letterSpacing: 0.5, 
          fontFamily: azeret.style.fontFamily, WebkitFontSmoothing: "antialiased"
        }}>
          SANTI.GPT
        </div>
        <button ref={btnRef} onClick={() => setOpen(!open)} className={styles.iconBtn}>
          <Icon src="/icons/info.svg" alt="Info" />
        </button>
        {open && (
          <>
            <div style={{ position: 'fixed', inset: 0, zIndex: 60 }} onClick={() => setOpen(false)} />
            <div style={{
              position: "absolute", top: "100%", left: 0, marginTop: "4px", width: "240px",
              padding: "12px", backgroundColor: "#ffffff", border: "1px solid rgba(198, 209, 221, 1)", 
              borderRadius: "4px", boxShadow: "0 4px 12px rgba(0,0,0,0.1)", zIndex: 70,
              fontSize: "0.75rem", fontFamily: azeret.style.fontFamily, lineHeight: "1.4", color: "#656565ff", 
            }}>
               He programado este asistente para ayudarte a conocer mi trabajo, metodologías y experiencia.
            </div>
          </>
        )}
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <button onClick={onReset} className={styles.iconBtn}><Icon src="/icons/reset.svg" alt="Reset" /></button>
        <button onClick={() => { window.parent.postMessage("close-widget", "*"); onClose(); }} className={styles.iconBtn}>
          <Icon src="/icons/close.svg" alt="Close" />
        </button>
      </div>
    </div>
  )
}

type Msg = { role: "user" | "assistant"; content: string }

function sanitizeAssistantText(text: string) {
  return (text ?? "").replace(/<\/?[^>]+>/g, "").replace(/`/g, "").replace(/^\s*#{1,6}\s+/gm, "").replace(/^\s*-\s+/gm, "• ").replace(/\n{3,}/g, "\n\n").trim();
}

function RenderAssistantText({ text }: { text: string }) {
  if (!text) return null;
  const renderLineWithBold = (line: string) => {
    const parts = line.split(/(\*\*.*?\*\*|\[.*?\]\(.*?\))/g);
    return parts.map((part, i) => {
      if (part.startsWith('**') && part.endsWith('**')) return <strong key={i} style={{ fontWeight: 700, color: '#000' }}>{part.slice(2, -2)}</strong>;
      if (part.startsWith('[') && part.includes('](')) {
        const match = part.match(/\[(.*?)\]\((.*?)\)/);
        if (match) return <a key={i} href={match[2]} target="_blank" rel="noopener noreferrer" style={{ color: 'rgb(255, 92, 0)', textDecoration: 'underline', fontWeight: 600 }}>{match[1]}</a>;
      }
      return part;
    });
  };
  const normalized = text.replace(/\s*(•|·|↳|-)\s+/g, "\n• ").trim();
  const lines = normalized.split("\n").map(l => l.trim()).filter(Boolean);
  return (
    <div className={styles.assistantText}>
      {lines.map((line, idx) => (
        line.startsWith("• ") ? (
          <div key={idx} className={styles.bulletLine} style={{ marginBottom: '8px', display: 'flex', gap: '8px' }}>
            <span>•</span><div>{renderLineWithBold(line.replace(/^•\s*/, ""))}</div>
          </div>
        ) : <p key={idx} className={styles.paragraphLine} style={{ marginBottom: '12px' }}>{renderLineWithBold(line)}</p>
      ))}
    </div>
  );
}

// --- 3. COMPONENTE PRINCIPAL ---

const OUT_OF_SCOPE_FOLLOWUPS = ["¿Quieres que te cuente un proyecto con métricas?", "¿Te interesa más mis conocimientos en Design System?", "¿Prefieres que te hable de mi proceso de diseño?"];

export default function Widget() {
  const [messages, setMessages] = React.useState<Msg[]>([]);
  const [input, setInput] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [introKey, setIntroKey] = React.useState(0);
  const [dynamicFollowUps, setDynamicFollowUps] = React.useState<string[]>([]);
  const [askedQuestions, setAskedQuestions] = React.useState<string[]>([]);
  
  const listRef = React.useRef<HTMLDivElement | null>(null);
  const textareaRef = React.useRef<HTMLTextAreaElement | null>(null);
  const typingIntervalRef = React.useRef<ReturnType<typeof setInterval> | null>(null);

  const quick = ["¿Cuál fue tu proyecto más complejo?", "¿Qué metodologías utilizas?", "¿Cómo enfocas el liderazgo en diseño de producto?"];

  // Lógica de tipado con "Crecimiento hacia abajo" (Sin Auto-scroll)
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
          setDynamicFollowUps(notAskedYet.slice(0, 3));
        }
      }
    }, 15);
  };

  async function send(text?: string) {
    const q = (text ?? input).trim();
    if (!q || loading) return;
    
    if (textareaRef.current) textareaRef.current.blur(); // Cierra teclado
    
    setAskedQuestions(prev => [...prev, q.toLowerCase().trim()]);
    setInput("");
    setLoading(true);
    setDynamicFollowUps([]); 

    const newMessages: Msg[] = [...messages, { role: "user", content: q }];
    setMessages([...newMessages, { role: "assistant", content: "" }]);
    
    // PINEAR PREGUNTA ARRIBA:
    setTimeout(() => {
      if (listRef.current) {
        const userRows = listRef.current.querySelectorAll(`.${styles.userRow}`);
        const lastUserRow = userRows[userRows.length - 1] as HTMLElement;
        if (lastUserRow) {
          listRef.current.scrollTo({ top: lastUserRow.offsetTop - 10, behavior: "smooth" });
        }
      }
    }, 100);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: newMessages }), 
      });
      const data = await res.json();
      const mainContent = sanitizeAssistantText(data?.reply ?? "");
      const apiFollowups = Array.isArray(data?.followups) ? data.followups : [];
      typeText(mainContent, apiFollowups.length > 0 ? apiFollowups : OUT_OF_SCOPE_FOLLOWUPS);
    } catch (e) {
      setLoading(false);
      setMessages(prev => {
        const next = [...prev];
        const last = next[next.length - 1];
        if (last) last.content = "Error de conexión.";
        return next;
      });
    }
  }

  return (
    <div className={`${styles.app} ${azeret.variable}`} style={{ height: '100dvh', display: 'flex', flexDirection: 'column' }}>
      <ChatHeader onReset={() => { setMessages([]); setDynamicFollowUps([]); setAskedQuestions([]); setIntroKey(k => k+1); }} onClose={() => window.parent?.postMessage({ type: "CHAT_REQUEST_CLOSE" }, "*")} />

      <div ref={listRef} className={styles.messages} style={{ flex: 1, overflowY: "auto", scrollBehavior: "smooth" }}>
        <AnimatePresence mode="popLayout">
          {messages.length === 0 ? (
            <motion.div key={`intro-${introKey}`} className={styles.intro} variants={containerVariants} initial="hidden" animate="visible">
              <motion.div variants={itemVariants} className={styles.chatTitle}>Pregúntame sobre mi trabajo</motion.div>
              <div className={styles.quickGrid}>
                {quick.map((q) => (
                  <motion.button key={q} variants={itemVariants} onClick={() => send(q)} className={styles.quickBtn} whileTap={{ scale: 0.98 }}>{q}</motion.button>
                ))}
              </div>
            </motion.div>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: "32px", paddingBottom: "40px" }}>
              {messages.map((m, i) => {
                const isLastAssistant = m.role === "assistant" && i === messages.length - 1;
                return m.role === "user" ? (
                  <div key={i} className={styles.userRow}><div className={styles.userBubble}>{m.content}</div></div>
                ) : (
                  <div key={i} className={styles.assistantRow}>
                    {m.content === "" && loading ? <div className={styles.thinking}>Pensando</div> : <RenderAssistantText text={m.content} />}
                    {isLastAssistant && !loading && dynamicFollowUps.length > 0 && (
                      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className={styles.followUpsContainer}>
                        <div className={styles.divider} />
                        <div className={styles.followUps}>
                          {dynamicFollowUps.map(q => <button key={q} onClick={() => send(q)} className={styles.followUpBtn}>{q}</button>)}
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
          <textarea ref={textareaRef} value={input} onChange={e => { setInput(e.target.value); e.target.style.height = 'auto'; e.target.style.height = `${e.target.scrollHeight}px`; }} 
            onKeyDown={e => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); send(); } }} className={styles.textArea} placeholder="Escribe aquí..." rows={1} />
          <button onClick={() => send()} disabled={loading || !input.trim()} className={`${styles.sendBtn} ${input.trim() ? styles.sendBtnActive : ""}`}>
            <svg width="24" height="24" viewBox="0 0 960 960" fill="currentColor"><path d="M120 760v-240l320-80-320-80V120l760 320-760 320Z"/></svg>
          </button>
        </div>
      </div>
    </div>
  );
}