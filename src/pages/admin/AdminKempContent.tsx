import { AdminSaveBar } from '@/components/admin/AdminSaveBar'
import { AdminCard, AdminField, AdminInput, AdminLoading, AdminPageHeader } from '@/components/admin/ui'
import { useAdminSiteContent } from '@/hooks/admin/useAdminEditors'

export function AdminKempContent() {
  const { menuQuery, data, setLocal, saveMutation } = useAdminSiteContent()

  if (menuQuery.isLoading) {
    return <AdminLoading />
  }

  return (
    <div>
      <AdminPageHeader
        title="Kemp"
        description="Ceník kempu na webu."
      />

      <div className="space-y-6">
        <AdminCard className="space-y-4 p-5">
          <h2 className="admin-h2">Ceník</h2>
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
      </div>

      <AdminSaveBar
        onSave={() => saveMutation.mutate(data)}
        saving={saveMutation.isPending}
      />
    </div>
  )
}
