'use client'

import { motion } from 'framer-motion'

interface SkillBadgeProps {
  label: string
}

export default function SkillBadge({ label }: SkillBadgeProps) {
  return (
    <motion.span
      className="inline-block px-2.5 py-1 rounded border text-[11px] uppercase tracking-[0.08em] cursor-default"
      style={{
        fontFamily: 'var(--font-mono)',
        background: 'var(--bg-tertiary)',
        borderColor: 'var(--border)',
        color: 'var(--text-secondary)',
      }}
      whileHover={{
        borderColor: 'rgba(0,255,136,0.4)',
        background: 'rgba(0,255,136,0.08)',
        color: '#00ff88',
      }}
      transition={{ duration: 0.2 }}
    >
      {label}
    </motion.span>
  )
}
