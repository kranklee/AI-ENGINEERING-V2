'use client'

import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { Star } from 'lucide-react'
import { githubStats, recentRepos, contributions } from '@/lib/data'

const ease = [0.22, 1, 0.36, 1] as [number, number, number, number]

const langColors: Record<string, string> = {
  Python: '#3572A5',
  TypeScript: '#3178C6',
  'C#': '#178600',
  JavaScript: '#F7DF1E',
}

function ContributionGrid() {
  const [tooltip, setTooltip] = useState<{ x: number; y: number; count: number } | null>(null)

  const getOpacity = (val: number) => {
    if (val === 0) return 0.07
    if (val === 1) return 0.3
    if (val === 2) return 0.55
    if (val === 3) return 0.78
    return 1
  }

  return (
    <div style={{ position: 'relative', overflowX: 'auto' }}>
      <div style={{ display: 'grid', gridTemplateRows: 'repeat(7, 11px)', gridAutoFlow: 'column', gap: '3px', minWidth: 'max-content' }}>
        {contributions.map((val, i) => (
          <div
            key={i}
            onMouseEnter={e => {
              const rect = (e.target as HTMLElement).getBoundingClientRect()
              setTooltip({ x: rect.left, y: rect.top, count: val })
            }}
            onMouseLeave={() => setTooltip(null)}
            style={{
              width: '11px',
              height: '11px',
              borderRadius: '2px',
              background: `rgba(var(--pf-accent-rgb, 0,113,227), ${getOpacity(val)})`,
              backgroundColor: val === 0 ? 'var(--pf-surface)' : undefined,
              cursor: 'default',
              transition: 'opacity 0.1s ease',
            }}
          />
        ))}
      </div>
      {tooltip && (
        <div
          style={{
            position: 'fixed',
            top: tooltip.y - 32,
            left: tooltip.x,
            background: 'var(--pf-text)',
            color: 'var(--pf-bg)',
            fontFamily: 'var(--font-mono)',
            fontSize: '11px',
            padding: '4px 8px',
            borderRadius: '4px',
            pointerEvents: 'none',
            zIndex: 100,
            whiteSpace: 'nowrap',
          }}
        >
          {tooltip.count} contribution{tooltip.count !== 1 ? 's' : ''}
        </div>
      )}
    </div>
  )
}

export default function GitHub() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  const stats = [
    { label: 'Repositories', value: githubStats.repos },
    { label: 'Total commits', value: githubStats.commits.toLocaleString() },
    { label: 'Languages', value: githubStats.languages },
    { label: 'Stars', value: githubStats.stars },
  ]

  return (
    <section id="github" ref={ref} style={{ position: 'relative', zIndex: 10, padding: '100px 0' }}>
      <div className="max-w-[1200px] mx-auto px-6 md:px-12">
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease }}
          style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--pf-muted)', marginBottom: '16px' }}
        >
          Activity
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.08, ease }}
          style={{ fontFamily: 'var(--font-sans)', fontSize: 'clamp(32px, 5vw, 48px)', fontWeight: 600, letterSpacing: '-0.02em', color: 'var(--pf-text)', marginBottom: '56px' }}
        >
          What I&apos;m shipping.
        </motion.h2>

        {/* Stats row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
          {stats.map(({ label, value }, i) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.15 + i * 0.07, ease }}
              style={{ background: 'var(--pf-surface)', border: '1px solid var(--pf-border)', borderRadius: '12px', padding: '20px 24px' }}
            >
              <p style={{ fontFamily: 'var(--font-sans)', fontSize: '28px', fontWeight: 700, color: 'var(--pf-text)', marginBottom: '4px' }}>{value}</p>
              <p style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--pf-muted)' }}>{label}</p>
            </motion.div>
          ))}
        </div>

        {/* Contribution grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4, ease }}
          style={{ background: 'var(--pf-surface)', border: '1px solid var(--pf-border)', borderRadius: '12px', padding: '24px', marginBottom: '24px' }}
        >
          <p style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--pf-muted)', marginBottom: '16px' }}>
            Contribution activity · Last 12 months
          </p>
          <ContributionGrid />
        </motion.div>

        {/* Recent repos */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '16px' }}>
          {recentRepos.map((repo, i) => (
            <motion.a
              key={repo.name}
              href={`https://github.com/kranklee/${repo.name}`}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 12 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.5 + i * 0.08, ease }}
              style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px', background: 'var(--pf-surface)', border: '1px solid var(--pf-border)', borderRadius: '10px', padding: '16px 20px', textDecoration: 'none', transition: 'border-color 0.2s ease' }}
              whileHover={{ y: -1 }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = 'var(--pf-muted)' }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = 'var(--pf-border)' }}
            >
              <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <span style={{ fontFamily: 'var(--font-sans)', fontSize: '15px', fontWeight: 600, color: 'var(--pf-accent)' }}>{repo.name}</span>
                <span style={{ fontFamily: 'var(--font-sans)', fontSize: '13px', fontWeight: 300, color: 'var(--pf-muted)' }}>{repo.description}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexShrink: 0 }}>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: '#fff', background: langColors[repo.language] ?? '#888', borderRadius: '4px', padding: '2px 8px' }}>
                  {repo.language}
                </span>
                <span style={{ display: 'flex', alignItems: 'center', gap: '4px', fontFamily: 'var(--font-mono)', fontSize: '12px', color: 'var(--pf-muted)' }}>
                  <Star size={12} /> {repo.stars}
                </span>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--pf-muted)' }}>{repo.updatedAt}</span>
              </div>
            </motion.a>
          ))}
        </div>

        <p style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', color: 'var(--pf-muted)' }}>
          Connected to{' '}
          <a href="https://github.com/kranklee" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--pf-accent)', textDecoration: 'none' }}>
            github.com/kranklee
          </a>
        </p>
      </div>
    </section>
  )
}
