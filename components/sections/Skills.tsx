'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { skillGroups } from '@/lib/data'
import SkillBadge from '@/components/ui/SkillBadge'

export default function Skills() {
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section
      id="skills"
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
            Stack
          </span>
        </motion.div>

        <div className="space-y-6">
          {skillGroups.map((group, i) => (
            <motion.div
              key={group.category}
              className="flex flex-col sm:flex-row sm:items-start gap-3 sm:gap-6"
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1], delay: i * 0.12 }}
            >
              <span
                className="text-[11px] uppercase tracking-[0.08em] sm:w-[100px] shrink-0 pt-0.5"
                style={{ fontFamily: 'var(--font-mono)', color: 'var(--text-muted)' }}
              >
                {group.category}
              </span>
              <div className="flex flex-wrap gap-2">
                {group.skills.map(skill => (
                  <SkillBadge key={skill} label={skill} />
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
