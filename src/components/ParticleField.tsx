import { useEffect, useRef } from 'react'

interface P {
  x: number
  y: number
  r: number
  vy: number
  vx: number
  a: number
  tw: number
}

/** Subtle ambient ember particles drifting up the whole page. Reads the live accent color. */
export function ParticleField() {
  const ref = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = ref.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    let w = 0
    let h = 0
    let raf = 0
    let color = '255,140,40'
    let frame = 0
    const dpr = Math.min(window.devicePixelRatio || 1, 1.5)
    let ps: P[] = []

    const make = (initial = false): P => ({
      x: Math.random() * w,
      y: initial ? Math.random() * h : h + 10,
      r: Math.random() * 1.8 + 0.4,
      vy: Math.random() * 0.35 + 0.08,
      vx: (Math.random() - 0.5) * 0.12,
      a: Math.random() * 0.5 + 0.15,
      tw: Math.random() * Math.PI * 2,
    })

    const resize = () => {
      w = window.innerWidth
      h = window.innerHeight
      canvas.width = w * dpr
      canvas.height = h * dpr
      canvas.style.width = `${w}px`
      canvas.style.height = `${h}px`
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      const count = w < 700 ? 36 : 80
      ps = Array.from({ length: count }, () => make(true))
    }

    const readColor = () => {
      const s = getComputedStyle(document.documentElement)
      const r = parseFloat(s.getPropertyValue('--ar'))
      const g = parseFloat(s.getPropertyValue('--ag'))
      const b = parseFloat(s.getPropertyValue('--ab'))
      if (!Number.isNaN(r)) color = `${Math.round(r)},${Math.round(g)},${Math.round(b)}`
    }

    const draw = () => {
      frame++
      if (frame % 20 === 0) readColor()
      ctx.clearRect(0, 0, w, h)
      for (const p of ps) {
        p.y -= p.vy
        p.x += p.vx + Math.sin(frame * 0.01 + p.tw) * 0.08
        p.tw += 0.02
        if (p.y < -10) Object.assign(p, make())
        const alpha = p.a * (0.6 + 0.4 * Math.sin(p.tw))
        ctx.beginPath()
        ctx.fillStyle = `rgba(${color},${alpha})`
        ctx.shadowColor = `rgba(${color},0.9)`
        ctx.shadowBlur = 8
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fill()
      }
      raf = requestAnimationFrame(draw)
    }

    resize()
    readColor()
    window.addEventListener('resize', resize)
    if (reduce) {
      draw()
      cancelAnimationFrame(raf)
    } else {
      raf = requestAnimationFrame(draw)
    }
    const onVis = () => {
      if (reduce) return
      cancelAnimationFrame(raf)
      if (!document.hidden) raf = requestAnimationFrame(draw)
    }
    document.addEventListener('visibilitychange', onVis)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
      document.removeEventListener('visibilitychange', onVis)
    }
  }, [])

  return <canvas ref={ref} aria-hidden="true" className="pointer-events-none fixed inset-0 z-[1]" />
}
