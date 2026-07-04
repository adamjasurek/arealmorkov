import { AdminSaveBar } from '@/components/admin/AdminSaveBar'
import { AdminCard, AdminField, AdminInput, AdminLoading, AdminPageHeader } from '@/components/admin/ui'
import { useAdminSiteContent } from '@/hooks/admin/useAdminEditors'

export function AdminSiteContent() {
  const { menuQuery, data, setLocal, saveMutation } = useAdminSiteContent()

  if (menuQuery.isLoading) {
    return <AdminLoading />
  }

  return (
    <div>
      <AdminPageHeader
        title="Doby a ceníky"
        description="Otevírací doby, vstupné, kemp a běžící text na webu."
      />

      <div className="space-y-6">
        <AdminCard className="space-y-4 p-5">
          <h2 className="admin-h2">Koupaliště — provoz</h2>
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
          <h2 className="admin-h2">Koupaliště — vstupné</h2>
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

        <AdminCard className="space-y-4 p-5">
          <h2 className="admin-h2">Restaurace — otevírací doba</h2>
          {data.restaurantHours.map((row, index) => (
            <div key={index} className="grid gap-3 md:grid-cols-2">
              <AdminField label="Dny">
                <AdminInput
                  value={row.days}
                  placeholder="Např. Po–Pá"
                  onChange={(e) =>
                    setLocal((prev) => ({
                      ...prev,
                      restaurantHours: prev.restaurantHours.map((item, i) =>
                        i === index ? { ...item, days: e.target.value } : item,
                      ),
                    }))
                  }
                />
              </AdminField>
              <AdminField label="Otevírací doba">
                <AdminInput
                  value={row.time}
                  placeholder="Např. 11:00–22:00"
                  onChange={(e) =>
                    setLocal((prev) => ({
                      ...prev,
                      restaurantHours: prev.restaurantHours.map((item, i) =>
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
          <h2 className="admin-h2">Kemp — ceník</h2>
          {data.kempPricing.map((row, index) => (
            <div key={index} className="grid gap-3 md:grid-cols-2">
              <AdminField label="Položka">
                <AdminInput
                  value={row.label}
                  placeholder="Např. Stan malý"
                  onChange={(e) =>
                    setLocal((prev) => ({
                      ...prev,
                      kempPricing: prev.kempPricing.map((item, i) =>
                        i === index ? { ...item, label: e.target.value } : item,
                      ),
                    }))
                  }
                />
              </AdminField>
              <AdminField label="Cena">
                <AdminInput
                  value={row.price}
                  placeholder="Cena"
                  onChange={(e) =>
                    setLocal((prev) => ({
                      ...prev,
                      kempPricing: prev.kempPricing.map((item, i) =>
                        i === index ? { ...item, price: e.target.value } : item,
                      ),
                    }))
                  }
                />
              </AdminField>
            </div>
          ))}
        </AdminCard>

        <AdminCard className="space-y-4 p-5">
          <h2 className="admin-h2">Běžící text (ticker)</h2>
          {data.marqueeItems.map((item, index) => (
            <AdminField key={index} label={`Text ${index + 1}`}>
              <AdminInput
                value={item}
                placeholder="Krátká informace pro běžící text"
                onChange={(e) =>
                  setLocal((prev) => ({
                    ...prev,
                    marqueeItems: prev.marqueeItems.map((row, i) =>
                      i === index ? e.target.value : row,
                    ),
                  }))
                }
              />
            </AdminField>
          ))}
        </AdminCard>

        <AdminCard className="space-y-4 p-5">
          <h2 className="admin-h2">Rozvoz pizzy</h2>
          <AdminField label="Telefon">
            <AdminInput
              value={data.pizzaDelivery.phone}
              placeholder="Telefon"
              onChange={(e) =>
                setLocal((prev) => ({
                  ...prev,
                  pizzaDelivery: { ...prev.pizzaDelivery, phone: e.target.value },
                }))
              }
            />
          </AdminField>
          <AdminField label="Rozvoz zdarma nad (Kč)">
            <AdminInput
              type="number"
              value={data.pizzaDelivery.freeOver}
              placeholder="Rozvoz zdarma nad (Kč)"
              onChange={(e) =>
                setLocal((prev) => ({
                  ...prev,
                  pizzaDelivery: {
                    ...prev.pizzaDelivery,
                    freeOver: Number(e.target.value) || 0,
                  },
                }))
              }
            />
          </AdminField>
        </AdminCard>
      </div>

      <AdminSaveBar
        onSave={() => saveMutation.mutate(data)}
        saving={saveMutation.isPending}
      />
    </div>
  )
}
