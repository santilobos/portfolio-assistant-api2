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

// --- CONFIGURACIÓN DINÁMICA ---
const CONFIG_PROYECTOS: Record<string, { titulo: string; followUps: { label: string; id: string }[] }> = {
  repsol: {
    titulo: "Pregunta sobre el case de Repsol...",
    followUps: [
      { label: "¿Qué metodología empleaste?", id: "cs_repsol_metodologia" },
      { label: "¿Cuál era el problema inicial?", id: "cs_repsol_contexto_problema" },
      { label: "¿Cuál fue tu rol en el proyecto?", id: "cs_repsol_rol_responsabilidades" }
    ]
  },
  default: {
    titulo: "¿Qué quieres saber?",
    followUps: [
      { label: "¿Cuál fue tu proyecto más complejo?", id: "profile_most_complex_project" },
      { label: "¿Qué metodologías utilizas?", id: "methods_overview" },
      { label: "¿Cómo enfocas el liderazgo?", id: "ls_vision_general" }
    ]
  }
}

// --- VARIANTES DE ANIMACIÓN ---
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

// --- COMPONENTES AUXILIARES ---
function Icon({ src, alt }: { src: string; alt: string }) {
  return <img src={src} alt={alt} width={18} height={18} style={{ display: "block" }} />
}

function ChatHeader({ onReset, onClose }: { onReset: () => void; onClose: () => void }) {
  const [open, setOpen] = React.useState(false)
  const btnRef = React.useRef<HTMLButtonElement | null>(null)
  
  return (
    <div style={{
      height: 56, position: "sticky", top: 0, zIndex: 50, background: "#F6F5F3",
      borderBottom: "1px solid #D1CEC7", padding: "0 16px",
      display: "flex", alignItems: "center", justifyContent: "space-between", boxSizing: "border-box",
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10, position: "relative" }}>
        <div style={{ 
          fontSize: "0.9rem", fontWeight: 400, color: "#706A5C", letterSpacing: 0.5, 
          fontFamily: azeret.style.fontFamily, WebkitFontSmoothing: "antialiased"
        }}>SANTI.GPT</div>
        <button ref={btnRef} onClick={() => setOpen(!open)} className={styles.iconBtn}>
          <Icon src="/icons/info.svg" alt="Info" />
        </button>
        {open && (
          <>
            <div style={{ position: 'fixed', inset: 0, zIndex: 60 }} onClick={() => setOpen(false)} />
            <div style={{
              position: "absolute", top: "100%", left: 0, marginTop: "4px", width: "240px",
              padding: "12px", backgroundColor: "#ffffff", border: "1px solid rgba(209, 206, 199, 1)", 
              borderRadius: "4px", boxShadow: "0 4px 12px rgba(209,206,199,0.4)", zIndex: 70,
              fontSize: "0.75rem", fontFamily: azeret.style.fontFamily, fontWeight: 400, 
              lineHeight: "1.4", color: "#706A5C", 
            }}>
               He programado este asistente para ayudarte a conocer mi trabajo, metodologías y experiencia de manera rápida y sencilla.
            </div>
          </>
        )}
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <button onClick={onReset} className={styles.iconBtn}><Icon src="/icons/reset.svg" alt="Reset" /></button>
        <button onClick={() => {
            if (typeof window !== "undefined") window.parent.postMessage("close-widget", "*");
            onClose();
          }} className={styles.iconBtn}><Icon src="/icons/close.svg" alt="Close" /></button>
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
        if (match) return <a key={i} href={match[2]} target="_blank" rel="noopener noreferrer" style={{ color: 'rgb(255, 92, 0)', textDecoration: 'underline', fontWeight: 600, cursor: 'pointer' }}>{match[1]}</a>;
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
          <div key={idx} className={styles.bulletLine} style={{ marginBottom: '8px', display: 'flex', gap: '8px' }}><span>•</span><div>{renderLineWithBold(line.replace(/^•\s*/, ""))}</div></div>
        ) : (
          <p key={idx} className={styles.paragraphLine} style={{ marginBottom: '12px' }}>{renderLineWithBold(line)}</p>
        );
      })}
    </div>
  );
}

// --- COMPONENTE PRINCIPAL WIDGET ---
const OUT_OF_SCOPE_FOLLOWUPS = ["¿Quieres que te cuente un proyecto con métricas?", "¿Te interesa más mis conocimientos en Design System?", "¿Prefieres que te hable de mi proceso de diseño?"];

function isCompensationQuestion(q: string) {
  const t = q.toLowerCase();
  return t.includes("salario") || t.includes("sueldo") || t.includes("cuanto cobras") || t.includes("expectativa salarial") || t.includes("salary");
}

