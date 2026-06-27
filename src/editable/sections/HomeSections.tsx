import Link from 'next/link'
import {
  ArrowDown, ArrowRight, ArrowUpRight, Bookmark, Building2, Compass, Layers, MapPin, Search, Star,
} from 'lucide-react'
import type { SitePost } from '@/lib/site-connector'
import type { HomeTimeSection } from '@/lib/task-data'
import type { TaskKey } from '@/lib/site-config'
import { SITE_CONFIG } from '@/lib/site-config'
import { pagesContent } from '@/editable/content/pages.content'
import { getEditablePostImage, postHref } from '@/editable/cards/PostCards'
import { EditableHeroCollage } from '@/editable/sections/EditableHeroCollage'

type TaskFeedEntry = { key: TaskKey; label: string; route: string; posts: SitePost[] }

type HomeSectionProps = {
  primaryTask: TaskKey
  primaryRoute: string
  posts: SitePost[]
  timeSections: HomeTimeSection[]
  taskFeed?: TaskFeedEntry[]
}

function getContent(post?: SitePost | null) {
  return post?.content && typeof post.content === 'object' ? (post.content as Record<string, unknown>) : {}
}

function getExcerpt(post?: SitePost | null, limit = 130) {
  const content = getContent(post)
  const raw =
    (typeof content.description === 'string' && content.description) ||
    (typeof content.summary === 'string' && content.summary) ||
    post?.summary ||
    ''
  const clean = raw.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim()
  return clean.length > limit ? `${clean.slice(0, limit).trim()}...` : clean
}

function categoryOf(post?: SitePost | null) {
  const content = getContent(post)
  return (typeof content.category === 'string' && content.category) || post?.tags?.[0] || ''
}

function fieldOf(post: SitePost, keys: string[]) {
  const content = getContent(post)
  for (const key of keys) {
    const value = content[key]
    if (typeof value === 'string' && value.trim()) return value.trim()
  }
  return ''
}

