import { ReactNode } from 'react'

interface TerminalLineProps {
  prompt: string
  content: string
}

export function TerminalLine({ prompt, content }: TerminalLineProps) {
  return (
    <div className="flex gap-3 text-sm leading-relaxed" style={{ fontFamily: 'var(--font-mono)' }}>
      <span style={{ color: 'var(--accent)' }}>{prompt}</span>
      <span style={{ color: 'var(--text-primary)' }}>{content}</span>
    </div>
  )
}

interface TerminalProps {
  children: ReactNode
}

export default function Terminal({ children }: TerminalProps) {
  return (
    <div
      className="rounded-lg overflow-hidden border"
      style={{ borderColor: 'var(--border)', background: 'var(--bg-secondary)' }}
    >
      <div
        className="flex items-center gap-2 px-4 py-3 border-b"
        style={{ borderColor: 'var(--border)', background: 'var(--bg-tertiary)' }}
      >
        <div className="flex gap-1.5">
          <span className="w-3 h-3 rounded-full block" style={{ background: '#ff5f57' }} />
          <span className="w-3 h-3 rounded-full block" style={{ background: '#ffbd2e' }} />
          <span className="w-3 h-3 rounded-full block" style={{ background: '#28c840' }} />
        </div>
        <span
          className="mx-auto text-xs"
          style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}
        >
          bash
        </span>
        <span className="w-16" />
      </div>
      <div className="p-6 space-y-2">{children}</div>
    </div>
  )
}
