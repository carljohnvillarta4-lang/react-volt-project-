import { useRef, useState, type FormEvent } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { FaInstagram, FaTiktok, FaXTwitter, FaYoutube } from 'react-icons/fa6'
import { LuArrowUp } from 'react-icons/lu'
import { navLinks } from '../data/content'
import { navigateTo } from '../utils/navigation'

const socials = [
  { icon: FaInstagram, label: 'Instagram', href: '#' },
  { icon: FaTiktok, label: 'TikTok', href: '#' },
  { icon: FaXTwitter, label: 'X (Twitter)', href: '#' },
  { icon: FaYoutube, label: 'YouTube', href: '#' },
]

export default function Footer() {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end end'] })
  const y = useTransform(scrollYProgress, [0, 1], [120, 0])
  const [done, setDone] = useState(false)

  const subscribe = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setDone(true)
    e.currentTarget.reset()
  }

  return (
    <footer ref={ref} className="relative z-10 overflow-hidden border-t border-white/10 bg-black/60 pt-20 backdrop-blur-sm">
      <div className="mx-auto grid max-w-7xl gap-12 px-6 sm:px-10 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <p className="font-display text-2xl font-extrabold tracking-[0.22em]">EMBER</p>
          <p className="mt-4 max-w-sm text-white/50">Zero sugar. Natural energy. Eight flavors built to keep you moving.</p>

          <form onSubmit={subscribe} className="mt-8 flex max-w-sm gap-2" aria-label="Newsletter signup">
            <label htmlFor="newsletter" className="sr-only">Email address</label>
            <input
              id="newsletter"
              type="email"
              required
              placeholder="you@email.com"
              className="min-w-0 flex-1 rounded-full border border-white/10 bg-white/5 px-5 py-3 text-sm outline-none placeholder:text-white/30 focus:border-accent"
            />
            <button type="submit" className="rounded-full bg-accent-gradient px-5 py-3 text-sm font-semibold text-black transition-transform hover:scale-105">
              Join
            </button>
          </form>
          <p className="mt-3 h-5 text-sm text-accent2" role="status">{done ? 'You’re on the list! ⚡' : ''}</p>
        </div>

        <nav aria-label="Footer">
          <p className="mb-5 text-xs font-semibold uppercase tracking-[0.3em] text-white/40">Explore</p>
          <ul className="space-y-3">
            {navLinks.map((l) => (
              <li key={l.id}>
                <a
                  href={`#${l.id}`}
                  onClick={(e) => { e.preventDefault(); navigateTo(l.id) }}
                  className="text-white/70 transition-colors hover:text-accent"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <p className="mb-5 text-xs font-semibold uppercase tracking-[0.3em] text-white/40">Follow</p>
          <ul className="flex gap-3">
            {socials.map((s) => {
              const Icon = s.icon
              return (
                <li key={s.label}>
                  <a href={s.href} aria-label={s.label} className="glass grid h-12 w-12 place-items-center rounded-full transition-all hover:-translate-y-1 hover:text-accent hover:shadow-glow">
                    <Icon aria-hidden="true" />
                  </a>
                </li>
              )
            })}
          </ul>
          <button
            type="button"
            onClick={() => navigateTo('top')}
            className="glass mt-8 inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-medium hover:border-accent/60"
          >
            Back to top <LuArrowUp aria-hidden="true" />
          </button>
        </div>
      </div>

      <motion.p
        style={{ y }}
        aria-hidden="true"
        className="mt-16 select-none text-center font-display text-[clamp(5rem,26vw,24rem)] font-extrabold leading-[0.78] tracking-[-0.05em] text-gradient opacity-90"
      >
        EMBER
      </motion.p>

      <div className="relative z-10 border-t border-white/10 bg-black/70 px-6 py-6 text-center text-xs text-white/40 sm:px-10">
        © {new Date().getFullYear()} EMBER Beverages. A fictional brand created for demonstration. Please drink responsibly.
      </div>
    </footer>
  )
}
