import { lazy, Suspense, useEffect, useRef, type KeyboardEvent } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { LuArrowLeft, LuArrowRight, LuFlame, LuMousePointerClick, LuUndo2 } from 'react-icons/lu'
import { flavors } from '../data/flavors'
import { useFlavor } from '../context/FlavorContext'
import { useInViewport } from '../hooks/useInViewport'
import { SectionHeading } from '../components/SectionHeading'
import { MiniCan } from '../components/MiniCan'
import { Reveal } from '../components/Reveal'

const LineupScene = lazy(() => import('../components/three/LineupScene'))

/** Letter-by-letter animated flavor title (words never break mid-word). */
function AnimatedTitle({ text }: { text: string }) {
  let n = 0
  return (
    <h3 className="font-display text-[clamp(2.2rem,4.2vw,3.4rem)] font-extrabold leading-[1.02] tracking-tight" aria-label={text}>
      {text.split(' ').map((word, w) => (
        <span key={w} aria-hidden="true" className="inline-block whitespace-nowrap">
          {word.split('').map((c) => (
            <motion.span
              key={n}
              className="inline-block text-gradient"
              initial={{ y: 40, opacity: 0, filter: 'blur(10px)', rotate: 6 }}
              animate={{ y: 0, opacity: 1, filter: 'blur(0px)', rotate: 0 }}
              transition={{ duration: 0.7, delay: 0.03 * n++, ease: [0.22, 1, 0.36, 1] }}
            >
              {c}
            </motion.span>
          ))}
          {w < text.split(' ').length - 1 && '\u00A0'}
        </span>
      ))}
    </h3>
  )
}

