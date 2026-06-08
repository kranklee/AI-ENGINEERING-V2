'use client'

import { useRef } from 'react'
import { motion, useInView, type Variants } from 'framer-motion'
import Terminal, { TerminalLine } from '@/components/ui/Terminal'

const bioParas = [
  "I'm a Canadian-Turkish software engineering student at Centennial College in Ottawa, graduating in 2027. Building toward a career in Germany, specifically Cologne, and working to get my German to a point where I stop embarrassing myself.",
  "I came up through operations — CATSA security screening, A&W management — then moved into data work at Rogers. That background makes me care about how systems behave under pressure, not just in a controlled demo.",
  "Right now I'm focused on backend and AI. Building APIs, connecting LLMs to real data, automating things that shouldn't need human attention. Working through FastAPI, RAG systems, and LLM API integrations.",
  "Turkish is my first language. English I'm fluent in. German is a work in progress. Cats over dogs, and yes the IoT solar panel project was actually pretty cool.",
]

const terminalRows = [
  ['name', 'Cem Besli'],
  ['role', 'Software Eng. Student'],
  ['location', 'Ottawa → Cologne'],
  ['languages', 'TR / EN / DE (learning)'],
  ['interests', 'AI, backend, IoT'],
  ['education', "Centennial College '27"],
  ['status', 'open to work in Germany'],
]

const ease = [0.25, 0.1, 0.25, 1] as [number, number, number, number]

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease } },
}

export default function About() {
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section
      id="about"
      ref={ref}
      className="py-[120px] border-t"
      style={{ borderColor: 'rgba(255,255,255,0.05)' }}
    >
      <div className="max-w-[1100px] mx-auto px-6">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="mb-12"
        >
          <span
            className="text-[11px] uppercase tracking-[0.08em]"
            style={{ fontFamily: 'var(--font-mono)', color: 'var(--accent)' }}
          >
            About
          </span>
        </motion.div>

        <div className="grid md:grid-cols-[1fr_340px] gap-12 lg:gap-20 items-start">
          <motion.div
            className="space-y-5 text-[15px] leading-[1.8]"
            style={{ color: 'var(--text-secondary)' }}
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.12 } },
            }}
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
          >
            {bioParas.map((p, i) => (
              <motion.p key={i} variants={fadeUp}>
                {p}
              </motion.p>
            ))}
          </motion.div>

          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
            transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1], delay: 0.24 }}
          >
            <Terminal>
              <TerminalLine prompt="$" content="whoami" />
              <div
                className="my-3 border-t text-[13px]"
                style={{ borderColor: 'var(--border)' }}
              />
              <div className="space-y-2" style={{ fontFamily: 'var(--font-mono)', fontSize: '13px' }}>
                {terminalRows.map(([key, val]) => (
                  <div key={key} className="flex gap-2 items-baseline">
                    <span className="shrink-0 w-[90px]" style={{ color: 'var(--text-muted)' }}>
                      {key}
                    </span>
                    <span style={{ color: 'var(--text-muted)' }}>→</span>
                    <span style={{ color: 'var(--text-primary)' }}>{val}</span>
                  </div>
                ))}
              </div>
            </Terminal>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
