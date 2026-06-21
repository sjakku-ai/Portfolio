'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ThemeToggle } from './theme-toggle'

const navItems = {
  '/': { name: 'home' },
  '/blog': { name: 'blog' },
  '/roadmap.html': { name: 'AI Engineer Roadmap' },
}

export function Navbar() {
  const pathname = usePathname()

  return (
    <header style={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '48px',
      paddingBottom: '16px',
      borderBottom: '1px solid var(--border)',
    }}>
      <nav style={{ display: 'flex', gap: '2px' }}>
        {Object.entries(navItems).map(([path, { name }]) => {
          const isActive = path === '/'
            ? pathname === '/'
            : pathname.startsWith(path)
          return (
            <Link
              key={path}
              href={path}
              style={{
                fontFamily: 'var(--font-geist-mono)',
                fontSize: '12px',
                letterSpacing: '0.04em',
                padding: '6px 12px',
                borderRadius: '6px',
                color: isActive ? 'var(--text)' : 'var(--muted)',
                background: isActive ? 'var(--surface2)' : 'transparent',
                border: isActive ? '1px solid var(--border2)' : '1px solid transparent',
                textDecoration: 'none',
                transition: 'color 0.15s, background 0.15s',
              }}
            >
              {name}
            </Link>
          )
        })}
      </nav>
      <ThemeToggle />
    </header>
  )
}
