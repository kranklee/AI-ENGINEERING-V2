'use client'

import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'

const ease = [0.22, 1, 0.36, 1] as [number, number, number, number]

const contactLinks = [
  { label: 'GitHub', value: 'github.com/kranklee', href: 'https://github.com/kranklee' },
  { label: 'Email', value: 'cem@cembesli.com', href: 'mailto:cem@cembesli.com' },
  { label: 'LinkedIn', value: 'linkedin.com/in/cembesli', href: 'https://linkedin.com/in/cembesli' },
]

const previewMessages = [
  { role: 'user', text: 'What backend stack are you most comfortable with?' },
  { role: 'ai', text: 'Python with FastAPI for async APIs, PostgreSQL for the database layer, Docker for containerization. That combination handles most things cleanly.' },
  { role: 'user', text: 'Are you open to junior roles in Germany?' },
  { role: 'ai', text: 'Yes. Looking for roles in Germany starting 2025-2026, ideally backend or backend-adjacent. Location: Cologne area.' },
]

function ContactRow({ label, value, href, index, inView }: { label: string; value: string; href: string; index: number; inView: boolean }) {
  const [hovered, setHovered] = useState(false)
  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, y: 16 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: 0.55 + index * 0.1, ease }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '22px 16px',
        borderRadius: '10px',
        background: hovered ? 'var(--pf-surface)' : 'transparent',
        textDecoration: 'none',
        transition: 'background 0.2s ease',
      }}
    >
      <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--pf-muted)', width: '80px', flexShrink: 0 }}>
        {label}
      </span>
      <span style={{ flex: 1, fontFamily: 'var(--font-sans)', fontSize: '17px', fontWeight: 400, color: 'var(--pf-text)', paddingLeft: '20px' }}>
        {value}
      </span>
      <span style={{ fontSize: '20px', color: hovered ? 'var(--pf-text)' : 'var(--pf-muted)', transition: 'color 0.2s ease' }}>↗</span>
    </motion.a>
  )
}

export default function Contact() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="contact" ref={ref} style={{ position: 'relative', zIndex: 10, padding: '120px 0' }}>
      <div className="max-w-[1200px] mx-auto px-6 md:px-12">
        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease }}
          style={{ fontFamily: 'var(--font-sans)', fontSize: 'clamp(48px, 7vw, 80px)', fontWeight: 700, letterSpacing: '-0.03em', lineHeight: 1, color: 'var(--pf-text)', marginBottom: '20px' }}
        >
          Let&apos;s build something.
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1, ease }}
          style={{ fontFamily: 'var(--font-sans)', fontSize: '18px', fontWeight: 300, color: 'var(--pf-muted)', marginBottom: '64px' }}
        >
          Backend engineering · Germany · Open to opportunities
        </motion.p>

        {/* AI Chat placeholder */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2, ease }}
          className="max-w-lg mx-auto mb-16"
        >
          <div style={{ border: '1px solid var(--pf-border)', borderRadius: '16px', overflow: 'hidden', background: 'var(--pf-surface)' }}>
            <div style={{ padding: '16px 20px', borderBottom: '1px solid var(--pf-border)' }}>
              <p style={{ fontFamily: 'var(--font-sans)', fontSize: '15px', fontWeight: 600, color: 'var(--pf-text)' }}>Ask about my work</p>
            </div>
            <div style={{ padding: '16px 20px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {previewMessages.map((msg, i) => (
                <div key={i} style={{ display: 'flex', justifyContent: msg.role === 'user' ? 'flex-end' : 'flex-start' }}>
                  <div style={{
                    maxWidth: '80%',
                    padding: '10px 14px',
                    borderRadius: msg.role === 'user' ? '12px 12px 2px 12px' : '12px 12px 12px 2px',
                    background: msg.role === 'user' ? 'var(--pf-accent)' : 'var(--pf-bg)',
                    color: msg.role === 'user' ? '#fff' : 'var(--pf-text)',
                    fontSize: '13px',
                    lineHeight: 1.55,
                    fontWeight: 300,
                    border: msg.role === 'ai' ? '1px solid var(--pf-border)' : 'none',
                  }}>
                    {msg.text}
                  </div>
                </div>
              ))}
            </div>
            <div style={{ padding: '12px 16px', borderTop: '1px solid var(--pf-border)', opacity: 0.4, pointerEvents: 'none' }}>
              <div style={{ background: 'var(--pf-bg)', border: '1px solid var(--pf-border)', borderRadius: '8px', padding: '10px 14px', fontSize: '13px', color: 'var(--pf-muted)', fontFamily: 'var(--font-sans)' }}>
                AI assistant coming soon...
              </div>
            </div>
          </div>
          <p style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--pf-muted)', textAlign: 'center', marginTop: '12px' }}>
            Powered by Claude API — activating soon
          </p>
        </motion.div>

        {/* Contact rows */}
        <div style={{ borderTop: '1px solid var(--pf-border)' }}>
          {contactLinks.map((link, i) => (
            <div key={link.label} style={{ borderBottom: '1px solid var(--pf-border)' }}>
              <ContactRow {...link} index={i} inView={inView} />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
