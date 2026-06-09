'use client';
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Mail, GitFork, Link2, ArrowUpRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const links = [
  {
    label: 'Email',
    value: 'cembesli99@gmail.com',
    href: 'mailto:cembesli99@gmail.com',
    icon: <Mail size={18} />,
    description: 'Best way to reach me.',
  },
  {
    label: 'GitHub',
    value: 'github.com/kranklee',
    href: 'https://github.com/kranklee',
    icon: <GitFork size={18} />,
    description: 'Projects and open source.',
  },
  {
    label: 'LinkedIn',
    value: 'linkedin.com/in/cembesli',
    href: 'https://linkedin.com/in/cembesli',
    icon: <Link2 size={18} />,
    description: 'Professional profile.',
  },
];

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        sectionRef.current?.querySelectorAll('.contact-row') ?? [],
        { x: -30, opacity: 0 },
        {
          x: 0, opacity: 1, duration: 0.6, stagger: 0.1, ease: 'power2.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' },
        }
      );
    });
    return () => ctx.revert();
  }, []);

  return (
    <section
      id="contact"
      ref={sectionRef}
      style={{ padding: '120px 24px 80px', maxWidth: 1200, margin: '0 auto' }}
    >
      {/* Label */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 60 }}>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--pf-accent)', letterSpacing: 3, textTransform: 'uppercase' }}>05 — Contact</span>
        <div style={{ flex: 1, height: 1, background: 'var(--pf-border)' }} />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 60, alignItems: 'start' }}>
        {/* Left — headline */}
        <div>
          <h2 style={{ fontSize: 'clamp(28px, 4vw, 52px)', fontWeight: 800, letterSpacing: -1.5, margin: '0 0 20px', lineHeight: 1.1 }}>
            Let's build<br />
            <span style={{ color: 'var(--pf-accent)' }}>something real.</span>
          </h2>
          <p style={{ color: 'var(--pf-muted)', fontSize: 15, lineHeight: 1.7, maxWidth: 360 }}>
            I'm open to internships, working student positions, and interesting project collaborations.
            No recruiters for senior roles — I'm a student.
          </p>
        </div>

        {/* Right — contact rows */}
        <div>
          {links.map(link => (
            <a
              key={link.label}
              href={link.href}
              target={link.href.startsWith('mailto') ? undefined : '_blank'}
              rel="noopener noreferrer"
              className="contact-row"
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '22px 0',
                borderBottom: '1px solid var(--pf-border)',
                textDecoration: 'none',
                color: 'var(--pf-text)',
                transition: 'color 0.2s',
                cursor: 'pointer',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.color = 'var(--pf-accent)';
                const arrow = e.currentTarget.querySelector('.arrow') as HTMLElement;
                if (arrow) { arrow.style.transform = 'translate(3px, -3px)'; }
              }}
              onMouseLeave={e => {
                e.currentTarget.style.color = 'var(--pf-text)';
                const arrow = e.currentTarget.querySelector('.arrow') as HTMLElement;
                if (arrow) { arrow.style.transform = 'translate(0,0)'; }
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                <div style={{ color: 'var(--pf-accent)', flexShrink: 0 }}>{link.icon}</div>
                <div>
                  <div style={{ fontWeight: 700, fontSize: 15 }}>{link.label}</div>
                  <div style={{ fontSize: 12, color: 'var(--pf-muted)', marginTop: 2 }}>{link.description}</div>
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--pf-muted)' }}>{link.value}</span>
                <ArrowUpRight className="arrow" size={14} style={{ color: 'var(--pf-muted)', transition: 'transform 0.2s' }} />
              </div>
            </a>
          ))}

          <div style={{ marginTop: 40, background: 'var(--pf-surface)', border: '1px solid var(--pf-border)', borderRadius: 12, padding: 24 }}>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--pf-accent)', letterSpacing: 2, marginBottom: 10, textTransform: 'uppercase' }}>Response time</div>
            <p style={{ color: 'var(--pf-muted)', fontSize: 13, margin: 0, lineHeight: 1.6 }}>
              I typically reply within 24–48 hours. For quick questions, GitHub is fastest.
              Based in Cologne (CET/CEST).
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
