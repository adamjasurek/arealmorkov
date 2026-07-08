import { AdminSaveBar } from '@/components/admin/AdminSaveBar'
import {
  AdminButton,
  AdminCard,
  AdminField,
  AdminInput,
  AdminLoading,
  AdminPageHeader,
  AdminRemoveButton,
} from '@/components/admin/ui'
import { useAdminLunchMenu } from '@/hooks/admin/useAdminEditors'

function newMainId() {
  return `main-${Date.now()}-${Math.floor(Math.random() * 1000)}`
}

export function AdminLunchMenu() {
  const { menuQuery, data, setLocal, saveMutation } = useAdminLunchMenu()

  if (menuQuery.isLoading) {
    return <AdminLoading />
  }

  return (
    <div>
      <AdminPageHeader
        title="Polední menu"
        description="Vyplňte polévku a tři hlavní chody pro každý den. Zaškrtněte „Zavřeno“, pokud se nevaří."
      />

      <div className="space-y-6">
        {data.days.map((day, dayIndex) => (
          <AdminCard key={day.id} className="space-y-4 p-5">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <h2 className="admin-h2 capitalize">{day.label}</h2>
              <label className="flex items-center gap-2 text-sm text-[var(--admin-muted)]">
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

            <div className="space-y-3">
              <p className="admin-h2 text-base">Polévka</p>
              <AdminField label="Název polévky">
                <AdminInput
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
              </AdminField>
              <AdminField label="Popis polévky">
                <AdminInput
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
              </AdminField>
            </div>

            {day.rotatingMains.map((main, mainIndex) => (
              <div key={main.id} className="space-y-3 border-t border-[var(--admin-border)] pt-4">
                <div className="flex items-center justify-between">
                  <p className="admin-h2 text-base">Hlavní chod {mainIndex + 1}</p>
                  <AdminRemoveButton
                    confirmLabel={main.name.trim() ? `„${main.name.trim()}"` : `hlavní chod ${mainIndex + 1}`}
                    onRemove={() =>
                      setLocal((prev) => ({
                        ...prev,
                        days: prev.days.map((d, i) =>
                          i === dayIndex
                            ? { ...d, rotatingMains: d.rotatingMains.filter((_, mi) => mi !== mainIndex) }
                            : d,
                        ),
                      }))
                    }
                  />
                </div>
                <AdminField label="Název jídla">
                  <AdminInput
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
                </AdminField>
                <AdminField label="Popis jídla">
                  <AdminInput
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
                </AdminField>
              </div>
            ))}

            <AdminButton
              variant="secondary"
              disabled={day.closed}
              onClick={() =>
                setLocal((prev) => ({
                  ...prev,
                  days: prev.days.map((d, i) =>
                    i === dayIndex
                      ? {
                          ...d,
                          rotatingMains: [
                            ...d.rotatingMains,
                            { id: newMainId(), name: '', description: '' },
                          ],
                        }
                      : d,
                  ),
                }))
              }
            >
              + Přidat hlavní chod
            </AdminButton>
          </AdminCard>
        ))}
      </div>

      <AdminSaveBar
        onSave={() => saveMutation.mutate(data)}
        saving={saveMutation.isPending}
      />
    </div>
  )
}
