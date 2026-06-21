'use client'
import { useEffect, useState } from 'react'

export function ThemeToggle() {
  const [dark, setDark] = useState(false)

  useEffect(() => {
    const saved = localStorage.getItem('theme')
    if (saved === 'dark') {
      document.documentElement.classList.add('dark')
      setDark(true)
    }
  }, [])

  function toggle() {
    const next = !dark
    if (next) {
      document.documentElement.classList.add('dark')
      localStorage.setItem('theme', 'dark')
    } else {
      document.documentElement.classList.remove('dark')
      localStorage.setItem('theme', 'light')
    }
    setDark(next)
  }

  return (
    <button
      onClick={toggle}
      style={{
        background: 'var(--surface)',
        border: '1px solid var(--border2)',
        color: 'var(--muted)',
        padding: '5px 12px',
        borderRadius: '6px',
        fontFamily: 'var(--font-geist-mono)',
        fontSize: '11px',
        cursor: 'pointer',
        letterSpacing: '0.06em',
        transition: 'color 0.15s, border-color 0.15s',
      }}
      onMouseEnter={e => (e.currentTarget.style.color = 'var(--text)')}
      onMouseLeave={e => (e.currentTarget.style.color = 'var(--muted)')}
    >
      {dark ? '☀ LIGHT' : '☀ DARK'}
    </button>
  )
}