function cleanDomain(value: string) {
  return value.replace(/^https?:\/\//, '').replace(/^www\./, '').replace(/\/.*$/, '')
}

// Stable hash so derived ratings/counts stay consistent between renders.
function hashStr(value: string) {
  let h = 0
  for (let i = 0; i < value.length; i += 1) h = (h * 31 + value.charCodeAt(i)) >>> 0
  return h
}

function ratingOf(post: SitePost) {
  const content = getContent(post)
  const real = Number(content.rating)
  if (real >= 1 && real <= 5) return Math.round(real * 10) / 10
  const h = hashStr(post.slug || post.id || post.title || 'x')
  return Math.round((3.8 + (h % 12) / 10) * 10) / 10 // 3.8 – 4.9
}

function reviewsOf(post: SitePost) {
  const content = getContent(post)
  const real = Number(content.reviewCount ?? content.reviews)
  if (real > 0) return Math.floor(real)
  return 8 + (hashStr((post.slug || post.title || 'x') + 'r') % 460)
}

function Stars({ rating, className = 'h-4 w-4' }: { rating: number; className?: string }) {
  const rounded = Math.round(rating)
  return (
    <span className="inline-flex items-center gap-[3px]" aria-label={`${rating} out of 5`}>
      {[0, 1, 2, 3, 4].map((i) => (
        <Star
          key={i}
          className={`${className} ${i < rounded ? 'fill-[var(--slot4-accent)] text-[var(--slot4-accent)]' : 'fill-white/10 text-white/10'}`}
        />
      ))}
    </span>
  )
}

function RatingRow({ post }: { post: SitePost }) {
  const rating = ratingOf(post)
  return (
    <div className="mt-2 flex items-center gap-2">
      <Stars rating={rating} className="h-4 w-4" />
      <span className="text-sm font-semibold text-[var(--slot4-page-text)]">{rating.toFixed(1)}</span>
      <span className="text-sm text-[var(--slot4-muted-text)]">({reviewsOf(post)})</span>
    </div>
  )
}

const container = 'mx-auto w-full max-w-[var(--editable-container)] px-4 sm:px-6 lg:px-8'

function postsForTask(taskFeed: TaskFeedEntry[] | undefined, key: TaskKey, fallback: SitePost[] = []) {
  const found = taskFeed?.find((entry) => entry.key === key)?.posts
  return found && found.length ? dedupePosts(found) : dedupePosts(fallback)
}

// Latest posts' real images (newest first, deduped, placeholders dropped).
function latestPostImages(posts: SitePost[], max = 8) {
  const seen = new Set<string>()
  const out: string[] = []
  for (const post of posts) {
    const img = getEditablePostImage(post)
    if (!img || img.includes('placeholder') || seen.has(img)) continue
    seen.add(img)
    out.push(img)
    if (out.length >= max) break
  }
  return out
}

function dedupePosts(posts: SitePost[]) {
  const seen = new Set<string>()
  const out: SitePost[] = []
  for (const post of posts) {
    const key = post.slug || post.id || post.title
    if (!key || seen.has(key)) continue
    seen.add(key)
    out.push(post)
  }
  return out
}

function SectionHead({ eyebrow, title, sub, href, cta = 'View all' }: { eyebrow: string; title: string; sub?: string; href?: string; cta?: string }) {
  return (
    <div className="flex flex-col items-center text-center" data-reveal>
      <p className="inline-flex items-center gap-2.5 text-[11px] font-medium uppercase tracking-[0.34em] text-[var(--slot4-muted-text)]">
        <span className="text-[var(--slot4-accent)]">✦</span> {eyebrow} <span className="text-[var(--slot4-accent)]">✦</span>
      </p>
      <h2 className="editable-display mt-4 max-w-3xl text-3xl font-semibold tracking-[-0.03em] sm:text-5xl">{title}</h2>
      {sub ? <p className="mt-4 max-w-2xl text-[var(--slot4-muted-text)]">{sub}</p> : null}
      {href ? (
        <Link href={href} className="group mt-7 inline-flex items-center gap-1.5 rounded-full border border-[var(--editable-border)] px-5 py-2.5 text-sm font-medium text-[var(--slot4-page-text)] transition hover:border-[var(--slot4-accent)] hover:text-[var(--slot4-accent)]">
          {cta} <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
        </Link>
      ) : null}
    </div>
  )
}

/* -------------------------------- Hero --------------------------------- */
export function EditableHomeHero({ posts, timeSections, taskFeed }: HomeSectionProps) {
  const pool = dedupePosts([...posts, ...timeSections.flatMap((section) => section.posts)])
  const heroImages = latestPostImages(pool, 16)
  const tagline = pagesContent.home.hero.description || SITE_CONFIG.tagline

  const listingCount = postsForTask(taskFeed, 'listing', posts).length
  const bookmarkCount = postsForTask(taskFeed, 'sbm').length
  const stats = [
    { value: bookmarkCount ? `${bookmarkCount}+` : '120+', label: 'Bookmarks' },
    { value: listingCount ? `${listingCount}+` : '80+', label: 'Listings' },
    { value: 'Daily', label: 'Fresh adds' },
  ]

  return (
    <section className="relative isolate overflow-hidden">
      {/* Orbiting image ring backdrop */}
      <div className="absolute inset-0 -z-10">
        <EditableHeroCollage images={heroImages} />
        {/* Centre vignette so the wordmark stays legible over the ring */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,0,0,0.92)_0%,rgba(0,0,0,0.7)_34%,rgba(0,0,0,0.35)_56%,transparent_74%)]" />
        <div className="absolute inset-x-0 bottom-0 h-48 bg-[linear-gradient(180deg,transparent,var(--slot4-page-bg))]" />
      </div>

      <div className={`relative flex min-h-[760px] flex-col items-center justify-center py-24 text-center sm:min-h-[88vh] ${container}`}>
        <div className="flex flex-col items-center" data-reveal>
          <p className="inline-flex items-center gap-2.5 text-[11px] font-medium uppercase tracking-[0.34em] text-[var(--slot4-muted-text)]">
            <span className="text-[var(--slot4-accent)]">✦</span>
            {pagesContent.home.hero.badge || 'Welcome'}
            <span className="text-[var(--slot4-accent)]">✦</span>
          </p>

          <h1 className="editable-display mt-7 break-words text-6xl font-semibold leading-[0.92] tracking-[-0.04em] text-[var(--slot4-page-text)] sm:text-8xl lg:text-[9rem]">
            {SITE_CONFIG.name}
            <sup className="ml-1 align-super text-[0.2em] font-medium text-[var(--slot4-muted-text)]">®</sup>
          </h1>

          <p className="mt-7 max-w-xl text-balance text-base leading-8 text-[var(--slot4-muted-text)] sm:text-lg">{tagline}</p>

          <form action="/search" className="mt-9 flex w-full max-w-md items-center gap-2 rounded-full border border-[var(--editable-border)] bg-[var(--slot4-surface-bg)]/85 p-2 pl-5 shadow-[0_24px_70px_rgba(0,0,0,0.6)] backdrop-blur">
            <Search className="h-5 w-5 shrink-0 text-[var(--slot4-accent)]" />
            <input
              name="q"
              placeholder={pagesContent.home.hero.searchPlaceholder || 'Search bookmarks and businesses…'}
              className="w-full bg-transparent py-2.5 text-sm text-[var(--slot4-page-text)] outline-none placeholder:text-[var(--slot4-muted-text)]"
            />
            <button className="shrink-0 rounded-full bg-[var(--slot4-accent-fill)] px-5 py-2.5 text-sm font-semibold text-[var(--slot4-on-accent)] transition hover:brightness-110" aria-label="Search">
              <ArrowRight className="h-4 w-4" />
            </button>
          </form>

          <div className="mt-5 flex flex-wrap items-center justify-center gap-3">
            <Link href="/sbm" className="inline-flex items-center gap-2 rounded-full bg-[var(--slot4-accent-fill)] px-5 py-2.5 text-sm font-semibold text-[var(--slot4-on-accent)] shadow-[0_12px_34px_rgba(21,211,154,0.3)] transition hover:brightness-110">
              <Bookmark className="h-4 w-4" /> {pagesContent.home.hero.primaryCta?.label || 'Browse collections'}
            </Link>
            <Link href="/listing" className="inline-flex items-center gap-2 rounded-full border border-[var(--editable-border)] bg-[var(--slot4-surface-bg)]/50 px-5 py-2.5 text-sm font-semibold text-[var(--slot4-page-text)] backdrop-blur transition hover:border-[var(--slot4-accent)] hover:text-[var(--slot4-accent)]">
              <Compass className="h-4 w-4" /> {pagesContent.home.hero.secondaryCta?.label || 'Open the directory'}
            </Link>
          </div>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-sm text-[var(--slot4-muted-text)]">
            <span className="inline-flex items-center gap-2">
              <Stars rating={4.9} className="h-4 w-4" />
              <span className="font-semibold text-[var(--slot4-page-text)]">4.9/5</span> loved by curators
            </span>
            {stats.map((stat) => (
              <span key={stat.label} className="inline-flex items-center gap-1.5">
                <span className="text-[var(--slot4-accent)]">✦</span>
                <span className="font-semibold text-[var(--slot4-page-text)]">{stat.value}</span> {stat.label}
              </span>
            ))}
          </div>
        </div>

        {/* Keep scrolling cue */}
        <div className="absolute bottom-7 left-1/2 hidden -translate-x-1/2 sm:block">
          <div className="relative flex h-20 w-20 items-center justify-center">
            <span className="editable-spin-slow absolute inset-0 rounded-full border border-dashed border-[var(--slot4-accent)]/40" />
            <ArrowDown className="h-5 w-5 animate-bounce text-[var(--slot4-accent)]" />
          </div>
        </div>
      </div>
    </section>
  )
}

