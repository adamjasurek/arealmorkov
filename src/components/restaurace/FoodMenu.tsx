import { usePublicFoodMenu } from '@/hooks/usePublicContent'
import type { MenuPriceItem, PizzaItem } from '@/types/content'

function PriceCell({ value }: { value: string }) {
  return <span className="font-display text-lg text-gold-500">{value}</span>
}

function PizzaTable({
  title,
  subtitle,
  items,
}: {
  title: string
  subtitle?: string
  items: PizzaItem[]
}) {
  return (
    <div className="card-brutal flex h-full flex-col p-4 sm:p-5 md:p-6">
      <h4 className="font-display text-2xl text-gold-gradient">{title}</h4>
      {subtitle ? <p className="mt-1 font-sans text-sm text-muted">{subtitle}</p> : null}
      <div className="-mx-1 overflow-x-auto">
        <table className="mt-4 w-full min-w-[18rem] border-collapse font-sans text-sm">
          <thead>
            <tr className="border-b-2 border-foreground/30 text-muted">
              <th className="pb-2 text-left font-medium" />
              <th className="pb-2 text-right font-medium whitespace-nowrap">32 cm</th>
              <th className="pb-2 text-right font-medium whitespace-nowrap">45 cm</th>
            </tr>
          </thead>
          <tbody>
            {items.map((pizza) => (
              <tr key={pizza.num} className="border-b border-foreground/15 align-top">
                <td className="py-3 pr-3">
                  <span className="font-medium">
                    {pizza.num}. {pizza.name}
                  </span>
                  <p className="mt-0.5 text-xs text-muted">({pizza.ingredients})</p>
                </td>
                <td className="py-3 pl-2 text-right">
                  <PriceCell value={pizza.price32} />
                </td>
                <td className="py-3 pl-2 text-right">
                  <PriceCell value={pizza.price45} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

function SimpleMenuTable({ title, items }: { title: string; items: MenuPriceItem[] }) {
  return (
    <div>
      <h4 className="font-display text-xl text-gold-gradient">{title}</h4>
      <table className="mt-3 w-full border-collapse font-sans text-sm">
        <tbody>
          {items.map((item) => (
            <tr key={item.name} className="border-b border-foreground/15 align-top">
              <td className="py-2 pr-3">
                <span className="font-medium">{item.name}</span>
                {item.description ? (
                  <p className="mt-0.5 text-xs text-muted">({item.description})</p>
                ) : null}
              </td>
              <td className="py-2 text-right whitespace-nowrap">
                <PriceCell value={item.price} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export function FoodMenu() {
  const { data, isLoading } = usePublicFoodMenu()

  if (isLoading || !data) {
    return <p className="font-sans text-muted">Načítám menu…</p>
  }

  return (
    <div>
      <h3 className="font-display text-3xl text-gold-gradient sm:text-4xl md:text-5xl">{data.title}</h3>
      <p className="mt-2 font-sans text-muted">Restaurace Podhora · Pizza Olymp</p>

      <div className="mt-8 grid gap-6 xl:grid-cols-3">
        <PizzaTable title="Pizza" subtitle="Rajčatový základ" items={data.tomatoPizzas} />

        <div className="flex flex-col gap-6">
          <PizzaTable title="Smetanový základ" items={data.creamPizzas} />
          <div className="card-brutal p-5 md:p-6">
            <h4 className="font-display text-xl text-gold-gradient">Krabice</h4>
            <ul className="mt-3 space-y-2 font-sans text-sm">
              {data.pizzaBoxes.map((box) => (
                <li key={box.name} className="flex justify-between gap-4">
                  <span className="font-medium">{box.name}</span>
                  <PriceCell value={box.price} />
                </li>
              ))}
            </ul>
            <p className="mt-4 font-sans text-sm text-muted">{data.foodMenuNotes.extraIngredients}</p>
          </div>
        </div>

        <div className="card-brutal flex h-full flex-col p-5 md:p-6">
          <SimpleMenuTable title="Další nabídka" items={data.otherOfferings} />
          <div className="mt-6 border-t-2 border-foreground/20 pt-6">
            <SimpleMenuTable title="Smažené sýrečky" items={data.friedCheeses} />
          </div>
          <p className="mt-6 font-sans text-sm text-muted">{data.foodMenuNotes.allergens}</p>
        </div>
      </div>
    </div>
  )
}
