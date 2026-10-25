import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'framer-motion'
import { LuMenu, LuX } from 'react-icons/lu'
import { navLinks } from '../data/content'
import { useActiveSection } from '../hooks/useActiveSection'
import { navigateTo } from '../utils/navigation'

const ids = navLinks.map((l) => l.id)

export function Navbar({ ready }: { ready: boolean }) {
  const [hidden, setHidden] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const active = useActiveSection(ids)
  const { scrollY } = useScroll()
  const prev = useRef(0)
  const menuBtn = useRef<HTMLButtonElement>(null)

  useMotionValueEvent(scrollY, 'change', (y) => {
    setHidden(y > prev.current && y > 160 && !open)
    setScrolled(y > 40)
    prev.current = y
  })

  // close menu on Escape + lock body scroll while open
  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(false)
        menuBtn.current?.focus()
      }
    }
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [open])

  const go = (id: string) => (e: React.MouseEvent) => {
    e.preventDefault()
    setOpen(false)
    navigateTo(id)
  }

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={ready ? { y: hidden ? -110 : 0, opacity: 1 } : { y: -100, opacity: 0 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className="fixed inset-x-0 top-0 z-50 px-4 pt-4 sm:px-6"
    >
      <nav
        aria-label="Primary"
        className={`mx-auto flex max-w-7xl items-center justify-between rounded-full px-5 py-3 transition-all duration-500 sm:px-7 ${
          scrolled ? 'glass-strong' : 'border border-transparent'
        }`}
      >
        <a
          href="#top"
          onClick={(e) => {
            e.preventDefault()
            setOpen(false)
            navigateTo('top')
          }}
          className="flex items-center gap-2.5 font-display text-lg font-extrabold tracking-[0.22em]"
          aria-label="EMBER — back to top"
        >
          <span className="grid h-8 w-8 place-items-center rounded-xl bg-accent-gradient text-black" aria-hidden="true">
            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor">
              <path d="M13.5 2 5 14h6l-1.5 8L19 9h-6.5z" />
            </svg>
          </span>
          EMBER
        </a>

        <ul className="hidden items-center gap-1 lg:flex">
          {navLinks.map((l) => (
            <li key={l.id} className="relative">
              <a
                href={`#${l.id}`}
                onClick={go(l.id)}
                aria-current={active === l.id ? 'true' : undefined}
                className={`relative block rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                  active === l.id ? 'text-white' : 'text-white/55 hover:text-white'
                }`}
              >
                {active === l.id && (
                  <motion.span
                    layoutId="nav-pill"
                    className="absolute inset-0 -z-10 rounded-full bg-white/10"
                    transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                  />
                )}
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-3">
          <a
            href="#flavors"
            onClick={go('flavors')}
            className="hidden rounded-full bg-accent-gradient px-5 py-2.5 text-sm font-semibold text-black shadow-glow transition-transform hover:scale-105 sm:inline-block"
          >
            Shop Flavors
          </a>
          <button
            ref={menuBtn}
            type="button"
            className="grid h-11 w-11 place-items-center rounded-full glass lg:hidden"
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <LuX size={20} /> : <LuMenu size={20} />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0, y: -16, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -16, scale: 0.98 }}
            transition={{ duration: 0.3 }}
            className="glass-strong mx-auto mt-3 max-w-7xl rounded-3xl p-4 lg:hidden"
          >
            <ul className="grid gap-1">
              {navLinks.map((l, i) => (
                <motion.li
                  key={l.id}
                  initial={{ opacity: 0, x: -14 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 * i }}
                >
                  <a
                    href={`#${l.id}`}
                    onClick={go(l.id)}
                    className="flex items-center justify-between rounded-2xl px-4 py-3.5 text-lg font-medium text-white/80 hover:bg-white/5 hover:text-white"
                  >
                    {l.label}
                    <span className="text-xs text-accent">0{i + 1}</span>
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}
