'use client'

import FluidCursor from '@/components/FluidCursor'
import NavBar from '@/components/NavBar'
import Hero from '@/components/sections/Hero'
import About from '@/components/sections/About'
import Skills from '@/components/sections/Skills'
import Projects from '@/components/sections/Projects'
import AIChat from '@/components/sections/AIChat'
import Contact from '@/components/sections/Contact'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <>
      <FluidCursor />
      <NavBar />
      <main style={{ position: 'relative', zIndex: 10 }}>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <AIChat />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
