'use client'

import Link from 'next/link'
import { ArrowUpRight, Mail, Send } from 'lucide-react'
import { SITE_CONFIG } from '@/lib/site-config'
import { globalContent } from '@/editable/content/global.content'
import { useEditableLocalAuthSession } from '@/editable/components/EditableLocalAuthForms'

export function EditableFooter() {
  const taskLinks = SITE_CONFIG.tasks.filter((task) => task.enabled)
  const year = new Date().getFullYear()
  const { session, logout } = useEditableLocalAuthSession()

  return (
    <footer className="relative border-t border-[var(--editable-border)] bg-[var(--editable-footer-bg)] text-[var(--editable-footer-text)]">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-[linear-gradient(90deg,transparent,var(--slot4-accent),transparent)] opacity-60" />

      <div className="mx-auto max-w-[var(--editable-container)] px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-[1.3fr_0.9fr_0.9fr_1fr]">
          <div>
            <Link href="/" className="inline-flex items-center gap-3">
              <span className="flex h-11 w-11 items-center justify-center rounded-xl border border-[var(--slot4-accent)]/40 bg-[var(--slot4-surface-bg)] shadow-[0_0_22px_rgba(21,211,154,0.22)]">
                <img src="/favicon.png?v=20260413" alt={SITE_CONFIG.name} className="h-7 w-7 object-contain" />
              </span>
              <span className="editable-display text-xl font-semibold tracking-[-0.01em]">{SITE_CONFIG.name}</span>
            </Link>
            <p className="mt-5 max-w-sm text-sm leading-7 text-[var(--slot4-muted-text)]">{globalContent.footer?.description || SITE_CONFIG.description}</p>
          </div>

          <div>
            <h3 className="text-[10px] font-semibold uppercase tracking-[0.26em] text-[var(--slot4-accent)]">Explore</h3>
            <div className="mt-5 grid gap-2.5">
              {taskLinks.map((task) => (
                <Link key={task.key} href={task.route} className="group inline-flex items-center gap-1.5 text-sm font-medium text-[var(--slot4-muted-text)] transition hover:text-[var(--slot4-page-text)]">
                  {task.label}
                  <ArrowUpRight className="h-3.5 w-3.5 -translate-x-0.5 opacity-0 transition group-hover:translate-x-0 group-hover:opacity-100" />
                </Link>
              ))}
              <Link href="/search" className="group inline-flex items-center gap-1.5 text-sm font-medium text-[var(--slot4-muted-text)] transition hover:text-[var(--slot4-page-text)]">
                Search
                <ArrowUpRight className="h-3.5 w-3.5 -translate-x-0.5 opacity-0 transition group-hover:translate-x-0 group-hover:opacity-100" />
              </Link>
            </div>
          </div>

          <div>
            <h3 className="text-[10px] font-semibold uppercase tracking-[0.26em] text-[var(--slot4-accent)]">Site</h3>
            <div className="mt-5 grid gap-2.5">
              {[
                ['About', '/about'],
                ['Contact', '/contact'],
                ...(session ? [['Create', '/create']] : [['Sign in', '/login'], ['Sign up', '/signup']]),
              ].map(([label, href]) => (
                <Link key={href} href={href} className="text-sm font-medium text-[var(--slot4-muted-text)] transition hover:text-[var(--slot4-page-text)]">{label}</Link>
              ))}
              {session ? <button type="button" onClick={logout} className="text-left text-sm font-medium text-[var(--slot4-muted-text)] transition hover:text-[var(--slot4-page-text)]">Logout</button> : null}
            </div>
          </div>

          <div>
            <h3 className="text-[10px] font-semibold uppercase tracking-[0.26em] text-[var(--slot4-accent)]">Stay in the loop</h3>
            <p className="mt-5 text-sm leading-6 text-[var(--slot4-muted-text)]">New collections and listings, curated and sent occasionally.</p>
            <form action="/contact" className="mt-4 flex items-center gap-2 rounded-full border border-[var(--editable-border)] bg-[var(--slot4-surface-bg)] p-1.5 pl-4">
              <Mail className="h-4 w-4 shrink-0 text-[var(--slot4-accent)]" />
              <input name="email" type="email" placeholder="you@example.com" className="min-w-0 flex-1 bg-transparent text-sm outline-none placeholder:text-[var(--slot4-muted-text)]" />
              <button className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[var(--editable-cta-bg)] text-[var(--editable-cta-text)] transition hover:brightness-110" aria-label="Subscribe">
                <Send className="h-4 w-4" />
              </button>
            </form>
          </div>
        </div>
      </div>

      <div className="border-t border-[var(--editable-border)]">
        <div className="mx-auto flex max-w-[var(--editable-container)] flex-col items-center justify-between gap-2 px-4 py-5 text-xs font-medium text-[var(--slot4-muted-text)] sm:flex-row sm:px-6 lg:px-8">
          <span>© {year} {SITE_CONFIG.name}. All rights reserved.</span>
          <span>{globalContent.footer?.bottomNote || 'Curated bookmarks & a living business directory.'}</span>
        </div>
      </div>
    </footer>
  )
}
