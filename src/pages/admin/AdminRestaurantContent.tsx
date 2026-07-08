import { AdminSaveBar } from '@/components/admin/AdminSaveBar'
import { AdminCard, AdminField, AdminInput, AdminLoading, AdminPageHeader } from '@/components/admin/ui'
import { useAdminSiteContent } from '@/hooks/admin/useAdminEditors'

export function AdminRestaurantContent() {
  const { menuQuery, data, setLocal, saveMutation } = useAdminSiteContent()

  if (menuQuery.isLoading) {
    return <AdminLoading />
  }

  return (
    <div>
      <AdminPageHeader
        title="Restaurace"
        description="Otevírací doba a rozvoz pizzy."
      />

      <div className="space-y-6">
        <AdminCard className="space-y-4 p-5">
          <h2 className="admin-h2">Otevírací doba</h2>
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
