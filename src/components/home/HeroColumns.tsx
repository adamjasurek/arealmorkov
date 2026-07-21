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
      <div className="relative z-10 mx-auto grid h-full min-h-0 w-full max-w-[1800px] min-w-0 grid-rows-3 gap-1.5 px-1.5 py-1.5 pb-[max(0.375rem,env(safe-area-inset-bottom))] sm:gap-2.5 sm:px-2.5 sm:py-2.5 md:grid-cols-3 md:grid-rows-[minmax(0,1fr)] md:items-stretch md:gap-6 md:px-8 md:py-5 lg:gap-8 lg:px-12 lg:py-6">
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
              <div className="relative z-10 flex min-h-0 flex-1 flex-row items-center gap-2.5 p-2.5 sm:gap-3 sm:p-3.5 md:flex-col md:items-stretch md:p-6 lg:p-8">
                <figure
                  className="hero-polaroid w-[4.25rem] shrink-0 border-4 border-foreground bg-[#fefefe] p-1 pb-2.5 shadow-brutal-sm sm:w-[5rem] sm:pb-3.5 md:mb-5 md:w-[52%] md:max-w-[200px] md:p-2 md:pb-8 md:shadow-brutal lg:max-w-[240px] xl:max-w-[280px]"
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

                <div className="flex min-h-0 min-w-0 flex-1 flex-col justify-center md:justify-start">
                  <h2 className="font-display shrink-0 text-[clamp(1.35rem,5.2vw,4.1rem)] leading-none text-gold-gradient">
                    {col.title}
                  </h2>

                  <p className="mt-1 line-clamp-2 font-sans text-[0.7rem] leading-snug text-muted sm:mt-1.5 sm:text-xs md:mt-3 md:line-clamp-none md:flex-1 md:overflow-hidden md:text-lg lg:text-xl">
                    {col.description}
                  </p>

                  <span className="btn-brutal mt-2 shrink-0 self-start px-2.5 py-1.5 text-xs sm:mt-2.5 sm:px-3 sm:py-2 sm:text-sm md:mt-auto md:px-4 md:py-2.5 md:text-base lg:px-6 lg:py-3 lg:text-lg">
                    {col.cta} →
                  </span>
                </div>
              </div>
            </Link>
          )

          if (index === 0) {
            return (
              <div key={col.id} className="h-full min-h-0 min-w-0 md:-rotate-[2deg]">
                {card}
              </div>
            )
          }

          if (index === 2) {
            return (
              <div key={col.id} className="h-full min-h-0 min-w-0 md:rotate-[2deg]">
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
