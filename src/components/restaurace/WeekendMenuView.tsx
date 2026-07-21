import { usePublicWeekendMenu } from '@/hooks/usePublicContent'

export function WeekendMenuView() {
  const { data, isLoading } = usePublicWeekendMenu()

  if (isLoading || !data) {
    return <p className="font-sans text-muted">Načítám menu…</p>
  }

  return (
    <div>
      <h3 className="font-display text-3xl text-gold-gradient sm:text-4xl md:text-5xl">{data.title}</h3>
      {data.note ? <p className="mt-2 font-sans text-muted">{data.note}</p> : null}

      <div className="card-brutal mt-8 p-4 sm:p-5 md:p-6">
        <div className="-mx-1 overflow-x-auto">
          <table className="w-full min-w-[16rem] border-collapse font-sans text-sm">
            <tbody>
              {data.items.map((item) => (
                <tr key={item.name} className="border-b border-foreground/15 align-top">
                  <td className="py-3 pr-3">
                    <span className="font-medium">{item.name}</span>
                    {item.description ? (
                      <p className="mt-0.5 text-xs text-muted">({item.description})</p>
                    ) : null}
                  </td>
                  <td className="py-3 text-right font-display text-lg text-gold-500 whitespace-nowrap">
                    {item.price}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
