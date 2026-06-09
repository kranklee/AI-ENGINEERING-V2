'use client'

import FluidCursor from '@/components/FluidCursor'
import NavBar from '@/components/NavBar'
import Hero from '@/components/sections/Hero'
import Terminal from '@/components/sections/Terminal'
import Journey from '@/components/sections/Journey'
import Dashboard from '@/components/sections/Dashboard'
import Projects from '@/components/sections/Projects'
import GitHub from '@/components/sections/GitHub'
import Contact from '@/components/sections/Contact'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <>
      <FluidCursor />
      <NavBar />
      <main style={{ position: 'relative', zIndex: 10 }}>
        <Hero />
        <Terminal />
        <Journey />
        <Dashboard />
        <Projects />
        <GitHub />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
