'use client'
import { useStore } from '@/lib/store'
import { t } from '@/lib/i18n'
import { useEffect, useRef } from 'react'

const stats = [
  { value: '3', label: 'Industry roles' },
  { value: '4+', label: 'Projects shipped' },
  { value: '5', label: 'Languages spoken' },
]

export default function Hero() {
  const { lang } = useStore()
  const tx = t[lang].hero
  const dotRef = useRef<HTMLSpanElement>(null)

  // Breathing dot animation
  useEffect(() => {
    let opacity = 1
    let dir = -1
    const iv = setInterval(() => {
      opacity += dir * 0.04
      if (opacity <= 0.2) dir = 1
      if (opacity >= 1) dir = -1
      if (dotRef.current) dotRef.current.style.opacity = String(opacity)
    }, 50)
    return () => clearInterval(iv)
  }, [])

  return (
    <section
      id="hero"
      style={{
        minHeight: '100vh',
        display: 'grid',
        gridTemplateColumns: '1.1fr 0.9fr',
        position: 'relative',
        zIndex: 1,
        paddingTop: 72,
        fontFamily: 'var(--font-sans)',
      }}
    >
      {/* Left column */}
      <div style={{ padding: '56px 32px 48px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', borderRight: '1px solid var(--br)' }}>
        <div>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--tx3)', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 20 }}>
            {tx.eyebrow}
          </div>
          <h1 style={{ fontSize: 'clamp(52px,8vw,88px)', fontWeight: 800, lineHeight: 0.9, letterSpacing: '-0.04em', color: 'var(--tx)', marginBottom: 0 }}>
            {tx.h1}<br />
            <span style={{ color: 'var(--tx2)', fontWeight: 300 }}>{tx.h1acc}</span>
          </h1>

          {/* Stats row */}
          <div style={{ display: 'flex', gap: 12, margin: '28px 0 20px' }}>
            {stats.map((s, i) => (
              <div
                key={i}
                style={{
                  flex: 1,
                  background: 'var(--bg2)',
                  border: '1px solid var(--br)',
                  borderRadius: 10,
                  padding: '14px 16px',
                }}
              >
                <div style={{ fontSize: 'clamp(22px,3vw,28px)', fontWeight: 800, letterSpacing: '-0.04em', color: 'var(--tx)', lineHeight: 1 }}>
                  {s.value}
                </div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--tx3)', marginTop: 5, letterSpacing: '0.04em', textTransform: 'uppercase' }}>
                  {s.label}
                </div>
              </div>
            ))}
          </div>

          <p style={{ fontSize: 15, fontWeight: 300, color: 'var(--tx2)', lineHeight: 1.75, maxWidth: 320, marginBottom: 36 }}>
            {tx.sub}
          </p>
        </div>

        {/* CTAs */}
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          <button
            onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
            style={{
              background: 'var(--btn-bg)', color: 'var(--btn-tx)', border: 'none',
              padding: '10px 22px', fontSize: 13, fontWeight: 500, cursor: 'pointer',
              fontFamily: 'var(--font-sans)', borderRadius: 6, transition: 'all 0.2s',
            }}
            onMouseEnter={e => { e.currentTarget.style.opacity = '0.85'; e.currentTarget.style.transform = 'translateY(-1px)' }}
            onMouseLeave={e => { e.currentTarget.style.opacity = '1'; e.currentTarget.style.transform = 'translateY(0)' }}
          >
            {tx.cta} →
          </button>
          <a
            href="https://github.com/kranklee"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              background: 'transparent', color: 'var(--tx2)', border: '1px solid var(--br)',
              padding: '9px 22px', fontSize: 13, textDecoration: 'none', fontFamily: 'var(--font-sans)',
              borderRadius: 6, transition: 'all 0.2s', display: 'inline-block',
            }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--tx)'; e.currentTarget.style.color = 'var(--tx)' }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--br)'; e.currentTarget.style.color = 'var(--tx2)' }}
          >
            {tx.github}
          </a>
          <a
            href="/cem-besli-resume.pdf"
            download
            style={{
              background: 'transparent', color: 'var(--tx2)', border: '1px solid var(--br)',
              padding: '9px 22px', fontSize: 13, textDecoration: 'none', fontFamily: 'var(--font-sans)',
              borderRadius: 6, transition: 'all 0.2s', display: 'inline-block',
            }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--tx)'; e.currentTarget.style.color = 'var(--tx)' }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--br)'; e.currentTarget.style.color = 'var(--tx2)' }}
          >
            {tx.resume}
          </a>
        </div>
      </div>

      {/* Right column */}
      <div style={{ padding: '56px 32px 48px', display: 'flex', flexDirection: 'column' }}>
        {[
          { label: 'Focus', value: tx.focus },
          { label: 'Education', value: tx.education },
          { label: 'Location', value: tx.location },
          { label: 'Stack', value: 'Python · FastAPI · Docker · PostgreSQL · Linux · RAG · LLM APIs', mono: true },
        ].map((row, i) => (
          <div key={i} style={{ padding: '14px 0', borderBottom: '1px solid var(--br)' }}>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--tx3)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 5 }}>
              {row.label}
            </div>
            <div style={{ fontSize: 13, color: 'var(--tx2)', fontFamily: row.mono ? 'var(--font-mono)' : 'var(--font-sans)', lineHeight: 1.6 }}>
              {row.value}
            </div>
          </div>
        ))}

        <div style={{ marginTop: 'auto', paddingTop: 24, display: 'flex', alignItems: 'center', gap: 8 }}>
          <span
            ref={dotRef}
            style={{ width: 7, height: 7, borderRadius: '50%', background: '#22c55e', display: 'inline-block', flexShrink: 0 }}
          />
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--tx3)', letterSpacing: '0.05em' }}>
            {tx.available}
          </span>
        </div>
      </div>

      {/* Bottom labels */}
      <div style={{ position: 'absolute', bottom: 20, left: 32, fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--tx3)', letterSpacing: '0.05em' }}>
        cembesli.com
      </div>
      <div style={{ position: 'absolute', bottom: 20, right: 32, fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--tx3)', letterSpacing: '0.06em' }}>
        scroll ↓
      </div>

      {/* Background initials */}
      <div style={{ position: 'absolute', bottom: -20, right: 20, fontFamily: 'var(--font-sans)', fontSize: 180, fontWeight: 900, lineHeight: 1, color: 'rgba(255,255,255,0.018)', pointerEvents: 'none', userSelect: 'none', letterSpacing: '-0.06em', zIndex: 0 }}>
        CB
      </div>
    </section>
  )
}
