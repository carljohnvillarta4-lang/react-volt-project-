import { motion } from 'framer-motion'
import { ingredients } from '../data/content'
import { SectionHeading } from '../components/SectionHeading'
import { Reveal } from '../components/Reveal'

export default function Ingredients() {
  return (
    <section id="ingredients" aria-labelledby="ingredients-title" className="section-pad relative overflow-hidden">
      <div className="orb -right-40 top-1/4 h-[520px] w-[520px] opacity-30" aria-hidden="true" />
      <div className="relative z-10 mx-auto max-w-7xl px-6 sm:px-10">
        <SectionHeading
          id="ingredients-title"
          eyebrow="What's inside"
          title="Honest ingredients,"
          highlight="nothing to hide."
          text="Four hard-working ingredients power every can. No artificial colors, flavors or preservatives."
        />

        <ul className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {ingredients.map((ing, i) => {
            const Icon = ing.icon
            return (
              <li key={ing.name}>
                <Reveal delay={i * 0.1} className="h-full">
                  <motion.article
                    tabIndex={0}
                    whileHover="hover"
                    whileFocus="hover"
                    initial="rest"
                    animate="rest"
                    variants={{ rest: { y: 0 }, hover: { y: -10 } }}
                    transition={{ type: 'spring', stiffness: 260, damping: 22 }}
                    className="glass spotlight-card group relative flex h-full min-h-[22rem] flex-col rounded-[2rem] p-8"
                    onMouseMove={(e) => {
                      const r = e.currentTarget.getBoundingClientRect()
                      e.currentTarget.style.setProperty('--mx', `${e.clientX - r.left}px`)
                      e.currentTarget.style.setProperty('--my', `${e.clientY - r.top}px`)
                    }}
                  >
                    <span className="absolute right-7 top-6 font-display text-6xl font-extrabold text-white/[0.05] transition-colors duration-500 group-hover:text-accent/20">
                      0{i + 1}
                    </span>

                    <motion.div
                      variants={{ rest: { rotate: 0, scale: 1 }, hover: { rotate: -10, scale: 1.12 } }}
                      transition={{ type: 'spring', stiffness: 300, damping: 14 }}
                      className="mb-8 grid h-16 w-16 place-items-center rounded-2xl bg-accent-gradient text-black shadow-glow"
                    >
                      <Icon size={30} aria-hidden="true" />
                    </motion.div>

                    <h3 className="text-2xl font-bold tracking-tight">{ing.name}</h3>
                    <p className="mt-1 text-sm font-semibold uppercase tracking-wider text-accent">{ing.amount}</p>
                    <p className="mt-4 text-white/70">{ing.short}</p>

                    <motion.p
                      variants={{
                        rest: { opacity: 0.0, height: 0, y: 10 },
                        hover: { opacity: 1, height: 'auto', y: 0 },
                      }}
                      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                      className="mt-3 overflow-hidden text-sm leading-relaxed text-white/50 max-md:!h-auto max-md:!opacity-100"
                    >
                      {ing.detail}
                    </motion.p>

                    <span className="mt-auto pt-6 text-xs font-semibold uppercase tracking-[0.25em] text-white/30 transition-colors group-hover:text-white/70">
                      Hover to learn more
                    </span>
                    <span
                      aria-hidden="true"
                      className="absolute inset-x-8 bottom-0 h-px origin-left scale-x-0 bg-accent-gradient transition-transform duration-700 group-hover:scale-x-100"
                    />
                  </motion.article>
                </Reveal>
              </li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}
