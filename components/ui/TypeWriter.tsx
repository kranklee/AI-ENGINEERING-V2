'use client'

import { useState, useEffect } from 'react'

interface TypeWriterProps {
  strings: string[]
  speed?: number
  holdDuration?: number
}

export default function TypeWriter({
  strings,
  speed = 60,
  holdDuration = 2500,
}: TypeWriterProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [currentText, setCurrentText] = useState('')
  const [isDeleting, setIsDeleting] = useState(false)
  const [isPaused, setIsPaused] = useState(false)
  const [cursorOn, setCursorOn] = useState(true)

  useEffect(() => {
    const blink = setInterval(() => setCursorOn(v => !v), 600)
    return () => clearInterval(blink)
  }, [])

  useEffect(() => {
    const target = strings[currentIndex]

    if (isPaused) {
      const t = setTimeout(() => {
        setIsPaused(false)
        setIsDeleting(true)
      }, holdDuration)
      return () => clearTimeout(t)
    }

    if (isDeleting) {
      if (currentText.length === 0) {
        setIsDeleting(false)
        setCurrentIndex(i => (i + 1) % strings.length)
        return
      }
      const t = setTimeout(() => setCurrentText(s => s.slice(0, -1)), speed / 2)
      return () => clearTimeout(t)
    }

    if (currentText.length === target.length) {
      setIsPaused(true)
      return
    }

    const t = setTimeout(
      () => setCurrentText(target.slice(0, currentText.length + 1)),
      speed
    )
    return () => clearTimeout(t)
  }, [currentText, isDeleting, isPaused, currentIndex, strings, speed, holdDuration])

  return (
    <span>
      {currentText}
      <span style={{ color: 'var(--accent)', opacity: cursorOn ? 1 : 0, transition: 'opacity 0.1s' }}>
        |
      </span>
    </span>
  )
}
