import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { LuPlus } from 'react-icons/lu'
import { faqs } from '../data/content'
import { SectionHeading } from '../components/SectionHeading'
import { Reveal } from '../components/Reveal'

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(0)

  return (
    <section id="faq" aria-labelledby="faq-title" className="section-pad relative">
      <div className="mx-auto max-w-3xl px-6 sm:px-10">
        <SectionHeading id="faq-title" eyebrow="FAQ" title="Questions," highlight="answered." />

        <div className="space-y-3">
          {faqs.map((f, i) => {
            const isOpen = open === i
            return (
              <Reveal key={f.q} delay={i * 0.06} y={28}>
                <div className={`glass rounded-3xl transition-colors duration-500 ${isOpen ? 'border-accent/40' : ''}`}>
                  <h3>
                    <button
                      type="button"
                      id={`faq-btn-${i}`}
                      aria-expanded={isOpen}
                      aria-controls={`faq-panel-${i}`}
                      onClick={() => setOpen(isOpen ? null : i)}
                      className="flex w-full items-center justify-between gap-6 rounded-3xl px-6 py-5 text-left text-base font-semibold sm:px-8 sm:py-6 sm:text-lg"
                    >
                      {f.q}
                      <motion.span
                        animate={{ rotate: isOpen ? 135 : 0 }}
                        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                        className={`grid h-9 w-9 shrink-0 place-items-center rounded-full ${isOpen ? 'bg-accent-gradient text-black' : 'bg-white/10'}`}
                        aria-hidden="true"
                      >
                        <LuPlus />
                      </motion.span>
                    </button>
                  </h3>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        id={`faq-panel-${i}`}
                        role="region"
                        aria-labelledby={`faq-btn-${i}`}
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                        className="overflow-hidden"
                      >
                        <p className="px-6 pb-6 leading-relaxed text-white/60 sm:px-8 sm:pb-7">{f.a}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}
