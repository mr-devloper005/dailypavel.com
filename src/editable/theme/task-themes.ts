import type { CSSProperties } from 'react'
import type { TaskKey } from '@/lib/site-config'

/*
  Dark, premium "Cyrclo-style" task surfaces.

  Every task (archive + detail) shares one cohesive identity: a near-black
  green-tinted canvas, glassy raised surfaces, hairline white borders and a
  single luminous emerald accent. Per-task copy (kicker / note) keeps a little
  voice, but the visual language is unified. Tokens ship via CSS vars (`--tk-*`).
*/

export type TaskTheme = {
  /** short flavour word shown as an eyebrow kicker */
  kicker: string
  /** one-line mood note for the page intro */
  note: string
  dark: boolean
  fontDisplay: string
  fontBody: string
  bg: string
  surface: string
  raised: string
  text: string
  muted: string
  line: string
  accent: string
  accentSoft: string
  onAccent: string
  glow: string
  radius: string
}

const DISPLAY_FONT = "'Space Grotesk', 'Sora', system-ui, -apple-system, 'Helvetica Neue', Arial, sans-serif"
const BODY_FONT = "'Inter', system-ui, -apple-system, 'Helvetica Neue', Arial, sans-serif"

// Shared dark palette — every task inherits this; only kicker/note differ.
const base = {
  dark: true,
  fontDisplay: DISPLAY_FONT,
  fontBody: BODY_FONT,
  bg: '#06100d',
  surface: '#0c1714',
  raised: '#11201b',
  text: '#eaf2ee',
  muted: '#8fa39a',
  line: 'rgba(255,255,255,0.08)',
  accent: '#19e3a8',
  accentSoft: 'rgba(21,211,154,0.12)',
  onAccent: '#04130d',
  glow: 'rgba(21,211,154,0.16)',
  radius: '1rem',
} satisfies Omit<TaskTheme, 'kicker' | 'note'>

export const taskThemes: Record<TaskKey, TaskTheme> = {
  article: { ...base, kicker: 'Articles', note: 'In-depth reads, guides and stories worth your time.' },
  listing: { ...base, kicker: 'Directory', note: 'Find, compare and connect with businesses, services and places.' },
  classified: { ...base, kicker: 'Marketplace', note: 'Fresh offers and listings, ready to act on.' },
  image: { ...base, kicker: 'Gallery', note: 'A visual feed of standout images and galleries.' },
  sbm: { ...base, kicker: 'Collections', note: 'Curated bookmarks, links and resources worth saving.' },
  pdf: { ...base, kicker: 'Library', note: 'Downloadable guides, reports and references.' },
  profile: { ...base, kicker: 'People', note: 'Discover creators, businesses and profiles.' },
}

export function getTaskTheme(task: TaskKey): TaskTheme {
  return taskThemes[task] || taskThemes.article
}

/** All `--tk-*` tokens + font overrides for a task surface, ready for `style`. */
export function taskThemeStyle(task: TaskKey): CSSProperties {
  const t = getTaskTheme(task)
  return {
    '--tk-bg': t.bg,
    '--tk-surface': t.surface,
    '--tk-raised': t.raised,
    '--tk-text': t.text,
    '--tk-muted': t.muted,
    '--tk-line': t.line,
    '--tk-accent': t.accent,
    '--tk-accent-soft': t.accentSoft,
    '--tk-on-accent': t.onAccent,
    '--tk-glow': t.glow,
    '--tk-radius': t.radius,
    // Re-point the shared article-body accent vars so post HTML (headings,
    // links) inherits this task's accent instead of the global site accent.
    '--slot4-accent': t.accent,
    '--slot4-accent-fill': t.accent,
    '--editable-font-display': t.fontDisplay,
    '--editable-font-body': t.fontBody,
    fontFamily: t.fontBody,
  } as CSSProperties
}
