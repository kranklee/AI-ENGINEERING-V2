'use client'
import { useStore } from '@/lib/store'
import { t } from '@/lib/i18n'

export default function About() {
  const { lang } = useStore()
  const tx = t[lang].about

  return (
    <section id="about" style={{ padding: 'clamp(60px,10vw,120px) 32px', fontFamily: 'var(--font-sans)', maxWidth: 1100, margin: '0 auto' }}>
      <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--tx3)', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 48 }}>
        {tx.label}
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 'clamp(40px,6vw,80px)' }}>
        {/* Bio */}
        <div>
          <h2 style={{ fontSize: 'clamp(28px,4vw,48px)', fontWeight: 700, letterSpacing: '-0.03em', color: 'var(--tx)', marginBottom: 32, lineHeight: 1.1 }}>
            {tx.heading}
          </h2>
          {[tx.p1, tx.p2, tx.p3].map((p, i) => (
            <p key={i} style={{ fontSize: 16, fontWeight: 300, color: 'var(--tx2)', lineHeight: 1.8, marginBottom: 20 }}>{p}</p>
          ))}
        </div>

        {/* Info card */}
        <div style={{ background: 'var(--bg2)', border: '1px solid var(--br)', borderRadius: 12, padding: 32, height: 'fit-content', position: 'sticky', top: 100 }}>
          {[
            { label: 'Focus', value: tx.infoFocus },
            { label: 'Education', value: tx.infoEdu },
            { label: 'Location', value: tx.infoLoc },
            { label: 'Status', value: tx.infoStatus },
          ].map((row, i, arr) => (
            <div key={i} style={{ padding: '14px 0', borderBottom: i < arr.length - 1 ? '1px solid var(--br)' : 'none' }}>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--tx3)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 5 }}>
                {row.label}
              </div>
              <div style={{ fontSize: 13, color: 'var(--tx2)', lineHeight: 1.5 }}>{row.value}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
