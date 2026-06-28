import { usePublicDrinksMenu } from '@/hooks/usePublicContent'
import type { DrinkRow, DrinkSection } from '@/types/content'

function PriceCell({ value }: { value: string }) {
  return <span className="font-display text-lg text-gold-500">{value}</span>
}

function DrinkRowCells({ row, dualSize }: { row: DrinkRow; dualSize?: boolean }) {
  if (dualSize && row.price05 != null && row.price03 != null) {
    return (
      <>
        <td className="py-2 text-right">
          <PriceCell value={row.price05} />
        </td>
        <td className="py-2 text-right">
          <PriceCell value={row.price03} />
        </td>
      </>
    )
  }

  const colSpan = dualSize ? 2 : 1
  return (
    <td className="py-2 text-right" colSpan={colSpan}>
      {row.price ? <PriceCell value={row.price} /> : null}
    </td>
  )
}

function DrinkSectionTable({ section }: { section: DrinkSection }) {
  const dualSize = section.dualSize === true

  return (
    <div className="card-brutal p-5 md:p-6">
      <h4 className="font-display text-2xl text-gold-gradient">{section.title}</h4>
      <table className="mt-4 w-full border-collapse font-sans text-sm">
        {dualSize ? (
          <thead>
            <tr className="border-b-2 border-foreground/30 text-muted">
              <th className="pb-2 text-left font-medium" />
              <th className="pb-2 text-right font-medium">0,5l</th>
              <th className="pb-2 text-right font-medium">0,3l</th>
            </tr>
          </thead>
        ) : null}
        <tbody>
          {section.items.map((row) => (
            <tr key={row.name} className="border-b border-foreground/15">
              <td className="py-2 pr-4 font-medium">{row.name}</td>
              <DrinkRowCells row={row} dualSize={dualSize} />
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export function DrinksMenu() {
  const { data, isLoading } = usePublicDrinksMenu()

  if (isLoading || !data) {
    return <p className="font-sans text-muted">Načítám nápojový lístek…</p>
  }

  return (
    <div>
      <h3 className="font-display text-4xl text-gold-gradient md:text-5xl">{data.title}</h3>
      <p className="mt-2 font-sans text-muted">Restaurace Podhora</p>
      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        {data.sections.map((section) => (
          <DrinkSectionTable key={section.id} section={section} />
        ))}
      </div>
    </div>
  )
}
