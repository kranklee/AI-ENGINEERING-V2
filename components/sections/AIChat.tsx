'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import CardGlow from '@/components/effects/CardGlow'
import SectionLabel from '@/components/ui/SectionLabel'

const ease = [0.22, 1, 0.36, 1] as [number, number, number, number]

type Role = 'user' | 'ai'

const messages: { role: Role; content: string }[] = [
  { role: 'user', content: "What's your strongest technical skill?" },
  {
    role: 'ai',
    content:
      "Connecting systems that don't want to talk to each other — APIs, ML models, IoT sensors. I think in pipelines.",
  },
  { role: 'user', content: 'Are you open to work in Germany?' },
  { role: 'ai', content: 'Yes. Moving to Cologne this year. Backend or AI engineering roles.' },
]

export default function AIChat() {
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section
      id="chat"
      ref={ref}
      className="border-t"
      style={{ borderColor: 'var(--border)', padding: '160px 0', zIndex: 2, position: 'relative' }}
    >
      <div className="max-w-[1200px] mx-auto px-6 md:px-12">
        <SectionLabel number="04" label="ASK ME" />

        <motion.div
          className="max-w-[680px]"
          initial={{ opacity: 0, y: 32 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease }}
        >
          <h2
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: '36px',
              color: 'var(--text-primary)',
              marginBottom: '8px',
            }}
          >
            This portfolio talks back.
          </h2>
          <p
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '15px',
              color: 'var(--text-muted)',
              marginBottom: '40px',
            }}
          >
            AI assistant coming soon. For now, here&apos;s a preview.
          </p>

          <CardGlow
            style={{
              background: 'var(--bg-card)',
              border: '1px solid var(--border)',
              borderRadius: '12px',
              overflow: 'hidden',
            }}
          >
            {/* header */}
            <div
              className="flex items-center justify-between px-5 py-3 border-b"
              style={{ borderColor: 'var(--border)', background: 'var(--bg-secondary)' }}
            >
              <div className="flex items-center gap-2">
                <motion.span
                  className="w-2 h-2 rounded-full"
                  style={{ background: '#22c55e' }}
                  animate={{ opacity: [1, 0.3, 1] }}
                  transition={{ duration: 1.8, repeat: Infinity }}
                />
                <span
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '13px',
                    color: 'var(--text-primary)',
                  }}
                >
                  Cem&apos;s AI
                </span>
              </div>
              <span
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '11px',
                  textTransform: 'uppercase',
                  letterSpacing: '0.08em',
                  color: 'var(--text-muted)',
                  border: '1px solid var(--border)',
                  padding: '2px 8px',
                  borderRadius: '4px',
                }}
              >
                Coming soon
              </span>
            </div>

            {/* messages */}
            <div className="px-6 py-6 space-y-4">
              {messages.map((msg, i) => (
                <div
                  key={i}
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    style={{
                      maxWidth: '80%',
                      padding: '10px 16px',
                      borderRadius:
                        msg.role === 'user'
                          ? '12px 12px 4px 12px'
                          : '12px 12px 12px 4px',
                      fontFamily: 'var(--font-body)',
                      fontSize: '14px',
                      lineHeight: 1.6,
                      background:
                        msg.role === 'user' ? 'var(--text-primary)' : 'var(--bg-secondary)',
                      color: msg.role === 'user' ? 'var(--bg)' : 'var(--text-primary)',
                      border: msg.role === 'ai' ? '1px solid var(--border)' : 'none',
                    }}
                  >
                    {msg.content}
                  </div>
                </div>
              ))}
            </div>

            {/* locked input */}
            <div
              className="border-t flex items-center gap-3 px-5 py-4"
              style={{
                borderColor: 'var(--border)',
                background: 'var(--bg-secondary)',
                opacity: 0.5,
                cursor: 'not-allowed',
                pointerEvents: 'none',
              }}
            >
              <span
                className="flex-1 text-sm"
                style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-body)' }}
              >
                AI integration coming soon...
              </span>
              <button
                disabled
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '13px',
                  padding: '6px 14px',
                  background: 'var(--text-muted)',
                  color: 'var(--bg)',
                  border: 'none',
                  borderRadius: '6px',
                }}
              >
                Send
              </button>
            </div>
          </CardGlow>
        </motion.div>
      </div>
    </section>
  )
}
