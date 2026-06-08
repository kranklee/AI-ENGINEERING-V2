export default function Footer() {
  return (
    <footer
      className="border-t"
      style={{ borderColor: 'var(--border)', padding: '60px 0 40px' }}
    >
      <div className="max-w-[1200px] mx-auto px-6 md:px-12 flex items-center justify-between">
        <span
          style={{ fontFamily: 'var(--font-body)', fontSize: '14px', fontWeight: 500, color: 'var(--text-primary)' }}
        >
          Cem Besli
        </span>
        <span
          style={{ fontFamily: 'var(--font-body)', fontSize: '13px', color: 'var(--text-muted)' }}
        >
          © 2026 · Built with Next.js · Deployed on Vercel
        </span>
      </div>
    </footer>
  )
}
