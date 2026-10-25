import { memo } from 'react'

interface Props {
  text: string
  className?: string
  wordClassName?: string
}

/**
 * Splits text into masked words (`.split-word`) that GSAP / Framer can animate.
 * The full text is exposed to screen readers; the split spans are aria-hidden.
 */
export const SplitText = memo(function SplitText({ text, className = '', wordClassName = '' }: Props) {
  const words = text.split(' ')
  return (
    <span className={className}>
      <span className="sr-only">{text}</span>
      <span aria-hidden="true">
        {words.map((w, i) => (
          <span key={i}>
            {i > 0 && ' '}
            <span className="inline-block overflow-hidden pb-[0.14em] -mb-[0.14em] align-bottom">
              <span className={`split-word inline-block will-change-transform ${wordClassName}`}>{w}</span>
            </span>
          </span>
        ))}
      </span>
    </span>
  )
})
