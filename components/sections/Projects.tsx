'use client';
import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ExternalLink, ArrowRight } from 'lucide-react';
import { projects } from '@/lib/data';

gsap.registerPlugin(ScrollTrigger);

export default function Projects() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  // GSAP horizontal scroll — the KEY feature
  useEffect(() => {
    if (isMobile) return;

    const section = sectionRef.current;
    const track = trackRef.current;
    if (!section || !track) return;

    const ctx = gsap.context(() => {
      const totalWidth = track.scrollWidth - window.innerWidth;

      const st = gsap.to(track, {
        x: () => -totalWidth,
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: () => '+=' + (totalWidth + window.innerHeight),
          pin: true,
          anticipatePin: 1,
          scrub: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            // Update progress bar
            const bar = section.querySelector('.scroll-progress-bar') as HTMLElement;
            if (bar) bar.style.width = `${self.progress * 100}%`;
          },
        },
      });

      return () => st.kill();
    }, section);

    return () => ctx.revert();
  }, [isMobile]);

  // Mobile layout — vertical cards
  if (isMobile) {
    return (
      <section id="projects" style={{ padding: '80px 24px' }}>
        <div style={{ maxWidth: 700, margin: '0 auto' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 48 }}>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--pf-accent)', letterSpacing: 3, textTransform: 'uppercase' }}>02 — Projects</span>
            <div style={{ flex: 1, height: 1, background: 'var(--pf-border)' }} />
          </div>
          {projects.map(p => (
            <MobileCard key={p.id} project={p} />
          ))}
        </div>
      </section>
    );
  }

  // Desktop — horizontal scroll
  return (
    <div
      id="projects"
      ref={sectionRef}
      style={{ position: 'relative' }}
    >
      {/* Sticky viewport */}
      <div style={{ position: 'sticky', top: 0, height: '100vh', overflow: 'hidden' }}>

        {/* Section label — fixed in top-left */}
        <div style={{
          position: 'absolute',
          top: 32,
          left: 40,
          zIndex: 10,
          display: 'flex',
          alignItems: 'center',
          gap: 12,
        }}>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--pf-accent)', letterSpacing: 3, textTransform: 'uppercase' }}>02 — Projects</span>
        </div>

        {/* Scroll progress bar */}
        <div style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: 2,
          background: 'var(--pf-border)',
          zIndex: 10,
        }}>
          <div
            className="scroll-progress-bar"
            style={{
              height: '100%',
              width: '0%',
              background: 'var(--pf-accent)',
              transition: 'width 0.05s linear',
            }}
          />
        </div>

        {/* Horizontal track */}
        <div
          ref={trackRef}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            height: '100%',
            display: 'flex',
            willChange: 'transform',
          }}
        >
          {/* Intro panel */}
          <IntroPanel />

          {/* Project panels */}
          {projects.map((project, i) => (
            <ProjectPanel key={project.id} project={project} index={i} />
          ))}
        </div>
      </div>
    </div>
  );
}

function IntroPanel() {
  return (
    <div
      style={{
        width: '100vw',
        height: '100vh',
        flexShrink: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '80px 80px 80px 80px',
      }}
    >
      <div style={{ maxWidth: 540 }}>
        <h2 style={{
          fontSize: 'clamp(36px, 5vw, 64px)',
          fontWeight: 800,
          letterSpacing: -2,
          lineHeight: 1.05,
          marginBottom: 24,
          color: 'var(--pf-text)',
        }}>
          Things I've<br />
          <span style={{ color: 'var(--pf-accent)' }}>shipped.</span>
        </h2>
        <p style={{ color: 'var(--pf-muted)', fontSize: 16, lineHeight: 1.7, marginBottom: 40 }}>
          Each project solved a real problem. Scroll right to read the full case study for each one.
        </p>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, color: 'var(--pf-dim)' }}>
          <ArrowRight size={18} />
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 12, letterSpacing: 2 }}>SCROLL TO EXPLORE</span>
        </div>
      </div>
    </div>
  );
}

