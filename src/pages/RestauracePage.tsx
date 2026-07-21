import { restaurantInfo } from '@/data/site'
import { SisterBrandsSection } from '@/components/restaurace/SisterBrandsSection'
import { restaurantMenuLinks } from '@/data/restaurantMenus'
import { GalleryGrid } from '@/components/ui/GalleryGrid'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { BrutalButton } from '@/components/ui/BrutalButton'
import { PhotoBackground } from '@/components/ui/PhotoBackground'
import { useMergedSiteContent } from '@/hooks/useMergedSiteContent'
import { usePublicFoodMenu } from '@/hooks/usePublicContent'

export function RestauracePage() {
  const { data: site } = useMergedSiteContent()
  const { data: foodMenu } = usePublicFoodMenu()
  const pizzaDelivery = site.pizzaDelivery
  const pizzaPromos = foodMenu?.pizzaPromos ?? []

  return (
    <>
      <section className="relative isolate overflow-hidden border-b-4 border-foreground px-4 pt-8 pb-6 md:px-6 md:pt-12 md:pb-8">
        <PhotoBackground src={restaurantInfo.image} alt="Interiér restaurace Podhora" />
        <div className="relative z-10 mx-auto max-w-[1400px]">
          <SectionHeading title={restaurantInfo.title} className="mb-3" />
          <p className="max-w-3xl font-sans text-base text-muted sm:text-lg">{restaurantInfo.intro}</p>

          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-6">
            {restaurantInfo.features.slice(0, 3).map((f) => (
              <div key={f.title} className="card-brutal flex h-full flex-col p-4 lg:col-span-2">
                <h4 className="font-display text-xl text-gold-gradient">{f.title}</h4>
                <p className="mt-1 font-sans text-sm text-muted">{f.desc}</p>
              </div>
            ))}
            {restaurantInfo.features.slice(3).map((f) => (
              <div key={f.title} className="card-brutal flex h-full flex-col p-4 sm:col-span-2 lg:col-span-3">
                <h4 className="font-display text-xl text-gold-gradient">{f.title}</h4>
                <p className="mt-1 font-sans text-sm text-muted">{f.desc}</p>
              </div>
            ))}
          </div>

          <div className="mt-6 grid gap-4 lg:grid-cols-2">
            <div className="card-brutal p-6">
              <p className="font-display text-2xl">Otevírací doba</p>
              <ul className="mt-3 space-y-1 font-sans">
                {site.restaurantHours.map((h) => (
                  <li key={h.days} className="flex flex-col gap-0.5 sm:flex-row sm:justify-between sm:gap-8">
                    <span className="font-medium">{h.days}</span>
                    <span className="text-muted sm:text-right">{h.time}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="card-brutal p-6">
              <h4 className="font-display text-2xl">Menu</h4>
              <ul className="mt-4 grid grid-cols-1 gap-3 font-sans sm:grid-cols-2">
                {restaurantMenuLinks.map((item) => (
                  <li key={item.id}>
                    {item.to ? (
                      <BrutalButton to={item.to} className="w-full text-center">
                        {item.label}
                      </BrutalButton>
                    ) : null}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="px-4 pt-8 pb-16 md:px-6 md:pt-10">
        <div className="mx-auto max-w-[1400px]">
          <div className="mb-8 flex flex-col items-start gap-4 sm:mb-10 sm:flex-row sm:flex-wrap sm:items-end sm:justify-between">
            <div>
              <h3 className="font-display text-3xl text-gold-gradient sm:text-4xl md:text-5xl">
                Rozvoz pizzy
              </h3>
              <p className="mt-2 font-sans text-base text-muted sm:text-lg">
                Objednávejte na ☎ {pizzaDelivery.phone}
              </p>
            </div>
            <BrutalButton href={`tel:${pizzaDelivery.phone.replace(/\s/g, '')}`} className="w-full sm:w-auto">
              ZAVOLAT →
            </BrutalButton>
          </div>

          <div className="card-brutal p-4 sm:p-6">
            <h4 className="font-display text-2xl">Zóny rozvozu</h4>
            <div className="-mx-1 overflow-x-auto">
              <table className="mt-4 w-full min-w-[20rem] font-sans text-sm">
                <thead>
                  <tr className="border-b-2 border-foreground text-left">
                    <th className="pb-2 pr-3">Oblast</th>
                    <th className="pb-2 pr-3 whitespace-nowrap">Min. objednávka</th>
                    <th className="pb-2 whitespace-nowrap">Poplatek</th>
                  </tr>
                </thead>
                <tbody>
                  {pizzaDelivery.zones.map((z) => (
                    <tr key={z.place} className="border-b border-foreground/20">
                      <td className="py-2 pr-3">{z.place}</td>
                      <td className="py-2 pr-3 whitespace-nowrap">{z.min},- Kč</td>
                      <td className="py-2 whitespace-nowrap">
                        {z.fee === 0 ? 'Bez poplatku' : `${z.fee},- Kč`}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="mt-4 font-accent text-lg text-gold-500">
              Při objednávce nad {pizzaDelivery.freeOver},- rozvoz zdarma!
            </p>
            <ul className="mt-4 space-y-1 font-sans text-sm text-muted">
              {pizzaPromos.map((note) => (
                <li key={note}>· {note}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <SisterBrandsSection />

      <GalleryGrid folder="restaurant" title="Galerie restaurace" />
    </>
  )
}
