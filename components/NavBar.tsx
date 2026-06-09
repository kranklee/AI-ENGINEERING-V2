'use client'
import { useStore } from '@/lib/store'
import { t, languages } from '@/lib/i18n'
import { useState, useEffect } from 'react'

export default function NavBar() {
  const { theme, setTheme, lang, setLang } = useStore()
  const [scrolled, setScrolled] = useState(false)
  const tx = t[lang]

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', fn)
    return () => window.removeEventListener('scroll', fn)
  }, [])

  const navStyle: React.CSSProperties = {
    position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50,
    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
    padding: '14px 32px',
    background: scrolled ? 'var(--bg)' : 'transparent',
    borderBottom: scrolled ? '1px solid var(--br)' : '1px solid transparent',
    backdropFilter: scrolled ? 'blur(20px)' : 'none',
    transition: 'all 0.3s ease',
    fontFamily: 'var(--font-sans)',
  }

  return (
    <nav style={navStyle}>
      <div style={{ fontSize: 15, fontWeight: 600, letterSpacing: '-0.03em', color: 'var(--tx)' }}>
        Cem Besli
      </div>

      <ul style={{ display: 'flex', gap: 24, listStyle: 'none', margin: 0, padding: 0 }}>
        {(['about', 'stack', 'projects', 'contact'] as const).map(k => (
          <li key={k}>
            <a
              href={`#${k}`}
              style={{ fontSize: 13, color: 'var(--tx2)', textDecoration: 'none', fontWeight: 400, transition: 'color 0.15s' }}
              onMouseEnter={e => (e.currentTarget.style.color = 'var(--tx)')}
              onMouseLeave={e => (e.currentTarget.style.color = 'var(--tx2)')}
            >
              {tx.nav[k]}
            </a>
          </li>
        ))}
      </ul>

      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        {/* Theme switcher */}
        <div style={{ display: 'flex', gap: 3, background: 'var(--bg2)', border: '1px solid var(--br)', borderRadius: 100, padding: 3 }}>
          {(['dark', 'light', 'color'] as const).map(th => (
            <button
              key={th}
              onClick={() => setTheme(th)}
              style={{
                padding: '4px 12px', borderRadius: 100, border: 'none', cursor: 'pointer',
                fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.03em',
                background: theme === th ? 'var(--bg3)' : 'transparent',
                color: theme === th ? 'var(--tx)' : 'var(--tx3)',
                transition: 'all 0.2s',
              }}
            >
              {th}
            </button>
          ))}
        </div>

        {/* Language switcher */}
        <div style={{ display: 'flex', gap: 3, background: 'var(--bg2)', border: '1px solid var(--br)', borderRadius: 100, padding: 3 }}>
          {languages.map(l => (
            <button
              key={l.code}
              onClick={() => setLang(l.code)}
              style={{
                padding: '4px 10px', borderRadius: 100, border: 'none', cursor: 'pointer',
                fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.04em',
                background: lang === l.code ? 'var(--bg3)' : 'transparent',
                color: lang === l.code ? 'var(--tx)' : 'var(--tx3)',
                transition: 'all 0.2s',
              }}
            >
              {l.label}
            </button>
          ))}
        </div>
      </div>
    </nav>
  )
}
