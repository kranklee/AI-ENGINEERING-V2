import NavBar from '@/components/NavBar'
import Hero from '@/components/sections/Hero'
import About from '@/components/sections/About'
import Projects from '@/components/sections/Projects'
import Stack from '@/components/sections/Stack'
import GitHub from '@/components/sections/GitHub'
import Contact from '@/components/sections/Contact'
import Footer from '@/components/Footer'
import ChatWidget from '@/components/ChatWidget'

export default function Home() {
  return (
    <>
      <NavBar />
      <main>
        <Hero />
        <About />
        <Projects />
        <Stack />
        <GitHub />
        <Contact />
      </main>
      <Footer />
      <ChatWidget />
    </>
  )
}
