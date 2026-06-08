'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const messages = [
  { role: 'user', text: "What kind of work are you looking for?" },
  { role: 'ai', text: "Backend and AI engineering roles in Germany, ideally starting mid-2027 after I graduate. Open to junior roles with real responsibility." },
  { role: 'user', text: "What are you building right now?" },
  { role: 'ai', text: "A RAG pipeline for document Q&A and working through the AI Engineering Path repo. Also this portfolio — the chat section you're reading right now." },
  { role: 'user', text: "German level?" },
  { role: 'ai', text: "A2 heading toward B1. I can order food and apologize for my German in German, which feels like a start." },
]

export default function AIChat() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="aichat" ref={ref} style={{ position: 'relative', zIndex: 10, padding: '120px 0' }}>
      <div className="max-w-[1200px] mx-auto px-6 md:px-12">
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '12px',
            textTransform: 'uppercase',
            letterSpacing: '0.1em',
            color: 'var(--pf-text-muted)',
            marginBottom: '64px',
          }}
        >
          04 — Ask me anything
        </motion.p>

        <div className="max-w-2xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: 'clamp(28px, 4vw, 40px)',
              fontWeight: 600,
              letterSpacing: '-0.02em',
              color: 'var(--pf-text-primary)',
              marginBottom: '8px',
              textAlign: 'center',
            }}
          >
            This portfolio talks back.
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            style={{
              fontSize: '15px',
              color: 'var(--pf-text-muted)',
              textAlign: 'center',
              marginBottom: '32px',
              fontWeight: 300,
            }}
          >
            AI integration coming soon. Preview below.
          </motion.p>

          {/* Chat card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            style={{
              border: '1px solid var(--pf-border)',
              borderRadius: '16px',
              overflow: 'hidden',
              background: 'var(--pf-bg-secondary)',
            }}
          >
            {/* Header */}
            <div
              style={{
                padding: '14px 20px',
                borderBottom: '1px solid var(--pf-border)',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
              }}
            >
              <motion.span
                animate={{ opacity: [1, 0.3, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                style={{
                  width: '8px',
                  height: '8px',
                  borderRadius: '50%',
                  background: '#30d158',
                  display: 'inline-block',
                }}
              />
              <span
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '12px',
                  color: 'var(--pf-text-muted)',
                }}
              >
                cem-ai · claude-powered
              </span>
            </div>

            {/* Messages */}
            <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
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
                      maxWidth: '78%',
                      padding: '10px 14px',
                      borderRadius: msg.role === 'user' ? '12px 12px 2px 12px' : '12px 12px 12px 2px',
                      background: msg.role === 'user' ? 'var(--pf-accent)' : 'var(--pf-bg)',
                      color: msg.role === 'user' ? '#fff' : 'var(--pf-text-primary)',
                      fontSize: '14px',
                      lineHeight: 1.55,
                      fontWeight: 300,
                      border: msg.role === 'ai' ? '1px solid var(--pf-border)' : 'none',
                    }}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}
            </div>

            {/* Locked input */}
            <div
              style={{
                padding: '12px 16px',
                borderTop: '1px solid var(--pf-border)',
                display: 'flex',
                gap: '8px',
                opacity: 0.45,
                pointerEvents: 'none',
                cursor: 'not-allowed',
              }}
            >
              <div
                style={{
                  flex: 1,
                  padding: '10px 14px',
                  borderRadius: '8px',
                  border: '1px solid var(--pf-border)',
                  background: 'var(--pf-bg)',
                  fontSize: '14px',
                  color: 'var(--pf-text-muted)',
                }}
              >
                Ask anything about Cem...
              </div>
              <div
                style={{
                  padding: '10px 18px',
                  borderRadius: '8px',
                  background: 'var(--pf-accent)',
                  color: '#fff',
                  fontSize: '14px',
                  fontWeight: 500,
                }}
              >
                Send
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
