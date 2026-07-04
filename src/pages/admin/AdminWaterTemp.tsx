import { AdminSaveBar } from '@/components/admin/AdminSaveBar'
import { AdminCard, AdminField, AdminInput, AdminLoading, AdminPageHeader } from '@/components/admin/ui'
import { useAdminWaterTemp } from '@/hooks/admin/useAdminEditors'

export function AdminWaterTemp() {
  const { menuQuery, data, setLocal, saveMutation } = useAdminWaterTemp()

  if (menuQuery.isLoading) {
    return <AdminLoading />
  }

  function parseTemp(value: string): number | null {
    const raw = value.trim()
    if (raw === '') return null
    const num = Number.parseFloat(raw.replace(',', '.'))
    return Number.isFinite(num) ? Math.min(45, Math.max(0, num)) : null
  }

  return (
    <div>
      <AdminPageHeader
        title="Teplota vody"
        description="Zadejte aktuální teplotu bazénu a brouzdaliště."
      />

      <AdminCard className="space-y-6 p-6">
        <p className="text-sm text-[var(--admin-muted)]">
          Nyní na webu: bazén{' '}
          <strong className="text-[var(--admin-text)]">
            {data.mainTemp != null ? `${data.mainTemp} °C` : '—'}
          </strong>
          {' · '}
          brouzdaliště{' '}
          <strong className="text-[var(--admin-text)]">
            {data.wadingTemp != null ? `${data.wadingTemp} °C` : '—'}
          </strong>
        </p>

        <AdminField label="Bazén (°C)">
          <AdminInput
            type="text"
            inputMode="decimal"
            className="admin-input-lg"
            value={data.mainTemp == null ? '' : String(data.mainTemp)}
            onChange={(e) =>
              setLocal((prev) => ({ ...prev, mainTemp: parseTemp(e.target.value) }))
            }
            placeholder="—"
          />
        </AdminField>

        <AdminField label="Brouzdaliště (°C)">
          <AdminInput
            type="text"
            inputMode="decimal"
            className="admin-input-lg"
            value={data.wadingTemp == null ? '' : String(data.wadingTemp)}
            onChange={(e) =>
              setLocal((prev) => ({ ...prev, wadingTemp: parseTemp(e.target.value) }))
            }
            placeholder="—"
          />
        </AdminField>
      </AdminCard>

      <AdminSaveBar
        onSave={() => saveMutation.mutate(data)}
        saving={saveMutation.isPending}
      />
    </div>
  )
}
