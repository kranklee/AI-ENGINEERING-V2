'use client';

import FluidCursor from '@/components/FluidCursor';
import NavBar from '@/components/NavBar';
import Hero from '@/components/sections/Hero';
import About from '@/components/sections/About';
import Projects from '@/components/sections/Projects';
import Stack from '@/components/sections/Stack';
import GitHub from '@/components/sections/GitHub';
import Contact from '@/components/sections/Contact';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <>
      <FluidCursor />
      <NavBar />
      <main style={{ position: 'relative', zIndex: 10 }}>
        <Hero />
        <About />
        <Projects />
        <Stack />
        <GitHub />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
