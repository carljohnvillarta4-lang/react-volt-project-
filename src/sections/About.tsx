import { useEffect, useRef } from 'react'
import { gsap, ScrollTrigger } from '../utils/gsap'
import { stats } from '../data/content'
import { Reveal } from '../components/Reveal'

const statement =
  'We built EMBER for people who want real energy without the baggage. No sugar spikes. No crash. Just clean natural caffeine, honest ingredients and flavors worth getting excited about.'

export default function About() {
  const root = useRef<HTMLElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Scroll-scrubbed word reveal
      gsap.fromTo(
        '.about-word',
        { opacity: 0.14, filter: 'blur(4px)' },
        {
          opacity: 1,
          filter: 'blur(0px)',
          stagger: 0.12,
          ease: 'none',
          scrollTrigger: { trigger: '.about-text', start: 'top 82%', end: 'bottom 45%', scrub: 0.6 },
        },
      )

      // Count-up stats
      gsap.utils.toArray<HTMLElement>('.stat-num').forEach((el) => {
        const end = Number(el.dataset.value)
        const obj = { v: 0 }
        ScrollTrigger.create({
          trigger: el,
          start: 'top 90%',
          once: true,
          onEnter: () =>
            gsap.to(obj, {
              v: end,
              duration: 1.8,
              ease: 'power3.out',
              onUpdate: () => {
                el.textContent = String(Math.round(obj.v))
              },
            }),
        })
      })

      // Parallax orbs
      gsap.to('.about-orb-a', {
        yPercent: -60,
        ease: 'none',
        scrollTrigger: { trigger: root.current, start: 'top bottom', end: 'bottom top', scrub: true },
      })
      gsap.to('.about-orb-b', {
        yPercent: 50,
        ease: 'none',
        scrollTrigger: { trigger: root.current, start: 'top bottom', end: 'bottom top', scrub: true },
      })
    }, root)
    return () => ctx.revert()
  }, [])

  return (
    <section id="about" ref={root} aria-labelledby="about-title" className="section-pad relative overflow-hidden">
      <div className="orb about-orb-a -left-32 top-10 h-[420px] w-[420px] opacity-40" aria-hidden="true" />
      <div className="orb about-orb-b -right-32 bottom-0 h-[460px] w-[460px] opacity-30" aria-hidden="true" />

      <div className="relative z-10 mx-auto max-w-6xl px-6 sm:px-10">
        <Reveal blur={8} y={20}>
          <p className="mb-8 inline-flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.3em] text-accent">
            <span className="h-px w-8 bg-accent" aria-hidden="true" />
            About EMBER
          </p>
        </Reveal>
        <h2 id="about-title" className="sr-only">
          About EMBER
        </h2>

        <p className="about-text font-display text-[clamp(1.7rem,4.2vw,3.5rem)] font-semibold leading-[1.18] tracking-tight">
          {statement.split(' ').map((w, i) => (
            <span key={i} className="about-word inline-block">
              {w}&nbsp;
            </span>
          ))}
        </p>

        <dl className="mt-20 grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6">
          {stats.map((s, i) => (
            <Reveal key={s.label} delay={i * 0.08}>
              <div className="glass spotlight-card rounded-3xl p-6 md:p-8">
                <dd className="font-display text-5xl font-bold tracking-tight md:text-6xl">
                  <span className="stat-num text-gradient" data-value={s.value}>
                    0
                  </span>
                  <span className="text-accent">{s.suffix}</span>
                </dd>
                <dt className="mt-3 text-sm text-white/55">{s.label}</dt>
              </div>
            </Reveal>
          ))}
        </dl>
      </div>
    </section>
  )
}
