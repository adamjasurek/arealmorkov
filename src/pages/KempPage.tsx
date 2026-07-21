import { useState } from 'react'
import { kempIntro } from '@/data/site'
import { GalleryGrid } from '@/components/ui/GalleryGrid'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { BentoGrid } from '@/components/kemp/BentoGrid'
import { ReservationForm } from '@/components/kemp/ReservationForm'
import { PhotoBackground } from '@/components/ui/PhotoBackground'
import { useMergedSiteContent } from '@/hooks/useMergedSiteContent'

export function KempPage() {
  const [selectedAccommodation, setSelectedAccommodation] = useState('')
  const { data: site } = useMergedSiteContent()

  function scrollToReservation(formValue: string) {
    if (formValue) setSelectedAccommodation(formValue)
    document.getElementById('rezervace')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <>
      <section className="relative isolate overflow-hidden border-b-4 border-foreground px-4 py-10 md:px-6 md:py-16">
        <PhotoBackground src={kempIntro.image} alt="Pohled na kemp" />
        <div className="relative z-10 mx-auto max-w-[1400px]">
          <SectionHeading title="Kemp" />
          <div className="max-w-3xl">
            <h3 className="font-display text-2xl text-gold-gradient sm:text-3xl">{kempIntro.title}</h3>
            <p className="mt-4 font-sans text-base text-muted sm:text-lg">{kempIntro.body}</p>
          </div>
        </div>
      </section>

      <section className="border-b-4 border-foreground px-4 py-12 md:px-6 md:py-16">
        <div className="mx-auto max-w-[1400px]">
          <h3 className="font-display mb-8 text-3xl text-gold-gradient sm:text-4xl md:mb-10 md:text-5xl">
            Možnosti ubytování
          </h3>
          <BentoGrid onOrder={scrollToReservation} />
        </div>
      </section>

      <section id="rezervace" className="scroll-mt-24 px-4 py-12 md:px-6 md:py-16">
        <div className="mx-auto grid max-w-[1400px] gap-10 lg:grid-cols-2 lg:gap-12">
          <div>
            <h3 className="font-display mb-6 text-3xl text-gold-gradient sm:text-4xl">
              Ceník ubytování
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full min-w-[16rem] border-collapse font-sans text-sm sm:text-base">
                <tbody>
                  {site.kempPricing.map((row) => (
                    <tr key={row.label} className="border-b-2 border-foreground/20">
                      <td className="py-3 pr-4">{row.label}</td>
                      <td className="py-3 text-right font-display text-lg text-gold-500 whitespace-nowrap sm:text-xl">
                        {row.price}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <ReservationForm
            accommodation={selectedAccommodation}
            onAccommodationChange={setSelectedAccommodation}
          />
        </div>
      </section>

      <GalleryGrid folder="camp" title="Galerie kempu" />
    </>
  )
}
