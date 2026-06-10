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
      {/* Cologne map */}
      <div style={{
        maxWidth: 560,
        marginBottom: 40,
        borderRadius: 12,
        overflow: 'hidden',
        border: '1px solid var(--br)',
        position: 'relative',
      }}>
        <iframe
          src="https://www.openstreetmap.org/export/embed.html?bbox=6.8,50.85,7.1,51.05&layer=mapnik&marker=50.938361,6.959974"
          width="100%"
          height="200"
          style={{ border: 'none', display: 'block', opacity: 0.8 }}
          title="Cologne, Germany"
        />
        <div style={{
          position: 'absolute',
          top: 12,
          left: 12,
          background: 'var(--bg)',
          border: '1px solid var(--br)',
          borderRadius: 6,
          padding: '6px 12px',
          display: 'flex',
          alignItems: 'center',
          gap: 6,
          fontFamily: 'var(--font-mono)',
          fontSize: 11,
          color: 'var(--tx2)',
        }}>
          <span style={{
            width: 6,
            height: 6,
            borderRadius: '50%',
            background: '#22c55e',
            flexShrink: 0,
            animation: 'blink 2s ease-in-out infinite',
          }} />
          Based in Cologne, Germany
        </div>
      </div>

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
