'use client'

import { useState, useEffect } from 'react'

export default function CursorGlow() {
  const [pos, setPos] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const onMove = (e: MouseEvent) => setPos({ x: e.clientX, y: e.clientY })
    window.addEventListener('mousemove', onMove)
    return () => window.removeEventListener('mousemove', onMove)
  }, [])

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        pointerEvents: 'none',
        zIndex: 1,
        background: `radial-gradient(600px circle at ${pos.x}px ${pos.y}px, rgba(240,224,64,0.07), transparent 70%)`,
        transition: 'background 0.1s ease',
      }}
    />
  )
}
