'use client'

import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { projects } from '@/lib/data'

const ease = [0.22, 1, 0.36, 1] as [number, number, number, number]

function ProjectCard({ project, index, parentInView }: { project: typeof projects[0]; index: number; parentInView: boolean }) {
  const [hovered, setHovered] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={parentInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1, ease }}
      whileHover={{ y: -3 }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      style={{
        border: `1px solid ${hovered ? 'rgba(0,0,0,0.22)' : 'var(--pf-border)'}`,
        borderRadius: '12px',
        padding: '40px 48px',
        transition: 'border-color 0.3s ease',
        cursor: 'default',
      }}
    >
      <div className="md:grid md:grid-cols-[40%_60%] gap-10">
        {/* Left */}
        <div style={{ marginBottom: '32px' }} className="md:mb-0">
          <p style={{ fontFamily: 'var(--font-mono)', fontSize: '13px', color: 'var(--pf-muted)', marginBottom: '12px' }}>{project.id}</p>
          <h3 style={{ fontFamily: 'var(--font-sans)', fontSize: '28px', fontWeight: 700, letterSpacing: '-0.02em', color: 'var(--pf-text)', marginBottom: '10px' }}>
            {project.title}
          </h3>
          <p style={{ fontFamily: 'var(--font-sans)', fontSize: '15px', fontStyle: 'italic', color: 'var(--pf-muted)', fontWeight: 300 }}>
            {project.hook}
          </p>
        </div>

        {/* Right */}
        <div>
          {[
            { label: 'Problem', value: project.problem },
            { label: 'Solution', value: project.solution },
            { label: 'Outcome', value: project.outcome },
          ].map(({ label, value }) => (
            <div key={label} style={{ marginBottom: '16px' }}>
              <p style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--pf-muted)', marginBottom: '4px' }}>
                {label}
              </p>
              <p style={{ fontFamily: 'var(--font-sans)', fontSize: '14px', color: 'var(--pf-text)', lineHeight: 1.65, fontWeight: 300 }}>
                {value}
              </p>
            </div>
          ))}

          <div style={{ marginBottom: '16px' }}>
            <p style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--pf-muted)', marginBottom: '8px' }}>
              Stack
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
              {project.stack.map(tech => (
                <span
                  key={tech}
                  style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--pf-muted)', border: '1px solid var(--pf-border)', borderRadius: '4px', padding: '3px 8px' }}
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {project.url && (
            <a
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              style={{ fontFamily: 'var(--font-sans)', fontSize: '14px', fontWeight: 500, color: 'var(--pf-accent)', textDecoration: 'none' }}
            >
              View ↗
            </a>
          )}
        </div>
      </div>
    </motion.div>
  )
}

export default function Projects() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="projects" ref={ref} style={{ position: 'relative', zIndex: 10, padding: '100px 0' }}>
      <div className="max-w-[1200px] mx-auto px-6 md:px-12">
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease }}
          style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--pf-muted)', marginBottom: '16px' }}
        >
          Selected Work
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.08, ease }}
          style={{ fontFamily: 'var(--font-sans)', fontSize: 'clamp(32px, 5vw, 48px)', fontWeight: 600, letterSpacing: '-0.02em', color: 'var(--pf-text)', marginBottom: '56px' }}
        >
          Engineering, not assignments.
        </motion.h2>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {projects.map((p, i) => (
            <ProjectCard key={p.id} project={p} index={i} parentInView={inView} />
          ))}
        </div>
      </div>
    </section>
  )
}
