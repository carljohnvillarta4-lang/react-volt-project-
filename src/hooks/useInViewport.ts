import { useEffect, useState, type RefObject } from 'react'

/** True while the element is within `rootMargin` of the viewport. Used to pause/mount WebGL canvases. */
export function useInViewport(ref: RefObject<Element | null>, rootMargin = '0px'): boolean {
  const [inView, setInView] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), { rootMargin })
    io.observe(el)
    return () => io.disconnect()
  }, [ref, rootMargin])
  return inView
}
