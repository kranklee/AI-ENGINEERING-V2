interface SkillBadgeProps {
  label: string
}

export default function SkillBadge({ label }: SkillBadgeProps) {
  return (
    <span
      style={{
        fontFamily: 'var(--font-mono)',
        fontSize: '11px',
        textTransform: 'uppercase',
        letterSpacing: '0.08em',
        border: '1px solid var(--border)',
        padding: '4px 10px',
        borderRadius: '3px',
        color: 'var(--text-muted)',
      }}
    >
      {label}
    </span>
  )
}
