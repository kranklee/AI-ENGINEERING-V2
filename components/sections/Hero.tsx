'use client'
import { useStore } from '@/lib/store'
import { t } from '@/lib/i18n'
import { useEffect, useRef, useState } from 'react'

const stats = [
  { value: '3', label: 'Industry roles' },
  { value: '4+', label: 'Projects shipped' },
  { value: '5', label: 'Languages spoken' },
]

const terminalLines = [
  { prompt: true, text: 'whoami' },
  { prompt: false, text: 'cem_besli', color: 'var(--tx2)' },
  { empty: true },
  { prompt: true, text: 'cat status.txt' },
  { prompt: false, text: 'open_to_work=true', color: '#22c55e' },
  { prompt: false, text: 'location=cologne', color: 'var(--tx2)' },
  { empty: true },
  { cursor: true },
]

function TerminalCard() {
  const [visibleLines, setVisibleLines] = useState(0)

  useEffect(() => {
    let current = 0
    const totalLines = terminalLines.length

    const tick = () => {
      current += 1
      setVisibleLines(current)
      if (current < totalLines) {
        setTimeout(tick, 750)
      } else {
        setTimeout(() => {
          current = 0
          setVisibleLines(0)
          setTimeout(tick, 500)
        }, 4000)
      }
    }

    const start = setTimeout(tick, 1000)
    return () => clearTimeout(start)
  }, [])

  return (
    <div style={{
      width: '100%',
      marginTop: 20,
      background: 'rgba(0,0,0,0.85)',
      border: '1px solid rgba(255,255,255,0.08)',
      borderRadius: 10,
      overflow: 'hidden',
      backdropFilter: 'blur(20px)',
      WebkitBackdropFilter: 'blur(20px)',
    }}>
      {/* Title bar */}
      <div style={{
        background: '#1a1a1a',
        padding: '8px 14px',
        display: 'flex',
        alignItems: 'center',
        gap: 6,
        borderBottom: '1px solid rgba(255,255,255,0.06)',
      }}>
        {['#ff5f57', '#ffbd2e', '#28c840'].map((c, i) => (
          <div key={i} style={{ width: 8, height: 8, borderRadius: '50%', background: c }} />
        ))}
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: '#555', marginLeft: 8 }}>
          cem@cologne ~ bash
        </span>
      </div>
      {/* Body */}
      <div style={{ padding: '14px 16px', fontFamily: 'var(--font-mono)', fontSize: 12, lineHeight: 1.9 }}>
        {terminalLines.map((line, i) => {
          if (i >= visibleLines) return null
          if (line.empty) return <div key={i} style={{ height: 6 }} />
          if (line.cursor) return (
            <div key={i}>
              <span style={{ color: '#22c55e' }}>$ </span>
              <span style={{
                display: 'inline-block',
                width: 8,
                height: 14,
                background: '#22c55e',
                verticalAlign: 'middle',
                animation: 'blink 1s step-end infinite',
              }} />
            </div>
          )
          return (
            <div key={i}>
              {line.prompt && <span style={{ color: '#22c55e' }}>$ </span>}
              <span style={{ color: line.color || '#f0f0f0' }}>{line.text}</span>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default function Hero() {
  const { lang, theme } = useStore()
  const tx = t[lang].hero
  const dotRef = useRef<HTMLSpanElement>(null)
  const isColor = theme === 'color'

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
        overflow: 'hidden',
      }}
    >
      {/* Decorative orb 1 — top right */}
      <div style={{
        position: 'absolute',
        top: '10%',
        right: '5%',
        width: 400,
        height: 400,
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(99,102,241,0.06) 0%, transparent 70%)',
        pointerEvents: 'none',
        zIndex: 0,
        opacity: isColor ? 1 : 0.4,
        transition: 'opacity 0.4s',
      }} />

      {/* Decorative orb 2 — bottom left */}
      <div style={{
        position: 'absolute',
        bottom: '10%',
        left: '5%',
        width: 300,
        height: 300,
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(34,197,94,0.04) 0%, transparent 70%)',
        pointerEvents: 'none',
        zIndex: 0,
        opacity: isColor ? 0.6 : 0.4,
        transition: 'opacity 0.4s',
      }} />

      {/* Left column */}
      <div style={{ padding: '56px 32px 48px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', borderRight: '1px solid var(--br)', position: 'relative', zIndex: 1 }}>
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
      <div style={{ padding: '56px 32px 48px', display: 'flex', flexDirection: 'column', position: 'relative', zIndex: 1 }}>
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

        <div style={{ paddingTop: 24, display: 'flex', alignItems: 'center', gap: 8 }}>
          <span
            ref={dotRef}
            style={{ width: 7, height: 7, borderRadius: '50%', background: '#22c55e', display: 'inline-block', flexShrink: 0 }}
          />
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--tx3)', letterSpacing: '0.05em' }}>
            {tx.available}
          </span>
        </div>

        <TerminalCard />
      </div>

      {/* Bottom labels */}
      <div style={{ position: 'absolute', bottom: 20, left: 32, fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--tx3)', letterSpacing: '0.05em', zIndex: 1 }}>
        cembesli.com
      </div>
      <div style={{ position: 'absolute', bottom: 20, right: 32, fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--tx3)', letterSpacing: '0.06em', zIndex: 1 }}>
        scroll ↓
      </div>

      {/* Background initials */}
      <div style={{ position: 'absolute', bottom: -20, right: 20, fontFamily: 'var(--font-sans)', fontSize: 180, fontWeight: 900, lineHeight: 1, color: 'rgba(255,255,255,0.018)', pointerEvents: 'none', userSelect: 'none', letterSpacing: '-0.06em', zIndex: 0 }}>
        CB
      </div>
    </section>
  )
}
