import NavBar from '@/components/layout/NavBar'
import Footer from '@/components/layout/Footer'
import Hero from '@/components/sections/Hero'
import About from '@/components/sections/About'
import Skills from '@/components/sections/Skills'
import Projects from '@/components/sections/Projects'
import AIChat from '@/components/sections/AIChat'
import Contact from '@/components/sections/Contact'

export default function Home() {
  return (
    <>
      <NavBar />
      <main>
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
