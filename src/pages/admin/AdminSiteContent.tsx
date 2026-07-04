import { AdminSaveBar } from '@/components/admin/AdminSaveBar'
import { AdminLoading, AdminPageHeader } from '@/components/admin/ui'
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
        <section className="admin-card space-y-3 p-5">
          <h2 className="admin-h2">Koupaliště — provoz</h2>
          {data.poolHours.map((row, index) => (
            <div key={index} className="grid gap-2 md:grid-cols-2">
              <input
                className="admin-input"
                value={row.label}
                onChange={(e) =>
                  setLocal((prev) => ({
                    ...prev,
                    poolHours: prev.poolHours.map((item, i) =>
                      i === index ? { ...item, label: e.target.value } : item,
                    ),
                  }))
                }
              />
              <input
                className="admin-input"
                value={row.time}
                onChange={(e) =>
                  setLocal((prev) => ({
                    ...prev,
                    poolHours: prev.poolHours.map((item, i) =>
                      i === index ? { ...item, time: e.target.value } : item,
                    ),
                  }))
                }
              />
            </div>
          ))}
        </section>

        <section className="admin-card space-y-3 p-5">
          <h2 className="admin-h2">Koupaliště — vstupné</h2>
          {data.poolAdmission.map((row, index) => (
            <div key={index} className="space-y-2 border-b border-[var(--admin-border)] pb-3">
              <input
                className="admin-input w-full"
                value={row.label}
                onChange={(e) =>
                  setLocal((prev) => ({
                    ...prev,
                    poolAdmission: prev.poolAdmission.map((item, i) =>
                      i === index ? { ...item, label: e.target.value } : item,
                    ),
                  }))
                }
              />
              <div className="grid gap-2 md:grid-cols-2">
                <input
                  className="admin-input"
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
                <input
                  className="admin-input"
                  value={row.note ?? ''}
                  placeholder="Poznámka"
                  onChange={(e) =>
                    setLocal((prev) => ({
                      ...prev,
                      poolAdmission: prev.poolAdmission.map((item, i) =>
                        i === index ? { ...item, note: e.target.value } : item,
                      ),
                    }))
                  }
                />
              </div>
            </div>
          ))}
        </section>

        <section className="admin-card space-y-3 p-5">
          <h2 className="admin-h2">Restaurace — otevírací doba</h2>
          {data.restaurantHours.map((row, index) => (
            <div key={index} className="grid gap-2 md:grid-cols-2">
              <input
                className="admin-input"
                value={row.days}
                onChange={(e) =>
                  setLocal((prev) => ({
                    ...prev,
                    restaurantHours: prev.restaurantHours.map((item, i) =>
                      i === index ? { ...item, days: e.target.value } : item,
                    ),
                  }))
                }
              />
              <input
                className="admin-input"
                value={row.time}
                onChange={(e) =>
                  setLocal((prev) => ({
                    ...prev,
                    restaurantHours: prev.restaurantHours.map((item, i) =>
                      i === index ? { ...item, time: e.target.value } : item,
                    ),
                  }))
                }
              />
            </div>
          ))}
        </section>

        <section className="admin-card space-y-3 p-5">
          <h2 className="admin-h2">Kemp — ceník</h2>
          {data.kempPricing.map((row, index) => (
            <div key={index} className="grid gap-2 md:grid-cols-2">
              <input
                className="admin-input"
                value={row.label}
                onChange={(e) =>
                  setLocal((prev) => ({
                    ...prev,
                    kempPricing: prev.kempPricing.map((item, i) =>
                      i === index ? { ...item, label: e.target.value } : item,
                    ),
                  }))
                }
              />
              <input
                className="admin-input"
                value={row.price}
                onChange={(e) =>
                  setLocal((prev) => ({
                    ...prev,
                    kempPricing: prev.kempPricing.map((item, i) =>
                      i === index ? { ...item, price: e.target.value } : item,
                    ),
                  }))
                }
              />
            </div>
          ))}
        </section>

        <section className="admin-card space-y-3 p-5">
          <h2 className="admin-h2">Běžící text (ticker)</h2>
          {data.marqueeItems.map((item, index) => (
            <input
              key={index}
              className="admin-input w-full"
              value={item}
              onChange={(e) =>
                setLocal((prev) => ({
                  ...prev,
                  marqueeItems: prev.marqueeItems.map((row, i) =>
                    i === index ? e.target.value : row,
                  ),
                }))
              }
            />
          ))}
        </section>

        <section className="admin-card space-y-3 p-5">
          <h2 className="admin-h2">Rozvoz pizzy</h2>
          <input
            className="admin-input w-full"
            value={data.pizzaDelivery.phone}
            placeholder="Telefon"
            onChange={(e) =>
              setLocal((prev) => ({
                ...prev,
                pizzaDelivery: { ...prev.pizzaDelivery, phone: e.target.value },
              }))
            }
          />
          <input
            className="admin-input w-full"
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
        </section>
      </div>

      <AdminSaveBar
        onSave={() => saveMutation.mutate(data)}
        saving={saveMutation.isPending}
      />
    </div>
  )
}
