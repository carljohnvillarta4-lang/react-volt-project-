import { getLenis } from '../hooks/useLenis'

export const NAV_EVENT = 'ember:navigate'

export function scrollToId(id: string, immediate = false) {
  const el = document.getElementById(id)
  if (!el) return
  const lenis = getLenis()
  if (lenis) lenis.scrollTo(el, { immediate, duration: 1.4 })
  else el.scrollIntoView({ behavior: immediate ? 'auto' : 'smooth' })
  history.replaceState(null, '', `#${id}`)
}

/** Navigates through the cinematic page-transition wipe (see PageTransition). */
export function navigateTo(id: string) {
  window.dispatchEvent(new CustomEvent<string>(NAV_EVENT, { detail: id }))
}
