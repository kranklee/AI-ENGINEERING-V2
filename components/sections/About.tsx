'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import CardGlow from '@/components/effects/CardGlow'
import SectionLabel from '@/components/ui/SectionLabel'

const ease = [0.22, 1, 0.36, 1] as [number, number, number, number]

const bioParas = [
  "I'm a software engineering student at Centennial College in Ottawa, graduating in 2027. Canadian-Turkish, building toward a career in Cologne.",
  "Came up through operations — airport security screening at CATSA, management at A&W, data work at Rogers. That path taught me how systems actually fail, not just how they look in a controlled demo.",
  "Right now I'm deep in AI and backend engineering. FastAPI, RAG systems, LLM APIs. I think in pipelines.",
  "Turkish is my first language. English fluent. German is a work in progress — good enough to order coffee, working on the rest. Cats over dogs.",
]

const infoRows = [
  { label: 'Location', value: 'Ottawa → Cologne' },
  { label: 'Education', value: "Centennial College '27" },
  { label: 'Languages', value: 'TR · EN · DE (learning)' },
  { label: 'Status', value: 'Open to work in Germany' },
  { label: 'Interests', value: 'AI · Backend · IoT' },
]

export default function About() {
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section
      id="about"
      ref={ref}
      className="border-t"
      style={{ borderColor: 'var(--border)', padding: '160px 0', zIndex: 2, position: 'relative' }}
    >
      <div className="max-w-[1200px] mx-auto px-6 md:px-12">
        <SectionLabel number="01" label="ABOUT" />

        <div className="grid md:grid-cols-[55%_1fr] gap-16 lg:gap-24 items-start">
          {/* prose — left */}
          <div className="space-y-6">
            {bioParas.map((p, i) => (
              <motion.p
                key={i}
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '16px',
                  fontWeight: 300,
                  lineHeight: 1.9,
                  color: 'var(--text-secondary)',
                }}
                initial={{ opacity: 0, y: 32 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, ease, delay: i * 0.15 }}
              >
                {p}
              </motion.p>
            ))}
          </div>

          {/* info card — right, sticky */}
          <motion.div
            className="md:sticky md:top-[120px]"
            initial={{ opacity: 0, y: 32 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease, delay: 0.2 }}
          >
            <CardGlow
              style={{
                background: 'var(--bg-card)',
                border: '1px solid var(--border)',
                borderRadius: '8px',
                padding: '40px',
              }}
            >
              <p
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '12px',
                  textTransform: 'uppercase',
                  letterSpacing: '0.12em',
                  color: 'var(--text-muted)',
                  marginBottom: '24px',
                }}
              >
                Quick facts
              </p>

              <div>
                {infoRows.map(({ label, value }, i) => (
                  <div
                    key={label}
                    className="flex items-baseline gap-4 py-3"
                    style={{
                      borderBottom: i < infoRows.length - 1 ? '1px solid var(--border)' : 'none',
                    }}
                  >
                    <span
                      className="shrink-0 w-[120px]"
                      style={{
                        fontFamily: 'var(--font-body)',
                        fontSize: '13px',
                        color: 'var(--text-muted)',
                      }}
                    >
                      {label}
                    </span>
                    <span
                      style={{
                        fontFamily: 'var(--font-body)',
                        fontSize: '14px',
                        color: 'var(--text-primary)',
                      }}
                    >
                      {value}
                    </span>
                  </div>
                ))}
              </div>

              <p
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '13px',
                  color: 'var(--text-muted)',
                  marginTop: '24px',
                  lineHeight: 1.7,
                }}
              >
                Currently working through FastAPI, RAG pipelines, and LLM API integration.
              </p>
            </CardGlow>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
