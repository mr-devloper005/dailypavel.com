/*
  Cyrclo-style hero backdrop: the latest posts' images arranged as a ring of
  tiles slowly orbiting the centered wordmark. The whole ring rotates; each
  tile counter-rotates so images stay near-upright. Deterministic placement →
  no hydration mismatch. Rotation is paused for prefers-reduced-motion users
  (handled in editable-global.css).
*/
export function EditableHeroCollage({ images }: { images: string[] }) {
  const pool = images.length ? images : ['/placeholder.svg?height=480&width=480']
  const TILES = 16
  const RADIUS = 322

  const tiles = Array.from({ length: TILES }, (_, i) => {
    const angle = (360 / TILES) * i
    // Deterministic per-tile tilt for a hand-scattered feel.
    const jitter = ((i * 53) % 15) - 7
    return { angle, jitter, src: pool[i % pool.length] }
  })

  return (
    <div className="absolute inset-0 flex items-center justify-center overflow-hidden" aria-hidden="true">
      <div className="relative h-[720px] w-[720px] scale-[0.6] sm:scale-[0.78] lg:scale-100">
        <div className="editable-orbit absolute inset-0">
          {tiles.map((tile, i) => (
            <div
              key={i}
              className="absolute left-1/2 top-1/2"
              style={{ transform: `translate(-50%, -50%) rotate(${tile.angle}deg) translateY(-${RADIUS}px) rotate(${-tile.angle}deg)` }}
            >
              <div className="editable-orbit-tile">
                <div style={{ transform: `rotate(${tile.jitter}deg)` }}>
                  <div className="h-[104px] w-[104px] overflow-hidden rounded-[1.25rem] border border-white/10 bg-[var(--slot4-media-bg)] shadow-[0_14px_36px_rgba(0,0,0,0.7)] sm:h-[120px] sm:w-[120px]">
                    <img src={tile.src} alt="" className="h-full w-full object-cover opacity-90" loading={i < 5 ? 'eager' : 'lazy'} />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
