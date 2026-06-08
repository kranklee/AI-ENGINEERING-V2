'use client'

import { motion } from 'framer-motion'
import { Project } from '@/lib/types'
import SkillBadge from './SkillBadge'

interface ProjectCardProps {
  project: Project
}

export default function ProjectCard({ project }: ProjectCardProps) {
  return (
    <motion.div
      className="p-8 rounded-lg border relative group cursor-default flex flex-col"
      style={{ background: 'var(--bg-secondary)', borderColor: 'var(--border)' }}
      whileHover={{ scale: 1.01, borderColor: 'rgba(0,255,136,0.3)' }}
      transition={{ duration: 0.2 }}
    >
      <span
        className="text-[13px]"
        style={{ fontFamily: 'var(--font-display)', color: 'var(--text-muted)' }}
      >
        {project.number}
      </span>

      <h3
        className="mt-4 text-[22px] leading-tight"
        style={{ fontFamily: 'var(--font-display)', color: 'var(--text-primary)' }}
      >
        {project.title}
      </h3>

      <p className="mt-1 text-sm italic" style={{ color: 'var(--text-secondary)' }}>
        {project.highlight}
      </p>

      <p className="mt-3 text-[15px] leading-[1.7] flex-1" style={{ color: 'var(--text-secondary)' }}>
        {project.description}
      </p>

      <div className="flex flex-wrap gap-2 mt-4">
        {project.stack.map(tech => (
          <SkillBadge key={tech} label={tech} />
        ))}
      </div>

      {project.url && (
        <a
          href={project.url}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 text-sm inline-block opacity-0 group-hover:opacity-100 transition-opacity duration-200"
          style={{ color: 'var(--accent)' }}
        >
          View Project →
        </a>
      )}
    </motion.div>
  )
}
