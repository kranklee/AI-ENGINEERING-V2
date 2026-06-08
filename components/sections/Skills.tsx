'use client'

import { useRef, Fragment } from 'react'
import { motion, useInView } from 'framer-motion'
import { skillGroups } from '@/lib/data'
import SectionLabel from '@/components/ui/SectionLabel'

const ease = [0.22, 1, 0.36, 1] as [number, number, number, number]

export default function Skills() {
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section
      id="skills"
      ref={ref}
      className="border-t"
      style={{ borderColor: 'var(--border)', padding: '160px 0', zIndex: 2, position: 'relative' }}
    >
      <div className="max-w-[1200px] mx-auto px-6 md:px-12">
        <SectionLabel number="02" label="STACK" />

        <div className="space-y-8">
          {skillGroups.map((group, i) => (
            <motion.div
              key={group.category}
              className="flex items-center gap-6"
              initial={{ opacity: 0, y: 32 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, ease, delay: i * 0.15 }}
            >
              <span
                className="shrink-0 w-[110px]"
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '11px',
                  textTransform: 'uppercase',
                  letterSpacing: '0.12em',
                  color: 'var(--text-muted)',
                }}
              >
                {group.category}
              </span>

              <div className="flex-1 h-px" style={{ background: 'var(--border)' }} />

              <p style={{ fontFamily: 'var(--font-body)', fontSize: '14px' }}>
                {group.skills.map((skill, j) => (
                  <Fragment key={skill}>
                    <motion.span
                      style={{ color: 'var(--text-secondary)', cursor: 'default' }}
                      whileHover={{ color: 'var(--text-primary)' }}
                      transition={{ duration: 0.15 }}
                    >
                      {skill}
                    </motion.span>
                    {j < group.skills.length - 1 && (
                      <span style={{ color: 'var(--text-muted)' }}> · </span>
                    )}
                  </Fragment>
                ))}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
