'use client'

import { useRef, useState } from 'react'

interface CardGlowProps {
  children: React.ReactNode
  className?: string
  style?: React.CSSProperties
}

export default function CardGlow({ children, className, style }: CardGlowProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [glow, setGlow] = useState({ x: 0, y: 0, visible: false })

  const onMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = ref.current?.getBoundingClientRect()
    if (!rect) return
    setGlow({ x: e.clientX - rect.left, y: e.clientY - rect.top, visible: true })
  }

  const onMouseLeave = () => setGlow(g => ({ ...g, visible: false }))

  return (
    <div
      ref={ref}
      className={className}
      style={{ position: 'relative', overflow: 'hidden', ...style }}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
    >
      <div
        style={{
          position: 'absolute',
          inset: 0,
          pointerEvents: 'none',
          zIndex: 0,
          opacity: glow.visible ? 1 : 0,
          transition: 'opacity 0.3s ease',
          background: `radial-gradient(300px circle at ${glow.x}px ${glow.y}px, rgba(240,224,64,0.12), transparent 70%)`,
        }}
      />
      <div style={{ position: 'relative', zIndex: 1 }}>{children}</div>
    </div>
  )
}
