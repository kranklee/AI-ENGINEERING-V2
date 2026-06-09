'use client'
import { useStore } from '@/lib/store'
import { t } from '@/lib/i18n'
import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const projects = [
  {
    number: '01',
    name: 'CyberWatch::AI',
    hook: 'Real-time threat classifier',
    problem: 'No lightweight threat classifier for small teams.',
    solution: 'React dashboard + Flask API + TensorFlow classifying live network threats.',
    stack: 'React · Flask · TensorFlow · Python',
    outcome: 'Deployed live. Real classification, not a mock.',
    url: 'https://kranklee.github.io/CyberWatch-AI',
  },
  {
    number: '02',
    name: 'Canada Rental System',
    hook: 'Full-stack rental platform',
    problem: 'Needed a complete rental management system from scratch.',
    solution: 'Full platform — property listings, tenant auth, full CRUD.',
    stack: 'C# · ASP.NET · jQuery · SQL Server',
    outcome: 'Production-ready. Found real edge cases in ASP.NET routing.',
    url: '',
  },
  {
    number: '03',
    name: 'MQTT Solar IoT',
    hook: 'Real-time sensor monitoring',
    problem: 'Sensor data was freezing the UI during continuous streams.',
    solution: 'Multithreaded Python app streaming data over MQTT to tkinter GUI.',
    stack: 'Python · MQTT · tkinter · threading',
    outcome: 'Live dashboard. UI stays responsive during continuous data.',
    url: '',
  },
  {
    number: '04',
    name: 'AI Engineering Path',
    hook: 'Python to production AI',
    problem: 'No structured path from Python basics to real AI systems.',
    solution: 'Progressive curriculum — Python → FastAPI → RAG → LLM APIs.',
    stack: 'Python · FastAPI · RAG · Anthropic API',
    outcome: 'In progress. Building toward production AI pipelines.',
    url: 'https://github.com/kranklee/AI-ENGINEERING-V2',
  },
]

