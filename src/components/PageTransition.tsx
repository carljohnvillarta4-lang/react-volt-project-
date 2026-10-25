import { useEffect, useRef } from 'react'
import { motion, useAnimationControls, useReducedMotion } from 'framer-motion'
import { NAV_EVENT, scrollToId } from '../utils/navigation'

const ease = [0.76, 0, 0.24, 1] as const

/** Full-screen wipe played whenever the user jumps between sections via navigation. */
export function PageTransition() {
  const controls = useAnimationControls()
  const busy = useRef(false)
  const reduce = useReducedMotion()

  useEffect(() => {
    const handler = async (e: Event) => {
      const id = (e as CustomEvent<string>).detail
      if (reduce) {
        scrollToId(id)
        return
      }
      if (busy.current) return
      busy.current = true
      await controls.start('cover')
      scrollToId(id, true)
      await new Promise((r) => setTimeout(r, 120))
      await controls.start('reveal')
      controls.set('hidden')
      busy.current = false
    }
    window.addEventListener(NAV_EVENT, handler)
    return () => window.removeEventListener(NAV_EVENT, handler)
  }, [controls, reduce])

  return (
    <motion.div
      aria-hidden="true"
      initial="hidden"
      animate={controls}
      variants={{
        hidden: { y: '100%' },
        cover: { y: '0%', transition: { duration: 0.55, ease } },
        reveal: { y: '-100%', transition: { duration: 0.6, ease } },
      }}
      className="pointer-events-none fixed inset-0 z-[90] flex items-center justify-center bg-accent-gradient"
    >
      <span className="font-display text-5xl font-extrabold tracking-[0.3em] text-black/80">EMBER</span>
    </motion.div>
  )
}
