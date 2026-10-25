import { lazy, Suspense, useEffect, useRef } from 'react'
import { LuArrowRight, LuChevronsDown } from 'react-icons/lu'
import { gsap, ScrollTrigger } from '../utils/gsap'
import { flavors } from '../data/flavors'
import { useFlavor } from '../context/FlavorContext'
import { useInViewport } from '../hooks/useInViewport'
import { MagneticButton } from '../components/MagneticButton'
import { SplitText } from '../components/SplitText'
import { navigateTo } from '../utils/navigation'

const HeroScene = lazy(() => import('../components/three/HeroScene'))

const heroStats = [
  { k: '0g', v: 'Sugar' },
  { k: '200mg', v: 'Natural caffeine' },
  { k: '8', v: 'Flavors' },
]

export default function Hero({ ready }: { ready: boolean }) {
  const root = useRef<HTMLElement>(null)
  const stage = useRef<HTMLDivElement>(null)
  const progress = useRef(0)
  const { flavor, index, select } = useFlavor()
  const visible = useInViewport(stage, '100px')

  useEffect(() => {
    if (!ready) return
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power4.out' } })
      tl.from('.hero-eyebrow', { y: 24, opacity: 0, filter: 'blur(8px)', duration: 1 })
        .from(
          '.hero-title .split-word',
          { yPercent: 120, rotate: 5, opacity: 0, filter: 'blur(14px)', duration: 1.3, stagger: 0.14 },
          '-=0.6',
        )
        .from('.hero-sub', { y: 28, opacity: 0, filter: 'blur(8px)', duration: 1 }, '-=0.8')
        .from('.hero-cta > *', { y: 24, opacity: 0, scale: 0.92, duration: 0.9, stagger: 0.12 }, '-=0.7')
        .fromTo(
          '.hero-dots button',
          { scale: 0, opacity: 0 },
          { scale: 1, opacity: 1, duration: 0.6, stagger: 0.05, ease: 'back.out(2)', clearProps: 'transform,opacity' },
          '-=0.6',
        )
        .from('.hero-stat', { y: 30, opacity: 0, duration: 0.9, stagger: 0.1 }, '-=0.6')
        .from('.hero-scroll', { opacity: 0, y: -10, duration: 0.8 }, '-=0.4')

      ScrollTrigger.create({
        trigger: root.current,
        start: 'top top',
        end: 'bottom top',
        scrub: true,
        onUpdate: (s) => {
          progress.current = s.progress
        },
      })
      gsap.to('.hero-copy', {
        yPercent: -14,
        opacity: 0,
        ease: 'none',
        scrollTrigger: { trigger: root.current, start: 'top top', end: '70% top', scrub: true },
      })
      gsap.to('.hero-orb', {
        yPercent: 40,
        ease: 'none',
        scrollTrigger: { trigger: root.current, start: 'top top', end: 'bottom top', scrub: true },
      })
    }, root)
    return () => ctx.revert()
  }, [ready])

  return (
    <section
      id="top"
      ref={root}
      aria-label="EMBER zero sugar energy drink"
      className="relative flex min-h-[100svh] items-end overflow-hidden md:items-center"
    >
      <div className="orb hero-orb -right-40 top-10 h-[640px] w-[640px] opacity-70" aria-hidden="true" />
      <div className="orb -left-48 bottom-0 h-[520px] w-[520px] opacity-40" aria-hidden="true" />
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[radial-gradient(60%_50%_at_75%_45%,rgb(var(--ar)_var(--ag)_var(--ab)/0.16),transparent_70%)]"
      />

      {/* 3D stage (lazy-loaded) */}
      <div ref={stage} className="absolute inset-0 z-[2]" role="img" aria-label={`3D ${flavor.name} energy drink can floating and rotating`}>
        {ready && (
          <Suspense fallback={null}>
            <HeroScene flavor={flavor} progress={progress} ready={ready} running={visible} />
          </Suspense>
        )}
      </div>

      <div className="hero-copy pointer-events-none relative z-10 mx-auto w-full max-w-7xl px-6 pb-14 pt-28 sm:px-10 md:pb-24 md:pt-32">
        <div className="max-w-2xl">
          <p className="hero-eyebrow mb-6 inline-flex items-center gap-3 rounded-full glass px-4 py-2 text-xs font-semibold uppercase tracking-[0.28em] text-white/80">
            <span className="h-2 w-2 animate-pulseGlow rounded-full bg-accent" aria-hidden="true" />
            Zero sugar · Natural energy
          </p>

          <h1 className="hero-title text-[clamp(3.4rem,10.5vw,8.8rem)] font-extrabold leading-[0.92] tracking-[-0.04em]">
            <SplitText text="Fuel the" />
            <br />
            <SplitText text="Future." wordClassName="text-gradient" />
          </h1>

          <p className="hero-sub mt-6 max-w-md text-base sm:mt-8 sm:text-lg leading-relaxed text-white/65 md:text-xl">
            Eight bold flavors. Zero sugar. Clean natural caffeine that lifts you up and never lets you down.
          </p>

          <div className="hero-cta pointer-events-auto mt-8 flex flex-wrap items-center gap-3 sm:mt-10 sm:gap-4">
            <MagneticButton href="#flavors" onClick={(e) => { e.preventDefault(); navigateTo('flavors') }}>
              Explore Flavors <LuArrowRight aria-hidden="true" className="transition-transform group-hover:translate-x-1" />
            </MagneticButton>
            <MagneticButton variant="ghost" href="#nutrition" onClick={(e) => { e.preventDefault(); navigateTo('nutrition') }}>
              See Nutrition
            </MagneticButton>
          </div>

          <div className="hero-dots pointer-events-auto mt-10 hidden flex-wrap items-center gap-2.5 sm:flex" role="group" aria-label="Preview flavor on the can">
            {flavors.map((f, i) => (
              <button
                key={f.id}
                type="button"
                onClick={() => select(i, false)}
                aria-label={`Show ${f.name} can`}
                aria-pressed={i === index}
                className="group/dot grid h-7 w-7 place-items-center rounded-full border border-white/15"
              >
                <span
                  className={`block rounded-full transition-all duration-300 group-hover/dot:scale-125 ${i === index ? 'h-4 w-4 ring-2 ring-white/70' : 'h-3 w-3'}`}
                  style={{ background: f.accent }}
                />
              </button>
            ))}
            <span className="ml-2 text-sm font-medium text-white/60" aria-live="polite">{flavor.name}</span>
          </div>
        </div>

        <dl className="mt-14 hidden max-w-xl grid-cols-3 gap-3 sm:grid sm:gap-5">
          {heroStats.map((s) => (
            <div key={s.v} className="hero-stat glass rounded-2xl px-4 py-4 sm:px-6">
              <dt className="order-2 mt-1 text-[0.7rem] font-medium uppercase tracking-wider text-white/50 sm:text-xs">{s.v}</dt>
              <dd className="font-display text-2xl font-bold text-gradient sm:text-3xl">{s.k}</dd>
            </div>
          ))}
        </dl>
      </div>

      <a
        href="#about"
        onClick={(e) => { e.preventDefault(); navigateTo('about') }}
        className="hero-scroll absolute bottom-6 left-1/2 z-10 hidden -translate-x-1/2 flex-col items-center gap-2 text-[0.65rem] font-semibold uppercase tracking-[0.35em] text-white/45 hover:text-white md:flex"
      >
        Scroll
        <LuChevronsDown className="animate-float" aria-hidden="true" />
      </a>
    </section>
  )
}
