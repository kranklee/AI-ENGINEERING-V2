'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { projects } from '@/lib/data'
import ProjectCard from '@/components/ui/ProjectCard'
import SectionLabel from '@/components/ui/SectionLabel'

const ease = [0.22, 1, 0.36, 1] as [number, number, number, number]

export default function Projects() {
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section
      id="projects"
      ref={ref}
      className="border-t"
      style={{ borderColor: 'var(--border)', padding: '160px 0', zIndex: 2, position: 'relative' }}
    >
      <div className="max-w-[1200px] mx-auto px-6 md:px-12">
        <SectionLabel number="03" label="WORK" />

        <div className="space-y-6">
          {projects.map((project, i) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 32 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, ease, delay: i * 0.15 }}
            >
              <ProjectCard project={project} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