export default function Widget() {
  const [messages, setMessages] = React.useState<Msg[]>([]);
  const [input, setInput] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [introKey, setIntroKey] = React.useState(0);
  const [dynamicFollowUps, setDynamicFollowUps] = React.useState<string[]>([]);
  const [askedQuestions, setAskedQuestions] = React.useState<string[]>([]);
  
  // MEJORA: config inicializado en null para forzar detección de URL
  const [config, setConfig] = React.useState<any>(null);

  const listRef = React.useRef<HTMLDivElement | null>(null);
  const typingIntervalRef = React.useRef<ReturnType<typeof setInterval> | null>(null);
  const textAreaRef = React.useRef<HTMLTextAreaElement | null>(null);

  // EFECTO CRÍTICO: Detección de URL
  React.useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const caseSlug = params.get("case");
    if (caseSlug && CONFIG_PROYECTOS[caseSlug]) {
      setConfig(CONFIG_PROYECTOS[caseSlug]);
    } else {
      setConfig(CONFIG_PROYECTOS.default);
    }
  }, []);

  const autosizeTextArea = React.useCallback(() => {
    const el = textAreaRef.current; if (!el) return;
    el.style.height = "auto";
    el.style.height = `${Math.min(el.scrollHeight, 150)}px`;
    el.style.overflowY = el.scrollHeight > 150 ? "auto" : "hidden";
  }, []);

  React.useEffect(() => {
    if (listRef.current) listRef.current.scrollTop = listRef.current.scrollHeight;
  }, [messages, loading, dynamicFollowUps]);

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
        clearInterval(typingIntervalRef.current!);
        setLoading(false);
        if (suggestions) {
            setDynamicFollowUps(suggestions.filter(s => !askedQuestions.includes(s.toLowerCase().trim())).slice(0, 3));
        }
      }
    }, 15);
  };

  async function send(text?: string, nodeId?: string) {
    const rawInput = (text || input).trim();
    if (!rawInput || loading) return;

    setAskedQuestions((prev) => [...prev, rawInput.toLowerCase().trim()]);
    setInput("");
    if (textAreaRef.current) textAreaRef.current.style.height = "auto";

    setLoading(true);
    setDynamicFollowUps([]);

    const newMessages: Msg[] = [...messages, { role: "user", content: rawInput }];
    setMessages([...newMessages, { role: "assistant", content: "" }]);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
            messages: newMessages,
            nodeId: nodeId || null // MEJORA: Enviamos ID técnico si existe
        }),
      });
      
      if (!res.ok) throw new Error();
      const data = await res.json();
      
      const mainContent = sanitizeAssistantText(data?.reply ?? "");
      const apiFollowups = Array.isArray(data?.followups) ? data.followups : [];
      
      const finalSuggestions = apiFollowups.length > 0 
        ? apiFollowups 
        : isCompensationQuestion(rawInput) 
          ? [...OUT_OF_SCOPE_FOLLOWUPS] 
          : [];

      typeText(mainContent, finalSuggestions);

    } catch (e) {
      setLoading(false);
      setMessages((prev) => {
        const next = [...prev];
        const last = next[next.length - 1];
        if (last) last.content = "Mmm parece que algo ha fallado. ¿Podrías intentarlo de nuevo?";
        return next;
      });
    }
  }

  // Prevenir renderizado hasta que config esté cargado
  if (!config) return null;

  return (
    <div className={`${styles.app} ${azeret.variable} ${aeonik.variable}`}>
      <ChatHeader 
        onReset={() => { 
            setMessages([]); 
            setAskedQuestions([]); 
            setIntroKey(k => k+1); 
            setDynamicFollowUps([]);
        }} 
        onClose={() => {}} 
      />
      
      <div ref={listRef} className={styles.messages}>
        <AnimatePresence mode="popLayout">
          {messages.length === 0 ? (
            <motion.div key={`intro-${introKey}`} className={styles.intro} variants={containerVariants} initial="hidden" animate="visible">
              <motion.div variants={itemVariants} className={styles.chatTitle}>{config.titulo}</motion.div>
              <motion.div variants={containerVariants} className={styles.quickGrid}>
                {config.followUps.map((item: any) => (
                  <motion.button 
                    key={item.id} 
                    variants={itemVariants} 
                    onClick={() => send(item.label, item.id)} 
                    className={styles.quickBtn}
                    whileTap={{ scale: 0.98 }}
                  >
                    {item.label}
                  </motion.button>
                ))}
              </motion.div>
            </motion.div>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
              {messages.map((m, i) => (
                <div key={i} className={m.role === "user" ? styles.userRow : styles.assistantRow}>
                  {m.role === "user" ? <div className={styles.userBubble}>{m.content}</div> : (
                    <>
                      {m.content === "" && loading ? (
                        <div className={styles.thinking}>
                          <motion.span animate={{ opacity: [0.3, 1, 0.3] }} transition={{ repeat: Infinity, duration: 1.5 }}>Pensando</motion.span>
                        </div>
                      ) : <RenderAssistantText text={m.content} />}
                      
                      {i === messages.length - 1 && !loading && dynamicFollowUps.length > 0 && (
                        <div className={styles.followUpsContainer}>
                          <div className={styles.divider} />
                          <div className={styles.followUps}>
                            {dynamicFollowUps.map(q => (
                              <button key={q} onClick={() => send(q)} className={styles.followUpBtn}>{q}</button>
                            ))}
                          </div>
                        </div>
                      )}
                    </>
                  )}
                </div>
              ))}
            </div>
          )}
        </AnimatePresence>
      </div>

      <div className={styles.inputContainer}>
        <div className={styles.composer}>
          <textarea 
            ref={textAreaRef} 
            value={input} 
            onChange={e => { setInput(e.target.value); autosizeTextArea(); }} 
            onKeyDown={e => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); send(); } }} 
            className={styles.textArea} 
            placeholder="Escribe aquí..." 
            rows={1} 
          />
          <button onClick={() => send()} disabled={loading || !input.trim()} className={`${styles.sendBtn} ${input.trim() ? styles.sendBtnActive : ""}`}>
            <svg width="24" height="24" viewBox="0 0 960 960" fill="currentColor"><path d="M120 760v-240l320-80-320-80V120l760 320-760 320Z" /></svg>
          </button>
        </div>
      </div>
    </div>
  );
}