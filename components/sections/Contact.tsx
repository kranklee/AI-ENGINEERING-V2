'use client'
import { useStore } from '@/lib/store'
import { t } from '@/lib/i18n'

export default function Contact() {
  const { lang } = useStore()
  const tx = t[lang].contact

  const links = [
    { label: 'GitHub', value: 'github.com/kranklee', href: 'https://github.com/kranklee' },
    { label: 'Email', value: 'cembesli99@gmail.com', href: 'mailto:cembesli99@gmail.com' },
    { label: 'LinkedIn', value: 'linkedin.com/in/cembesli', href: 'https://linkedin.com/in/cembesli' },
  ]

  return (
    <section
      id="contact"
      style={{
        minHeight: '80vh', padding: 'clamp(60px,10vw,120px) 32px',
        display: 'flex', flexDirection: 'column', justifyContent: 'center',
        maxWidth: 1100, margin: '0 auto', fontFamily: 'var(--font-sans)',
      }}
    >
      <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--tx3)', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 16 }}>
        {tx.label}
      </div>
      <h2 style={{ fontSize: 'clamp(36px,7vw,80px)', fontWeight: 800, letterSpacing: '-0.04em', color: 'var(--tx)', lineHeight: 0.95, marginBottom: 16 }}>
        {tx.heading}
      </h2>
      <p style={{ fontSize: 16, fontWeight: 300, color: 'var(--tx2)', marginBottom: 56 }}>{tx.sub}</p>
      <div style={{ maxWidth: 560 }}>
        {links.map((link, i) => (
          <a
            key={i}
            href={link.href}
            target={link.href.startsWith('mailto') ? undefined : '_blank'}
            rel="noopener noreferrer"
            style={{
              display: 'flex', justifyContent: 'space-between', alignItems: 'center',
              padding: '20px 0', borderBottom: '1px solid var(--br)',
              textDecoration: 'none', transition: 'all 0.2s',
              paddingLeft: 0,
            }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = 'var(--bg2)'; (e.currentTarget as HTMLElement).style.paddingLeft = '12px' }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'transparent'; (e.currentTarget as HTMLElement).style.paddingLeft = '0px' }}
          >
            <span style={{ fontSize: 16, fontWeight: 500, color: 'var(--tx)' }}>{link.label}</span>
            <span style={{ fontSize: 14, color: 'var(--tx2)', fontFamily: 'var(--font-mono)' }}>{link.value} ↗</span>
          </a>
        ))}
      </div>
    </section>
  )
}
