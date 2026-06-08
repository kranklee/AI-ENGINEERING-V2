'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const navLinks = [
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Contact', href: '#contact' },
]

export default function NavBar() {
  const [scrolled, setScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState('')
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // I'll clean this up later — could use a single observer with rootMargin tricks
  useEffect(() => {
    const ids = ['about', 'skills', 'projects', 'contact']
    const observers: IntersectionObserver[] = []

    ids.forEach(id => {
      const el = document.getElementById(id)
      if (!el) return
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActiveSection(id) },
        { threshold: 0.25 }
      )
      obs.observe(el)
      observers.push(obs)
    })

    return () => observers.forEach(o => o.disconnect())
  }, [])

  return (
    <>
      <nav
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
        style={{
          backdropFilter: scrolled ? 'blur(12px)' : 'none',
          WebkitBackdropFilter: scrolled ? 'blur(12px)' : 'none',
          borderBottom: scrolled ? '1px solid var(--border)' : '1px solid transparent',
          background: scrolled ? 'rgba(8,8,8,0.85)' : 'transparent',
        }}
      >
        <div className="max-w-[1100px] mx-auto px-6 flex items-center justify-between h-16">
          <a
            href="#hero"
            className="text-[20px] font-normal"
            style={{ fontFamily: 'var(--font-display)', color: 'var(--accent)' }}
          >
            CB
          </a>

          <div className="hidden md:flex items-center gap-8">
            {navLinks.map(link => {
              const id = link.href.replace('#', '')
              const active = activeSection === id
              return (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-sm transition-colors duration-200"
                  style={{
                    color: active ? 'var(--accent)' : 'var(--text-secondary)',
                    textDecoration: active ? 'underline' : 'none',
                    textUnderlineOffset: '4px',
                  }}
                >
                  {link.label}
                </a>
              )
            })}
          </div>

          <button
            className="md:hidden flex flex-col justify-center items-center gap-1.5 w-8 h-8"
            onClick={() => setMenuOpen(o => !o)}
            aria-label="Toggle navigation"
          >
            <span
              className="block w-5 h-px transition-transform duration-200 origin-center"
              style={{
                background: 'var(--text-secondary)',
                transform: menuOpen ? 'rotate(45deg) translateY(4px)' : 'none',
              }}
            />
            <span
              className="block w-5 h-px transition-opacity duration-200"
              style={{
                background: 'var(--text-secondary)',
                opacity: menuOpen ? 0 : 1,
              }}
            />
            <span
              className="block w-5 h-px transition-transform duration-200 origin-center"
              style={{
                background: 'var(--text-secondary)',
                transform: menuOpen ? 'rotate(-45deg) translateY(-4px)' : 'none',
              }}
            />
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="fixed inset-0 z-40 flex flex-col items-center justify-center md:hidden"
            style={{ background: 'var(--bg-primary)' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <nav className="flex flex-col items-center gap-10">
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  className="text-3xl font-light"
                  style={{ fontFamily: 'var(--font-display)', color: 'var(--text-primary)' }}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.06, duration: 0.3 }}
                  onClick={() => setMenuOpen(false)}
                >
                  {link.label}
                </motion.a>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
