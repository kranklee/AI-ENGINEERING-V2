'use client';
import { useState, useEffect } from 'react';
import { useTheme } from 'next-themes';
import { Sun, Moon, Menu, X } from 'lucide-react';

const links = [
  { label: 'About', href: '#about' },
  { label: 'Projects', href: '#projects' },
  { label: 'Stack', href: '#stack' },
  { label: 'GitHub', href: '#github' },
  { label: 'Contact', href: '#contact' },
];

export default function NavBar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setMounted(true); }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleNavClick = (href: string) => {
    setOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <header
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        transition: 'background 0.3s, border-color 0.3s, backdrop-filter 0.3s',
        background: scrolled ? 'rgba(9,9,11,0.85)' : 'transparent',
        backdropFilter: scrolled ? 'blur(12px)' : 'none',
        borderBottom: scrolled ? '1px solid var(--pf-border)' : '1px solid transparent',
      }}
    >
      <nav style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px', height: 60, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        {/* Logo */}
        <a
          href="#"
          onClick={e => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
          style={{ fontFamily: 'var(--font-mono)', fontSize: 14, color: 'var(--pf-accent)', fontWeight: 600, textDecoration: 'none', letterSpacing: 2 }}
        >
          CB<span style={{ color: 'var(--pf-muted)' }}>.dev</span>
        </a>

        {/* Desktop links */}
        <ul style={{ display: 'flex', gap: 32, listStyle: 'none', margin: 0, padding: 0 }} className="hide-mobile">
          {links.map(l => (
            <li key={l.label}>
              <button
                onClick={() => handleNavClick(l.href)}
                style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--pf-muted)', fontSize: 13, fontWeight: 500, letterSpacing: 0.5, padding: '4px 0', transition: 'color 0.2s' }}
                onMouseEnter={e => (e.currentTarget.style.color = 'var(--pf-text)')}
                onMouseLeave={e => (e.currentTarget.style.color = 'var(--pf-muted)')}
              >
                {l.label}
              </button>
            </li>
          ))}
        </ul>

        {/* Right controls */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          {mounted && (
            <button
              onClick={() => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')}
              style={{ background: 'var(--pf-surface)', border: '1px solid var(--pf-border)', borderRadius: 8, padding: '6px 8px', cursor: 'pointer', color: 'var(--pf-muted)', display: 'flex', alignItems: 'center', transition: 'color 0.2s, border-color 0.2s' }}
              aria-label="Toggle theme"
            >
              {resolvedTheme === 'dark' ? <Sun size={14} /> : <Moon size={14} />}
            </button>
          )}

          {/* Hamburger (mobile) */}
          <button
            className="show-mobile"
            onClick={() => setOpen(!open)}
            style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--pf-text)', padding: 4 }}
            aria-label="Menu"
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {open && (
        <div style={{ background: 'var(--pf-surface)', borderBottom: '1px solid var(--pf-border)', padding: '16px 24px 20px' }}>
          {links.map(l => (
            <button
              key={l.label}
              onClick={() => handleNavClick(l.href)}
              style={{ display: 'block', width: '100%', textAlign: 'left', background: 'none', border: 'none', cursor: 'pointer', color: 'var(--pf-text)', fontSize: 15, fontWeight: 500, padding: '10px 0', borderBottom: '1px solid var(--pf-border)' }}
            >
              {l.label}
            </button>
          ))}
        </div>
      )}

      <style>{`
        .hide-mobile { display: flex; }
        .show-mobile { display: none; }
        @media (max-width: 768px) {
          .hide-mobile { display: none !important; }
          .show-mobile { display: flex !important; }
        }
      `}</style>
    </header>
  );
}
