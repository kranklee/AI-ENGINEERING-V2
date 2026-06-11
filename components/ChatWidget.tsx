'use client'
import { useState, useRef, useEffect, FormEvent, KeyboardEvent } from 'react'
import { useChat } from '@/hooks/useChat'

export default function ChatWidget() {
  const { messages, isLoading, sendMessage } = useChat()
  const [open, setOpen] = useState(false)
  const [input, setInput] = useState('')
  const bottomRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLTextAreaElement>(null)

  // Auto-scroll on new messages
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, isLoading])

  // Focus input when opened
  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 50)
  }, [open])

  async function handleSubmit(e?: FormEvent) {
    e?.preventDefault()
    if (!input.trim() || isLoading) return
    const text = input
    setInput('')
    await sendMessage(text)
  }

  function handleKey(e: KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSubmit()
    }
  }

  return (
    <>
      {/* Floating bubble button */}
      <button
        onClick={() => setOpen(o => !o)}
        aria-label={open ? 'Close chat' : 'Open chat'}
        style={{
          position: 'fixed',
          bottom: 28,
          right: 28,
          width: 52,
          height: 52,
          borderRadius: '50%',
          background: 'var(--ac)',
          border: 'none',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 9998,
          boxShadow: '0 4px 24px rgba(0,0,0,0.25)',
          transition: 'transform 0.2s, box-shadow 0.2s',
          flexShrink: 0,
        }}
        onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform = 'scale(1.08)' }}
        onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform = 'scale(1)' }}
      >
        {open ? (
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
            <path d="M2 2L16 16M16 2L2 16" stroke="var(--btn-tx)" strokeWidth="2.2" strokeLinecap="round" />
          </svg>
        ) : (
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
            <path d="M12 3C7.03 3 3 7.03 3 12c0 1.77.49 3.41 1.33 4.82L3 21l4.18-1.33A8.96 8.96 0 0012 21c4.97 0 9-4.03 9-9s-4.03-9-9-9z" stroke="var(--btn-tx)" strokeWidth="1.8" strokeLinejoin="round" fill="none" />
            <circle cx="8.5" cy="12" r="1" fill="var(--btn-tx)" />
            <circle cx="12" cy="12" r="1" fill="var(--btn-tx)" />
            <circle cx="15.5" cy="12" r="1" fill="var(--btn-tx)" />
          </svg>
        )}
      </button>

      {/* Chat panel */}
      {open && (
        <div
          data-chat-panel
          onWheel={e => e.stopPropagation()}
          onTouchMove={e => e.stopPropagation()}
          style={{
            position: 'fixed',
            bottom: 92,
            right: 28,
            width: 'min(380px, calc(100vw - 40px))',
            height: 500,
            background: 'var(--bg2)',
            border: '1px solid var(--br)',
            borderRadius: 16,
            display: 'flex',
            flexDirection: 'column',
            zIndex: 9997,
            fontFamily: 'var(--font-sans)',
            boxShadow: '0 8px 40px rgba(0,0,0,0.2)',
            overflow: 'hidden',
          }}
        >
          {/* Header */}
          <div
            style={{
              padding: '14px 20px',
              borderBottom: '1px solid var(--br)',
              display: 'flex',
              alignItems: 'center',
              gap: 10,
              flexShrink: 0,
            }}
          >
            <div
              style={{
                width: 8,
                height: 8,
                borderRadius: '50%',
                background: 'var(--ac)',
                boxShadow: '0 0 6px var(--ac)',
              }}
            />
            <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--tx)' }}>
              Ask about Cem
            </span>
            <span style={{ fontSize: 11, color: 'var(--tx3)', fontFamily: 'var(--font-mono)', marginLeft: 'auto' }}>
              AI
            </span>
          </div>

          {/* Messages */}
          <div
            style={{
              flex: 1,
              overflowY: 'scroll',
              overscrollBehavior: 'contain',
              padding: '16px 16px 8px',
              display: 'flex',
              flexDirection: 'column',
              gap: 12,
            }}
          >
            {messages.length === 0 && (
              <div style={{ margin: 'auto', textAlign: 'center', padding: '20px 12px' }}>
                <div style={{ fontSize: 22, marginBottom: 10 }}>👋</div>
                <p style={{ fontSize: 13, color: 'var(--tx2)', lineHeight: 1.6, fontWeight: 300 }}>
                  Ask me anything about Cem — his projects, experience, skills, or goals.
                </p>
              </div>
            )}

            {messages.map((msg, i) => (
              <div
                key={i}
                style={{
                  display: 'flex',
                  justifyContent: msg.role === 'user' ? 'flex-end' : 'flex-start',
                }}
              >
                <div
                  style={{
                    maxWidth: '82%',
                    padding: '9px 13px',
                    borderRadius: msg.role === 'user' ? '14px 14px 4px 14px' : '14px 14px 14px 4px',
                    background: msg.role === 'user' ? 'var(--ac)' : 'var(--bg3, var(--bg))',
                    border: msg.role === 'user' ? 'none' : '1px solid var(--br)',
                    color: msg.role === 'user' ? 'var(--btn-tx)' : 'var(--tx)',
                    fontSize: 13,
                    lineHeight: 1.55,
                    fontWeight: 300,
                    wordBreak: 'break-word',
                    whiteSpace: 'pre-wrap',
                  }}
                >
                  {msg.content || (msg.role === 'assistant' && isLoading && i === messages.length - 1 ? (
                    <TypingIndicator />
                  ) : null)}
                  {msg.role === 'assistant' && !msg.content && isLoading && i === messages.length - 1 && (
                    <TypingIndicator />
                  )}
                </div>
              </div>
            ))}

            {/* Typing indicator when no assistant placeholder yet but loading */}
            {isLoading && messages.length > 0 && messages[messages.length - 1].role === 'assistant' && !messages[messages.length - 1].content && (
              null // handled above
            )}

            <div ref={bottomRef} />
          </div>

          {/* Input */}
          <form
            onSubmit={handleSubmit}
            style={{
              borderTop: '1px solid var(--br)',
              padding: '12px 12px 12px',
              display: 'flex',
              gap: 8,
              alignItems: 'flex-end',
              flexShrink: 0,
            }}
          >
            <textarea
              ref={inputRef}
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={handleKey}
              placeholder="Ask something…"
              disabled={isLoading}
              rows={1}
              style={{
                flex: 1,
                background: 'var(--bg)',
                border: '1px solid var(--br)',
                borderRadius: 10,
                padding: '8px 12px',
                fontSize: 13,
                color: 'var(--tx)',
                fontFamily: 'var(--font-sans)',
                resize: 'none',
                outline: 'none',
                lineHeight: 1.5,
                maxHeight: 100,
                overflowY: 'auto',
                opacity: isLoading ? 0.6 : 1,
                transition: 'border-color 0.2s',
              }}
              onFocus={e => (e.currentTarget.style.borderColor = 'var(--br2)')}
              onBlur={e => (e.currentTarget.style.borderColor = 'var(--br)')}
            />
            <button
              type="submit"
              disabled={isLoading || !input.trim()}
              style={{
                width: 36,
                height: 36,
                borderRadius: '50%',
                background: isLoading || !input.trim() ? 'var(--br)' : 'var(--ac)',
                border: 'none',
                cursor: isLoading || !input.trim() ? 'not-allowed' : 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
                transition: 'background 0.2s',
              }}
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M13 1L6 8M13 1L9 13L6 8M13 1L1 5L6 8" stroke="var(--btn-tx)" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </form>
        </div>
      )}
    </>
  )
}

function TypingIndicator() {
  return (
    <span style={{ display: 'inline-flex', gap: 4, alignItems: 'center', height: 16 }}>
      {[0, 1, 2].map(i => (
        <span
          key={i}
          style={{
            width: 6,
            height: 6,
            borderRadius: '50%',
            background: 'var(--tx3)',
            display: 'inline-block',
            animation: `chat-bounce 1.2s ease-in-out ${i * 0.2}s infinite`,
          }}
        />
      ))}
      <style>{`
        @keyframes chat-bounce {
          0%, 80%, 100% { transform: translateY(0); opacity: 0.4; }
          40% { transform: translateY(-5px); opacity: 1; }
        }
      `}</style>
    </span>
  )
}
