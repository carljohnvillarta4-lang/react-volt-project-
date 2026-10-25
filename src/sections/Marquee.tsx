import { marqueeWords } from '../data/content'

export default function Marquee() {
  const row = [...marqueeWords, ...marqueeWords]
  return (
    <div
      className="relative z-10 overflow-hidden border-y border-white/10 bg-black/40 py-6 backdrop-blur-sm"
      aria-hidden="true"
    >
      <div className="flex w-max animate-marquee gap-12 whitespace-nowrap">
        {[...row, ...row].map((w, i) => (
          <span key={i} className="flex items-center gap-12 font-display text-4xl font-extrabold uppercase tracking-tight md:text-6xl">
            <span className={i % 2 ? 'text-gradient' : 'text-outline'}>{w}</span>
            <svg viewBox="0 0 24 24" className="h-7 w-7 shrink-0 text-accent md:h-9 md:w-9" fill="currentColor">
              <path d="M13.5 2 5 14h6l-1.5 8L19 9h-6.5z" />
            </svg>
          </span>
        ))}
      </div>
    </div>
  )
}
