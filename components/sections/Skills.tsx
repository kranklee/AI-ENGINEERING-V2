'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { skillGroups } from '@/lib/data'

export default function Skills() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="skills" ref={ref} style={{ position: 'relative', zIndex: 10, padding: '120px 0' }}>
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
          02 — Stack
        </motion.p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
          {skillGroups.map(({ category, skills }, i) => (
            <motion.div
              key={category}
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              style={{
                display: 'grid',
                gridTemplateColumns: '140px 1fr',
                gap: '24px',
                alignItems: 'center',
                padding: '20px 0',
                borderBottom: '1px solid var(--pf-border)',
              }}
            >
              <p
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '11px',
                  textTransform: 'uppercase',
                  letterSpacing: '0.08em',
                  color: 'var(--pf-text-muted)',
                  flexShrink: 0,
                }}
              >
                {category}
              </p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px 16px' }}>
                {skills.map((skill, j) => (
                  <motion.span
                    key={skill}
                    initial={{ opacity: 0 }}
                    animate={inView ? { opacity: 1 } : {}}
                    transition={{ duration: 0.4, delay: i * 0.08 + j * 0.04 }}
                    style={{
                      fontSize: '15px',
                      fontWeight: 300,
                      color: 'var(--pf-text-secondary)',
                    }}
                  >
                    {skill}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
