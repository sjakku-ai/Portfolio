'use client'
import { useEffect, useRef, useId } from 'react'

export function MermaidDiagram({ chart }: { chart: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const uid = useId().replace(/[^a-zA-Z0-9]/g, '')

  useEffect(() => {
    if (!ref.current) return
    const dark = document.documentElement.classList.contains('dark')

    import('mermaid').then(({ default: mermaid }) => {
      mermaid.initialize({
        startOnLoad: false,
        theme: dark ? 'dark' : 'neutral',
        fontFamily: 'inherit',
        fontSize: 13,
      })
      mermaid
        .render(`m${uid}`, chart)
        .then(({ svg }) => {
          if (ref.current) {
            ref.current.innerHTML = svg
            const svgEl = ref.current.querySelector('svg')
            if (svgEl) { svgEl.style.width = '100%'; svgEl.style.height = 'auto' }
          }
        })
        .catch(() => {
          if (ref.current) ref.current.textContent = chart
        })
    })
  }, [chart, uid])

  return (
    <div
      ref={ref}
      style={{
        background: 'var(--surface)',
        border: '1px solid var(--border)',
        borderRadius: '10px',
        padding: '20px 24px',
        margin: '20px 0',
        overflowX: 'auto',
        textAlign: 'center',
        minHeight: '60px',
      }}
    />
  )
}
