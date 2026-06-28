import { usePublicLunchMenu } from '@/hooks/usePublicContent'

export function LunchMenuView() {
  const { data, isLoading } = usePublicLunchMenu()

  if (isLoading || !data) {
    return <p className="font-sans text-muted">Načítám menu…</p>
  }

  return (
    <div>
      <h3 className="font-display text-4xl text-gold-gradient md:text-5xl">{data.title}</h3>
      <p className="mt-2 font-sans text-muted">Restaurace Podhora · polední nabídka</p>

      <div className="mt-8 space-y-6">
        {data.days.map((day) => (
          <div key={day.id} className="card-brutal p-5 md:p-6">
            <h4 className="font-display text-2xl capitalize text-gold-gradient">{day.label}</h4>
            {day.closed ? (
              <p className="mt-3 font-sans text-muted">Tento den zavřeno</p>
            ) : (
              <div className="mt-4 space-y-4 font-sans">
                <div>
                  <p className="text-xs uppercase tracking-wide text-muted">Polévka</p>
                  <p className="font-medium">{day.soup.name || '—'}</p>
                  {day.soup.description ? (
                    <p className="text-sm text-muted">{day.soup.description}</p>
                  ) : null}
                </div>
                {day.rotatingMains.map((main, index) => (
                  <div key={main.id}>
                    <p className="text-xs uppercase tracking-wide text-muted">Hlavní chod {index + 1}</p>
                    <p className="font-medium">{main.name || '—'}</p>
                    {main.description ? (
                      <p className="text-sm text-muted">{main.description}</p>
                    ) : null}
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
