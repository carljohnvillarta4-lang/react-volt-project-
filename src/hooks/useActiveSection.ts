import { useEffect, useState } from 'react'

/** Returns the id of the section currently crossing the middle of the viewport. */
export function useActiveSection(ids: readonly string[]): string {
  const [active, setActive] = useState('')
  useEffect(() => {
    const observers: IntersectionObserver[] = []
    ids.forEach((id) => {
      const el = document.getElementById(id)
      if (!el) return
      const io = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActive(id)
        },
        { rootMargin: '-45% 0px -50% 0px' },
      )
      io.observe(el)
      observers.push(io)
    })
    return () => observers.forEach((o) => o.disconnect())
  }, [ids])
  return active
}
