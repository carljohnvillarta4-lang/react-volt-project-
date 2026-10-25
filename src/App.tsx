import { lazy, Suspense, useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { FlavorProvider } from './context/FlavorContext'
import { useLenis } from './hooks/useLenis'
import { ScrollTrigger } from './utils/gsap'
import { Loader } from './components/Loader'
import { Navbar } from './components/Navbar'
import { CursorGlow } from './components/CursorGlow'
import { ParticleField } from './components/ParticleField'
import { PageTransition } from './components/PageTransition'
import Hero from './sections/Hero'
import Marquee from './sections/Marquee'
import About from './sections/About'
import Features from './sections/Features'
import Ingredients from './sections/Ingredients'
import Nutrition from './sections/Nutrition'
import Testimonials from './sections/Testimonials'
import FAQ from './sections/FAQ'
import Contact from './sections/Contact'
import Footer from './sections/Footer'

// The Flavors section owns the heavy WebGL lineup: split it into its own lazy chunk.
const Flavors = lazy(() => import('./sections/Flavors'))

function SectionFallback() {
  return <div id="flavors" className="grid min-h-screen place-items-center text-white/30" aria-busy="true">Loading flavors…</div>
}

export default function App() {
  const [ready, setReady] = useState(false)
  useLenis()

  // lock scroll during the intro
  useEffect(() => {
    document.body.style.overflow = ready ? '' : 'hidden'
    if (ready) window.scrollTo(0, 0)
  }, [ready])

  // warm the lazy chunk once the intro is done, then keep ScrollTrigger measurements fresh
  useEffect(() => {
    if (!ready) return
    import('./sections/Flavors')
    let t = 0
    const ro = new ResizeObserver(() => {
      window.clearTimeout(t)
      t = window.setTimeout(() => ScrollTrigger.refresh(), 200)
    })
    ro.observe(document.body)
    return () => {
      ro.disconnect()
      window.clearTimeout(t)
    }
  }, [ready])

  return (
    <FlavorProvider>
      <a
        href="#main"
        className="sr-only z-[200] rounded-full bg-white px-5 py-3 font-semibold text-black focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
      >
        Skip to content
      </a>

      <AnimatePresence>{!ready && <Loader key="loader" onDone={() => setReady(true)} />}</AnimatePresence>

      <ParticleField />
      <CursorGlow />
      <PageTransition />
      <Navbar ready={ready} />

      <motion.main
        id="main"
        initial={{ opacity: 0 }}
        animate={{ opacity: ready ? 1 : 0 }}
        transition={{ duration: 1.1, ease: 'easeOut' }}
        className="relative z-[2]"
      >
        <Hero ready={ready} />
        <Marquee />
        <About />
        <Features />
        <Suspense fallback={<SectionFallback />}>
          <Flavors />
        </Suspense>
        <Ingredients />
        <Nutrition />
        <Testimonials />
        <FAQ />
        <Contact />
      </motion.main>
      <Footer />
    </FlavorProvider>
  )
}
