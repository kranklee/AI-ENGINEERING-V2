'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const infoRows = [
  { label: 'Location', value: 'Ottawa, Canada → Cologne, Germany' },
  { label: 'Education', value: 'Software Engineering Technology, Centennial College 2027' },
  { label: 'Languages', value: 'English (fluent), Turkish (native), German (learning)' },
  { label: 'Status', value: 'Open to work — Germany-based roles preferred' },
  { label: 'Interests', value: 'AI systems, embedded IoT, distributed backends' },
]

const paragraphs = [
  "I'm a software engineering student in Ottawa, spending most of my time building things that live at the intersection of AI and regular software. Not always successfully, but that's the point.",
  "Before the CS path I spent a few years in operations — data analysis at Rogers, security screening at CATSA, managing a restaurant. That stuff changed how I think about systems. Real users, real pressure, real breakage. It's different from classroom problems.",
  "Right now I'm focused on getting to Germany by the time I graduate. There's a gap in the job market there for backend developers who understand AI tooling, and that's exactly where I'm trying to land. I've been learning German on the side, which is slower than I'd like.",
  "When I'm not coding I'm usually reading about compiler design or watching Formula 1 races and pretending I understand the strategy. The AI Engineering repo you're looking at is me building in public — it's messy and ongoing, which is how most real work actually goes.",
]

export default function About() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="about" ref={ref} style={{ position: 'relative', zIndex: 10, padding: '120px 0' }}>
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
          01 — About
        </motion.p>

        <div className="grid md:grid-cols-[55%_45%] gap-16 md:gap-20">
          {/* Left: bio */}
          <div>
            {paragraphs.map((p, i) => (
              <motion.p
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: i * 0.12 }}
                style={{
                  fontSize: '17px',
                  lineHeight: 1.75,
                  color: i === 0 ? 'var(--pf-text-primary)' : 'var(--pf-text-secondary)',
                  marginBottom: '24px',
                  fontWeight: i === 0 ? 400 : 300,
                }}
              >
                {p}
              </motion.p>
            ))}
          </div>

          {/* Right: info card */}
          <div className="md:sticky md:top-[100px] self-start">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              style={{
                background: 'var(--pf-bg-secondary)',
                borderRadius: '16px',
                overflow: 'hidden',
                border: '1px solid var(--pf-border)',
              }}
            >
              {infoRows.map(({ label, value }, i) => (
                <div
                  key={label}
                  style={{
                    padding: '16px 20px',
                    borderBottom: i < infoRows.length - 1 ? '1px solid var(--pf-border)' : 'none',
                  }}
                >
                  <p
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '10px',
                      textTransform: 'uppercase',
                      letterSpacing: '0.1em',
                      color: 'var(--pf-text-muted)',
                      marginBottom: '4px',
                    }}
                  >
                    {label}
                  </p>
                  <p style={{ fontSize: '14px', color: 'var(--pf-text-primary)', lineHeight: 1.5 }}>
                    {value}
                  </p>
                </div>
              ))}
            </motion.div>

            {/* Experience note */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.35 }}
              style={{ marginTop: '16px', padding: '16px 20px', borderRadius: '12px', border: '1px solid var(--pf-border)' }}
            >
              <p
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '10px',
                  textTransform: 'uppercase',
                  letterSpacing: '0.1em',
                  color: 'var(--pf-text-muted)',
                  marginBottom: '8px',
                }}
              >
                Experience
              </p>
              {[
                'Data Analyst @ Rogers Communications',
                'Screening Officer @ CATSA',
                'Assistant Manager @ A&W Canada',
              ].map((job) => (
                <p key={job} style={{ fontSize: '13px', color: 'var(--pf-text-secondary)', lineHeight: 1.8 }}>
                  {job}
                </p>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
