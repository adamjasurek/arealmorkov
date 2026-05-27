import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { about } from '@/data/site'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { CornerOrbitDecoration } from '@/components/ui/CornerOrbitDecoration'
import { PolaroidCollage } from '@/components/home/PolaroidCollage'

gsap.registerPlugin(useGSAP, ScrollTrigger)

export function AboutSection() {
  const ref = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      gsap.from('.about-float', {
        scrollTrigger: {
          trigger: ref.current,
          start: 'top 80%',
        },
        y: 40,
        opacity: 0,
        stagger: 0.1,
        duration: 0.6,
      })

      gsap.from('.about-polaroid', {
        scrollTrigger: {
          trigger: ref.current,
          start: 'top 75%',
        },
        y: 24,
        opacity: 0,
        stagger: 0.05,
        duration: 0.45,
        ease: 'power2.out',
      })
    },
    { scope: ref },
  )

  return (
    <section
      id="o-arealu"
      ref={ref}
      className="relative isolate scroll-mt-24 overflow-hidden bg-surface px-4 pt-8 pb-20 md:px-6 md:pt-12"
    >
      <CornerOrbitDecoration variant="dark" />

      <div className="relative z-10 mx-auto max-w-[1400px]">
        <SectionHeading eyebrow="vítejte u vody" title={about.title} />

        <div className="about-float grid gap-12 lg:grid-cols-[1fr_1.1fr] lg:items-center">
          <div className="relative z-10">
            <p className="font-sans text-lg leading-relaxed text-muted md:text-xl">{about.lead}</p>
            <p className="mt-4 font-sans text-muted">{about.body}</p>
          </div>
          <div className="overflow-visible">
            <PolaroidCollage />
          </div>
        </div>
      </div>
    </section>
  )
}
