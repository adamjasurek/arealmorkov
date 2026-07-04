import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { heroColumns } from '@/data/site'
import { PhotoBackground } from '@/components/ui/PhotoBackground'

gsap.registerPlugin(useGSAP)

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
      className="relative isolate flex h-full min-h-0 w-full max-w-full flex-1 overflow-hidden bg-gold-gradient"
      aria-label="Hlavní nabídka areálu"
    >
      <div className="relative z-10 mx-auto grid h-full min-h-0 w-full max-w-[1800px] min-w-0 grid-rows-3 gap-3 px-3 py-3 sm:gap-4 sm:px-4 sm:py-4 md:grid-cols-3 md:grid-rows-[minmax(0,1fr)] md:items-stretch md:gap-6 md:px-8 md:py-5 lg:gap-8 lg:px-12 lg:py-6">
        {heroColumns.map((col, index) => {
          const card = (
            <Link
              to={col.href}
              className="hero-pillar card-brutal-photo group relative isolate flex h-full min-h-0 flex-col overflow-hidden focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold-500"
            >
              <PhotoBackground
                src={col.image}
                overlayClassName="bg-surface/85"
                loading={index === 0 ? 'eager' : 'lazy'}
                fetchPriority={index === 0 ? 'high' : undefined}
              />
              <div className="relative z-10 flex min-h-0 flex-1 flex-col p-4 sm:p-5 md:p-6 lg:p-8">
                <figure
                  className="hero-polaroid mb-3 w-[42%] max-w-[140px] shrink-0 border-4 border-foreground bg-[#fefefe] p-1.5 pb-6 shadow-brutal sm:mb-4 sm:max-w-[160px] sm:pb-7 md:mb-5 md:w-[52%] md:max-w-[200px] md:p-2 md:pb-8 lg:max-w-[240px] xl:max-w-[280px]"
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

                <h2 className="font-display shrink-0 text-[clamp(1.75rem,4.2vw,4.1rem)] leading-none text-gold-gradient">
                  {col.title}
                </h2>

                <p className="mt-2 min-h-0 flex-1 overflow-hidden font-sans text-sm leading-snug text-muted sm:text-base md:mt-3 md:text-lg lg:text-xl">
                  {col.description}
                </p>

                <span className="btn-brutal mt-auto shrink-0 px-3 py-2 text-sm md:px-4 md:py-2.5 md:text-base lg:px-6 lg:py-3 lg:text-lg">
                  {col.cta} →
                </span>
              </div>
            </Link>
          )

          if (index === 0) {
            return (
              <div
                key={col.id}
                className="h-full min-h-0 min-w-0 md:-rotate-[2deg]"
              >
                {card}
              </div>
            )
          }

          if (index === 2) {
            return (
              <div
                key={col.id}
                className="h-full min-h-0 min-w-0 md:rotate-[2deg]"
              >
                {card}
              </div>
            )
          }

          return (
            <div key={col.id} className="h-full min-h-0 min-w-0">
              {card}
            </div>
          )
        })}
      </div>
    </section>
  )
}
