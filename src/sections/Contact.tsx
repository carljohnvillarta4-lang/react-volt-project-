import { useState, type FormEvent } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { LuCheck, LuMail, LuMapPin, LuPhone, LuSend } from 'react-icons/lu'
import { SectionHeading } from '../components/SectionHeading'
import { MagneticButton } from '../components/MagneticButton'
import { Reveal } from '../components/Reveal'

type Errors = Partial<Record<'name' | 'email' | 'message', string>>

const info = [
  { icon: LuMail, label: 'Email', value: 'hello@ember-energy.example' },
  { icon: LuPhone, label: 'Phone', value: '+1 (555) 014-2026' },
  { icon: LuMapPin, label: 'Studio', value: '88 Foundry Lane, Brooklyn, NY' },
]

const field =
  'w-full rounded-2xl border border-white/10 bg-white/5 px-5 py-4 text-white placeholder:text-white/30 outline-none transition-all focus:border-accent focus:bg-white/[0.08] focus:shadow-glow aria-[invalid=true]:border-red-400/70'

export default function Contact() {
  const [errors, setErrors] = useState<Errors>({})
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent'>('idle')

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const data = new FormData(e.currentTarget)
    if (data.get('company')) return // honeypot
    const next: Errors = {}
    const name = String(data.get('name') ?? '').trim()
    const email = String(data.get('email') ?? '').trim()
    const message = String(data.get('message') ?? '').trim()
    if (name.length < 2) next.name = 'Please tell us your name.'
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) next.email = 'Please enter a valid email address.'
    if (message.length < 10) next.message = 'Tell us a little more (at least 10 characters).'
    setErrors(next)
    if (Object.keys(next).length) {
      const first = Object.keys(next)[0]
      e.currentTarget.querySelector<HTMLElement>(`[name="${first}"]`)?.focus()
      return
    }
    setStatus('sending')
    // Demo only: wire this to your API / form service.
    window.setTimeout(() => {
      setStatus('sent')
      e.currentTarget?.reset()
    }, 1100)
  }

  return (
    <section id="contact" aria-labelledby="contact-title" className="section-pad relative overflow-hidden">
      <div className="orb -left-40 bottom-0 h-[520px] w-[520px] opacity-30" aria-hidden="true" />
      <div className="relative z-10 mx-auto grid max-w-7xl gap-12 px-6 sm:px-10 lg:grid-cols-[1fr_1.15fr] lg:gap-20">
        <div>
          <SectionHeading
            id="contact-title"
            align="left"
            eyebrow="Get in touch"
            title="Let's make something"
            highlight="electric."
            text="Wholesale, partnerships, press or just a flavor suggestion. Drop us a line and we'll reply within one business day."
          />
          <ul className="space-y-4">
            {info.map((it, i) => {
              const Icon = it.icon
              return (
                <li key={it.label}>
                  <Reveal delay={i * 0.08} y={24}>
                    <div className="glass flex items-center gap-5 rounded-2xl p-5">
                      <span className="grid h-12 w-12 place-items-center rounded-xl bg-accent/15 text-accent ring-1 ring-accent/30">
                        <Icon aria-hidden="true" size={22} />
                      </span>
                      <div>
                        <p className="text-xs uppercase tracking-widest text-white/40">{it.label}</p>
                        <p className="font-medium">{it.value}</p>
                      </div>
                    </div>
                  </Reveal>
                </li>
              )
            })}
          </ul>
        </div>

        <Reveal delay={0.1}>
          <form onSubmit={onSubmit} noValidate aria-label="Contact form" className="glass-strong relative rounded-[2rem] p-7 sm:p-10">
            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label htmlFor="name" className="mb-2 block text-sm font-medium text-white/70">Name</label>
                <input id="name" name="name" autoComplete="name" placeholder="Jane Doe" className={field} aria-invalid={!!errors.name} aria-describedby={errors.name ? 'err-name' : undefined} />
                {errors.name && <p id="err-name" role="alert" className="mt-2 text-sm text-red-300">{errors.name}</p>}
              </div>
              <div>
                <label htmlFor="email" className="mb-2 block text-sm font-medium text-white/70">Email</label>
                <input id="email" name="email" type="email" autoComplete="email" placeholder="jane@company.com" className={field} aria-invalid={!!errors.email} aria-describedby={errors.email ? 'err-email' : undefined} />
                {errors.email && <p id="err-email" role="alert" className="mt-2 text-sm text-red-300">{errors.email}</p>}
              </div>
            </div>

            <div className="mt-5">
              <label htmlFor="topic" className="mb-2 block text-sm font-medium text-white/70">Topic</label>
              <select id="topic" name="topic" className={`${field} appearance-none`} defaultValue="general">
                <option className="bg-neutral-900" value="general">General question</option>
                <option className="bg-neutral-900" value="wholesale">Wholesale & distribution</option>
                <option className="bg-neutral-900" value="press">Press & partnerships</option>
                <option className="bg-neutral-900" value="flavor">Flavor suggestion</option>
              </select>
            </div>

            <div className="mt-5">
              <label htmlFor="message" className="mb-2 block text-sm font-medium text-white/70">Message</label>
              <textarea id="message" name="message" rows={5} placeholder="Tell us what's on your mind…" className={`${field} resize-none`} aria-invalid={!!errors.message} aria-describedby={errors.message ? 'err-message' : undefined} />
              {errors.message && <p id="err-message" role="alert" className="mt-2 text-sm text-red-300">{errors.message}</p>}
            </div>

            {/* honeypot */}
            <div className="absolute -left-[9999px]" aria-hidden="true">
              <label>Company<input name="company" tabIndex={-1} autoComplete="off" /></label>
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-5">
              <MagneticButton type="submit" disabled={status === 'sending'} strength={0.2}>
                {status === 'sending' ? 'Sending…' : 'Send message'} <LuSend aria-hidden="true" />
              </MagneticButton>
              <AnimatePresence>
                {status === 'sent' && (
                  <motion.p
                    role="status"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0 }}
                    className="flex items-center gap-2 text-sm font-medium text-accent2"
                  >
                    <LuCheck aria-hidden="true" /> Thanks! We'll be in touch very soon.
                  </motion.p>
                )}
              </AnimatePresence>
            </div>
          </form>
        </Reveal>
      </div>
    </section>
  )
}
