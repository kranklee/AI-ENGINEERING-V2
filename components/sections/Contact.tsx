'use client'

import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'

const rows = [
  { label: 'GitHub', value: 'github.com/kranklee', href: 'https://github.com/kranklee' },
  { label: 'Email', value: 'cem@cembesli.com', href: 'mailto:cem@cembesli.com' },
  { label: 'LinkedIn', value: 'linkedin.com/in/cembesli', href: 'https://linkedin.com/in/cembesli' },
]

function ContactRow({ label, value, href, index, parentInView }: {
  label: string
  value: string
  href: string
  index: number
  parentInView: boolean
}) {
  const [hovered, setHovered] = useState(false)

  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, y: 16 }}
      animate={parentInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '24px 20px',
        borderRadius: '12px',
        background: hovered ? 'var(--pf-bg-secondary)' : 'transparent',
        textDecoration: 'none',
        transition: 'background 0.2s ease',
      }}
    >
      <span
        style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '11px',
          textTransform: 'uppercase',
          letterSpacing: '0.1em',
          color: 'var(--pf-text-muted)',
          width: '80px',
          flexShrink: 0,
        }}
      >
        {label}
      </span>
      <span
        style={{
          flex: 1,
          fontSize: '17px',
          fontWeight: 400,
          color: 'var(--pf-text-primary)',
          paddingLeft: '24px',
        }}
      >
        {value}
      </span>
      <span
        style={{
          fontSize: '20px',
          color: hovered ? 'var(--pf-text-primary)' : 'var(--pf-text-muted)',
          transition: 'color 0.2s ease',
        }}
      >
        ↗
      </span>
    </motion.a>
  )
}

export default function Contact() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="contact" ref={ref} style={{ position: 'relative', zIndex: 10, padding: '120px 0' }}>
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
          05 — Contact
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
          style={{
            fontFamily: 'var(--font-sans)',
            fontSize: 'clamp(40px, 6vw, 72px)',
            fontWeight: 600,
            letterSpacing: '-0.02em',
            color: 'var(--pf-text-primary)',
            marginBottom: '64px',
            lineHeight: 1.05,
          }}
        >
          Let&apos;s work together.
        </motion.h2>

        <div style={{ borderTop: '1px solid var(--pf-border)' }}>
          {rows.map((row, i) => (
            <div key={row.label} style={{ borderBottom: '1px solid var(--pf-border)' }}>
              <ContactRow {...row} index={i} parentInView={inView} />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
