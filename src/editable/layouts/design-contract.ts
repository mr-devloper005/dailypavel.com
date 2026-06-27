import type { CSSProperties } from 'react'

export const editableRootStyle = {
  // Pure-black, minimal "Cyrclo-style" system: black canvas with a faint dotted
  // backdrop, white text, hairline white borders, near-black glassy surfaces and
  // a restrained emerald spark. One palette change here cascades site-wide.
  '--slot4-page-bg': '#000000',
  '--slot4-page-text': '#f4f6f7',
  '--slot4-panel-bg': '#0a0b0d',
  '--slot4-surface-bg': '#0c0d10',
  '--slot4-muted-text': '#8c919a',
  '--slot4-soft-muted-text': '#595e66',
  '--slot4-accent': '#19e3a8',
  '--slot4-accent-fill': '#15d39a',
  '--slot4-accent-soft': 'rgba(21,211,154,0.12)',
  '--slot4-on-accent': '#04130d',
  '--slot4-dark-bg': '#0a0b0d',
  '--slot4-dark-text': '#ffffff',
  '--slot4-media-bg': '#131418',
  '--slot4-cream': '#0c0d10',
  '--slot4-warm': '#050507',
  '--slot4-lavender': '#0c0d10',
  '--slot4-gray': '#050507',
  '--slot4-body-gradient':
    'radial-gradient(rgba(255,255,255,0.05) 1px, transparent 1.4px), radial-gradient(900px 520px at 50% -6%, rgba(21,211,154,0.10), transparent 70%)',
  '--editable-page-bg': '#000000',
  '--editable-page-text': '#f4f6f7',
  '--editable-container': '1280px',
  '--editable-border': 'rgba(255,255,255,0.10)',
  '--editable-nav-bg': '#000000',
  '--editable-nav-text': '#f4f6f7',
  '--editable-nav-active': '#19e3a8',
  '--editable-nav-active-text': '#04130d',
  '--editable-cta-bg': '#15d39a',
  '--editable-cta-text': '#04130d',
  '--editable-search-bg': '#0c0d10',
  '--editable-footer-bg': '#000000',
  '--editable-footer-text': '#f4f6f7',
} as CSSProperties

export const editablePalette = {
  pageBg: 'bg-[var(--slot4-page-bg)]',
  pageText: 'text-[var(--slot4-page-text)]',
  panelBg: 'bg-[var(--slot4-panel-bg)]',
  panelText: 'text-[var(--slot4-page-text)]',
  surfaceBg: 'bg-[var(--slot4-surface-bg)]',
  surfaceText: 'text-[var(--slot4-page-text)]',
  mutedText: 'text-[var(--slot4-muted-text)]',
  softMutedText: 'text-[var(--slot4-soft-muted-text)]',
  accentText: 'text-[var(--slot4-accent)]',
  accentBg: 'bg-[var(--slot4-accent-fill)]',
  accentSoftBg: 'bg-[var(--slot4-accent-soft)]',
  accentSoftText: 'text-[var(--slot4-accent)]',
  onAccentText: 'text-[var(--slot4-on-accent)]',
  darkBg: 'bg-[var(--slot4-dark-bg)]',
  darkText: 'text-[var(--slot4-dark-text)]',
  mediaBg: 'bg-[var(--slot4-media-bg)]',
  creamBg: 'bg-[var(--slot4-cream)]',
  warmBg: 'bg-[var(--slot4-warm)]',
  lavenderBg: 'bg-[var(--slot4-lavender)]',
  grayBg: 'bg-[var(--slot4-gray)]',
  border: 'border-[var(--editable-border)]',
  darkBorder: 'border-white/10',
  shadow: 'shadow-[0_10px_30px_rgba(0,0,0,0.45)]',
  shadowStrong: 'shadow-[0_28px_72px_rgba(0,0,0,0.6)]',
  overlay: 'bg-[linear-gradient(180deg,rgba(4,9,7,0.05),rgba(4,9,7,0.82))]',
} as const

export const editableDesignContract = {
  shell: {
    page: `min-h-screen ${editablePalette.pageBg} ${editablePalette.pageText}`,
    section: 'mx-auto w-full max-w-[var(--editable-container)] px-4 sm:px-6 lg:px-8',
    sectionY: 'py-14 sm:py-16 lg:py-20',
  },
  layout: {
    safeGrid: 'grid gap-6 md:grid-cols-2 xl:grid-cols-3',
    featureGrid: 'grid gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-center',
    rail: 'flex snap-x gap-5 overflow-x-auto pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden',
    minRailCard: 'w-[150px] shrink-0 snap-start sm:w-[170px]',
  },
  type: {
    eyebrow: 'text-xs font-semibold uppercase tracking-[0.28em] text-[var(--slot4-accent)]',
    heroTitle: 'text-4xl font-semibold leading-[1.06] tracking-[-0.02em] sm:text-5xl lg:text-[3.4rem]',
    sectionTitle: 'text-3xl font-semibold tracking-[-0.02em] sm:text-4xl',
    body: 'text-base leading-relaxed',
  },
  surface: {
    card: `rounded-2xl border ${editablePalette.border} ${editablePalette.surfaceBg} ${editablePalette.shadow}`,
    soft: `rounded-2xl border ${editablePalette.border} ${editablePalette.panelBg}`,
    dark: `rounded-2xl ${editablePalette.darkBg} ${editablePalette.darkText} ${editablePalette.shadowStrong}`,
  },
  button: {
    primary: `inline-flex items-center justify-center gap-2 rounded-full bg-[var(--slot4-accent-fill)] px-6 py-3 text-sm font-semibold tracking-[0.01em] text-[var(--slot4-on-accent)] shadow-[0_0_0_1px_rgba(21,211,154,0.4),0_12px_34px_rgba(21,211,154,0.28)] transition duration-300 hover:brightness-110 active:scale-[0.98]`,
    secondary: `inline-flex items-center justify-center gap-2 rounded-full border border-[var(--editable-border)] bg-[var(--slot4-surface-bg)] px-6 py-3 text-sm font-semibold tracking-[0.01em] text-[var(--slot4-page-text)] transition duration-300 hover:border-[var(--slot4-accent)] hover:text-[var(--slot4-accent)] active:scale-[0.98]`,
    accent: `inline-flex items-center justify-center gap-2 rounded-full ${editablePalette.accentBg} px-6 py-3 text-sm font-semibold text-[var(--slot4-on-accent)] transition duration-300 hover:brightness-110 active:scale-[0.98]`,
  },
  media: {
    frame: `relative overflow-hidden rounded-2xl ${editablePalette.mediaBg}`,
    ratio: 'aspect-[2/3]',
  },
  motion: {
    lift: 'transition duration-300 hover:-translate-y-1.5 hover:shadow-[0_22px_60px_rgba(0,0,0,0.55)]',
    fade: 'transition duration-300 hover:opacity-80',
  },
} as const

export const aiLayoutRules = [
  'Change the full site color palette in editableRootStyle first; all homepage sections consume those CSS variables.',
  'Keep page structure in src/editable/sections/HomeSections.tsx so AI can redesign the whole home experience in one file.',
  'Use wide readable grids; never create skinny columns for paragraphs or cards.',
  'Use horizontal rails for dense post browsing, like the MysteryCoder reference layout.',
  'Keep dynamic post fetching intact; do not replace posts with mock arrays.',
  'Use postHref() for all post links so task-specific routes keep working.',
] as const
