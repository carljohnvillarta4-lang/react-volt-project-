import { Reveal } from './Reveal'

interface Props {
  eyebrow: string
  title: string
  highlight?: string
  text?: string
  align?: 'left' | 'center'
  id?: string
}

export function SectionHeading({ eyebrow, title, highlight, text, align = 'center', id }: Props) {
  const center = align === 'center'
  return (
    <header className={`mb-14 max-w-3xl md:mb-20 ${center ? 'mx-auto text-center' : ''}`}>
      <Reveal blur={8} y={20}>
        <p
          className={`mb-5 inline-flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.3em] text-accent ${
            center ? 'justify-center' : ''
          }`}
        >
          <span className="h-px w-8 bg-accent" aria-hidden="true" />
          {eyebrow}
        </p>
      </Reveal>
      <Reveal delay={0.08} blur={12} y={30}>
        <h2 id={id} className="text-[clamp(2.2rem,5.6vw,4.4rem)] font-bold leading-[1.04] tracking-tight">
          {title} {highlight && <span className="text-gradient">{highlight}</span>}
        </h2>
      </Reveal>
      {text && (
        <Reveal delay={0.16} blur={8} y={24}>
          <p className="mt-6 text-base leading-relaxed text-white/60 md:text-lg">{text}</p>
        </Reveal>
      )}
    </header>
  )
}
