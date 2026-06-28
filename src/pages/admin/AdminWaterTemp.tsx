import { AdminSaveBar } from '@/components/admin/AdminSaveBar'
import { useAdminWaterTemp } from '@/hooks/admin/useAdminEditors'

export function AdminWaterTemp() {
  const { menuQuery, data, setLocal, saveMutation } = useAdminWaterTemp()

  if (menuQuery.isLoading) {
    return <p className="font-sans text-muted">Načítám…</p>
  }

  function parseTemp(value: string): number | null {
    const raw = value.trim()
    if (raw === '') return null
    const num = Number.parseFloat(raw.replace(',', '.'))
    return Number.isFinite(num) ? Math.min(45, Math.max(0, num)) : null
  }

  return (
    <div>
      <h1 className="font-display text-4xl text-gold-gradient">Teplota vody</h1>
      <p className="mt-2 font-sans text-muted">Zadejte aktuální teplotu bazénu a brouzdaliště.</p>

      <div className="card-brutal mt-8 space-y-6 p-6">
        <p className="font-sans text-sm text-muted">
          Nyní na webu: bazén{' '}
          <strong className="text-foreground">
            {data.mainTemp != null ? `${data.mainTemp}°C` : '—'}
          </strong>
          {' · '}
          brouzdaliště{' '}
          <strong className="text-foreground">
            {data.wadingTemp != null ? `${data.wadingTemp}°C` : '—'}
          </strong>
        </p>

        <label className="block">
          <span className="font-display text-sm uppercase">Bazén (°C)</span>
          <input
            type="text"
            inputMode="decimal"
            className="input-brutal mt-1 w-full font-display text-3xl"
            value={data.mainTemp == null ? '' : String(data.mainTemp)}
            onChange={(e) =>
              setLocal((prev) => ({ ...prev, mainTemp: parseTemp(e.target.value) }))
            }
            placeholder="—"
          />
        </label>

        <label className="block">
          <span className="font-display text-sm uppercase">Brouzdaliště (°C)</span>
          <input
            type="text"
            inputMode="decimal"
            className="input-brutal mt-1 w-full font-display text-2xl"
            value={data.wadingTemp == null ? '' : String(data.wadingTemp)}
            onChange={(e) =>
              setLocal((prev) => ({ ...prev, wadingTemp: parseTemp(e.target.value) }))
            }
            placeholder="—"
          />
        </label>
      </div>

      <AdminSaveBar
        onSave={() => saveMutation.mutate(data)}
        saving={saveMutation.isPending}
      />
    </div>
  )
}
