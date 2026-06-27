import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, Filter, Search } from 'lucide-react'
import { buildPageMetadata } from '@/lib/seo'
import { fetchSiteFeed } from '@/lib/site-connector'
import { getPostTaskKey } from '@/lib/task-data'
import { getMockPostsForTask } from '@/lib/mock-posts'
import { SITE_CONFIG, type TaskKey } from '@/lib/site-config'
import type { SitePost } from '@/lib/site-connector'
import { EditableSiteShell } from '@/editable/shell/EditableSiteShell'
import { pagesContent } from '@/editable/content/pages.content'

export const revalidate = 3

export async function generateMetadata(): Promise<Metadata> {
  return buildPageMetadata({
    path: '/search',
    title: pagesContent.search.metadata.title,
    description: pagesContent.search.metadata.description,
  })
}

const stripHtml = (value: string) => value.replace(/<[^>]*>/g, ' ')
const compactText = (value: unknown) => typeof value === 'string' ? stripHtml(value).replace(/\s+/g, ' ').trim().toLowerCase() : ''
const getContent = (post: SitePost) => post.content && typeof post.content === 'object' ? post.content as Record<string, unknown> : {}
const getImage = (post: SitePost) => {
  const content = getContent(post)
  const media = Array.isArray(post.media) ? post.media.find((item) => typeof item?.url === 'string')?.url : ''
  const images = Array.isArray(content.images) ? content.images.find((item) => typeof item === 'string') as string | undefined : ''
  return media || compactRaw(content.featuredImage) || compactRaw(content.image) || compactRaw(content.thumbnail) || images || ''
}
const compactRaw = (value: unknown) => typeof value === 'string' ? value.trim() : ''
// Strip HTML tags + decode the common entities so card summaries render as
// clean plain text instead of raw markup.
const cleanText = (value: string) =>
  stripHtml(value)
    .replace(/&nbsp;/gi, ' ')
    .replace(/&amp;/gi, '&')
    .replace(/&lt;/gi, '<')
    .replace(/&gt;/gi, '>')
    .replace(/&quot;/gi, '"')
    .replace(/&#0?39;|&apos;/gi, "'")
    .replace(/\s+/g, ' ')
    .trim()
const summaryOf = (post: SitePost) => cleanText(post.summary || compactRaw(getContent(post).description) || compactRaw(getContent(post).excerpt) || '')

const matches = (post: SitePost, query: string, category: string, task: string) => {
  const content = getContent(post)
  const typeText = compactText(content.type)
  if (typeText === 'comment') return false
  const derivedTask = getPostTaskKey(post) || typeText
  if (task && derivedTask !== task) return false
  const categoryText = compactText(content.category)
  const tagsText = compactText(Array.isArray(post.tags) ? post.tags.join(' ') : '')
  if (category && !(categoryText || tagsText).includes(category)) return false
  if (!query) return true
  return [post.title, post.summary, content.description, content.body, content.excerpt, content.category, Array.isArray(post.tags) ? post.tags.join(' ') : '']
    .some((value) => compactText(value).includes(query))
}

function SearchResultCard({ post, index }: { post: SitePost; index: number }) {
  const task = getPostTaskKey(post) as TaskKey | null
  // Route from the task config (e.g. /listing/<slug>); buildPostUrl can fall
  // back to /posts for tasks missing from the enabled taskViews map, which 404s.
  const taskRoute = SITE_CONFIG.tasks.find((item) => item.key === task)?.route
  const href = `${taskRoute || `/${task || 'article'}`}/${post.slug}`
  const image = getImage(post)
  const summary = summaryOf(post)
  const taskLabel = SITE_CONFIG.tasks.find((item) => item.key === task)?.label || 'Post'
  const strong = index % 5 === 0

  return (
    <Link href={href} data-reveal className={`group block overflow-hidden rounded-2xl border border-[var(--editable-border)] bg-[var(--slot4-surface-bg)] transition duration-300 hover:-translate-y-1.5 hover:border-[var(--slot4-accent)]/40 hover:shadow-[0_22px_60px_rgba(0,0,0,0.55)] ${strong ? 'md:col-span-2' : ''}`}>
      {image ? (
        <div className={`relative overflow-hidden bg-[var(--slot4-media-bg)] ${strong ? 'aspect-[16/7]' : 'aspect-[16/10]'}`}>
          <img src={image} alt="" className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_40%,rgba(6,16,13,0.6))]" />
          <span className="absolute left-4 top-4 rounded-full border border-white/10 bg-[var(--slot4-page-bg)]/80 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-[var(--slot4-accent)] backdrop-blur">{taskLabel}</span>
        </div>
      ) : null}
      <div className="p-5 sm:p-6">
        {!image ? <span className="inline-block rounded-full bg-[var(--slot4-accent-soft)] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-[var(--slot4-accent)]">{taskLabel}</span> : null}
        <h2 className="editable-display mt-4 line-clamp-3 text-xl font-semibold leading-snug tracking-[-0.02em] text-[var(--slot4-page-text)] group-hover:text-[var(--slot4-accent)]">{post.title}</h2>
        {summary ? <p className="mt-3 line-clamp-3 text-sm leading-7 text-[var(--slot4-muted-text)]">{summary}</p> : null}
        <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-[var(--slot4-accent)]">Open result <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" /></span>
      </div>
    </Link>
  )
}

