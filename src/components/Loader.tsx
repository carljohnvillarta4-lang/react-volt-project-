import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { gsap } from '../utils/gsap'

/** Cinematic intro: a can outline fills with energy while a counter ticks to 100. */
export function Loader({ onDone }: { onDone: () => void }) {
  const [pct, setPct] = useState(0)
  const fill = useRef<SVGRectElement>(null)
  const done = useRef(onDone)
  done.current = onDone

  useEffect(() => {
    const state = { v: 0 }
    const tween = gsap.to(state, {
      v: 100,
      duration: 2.4,
      ease: 'power2.inOut',
      onUpdate: () => {
        setPct(Math.round(state.v))
        if (fill.current) fill.current.setAttribute('y', String(160 - (state.v / 100) * 150))
      },
      onComplete: () => {
        window.setTimeout(() => done.current(), 350)
      },
    })
    return () => {
      tween.kill()
    }
  }, [])

  return (
    <motion.div
      role="status"
      aria-live="polite"
      aria-label={`Loading ${pct} percent`}
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-ink"
      exit={{ opacity: 0, scale: 1.04, filter: 'blur(14px)' }}
      transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
    >
      <div className="orb left-1/2 top-1/2 h-[480px] w-[480px] -translate-x-1/2 -translate-y-1/2 opacity-60" aria-hidden="true" />

      <svg viewBox="0 0 100 170" className="relative h-44 w-auto drop-shadow-[0_0_30px_rgba(255,106,26,0.55)]" aria-hidden="true">
        <defs>
          <clipPath id="can-clip">
            <path d="M18 14 Q18 6 26 6 H74 Q82 6 82 14 V156 Q82 164 74 164 H26 Q18 164 18 156 Z" />
          </clipPath>
          <linearGradient id="can-fill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#ffb020" />
            <stop offset="1" stopColor="#ff5a1a" />
          </linearGradient>
        </defs>
        <g clipPath="url(#can-clip)">
          <rect x="0" y="0" width="100" height="170" fill="rgba(255,255,255,0.05)" />
          <rect ref={fill} x="0" y="160" width="100" height="170" fill="url(#can-fill)" />
        </g>
        <path
          d="M18 14 Q18 6 26 6 H74 Q82 6 82 14 V156 Q82 164 74 164 H26 Q18 164 18 156 Z"
          fill="none"
          stroke="rgba(255,255,255,0.6)"
          strokeWidth="1.5"
        />
        <path d="M54 40 36 86h14l-5 38 22-52H53z" fill="#050505" opacity="0.85" />
      </svg>

      <p className="relative mt-8 font-display text-6xl font-bold tabular-nums tracking-tight">
        {pct}
        <span className="text-accent">%</span>
      </p>
      <p className="relative mt-3 text-xs font-semibold uppercase tracking-[0.5em] text-white/50">Charging EMBER</p>
    </motion.div>
  )
}
