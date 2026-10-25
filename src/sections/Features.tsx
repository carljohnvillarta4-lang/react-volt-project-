import { useRef, type MouseEvent } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { features, type Feature } from '../data/content'
import { SectionHeading } from '../components/SectionHeading'
import { Reveal } from '../components/Reveal'

function FeatureCard({ f, i }: { f: Feature; i: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const rx = useSpring(useTransform(my, [-0.5, 0.5], [8, -8]), { stiffness: 200, damping: 20 })
  const ry = useSpring(useTransform(mx, [-0.5, 0.5], [-8, 8]), { stiffness: 200, damping: 20 })
  const Icon = f.icon

  const onMove = (e: MouseEvent<HTMLDivElement>) => {
    const el = ref.current
    if (!el) return
    const r = el.getBoundingClientRect()
    mx.set((e.clientX - r.left) / r.width - 0.5)
    my.set((e.clientY - r.top) / r.height - 0.5)
    el.style.setProperty('--mx', `${e.clientX - r.left}px`)
    el.style.setProperty('--my', `${e.clientY - r.top}px`)
  }
  const onLeave = () => {
    mx.set(0)
    my.set(0)
  }

  return (
    <Reveal delay={(i % 3) * 0.1} className="[perspective:1000px]">
      <motion.div
        ref={ref}
        onMouseMove={onMove}
        onMouseLeave={onLeave}
        style={{ rotateX: rx, rotateY: ry, transformStyle: 'preserve-3d' }}
        whileHover={{ y: -6 }}
        className="glass spotlight-card group h-full rounded-[2rem] p-8"
      >
        <div
          className="mb-8 grid h-14 w-14 place-items-center rounded-2xl bg-accent/15 text-accent ring-1 ring-accent/30 transition-all duration-500 group-hover:bg-accent group-hover:text-black group-hover:shadow-glow"
          style={{ transform: 'translateZ(40px)' }}
        >
          <Icon size={26} aria-hidden="true" />
        </div>
        <h3 className="mb-3 text-xl font-semibold tracking-tight" style={{ transform: 'translateZ(30px)' }}>
          {f.title}
        </h3>
        <p className="leading-relaxed text-white/55" style={{ transform: 'translateZ(20px)' }}>
          {f.text}
        </p>
        <span className="absolute right-6 top-6 font-display text-sm font-semibold text-white/15">0{i + 1}</span>
      </motion.div>
    </Reveal>
  )
}

export default function Features() {
  return (
    <section id="features" aria-labelledby="features-title" className="section-pad relative">
      <div className="mx-auto max-w-7xl px-6 sm:px-10">
        <SectionHeading
          id="features-title"
          eyebrow="Why EMBER"
          title="Engineered for"
          highlight="everything you do."
          text="Every can is a balance of performance, flavor and responsibility, crafted down to the last milligram."
        />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((f, i) => (
            <FeatureCard key={f.title} f={f} i={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