export default function Projects() {
  const { lang } = useStore()
  const tx = t[lang].projects
  const sectionRef = useRef<HTMLDivElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768)
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

  useEffect(() => {
    if (isMobile) return

    gsap.registerPlugin(ScrollTrigger)

    const section = sectionRef.current
    const track = trackRef.current
    if (!section || !track) return

    const ctx = gsap.context(() => {
      const totalWidth = track.scrollWidth - window.innerWidth

      gsap.to(track, {
        x: () => -totalWidth,
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: () => `+=${totalWidth + window.innerHeight}`,
          pin: true,
          anticipatePin: 1,
          scrub: 1,
          invalidateOnRefresh: true,
        },
      })
    }, section)

    return () => ctx.revert()
  }, [isMobile])

  /* ── Mobile: vertical cards ── */
  if (isMobile) {
    return (
      <section id="projects" style={{ padding: '60px 20px', fontFamily: 'var(--font-sans)' }}>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--tx3)', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 16 }}>
          {tx.label}
        </div>
        <h2 style={{ fontSize: 'clamp(28px,6vw,48px)', fontWeight: 800, letterSpacing: '-0.03em', color: 'var(--tx)', marginBottom: 40, lineHeight: 1.05 }}>
          {tx.heading}
        </h2>
        {projects.map((p, i) => (
          <div key={i} style={{ background: 'var(--bg2)', border: '1px solid var(--br)', borderRadius: 12, padding: 24, marginBottom: 20 }}>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--tx3)', marginBottom: 8 }}>{p.number}</div>
            <h3 style={{ fontSize: 22, fontWeight: 700, color: 'var(--tx)', marginBottom: 4, letterSpacing: '-0.02em' }}>{p.name}</h3>
            <div style={{ fontSize: 14, color: 'var(--tx2)', fontStyle: 'italic', marginBottom: 20, fontWeight: 300 }}>{p.hook}</div>
            <div style={{ height: 1, background: 'var(--br)', marginBottom: 20 }} />
            {[
              { label: tx.problem, value: p.problem },
              { label: tx.solution, value: p.solution },
              { label: tx.stack, value: p.stack },
              { label: tx.outcome, value: p.outcome },
            ].map((row, j) => (
              <div key={j} style={{ marginBottom: 14 }}>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--tx3)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 4 }}>{row.label}</div>
                <div style={{ fontSize: 13, color: 'var(--tx2)', lineHeight: 1.6, fontWeight: 300 }}>{row.value}</div>
              </div>
            ))}
            {p.url && (
              <a href={p.url} target="_blank" rel="noopener noreferrer"
                style={{ display: 'inline-block', marginTop: 8, fontSize: 13, color: 'var(--ac)', textDecoration: 'none', fontFamily: 'var(--font-mono)', letterSpacing: '0.02em' }}>
                {tx.view}
              </a>
            )}
          </div>
        ))}
      </section>
    )
  }

  /* ── Desktop: GSAP horizontal scroll ── */
  return (
    <section
      ref={sectionRef}
      id="projects"
      style={{ position: 'relative', fontFamily: 'var(--font-sans)' }}
    >
      {/* Sticky viewport — clips overflow so panels outside the screen are hidden */}
      <div style={{ position: 'sticky', top: 0, height: '100vh', overflow: 'hidden' }}>
        {/* Horizontal track — gets the GSAP x transform */}
        <div
          ref={trackRef}
          style={{ position: 'absolute', top: 0, left: 0, height: '100%', display: 'flex', willChange: 'transform' }}
        >
          {/* Intro panel */}
          <div style={{
            width: '100vw', height: '100vh', flexShrink: 0,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            borderRight: '1px solid var(--br)', padding: '0 64px',
          }}>
            <div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--tx3)', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 16 }}>
                {tx.label}
              </div>
              <h2 style={{ fontSize: 'clamp(48px,8vw,96px)', fontWeight: 800, letterSpacing: '-0.04em', color: 'var(--tx)', lineHeight: 0.9, marginBottom: 24 }}>
                {tx.heading}
              </h2>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: 13, color: 'var(--tx3)', letterSpacing: '0.05em' }}>
                {projects.length} projects → scroll
              </div>
            </div>
          </div>

          {/* Project panels */}
          {projects.map((p, i) => (
            <div
              key={i}
              style={{
                width: '80vw', maxWidth: 800, height: '100vh', flexShrink: 0,
                display: 'flex', alignItems: 'center',
                padding: '0 64px', borderRight: '1px solid var(--br)',
              }}
            >
              <div style={{ width: '100%' }}>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--tx3)', marginBottom: 12 }}>{p.number}</div>
                <h3 style={{ fontSize: 'clamp(28px,4vw,52px)', fontWeight: 700, letterSpacing: '-0.03em', color: 'var(--tx)', marginBottom: 6 }}>
                  {p.name}
                </h3>
                <div style={{ fontSize: 16, color: 'var(--tx2)', fontStyle: 'italic', marginBottom: 28, fontWeight: 300 }}>
                  {p.hook}
                </div>
                <div style={{ height: 1, background: 'var(--br)', marginBottom: 28 }} />
                {[
                  { label: tx.problem, value: p.problem },
                  { label: tx.solution, value: p.solution },
                  { label: tx.stack, value: p.stack },
                  { label: tx.outcome, value: p.outcome },
                ].map((row, j) => (
                  <div key={j} style={{ marginBottom: 16 }}>
                    <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--tx3)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 4 }}>
                      {row.label}
                    </div>
                    <div style={{ fontSize: 14, color: 'var(--tx2)', lineHeight: 1.6, fontWeight: 300 }}>
                      {row.value}
                    </div>
                  </div>
                ))}
                {p.url && (
                  <a
                    href={p.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ display: 'inline-block', marginTop: 8, fontSize: 13, color: 'var(--ac)', textDecoration: 'none', fontFamily: 'var(--font-mono)', letterSpacing: '0.02em' }}
                    onMouseEnter={e => (e.currentTarget.style.opacity = '0.7')}
                    onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
                  >
                    {tx.view}
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
