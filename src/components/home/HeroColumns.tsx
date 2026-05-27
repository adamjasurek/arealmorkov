import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { heroColumns } from '@/data/site'
import { BrutalButton } from '@/components/ui/BrutalButton'
import { PhotoBackground } from '@/components/ui/PhotoBackground'

gsap.registerPlugin(useGSAP)

const stepClass = ['', 'md:translate-y-4', 'md:translate-y-8'] as const

export function HeroColumns() {
  const containerRef = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
      if (prefersReduced) return

      gsap.from('.hero-pillar', {
        y: 36,
        opacity: 0,
        stagger: 0.1,
        duration: 0.65,
        ease: 'power3.out',
      })
    },
    { scope: containerRef },
  )

  return (
    <section
      ref={containerRef}
      className="relative isolate flex h-full w-full max-w-full items-start overflow-x-hidden bg-gold-gradient"
      aria-label="Hlavní nabídka areálu"
    >
      <div className="relative z-10 mx-auto grid h-full w-full max-w-[1400px] min-w-0 -translate-y-4 gap-7 px-4 py-6 md:grid-cols-3 md:grid-rows-[1fr] md:items-stretch md:gap-8 md:px-6 md:py-10 md:-translate-y-6 lg:gap-10 lg:py-12 lg:-translate-y-8">
        {heroColumns.map((col, index) => {
          const card = (
            <div className="hero-pillar card-brutal-photo group relative isolate flex h-full min-h-[560px] flex-col overflow-hidden md:min-h-0">
            <PhotoBackground
              src={col.image}
              overlayClassName="bg-surface/85"
              loading={index === 0 ? 'eager' : 'lazy'}
              fetchPriority={index === 0 ? 'high' : undefined}
            />
            <div className="relative z-10 flex flex-1 flex-col p-7 md:p-9 lg:p-10">
              <figure
                className="hero-polaroid mb-7 w-[62%] max-w-[280px] border-4 border-foreground bg-[#fefefe] p-2 pb-10 shadow-brutal md:max-w-[320px]"
                style={{ transform: `rotate(${col.rotate}deg)` }}
              >
                <img
                  src={col.image}
                  alt=""
                  aria-hidden
                  loading={index === 0 ? 'eager' : 'lazy'}
                  fetchPriority={index === 0 ? 'high' : undefined}
                  className="aspect-[4/5] w-full object-cover"
                />
              </figure>

              <h2 className="font-display text-6xl text-gold-gradient md:text-[3.75rem] lg:text-[4.1rem]">
                {col.title}
              </h2>

              <p className="mt-4 flex-1 font-sans text-lg leading-relaxed text-muted md:text-xl">
                {col.description}
              </p>

              <BrutalButton to={col.href} className="mt-9 w-full text-center md:w-auto">
                {col.cta} →
              </BrutalButton>
            </div>
            </div>
          )

          const tiltClass =
            index === 0 ? '-rotate-2 md:-rotate-3' : index === 2 ? 'rotate-2 md:rotate-3' : ''

          return (
            <div
              key={col.id}
              className={`h-full min-w-0 overflow-hidden ${stepClass[index]} ${tiltClass}`}
            >
              {card}
            </div>
          )
        })}
      </div>
    </section>
  )
}
