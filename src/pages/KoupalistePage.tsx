import { poolInfo } from '@/data/site'
import { GalleryGrid } from '@/components/ui/GalleryGrid'
import { BrutalButton } from '@/components/ui/BrutalButton'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { WaterTempDisplay } from '@/components/koupaliste/WaterTempDisplay'
import { PhotoBackground } from '@/components/ui/PhotoBackground'

export function KoupalistePage() {
  return (
    <div>
      <section className="relative isolate overflow-hidden border-b-4 border-foreground px-4 py-16 md:px-6">
        <PhotoBackground src={poolInfo.image} alt="Pohled na koupaliště" />
        <div className="relative z-10 mx-auto max-w-[1400px]">
          <SectionHeading title="Koupaliště" />
          <div className="grid gap-8 lg:grid-cols-2 lg:items-start">
            <div>
              <h3 className="font-display text-3xl text-gold-gradient">{poolInfo.title}</h3>
              <p className="mt-4 max-w-2xl font-sans text-lg text-muted">{poolInfo.body}</p>
            </div>
            <WaterTempDisplay />
          </div>
        </div>
      </section>

      <section className="border-b-4 border-foreground px-4 py-12 md:px-6">
        <div className="mx-auto max-w-[1400px]">
          <h3 className="font-display mb-8 text-4xl">Otevírací doba a vstupné</h3>
          <div className="grid gap-8 lg:grid-cols-2">
            <div className="card-brutal p-6">
              <h4 className="font-display text-2xl">Provozní doba</h4>
              <ul className="mt-4 space-y-3 font-sans">
                {poolInfo.hours.map((h) => (
                  <li key={h.label}>
                    <span className="font-medium">{h.label}</span>
                    <br />
                    <span className="text-muted">{h.time}</span>
                  </li>
                ))}
              </ul>
            </div>
            <ul className="space-y-3">
              {poolInfo.admission.map((row) => (
                <li
                  key={row.label}
                  className="card-brutal flex flex-wrap items-center justify-between gap-2 p-4"
                >
                  <div>
                    <span className="font-sans font-medium">{row.label}</span>
                    {'note' in row && row.note ? (
                      <p className="text-sm text-muted">{row.note}</p>
                    ) : null}
                  </div>
                  <span className="font-display text-xl text-gold-500">{row.price}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="px-4 py-16 md:px-6">
        <div className="mx-auto max-w-[1400px]">
          <h3 className="font-display mb-8 text-4xl text-foreground">Občerstvení na koupališti</h3>
          <div className="flex flex-wrap gap-3">
            <BrutalButton>MENU KOUPELIŠTĚ →</BrutalButton>
            <BrutalButton variant="outline">NÁPOJE →</BrutalButton>
          </div>
        </div>
      </section>

      <GalleryGrid folder="pool" title="Galerie koupaliště" />
    </div>
  )
}
