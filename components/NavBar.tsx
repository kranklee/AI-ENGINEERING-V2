'use client'

import { useState, useEffect } from 'react'
import { useTheme } from 'next-themes'
import { Moon, Sun, Menu, X } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

const navLinks = [
  { label: 'About', href: '#about' },
  { label: 'Stack', href: '#stack' },
  { label: 'Projects', href: '#projects' },
  { label: 'GitHub', href: '#github' },
  { label: 'Contact', href: '#contact' },
]

export default function NavBar() {
  const [scrolled, setScrolled] = useState(false)
  const [active, setActive] = useState('')
  const [open, setOpen] = useState(false)
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => { setMounted(true) }, [])

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const ids = ['about', 'stack', 'projects', 'github', 'contact']
    const observers: IntersectionObserver[] = []
    ids.forEach(id => {
      const el = document.getElementById(id)
      if (!el) return
      const obs = new IntersectionObserver(
        ([e]) => { if (e.isIntersecting) setActive(id) },
        { rootMargin: '-40% 0px -55% 0px' }
      )
      obs.observe(el)
      observers.push(obs)
    })
    return () => observers.forEach(o => o.disconnect())
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  const bgStyle = scrolled
    ? { background: theme === 'dark' ? 'rgba(0,0,0,0.85)' : 'rgba(255,255,255,0.85)', backdropFilter: 'blur(20px) saturate(180%)', borderBottom: '1px solid var(--pf-border)' }
    : { background: 'transparent' }

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 transition-all duration-300" style={bgStyle}>
        <div className="max-w-[1200px] mx-auto px-6 md:px-12 h-16 flex items-center justify-between">
          <a
            href="#"
            style={{ fontFamily: 'var(--font-sans)', fontWeight: 600, fontSize: '20px', color: 'var(--pf-accent)', textDecoration: 'none', letterSpacing: '-0.01em' }}
          >
            CB
          </a>

          <div className="hidden md:flex items-center gap-7">
            {navLinks.map(({ label, href }) => {
              const id = href.replace('#', '')
              const isActive = active === id
              return (
                <a
                  key={href}
                  href={href}
                  style={{
                    fontFamily: 'var(--font-sans)',
                    fontSize: '15px',
                    fontWeight: isActive ? 500 : 400,
                    color: isActive ? 'var(--pf-text)' : 'var(--pf-muted)',
                    textDecoration: 'none',
                    transition: 'color 0.2s ease',
                  }}
                >
                  {label}
                </a>
              )
            })}

            {mounted && (
              <button
                onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                style={{ background: 'none', border: '1px solid var(--pf-border)', borderRadius: '8px', padding: '6px', cursor: 'pointer', color: 'var(--pf-muted)', display: 'flex' }}
              >
                {theme === 'dark' ? <Sun size={15} /> : <Moon size={15} />}
              </button>
            )}
          </div>

          <div className="flex md:hidden items-center gap-3">
            {mounted && (
              <button onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--pf-muted)', display: 'flex', padding: '4px' }}>
                {theme === 'dark' ? <Sun size={17} /> : <Moon size={17} />}
              </button>
            )}
            <button onClick={() => setOpen(!open)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--pf-text)', display: 'flex', padding: '4px' }}>
              {open ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18 }}
            className="fixed inset-0 z-40 flex flex-col justify-center items-center"
            style={{ background: 'var(--pf-bg)' }}
            onClick={() => setOpen(false)}
          >
            {navLinks.map(({ label, href }, i) => (
              <motion.a
                key={href}
                href={href}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                onClick={() => setOpen(false)}
                style={{ fontFamily: 'var(--font-sans)', fontSize: '36px', fontWeight: 600, color: 'var(--pf-text)', textDecoration: 'none', padding: '10px 0', letterSpacing: '-0.02em' }}
              >
                {label}
              </motion.a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