function ProjectPanel({ project, index }: { project: typeof projects[number]; index: number }) {
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        panelRef.current?.querySelectorAll('.panel-content') ?? [],
        { y: 30, opacity: 0 },
        {
          y: 0, opacity: 1,
          duration: 0.7,
          stagger: 0.08,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: panelRef.current,
            start: 'left 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    });
    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={panelRef}
      style={{
        width: '100vw',
        height: '100vh',
        flexShrink: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '80px 80px 80px 60px',
        borderLeft: '1px solid var(--pf-border)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Background accent */}
      <div style={{
        position: 'absolute',
        top: -100,
        right: -100,
        width: 400,
        height: 400,
        background: `radial-gradient(circle, ${project.color}15 0%, transparent 70%)`,
        pointerEvents: 'none',
      }} />

      {/* Number */}
      <div className="panel-content" style={{
        position: 'absolute',
        top: 40,
        right: 60,
        fontFamily: 'var(--font-mono)',
        fontSize: 80,
        fontWeight: 900,
        color: 'var(--pf-border)',
        lineHeight: 1,
        userSelect: 'none',
      }}>
        {String(index + 1).padStart(2, '0')}
      </div>

      <div style={{ maxWidth: 580, width: '100%' }}>
        {/* Title */}
        <div className="panel-content" style={{ marginBottom: 8 }}>
          <span style={{
            fontFamily: 'var(--font-mono)',
            fontSize: 11,
            color: project.color,
            letterSpacing: 3,
            textTransform: 'uppercase',
          }}>
            {project.tagline}
          </span>
        </div>

        <h3 className="panel-content" style={{
          fontSize: 'clamp(28px, 3.5vw, 48px)',
          fontWeight: 800,
          letterSpacing: -1.5,
          margin: '0 0 28px',
          lineHeight: 1.1,
          color: 'var(--pf-text)',
        }}>
          {project.title}
        </h3>

        {/* Problem / Solution */}
        <div className="panel-content" style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: 24,
          marginBottom: 28,
        }}>
          <div>
            <div style={{ fontSize: 10, fontFamily: 'var(--font-mono)', color: 'var(--pf-dim)', letterSpacing: 2, marginBottom: 8, textTransform: 'uppercase' }}>Problem</div>
            <p style={{ color: 'var(--pf-muted)', fontSize: 13, lineHeight: 1.65, margin: 0 }}>{project.problem}</p>
          </div>
          <div>
            <div style={{ fontSize: 10, fontFamily: 'var(--font-mono)', color: 'var(--pf-dim)', letterSpacing: 2, marginBottom: 8, textTransform: 'uppercase' }}>Solution</div>
            <p style={{ color: 'var(--pf-muted)', fontSize: 13, lineHeight: 1.65, margin: 0 }}>{project.solution}</p>
          </div>
        </div>

        {/* Outcome */}
        <div className="panel-content" style={{
          background: 'var(--pf-surface)',
          border: `1px solid ${project.color}30`,
          borderRadius: 10,
          padding: '14px 18px',
          marginBottom: 24,
        }}>
          <div style={{ fontSize: 10, fontFamily: 'var(--font-mono)', color: project.color, letterSpacing: 2, marginBottom: 6, textTransform: 'uppercase' }}>Outcome</div>
          <p style={{ color: 'var(--pf-text)', fontSize: 13, margin: 0, fontWeight: 500 }}>{project.outcome}</p>
        </div>

        {/* Stack */}
        <div className="panel-content" style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 28 }}>
          {project.stack.map(s => (
            <span key={s} style={{
              background: 'var(--pf-elevated)',
              border: '1px solid var(--pf-border)',
              borderRadius: 6,
              padding: '4px 10px',
              fontSize: 12,
              fontFamily: 'var(--font-mono)',
              color: 'var(--pf-muted)',
            }}>
              {s}
            </span>
          ))}
        </div>

        {/* Link */}
        <a
          className="panel-content"
          href={project.url}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 6,
            color: project.color,
            textDecoration: 'none',
            fontSize: 13,
            fontWeight: 600,
            fontFamily: 'var(--font-mono)',
            transition: 'opacity 0.2s',
          }}
          onMouseEnter={e => (e.currentTarget.style.opacity = '0.7')}
          onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
        >
          View on GitHub <ExternalLink size={13} />
        </a>
      </div>
    </div>
  );
}

function MobileCard({ project }: { project: typeof projects[number] }) {
  return (
    <div style={{
      background: 'var(--pf-surface)',
      border: '1px solid var(--pf-border)',
      borderRadius: 16,
      padding: 24,
      marginBottom: 20,
    }}>
      <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: project.color, letterSpacing: 3, textTransform: 'uppercase', marginBottom: 8 }}>
        {project.tagline}
      </div>
      <h3 style={{ fontSize: 20, fontWeight: 800, letterSpacing: -0.5, margin: '0 0 16px', color: 'var(--pf-text)' }}>{project.title}</h3>
      <p style={{ color: 'var(--pf-muted)', fontSize: 14, lineHeight: 1.65, marginBottom: 12 }}>{project.solution}</p>
      <div style={{ background: 'var(--pf-elevated)', borderRadius: 8, padding: '10px 14px', marginBottom: 16 }}>
        <p style={{ color: 'var(--pf-text)', fontSize: 13, margin: 0, fontWeight: 500 }}>{project.outcome}</p>
      </div>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 16 }}>
        {project.stack.map(s => (
          <span key={s} style={{ background: 'var(--pf-elevated)', border: '1px solid var(--pf-border)', borderRadius: 5, padding: '3px 8px', fontSize: 11, fontFamily: 'var(--font-mono)', color: 'var(--pf-muted)' }}>
            {s}
          </span>
        ))}
      </div>
      <a href={project.url} target="_blank" rel="noopener noreferrer" style={{ color: project.color, fontSize: 13, fontWeight: 600, textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 5 }}>
        GitHub <ExternalLink size={12} />
      </a>
    </div>
  );
}
