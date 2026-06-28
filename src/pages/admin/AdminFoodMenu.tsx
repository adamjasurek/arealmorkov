import { AdminSaveBar } from '@/components/admin/AdminSaveBar'
import { useAdminFoodMenu } from '@/hooks/admin/useAdminEditors'
import type { PizzaItem } from '@/types/content'

function PizzaEditor({
  title,
  items,
  onChange,
}: {
  title: string
  items: PizzaItem[]
  onChange: (items: PizzaItem[]) => void
}) {
  return (
    <div className="card-brutal space-y-4 p-4">
      <h2 className="font-display text-2xl text-gold-gradient">{title}</h2>
      {items.map((pizza, index) => (
        <div key={pizza.num} className="space-y-2 border-b border-foreground/15 pb-4">
          <div className="grid gap-2 md:grid-cols-2">
            <input
              className="input-brutal"
              value={pizza.name}
              placeholder="Název"
              onChange={(e) => {
                const next = [...items]
                next[index] = { ...pizza, name: e.target.value }
                onChange(next)
              }}
            />
            <input
              className="input-brutal"
              value={pizza.ingredients}
              placeholder="Ingredience"
              onChange={(e) => {
                const next = [...items]
                next[index] = { ...pizza, ingredients: e.target.value }
                onChange(next)
              }}
            />
          </div>
          <div className="grid gap-2 sm:grid-cols-2">
            <input
              className="input-brutal"
              value={pizza.price32}
              placeholder="Cena 32 cm"
              onChange={(e) => {
                const next = [...items]
                next[index] = { ...pizza, price32: e.target.value }
                onChange(next)
              }}
            />
            <input
              className="input-brutal"
              value={pizza.price45}
              placeholder="Cena 45 cm"
              onChange={(e) => {
                const next = [...items]
                next[index] = { ...pizza, price45: e.target.value }
                onChange(next)
              }}
            />
          </div>
        </div>
      ))}
    </div>
  )
}

export function AdminFoodMenu() {
  const { menuQuery, data, setLocal, saveMutation } = useAdminFoodMenu()

  if (menuQuery.isLoading) {
    return <p className="font-sans text-muted">Načítám…</p>
  }

  return (
    <div>
      <h1 className="font-display text-4xl text-gold-gradient">Stálá nabídka</h1>
      <p className="mt-2 font-sans text-muted">Upravte pizzu a ceny. Po změně nezapomeňte uložit.</p>

      <div className="mt-8 space-y-6">
        <PizzaEditor
          title="Rajčatový základ"
          items={data.tomatoPizzas}
          onChange={(tomatoPizzas) => setLocal((prev) => ({ ...prev, tomatoPizzas }))}
        />
        <PizzaEditor
          title="Smetanový základ"
          items={data.creamPizzas}
          onChange={(creamPizzas) => setLocal((prev) => ({ ...prev, creamPizzas }))}
        />
      </div>

      <AdminSaveBar
        onSave={() => saveMutation.mutate(data)}
        saving={saveMutation.isPending}
      />
    </div>
  )
}
