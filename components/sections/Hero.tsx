'use client';
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ArrowDown, GitFork, Mail } from 'lucide-react';

const roles = ['Backend Engineer', 'Systems Builder', 'Linux Enthusiast', 'API Designer'];

export default function Hero() {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const roleRef = useRef<HTMLSpanElement>(null);
  const roleIndex = useRef(0);

  // Entrance animation
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        [titleRef.current, subtitleRef.current, ctaRef.current],
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.9, stagger: 0.18, ease: 'power3.out', delay: 0.2 }
      );
    });
    return () => ctx.revert();
  }, []);

  // Role cycling
  useEffect(() => {
    const el = roleRef.current;
    if (!el) return;

    const cycle = () => {
      gsap.to(el, {
        opacity: 0, y: -10, duration: 0.3, ease: 'power2.in',
        onComplete: () => {
          roleIndex.current = (roleIndex.current + 1) % roles.length;
          el.textContent = roles[roleIndex.current];
          gsap.to(el, { opacity: 1, y: 0, duration: 0.3, ease: 'power2.out' });
        },
      });
    };

    el.textContent = roles[0];
    const id = setInterval(cycle, 2600);
    return () => clearInterval(id);
  }, []);

  return (
    <section
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '100px 24px 60px',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Subtle radial glow */}
      <div style={{
        position: 'absolute',
        top: '30%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 600,
        height: 600,
        background: 'radial-gradient(circle, var(--pf-accent-glow) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      <div style={{ maxWidth: 800, width: '100%', position: 'relative', zIndex: 1 }}>
        {/* Pre-title */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 24 }}>
          <div style={{ width: 32, height: 1, background: 'var(--pf-accent)' }} />
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--pf-accent)', letterSpacing: 3, textTransform: 'uppercase' }}>
            Available for opportunities
          </span>
        </div>

        {/* Main heading */}
        <h1
          ref={titleRef}
          style={{
            fontSize: 'clamp(40px, 7vw, 80px)',
            fontWeight: 800,
            lineHeight: 1.05,
            margin: '0 0 8px',
            letterSpacing: -2,
            color: 'var(--pf-text)',
          }}
        >
          Cem Besli
        </h1>

        {/* Role line */}
        <div style={{ marginBottom: 24, height: 48, display: 'flex', alignItems: 'center' }}>
          <span
            ref={roleRef}
            style={{
              fontSize: 'clamp(22px, 4vw, 38px)',
              fontWeight: 700,
              color: 'var(--pf-accent)',
              letterSpacing: -1,
            }}
          />
        </div>

        {/* Subtitle */}
        <p
          ref={subtitleRef}
          style={{
            fontSize: 'clamp(15px, 2vw, 18px)',
            color: 'var(--pf-muted)',
            lineHeight: 1.7,
            maxWidth: 560,
            margin: '0 0 48px',
          }}
        >
          Software engineering student based in Cologne. I build backend systems —
          APIs, containerised services, and developer tooling that actually scales.
        </p>

        {/* CTAs */}
        <div ref={ctaRef} style={{ display: 'flex', flexWrap: 'wrap', gap: 16, alignItems: 'center' }}>
          <button
            onClick={() => document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' })}
            style={{
              background: 'var(--pf-accent)',
              color: '#fff',
              border: 'none',
              borderRadius: 10,
              padding: '13px 28px',
              fontSize: 14,
              fontWeight: 600,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              transition: 'opacity 0.2s, transform 0.2s',
            }}
            onMouseEnter={e => { e.currentTarget.style.opacity = '0.85'; e.currentTarget.style.transform = 'translateY(-1px)'; }}
            onMouseLeave={e => { e.currentTarget.style.opacity = '1'; e.currentTarget.style.transform = 'translateY(0)'; }}
          >
            View Projects <ArrowDown size={15} />
          </button>

          <a
            href="https://github.com/kranklee"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              background: 'var(--pf-surface)',
              color: 'var(--pf-text)',
              border: '1px solid var(--pf-border-bright)',
              borderRadius: 10,
              padding: '12px 24px',
              fontSize: 14,
              fontWeight: 600,
              textDecoration: 'none',
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              transition: 'border-color 0.2s, transform 0.2s',
            }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--pf-accent)'; e.currentTarget.style.transform = 'translateY(-1px)'; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--pf-border-bright)'; e.currentTarget.style.transform = 'translateY(0)'; }}
          >
            <GitFork size={15} /> GitHub
          </a>

          <a
            href="mailto:cembesli99@gmail.com"
            style={{
              color: 'var(--pf-muted)',
              textDecoration: 'none',
              fontSize: 14,
              fontWeight: 500,
              display: 'flex',
              alignItems: 'center',
              gap: 6,
              transition: 'color 0.2s',
            }}
            onMouseEnter={e => (e.currentTarget.style.color = 'var(--pf-text)')}
            onMouseLeave={e => (e.currentTarget.style.color = 'var(--pf-muted)')}
          >
            <Mail size={14} /> cembesli99@gmail.com
          </a>
        </div>

        {/* Quick stats */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 32, marginTop: 64, paddingTop: 40, borderTop: '1px solid var(--pf-border)' }}>
          {[
            { num: '3+', label: 'Years of coding' },
            { num: '10+', label: 'Projects shipped' },
            { num: 'Cologne', label: 'Based in Germany' },
          ].map(s => (
            <div key={s.label}>
              <div style={{ fontSize: 28, fontWeight: 800, color: 'var(--pf-text)', letterSpacing: -1 }}>{s.num}</div>
              <div style={{ fontSize: 12, color: 'var(--pf-muted)', marginTop: 2, fontFamily: 'var(--font-mono)' }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
