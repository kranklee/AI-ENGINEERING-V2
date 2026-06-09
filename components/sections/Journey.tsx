'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { journeyNodes } from '@/lib/data'

const ease = [0.22, 1, 0.36, 1] as [number, number, number, number]

export default function Journey() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="journey" ref={ref} style={{ position: 'relative', zIndex: 10, padding: '100px 0' }}>
      <div className="max-w-[1200px] mx-auto px-6 md:px-12">
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease }}
          style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--pf-muted)', marginBottom: '20px' }}
        >
          Journey
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.08, ease }}
          style={{ fontFamily: 'var(--font-sans)', fontSize: 'clamp(32px, 5vw, 48px)', fontWeight: 600, letterSpacing: '-0.02em', color: 'var(--pf-text)', marginBottom: '72px' }}
        >
          Where I&apos;ve been, where I&apos;m going.
        </motion.h2>

        {/* Desktop: horizontal timeline */}
        <div className="hidden md:block relative">
          {/* Connecting line */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={inView ? { scaleX: 1 } : {}}
            transition={{ duration: 1, delay: 0.3, ease: 'easeOut' }}
            style={{
              position: 'absolute',
              top: '20px',
              left: 'calc(10% + 16px)',
              right: 'calc(10% + 16px)',
              height: '1px',
              background: 'var(--pf-border)',
              transformOrigin: 'left',
            }}
          />

          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            {journeyNodes.map((node, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 24 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.25 + i * 0.15, ease }}
                style={{ width: `${100 / journeyNodes.length}%`, paddingRight: i < journeyNodes.length - 1 ? '16px' : 0 }}
              >
                {/* Circle */}
                <div style={{ width: '36px', height: '36px', borderRadius: '50%', border: '2px solid var(--pf-border)', background: 'var(--pf-bg)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '18px', marginBottom: '20px', position: 'relative', zIndex: 1 }}>
                  {node.emoji}
                </div>

                <p style={{ fontFamily: 'var(--font-sans)', fontSize: '14px', fontWeight: 600, color: 'var(--pf-text)', marginBottom: '8px' }}>
                  {node.label}
                </p>
                {node.lines.map((line, j) => (
                  <p key={j} style={{ fontFamily: 'var(--font-sans)', fontSize: '13px', fontWeight: 300, color: 'var(--pf-muted)', lineHeight: 1.6 }}>
                    {line}
                  </p>
                ))}
              </motion.div>
            ))}
          </div>
        </div>

        {/* Mobile: vertical timeline */}
        <div className="md:hidden relative">
          <div style={{ position: 'absolute', top: '18px', left: '17px', bottom: '0', width: '1px', background: 'var(--pf-border)' }} />
          <div style={{ display: 'flex', flexDirection: 'column', gap: '40px' }}>
            {journeyNodes.map((node, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -16 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.2 + i * 0.1, ease }}
                style={{ display: 'flex', gap: '20px' }}
              >
                <div style={{ width: '36px', height: '36px', borderRadius: '50%', border: '2px solid var(--pf-border)', background: 'var(--pf-bg)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '16px', flexShrink: 0, position: 'relative', zIndex: 1 }}>
                  {node.emoji}
                </div>
                <div style={{ paddingTop: '6px' }}>
                  <p style={{ fontFamily: 'var(--font-sans)', fontSize: '14px', fontWeight: 600, color: 'var(--pf-text)', marginBottom: '6px' }}>{node.label}</p>
                  {node.lines.map((line, j) => (
                    <p key={j} style={{ fontFamily: 'var(--font-sans)', fontSize: '13px', fontWeight: 300, color: 'var(--pf-muted)', lineHeight: 1.6 }}>{line}</p>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
