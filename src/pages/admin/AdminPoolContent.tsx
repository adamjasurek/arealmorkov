import { AdminSaveBar } from '@/components/admin/AdminSaveBar'
import { AdminCard, AdminField, AdminInput, AdminLoading, AdminPageHeader } from '@/components/admin/ui'
import { useAdminSiteContent } from '@/hooks/admin/useAdminEditors'

export function AdminPoolContent() {
  const { menuQuery, data, setLocal, saveMutation } = useAdminSiteContent()

  if (menuQuery.isLoading) {
    return <AdminLoading />
  }

  return (
    <div>
      <AdminPageHeader
        title="Koupaliště"
        description="Provozní doba a vstupné na koupališti."
      />

      <div className="space-y-6">
        <AdminCard className="space-y-4 p-5">
          <h2 className="admin-h2">Provoz</h2>
          {data.poolHours.map((row, index) => (
            <div key={index} className="grid gap-3 md:grid-cols-2">
              <AdminField label="Popisek">
                <AdminInput
                  value={row.label}
                  placeholder="Např. Letní sezóna"
                  onChange={(e) =>
                    setLocal((prev) => ({
                      ...prev,
                      poolHours: prev.poolHours.map((item, i) =>
                        i === index ? { ...item, label: e.target.value } : item,
                      ),
                    }))
                  }
                />
              </AdminField>
              <AdminField label="Provozní doba">
                <AdminInput
                  value={row.time}
                  placeholder="Např. 9:00–19:00"
                  onChange={(e) =>
                    setLocal((prev) => ({
                      ...prev,
                      poolHours: prev.poolHours.map((item, i) =>
                        i === index ? { ...item, time: e.target.value } : item,
                      ),
                    }))
                  }
                />
              </AdminField>
            </div>
          ))}
        </AdminCard>

        <AdminCard className="space-y-4 p-5">
          <h2 className="admin-h2">Vstupné</h2>
          {data.poolAdmission.map((row, index) => (
            <div key={index} className="space-y-3 border-b border-[var(--admin-border)] pb-4 last:border-0">
              <AdminField label="Kategorie">
                <AdminInput
                  value={row.label}
                  placeholder="Např. Dospělý"
                  onChange={(e) =>
                    setLocal((prev) => ({
                      ...prev,
                      poolAdmission: prev.poolAdmission.map((item, i) =>
                        i === index ? { ...item, label: e.target.value } : item,
                      ),
                    }))
                  }
                />
              </AdminField>
              <div className="grid gap-3 md:grid-cols-2">
                <AdminField label="Cena">
                  <AdminInput
                    value={row.price}
                    placeholder="Cena"
                    onChange={(e) =>
                      setLocal((prev) => ({
                        ...prev,
                        poolAdmission: prev.poolAdmission.map((item, i) =>
                          i === index ? { ...item, price: e.target.value } : item,
                        ),
                      }))
                    }
                  />
                </AdminField>
                <AdminField label="Poznámka">
                  <AdminInput
                    value={row.note ?? ''}
                    placeholder="Poznámka (volitelné)"
                    onChange={(e) =>
                      setLocal((prev) => ({
                        ...prev,
                        poolAdmission: prev.poolAdmission.map((item, i) =>
                          i === index ? { ...item, note: e.target.value } : item,
                        ),
                      }))
                    }
                  />
                </AdminField>
              </div>
            </div>
          ))}
        </AdminCard>
      </div>

      <AdminSaveBar
        onSave={() => saveMutation.mutate(data)}
        saving={saveMutation.isPending}
      />
    </div>
  )
}
