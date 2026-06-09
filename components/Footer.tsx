export default function Footer() {
  return (
    <footer style={{ borderTop: '1px solid var(--pf-border)', padding: '32px 24px', textAlign: 'center' }}>
      <p style={{ color: 'var(--pf-dim)', fontSize: 13, fontFamily: 'var(--font-mono)', margin: 0 }}>
        © {new Date().getFullYear()} Cem Besli — built with Next.js + GSAP
      </p>
    </footer>
  );
}