export default async function SearchPage({ searchParams }: { searchParams?: Promise<{ q?: string; category?: string; task?: string; master?: string }> }) {
  const resolved = (await searchParams) || {}
  const query = (resolved.q || '').trim()
  const normalized = query.toLowerCase()
  const category = (resolved.category || '').trim().toLowerCase()
  const task = (resolved.task || '').trim().toLowerCase()
  const useMaster = resolved.master !== '0'
  const feed = await fetchSiteFeed(useMaster ? 1000 : 300, useMaster ? { fresh: true, category: category || undefined, task: task || undefined } : undefined)
  const posts = feed?.posts?.length ? feed.posts : useMaster ? [] : SITE_CONFIG.tasks.filter((item) => item.enabled).flatMap((item) => getMockPostsForTask(item.key))
  const results = posts.filter((post) => matches(post, normalized, category, task)).slice(0, normalized ? 80 : 36)
  const enabledTasks = SITE_CONFIG.tasks.filter((item) => item.enabled)

  const primaryTask = enabledTasks[0]

  return (
    <EditableSiteShell>
      <main className="min-h-screen bg-[var(--slot4-page-bg)] text-[var(--slot4-page-text)]">
        <section className="mx-auto max-w-[var(--editable-container)] px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
          <div className="relative grid gap-8 overflow-hidden rounded-3xl border border-[var(--editable-border)] bg-[var(--slot4-surface-bg)] p-6 shadow-[0_28px_80px_rgba(0,0,0,0.5)] md:grid-cols-[0.85fr_1.15fr] lg:p-10">
            <div className="pointer-events-none absolute -top-24 -right-10 h-64 w-64 rounded-full bg-[radial-gradient(circle,rgba(21,211,154,0.18),transparent_70%)]" />
            <div className="relative">
              <p className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.24em] text-[var(--slot4-accent)]"><span className="h-1 w-1 rounded-full bg-[var(--slot4-accent)]" /> {pagesContent.search.hero.badge}</p>
              <h1 className="editable-display mt-5 text-4xl font-semibold leading-[1.05] tracking-[-0.03em] sm:text-5xl">{pagesContent.search.hero.title}</h1>
              <p className="mt-5 max-w-xl text-base leading-8 text-[var(--slot4-muted-text)]">{pagesContent.search.hero.description}</p>
            </div>
            <form action="/search" className="relative self-end rounded-2xl border border-[var(--editable-border)] bg-[var(--slot4-panel-bg)] p-4 sm:p-5">
              <input type="hidden" name="master" value="1" />
              <label className="flex items-center gap-3 rounded-xl border border-[var(--editable-border)] bg-[var(--slot4-surface-bg)] px-4 py-3 transition focus-within:border-[var(--slot4-accent)]/60">
                <Search className="h-5 w-5 text-[var(--slot4-accent)]" />
                <input name="q" defaultValue={query} placeholder={pagesContent.search.hero.placeholder} className="min-w-0 flex-1 bg-transparent text-sm outline-none placeholder:text-[var(--slot4-muted-text)]" />
              </label>
              <div className="mt-3 grid gap-3 sm:grid-cols-2">
                <label className="flex items-center gap-2 rounded-xl border border-[var(--editable-border)] bg-[var(--slot4-surface-bg)] px-4 py-3 transition focus-within:border-[var(--slot4-accent)]/60">
                  <Filter className="h-4 w-4 text-[var(--slot4-accent)]" />
                  <input name="category" defaultValue={category} placeholder="Category" className="min-w-0 flex-1 bg-transparent text-sm outline-none placeholder:text-[var(--slot4-muted-text)]" />
                </label>
                <select name="task" defaultValue={task} className="rounded-xl border border-[var(--editable-border)] bg-[var(--slot4-surface-bg)] px-4 py-3 text-sm text-[var(--slot4-page-text)] outline-none transition focus:border-[var(--slot4-accent)]/60">
                  <option value="">All content types</option>
                  {enabledTasks.map((item) => <option key={item.key} value={item.key}>{item.label}</option>)}
                </select>
              </div>
              <button className="mt-3 inline-flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-[var(--slot4-accent-fill)] px-6 text-sm font-semibold text-[var(--slot4-on-accent)] shadow-[0_12px_34px_rgba(21,211,154,0.28)] transition hover:brightness-110" type="submit"><Search className="h-4 w-4" /> Search</button>
            </form>
          </div>

          <div className="mt-12 flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--slot4-accent)]">{results.length} results</p>
              <h2 className="editable-display mt-2 text-2xl font-semibold tracking-[-0.02em] sm:text-3xl">{query ? `Results for “${query}”` : pagesContent.search.resultsTitle}</h2>
            </div>
            {primaryTask ? (
              <Link href={primaryTask.route} className="inline-flex items-center gap-2 rounded-full border border-[var(--editable-border)] bg-[var(--slot4-surface-bg)] px-5 py-2.5 text-sm font-medium transition hover:border-[var(--slot4-accent)] hover:text-[var(--slot4-accent)]">Browse {primaryTask.label.toLowerCase()} <ArrowRight className="h-4 w-4" /></Link>
            ) : null}
          </div>

          {results.length ? (
            <div className="mt-6 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              {results.map((post, index) => <SearchResultCard key={post.id || post.slug} post={post} index={index} />)}
            </div>
          ) : (
            <div className="mt-8 rounded-2xl border border-dashed border-[var(--editable-border)] bg-[var(--slot4-surface-bg)] p-12 text-center">
              <Search className="mx-auto h-7 w-7 text-[var(--slot4-muted-text)]" />
              <p className="editable-display mt-4 text-2xl font-semibold tracking-[-0.02em]">No matching results found.</p>
              <p className="mt-3 text-sm text-[var(--slot4-muted-text)]">Try a different keyword, content type, or category.</p>
            </div>
          )}
        </section>
      </main>
    </EditableSiteShell>
  )
}