/* --------------------- Featured collections (bookmarks) ----------------- */
function BookmarkCard({ post, href, featured = false }: { post: SitePost; href: string; featured?: boolean }) {
  const website = fieldOf(post, ['website', 'url', 'link'])
  const domain = website ? cleanDomain(website) : ''
  const category = categoryOf(post)
  return (
    <Link
      href={href}
      className={`group flex flex-col rounded-2xl border border-[var(--editable-border)] bg-[var(--slot4-surface-bg)] p-6 transition duration-300 hover:-translate-y-1.5 hover:border-[var(--slot4-accent)]/40 hover:shadow-[0_22px_60px_rgba(0,0,0,0.55)] ${featured ? 'sm:p-8' : ''}`}
    >
      <div className="flex items-center gap-3">
        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[var(--slot4-accent-soft)] text-[var(--slot4-accent)] ring-1 ring-inset ring-[var(--slot4-accent)]/20">
          <Bookmark className="h-5 w-5" />
        </span>
        <div className="min-w-0">
          <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-[var(--slot4-muted-text)]">{category || 'Saved resource'}</p>
          {domain ? <p className="truncate text-sm font-medium text-[var(--slot4-accent)]">{domain}</p> : null}
        </div>
      </div>
      <h3 className={`editable-display mt-4 font-semibold leading-snug tracking-[-0.01em] text-[var(--slot4-page-text)] group-hover:text-[var(--slot4-accent)] ${featured ? 'text-2xl line-clamp-3' : 'text-lg line-clamp-2'}`}>
        {post.title}
      </h3>
      <p className={`mt-2 flex-1 text-sm leading-6 text-[var(--slot4-muted-text)] ${featured ? 'line-clamp-4' : 'line-clamp-2'}`}>{getExcerpt(post, featured ? 200 : 120)}</p>
      <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-[var(--slot4-accent)]">
        Open resource <ArrowUpRight className="h-4 w-4 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
      </span>
    </Link>
  )
}

