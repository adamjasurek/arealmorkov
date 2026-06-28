import { AdminSaveBar } from '@/components/admin/AdminSaveBar'
import { useAdminWeekendMenu } from '@/hooks/admin/useAdminEditors'

export function AdminWeekendMenu() {
  const { menuQuery, data, setLocal, saveMutation } = useAdminWeekendMenu()

  if (menuQuery.isLoading) {
    return <p className="font-sans text-muted">Načítám…</p>
  }

  return (
    <div>
      <h1 className="font-display text-4xl text-gold-gradient">Víkendové menu</h1>
      <p className="mt-2 font-sans text-muted">Speciality platné o víkendu.</p>

      <div className="card-brutal mt-8 space-y-4 p-6">
        <label className="block">
          <span className="font-display text-sm uppercase">Poznámka</span>
          <input
            className="input-brutal mt-1 w-full"
            value={data.note ?? ''}
            onChange={(e) => setLocal((prev) => ({ ...prev, note: e.target.value }))}
          />
        </label>

        {data.items.map((item, index) => (
          <div key={`${item.name}-${index}`} className="grid gap-2 border-t border-foreground/15 pt-4 md:grid-cols-3">
            <input
              className="input-brutal"
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
            <input
              className="input-brutal"
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
            <input
              className="input-brutal"
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

        <button
          type="button"
          className="font-sans text-sm text-gold-500 underline"
          onClick={() =>
            setLocal((prev) => ({
              ...prev,
              items: [...prev.items, { name: '', price: '' }],
            }))
          }
        >
          + Přidat položku
        </button>
      </div>

      <AdminSaveBar
        onSave={() => saveMutation.mutate(data)}
        saving={saveMutation.isPending}
      />
    </div>
  )
}
