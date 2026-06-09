'use client'

import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { Terminal, Box, Database, Zap, Cpu, Globe } from 'lucide-react'
import { focusCards } from '@/lib/data'

const ease = [0.22, 1, 0.36, 1] as [number, number, number, number]

const iconMap: Record<string, React.ElementType> = {
  terminal: Terminal,
  box: Box,
  database: Database,
  zap: Zap,
  cpu: Cpu,
  globe: Globe,
}

function FocusCard({ card, delay, parentInView }: { card: typeof focusCards[0]; delay: number; parentInView: boolean }) {
  const [hovered, setHovered] = useState(false)
  const Icon = iconMap[card.icon] ?? Terminal

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={parentInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay, ease }}
      whileHover={{ y: -2 }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      style={{
        background: 'var(--pf-surface)',
        border: `1px solid ${hovered ? 'rgba(0,0,0,0.2)' : 'var(--pf-border)'}`,
        borderRadius: '12px',
        padding: '24px',
        display: 'flex',
        flexDirection: 'column',
        gap: '12px',
        transition: 'border-color 0.25s ease',
        cursor: 'default',
      }}
    >
      <Icon size={28} style={{ color: 'var(--pf-accent)' }} />
      <p style={{ fontFamily: 'var(--font-sans)', fontSize: '17px', fontWeight: 600, color: 'var(--pf-text)' }}>{card.name}</p>
      <p style={{ fontFamily: 'var(--font-sans)', fontSize: '14px', fontWeight: 300, color: 'var(--pf-muted)', lineHeight: 1.6, flex: 1 }}>{card.description}</p>

      {/* Status bar */}
      <div style={{ height: '3px', borderRadius: '2px', background: 'var(--pf-border)', overflow: 'hidden' }}>
        <motion.div
          initial={{ width: 0 }}
          animate={parentInView ? { width: `${card.intensity}%` } : {}}
          transition={{ duration: 0.9, delay: delay + 0.2, ease: 'easeOut' }}
          style={{ height: '100%', background: 'var(--pf-accent)', borderRadius: '2px' }}
        />
      </div>
    </motion.div>
  )
}

export default function Dashboard() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="stack" ref={ref} style={{ position: 'relative', zIndex: 10, padding: '100px 0' }}>
      <div className="max-w-[1200px] mx-auto px-6 md:px-12">
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease }}
          style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--pf-muted)', marginBottom: '16px' }}
        >
          Current Focus
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.08, ease }}
          style={{ fontFamily: 'var(--font-sans)', fontSize: 'clamp(32px, 5vw, 48px)', fontWeight: 600, letterSpacing: '-0.02em', color: 'var(--pf-text)', marginBottom: '56px' }}
        >
          What I&apos;m building with.
        </motion.h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {focusCards.map((card, i) => (
            <FocusCard key={card.name} card={card} delay={0.1 + i * 0.08} parentInView={inView} />
          ))}
        </div>
      </div>
    </section>
  )
}
