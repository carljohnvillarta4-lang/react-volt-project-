import { motion } from 'framer-motion'
import { flavors } from '../data/flavors'
import { nutritionFacts } from '../data/content'
import { useFlavor } from '../context/FlavorContext'
import { SectionHeading } from '../components/SectionHeading'
import { AnimatedNumber } from '../components/AnimatedNumber'
import { Reveal } from '../components/Reveal'

export default function Nutrition() {
  const { index, flavor, select } = useFlavor()

  return (
    <section id="nutrition" aria-labelledby="nutrition-title" className="section-pad relative">
      <div className="mx-auto max-w-7xl px-6 sm:px-10">
        <SectionHeading
          id="nutrition-title"
          eyebrow="Nutrition"
          title="Numbers you can"
          highlight="feel good about."
          text="Choose a flavor to see its full label, and how it stacks up against the rest of the lineup."
        />

        {/* flavor tabs */}
        <Reveal>
          <div role="tablist" aria-label="Choose a flavor" className="scrollbar-hide mb-10 flex gap-2 overflow-x-auto pb-2 md:flex-wrap md:justify-center">
            {flavors.map((f, i) => (
              <button
                key={f.id}
                role="tab"
                id={`tab-${f.id}`}
                aria-selected={i === index}
                aria-controls="nutrition-panel"
                tabIndex={i === index ? 0 : -1}
                onClick={() => select(i, false)}
                onKeyDown={(e) => {
                  if (e.key === 'ArrowRight') select(i + 1, false)
                  if (e.key === 'ArrowLeft') select(i - 1, false)
                }}
                className={`shrink-0 whitespace-nowrap rounded-full px-5 py-2.5 text-sm font-semibold transition-all duration-300 ${
                  i === index ? 'bg-accent-gradient text-black shadow-glow' : 'glass text-white/70 hover:text-white'
                }`}
              >
                {f.name}
              </button>
            ))}
          </div>
        </Reveal>

        <div id="nutrition-panel" role="tabpanel" aria-labelledby={`tab-${flavor.id}`} className="grid gap-6 lg:grid-cols-[minmax(0,26rem)_1fr]">
          {/* label */}
          <Reveal>
            <div className="glass-strong rounded-[2rem] p-7 sm:p-9">
              <h3 className="font-display text-3xl font-extrabold leading-none tracking-tight">Nutrition Facts</h3>
              <p className="mt-2 text-sm text-white/50">1 can (250 ml) · {flavor.name}</p>
              <div className="my-5 h-2 rounded-full bg-white" aria-hidden="true" />
              <div className="flex items-end justify-between">
                <span className="text-sm font-semibold uppercase tracking-wider text-white/60">Calories</span>
                <span className="font-display text-6xl font-extrabold leading-none text-gradient">
                  <AnimatedNumber value={flavor.calories} />
                </span>
              </div>
              <div className="my-5 h-1 rounded-full bg-white/80" aria-hidden="true" />

              <dl className="divide-y divide-white/10 text-sm">
                <div className="flex justify-between py-2.5">
                  <dt className="font-semibold">Total Sugars</dt>
                  <dd className="tabular-nums text-accent">{flavor.sugar} g</dd>
                </div>
                <div className="flex justify-between py-2.5">
                  <dt className="font-semibold">Caffeine</dt>
                  <dd className="tabular-nums text-accent">
                    <AnimatedNumber value={flavor.caffeine} /> mg
                  </dd>
                </div>
                {nutritionFacts.map((n) => (
                  <div key={n.label} className="flex justify-between py-2.5">
                    <dt className="text-white/70">{n.label}</dt>
                    <dd className="tabular-nums text-white/90">
                      {n.value} {n.dv && <span className="ml-2 text-white/40">{n.dv}</span>}
                    </dd>
                  </div>
                ))}
              </dl>
              <p className="mt-5 text-xs leading-relaxed text-white/40">
                Percent Daily Values are based on a 2,000 calorie diet. Not recommended for children, pregnant or nursing women.
              </p>
            </div>
          </Reveal>

          {/* comparison bars */}
          <Reveal delay={0.12}>
            <div className="glass h-full rounded-[2rem] p-7 sm:p-9">
              <div className="mb-8 flex items-baseline justify-between">
                <h3 className="text-2xl font-bold tracking-tight">Energy level</h3>
                <span className="text-sm text-white/45">relative · higher = stronger</span>
              </div>
              <ul className="space-y-4">
                {flavors.map((f, i) => {
                  const on = i === index
                  return (
                    <li key={f.id}>
                      <button
                        type="button"
                        onClick={() => select(i, false)}
                        aria-label={`${f.name}: energy ${f.energy} percent, ${f.caffeine} milligrams caffeine`}
                        className="group block w-full text-left"
                      >
                        <div className="mb-1.5 flex items-center justify-between text-sm">
                          <span className={`font-semibold transition-colors ${on ? 'text-white' : 'text-white/55 group-hover:text-white'}`}>
                            {f.name}
                          </span>
                          <span className="tabular-nums text-white/45">
                            {f.caffeine} mg · <span style={{ color: on ? f.accent : undefined }}>{f.energy}%</span>
                          </span>
                        </div>
                        <div className="h-3 overflow-hidden rounded-full bg-white/8 ring-1 ring-white/5">
                          <motion.div
                            className="h-full rounded-full"
                            style={{
                              background: `linear-gradient(90deg, ${f.accent2}, ${f.accent})`,
                              opacity: on ? 1 : 0.45,
                              boxShadow: on ? `0 0 24px ${f.accent}99` : 'none',
                            }}
                            initial={{ width: 0 }}
                            whileInView={{ width: `${f.energy}%` }}
                            viewport={{ once: true }}
                            transition={{ duration: 1.2, delay: 0.05 * i, ease: [0.22, 1, 0.36, 1] }}
                          />
                        </div>
                      </button>
                    </li>
                  )
                })}
              </ul>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
