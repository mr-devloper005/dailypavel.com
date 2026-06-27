// ✏️ EDITABLE — theme the ads to match this site. Devs own this file.
// You control the LOOK here (radius, border, shadow, background, label color).
// You CANNOT change the ad's shape/fit from here — that stays locked in
// src/lib/ad-slots.ts, so the ad always displays correctly no matter what.

import type { AdSkin } from '@/lib/ads/ad-frame'

// Site-wide default skin — dark, glassy, emerald-trimmed to match the site.
export const adSkin: AdSkin = {
  radius: '18px',
  border: '1px solid rgba(255,255,255,0.10)',
  shadow: '0 18px 50px rgba(0,0,0,0.55)',
  background: '#0c1714',
  labelClassName: 'bg-[#15d39a] text-[#04130d]',
}

// Optional per-slot overrides — adjust only where you need to.
export const adSkinBySlot: Partial<Record<string, AdSkin>> = {
  sidebar: { radius: '16px', shadow: 'none', border: '1px solid rgba(255,255,255,0.08)' },
  popup: { radius: '24px' },
  header: { radius: '20px', background: '#0a1310' },
}

/** Merge site default + per-slot override for a slot. */
export function skinFor(slot: string): AdSkin {
  return { ...adSkin, ...(adSkinBySlot[slot] ?? {}) }
}
