import { AdminSaveBar } from '@/components/admin/AdminSaveBar'
import { AdminCard, AdminField, AdminInput, AdminLoading, AdminPageHeader } from '@/components/admin/ui'
import { useAdminDrinksMenu } from '@/hooks/admin/useAdminEditors'

export function AdminDrinksMenu() {
  const { menuQuery, data, setLocal, saveMutation } = useAdminDrinksMenu()

  if (menuQuery.isLoading) {
    return <AdminLoading />
  }

  return (
    <div>
      <AdminPageHeader
        title="Nápojový lístek"
        description="Upravte nápoje a ceny podle sekcí."
      />

      <div className="space-y-6">
        {data.sections.map((section, sectionIndex) => (
          <AdminCard key={section.id} className="space-y-4 p-5">
            <h2 className="admin-h2">{section.title}</h2>
            {section.items.map((row, rowIndex) => (
              <div
                key={`${section.id}-${rowIndex}`}
                className="space-y-3 border-b border-[var(--admin-border)] pb-4 last:border-0"
              >
                <p className="text-sm font-semibold text-[var(--admin-muted)]">Položka {rowIndex + 1}</p>
                <div className="grid gap-3 md:grid-cols-4">
                  <AdminField label="Název" className="md:col-span-2">
                    <AdminInput
                      value={row.name}
                      placeholder="Název nápoje"
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
                  </AdminField>
                  {section.dualSize ? (
                    <>
                      <AdminField label="Cena 0,5 l">
                        <AdminInput
                          value={row.price05 ?? ''}
                          placeholder="0,5 l"
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
                      </AdminField>
                      <AdminField label="Cena 0,3 l">
                        <AdminInput
                          value={row.price03 ?? ''}
                          placeholder="0,3 l"
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
                      </AdminField>
                    </>
                  ) : (
                    <AdminField label="Cena" className="md:col-span-2">
                      <AdminInput
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
                    </AdminField>
                  )}
                </div>
              </div>
            ))}
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
