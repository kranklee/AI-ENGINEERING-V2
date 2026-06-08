'use client'

import { motion } from 'framer-motion'
import TypeWriter from '@/components/ui/TypeWriter'

const typeStrings = [
  'Software Engineering Student.',
  'Building AI systems.',
  'Automating the boring stuff.',
  'Moving to Cologne soon.',
]

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center"
      style={{
        backgroundImage:
          'radial-gradient(circle, rgba(255,255,255,0.06) 1px, transparent 1px)',
        backgroundSize: '32px 32px',
      }}
    >
      <div className="max-w-[1100px] mx-auto px-6 py-32 w-full">
        <motion.div
          className="max-w-[800px]"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <p
            className="text-[13px] mb-6"
            style={{ fontFamily: 'var(--font-mono)', color: 'var(--text-muted)' }}
          >
            cembesli.com
          </p>

          <h1
            className="text-[48px] md:text-[72px] font-light leading-none mb-6"
            style={{
              fontFamily: 'var(--font-display)',
              letterSpacing: '-0.02em',
              color: 'var(--text-primary)',
            }}
          >
            Cem Besli
          </h1>

          <div
            className="text-[20px] md:text-[22px] min-h-[32px]"
            style={{ color: 'var(--text-secondary)' }}
          >
            <TypeWriter strings={typeStrings} />
          </div>

          <p className="text-[15px] mt-3" style={{ color: 'var(--text-muted)' }}>
            Canada → Germany · Centennial College &apos;27 · AI &amp; Backend
          </p>

          <div className="flex flex-wrap gap-4 mt-10">
            <motion.a
              href="#projects"
              className="px-7 py-3 text-sm border"
              style={{
                borderColor: 'var(--accent)',
                color: 'var(--accent)',
                background: 'transparent',
              }}
              whileHover={{ background: 'rgba(0,255,136,0.08)' }}
              transition={{ duration: 0.2 }}
            >
              View Projects
            </motion.a>

            <motion.a
              href="https://github.com/kranklee"
              target="_blank"
              rel="noopener noreferrer"
              className="px-7 py-3 text-sm border"
              style={{
                borderColor: 'var(--border)',
                color: 'var(--text-secondary)',
                background: 'transparent',
              }}
              whileHover={{ borderColor: 'rgba(255,255,255,0.16)', color: 'var(--text-primary)' }}
              transition={{ duration: 0.2 }}
            >
              GitHub →
            </motion.a>
          </div>
        </motion.div>
      </div>

      <motion.div
        className="absolute bottom-8 right-6 text-[12px]"
        style={{ fontFamily: 'var(--font-mono)', color: 'var(--text-muted)' }}
        animate={{ opacity: [0.4, 1, 0.4] }}
        transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
      >
        Scroll ↓
      </motion.div>
    </section>
  )
}
