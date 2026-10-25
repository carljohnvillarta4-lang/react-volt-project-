import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react'
import { gsap } from '../utils/gsap'
import { flavors, type Flavor } from '../data/flavors'
import { hexToRgb } from '../utils/color'

interface FlavorState {
  index: number
  flavor: Flavor
  /** true while the camera is zoomed in on the active can */
  focused: boolean
  select: (i: number, focus?: boolean) => void
  setFocused: (v: boolean) => void
  next: () => void
  prev: () => void
}

const FlavorContext = createContext<FlavorState | null>(null)

export function FlavorProvider({ children }: { children: ReactNode }) {
  const [index, setIndex] = useState(0)
  const [focused, setFocused] = useState(false)

  const select = useCallback((i: number, focus = true) => {
    setIndex((i + flavors.length) % flavors.length)
    setFocused(focus)
  }, [])

  const next = useCallback(() => select(index + 1), [index, select])
  const prev = useCallback(() => select(index - 1), [index, select])

  // Tween the global theme variables whenever the flavor changes → whole site re-tints smoothly.
  useEffect(() => {
    const f = flavors[index]
    const a = hexToRgb(f.accent)
    const b = hexToRgb(f.accent2)
    gsap.to(document.documentElement, {
      '--ar': a[0],
      '--ag': a[1],
      '--ab': a[2],
      '--a2r': b[0],
      '--a2g': b[1],
      '--a2b': b[2],
      '--tr': Math.round(a[0] * 0.34),
      '--tg': Math.round(a[1] * 0.34),
      '--tb': Math.round(a[2] * 0.34),
      duration: 1.1,
      ease: 'power2.out',
      overwrite: true,
    })
  }, [index])

  const value = useMemo<FlavorState>(
    () => ({ index, flavor: flavors[index], focused, select, setFocused, next, prev }),
    [index, focused, select, next, prev],
  )

  return <FlavorContext.Provider value={value}>{children}</FlavorContext.Provider>
}

export function useFlavor(): FlavorState {
  const ctx = useContext(FlavorContext)
  if (!ctx) throw new Error('useFlavor must be used inside <FlavorProvider>')
  return ctx
}
