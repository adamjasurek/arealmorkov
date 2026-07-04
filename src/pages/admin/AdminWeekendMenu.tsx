import { AdminSaveBar } from '@/components/admin/AdminSaveBar'
import { AdminButton, AdminCard, AdminField, AdminInput, AdminLoading, AdminPageHeader } from '@/components/admin/ui'
import { useAdminWeekendMenu } from '@/hooks/admin/useAdminEditors'

export function AdminWeekendMenu() {
  const { menuQuery, data, setLocal, saveMutation } = useAdminWeekendMenu()

  if (menuQuery.isLoading) {
    return <AdminLoading />
  }

  return (
    <div>
      <AdminPageHeader title="Víkendové menu" description="Speciality platné o víkendu." />

      <AdminCard className="space-y-4 p-6">
        <AdminField label="Poznámka">
          <AdminInput
            value={data.note ?? ''}
            placeholder="Např. platí o víkendu od 11:00"
            onChange={(e) => setLocal((prev) => ({ ...prev, note: e.target.value }))}
          />
        </AdminField>

        {data.items.map((item, index) => (
          <div
            key={`${item.name}-${index}`}
            className="space-y-3 border-t border-[var(--admin-border)] pt-4"
          >
            <p className="text-sm font-semibold text-[var(--admin-muted)]">Položka {index + 1}</p>
            <div className="grid gap-3 md:grid-cols-3">
              <AdminField label="Název">
                <AdminInput
                  value={item.name}
                  placeholder="Název"
                  onChange={(e) =>
                    setLocal((prev) => ({
                      ...prev,
                      items: prev.items.map((row, i) =>
                        i === index ? { ...row, name: e.target.value } : row,
                      ),
                    }))
                  }
                />
              </AdminField>
              <AdminField label="Popis">
                <AdminInput
                  value={item.description ?? ''}
                  placeholder="Popis"
                  onChange={(e) =>
                    setLocal((prev) => ({
                      ...prev,
                      items: prev.items.map((row, i) =>
                        i === index ? { ...row, description: e.target.value } : row,
                      ),
                    }))
                  }
                />
              </AdminField>
              <AdminField label="Cena">
                <AdminInput
                  value={item.price}
                  placeholder="Cena"
                  onChange={(e) =>
                    setLocal((prev) => ({
                      ...prev,
                      items: prev.items.map((row, i) =>
                        i === index ? { ...row, price: e.target.value } : row,
                      ),
                    }))
                  }
                />
              </AdminField>
            </div>
          </div>
        ))}

        <AdminButton
          variant="secondary"
          onClick={() =>
            setLocal((prev) => ({
              ...prev,
              items: [...prev.items, { name: '', price: '' }],
            }))
          }
        >
          + Přidat položku
        </AdminButton>
      </AdminCard>

      <AdminSaveBar
        onSave={() => saveMutation.mutate(data)}
        saving={saveMutation.isPending}
      />
    </div>
  )
}
