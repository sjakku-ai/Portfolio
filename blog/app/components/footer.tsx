const links = [
  { href: 'https://github.com/sjakku-ai', label: 'github', external: true },
  { href: 'https://www.linkedin.com/in/sireesha-jakku-a663751b/', label: 'linkedin', external: true },
]

export default function Footer() {
  return (
    <footer style={{
      borderTop: '1px solid var(--border)',
      marginTop: '48px',
      paddingTop: '24px',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      flexWrap: 'wrap',
      gap: '12px',
    }}>
      <div style={{ display: 'flex', gap: '16px' }}>
        {links.map(({ href, label, external }) => (
          <a
            key={label}
            href={href}
            {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
            className="footer-link"
            style={{
              fontFamily: 'var(--font-geist-mono)',
              fontSize: '11px',
              letterSpacing: '0.06em',
              textDecoration: 'none',
            }}
          >
            {label} →
          </a>
        ))}
      </div>
      <p style={{
        fontFamily: 'var(--font-geist-mono)',
        fontSize: '11px',
        color: 'var(--dim)',
      }}>
        © {new Date().getFullYear()} Sireesha Jakku
      </p>
    </footer>
  )
}
