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
        title="Běžící text"
        description="Krátké informace v běžícím pruhu na webu."
      />

      <div className="space-y-6">
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
      </div>

      <AdminSaveBar
        onSave={() => saveMutation.mutate(data)}
        saving={saveMutation.isPending}
      />
    </div>
  )
}
