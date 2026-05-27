import { pizzaMenu, pizzaPromos } from '@/data/menu'
import { menuLinks } from '@/data/images'
import { pizzaDelivery, restaurantInfo } from '@/data/site'
import { GalleryGrid } from '@/components/ui/GalleryGrid'
import { Marquee } from '@/components/layout/Marquee'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { BrutalButton } from '@/components/ui/BrutalButton'
import { MenuGrid } from '@/components/restaurace/MenuGrid'
import { PhotoBackground } from '@/components/ui/PhotoBackground'

export function RestauracePage() {
  return (
    <>
      <section className="relative isolate overflow-hidden border-b-4 border-foreground px-4 py-16 md:px-6">
        <PhotoBackground src={restaurantInfo.image} alt="Interiér restaurace Podhora" />
        <div className="relative z-10 mx-auto max-w-[1400px]">
          <SectionHeading
            eyebrow="pizza rozvoz · podhora"
            title={restaurantInfo.title}
            accent="JÍDLO"
          />
          <p className="font-accent text-xl text-gold-500 -rotate-1">{restaurantInfo.subtitle}</p>
          <p className="mt-8 max-w-3xl font-sans text-lg text-muted">{restaurantInfo.intro}</p>

          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {restaurantInfo.features.map((f) => (
              <div key={f.title} className="card-brutal p-4">
                <h4 className="font-display text-xl text-gold-gradient">{f.title}</h4>
                <p className="mt-1 font-sans text-sm text-muted">{f.desc}</p>
              </div>
            ))}
          </div>

          <div className="mt-10 card-brutal inline-block p-6">
            <p className="font-display text-2xl">Otevírací doba</p>
            <ul className="mt-3 space-y-1 font-sans">
              {restaurantInfo.hours.map((h) => (
                <li key={h.days} className="flex justify-between gap-8">
                  <span className="font-medium">{h.days}</span>
                  <span className="text-muted">{h.time}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-10 card-brutal p-6">
            <h4 className="font-display text-2xl">Naše nabídka (PDF)</h4>
            <ul className="mt-4 flex flex-wrap gap-3 font-sans">
              <li>
                <BrutalButton href={menuLinks.denni} external>
                  POLEDNÍ MENU
                </BrutalButton>
              </li>
              <li>
                <BrutalButton href={menuLinks.vikend} external>
                  VÍKEND
                </BrutalButton>
              </li>
              <li>
                <BrutalButton href={menuLinks.stalaNabidka} external>
                  STÁLÁ NABÍDKA
                </BrutalButton>
              </li>
              <li>
                <BrutalButton href={menuLinks.napojovy} external>
                  NÁPOJE
                </BrutalButton>
              </li>
            </ul>
          </div>
        </div>
      </section>

      <Marquee
        items={[
          '★ PIZZA OLYMP ★',
          `OBJEDNÁVKY ${pizzaDelivery.phone}`,
          'ROZVOZ',
          '34 CM',
          '40 CM',
        ]}
      />

      <section className="px-4 py-16 md:px-6">
        <div className="mx-auto max-w-[1400px]">
          <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
            <div>
              <h3 className="font-display text-5xl text-gold-gradient">Rozvozová nabídka</h3>
              <p className="font-accent mt-2 text-xl text-gold-500 -rotate-1">
                Objednávejte na ☎ {pizzaDelivery.phone}
              </p>
            </div>
            <BrutalButton href={`tel:${pizzaDelivery.phone.replace(/\s/g, '')}`}>
              ZAVOLAT →
            </BrutalButton>
          </div>

          <ul className="mb-10 list-disc space-y-1 pl-5 font-sans text-sm text-muted">
            {pizzaPromos.map((p) => (
              <li key={p}>{p}</li>
            ))}
          </ul>

          <MenuGrid items={pizzaMenu} />

          <div className="card-brutal mt-12 p-6">
            <h4 className="font-display text-2xl">Zóny rozvozu</h4>
            <table className="mt-4 w-full font-sans text-sm">
              <thead>
                <tr className="border-b-2 border-foreground text-left">
                  <th className="pb-2">Oblast</th>
                  <th className="pb-2">Min. objednávka</th>
                  <th className="pb-2">Poplatek</th>
                </tr>
              </thead>
              <tbody>
                {pizzaDelivery.zones.map((z) => (
                  <tr key={z.place} className="border-b border-foreground/20">
                    <td className="py-2">{z.place}</td>
                    <td className="py-2">{z.min},- Kč</td>
                    <td className="py-2">{z.fee === 0 ? 'Zdarma' : `${z.fee},- Kč`}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <p className="mt-4 font-accent text-lg text-gold-500">
              Při objednávce nad {pizzaDelivery.freeOver},- rozvoz zdarma!
            </p>
            <p className="mt-2 font-sans text-muted">{pizzaDelivery.closing}</p>
          </div>
        </div>
      </section>

      <GalleryGrid folder="restaurant" title="Galerie restaurace" />
    </>
  )
}
