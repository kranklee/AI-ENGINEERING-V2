'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const links = [
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Contact', href: '#contact' },
]

export default function NavBar() {
  const [scrolled, setScrolled] = useState(false)
  const [active, setActive] = useState('')
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setOpen(false) }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  // could use a single observer — will clean up later
  useEffect(() => {
    const ids = ['about', 'skills', 'projects', 'contact']
    const obs: IntersectionObserver[] = []
    ids.forEach(id => {
      const el = document.getElementById(id)
      if (!el) return
      const o = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActive(id) },
        { threshold: 0.3 }
      )
      o.observe(el)
      obs.push(o)
    })
    return () => obs.forEach(o => o.disconnect())
  }, [])

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{
        backdropFilter: scrolled ? 'blur(12px)' : 'none',
        WebkitBackdropFilter: scrolled ? 'blur(12px)' : 'none',
        background: scrolled ? 'rgba(250,250,248,0.85)' : 'transparent',
        borderBottom: scrolled ? '1px solid rgba(0,0,0,0.06)' : '1px solid transparent',
      }}
    >
      <div
        className="max-w-[1200px] mx-auto px-6 md:px-12 flex items-center justify-between"
        style={{ height: '64px' }}
      >
        <a
          href="#"
          style={{
            fontFamily: 'var(--font-body)',
            fontWeight: 500,
            fontSize: '15px',
            color: 'var(--text-primary)',
            textDecoration: 'none',
          }}
        >
          Cem Besli
        </a>

        {/* desktop nav */}
        <div className="hidden md:flex items-center gap-8">
          {links.map(link => {
            const id = link.href.replace('#', '')
            const isActive = active === id
            return (
              <a
                key={link.href}
                href={link.href}
                className={`nav-link ${isActive ? 'active' : ''}`}
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '14px',
                  color: isActive ? 'var(--text-primary)' : 'var(--text-secondary)',
                }}
              >
                {link.label}
              </a>
            )
          })}

          <span
            style={{
              background: 'var(--highlight)',
              color: 'var(--text-primary)',
              fontFamily: 'var(--font-body)',
              fontSize: '12px',
              padding: '4px 12px',
              borderRadius: '100px',
              whiteSpace: 'nowrap',
            }}
          >
            Available for work →
          </span>
        </div>

        {/* hamburger */}
        <button
          className="md:hidden flex flex-col justify-center gap-[6px] w-8 h-8 focus:outline-none"
          onClick={() => setOpen(o => !o)}
          aria-label="Toggle navigation"
          aria-expanded={open}
        >
          <span
            className="block w-5 h-px transition-all duration-200"
            style={{
              background: 'var(--text-primary)',
              transform: open ? 'translateY(7px) rotate(45deg)' : 'none',
            }}
          />
          <span
            className="block w-5 h-px transition-all duration-200"
            style={{ background: 'var(--text-primary)', opacity: open ? 0 : 1 }}
          />
          <span
            className="block w-5 h-px transition-all duration-200"
            style={{
              background: 'var(--text-primary)',
              transform: open ? 'translateY(-7px) rotate(-45deg)' : 'none',
            }}
          />
        </button>
      </div>

      {/* mobile slide-down menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            className="md:hidden overflow-hidden"
            style={{
              background: 'rgba(250,250,248,0.97)',
              borderTop: '1px solid var(--border)',
            }}
            initial={{ height: 0 }}
            animate={{ height: 'auto' }}
            exit={{ height: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="flex flex-col px-6 py-8 gap-6">
              {links.map(link => (
                <a
                  key={link.href}
                  href={link.href}
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '20px',
                    fontWeight: 300,
                    color: 'var(--text-primary)',
                    textDecoration: 'none',
                  }}
                  onClick={() => setOpen(false)}
                >
                  {link.label}
                </a>
              ))}
              <span
                className="self-start"
                style={{
                  background: 'var(--highlight)',
                  color: 'var(--text-primary)',
                  fontFamily: 'var(--font-body)',
                  fontSize: '12px',
                  padding: '4px 12px',
                  borderRadius: '100px',
                }}
              >
                Available for work →
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}
