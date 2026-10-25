import { useRef, type ButtonHTMLAttributes, type ReactNode } from 'react'
import { useMagnetic } from '../hooks/useMagnetic'

interface Props extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'children'> {
  children: ReactNode
  href?: string
  variant?: 'primary' | 'ghost'
  strength?: number
  className?: string
}

/** CTA that magnetically follows the cursor. Renders an <a> when `href` is set. */
export function MagneticButton({ children, href, variant = 'primary', strength = 0.35, className = '', ...rest }: Props) {
  const ref = useRef<HTMLSpanElement>(null)
  useMagnetic(ref, strength)

  const base =
    'group relative inline-flex items-center justify-center gap-3 overflow-hidden rounded-full px-6 py-3.5 text-sm sm:px-8 sm:py-4 font-semibold tracking-wide transition-shadow duration-500 focus-visible:outline-offset-4'
  const styles =
    variant === 'primary'
      ? 'bg-accent-gradient text-black shadow-glow hover:shadow-glow-lg'
      : 'glass text-white hover:border-accent/60'

  const inner = (
    <>
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -translate-x-full skew-x-[-20deg] bg-white/30 transition-transform duration-700 group-hover:translate-x-full"
      />
      <span className="relative z-10 flex items-center gap-3">{children}</span>
    </>
  )

  return (
    <span ref={ref} className="inline-block" data-cursor>
      {href ? (
        <a href={href} className={`${base} ${styles} ${className}`} {...(rest as object)}>
          {inner}
        </a>
      ) : (
        <button type="button" className={`${base} ${styles} ${className}`} {...rest}>
          {inner}
        </button>
      )}
    </span>
  )
}
