'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const descriptors = [
  'Building AI systems.',
  "Connecting things that shouldn't connect.",
  'Moving to Cologne.',
  'Making software that works.',
]

const ease = [0.22, 1, 0.36, 1] as [number, number, number, number]

export default function Hero() {
  const [idx, setIdx] = useState(0)

  useEffect(() => {
    const t = setInterval(() => setIdx(i => (i + 1) % descriptors.length), 3000)
    return () => clearInterval(t)
  }, [])

  return (
    <section id="hero" className="min-h-screen flex items-center relative" style={{ zIndex: 2 }}>
      <div className="max-w-[1200px] mx-auto px-6 md:px-12 w-full py-32">
        <motion.p
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '12px',
            textTransform: 'uppercase',
            letterSpacing: '0.12em',
            color: 'var(--text-muted)',
            marginBottom: '32px',
          }}
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease }}
        >
          Software Engineer · Ottawa → Cologne
        </motion.p>

        <div
          style={{
            fontFamily: 'var(--font-display)',
            fontWeight: 700,
            fontSize: 'clamp(72px, 10vw, 120px)',
            letterSpacing: '-0.02em',
            lineHeight: 0.9,
            color: 'var(--text-primary)',
          }}
        >
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease }}
          >
            Cem
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.15, ease }}
          >
            Besli
          </motion.div>
        </div>

        {/* rotating descriptor */}
        <div style={{ marginTop: '32px', height: '44px', position: 'relative' }}>
          <AnimatePresence mode="wait">
            <motion.p
              key={idx}
              style={{
                fontFamily: 'var(--font-display)',
                fontStyle: 'italic',
                fontSize: '28px',
                color: 'var(--text-secondary)',
                position: 'absolute',
              }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              {descriptors[idx]}
            </motion.p>
          </AnimatePresence>
        </div>

        <motion.p
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: '15px',
            fontWeight: 300,
            color: 'var(--text-muted)',
            marginTop: '32px',
          }}
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease }}
        >
          Centennial College &apos;27 · AI, backend, IoT · Open to work in Germany
        </motion.p>

        <motion.div
          className="flex flex-wrap gap-3"
          style={{ marginTop: '40px' }}
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.45, ease }}
        >
          <motion.a
            href="#projects"
            style={{
              background: 'var(--text-primary)',
              color: 'var(--bg)',
              fontFamily: 'var(--font-body)',
              fontSize: '14px',
              padding: '14px 32px',
              borderRadius: '4px',
              textDecoration: 'none',
              display: 'inline-block',
            }}
            whileHover={{ opacity: 0.85 }}
            transition={{ duration: 0.2 }}
          >
            View my work
          </motion.a>

          <motion.a
            href="https://github.com/kranklee"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              background: 'transparent',
              color: 'var(--text-primary)',
              fontFamily: 'var(--font-body)',
              fontSize: '14px',
              padding: '14px 32px',
              borderRadius: '4px',
              border: '1px solid var(--border-hover)',
              textDecoration: 'none',
              display: 'inline-block',
              transition: 'border-color 0.2s ease',
            }}
            whileHover={{ borderColor: 'var(--text-primary)' }}
            transition={{ duration: 0.2 }}
          >
            GitHub ↗
          </motion.a>
        </motion.div>
      </div>

      {/* floating scroll hint */}
      <motion.div
        className="absolute hidden md:block"
        style={{
          bottom: '48px',
          right: '48px',
          fontFamily: 'var(--font-mono)',
          fontSize: '11px',
          color: 'var(--text-muted)',
          textTransform: 'uppercase',
          letterSpacing: '0.1em',
        }}
        animate={{ y: [0, 6, 0] }}
        transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
      >
        Scroll ↓
      </motion.div>
    </section>
  )
}
