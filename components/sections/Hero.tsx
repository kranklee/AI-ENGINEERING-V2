'use client'

import { motion } from 'framer-motion'

const ease = [0.22, 1, 0.36, 1] as [number, number, number, number]

const quickLinks = [
  { label: 'About', href: '#about' },
  { label: 'Stack', href: '#stack' },
  { label: 'Projects', href: '#projects' },
  { label: 'GitHub', href: '#github' },
  { label: 'Contact', href: '#contact' },
]

export default function Hero() {
  return (
    <section id="hero" className="relative min-h-screen flex items-center overflow-hidden" style={{ zIndex: 10 }}>
      {/* Ghost watermark */}
      <div
        aria-hidden
        style={{
          position: 'absolute',
          bottom: '5%',
          right: '-2%',
          fontFamily: 'var(--font-sans)',
          fontWeight: 700,
          fontSize: 'clamp(200px, 30vw, 400px)',
          letterSpacing: '-0.04em',
          color: 'var(--pf-text)',
          opacity: 0.03,
          userSelect: 'none',
          pointerEvents: 'none',
          lineHeight: 1,
        }}
      >
        CEM
      </div>

      <div className="max-w-[1200px] mx-auto px-6 md:px-12 w-full py-40">
        {/* Status badge */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease }}
          style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', marginBottom: '40px' }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: '6px 14px',
              borderRadius: '999px',
              border: '1px solid var(--pf-border)',
              backdropFilter: 'blur(8px)',
              background: 'rgba(255,255,255,0.04)',
            }}
          >
            <motion.span
              animate={{ opacity: [1, 0.3, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              style={{ width: '7px', height: '7px', borderRadius: '50%', background: '#30d158', display: 'inline-block', flexShrink: 0 }}
            />
            <span style={{ fontFamily: 'var(--font-sans)', fontSize: '13px', fontWeight: 400, color: 'var(--pf-muted)' }}>
              Open to work in Germany
            </span>
          </div>
        </motion.div>

        {/* Headline */}
        <h1
          style={{
            fontFamily: 'var(--font-sans)',
            fontWeight: 700,
            fontSize: 'clamp(72px, 12vw, 140px)',
            letterSpacing: '-0.03em',
            lineHeight: 0.95,
            color: 'var(--pf-text)',
            marginBottom: '28px',
          }}
        >
          <motion.span
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease }}
            style={{ display: 'block' }}
          >
            Backend
          </motion.span>
          <motion.span
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15, ease }}
            style={{ display: 'block' }}
          >
            Engineering.
          </motion.span>
        </h1>

        {/* Sub-headline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3, ease }}
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '14px',
            color: 'var(--pf-muted)',
            letterSpacing: '0.05em',
            marginBottom: '20px',
          }}
        >
          Linux · Docker · PostgreSQL · APIs · Automation
        </motion.p>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.38, ease }}
          style={{
            fontFamily: 'var(--font-sans)',
            fontSize: '18px',
            fontWeight: 300,
            color: 'var(--pf-muted)',
            marginBottom: '40px',
          }}
        >
          Software Engineering student moving from Ontario to Cologne, Germany.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.46, ease }}
          style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', marginBottom: '48px' }}
        >
          <motion.a
            href="#projects"
            whileHover={{ opacity: 0.85 }}
            transition={{ duration: 0.15 }}
            style={{
              background: 'var(--pf-accent)',
              color: '#fff',
              fontFamily: 'var(--font-sans)',
              fontSize: '15px',
              fontWeight: 500,
              padding: '12px 24px',
              borderRadius: '8px',
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
            whileHover={{ borderColor: 'var(--pf-text)' }}
            transition={{ duration: 0.15 }}
            style={{
              background: 'transparent',
              color: 'var(--pf-text)',
              fontFamily: 'var(--font-sans)',
              fontSize: '15px',
              fontWeight: 500,
              padding: '12px 24px',
              borderRadius: '8px',
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
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.56, ease }}
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
                color: 'var(--pf-muted)',
                textDecoration: 'none',
                padding: '5px 14px',
                borderRadius: '999px',
                border: '1px solid var(--pf-border)',
                backdropFilter: 'blur(8px)',
                transition: 'color 0.2s ease, border-color 0.2s ease',
              }}
              onMouseEnter={e => { const el = e.currentTarget; el.style.color = 'var(--pf-text)'; el.style.borderColor = 'var(--pf-muted)' }}
              onMouseLeave={e => { const el = e.currentTarget; el.style.color = 'var(--pf-muted)'; el.style.borderColor = 'var(--pf-border)' }}
            >
              {label}
            </a>
          ))}
        </motion.div>
      </div>

      <motion.div
        className="absolute hidden md:block"
        style={{ bottom: '48px', right: '48px', fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--pf-muted)', textTransform: 'uppercase', letterSpacing: '0.1em' }}
        animate={{ y: [0, 6, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
      >
        Scroll ↓
      </motion.div>
    </section>
  )
}
