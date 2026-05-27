import { pizzaDelivery } from '@/data/site'

export function PizzaDeliverySection() {
  return (
    <section className="border-y-4 border-foreground bg-surface px-4 py-16 md:px-6">
      <div className="mx-auto max-w-[900px] text-center">
        <h2 className="font-display text-5xl text-gold-gradient">Rozvoz pizzy</h2>
        <p className="font-accent mt-3 text-2xl text-gold-500">
          Objednávejte na ☎{' '}
          <a
            href={`tel:${pizzaDelivery.phone}`}
            className="underline decoration-gold-500"
          >
            {pizzaDelivery.phone}
          </a>
        </p>

        <ul className="card-brutal mt-8 space-y-2 p-6 text-left font-sans">
          {pizzaDelivery.zones.map((z) => (
            <li
              key={z.place}
              className="flex flex-wrap justify-between gap-2 border-b border-foreground/15 py-2 last:border-0"
            >
              <span className="font-medium">{z.place}</span>
              <span className="text-muted">
                min. {z.min},- Kč · poplatek{' '}
                {z.fee === 0 ? 'Bez poplatku' : `${z.fee},- Kč`}
              </span>
            </li>
          ))}
          <li className="pt-2 font-medium text-gold-500">
            Při objednávce nad {pizzaDelivery.freeOver},- rozvoz zdarma!
          </li>
        </ul>
      </div>
    </section>
  )
}
