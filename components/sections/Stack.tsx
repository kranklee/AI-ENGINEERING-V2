'use client'
import { useStore } from '@/lib/store'
import { t } from '@/lib/i18n'

const stackGroups = [
  { category: 'Languages', items: ['Python', 'Java', 'C#', 'JavaScript', 'TypeScript'] },
  { category: 'Backend', items: ['FastAPI', '.NET Core', 'Flask', 'Node.js', 'REST APIs'] },
  { category: 'Frontend', items: ['React', 'Next.js', 'HTML5', 'CSS3', 'Tailwind'] },
  { category: 'Databases', items: ['PostgreSQL', 'SQL Server', 'MongoDB', 'MySQL', 'Supabase'] },
  { category: 'Infrastructure', items: ['Docker', 'Linux', 'Git', 'Azure', 'CI/CD'] },
  { category: 'AI / ML', items: ['TensorFlow', 'scikit-learn', 'LLM APIs', 'RAG Systems', 'Power BI'] },
]

const spokenLanguages = [
  { lang: 'English', level: 'Native' },
  { lang: 'Turkish', level: 'Native' },
  { lang: 'German', level: 'Learning · B1' },
  { lang: 'French', level: 'Conversational' },
  { lang: 'Dutch', level: 'Basic' },
]

export default function Stack() {
  const { lang } = useStore()
  const tx = t[lang].stack

  return (
    <section id="stack" style={{ padding: 'clamp(60px,10vw,120px) 32px', fontFamily: 'var(--font-sans)', maxWidth: 1100, margin: '0 auto' }}>
      <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--tx3)', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 16 }}>
        {tx.label}
      </div>
      <h2 style={{ fontSize: 'clamp(28px,4vw,48px)', fontWeight: 700, letterSpacing: '-0.03em', color: 'var(--tx)', marginBottom: 48, lineHeight: 1.1 }}>
        {tx.heading}
      </h2>

      {/* Category grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 2 }}>
        {stackGroups.map((group, i) => (
          <div
            key={i}
            style={{
              background: 'var(--bg2)',
              border: '1px solid var(--br)',
              borderRadius: 12,
              padding: '20px 22px',
              margin: 6,
            }}
          >
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--tx3)', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 14 }}>
              {group.category}
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 7 }}>
              {group.items.map((item, j) => (
                <span
                  key={j}
                  style={{
                    fontSize: 12,
                    fontFamily: 'var(--font-mono)',
                    color: 'var(--tag-tx)',
                    background: 'var(--tag-bg)',
                    border: '1px solid var(--tag-br)',
                    borderRadius: 5,
                    padding: '4px 10px',
                  }}
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Spoken languages */}
      <div style={{ marginTop: 48, borderTop: '1px solid var(--br)', paddingTop: 36 }}>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--tx3)', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 20 }}>
          Spoken Languages
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12 }}>
          {spokenLanguages.map((sl, i) => (
            <div
              key={i}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 10,
                background: 'var(--bg2)',
                border: '1px solid var(--br)',
                borderRadius: 8,
                padding: '10px 16px',
              }}
            >
              <span style={{ fontSize: 13, fontWeight: 500, color: 'var(--tx)' }}>{sl.lang}</span>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--tx3)' }}>{sl.level}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
