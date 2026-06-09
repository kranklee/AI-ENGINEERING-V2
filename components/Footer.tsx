export default function Footer() {
  return (
    <footer style={{ position: 'relative', zIndex: 10, borderTop: '1px solid var(--pf-border)', padding: '28px 0' }}>
      <div className="max-w-[1200px] mx-auto px-6 md:px-12 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
        <span style={{ fontFamily: 'var(--font-sans)', fontWeight: 600, fontSize: '15px', color: 'var(--pf-accent)' }}>CB</span>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', color: 'var(--pf-muted)' }}>
          © 2026 · Built with Next.js · Deployed on Vercel
        </span>
      </div>
    </footer>
  )
}
