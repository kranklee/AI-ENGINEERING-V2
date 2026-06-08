interface SectionLabelProps {
  number: string
  label: string
}

export default function SectionLabel({ number, label }: SectionLabelProps) {
  return (
    <p
      style={{
        fontFamily: 'var(--font-mono)',
        fontSize: '11px',
        textTransform: 'uppercase',
        letterSpacing: '0.12em',
        color: 'var(--text-muted)',
        marginBottom: '80px',
      }}
    >
      {number} — {label}
    </p>
  )
}
