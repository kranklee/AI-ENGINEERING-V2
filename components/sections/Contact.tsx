'use client'

import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import SectionLabel from '@/components/ui/SectionLabel'

const ease = [0.22, 1, 0.36, 1] as [number, number, number, number]

const contactRows = [
  { label: 'GitHub', display: 'github.com/kranklee', href: 'https://github.com/kranklee' },
  { label: 'Email', display: 'cem@cembesli.com', href: 'mailto:cem@cembesli.com' },
  { label: 'LinkedIn', display: 'linkedin.com/in/cembesli', href: 'https://linkedin.com/in/cembesli' },
]

function ContactRow({ label, display, href, delay }: {
  label: string
  display: string
  href: string
  delay: number
}) {
  const [hovered, setHovered] = useState(false)

  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center justify-between py-7 border-b"
      style={{
        borderColor: 'var(--border)',
        textDecoration: 'none',
        background: hovered ? 'var(--bg-secondary)' : 'transparent',
        transition: 'background 0.2s ease',
        paddingLeft: '16px',
        paddingRight: '16px',
        marginLeft: '-16px',
        marginRight: '-16px',
        borderRadius: '4px',
      }}
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.8, ease, delay }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <span
        style={{
          fontFamily: 'var(--font-body)',
          fontSize: '18px',
          fontWeight: 400,
          color: 'var(--text-primary)',
        }}
      >
        {label}
      </span>
      <span
        style={{
          fontFamily: 'var(--font-body)',
          fontSize: '18px',
          color: hovered ? 'var(--text-primary)' : 'var(--text-secondary)',
          transition: 'color 0.2s ease',
        }}
      >
        {display} ↗
      </span>
    </motion.a>
  )
}

export default function Contact() {
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section
      id="contact"
      ref={ref}
      className="border-t"
      style={{ borderColor: 'var(--border)', padding: '160px 0', zIndex: 2, position: 'relative' }}
    >
      <div className="max-w-[1200px] mx-auto px-6 md:px-12">
        <SectionLabel number="05" label="CONTACT" />

        <motion.h2
          style={{
            fontFamily: 'var(--font-display)',
            fontWeight: 700,
            fontSize: 'clamp(40px, 6vw, 72px)',
            color: 'var(--text-primary)',
            marginBottom: '12px',
            lineHeight: 1.1,
          }}
          initial={{ opacity: 0, y: 32 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease }}
        >
          Let&apos;s work together.
        </motion.h2>

        <motion.p
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: '16px',
            fontWeight: 300,
            color: 'var(--text-secondary)',
            marginBottom: '64px',
          }}
          initial={{ opacity: 0, y: 32 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease, delay: 0.1 }}
        >
          Open to roles in Germany and remote opportunities.
        </motion.p>

        <div>
          {contactRows.map((row, i) => (
            <ContactRow key={row.label} {...row} delay={0.2 + i * 0.1} />
          ))}
        </div>
      </div>
    </section>
  )
}
