import { useEffect, useRef } from 'react'
import { gsap } from '../utils/gsap'

/** Soft accent glow + precise dot that follow the cursor. Disabled on touch devices. */
export function CursorGlow() {
  const glow = useRef<HTMLDivElement>(null)
  const dot = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (window.matchMedia('(pointer: coarse)').matches) return
    const g = glow.current
    const d = dot.current
    if (!g || !d) return

    gsap.set([g, d], { xPercent: -50, yPercent: -50, opacity: 0 })
    const gx = gsap.quickTo(g, 'x', { duration: 0.8, ease: 'power3.out' })
    const gy = gsap.quickTo(g, 'y', { duration: 0.8, ease: 'power3.out' })
    const dx = gsap.quickTo(d, 'x', { duration: 0.15, ease: 'power3.out' })
    const dy = gsap.quickTo(d, 'y', { duration: 0.15, ease: 'power3.out' })

    let shown = false
    const move = (e: MouseEvent) => {
      if (!shown) {
        shown = true
        gsap.to([g, d], { opacity: 1, duration: 0.4 })
      }
      gx(e.clientX)
      gy(e.clientY)
      dx(e.clientX)
      dy(e.clientY)
    }
    const over = (e: MouseEvent) => {
      const hot = (e.target as HTMLElement).closest('a,button,[data-cursor],input,textarea,select,summary')
      gsap.to(d, { scale: hot ? 3.2 : 1, opacity: hot ? 0.35 : 1, duration: 0.3 })
      gsap.to(g, { scale: hot ? 1.35 : 1, duration: 0.5 })
    }
    const leave = () => gsap.to([g, d], { opacity: 0, duration: 0.3 })
    const enter = () => shown && gsap.to([g, d], { opacity: 1, duration: 0.3 })

    window.addEventListener('mousemove', move)
    window.addEventListener('mouseover', over)
    document.documentElement.addEventListener('mouseleave', leave)
    document.documentElement.addEventListener('mouseenter', enter)
    return () => {
      window.removeEventListener('mousemove', move)
      window.removeEventListener('mouseover', over)
      document.documentElement.removeEventListener('mouseleave', leave)
      document.documentElement.removeEventListener('mouseenter', enter)
    }
  }, [])

  return (
    <>
      <div
        ref={glow}
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-0 z-[60] hidden h-[520px] w-[520px] rounded-full opacity-0 mix-blend-screen [@media(pointer:fine)]:block"
        style={{
          background:
            'radial-gradient(circle, rgb(var(--ar) var(--ag) var(--ab) / 0.22) 0%, rgb(var(--ar) var(--ag) var(--ab) / 0.08) 35%, transparent 68%)',
        }}
      />
      <div
        ref={dot}
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-0 z-[61] hidden h-2.5 w-2.5 rounded-full bg-accent2 opacity-0 [@media(pointer:fine)]:block"
      />
    </>
  )
}
