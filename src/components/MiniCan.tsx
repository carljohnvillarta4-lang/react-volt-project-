import type { Flavor } from '../data/flavors'

/** Lightweight CSS can used in the flavor slider (no extra WebGL contexts). */
export function MiniCan({ flavor, className = '' }: { flavor: Flavor; className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={`relative mx-auto h-36 w-[4.5rem] rounded-[1.1rem] ${className}`}
      style={{
        background: `linear-gradient(90deg, ${flavor.canDark} 0%, ${flavor.can} 28%, ${flavor.accent2} 46%, ${flavor.can} 64%, ${flavor.canDark} 100%)`,
        boxShadow: `0 18px 40px -10px ${flavor.accent}88, inset 0 0 0 1px rgba(255,255,255,0.12)`,
      }}
    >
      <span className="absolute inset-x-1 top-0 h-3 rounded-t-[1rem] bg-gradient-to-b from-white/70 to-white/10" />
      <span className="absolute inset-x-1 bottom-0 h-3 rounded-b-[1rem] bg-gradient-to-t from-white/40 to-transparent" />
      <span className="absolute inset-0 flex items-center justify-center">
        <span className="-rotate-90 whitespace-nowrap font-display text-[0.62rem] font-extrabold uppercase italic tracking-widest text-white/95">
          {flavor.name}
        </span>
      </span>
    </div>
  )
}
