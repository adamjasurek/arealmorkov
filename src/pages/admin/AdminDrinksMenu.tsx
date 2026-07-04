import { AdminSaveBar } from '@/components/admin/AdminSaveBar'
import { AdminCard, AdminInput, AdminLoading, AdminPageHeader } from '@/components/admin/ui'
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
          <AdminCard key={section.id} className="space-y-3 p-5">
            <h2 className="admin-h2">{section.title}</h2>
            {section.items.map((row, rowIndex) => (
              <div key={`${section.id}-${rowIndex}`} className="grid gap-2 md:grid-cols-4">
                <AdminInput
                  className="md:col-span-2"
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
                    <AdminInput
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
                    <AdminInput
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
                  <AdminInput
                    className="md:col-span-2"
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