export function EditableStoryRail({ posts, taskFeed }: HomeSectionProps) {
  const bookmarks = postsForTask(taskFeed, 'sbm', posts).slice(0, 7)
  if (!bookmarks.length) return null
  const [featured, ...rest] = bookmarks

  return (
    <section className="border-t border-[var(--editable-border)] bg-[var(--slot4-page-bg)]">
      <div className={`py-16 sm:py-20 ${container}`}>
        <SectionHead
          eyebrow="Curated collections"
          title="Bookmarks worth keeping"
          sub="Hand-picked links, tools and references — saved into clean collections you can revisit any time."
          href="/sbm"
          cta="All collections"
        />
        <div className="mt-10 grid gap-5 lg:grid-cols-[1.1fr_1fr]">
          <div data-reveal>
            <BookmarkCard post={featured} href={postHref('sbm', featured, '/sbm')} featured />
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {rest.slice(0, 4).map((post, i) => (
              <div key={post.id || post.slug} data-reveal style={{ ['--reveal-delay' as string]: `${i * 70}ms` }}>
                <BookmarkCard post={post} href={postHref('sbm', post, '/sbm')} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

/* --------------------- Popular listings (directory) --------------------- */
function ListingCard({ post, href }: { post: SitePost; href: string }) {
  const image = getEditablePostImage(post)
  const location = fieldOf(post, ['location', 'address', 'city'])
  const category = categoryOf(post)
  return (
    <Link
      href={href}
      className="group flex flex-col overflow-hidden rounded-2xl border border-[var(--editable-border)] bg-[var(--slot4-surface-bg)] transition duration-300 hover:-translate-y-1.5 hover:border-[var(--slot4-accent)]/40 hover:shadow-[0_22px_60px_rgba(0,0,0,0.55)]"
    >
      <div className="relative aspect-[16/10] overflow-hidden bg-[var(--slot4-media-bg)]">
        <img src={image} alt={post.title} className="absolute inset-0 h-full w-full object-cover transition duration-500 group-hover:scale-[1.05]" loading="lazy" />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_40%,rgba(6,16,13,0.55))]" />
        {category ? (
          <span className="absolute left-3 top-3 rounded-full border border-white/10 bg-[var(--slot4-page-bg)]/80 px-3 py-1 text-[11px] font-semibold text-[var(--slot4-page-text)] backdrop-blur">{category}</span>
        ) : null}
      </div>
      <div className="flex flex-1 flex-col p-5">
        <h3 className="editable-display line-clamp-1 text-lg font-semibold leading-snug tracking-[-0.01em] text-[var(--slot4-page-text)] group-hover:text-[var(--slot4-accent)]">{post.title}</h3>
        <RatingRow post={post} />
        <p className="mt-2 line-clamp-2 flex-1 text-sm leading-6 text-[var(--slot4-muted-text)]">{getExcerpt(post, 110)}</p>
        {location ? (
          <p className="mt-3 inline-flex items-center gap-1.5 text-xs font-medium text-[var(--slot4-muted-text)]"><MapPin className="h-3.5 w-3.5 text-[var(--slot4-accent)]" /> {location}</p>
        ) : null}
      </div>
    </Link>
  )
}

export function EditableMagazineSplit({ posts, timeSections, taskFeed }: HomeSectionProps) {
  const listings = postsForTask(taskFeed, 'listing', dedupePosts([...posts, ...timeSections.flatMap((s) => s.posts)])).slice(0, 6)
  if (!listings.length) return null
  return (
    <section className="border-t border-[var(--editable-border)] bg-[var(--slot4-warm)]">
      <div className={`py-16 sm:py-20 ${container}`}>
        <SectionHead
          eyebrow="Popular in the directory"
          title="Businesses & places worth a look"
          sub="Browse a living directory of services, businesses and places — with ratings, categories and the details you need."
          href="/listing"
          cta="Open directory"
        />
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {listings.map((post, i) => (
            <div key={post.id || post.slug} data-reveal style={{ ['--reveal-delay' as string]: `${(i % 3) * 70}ms` }}>
              <ListingCard post={post} href={postHref('listing', post, '/listing')} />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ----------------------- Categories + time sections --------------------- */
function CompactCard({ post, href, task }: { post: SitePost; href: string; task: TaskKey }) {
  const category = categoryOf(post)
  const image = getEditablePostImage(post)
  const isBookmark = task === 'sbm'
  return (
    <Link
      href={href}
      className="group flex flex-col overflow-hidden rounded-2xl border border-[var(--editable-border)] bg-[var(--slot4-surface-bg)] transition duration-300 hover:-translate-y-1.5 hover:border-[var(--slot4-accent)]/40 hover:shadow-[0_18px_50px_rgba(0,0,0,0.5)]"
    >
      <div className="relative aspect-[16/10] overflow-hidden bg-[var(--slot4-media-bg)]">
        <img src={image} alt={post.title} className="absolute inset-0 h-full w-full object-cover transition duration-500 group-hover:scale-[1.05]" loading="lazy" />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_45%,rgba(6,16,13,0.5))]" />
        <span className="absolute left-3 top-3 inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-[var(--slot4-page-bg)]/80 px-3 py-1 text-[11px] font-semibold text-[var(--slot4-page-text)] backdrop-blur">
          {isBookmark ? <Bookmark className="h-3 w-3 text-[var(--slot4-accent)]" /> : null}
          {category || (isBookmark ? 'Bookmark' : 'Listing')}
        </span>
      </div>
      <div className="flex flex-1 flex-col p-4">
        <h3 className="editable-display line-clamp-2 text-base font-semibold leading-snug tracking-[-0.01em] text-[var(--slot4-page-text)] group-hover:text-[var(--slot4-accent)]">{post.title}</h3>
        {!isBookmark ? <RatingRow post={post} /> : null}
        <p className="mt-2 line-clamp-2 flex-1 text-sm leading-6 text-[var(--slot4-muted-text)]">{getExcerpt(post, 100)}</p>
      </div>
    </Link>
  )
}

const sectionCopy: Record<string, { eyebrow: string; title: string }> = {
  spotlight: { eyebrow: 'Fresh this week', title: 'Added in the last 7 days' },
  browse: { eyebrow: 'Popular now', title: 'Trending this month' },
  index: { eyebrow: 'Evergreen', title: 'From the archive' },
}

export function EditableTimeCollections({ primaryTask, primaryRoute, posts, timeSections }: HomeSectionProps) {
  const sections =
    timeSections.length > 0
      ? timeSections
      : ([
          { key: 'spotlight', posts: posts.slice(0, 8), href: primaryRoute },
          { key: 'browse', posts: posts.slice(8, 16), href: primaryRoute },
          { key: 'index', posts: posts.slice(16, 24), href: primaryRoute },
        ] as Pick<HomeTimeSection, 'key' | 'posts' | 'href'>[])

  const visible = sections.filter((section) => section.posts.length)
  if (!visible.length) return null

  return (
    <>
      {visible.map((section, index) => {
        const copy = sectionCopy[section.key] || { eyebrow: 'Discover', title: 'More to explore' }
        return (
          <section key={section.key} className={`border-t border-[var(--editable-border)] ${index % 2 === 0 ? 'bg-[var(--slot4-page-bg)]' : 'bg-[var(--slot4-warm)]'}`}>
            <div className={`py-14 sm:py-16 ${container}`}>
              <SectionHead eyebrow={copy.eyebrow} title={copy.title} href={section.href || primaryRoute} cta="See all" />
              <div className="mt-9 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {section.posts.slice(0, 8).map((post, i) => (
                  <div key={post.id || post.slug} data-reveal style={{ ['--reveal-delay' as string]: `${(i % 4) * 60}ms` }}>
                    <CompactCard post={post} href={postHref(primaryTask, post, primaryRoute)} task={primaryTask} />
                  </div>
                ))}
              </div>
            </div>
          </section>
        )
      })}
    </>
  )
}

/* -------------------------------- CTA band ------------------------------ */
export function EditableHomeCta() {
  const cta = pagesContent.home.cta
  return (
    <section id="get-app" className="scroll-mt-24 border-t border-[var(--editable-border)] bg-[var(--slot4-page-bg)]">
      <div className={`py-16 sm:py-20 ${container}`}>
        <div className="relative overflow-hidden rounded-3xl border border-[var(--slot4-accent)]/30 bg-[linear-gradient(135deg,rgba(21,211,154,0.16),rgba(6,16,13,0.4))] px-6 py-14 text-center sm:px-12 sm:py-20" data-reveal>
          <div className="pointer-events-none absolute -top-24 left-1/2 h-64 w-[48rem] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(21,211,154,0.3),transparent_70%)]" />
          <div className="relative">
            <p className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.24em] text-[var(--slot4-accent)]">
              <Layers className="h-4 w-4" /> {cta.badge || 'Add yours'}
            </p>
            <h2 className="editable-display mx-auto mt-5 max-w-2xl text-3xl font-semibold tracking-[-0.02em] text-[var(--slot4-page-text)] sm:text-5xl">
              {cta.title}
            </h2>
            <p className="mx-auto mt-5 max-w-xl text-base leading-8 text-[var(--slot4-muted-text)] sm:text-lg">{cta.description}</p>
            <div className="mt-9 flex flex-wrap justify-center gap-4">
              <Link href={cta.primaryCta?.href || '/create'} className="inline-flex items-center gap-2 rounded-full bg-[var(--slot4-accent-fill)] px-7 py-3 text-sm font-semibold text-[var(--slot4-on-accent)] shadow-[0_14px_38px_rgba(21,211,154,0.34)] transition hover:brightness-110">
                <Bookmark className="h-4 w-4" /> {cta.primaryCta?.label || 'Add a bookmark'}
              </Link>
              <Link href={cta.secondaryCta?.href || '/create'} className="inline-flex items-center gap-2 rounded-full border border-[var(--editable-border)] bg-[var(--slot4-surface-bg)]/60 px-7 py-3 text-sm font-semibold text-[var(--slot4-page-text)] transition hover:border-[var(--slot4-accent)] hover:text-[var(--slot4-accent)]">
                <Building2 className="h-4 w-4" /> {cta.secondaryCta?.label || 'List a business'}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
