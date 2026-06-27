'use client'

import { useEffect, type ReactNode } from 'react'
import { usePathname } from 'next/navigation'

/*
  Wraps the page content so the premium "post open" entry animation
  (`.editable-enter`, defined in editable-global.css) replays on every
  navigation. Keying on the pathname remounts the region per route, which
  restarts the CSS animation. Server-rendered children pass straight through.

  It also drives the fail-safe scroll-reveal system: only once this client
  component mounts do we mark <html data-reveal-ready>, which arms the
  hidden→shown transition for [data-reveal] elements. If JS never runs, the
  attribute is never set and content stays fully visible.
*/
export function EditablePageMotion({ children }: { children: ReactNode }) {
  const pathname = usePathname()

  useEffect(() => {
    const root = document.documentElement
    root.setAttribute('data-reveal-ready', '')

    const reduce = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
    const nodes = Array.from(document.querySelectorAll<HTMLElement>('[data-reveal]'))

    if (reduce || typeof IntersectionObserver === 'undefined') {
      nodes.forEach((node) => node.classList.add('is-revealed'))
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-revealed')
            observer.unobserve(entry.target)
          }
        })
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.08 }
    )

    nodes.forEach((node) => {
      const rect = node.getBoundingClientRect()
      // Anything already in view (or above it) reveals immediately so the first
      // screen never waits on a scroll event.
      if (rect.top < window.innerHeight * 0.94) node.classList.add('is-revealed')
      else observer.observe(node)
    })

    return () => observer.disconnect()
  }, [pathname])

  return (
    <div key={pathname} className="editable-enter min-h-0 flex-1">
      {children}
    </div>
  )
}
