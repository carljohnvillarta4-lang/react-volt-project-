import { motion, useReducedMotion } from 'framer-motion'
import type { ReactNode } from 'react'

interface Props {
  children: ReactNode
  delay?: number
  y?: number
  /** px of blur to animate from. Keep 0 for glass elements (a filter breaks backdrop-filter). */
  blur?: number
  scale?: number
  className?: string
}

/** Scroll-reveal wrapper: fade + slide + (optional) blur + scale. */
export function Reveal({ children, delay = 0, y = 44, blur = 0, scale = 0.97, className = '' }: Props) {
  const reduce = useReducedMotion()
  const from = { opacity: 0, y, scale, ...(blur ? { filter: `blur(${blur}px)` } : {}) }
  const to = { opacity: 1, y: 0, scale: 1, ...(blur ? { filter: 'blur(0px)' } : {}) }
  return (
    <motion.div
      className={className}
      initial={reduce ? false : from}
      whileInView={to}
      viewport={{ once: true, margin: '0px 0px -12% 0px' }}
      transition={{ duration: 0.95, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  )
}
