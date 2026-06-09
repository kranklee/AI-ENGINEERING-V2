'use client'
import { useStore } from '@/lib/store'
import { t } from '@/lib/i18n'

export default function Footer() {
  const { lang } = useStore()
  const tx = t[lang].footer
  return (
    <footer style={{ borderTop: '1px solid var(--br)', padding: '24px 32px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontFamily: 'var(--font-sans)' }}>
      <span style={{ fontSize: 14, fontWeight: 500, color: 'var(--tx)' }}>Cem Besli</span>
      <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--tx3)', letterSpacing: '0.04em' }}>© 2026 · {tx.built}</span>
    </footer>
  )
}
