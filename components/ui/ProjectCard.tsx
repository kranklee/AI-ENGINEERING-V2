'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Project } from '@/lib/types'
import CardGlow from '@/components/effects/CardGlow'
import SkillBadge from './SkillBadge'

interface ProjectCardProps {
  project: Project
}

export default function ProjectCard({ project }: ProjectCardProps) {
  const [hovered, setHovered] = useState(false)

  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
    >
      <CardGlow
        style={{
          background: 'var(--bg-card)',
          border: `1px solid ${hovered ? 'rgba(0,0,0,0.2)' : 'var(--border)'}`,
          borderRadius: '8px',
          transition: 'border-color 0.3s ease',
        }}
      >
        <div
          className="flex flex-col md:flex-row"
          style={{ padding: '40px 48px' }}
        >
          {/* left 40% */}
          <div className="md:w-[40%] md:pr-12 shrink-0">
            <span
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: '13px',
                color: 'var(--text-muted)',
              }}
            >
              {project.number}
            </span>
            <h3
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: '32px',
                fontWeight: 700,
                color: 'var(--text-primary)',
                marginTop: '8px',
                lineHeight: 1.1,
              }}
            >
              {project.title}
            </h3>
            <p
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '15px',
                fontWeight: 300,
                color: 'var(--text-secondary)',
                lineHeight: 1.7,
                marginTop: '12px',
              }}
            >
              {project.description}
            </p>
          </div>

          {/* right 60% */}
          <div className="md:w-[60%] flex flex-col justify-between mt-8 md:mt-0">
            <div className="flex flex-wrap gap-2">
              {project.stack.map(tech => (
                <SkillBadge key={tech} label={tech} />
              ))}
            </div>

            {project.url && (
              <a
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                className="self-start md:self-end mt-6 group"
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '13px',
                  color: 'var(--text-primary)',
                  textDecoration: 'none',
                  borderBottom: '1px solid transparent',
                  transition: 'border-color 0.2s ease',
                }}
                onMouseEnter={e => { e.currentTarget.style.borderBottomColor = 'var(--text-primary)' }}
                onMouseLeave={e => { e.currentTarget.style.borderBottomColor = 'transparent' }}
              >
                View project ↗
              </a>
            )}
          </div>
        </div>
      </CardGlow>
    </motion.div>
  )
}
