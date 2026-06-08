'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

type Role = 'user' | 'ai'

const messages: { role: Role; content: string }[] = [
  { role: 'user', content: "What's your strongest technical skill?" },
  {
    role: 'ai',
    content:
      'Connecting disparate systems — backend APIs, ML models, IoT sensors. I think in pipelines.',
  },
  { role: 'user', content: 'Are you open to work in Germany?' },
  {
    role: 'ai',
    content:
      'Yes — moving to Cologne this year. Looking for backend or AI engineering roles.',
  },
]

export default function AIChat() {
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section
      id="chat"
      ref={ref}
      className="py-[120px] border-t"
      style={{ borderColor: 'rgba(255,255,255,0.05)' }}
    >
      <div className="max-w-[1100px] mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
          className="mb-12"
        >
          <span
            className="text-[11px] uppercase tracking-[0.08em]"
            style={{ fontFamily: 'var(--font-mono)', color: 'var(--accent)' }}
          >
            Ask me anything
          </span>
        </motion.div>

        <motion.div
          className="max-w-[680px] mx-auto"
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1], delay: 0.12 }}
        >
          <div
            className="rounded-xl overflow-hidden border"
            style={{ borderColor: 'var(--border)', background: 'var(--bg-secondary)' }}
          >
            <div
              className="flex items-center gap-3 px-5 py-4 border-b"
              style={{ borderColor: 'var(--border)' }}
            >
              <span
                className="text-sm"
                style={{ fontFamily: 'var(--font-display)', color: 'var(--text-primary)' }}
              >
                Cem&apos;s AI Assistant
              </span>
              <motion.span
                className="w-2 h-2 rounded-full"
                style={{ background: 'var(--accent)' }}
                animate={{ opacity: [1, 0.25, 1] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
              />
            </div>

            <div className="p-5 space-y-3 min-h-[220px]">
              {messages.map((msg, i) => (
                <div
                  key={i}
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className="max-w-[82%] px-4 py-2.5 rounded-lg text-[14px] leading-[1.6] border"
                    style={{
                      background:
                        msg.role === 'user' ? 'rgba(0,255,136,0.08)' : 'var(--bg-tertiary)',
                      color: msg.role === 'user' ? '#00ff88' : 'var(--text-primary)',
                      borderColor:
                        msg.role === 'user' ? 'rgba(0,255,136,0.2)' : 'var(--border)',
                    }}
                  >
                    {msg.content}
                  </div>
                </div>
              ))}
            </div>

            <div
              className="border-t px-4 py-3 flex items-center gap-3"
              style={{
                borderColor: 'var(--border)',
                opacity: 0.4,
                cursor: 'not-allowed',
                pointerEvents: 'none',
              }}
            >
              <span
                className="flex-1 text-[14px]"
                style={{ color: 'var(--text-muted)' }}
              >
                AI integration coming soon...
              </span>
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                style={{ color: 'var(--text-muted)' }}
              >
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                <path d="M7 11V7a5 5 0 0 1 10 0v4" />
              </svg>
            </div>
          </div>

          <p
            className="mt-4 text-center text-[13px]"
            style={{ fontFamily: 'var(--font-mono)', color: 'var(--text-muted)' }}
          >
            Powered by Anthropic API — coming soon
          </p>
        </motion.div>
      </div>
    </section>
  )
}
