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

// --- CONFIGURACIÓN DE CASOS ---
const CONFIG_PROYECTOS: Record<string, { titulo: string; questions: { label: string; id: string }[] }> = {
  repsol: {
    titulo: "Te resumo el case de Repsol...",
    questions: [
      { label: "Cuál era el problema inicial?", id: "cs_repsol_contexto_problema" },
      { label: "Qué metodología empleaste?", id: "cs_repsol_metodologia" },
      { label: "Cuál fue tu rol en el proyecto?", id: "cs_repsol_rol_responsabilidades" }
    ]
  },
  default: {
    titulo: "¿Qué quieres saber?",
    questions: [
      { label: "¿Cuál fue tu proyecto más complejo?", id: "profile_most_complex_project" },
      { label: "¿Qué metodologías utilizas?", id: "methods_overview" },
      { label: "¿Como enfocas el liderazgo en diseño de producto?", id: "ls_vision_general" }
    ]
  }
}

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
      background: "#F6F5F3",
      borderBottom: "1px solid #D1CEC7", 
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
          color: "#706A5C", 
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
              border: "1px solid rgba(209, 206, 199, 1)", 
              borderRadius: "4px",
              boxShadow: "0 4px 12px rgba(209,206,199,0.4)",
              zIndex: 70,
              fontSize: "0.75rem",
              fontFamily: azeret.style.fontFamily,
              fontWeight: 400, 
              lineHeight: "1.4",
              color: "#706A5C", 
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
  
  // ✅ NUEVO: Estado para configuración de URL
  const [config, setConfig] = React.useState<any>(null);

  const hasText = input.trim().length > 0;
  const listRef = React.useRef<HTMLDivElement | null>(null);
  const typingIntervalRef = React.useRef<ReturnType<typeof setInterval> | null>(null);
  const textAreaRef = React.useRef<HTMLTextAreaElement | null>(null);

  React.useEffect(() => {
    if (typeof window !== "undefined") {
      // Intentamos detectar la URL. 
      // Si el widget está en un subdominio, buscamos "/repsol" en la ruta
      const path = window.location.pathname.toLowerCase();
      const search = window.location.search.toLowerCase();
      
      if (path.includes("repsol") || search.includes("repsol")) {
        setConfig(CONFIG_PROYECTOS.repsol);
      } else {
        setConfig(CONFIG_PROYECTOS.default);
      }
    }
  }, [introKey]);

  

  // ✅ NUEVO: Detección de URL para cambiar Título y Botones
  React.useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const caseSlug = params.get("case");
    if (caseSlug && CONFIG_PROYECTOS[caseSlug]) {
      setConfig(CONFIG_PROYECTOS[caseSlug]);
    } else {
      setConfig(CONFIG_PROYECTOS.default);
    }
  }, [introKey]); // Se refresca si reiniciamos el chat

  const autosizeTextArea = React.useCallback(() => {
    const el = textAreaRef.current
    if (!el) return
    el.style.height = "auto"
    const maxHeight = 150 
    const nextHeight = Math.min(el.scrollHeight, maxHeight)
    el.style.height = `${nextHeight}px`
    el.style.overflowY = el.scrollHeight > maxHeight ? "auto" : "hidden"
  }, [])

  // Viewport & Keyboard Logic (Original)
  React.useEffect(() => {
    const vv = window.visualViewport;
    if (!vv) return;
    const setVars = () => {
      const kbd = Math.max(0, window.innerHeight - vv.height - vv.offsetTop);
      document.documentElement.style.setProperty("--kbd", `${kbd}px`);
    };
    setVars();
    vv.addEventListener("resize", setVars);
    vv.addEventListener("scroll", setVars);
    const onFocusIn = () => requestAnimationFrame(setVars);
    const onFocusOut = () => requestAnimationFrame(setVars);
    window.addEventListener("focusin", onFocusIn);
    window.addEventListener("focusout", onFocusOut);
    return () => {
      vv.removeEventListener("resize", setVars);
      vv.removeEventListener("scroll", setVars);
      window.removeEventListener("focusin", onFocusIn);
      window.removeEventListener("focusout", onFocusOut);
    };
  }, []);

  React.useEffect(() => {
    const vv = window.visualViewport
    if (!vv) return
    let locked = false
    const lock = () => { if (locked) return; locked = true; document.documentElement.style.overflow = "hidden"; document.body.style.overflow = "hidden"; }
    const unlock = () => { if (!locked) return; locked = false; document.documentElement.style.overflow = ""; document.body.style.overflow = ""; }
    const sync = () => {
      const kbd = Math.max(0, window.innerHeight - vv.height - vv.offsetTop)
      if (kbd > 0) lock()
      else unlock()
    }
    sync()
    vv.addEventListener("resize", sync); vv.addEventListener("scroll", sync);
    window.addEventListener("focusin", sync); window.addEventListener("focusout", sync);
    return () => {
      vv.removeEventListener("resize", sync); vv.removeEventListener("scroll", sync);
      window.removeEventListener("focusin", sync); window.removeEventListener("focusout", sync);
      unlock()
    }
  }, [])

  React.useEffect(() => {
    if (listRef.current) {
      listRef.current.scrollTop = listRef.current.scrollHeight;
    }
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
        if (typingIntervalRef.current) clearInterval(typingIntervalRef.current);
        setLoading(false);

        if (suggestions && suggestions.length > 0) {
          const notAskedYet = suggestions.filter((s) => !askedQuestions.includes(s.toLowerCase().trim()));
          const PROJECT_KEYWORDS = ["repsol", "fc barcelona", "fcb", "cofares", "mediapro", "depasify", "bbva", "inditex"];

          const sortedSuggestions = [...notAskedYet].sort((a, b) => {
            const aIsJump = PROJECT_KEYWORDS.some((key) => a.toLowerCase().includes(key));
            const bIsJump = PROJECT_KEYWORDS.some((key) => b.toLowerCase().includes(key));
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
    if (textAreaRef.current) textAreaRef.current.style.height = "auto";
    setLoading(false);
    setDynamicFollowUps([]);
    setAskedQuestions([]);
    setIntroKey((prev) => prev + 1);
  };

 async function send(text?: string, nodeId?: string) {
    const q = (text ?? input).trim();
    if (!q || loading) return;

    setAskedQuestions((prev) => [...prev, q.toLowerCase().trim()]);
    setInput("");
    if (textAreaRef.current) textAreaRef.current.style.height = "auto";

    setLoading(true);
    setDynamicFollowUps([]);

    // Mantenemos el historial para la UI, pero...
    const newMessages: Msg[] = [...messages, { role: "user", content: q }];
    setMessages([...newMessages, { role: "assistant", content: "" }]);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          // 1. Enviamos el historial
          messages: newMessages,
          // 2. Enviamos el ID técnico. 
          // IMPORTANTE: Tu API debe estar programada para que si 'nodeId' existe, 
          // ignore el motor de búsqueda semántica y devuelva ese nodo exacto.
          nodeId: nodeId || null,
          // 3. Opcional: enviamos el caso actual como contexto extra
          currentCase: new URLSearchParams(window.location.search).get("case") 
        }),
      });

      if (!res.ok) throw new Error("API Error");

      const data = await res.json();
      const mainContent = sanitizeAssistantText(data?.reply ?? "");
      
      // Si la API devuelve followups específicos del nodo de Repsol, los usamos
      const apiFollowups = Array.isArray(data?.followups) ? data.followups : [];
      
      const finalSuggestions = apiFollowups.length > 0 
        ? apiFollowups 
        : isCompensationQuestion(q) 
          ? [...OUT_OF_SCOPE_FOLLOWUPS] 
          : [];

      typeText(mainContent, finalSuggestions);
    } catch (e) {
      setLoading(false);
      setMessages((prev) => {
        const next = [...prev];
        const last = next[next.length - 1];
        if (last) last.content = "Mmm parece que algo ha fallado en la conexión.";
        return next;
      });
    }
  }

  // Si aún no hemos detectado la URL, no pintamos nada para evitar el flash de "default"
  if (!config) return null;

  return (
    <div className={`${styles.app} ${azeret.variable}`}>
      <ChatHeader onReset={handleReset} onClose={() => window.parent?.postMessage({ type: "CHAT_REQUEST_CLOSE" }, "*")} />

      <div ref={listRef} className={styles.messages}>
        <AnimatePresence mode="popLayout">
          {messages.length === 0 ? (
            <motion.div
              key={`intro-${introKey}`}
              className={styles.intro}
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              <motion.div variants={itemVariants} className={styles.chatTitle}>
                {config.titulo}
              </motion.div>
              <motion.div variants={containerVariants} className={styles.quickGrid}>
                {/* ✅ DINÁMICO: Preguntas basadas en la URL del Case Study */}
                {config.questions.map((q: any) => (
  <motion.button
    key={q.id}
    variants={itemVariants}
    // PASO IMPORTANTE: Aquí enviamos el ID técnico
    onClick={() => send(q.label, q.id)} 
    className={styles.quickBtn}
    whileTap={{ scale: 0.98 }}
  >
    {q.label}
  </motion.button>
))}
              </motion.div>
            </motion.div>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
              {messages.map((m, i) => {
                const isLastAssistant = m.role === "assistant" && i === messages.length - 1;
                if (m.role === "user")
                  return (
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
                      <motion.div
                        initial={{ opacity: 0, y: 5 }}
                        animate={{ opacity: 1, y: 0 }}
                        className={styles.followUpsContainer}
                      >
                        <div className={styles.divider} />
                        <div className={styles.followUps}>
                          {dynamicFollowUps.map((q) => (
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
            ref={textAreaRef}
            value={input}
            onFocus={() => {
              requestAnimationFrame(() => {
                if (listRef.current) listRef.current.scrollTop = listRef.current.scrollHeight
              })
            }}
            onChange={(e) => {
              setInput(e.target.value)
              autosizeTextArea()
            }}
            onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); send(); } }}
            className={styles.textArea}
            placeholder="Escribe aquí..."
            rows={1}
          />
          <button
            onClick={() => send()}
            disabled={loading || !hasText}
            className={`${styles.sendBtn} ${hasText ? styles.sendBtnActive : ""}`}
          >
            <svg width="24" height="24" viewBox="0 0 960 960" fill="currentColor">
              <path d="M120 760v-240l320-80-320-80V120l760 320-760 320Z" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}