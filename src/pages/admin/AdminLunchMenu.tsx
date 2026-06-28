import { AdminSaveBar } from '@/components/admin/AdminSaveBar'
import { useAdminLunchMenu } from '@/hooks/admin/useAdminEditors'

export function AdminLunchMenu() {
  const { menuQuery, data, setLocal, saveMutation } = useAdminLunchMenu()

  if (menuQuery.isLoading) {
    return <p className="font-sans text-muted">Načítám…</p>
  }

  return (
    <div>
      <h1 className="font-display text-4xl text-gold-gradient">Polední menu</h1>
      <p className="mt-2 font-sans text-muted">
        Vyplňte polévku a tři hlavní chody pro každý den. Zaškrtněte „Zavřeno“, pokud se nevaří.
      </p>

      <div className="mt-8 space-y-6">
        {data.days.map((day, dayIndex) => (
          <div key={day.id} className="card-brutal space-y-4 p-5">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <h2 className="font-display text-2xl capitalize">{day.label}</h2>
              <label className="flex items-center gap-2 font-sans text-sm">
                <input
                  type="checkbox"
                  checked={day.closed === true}
                  onChange={(e) =>
                    setLocal((prev) => ({
                      ...prev,
                      days: prev.days.map((d, i) =>
                        i === dayIndex ? { ...d, closed: e.target.checked } : d,
                      ),
                    }))
                  }
                />
                Den zavřený
              </label>
            </div>

            <div className="space-y-2">
              <p className="font-display text-sm uppercase">Polévka</p>
              <input
                className="input-brutal w-full"
                value={day.soup.name}
                disabled={day.closed}
                placeholder="Název polévky"
                onChange={(e) =>
                  setLocal((prev) => ({
                    ...prev,
                    days: prev.days.map((d, i) =>
                      i === dayIndex
                        ? { ...d, soup: { ...d.soup, name: e.target.value } }
                        : d,
                    ),
                  }))
                }
              />
              <input
                className="input-brutal w-full"
                value={day.soup.description ?? ''}
                disabled={day.closed}
                placeholder="Popis (volitelné)"
                onChange={(e) =>
                  setLocal((prev) => ({
                    ...prev,
                    days: prev.days.map((d, i) =>
                      i === dayIndex
                        ? { ...d, soup: { ...d.soup, description: e.target.value } }
                        : d,
                    ),
                  }))
                }
              />
            </div>

            {day.rotatingMains.map((main, mainIndex) => (
              <div key={main.id} className="space-y-2 border-t border-foreground/15 pt-4">
                <p className="font-display text-sm uppercase">Hlavní chod {mainIndex + 1}</p>
                <input
                  className="input-brutal w-full"
                  value={main.name}
                  disabled={day.closed}
                  placeholder="Název jídla"
                  onChange={(e) =>
                    setLocal((prev) => ({
                      ...prev,
                      days: prev.days.map((d, i) =>
                        i === dayIndex
                          ? {
                              ...d,
                              rotatingMains: d.rotatingMains.map((m, mi) =>
                                mi === mainIndex ? { ...m, name: e.target.value } : m,
                              ),
                            }
                          : d,
                      ),
                    }))
                  }
                />
                <input
                  className="input-brutal w-full"
                  value={main.description ?? ''}
                  disabled={day.closed}
                  placeholder="Popis (volitelné)"
                  onChange={(e) =>
                    setLocal((prev) => ({
                      ...prev,
                      days: prev.days.map((d, i) =>
                        i === dayIndex
                          ? {
                              ...d,
                              rotatingMains: d.rotatingMains.map((m, mi) =>
                                mi === mainIndex ? { ...m, description: e.target.value } : m,
                              ),
                            }
                          : d,
                      ),
                    }))
                  }
                />
              </div>
            ))}
          </div>
        ))}
      </div>

      <AdminSaveBar
        onSave={() => saveMutation.mutate(data)}
        saving={saveMutation.isPending}
      />
    </div>
  )
}
