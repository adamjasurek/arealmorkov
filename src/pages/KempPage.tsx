import { useState } from 'react'
import { kempIntro, kempPricing } from '@/data/site'
import { GalleryGrid } from '@/components/ui/GalleryGrid'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { BentoGrid } from '@/components/kemp/BentoGrid'
import { ReservationForm } from '@/components/kemp/ReservationForm'
import { PhotoBackground } from '@/components/ui/PhotoBackground'

export function KempPage() {
  const [selectedAccommodation, setSelectedAccommodation] = useState('')

  function scrollToReservation(formValue: string) {
    if (formValue) setSelectedAccommodation(formValue)
    document.getElementById('rezervace')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <>
      <section className="relative isolate overflow-hidden border-b-4 border-foreground px-4 py-16 md:px-6">
        <PhotoBackground src={kempIntro.image} alt="Pohled na kemp" />
        <div className="relative z-10 mx-auto max-w-[1400px]">
          <SectionHeading title="Kemp" />
          <div className="max-w-3xl">
            <h3 className="font-display text-3xl text-gold-gradient">{kempIntro.title}</h3>
            <p className="mt-4 font-sans text-lg text-muted">{kempIntro.body}</p>
          </div>
        </div>
      </section>

      <section className="border-b-4 border-foreground px-4 py-16 md:px-6">
        <div className="mx-auto max-w-[1400px]">
          <h3 className="font-display mb-10 text-4xl text-gold-gradient md:text-5xl">
            Možnosti ubytování
          </h3>
          <BentoGrid onOrder={scrollToReservation} />
        </div>
      </section>

      <section id="rezervace" className="scroll-mt-24 px-4 py-16 md:px-6">
        <div className="mx-auto grid max-w-[1400px] gap-12 lg:grid-cols-2">
          <div>
            <h3 className="font-display mb-6 text-4xl text-gold-gradient">Ceník ubytování</h3>
            <table className="w-full border-collapse font-sans">
              <tbody>
                {kempPricing.map((row) => (
                  <tr key={row.label} className="border-b-2 border-foreground/20">
                    <td className="py-3 pr-4">{row.label}</td>
                    <td className="py-3 text-right font-display text-xl text-gold-500">
                      {row.price}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
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
