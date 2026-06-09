'use client'

import { useEffect, useRef, useState } from 'react'
import { useInView } from 'framer-motion'
import { terminalCommands } from '@/lib/data'

type Line =
  | { type: 'cmd'; text: string; partial: boolean }
  | { type: 'output'; lines: string[] }

export default function Terminal() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const [lines, setLines] = useState<Line[]>([])
  const [started, setStarted] = useState(false)
  const [done, setDone] = useState(false)
  const bottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (inView && !started) setStarted(true)
  }, [inView, started])

  useEffect(() => {
    if (!started) return

    let cancelled = false
    const CHAR_DELAY = 40
    const AFTER_CMD_DELAY = 200
    const BETWEEN_CMD_DELAY = 2000

    async function sleep(ms: number) {
      return new Promise<void>(resolve => setTimeout(resolve, ms))
    }

    async function run() {
      for (let ci = 0; ci < terminalCommands.length; ci++) {
        if (cancelled) return
        const { cmd, output } = terminalCommands[ci]

        // Add a partial-cmd line
        setLines(prev => [...prev, { type: 'cmd', text: '', partial: true }])

        // Type the command character by character
        for (let i = 0; i <= cmd.length; i++) {
          if (cancelled) return
          setLines(prev => {
            const next = [...prev]
            const last = next[next.length - 1]
            if (last.type === 'cmd') next[next.length - 1] = { type: 'cmd', text: cmd.slice(0, i), partial: true }
            return next
          })
          await sleep(CHAR_DELAY)
        }

        await sleep(AFTER_CMD_DELAY)
        if (cancelled) return

        // Finalize cmd line, add output
        setLines(prev => {
          const next = [...prev]
          const last = next[next.length - 1]
          if (last.type === 'cmd') next[next.length - 1] = { type: 'cmd', text: cmd, partial: false }
          return [...next, { type: 'output', lines: output }]
        })

        if (ci < terminalCommands.length - 1) await sleep(BETWEEN_CMD_DELAY)
      }
      if (!cancelled) setDone(true)
    }

    run()
    return () => { cancelled = true }
  }, [started])

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [lines])

  return (
    <section id="about" ref={ref} style={{ position: 'relative', zIndex: 10, padding: '100px 0' }}>
      <div className="max-w-[900px] mx-auto px-6 md:px-12">
        <div
          style={{
            background: '#0d0d0d',
            borderRadius: '12px',
            overflow: 'hidden',
            border: '1px solid rgba(255,255,255,0.08)',
            boxShadow: '0 32px 64px rgba(0,0,0,0.4)',
          }}
        >
          {/* macOS-style header */}
          <div style={{ padding: '14px 16px', borderBottom: '1px solid rgba(255,255,255,0.06)', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#ff5f57', display: 'inline-block' }} />
            <span style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#ffbd2e', display: 'inline-block' }} />
            <span style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#28c840', display: 'inline-block' }} />
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', color: 'rgba(255,255,255,0.3)', marginLeft: '8px' }}>
              cem@macbook ~ bash
            </span>
          </div>

          {/* Terminal body */}
          <div style={{ padding: '28px 32px', minHeight: '320px', maxHeight: '520px', overflowY: 'auto', fontFamily: 'var(--font-mono)', fontSize: '14px', lineHeight: 1.7 }}>
            {lines.map((line, i) => {
              if (line.type === 'cmd') {
                return (
                  <div key={i} style={{ color: '#e5e5e5', marginBottom: '2px' }}>
                    <span style={{ color: '#30d158' }}>$ </span>
                    {line.text}
                    {line.partial && <span className="cursor-blink" style={{ display: 'inline-block', width: '2px', height: '1em', background: '#e5e5e5', verticalAlign: 'middle', marginLeft: '1px' }} />}
                  </div>
                )
              }
              return (
                <div key={i} style={{ marginBottom: '16px' }}>
                  {line.lines.map((l, j) => (
                    <div key={j} style={{ color: 'rgba(255,255,255,0.55)', paddingLeft: '16px' }}>
                      {l}
                    </div>
                  ))}
                </div>
              )
            })}
            {done && (
              <div style={{ color: '#e5e5e5' }}>
                <span style={{ color: '#30d158' }}>$ </span>
                <span className="cursor-blink" style={{ display: 'inline-block', width: '8px', height: '14px', background: '#e5e5e5', verticalAlign: 'middle' }} />
              </div>
            )}
            <div ref={bottomRef} />
          </div>
        </div>
      </div>
    </section>
  )
}
