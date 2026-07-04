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
            onChange={(e) => setLocal((prev) => ({ ...prev, note: e.target.value }))}
          />
        </AdminField>

        {data.items.map((item, index) => (
          <div
            key={`${item.name}-${index}`}
            className="grid gap-2 border-t border-[var(--admin-border)] pt-4 md:grid-cols-3"
          >
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
