"use client"

import * as React from "react"

type Msg = { role: "user" | "assistant"; content: string }

export default function Widget() {
  const [messages, setMessages] = React.useState<Msg[]>([
    { role: "assistant", content: "Hey, what would you like to know?" },
  ])
  const [input, setInput] = React.useState("")
  const [loading, setLoading] = React.useState(false)

  const listRef = React.useRef<HTMLDivElement | null>(null)

  React.useEffect(() => {
    if (!listRef.current) return
    listRef.current.scrollTop = listRef.current.scrollHeight
  }, [messages, loading])

  async function send(text?: string) {
    const content = (text ?? input).trim()
    if (!content || loading) return

    const next: Msg[] = [...messages, { role: "user", content }]
    setMessages(next)
    setInput("")
    setLoading(true)

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: next }),
      })
      const data = await res.json()
      setMessages([...next, { role: "assistant", content: data.reply ?? "…" }])
    } catch {
      setMessages([
        ...next,
        { role: "assistant", content: "Error connecting. Try again." },
      ])
    } finally {
      setLoading(false)
    }
  }

  const quick = [
    "What projects have you worked on?",
    "What was your role and impact?",
    "How do you approach design systems?",
  ]

  return (
    <div style={{ height: "100vh", background: "#F5F6F7", display: "flex", flexDirection: "column" }}>
      {/* Messages */}
      <div ref={listRef} style={{ flex: 1, overflowY: "auto", padding: 18 }}>
        {messages.map((m, i) => (
          <div
            key={i}
            style={{
              marginBottom: 10,
              opacity: m.role === "user" ? 0.75 : 1,
              whiteSpace: "pre-wrap",
              fontSize: 14,
            }}
          >
            {m.content}
          </div>
        ))}
        {loading && <div style={{ opacity: 0.6 }}>Typing…</div>}

        {messages.length <= 2 && (
          <div style={{ display: "grid", gap: 12, marginTop: 18 }}>
            {quick.map((q) => (
              <button
                key={q}
                onClick={() => send(q)}
                style={{
                  textAlign: "left",
                  padding: "14px",
                  borderRadius: 6,
                  border: "1px solid rgba(0,0,0,0.15)",
                  background: "#fff",
                  fontSize: 14,
                  cursor: "pointer",
                }}
              >
                {q}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Input */}
      <div style={{ padding: 14, borderTop: "1px solid rgba(0,0,0,0.12)" }}>
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
            placeholder="Ask about me…"
            style={{ flex: 1, border: "none", outline: "none", fontSize: 14 }}
          />
          <button
            onClick={() => send()}
            disabled={loading || input.trim().length === 0}
            style={{
              width: 36,
              height: 36,
              border: "none",
              background: "transparent",
              cursor: loading ? "not-allowed" : "pointer",
              opacity: loading ? 0.4 : 1,
              fontSize: 18,
            }}
          >
            ↑
          </button>
        </div>
      </div>
    </div>
  )
}
export default function Widget() {
  return (
    <div style={{ padding: 20 }}>
      <h1>Widget OK</h1>
      <p>Si ves esto, /widget ya existe.</p>
    </div>
  )
}

