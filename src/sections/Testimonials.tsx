import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { LuArrowLeft, LuArrowRight, LuQuote, LuStar } from 'react-icons/lu'
import { testimonials } from '../data/content'
import { SectionHeading } from '../components/SectionHeading'
import { Reveal } from '../components/Reveal'

export default function Testimonials() {
  const [[i, dir], setPage] = useState<[number, number]>([0, 1])
  const [paused, setPaused] = useState(false)
  const n = testimonials.length
  const go = (d: number) => setPage(([cur]) => [(cur + d + n) % n, d])
  const t = testimonials[i]

  useEffect(() => {
    if (paused || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const id = window.setInterval(() => go(1), 6500)
    return () => window.clearInterval(id)
  }, [paused, i])

  return (
    <section id="reviews" aria-labelledby="reviews-title" className="section-pad relative overflow-hidden">
      <div className="orb left-1/2 top-1/2 h-[560px] w-[560px] -translate-x-1/2 -translate-y-1/2 opacity-25" aria-hidden="true" />
      <div className="relative z-10 mx-auto max-w-5xl px-6 sm:px-10">
        <SectionHeading id="reviews-title" eyebrow="Loved by thousands" title="Real people." highlight="Real energy." />

        <Reveal>
          <div
            role="group"
            aria-roledescription="carousel"
            aria-label="Customer reviews"
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
            onFocus={() => setPaused(true)}
            onBlur={() => setPaused(false)}
            className="glass-strong relative overflow-hidden rounded-[2.25rem] p-8 sm:p-14"
          >
            <LuQuote className="absolute right-8 top-8 h-20 w-20 text-accent/15" aria-hidden="true" />

            <div className="relative min-h-[17rem] sm:min-h-[14rem]" aria-live={paused ? 'polite' : 'off'}>
              <AnimatePresence mode="wait" custom={dir}>
                <motion.figure
                  key={i}
                  custom={dir}
                  initial={{ opacity: 0, x: dir * 60, filter: 'blur(8px)' }}
                  animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
                  exit={{ opacity: 0, x: dir * -60, filter: 'blur(8px)' }}
                  transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                >
                  <div className="mb-5 flex gap-1" role="img" aria-label={`${t.rating} out of 5 stars`}>
                    {Array.from({ length: 5 }).map((_, s) => (
                      <LuStar key={s} className={s < t.rating ? 'fill-accent2 text-accent2' : 'text-white/20'} aria-hidden="true" />
                    ))}
                  </div>
                  <blockquote className="font-display text-[clamp(1.25rem,2.6vw,2rem)] font-medium leading-snug tracking-tight">
                    “{t.quote}”
                  </blockquote>
                  <figcaption className="mt-8 flex items-center gap-4">
                    <span className="grid h-12 w-12 place-items-center rounded-full bg-accent-gradient font-display font-bold text-black" aria-hidden="true">
                      {t.name.split(' ').map((p) => p[0]).join('')}
                    </span>
                    <span>
                      <span className="block font-semibold">{t.name}</span>
                      <span className="block text-sm text-white/50">{t.role}</span>
                    </span>
                  </figcaption>
                </motion.figure>
              </AnimatePresence>
            </div>

            <div className="mt-10 flex items-center justify-between">
              <div className="flex gap-2" role="group" aria-label="Choose review">
                {testimonials.map((x, d) => (
                  <button
                    key={x.name}
                    type="button"
                    aria-label={`Show review ${d + 1} of ${n}`}
                    aria-current={d === i}
                    onClick={() => setPage([d, d > i ? 1 : -1])}
                    className="grid h-6 place-items-center px-0.5"
                  >
                    <span className={`block h-1.5 rounded-full transition-all duration-500 ${d === i ? 'w-10 bg-accent-gradient' : 'w-4 bg-white/20'}`} />
                  </button>
                ))}
              </div>
              <div className="flex gap-2">
                <button type="button" onClick={() => go(-1)} aria-label="Previous review" className="glass grid h-12 w-12 place-items-center rounded-full hover:border-accent/60 hover:text-accent">
                  <LuArrowLeft aria-hidden="true" />
                </button>
                <button type="button" onClick={() => go(1)} aria-label="Next review" className="glass grid h-12 w-12 place-items-center rounded-full hover:border-accent/60 hover:text-accent">
                  <LuArrowRight aria-hidden="true" />
                </button>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
