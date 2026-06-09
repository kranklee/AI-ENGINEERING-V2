'use client'
import { useStore } from '@/lib/store'
import { t } from '@/lib/i18n'

const stackItems = [
  { icon: '🐧', name: 'Linux', desc: 'Shell scripting, process management, daily driver.', level: 90 },
  { icon: '🐳', name: 'Docker', desc: 'Containerization, compose, multi-service setups.', level: 80 },
  { icon: '🐘', name: 'PostgreSQL', desc: 'Schema design, indexing, query optimization.', level: 75 },
  { icon: '⚡', name: 'FastAPI', desc: 'Async Python APIs, dependency injection, OpenAPI.', level: 70 },
  { icon: '🤖', name: 'LLM APIs', desc: 'Anthropic API, RAG pipelines, AI workflows.', level: 65 },
  { icon: '🇩🇪', name: 'German', desc: 'Working toward B2. Daily practice.', level: 40 },
]

export default function Stack() {
  const { lang } = useStore()
  const tx = t[lang].stack

  return (
    <section id="stack" style={{ padding: 'clamp(60px,10vw,120px) 32px', fontFamily: 'var(--font-sans)', maxWidth: 1100, margin: '0 auto' }}>
      <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--tx3)', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 16 }}>
        {tx.label}
      </div>
      <h2 style={{ fontSize: 'clamp(28px,4vw,48px)', fontWeight: 700, letterSpacing: '-0.03em', color: 'var(--tx)', marginBottom: 56, lineHeight: 1.1 }}>
        {tx.heading}
      </h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 16 }}>
        {stackItems.map((item, i) => (
          <div
            key={i}
            style={{ background: 'var(--bg2)', border: '1px solid var(--br)', borderRadius: 12, padding: 24, transition: 'all 0.2s', cursor: 'default' }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--br2)'; e.currentTarget.style.transform = 'translateY(-2px)' }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--br)'; e.currentTarget.style.transform = 'translateY(0)' }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 }}>
              <div style={{ fontSize: 28 }}>{item.icon}</div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--tx3)' }}>{item.level}%</div>
            </div>
            <div style={{ fontSize: 16, fontWeight: 600, color: 'var(--tx)', marginBottom: 8 }}>{item.name}</div>
            <div style={{ fontSize: 13, color: 'var(--tx2)', lineHeight: 1.6, fontWeight: 300, marginBottom: 16 }}>{item.desc}</div>
            <div style={{ height: 3, background: 'var(--bg3)', borderRadius: 2 }}>
              <div style={{ height: '100%', width: `${item.level}%`, background: 'var(--ac)', borderRadius: 2, transition: 'width 0.8s ease' }} />
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
