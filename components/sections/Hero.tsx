'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const descriptors = [
  'Building AI systems.',
  'Connecting the unconnectable.',
  'Moving to Cologne.',
  'Making software work.',
]

const quickLinks = [
  { label: 'About Me', href: '#about' },
  { label: 'Projects', href: '#projects' },
  { label: 'Skills', href: '#skills' },
  { label: 'Contact', href: '#contact' },
  { label: 'Status', href: '#contact' },
]

const ease = [0.22, 1, 0.36, 1] as [number, number, number, number]

export default function Hero() {
  const [idx, setIdx] = useState(0)

  useEffect(() => {
    const t = setInterval(() => setIdx((i) => (i + 1) % descriptors.length), 3000)
    return () => clearInterval(t)
  }, [])

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center overflow-hidden"
      style={{ zIndex: 10 }}
    >
      {/* Large watermark background text */}
      <div
        aria-hidden
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          fontFamily: 'var(--font-sans)',
          fontWeight: 700,
          fontSize: 'clamp(160px, 25vw, 320px)',
          letterSpacing: '-0.04em',
          color: 'var(--pf-text-primary)',
          opacity: 0.03,
          userSelect: 'none',
          pointerEvents: 'none',
          whiteSpace: 'nowrap',
          lineHeight: 1,
        }}
      >
        CEM
      </div>

      <div className="max-w-[1200px] mx-auto px-6 md:px-12 w-full py-40">
        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease }}
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '12px',
            textTransform: 'uppercase',
            letterSpacing: '0.1em',
            color: 'var(--pf-text-muted)',
            marginBottom: '28px',
          }}
        >
          Software Engineer · Ottawa → Cologne
        </motion.p>

        <h1
          style={{
            fontFamily: 'var(--font-sans)',
            fontWeight: 700,
            fontSize: 'clamp(56px, 9vw, 100px)',
            letterSpacing: '-0.03em',
            lineHeight: 1.05,
            color: 'var(--pf-text-primary)',
            marginBottom: '24px',
          }}
        >
          <motion.span
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease }}
            style={{ display: 'block' }}
          >
            Cem
          </motion.span>
          <motion.span
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.12, ease }}
            style={{ display: 'block' }}
          >
            Besli.
          </motion.span>
        </h1>

        {/* Rotating descriptor */}
        <div style={{ minHeight: '40px', marginBottom: '20px', position: 'relative' }}>
          <AnimatePresence mode="wait">
            <motion.p
              key={idx}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.45 }}
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: '22px',
                fontWeight: 300,
                color: 'var(--pf-text-secondary)',
                position: 'absolute',
              }}
            >
              {descriptors[idx]}
            </motion.p>
          </AnimatePresence>
        </div>

        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3, ease }}
          style={{
            fontSize: '17px',
            fontWeight: 300,
            color: 'var(--pf-text-muted)',
            marginTop: '52px',
            marginBottom: '36px',
          }}
        >
          Centennial College &apos;27 · AI, backend, IoT · Open to work in Germany
        </motion.p>

        {/* CTA buttons */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.42, ease }}
          style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', marginBottom: '40px' }}
        >
          <motion.a
            href="#projects"
            whileHover={{ opacity: 0.88 }}
            transition={{ duration: 0.15 }}
            style={{
              background: 'var(--pf-accent)',
              color: '#fff',
              fontFamily: 'var(--font-sans)',
              fontSize: '15px',
              fontWeight: 500,
              padding: '13px 28px',
              borderRadius: '980px',
              textDecoration: 'none',
              display: 'inline-block',
            }}
          >
            View my work
          </motion.a>
          <motion.a
            href="https://github.com/kranklee"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ borderColor: 'var(--pf-text-primary)' }}
            transition={{ duration: 0.15 }}
            style={{
              background: 'transparent',
              color: 'var(--pf-text-primary)',
              fontFamily: 'var(--font-sans)',
              fontSize: '15px',
              fontWeight: 500,
              padding: '13px 28px',
              borderRadius: '980px',
              border: '1px solid var(--pf-border)',
              textDecoration: 'none',
              display: 'inline-block',
            }}
          >
            GitHub ↗
          </motion.a>
        </motion.div>

        {/* Quick-nav pills */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.55, ease }}
          style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}
        >
          {quickLinks.map(({ label, href }) => (
            <a
              key={label}
              href={href}
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: '13px',
                fontWeight: 400,
                color: 'var(--pf-text-secondary)',
                textDecoration: 'none',
                padding: '6px 14px',
                borderRadius: '980px',
                border: '1px solid var(--pf-border)',
                backdropFilter: 'blur(8px)',
                transition: 'color 0.2s ease, border-color 0.2s ease',
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget
                el.style.color = 'var(--pf-text-primary)'
                el.style.borderColor = 'var(--pf-text-primary)'
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget
                el.style.color = 'var(--pf-text-secondary)'
                el.style.borderColor = 'var(--pf-border)'
              }}
            >
              {label}
            </a>
          ))}
        </motion.div>
      </div>

      {/* Scroll hint */}
      <motion.div
        className="absolute hidden md:block"
        style={{
          bottom: '48px',
          right: '48px',
          fontFamily: 'var(--font-mono)',
          fontSize: '11px',
          color: 'var(--pf-text-muted)',
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
