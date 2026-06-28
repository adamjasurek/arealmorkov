import { AdminSaveBar } from '@/components/admin/AdminSaveBar'
import { useAdminDrinksMenu } from '@/hooks/admin/useAdminEditors'

export function AdminDrinksMenu() {
  const { menuQuery, data, setLocal, saveMutation } = useAdminDrinksMenu()

  if (menuQuery.isLoading) {
    return <p className="font-sans text-muted">Načítám…</p>
  }

  return (
    <div>
      <h1 className="font-display text-4xl text-gold-gradient">Nápojový lístek</h1>
      <p className="mt-2 font-sans text-muted">Upravte nápoje a ceny podle sekcí.</p>

      <div className="mt-8 space-y-6">
        {data.sections.map((section, sectionIndex) => (
          <div key={section.id} className="card-brutal space-y-3 p-5">
            <h2 className="font-display text-2xl text-gold-gradient">{section.title}</h2>
            {section.items.map((row, rowIndex) => (
              <div key={`${section.id}-${rowIndex}`} className="grid gap-2 md:grid-cols-4">
                <input
                  className="input-brutal md:col-span-2"
                  value={row.name}
                  onChange={(e) =>
                    setLocal((prev) => ({
                      ...prev,
                      sections: prev.sections.map((s, si) =>
                        si === sectionIndex
                          ? {
                              ...s,
                              items: s.items.map((item, ri) =>
                                ri === rowIndex ? { ...item, name: e.target.value } : item,
                              ),
                            }
                          : s,
                      ),
                    }))
                  }
                />
                {section.dualSize ? (
                  <>
                    <input
                      className="input-brutal"
                      value={row.price05 ?? ''}
                      placeholder="0,5l"
                      onChange={(e) =>
                        setLocal((prev) => ({
                          ...prev,
                          sections: prev.sections.map((s, si) =>
                            si === sectionIndex
                              ? {
                                  ...s,
                                  items: s.items.map((item, ri) =>
                                    ri === rowIndex ? { ...item, price05: e.target.value } : item,
                                  ),
                                }
                              : s,
                          ),
                        }))
                      }
                    />
                    <input
                      className="input-brutal"
                      value={row.price03 ?? ''}
                      placeholder="0,3l"
                      onChange={(e) =>
                        setLocal((prev) => ({
                          ...prev,
                          sections: prev.sections.map((s, si) =>
                            si === sectionIndex
                              ? {
                                  ...s,
                                  items: s.items.map((item, ri) =>
                                    ri === rowIndex ? { ...item, price03: e.target.value } : item,
                                  ),
                                }
                              : s,
                          ),
                        }))
                      }
                    />
                  </>
                ) : (
                  <input
                    className="input-brutal md:col-span-2"
                    value={row.price ?? ''}
                    placeholder="Cena"
                    onChange={(e) =>
                      setLocal((prev) => ({
                        ...prev,
                        sections: prev.sections.map((s, si) =>
                          si === sectionIndex
                            ? {
                                ...s,
                                items: s.items.map((item, ri) =>
                                  ri === rowIndex ? { ...item, price: e.target.value } : item,
                                ),
                              }
                            : s,
                        ),
                      }))
                    }
                  />
                )}
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
