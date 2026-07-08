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
import { useAdminDrinksMenu } from '@/hooks/admin/useAdminEditors'
import type { DrinkSection } from '@/types/content'

function newSectionId() {
  return `section-${Date.now()}-${Math.floor(Math.random() * 1000)}`
}

export function AdminDrinksMenu() {
  const { menuQuery, data, setLocal, saveMutation } = useAdminDrinksMenu()

  if (menuQuery.isLoading) {
    return <AdminLoading />
  }

  return (
    <div>
      <AdminPageHeader
        title="Nápojový lístek"
        description="Upravte nápoje a ceny podle sekcí. Můžete přidávat i odebírat položky a celé sekce."
      />

      <div className="space-y-6">
        {data.sections.map((section, sectionIndex) => (
          <AdminCard key={section.id} className="space-y-4 p-5">
            <div className="flex flex-wrap items-end justify-between gap-3">
              <AdminField label="Název sekce" className="flex-1">
                <AdminInput
                  value={section.title}
                  placeholder="Název sekce"
                  onChange={(e) =>
                    setLocal((prev) => ({
                      ...prev,
                      sections: prev.sections.map((s, si) =>
                        si === sectionIndex ? { ...s, title: e.target.value } : s,
                      ),
                    }))
                  }
                />
              </AdminField>
              <label className="flex items-center gap-2 pb-2 text-sm text-[var(--admin-muted)]">
                <input
                  type="checkbox"
                  checked={section.dualSize === true}
                  onChange={(e) =>
                    setLocal((prev) => ({
                      ...prev,
                      sections: prev.sections.map((s, si) =>
                        si === sectionIndex ? { ...s, dualSize: e.target.checked } : s,
                      ),
                    }))
                  }
                />
                Dvě velikosti (0,5 l / 0,3 l)
              </label>
              <AdminRemoveButton
                confirmLabel={section.title.trim() ? `sekci „${section.title.trim()}"` : 'tuto sekci'}
                onRemove={() =>
                  setLocal((prev) => ({
                    ...prev,
                    sections: prev.sections.filter((_, si) => si !== sectionIndex),
                  }))
                }
              >
                Odebrat sekci
              </AdminRemoveButton>
            </div>

            {section.items.map((row, rowIndex) => (
              <div
                key={`${section.id}-${rowIndex}`}
                className="space-y-3 border-b border-[var(--admin-border)] pb-4 last:border-0"
              >
                <div className="flex items-center justify-between">
                  <p className="text-sm font-semibold text-[var(--admin-muted)]">Položka {rowIndex + 1}</p>
                  <AdminRemoveButton
                    confirmLabel={row.name.trim() ? `„${row.name.trim()}"` : `položku ${rowIndex + 1}`}
                    onRemove={() =>
                      setLocal((prev) => ({
                        ...prev,
                        sections: prev.sections.map((s, si) =>
                          si === sectionIndex
                            ? { ...s, items: s.items.filter((_, ri) => ri !== rowIndex) }
                            : s,
                        ),
                      }))
                    }
                  />
                </div>
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

            <AdminButton
              variant="secondary"
              onClick={() =>
                setLocal((prev) => ({
                  ...prev,
                  sections: prev.sections.map((s, si) =>
                    si === sectionIndex ? { ...s, items: [...s.items, { name: '', price: '' }] } : s,
                  ),
                }))
              }
            >
              + Přidat položku
            </AdminButton>
          </AdminCard>
        ))}
      </div>

      <div className="mt-6">
        <AdminButton
          variant="secondary"
          onClick={() =>
            setLocal((prev) => ({
              ...prev,
              sections: [
                ...prev.sections,
                { id: newSectionId(), title: '', items: [] } satisfies DrinkSection,
              ],
            }))
          }
        >
          + Přidat sekci
        </AdminButton>
      </div>

      <AdminSaveBar
        onSave={() => saveMutation.mutate(data)}
        saving={saveMutation.isPending}
      />
    </div>
  )
}