export default function Flavors() {
  const { index, flavor, focused, select, setFocused, next, prev } = useFlavor()
  const stage = useRef<HTMLDivElement>(null)
  const rail = useRef<HTMLDivElement>(null)
  const inView = useInViewport(stage, '250px')

  // keep the selected card centered in the horizontal slider (horizontal only: no page jumping)
  useEffect(() => {
    const r = rail.current
    const card = r?.children[index] as HTMLElement | undefined
    if (!r || !card) return
    r.scrollTo({ left: card.offsetLeft - (r.clientWidth - card.clientWidth) / 2, behavior: 'smooth' })
  }, [index])

  const onKey = (e: KeyboardEvent) => {
    if (e.key === 'ArrowRight') {
      e.preventDefault()
      next()
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault()
      prev()
    } else if (e.key === 'Escape') setFocused(false)
  }

  return (
    <section id="flavors" aria-labelledby="flavors-title" className="section-pad relative">
      <div className="mx-auto max-w-7xl px-4 sm:px-8">
        <SectionHeading
          id="flavors-title"
          eyebrow="The Collection"
          title="Pick your"
          highlight="power."
          text="Hover a can to wake it up. Click to zoom in and see what's inside, or glide through the slider below."
        />

        {/* ── 3D stage ───────────────────────────────────────────── */}
        <Reveal scale={1} y={60}>
          <div
            ref={stage}
            onKeyDown={onKey}
            className="relative h-[86svh] min-h-[560px] overflow-hidden rounded-[2rem] border border-white/10 shadow-[0_40px_120px_-30px_rgba(0,0,0,0.9)] md:h-[78vh] md:max-h-[820px]"
            style={{
              background:
                'radial-gradient(120% 90% at 50% 0%, rgb(var(--tr) var(--tg) var(--tb)) 0%, rgb(calc(var(--tr) * 0.35) calc(var(--tg) * 0.35) calc(var(--tb) * 0.35)) 55%, #040404 100%)',
            }}
          >
            <div aria-hidden="true" className="orb left-1/2 top-1/3 h-[560px] w-[560px] -translate-x-1/2 opacity-40" />

            <div
              className="absolute inset-0"
              role="img"
              aria-label="Interactive 3D lineup of eight EMBER energy drink cans. Use the flavor slider below to browse with the keyboard."
            >
              <Suspense fallback={<div className="grid h-full place-items-center text-sm text-white/40">Loading 3D…</div>}>
                {inView || focused ? (
                  <LineupScene running={inView} index={index} focused={focused} onSelect={(i) => select(i, true)} />
                ) : null}
              </Suspense>
            </div>

            {/* top-left status */}
            <div className="pointer-events-none absolute left-5 top-5 flex items-center gap-3 sm:left-8 sm:top-8">
              <span className="glass rounded-full px-4 py-2 font-display text-sm font-semibold tabular-nums">
                {String(index + 1).padStart(2, '0')} <span className="text-white/40">/ {String(flavors.length).padStart(2, '0')}</span>
              </span>
            </div>

            {/* back button */}
            <AnimatePresence>
              {focused && (
                <motion.button
                  type="button"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  onClick={() => setFocused(false)}
                  className="glass absolute right-5 top-5 z-10 flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium hover:border-accent/60 sm:right-8 sm:top-8"
                >
                  <LuUndo2 aria-hidden="true" /> Back to lineup
                </motion.button>
              )}
            </AnimatePresence>

            {/* hint when not focused */}
            <AnimatePresence>
              {!focused && (
                <motion.p
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 12 }}
                  className="glass pointer-events-none absolute bottom-6 left-1/2 flex -translate-x-1/2 items-center gap-2.5 whitespace-nowrap rounded-full px-5 py-3 text-sm text-white/80"
                >
                  <LuMousePointerClick aria-hidden="true" className="text-accent" /> Click a can to explore
                </motion.p>
              )}
            </AnimatePresence>

            {/* info panel: fades in once a can is focused */}
            <AnimatePresence>
              {focused && (
                <motion.aside
                  key="panel"
                  aria-live="polite"
                  aria-label={`${flavor.name} details`}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 30 }}
                  transition={{ duration: 0.7, delay: 0.55, ease: [0.22, 1, 0.36, 1] }}
                  className="glass-strong absolute inset-x-4 bottom-4 max-h-[52%] overflow-y-auto rounded-[1.75rem] p-5 sm:inset-x-6 sm:bottom-6 md:inset-x-auto md:bottom-8 md:right-8 md:top-24 md:max-h-none md:w-[26rem] md:p-8"
                >
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={flavor.id}
                      initial={{ opacity: 0, filter: 'blur(8px)' }}
                      animate={{ opacity: 1, filter: 'blur(0px)' }}
                      exit={{ opacity: 0, filter: 'blur(8px)' }}
                      transition={{ duration: 0.35 }}
                    >
                      <p className="mb-3 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.25em] text-accent">
                        <LuFlame aria-hidden="true" /> {flavor.tagline}
                      </p>
                      <AnimatedTitle text={flavor.name} />
                      <motion.p
                        initial={{ opacity: 0, y: 14 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.25, duration: 0.6 }}
                        className="mt-4 text-sm leading-relaxed text-white/65 md:text-base"
                      >
                        {flavor.description}
                      </motion.p>

                      <motion.ul
                        aria-label="Ingredients"
                        className="mt-5 flex flex-wrap gap-2"
                        initial="hidden"
                        animate="show"
                        variants={{ hidden: {}, show: { transition: { staggerChildren: 0.06, delayChildren: 0.35 } } }}
                      >
                        {flavor.ingredients.map((ing) => (
                          <motion.li
                            key={ing}
                            variants={{ hidden: { opacity: 0, scale: 0.8 }, show: { opacity: 1, scale: 1 } }}
                            className="rounded-full border border-white/12 bg-white/5 px-3 py-1.5 text-xs font-medium text-white/80"
                          >
                            {ing}
                          </motion.li>
                        ))}
                      </motion.ul>

                      <dl className="mt-6 grid grid-cols-3 gap-3">
                        {[
                          { l: 'Sugar', v: `${flavor.sugar}g` },
                          { l: 'Calories', v: String(flavor.calories) },
                          { l: 'Caffeine', v: `${flavor.caffeine}mg` },
                        ].map((s) => (
                          <div key={s.l} className="rounded-2xl bg-white/5 p-3 text-center ring-1 ring-white/10">
                            <dd className="font-display text-xl font-bold text-gradient">{s.v}</dd>
                            <dt className="mt-0.5 text-[0.65rem] uppercase tracking-wider text-white/50">{s.l}</dt>
                          </div>
                        ))}
                      </dl>

                      <div className="mt-5">
                        <div className="mb-2 flex items-center justify-between text-xs font-semibold uppercase tracking-wider">
                          <span className="text-white/60">Energy level</span>
                          <span className="text-accent">{flavor.energy}%</span>
                        </div>
                        <div
                          className="h-2.5 overflow-hidden rounded-full bg-white/10"
                          role="meter"
                          aria-valuemin={0}
                          aria-valuemax={100}
                          aria-valuenow={flavor.energy}
                          aria-label="Energy level"
                        >
                          <motion.div
                            className="h-full rounded-full bg-accent-gradient shadow-glow"
                            initial={{ width: 0 }}
                            animate={{ width: `${flavor.energy}%` }}
                            transition={{ duration: 1.1, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
                          />
                        </div>
                      </div>
                    </motion.div>
                  </AnimatePresence>
                </motion.aside>
              )}
            </AnimatePresence>
          </div>
        </Reveal>

        {/* ── horizontal flavor slider ───────────────────────────── */}
        <div className="mt-10" role="group" aria-roledescription="carousel" aria-label="Flavor slider" onKeyDown={onKey}>
          <div className="mb-5 flex items-center justify-between px-1">
            <p className="text-sm text-white/50">
              Selected: <span className="font-semibold text-white">{flavor.name}</span>
            </p>
            <div className="flex gap-2">
              <button type="button" onClick={prev} aria-label="Previous flavor" className="glass grid h-12 w-12 place-items-center rounded-full transition-colors hover:border-accent/60 hover:text-accent">
                <LuArrowLeft aria-hidden="true" />
              </button>
              <button type="button" onClick={next} aria-label="Next flavor" className="glass grid h-12 w-12 place-items-center rounded-full transition-colors hover:border-accent/60 hover:text-accent">
                <LuArrowRight aria-hidden="true" />
              </button>
            </div>
          </div>

          <div
            ref={rail}
            className="scrollbar-hide -mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-6 pt-2 sm:-mx-8 sm:px-8"
          >
            {flavors.map((f, i) => {
              const on = i === index
              return (
                <button
                  key={f.id}
                  type="button"
                  aria-pressed={on}
                  aria-label={`${f.name}: ${f.tagline}`}
                  onClick={() => select(i, true)}
                  className={`group relative w-[15.5rem] shrink-0 snap-center rounded-[1.75rem] p-5 text-left transition-all duration-500 ${
                    on ? 'glass-strong -translate-y-2 border-accent/60 shadow-glow' : 'glass hover:-translate-y-1'
                  }`}
                >
                  <div className="transition-transform duration-500 group-hover:scale-105 group-hover:-rotate-3">
                    <MiniCan flavor={f} />
                  </div>
                  <p className="mt-5 font-display text-lg font-bold tracking-tight">{f.name}</p>
                  <p className="mt-1 line-clamp-2 text-sm text-white/50">{f.tagline}</p>
                  <div className="mt-4 flex items-center justify-between text-xs font-semibold uppercase tracking-wider text-white/50">
                    <span>{f.sugar}g sugar</span>
                    <span style={{ color: f.accent }}>{f.energy}% energy</span>
                  </div>
                </button>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
