import type { Metadata } from 'next'
import Link from 'next/link'
import { buildPageMetadata } from '@/lib/seo'
import { EditableSiteShell } from '@/editable/shell/EditableSiteShell'
import { EditableLocalSignupForm } from '@/editable/components/EditableLocalAuthForms'
import { pagesContent } from '@/editable/content/pages.content'

export async function generateMetadata(): Promise<Metadata> {
  return buildPageMetadata({ path: '/signup', title: 'Sign up', description: pagesContent.auth.signup.metadataDescription })
}

export default function SignupPage() {
  return (
    <EditableSiteShell>
      <main className="bg-[var(--slot4-panel-bg)] text-[var(--slot4-page-text)]">
        <section className="mx-auto grid min-h-[calc(100vh-12rem)] max-w-[var(--editable-container)] items-center gap-12 px-4 py-16 sm:px-6 lg:grid-cols-[0.9fr_1fr] lg:px-8">
          <div data-reveal className="relative isolate overflow-hidden rounded-3xl border border-[var(--editable-border)] bg-[var(--slot4-surface-bg)] p-7 shadow-[0_28px_80px_rgba(0,0,0,0.5)] sm:p-9">
            <div className="pointer-events-none absolute -top-20 -left-10 -z-10 h-48 w-48 rounded-full bg-[radial-gradient(circle,rgba(21,211,154,0.16),transparent_70%)]" />
            <h1 className="editable-display text-2xl font-semibold tracking-[-0.02em]">{pagesContent.auth.signup.formTitle}</h1>
            <EditableLocalSignupForm />
            <p className="mt-6 text-sm text-[var(--slot4-muted-text)]">Already have an account? <Link href="/login" className="font-semibold text-[var(--slot4-accent)] underline-offset-4 hover:underline">{pagesContent.auth.signup.loginCta}</Link></p>
          </div>
          <div data-reveal>
            <p className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.24em] text-[var(--slot4-accent)]"><span className="h-1 w-1 rounded-full bg-[var(--slot4-accent)]" /> {pagesContent.auth.signup.badge}</p>
            <h2 className="editable-display mt-5 max-w-xl text-4xl font-semibold leading-[1.05] tracking-[-0.03em] sm:text-5xl">{pagesContent.auth.signup.title}</h2>
            <p className="mt-5 max-w-lg text-base leading-8 text-[var(--slot4-muted-text)]">{pagesContent.auth.signup.description}</p>
          </div>
        </section>
      </main>
    </EditableSiteShell>
  )
}
