import Link from 'next/link'
import { ArrowRight, Bookmark, Building2, Compass } from 'lucide-react'
import { SITE_CONFIG } from '@/lib/site-config'
import { pagesContent } from '@/editable/content/pages.content'
import { EditableSiteShell } from '@/editable/shell/EditableSiteShell'

const valueIcon = [Bookmark, Building2, Compass]

export default function AboutPage() {
  return (
    <EditableSiteShell>
      <main className="px-4 py-14 sm:px-6 lg:px-8">
        <section className="mx-auto max-w-[var(--editable-container)]">
          <div className="relative overflow-hidden rounded-3xl border border-[var(--editable-border)] bg-[var(--slot4-surface-bg)] p-8 shadow-[0_28px_80px_rgba(0,0,0,0.5)] sm:p-12 lg:p-16" data-reveal>
            <div className="pointer-events-none absolute -top-24 right-0 h-72 w-72 rounded-full bg-[radial-gradient(circle,rgba(21,211,154,0.18),transparent_70%)]" />
            <div className="relative max-w-3xl">
              <p className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.24em] text-[var(--slot4-accent)]"><span className="h-1 w-1 rounded-full bg-[var(--slot4-accent)]" /> {pagesContent.about.badge}</p>
              <h1 className="editable-display mt-5 text-4xl font-semibold leading-[1.05] tracking-[-0.03em] sm:text-6xl">About {SITE_CONFIG.name}</h1>
              <p className="mt-6 text-lg leading-8 text-[var(--slot4-muted-text)]">{pagesContent.about.description}</p>
              <div className="mt-8 space-y-4 text-base leading-8 text-[var(--slot4-muted-text)]">
                {pagesContent.about.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
              </div>
              <div className="mt-9 flex flex-wrap gap-3">
                <Link href="/sbm" className="inline-flex items-center gap-2 rounded-full bg-[var(--slot4-accent-fill)] px-6 py-3 text-sm font-semibold text-[var(--slot4-on-accent)] shadow-[0_12px_34px_rgba(21,211,154,0.28)] transition hover:brightness-110"><Bookmark className="h-4 w-4" /> Browse collections</Link>
                <Link href="/listing" className="inline-flex items-center gap-2 rounded-full border border-[var(--editable-border)] bg-[var(--slot4-surface-bg)] px-6 py-3 text-sm font-semibold transition hover:border-[var(--slot4-accent)] hover:text-[var(--slot4-accent)]"><Compass className="h-4 w-4" /> Open the directory</Link>
              </div>
            </div>
          </div>

          <div className="mt-6 grid gap-5 sm:grid-cols-3">
            {pagesContent.about.values.map((value, i) => {
              const Icon = valueIcon[i % valueIcon.length]
              return (
                <div key={value.title} data-reveal style={{ ['--reveal-delay' as string]: `${i * 80}ms` }} className="rounded-2xl border border-[var(--editable-border)] bg-[var(--slot4-panel-bg)] p-7 transition duration-300 hover:-translate-y-1.5 hover:border-[var(--slot4-accent)]/40">
                  <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-[var(--slot4-accent-soft)] text-[var(--slot4-accent)] ring-1 ring-inset ring-[var(--slot4-accent)]/20"><Icon className="h-5 w-5" /></span>
                  <h2 className="editable-display mt-5 text-xl font-semibold tracking-[-0.01em]">{value.title}</h2>
                  <p className="mt-3 text-sm leading-7 text-[var(--slot4-muted-text)]">{value.description}</p>
                </div>
              )
            })}
          </div>

          <div className="mt-6 flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-[var(--editable-border)] bg-[var(--slot4-surface-bg)] p-7 sm:p-9" data-reveal>
            <div>
              <h2 className="editable-display text-2xl font-semibold tracking-[-0.02em]">Have something to add?</h2>
              <p className="mt-2 text-sm text-[var(--slot4-muted-text)]">Suggest a collection or list your business in the directory.</p>
            </div>
            <Link href="/contact" className="inline-flex items-center gap-2 rounded-full bg-[var(--slot4-accent-fill)] px-6 py-3 text-sm font-semibold text-[var(--slot4-on-accent)] transition hover:brightness-110">Get in touch <ArrowRight className="h-4 w-4" /></Link>
          </div>
        </section>
      </main>
    </EditableSiteShell>
  )
}
