'use client'
import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Star, ExternalLink, Users, BookOpen } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

interface Repo {
  name: string
  description: string | null
  language: string | null
  stars: number
  updatedAt: string
  url: string
  topics: string[]
}

interface GitHubData {
  repos: Repo[]
  publicRepos: number
  followers: number
  following: number
  username: string
  avatarUrl: string
  bio: string | null
  error?: string
}

const langColor: Record<string, string> = {
  Python: '#3572A5',
  TypeScript: '#2b7489',
  JavaScript: '#f1e05a',
  Shell: '#89e051',
  Dockerfile: '#384d54',
  HTML: '#e34c26',
  CSS: '#563d7c',
  Go: '#00ADD8',
  Rust: '#dea584',
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
    const ctx = gsap.context(() => {
      gsap.fromTo(
        sectionRef.current?.querySelectorAll('.gh-card') ?? [],
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, stagger: 0.1, ease: 'power2.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' } },
      )
    })
    return () => ctx.revert()
  }, [data])

  return (
    <section
      id="github"
      ref={sectionRef}
      style={{ padding: 'clamp(60px,10vw,120px) 32px', maxWidth: 1100, margin: '0 auto', fontFamily: 'var(--font-sans)' }}
    >
      {/* Label */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 56 }}>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--tx3)', letterSpacing: '0.12em', textTransform: 'uppercase' }}>
          GitHub
        </span>
        <div style={{ flex: 1, height: 1, background: 'var(--br)' }} />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 40, alignItems: 'start' }}>
        {/* Stats */}
        <div>
          <h2 style={{ fontSize: 'clamp(26px,3.5vw,40px)', fontWeight: 700, letterSpacing: '-0.03em', margin: '0 0 24px', color: 'var(--tx)', lineHeight: 1.1 }}>
            Open source.
          </h2>

          {loading ? (
            <div style={{ color: 'var(--tx2)', fontFamily: 'var(--font-mono)', fontSize: 12 }}>Loading...</div>
          ) : data?.error ? (
            <div style={{ color: 'var(--tx2)', fontSize: 14 }}>Could not load GitHub data.</div>
          ) : data && (
            <>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 32 }}>
                {[
                  { icon: <BookOpen size={16} />, label: 'Public Repos', value: data.publicRepos },
                  { icon: <Users size={16} />, label: 'Followers', value: data.followers },
                ].map(stat => (
                  <div
                    key={stat.label}
                    className="gh-card"
                    style={{ background: 'var(--bg2)', border: '1px solid var(--br)', borderRadius: 12, padding: 20 }}
                  >
                    <div style={{ color: 'var(--ac)', marginBottom: 8 }}>{stat.icon}</div>
                    <div style={{ fontSize: 28, fontWeight: 800, letterSpacing: '-0.03em', color: 'var(--tx)' }}>{stat.value}</div>
                    <div style={{ fontSize: 12, color: 'var(--tx3)', fontFamily: 'var(--font-mono)', marginTop: 4 }}>{stat.label}</div>
                  </div>
                ))}
              </div>

              <a
                href={`https://github.com/${data.username}`}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: 8,
                  background: 'var(--bg2)', border: '1px solid var(--br)',
                  borderRadius: 8, padding: '10px 20px',
                  color: 'var(--tx)', textDecoration: 'none', fontSize: 13, fontWeight: 500,
                  transition: 'border-color 0.2s',
                }}
                onMouseEnter={e => (e.currentTarget.style.borderColor = 'var(--br2)')}
                onMouseLeave={e => (e.currentTarget.style.borderColor = 'var(--br)')}
              >
                <ExternalLink size={13} />
                github.com/{data.username}
              </a>
            </>
          )}
        </div>

        {/* Repo list */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          {loading ? (
            Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="gh-card" style={{ background: 'var(--bg2)', borderRadius: 12, height: 110, border: '1px solid var(--br)' }} />
            ))
          ) : data?.repos?.map(repo => (
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
                <div style={{ display: 'flex', alignItems: 'center', gap: 4, color: 'var(--tx3)', fontSize: 12 }}>
                  <Star size={11} />{repo.stars}
                </div>
              </div>
              {repo.description && (
                <p style={{ color: 'var(--tx2)', fontSize: 13, margin: '0 0 12px', lineHeight: 1.5, fontWeight: 300 }}>{repo.description}</p>
              )}
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                {repo.language && (
                  <div style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: 12, color: 'var(--tx2)' }}>
                    <div style={{ width: 9, height: 9, borderRadius: '50%', background: langColor[repo.language] ?? 'var(--tx3)' }} />
                    {repo.language}
                  </div>
                )}
                {repo.topics.map(topic => (
                  <span key={topic} style={{ fontSize: 11, fontFamily: 'var(--font-mono)', color: 'var(--tx2)', background: 'var(--tag-bg)', border: '1px solid var(--tag-br)', borderRadius: 4, padding: '2px 7px' }}>
                    {topic}
                  </span>
                ))}
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
