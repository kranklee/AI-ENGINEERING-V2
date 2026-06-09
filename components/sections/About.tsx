'use client';
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const timeline = [
  { year: '2021', event: 'Started Computer Science at University of Ottawa' },
  { year: '2022', event: 'First internship — backend API development with Python/Django' },
  { year: '2023', event: 'Deep dive into Linux, Docker, and DevOps tooling' },
  { year: '2024', event: 'Relocated to Cologne, Germany for exchange semester' },
  { year: '2025', event: 'Building backend systems and exploring LLM integrations' },
];

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const leftRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        leftRef.current,
        { x: -40, opacity: 0 },
        {
          x: 0, opacity: 1, duration: 0.8, ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' },
        }
      );
      gsap.fromTo(
        rightRef.current,
        { x: 40, opacity: 0 },
        {
          x: 0, opacity: 1, duration: 0.8, ease: 'power3.out', delay: 0.15,
          scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' },
        }
      );
    });
    return () => ctx.revert();
  }, []);

  return (
    <section
      id="about"
      ref={sectionRef}
      style={{ padding: '120px 24px', maxWidth: 1200, margin: '0 auto' }}
    >
      {/* Section label */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 60 }}>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--pf-accent)', letterSpacing: 3, textTransform: 'uppercase' }}>01 — About</span>
        <div style={{ flex: 1, height: 1, background: 'var(--pf-border)' }} />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 60, alignItems: 'start' }}>
        {/* Left — text */}
        <div ref={leftRef}>
          <h2 style={{ fontSize: 'clamp(28px, 4vw, 44px)', fontWeight: 800, letterSpacing: -1.5, margin: '0 0 24px', lineHeight: 1.1 }}>
            Backend-first,<br />
            <span style={{ color: 'var(--pf-accent)' }}>system-minded.</span>
          </h2>

          <p style={{ color: 'var(--pf-muted)', lineHeight: 1.8, marginBottom: 20, fontSize: 15 }}>
            I'm Cem — a software engineering student who gets excited about the things users never see:
            the query that runs in 2ms instead of 200ms, the service that auto-recovers, the container
            that starts clean in any environment.
          </p>

          <p style={{ color: 'var(--pf-muted)', lineHeight: 1.8, marginBottom: 20, fontSize: 15 }}>
            Currently based in <strong style={{ color: 'var(--pf-text)' }}>Cologne, Germany</strong>,
            studying CS after relocating from Ottawa. I spend most of my time in a terminal — writing
            Python, wrangling Docker, and occasionally convincing AI models to do useful things.
          </p>

          <p style={{ color: 'var(--pf-muted)', lineHeight: 1.8, fontSize: 15 }}>
            I'm looking for backend or infrastructure roles where I can ship real things.
          </p>

          <a
            href="mailto:cembesli99@gmail.com"
            style={{
              display: 'inline-block',
              marginTop: 32,
              padding: '10px 22px',
              background: 'transparent',
              border: '1px solid var(--pf-accent)',
              borderRadius: 8,
              color: 'var(--pf-accent)',
              fontSize: 13,
              fontWeight: 600,
              textDecoration: 'none',
              transition: 'background 0.2s',
              fontFamily: 'var(--font-mono)',
            }}
            onMouseEnter={e => { e.currentTarget.style.background = 'var(--pf-accent-glow)'; }}
            onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; }}
          >
            {'>'} Get in touch
          </a>
        </div>

        {/* Right — timeline */}
        <div ref={rightRef}>
          <h3 style={{ fontSize: 13, fontFamily: 'var(--font-mono)', color: 'var(--pf-muted)', letterSpacing: 2, textTransform: 'uppercase', marginBottom: 28 }}>
            Journey
          </h3>
          <div style={{ position: 'relative' }}>
            {/* Vertical line */}
            <div style={{ position: 'absolute', left: 56, top: 0, bottom: 0, width: 1, background: 'var(--pf-border)' }} />

            {timeline.map((item, i) => (
              <div key={i} style={{ display: 'flex', gap: 24, marginBottom: 32, position: 'relative' }}>
                <span style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: 11,
                  color: 'var(--pf-accent)',
                  fontWeight: 700,
                  width: 40,
                  flexShrink: 0,
                  paddingTop: 2,
                }}>
                  {item.year}
                </span>
                {/* Dot */}
                <div style={{
                  width: 8, height: 8,
                  borderRadius: '50%',
                  background: 'var(--pf-accent)',
                  flexShrink: 0,
                  marginTop: 6,
                  position: 'relative',
                  zIndex: 1,
                }} />
                <p style={{ color: 'var(--pf-text)', fontSize: 14, lineHeight: 1.6, margin: 0 }}>
                  {item.event}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
