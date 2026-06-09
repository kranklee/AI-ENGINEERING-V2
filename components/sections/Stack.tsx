'use client';
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { focusCards } from '@/lib/data';

gsap.registerPlugin(ScrollTrigger);

const techStack = [
  { category: 'Languages', items: ['Python', 'TypeScript', 'Bash', 'SQL'] },
  { category: 'Backend', items: ['FastAPI', 'Django', 'Node.js', 'REST'] },
  { category: 'Infrastructure', items: ['Docker', 'Ansible', 'Nginx', 'Linux'] },
  { category: 'Data', items: ['PostgreSQL', 'Redis', 'Celery', 'SQLAlchemy'] },
  { category: 'AI / ML', items: ['Anthropic SDK', 'OpenAI', 'LiteLLM', 'RAG'] },
  { category: 'Tools', items: ['Git', 'GitHub Actions', 'VS Code', 'Neovim'] },
];

export default function Stack() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        cardsRef.current?.querySelectorAll('.focus-card') ?? [],
        { y: 40, opacity: 0 },
        {
          y: 0, opacity: 1,
          duration: 0.6,
          stagger: 0.08,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
          },
        }
      );
    });
    return () => ctx.revert();
  }, []);

  return (
    <section
      id="stack"
      ref={sectionRef}
      style={{ padding: 'clamp(60px, 10vw, 120px) clamp(16px, 4vw, 24px)', maxWidth: 1200, margin: '0 auto' }}
    >
      {/* Label */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 60 }}>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--pf-accent)', letterSpacing: 3, textTransform: 'uppercase' }}>03 — Stack</span>
        <div style={{ flex: 1, height: 1, background: 'var(--pf-border)' }} />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 60 }}>
        {/* Focus cards */}
        <div>
          <h2 style={{ fontSize: 'clamp(26px, 3.5vw, 40px)', fontWeight: 800, letterSpacing: -1, margin: '0 0 8px' }}>
            Current <span style={{ color: 'var(--pf-accent)' }}>Focus</span>
          </h2>
          <p style={{ color: 'var(--pf-muted)', fontSize: 14, marginBottom: 32, lineHeight: 1.6 }}>
            What I'm spending time on right now, ranked by depth.
          </p>
          <div ref={cardsRef} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            {focusCards.map(card => (
              <div
                key={card.label}
                className="focus-card"
                style={{
                  background: 'var(--pf-surface)',
                  border: '1px solid var(--pf-border)',
                  borderRadius: 12,
                  padding: '16px 20px',
                  transition: 'border-color 0.2s',
                }}
                onMouseEnter={e => (e.currentTarget.style.borderColor = 'var(--pf-border-bright)')}
                onMouseLeave={e => (e.currentTarget.style.borderColor = 'var(--pf-border)')}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <span style={{ fontSize: 18 }}>{card.icon}</span>
                    <span style={{ fontWeight: 700, fontSize: 14, color: 'var(--pf-text)' }}>{card.label}</span>
                  </div>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--pf-accent)' }}>{card.level}%</span>
                </div>

                {/* Progress bar */}
                <div style={{ height: 3, background: 'var(--pf-elevated)', borderRadius: 2, marginBottom: 10, overflow: 'hidden' }}>
                  <div style={{ width: `${card.level}%`, height: '100%', background: 'var(--pf-accent)', borderRadius: 2, transition: 'width 0.8s ease' }} />
                </div>

                <p style={{ color: 'var(--pf-muted)', fontSize: 12, margin: 0, lineHeight: 1.5 }}>{card.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Tech table */}
        <div>
          <h2 style={{ fontSize: 'clamp(26px, 3.5vw, 40px)', fontWeight: 800, letterSpacing: -1, margin: '0 0 8px' }}>
            Full <span style={{ color: 'var(--pf-accent)' }}>Toolkit</span>
          </h2>
          <p style={{ color: 'var(--pf-muted)', fontSize: 14, marginBottom: 32, lineHeight: 1.6 }}>
            Technologies I use across the stack.
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
            {techStack.map((row, i) => (
              <div
                key={row.category}
                style={{
                  display: 'grid',
                  gridTemplateColumns: '100px 1fr',
                  gap: 24,
                  padding: '16px 0',
                  borderBottom: i < techStack.length - 1 ? '1px solid var(--pf-border)' : 'none',
                  alignItems: 'center',
                }}
              >
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--pf-muted)', letterSpacing: 1, textTransform: 'uppercase' }}>
                  {row.category}
                </span>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                  {row.items.map(item => (
                    <span
                      key={item}
                      style={{
                        background: 'var(--pf-elevated)',
                        border: '1px solid var(--pf-border)',
                        borderRadius: 6,
                        padding: '4px 10px',
                        fontSize: 12,
                        fontFamily: 'var(--font-mono)',
                        color: 'var(--pf-text)',
                      }}
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
