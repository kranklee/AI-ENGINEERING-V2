'use client'

import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { projects } from '@/lib/data'

function ProjectCard({ project, index, parentInView }: {
  project: typeof projects[0]
  index: number
  parentInView: boolean
}) {
  const [hovered, setHovered] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={parentInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      whileHover={{ y: -4 }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      style={{
        padding: '32px',
        borderRadius: '16px',
        border: `1px solid ${hovered ? 'var(--pf-text-muted)' : 'var(--pf-border)'}`,
        background: 'var(--pf-bg-secondary)',
        transition: 'border-color 0.25s ease, background 0.25s ease',
        cursor: 'default',
      }}
    >
      <div className="md:grid md:grid-cols-[40%_60%] gap-8">
        {/* Left */}
        <div>
          <p
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '12px',
              color: 'var(--pf-text-muted)',
              marginBottom: '12px',
            }}
          >
            {project.id}
          </p>
          <h3
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: '22px',
              fontWeight: 600,
              color: 'var(--pf-text-primary)',
              marginBottom: '8px',
              letterSpacing: '-0.01em',
            }}
          >
            {project.title}
          </h3>
          <p
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: '15px',
              fontStyle: 'italic',
              color: 'var(--pf-accent)',
              fontWeight: 300,
            }}
          >
            {project.highlight}
          </p>
        </div>

        {/* Right */}
        <div style={{ marginTop: '24px' }} className="md:mt-0">
          <p
            style={{
              fontSize: '15px',
              fontWeight: 300,
              color: 'var(--pf-text-secondary)',
              lineHeight: 1.7,
              marginBottom: '20px',
            }}
          >
            {project.description}
          </p>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '20px' }}>
            {project.stack.map((tech) => (
              <span
                key={tech}
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '11px',
                  color: 'var(--pf-text-muted)',
                  background: 'var(--pf-bg)',
                  border: '1px solid var(--pf-border)',
                  borderRadius: '4px',
                  padding: '3px 8px',
                }}
              >
                {tech}
              </span>
            ))}
          </div>

          {project.url && (
            <a
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: '14px',
                fontWeight: 500,
                color: 'var(--pf-accent)',
                textDecoration: 'none',
              }}
            >
              View project ↗
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
    <section id="projects" ref={ref} style={{ position: 'relative', zIndex: 10, padding: '120px 0' }}>
      <div className="max-w-[1200px] mx-auto px-6 md:px-12">
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '12px',
            textTransform: 'uppercase',
            letterSpacing: '0.1em',
            color: 'var(--pf-text-muted)',
            marginBottom: '64px',
          }}
        >
          03 — Work
        </motion.p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {projects.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} parentInView={inView} />
          ))}
        </div>
      </div>
    </section>
  )
}
