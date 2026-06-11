'use client'
import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Star, ExternalLink, BookOpen } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

interface Repo {
  name: string
  description: string | null
  language: string | null
  stars: number
  updatedAt: string
  url: string
}

interface GitHubData {
  repos: Repo[]
  publicRepos: number
  username: string
  error?: string
}

const langColor: Record<string, string> = {
  Python: '#3572A5',
  TypeScript: '#2b7489',
  JavaScript: '#f1e05a',
  'C#': '#178600',
  Java: '#b07219',
  Shell: '#89e051',
  Dockerfile: '#384d54',
  HTML: '#e34c26',
  CSS: '#563d7c',
  Go: '#00ADD8',
  Rust: '#dea584',
}

function truncate(str: string | null, max: number): string {
  if (!str) return ''
  return str.length > max ? str.slice(0, max - 1) + '…' : str
}

export default function GitHub() {
  const sectionRef = useRef<HTMLElement>(null)
  const [data, setData] = useState<GitHubData | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/github')
      .then(r => r.json())
      .then(d => { setData(d); setLoading(false) })
      .catch(() => setLoading(false))
  }, [])

  useEffect(() => {
    if (loading) return
    const ctx = gsap.context(() => {
      gsap.fromTo(
        sectionRef.current?.querySelectorAll('.gh-card') ?? [],
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, stagger: 0.1, ease: 'power2.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' } },
      )
    })
    return () => ctx.revert()
  }, [loading])

  return (
    <section
      id="github"
      ref={sectionRef}
      style={{ padding: 'clamp(60px,10vw,120px) 32px', maxWidth: 1100, margin: '0 auto', fontFamily: 'var(--font-sans)' }}
    >
      {/* Header row */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 48, flexWrap: 'wrap', gap: 12 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--tx3)', letterSpacing: '0.12em', textTransform: 'uppercase' }}>
            GitHub
          </div>
          {!loading && data && !data.error && (
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: 'var(--tx3)', fontSize: 12, fontFamily: 'var(--font-mono)' }}>
              <BookOpen size={12} />
              {data.publicRepos} public repos
            </div>
          )}
        </div>
        {!loading && data && !data.error && (
          <a
            href={`https://github.com/${data.username}`}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-flex', alignItems: 'center', gap: 6,
              background: 'var(--bg2)', border: '1px solid var(--br)',
              borderRadius: 7, padding: '8px 16px',
              color: 'var(--tx2)', textDecoration: 'none', fontSize: 12,
              fontFamily: 'var(--font-mono)', transition: 'border-color 0.2s, color 0.2s',
            }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--br2)'; e.currentTarget.style.color = 'var(--tx)' }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--br)'; e.currentTarget.style.color = 'var(--tx2)' }}
          >
            <ExternalLink size={12} />
            github.com/{data.username}
          </a>
        )}
      </div>

      <h2 style={{ fontSize: 'clamp(26px,3.5vw,40px)', fontWeight: 700, letterSpacing: '-0.03em', margin: '0 0 36px', color: 'var(--tx)', lineHeight: 1.1 }}>
        What I&apos;m building.
      </h2>

      {/* Error state */}
      {!loading && (!data || data.error) && (
        <p style={{ color: 'var(--tx2)', fontSize: 14 }}>Could not load GitHub data.</p>
      )}

      {/* 2-column repo grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 14 }}>
        {loading
          ? Array.from({ length: 4 }).map((_, i) => (
              <div
                key={i}
                className="gh-card"
                style={{
                  background: 'var(--bg2)',
                  border: '1px solid var(--br)',
                  borderRadius: 12,
                  height: 120,
                  animation: 'gh-pulse 1.6s ease-in-out infinite',
                }}
              />
            ))
          : data?.repos?.map(repo => (
              <a
                key={repo.name}
                href={repo.url}
                target="_blank"
                rel="noopener noreferrer"
                className="gh-card"
                style={{
                  background: 'var(--bg2)', border: '1px solid var(--br)',
                  borderRadius: 12, padding: 20, textDecoration: 'none', display: 'block',
                  transition: 'border-color 0.2s, transform 0.2s',
                }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--br2)'; e.currentTarget.style.transform = 'translateY(-2px)' }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--br)'; e.currentTarget.style.transform = 'translateY(0)' }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8 }}>
                  <span style={{ fontWeight: 600, fontSize: 14, color: 'var(--tx)', fontFamily: 'var(--font-mono)' }}>{repo.name}</span>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 4, color: 'var(--tx3)', fontSize: 12, flexShrink: 0 }}>
                    <Star size={11} />{repo.stars}
                  </div>
                </div>
                {repo.description && (
                  <p style={{ color: 'var(--tx2)', fontSize: 13, margin: '0 0 12px', lineHeight: 1.5, fontWeight: 300 }}>
                    {truncate(repo.description, 80)}
                  </p>
                )}
                {repo.language && (
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12, color: 'var(--tx2)' }}>
                    <div style={{ width: 9, height: 9, borderRadius: '50%', background: langColor[repo.language] ?? 'var(--tx3)', flexShrink: 0 }} />
                    {repo.language}
                  </div>
                )}
              </a>
            ))
        }
      </div>

      <style>{`
        @keyframes gh-pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.4; }
        }
      `}</style>
    </section>
  )
}
