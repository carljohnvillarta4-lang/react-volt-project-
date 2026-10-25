import { useEffect } from 'react'
import { animate, motion, useMotionValue, useTransform } from 'framer-motion'

interface Props {
  value: number
  duration?: number
  decimals?: number
  className?: string
}

/** Smoothly counts to `value` whenever it changes. */
export function AnimatedNumber({ value, duration = 1.1, decimals = 0, className }: Props) {
  const mv = useMotionValue(0)
  const text = useTransform(mv, (v) => v.toFixed(decimals))
  useEffect(() => {
    const controls = animate(mv, value, { duration, ease: [0.22, 1, 0.36, 1] })
    return () => controls.stop()
  }, [value, duration, mv])
  return <motion.span className={className}>{text}</motion.span>
}
