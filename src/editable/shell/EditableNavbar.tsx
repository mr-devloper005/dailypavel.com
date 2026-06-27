'use client'

import { useEffect, useMemo, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { LogIn, LogOut, Menu, PlusCircle, Search, UserPlus, X } from 'lucide-react'
import { SITE_CONFIG } from '@/lib/site-config'
import { globalContent } from '@/editable/content/global.content'
import { useEditableLocalAuthSession } from '@/editable/components/EditableLocalAuthForms'

export function EditableNavbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()
  const { session, logout } = useEditableLocalAuthSession()

  // Home + both content hubs + Search + About + Contact. Task items come from
  // enabled config (profiles are disabled, so nothing profile-related appears),
  // with friendlier menu labels than the raw config names.
  const navItems = useMemo(() => {
    const labelOverrides: Record<string, string> = { '/sbm': 'Collections', '/listing': 'Directory' }
    const tasks = SITE_CONFIG.tasks
      .filter((task) => task.enabled)
      .map((task) => ({ label: labelOverrides[task.route] || task.label, href: task.route }))
    return [{ label: 'Home', href: '/' }, ...tasks, { label: 'Search', href: '/search' }, { label: 'About', href: '/about' }, { label: 'Contact', href: '/contact' }]
  }, [])

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Lock body scroll while the overlay menu is open.
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  const isActive = (href: string) => (href === '/' ? pathname === '/' : pathname === href || pathname.startsWith(`${href}/`))

  return (
    <>
    <header
      className={`sticky top-0 z-50 border-b transition-all duration-300 ${
        scrolled ? 'border-[var(--editable-border)] bg-[var(--editable-nav-bg)]/80 backdrop-blur-xl' : 'border-transparent bg-transparent'
      }`}
    >
      <nav className={`mx-auto flex w-full max-w-[var(--editable-container)] items-center justify-between gap-5 px-4 transition-all duration-300 sm:px-6 lg:px-8 ${scrolled ? 'min-h-[60px]' : 'min-h-[78px]'}`}>
        <Link href="/" className="group flex shrink-0 items-center gap-3">
          <span className="relative flex h-10 w-10 items-center justify-center rounded-xl border border-[var(--slot4-accent)]/40 bg-[var(--slot4-surface-bg)] shadow-[0_0_22px_rgba(21,211,154,0.22)] transition group-hover:border-[var(--slot4-accent)]">
            <img src="/favicon.png?v=20260413" alt={SITE_CONFIG.name} className="h-7 w-7 object-contain" />
          </span>
          <span className="editable-display text-lg font-semibold tracking-[-0.01em] text-[var(--editable-nav-text)]">{SITE_CONFIG.name}</span>
        </Link>

        <div className="flex items-center gap-2">
          {session ? (
            <span className="hidden max-w-[160px] truncate text-sm font-medium text-[var(--slot4-muted-text)] sm:inline">
              Hi, <span className="text-[var(--slot4-accent)]">{session.name}</span>
            </span>
          ) : (
            <Link
              href="/login"
              className="hidden items-center gap-1.5 rounded-full border border-[var(--editable-border)] px-4 py-2 text-[13px] font-medium text-[var(--slot4-muted-text)] transition hover:border-[var(--slot4-accent)]/50 hover:text-[var(--slot4-page-text)] sm:inline-flex"
            >
              <LogIn className="h-4 w-4" /> Sign in
            </Link>
          )}
          <button
            type="button"
            onClick={() => setOpen(true)}
            className="inline-flex items-center gap-2 rounded-full border border-[var(--editable-border)] bg-[var(--slot4-surface-bg)]/70 px-4 py-2 text-[13px] font-medium text-[var(--editable-nav-text)] backdrop-blur transition hover:border-[var(--slot4-accent)]/50"
            aria-label="Open menu"
          >
            <Menu className="h-4 w-4" /> <span className="hidden sm:inline">Menu</span>
          </button>
        </div>
      </nav>
      </header>

      {/* Cyrclo-style centered overlay menu — rendered as a sibling of <header>
          so the header's backdrop-filter (when scrolled) doesn't become the
          containing block for this position:fixed overlay. */}
      <div className={`fixed inset-0 z-[60] transition ${open ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0'}`} aria-hidden={!open}>
        <button type="button" aria-label="Close menu" onClick={() => setOpen(false)} className="absolute inset-0 bg-black/80 backdrop-blur-md" />
        <div
          className={`absolute left-1/2 top-1/2 w-[min(92vw,440px)] -translate-x-1/2 -translate-y-1/2 rounded-[2rem] border border-[var(--editable-border)] bg-[var(--slot4-surface-bg)]/95 p-7 shadow-[0_40px_120px_rgba(0,0,0,0.7)] transition-all duration-300 sm:p-9 ${
            open ? 'scale-100 opacity-100' : 'scale-95 opacity-0'
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-medium uppercase tracking-[0.3em] text-[var(--slot4-muted-text)]">{globalContent.nav?.tagline || SITE_CONFIG.tagline}</span>
            <button type="button" onClick={() => setOpen(false)} className="flex h-9 w-9 items-center justify-center rounded-full border border-[var(--editable-border)] text-[var(--slot4-muted-text)] transition hover:border-[var(--slot4-accent)]/50 hover:text-[var(--slot4-page-text)]" aria-label="Close menu">
              <X className="h-4 w-4" />
            </button>
          </div>

          <div className="mt-6 grid gap-1 text-center">
            {navItems.map((item) => {
              const active = isActive(item.href)
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className={`editable-display rounded-xl py-2.5 text-2xl font-semibold tracking-[-0.02em] transition sm:text-3xl ${
                    active ? 'text-[var(--slot4-accent)]' : 'text-[var(--slot4-page-text)] hover:text-[var(--slot4-accent)]'
                  }`}
                >
                  {item.label}
                </Link>
              )
            })}
          </div>

          <div className="mt-7 grid gap-2.5 border-t border-[var(--editable-border)] pt-6">
            <form action="/search" onSubmit={() => setOpen(false)} className="flex items-center gap-2 rounded-full border border-[var(--editable-border)] bg-[var(--slot4-panel-bg)] px-4 py-2.5">
              <Search className="h-4 w-4 text-[var(--slot4-accent)]" />
              <input name="q" placeholder="Search bookmarks, listings…" className="min-w-0 flex-1 bg-transparent text-sm outline-none placeholder:text-[var(--slot4-muted-text)]" />
            </form>
            {session ? (
              <div className="grid grid-cols-2 gap-2.5">
                <Link href="/create" onClick={() => setOpen(false)} className="inline-flex items-center justify-center gap-1.5 rounded-full bg-[var(--editable-cta-bg)] px-4 py-2.5 text-sm font-semibold text-[var(--editable-cta-text)] transition hover:brightness-110"><PlusCircle className="h-4 w-4" /> Create</Link>
                <button type="button" onClick={() => { logout(); setOpen(false) }} className="inline-flex items-center justify-center gap-1.5 rounded-full border border-[var(--editable-border)] px-4 py-2.5 text-sm font-medium text-[var(--slot4-muted-text)] transition hover:text-[var(--slot4-page-text)]"><LogOut className="h-4 w-4" /> Logout</button>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-2.5">
                <Link href="/login" onClick={() => setOpen(false)} className="inline-flex items-center justify-center gap-1.5 rounded-full border border-[var(--editable-border)] px-4 py-2.5 text-sm font-medium transition hover:border-[var(--slot4-accent)] hover:text-[var(--slot4-accent)]"><LogIn className="h-4 w-4" /> Sign in</Link>
                <Link href="/signup" onClick={() => setOpen(false)} className="inline-flex items-center justify-center gap-1.5 rounded-full bg-[var(--editable-cta-bg)] px-4 py-2.5 text-sm font-semibold text-[var(--editable-cta-text)] transition hover:brightness-110"><UserPlus className="h-4 w-4" /> Sign up</Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  )
}
