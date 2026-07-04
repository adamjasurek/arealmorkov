import { AdminSaveBar } from '@/components/admin/AdminSaveBar'
import { AdminCard, AdminInput, AdminLoading, AdminPageHeader } from '@/components/admin/ui'
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
    <AdminCard className="space-y-4 p-5">
      <h2 className="admin-h2">{title}</h2>
      {items.map((pizza, index) => (
        <div key={pizza.num} className="space-y-2 border-b border-[var(--admin-border)] pb-4 last:border-0">
          <div className="grid gap-2 md:grid-cols-2">
            <AdminInput
              value={pizza.name}
              placeholder="Název"
              onChange={(e) => {
                const next = [...items]
                next[index] = { ...pizza, name: e.target.value }
                onChange(next)
              }}
            />
            <AdminInput
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
            <AdminInput
              value={pizza.price32}
              placeholder="Cena 32 cm"
              onChange={(e) => {
                const next = [...items]
                next[index] = { ...pizza, price32: e.target.value }
                onChange(next)
              }}
            />
            <AdminInput
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
    </AdminCard>
  )
}

export function AdminFoodMenu() {
  const { menuQuery, data, setLocal, saveMutation } = useAdminFoodMenu()

  if (menuQuery.isLoading) {
    return <AdminLoading />
  }

  return (
    <div>
      <AdminPageHeader
        title="Stálá nabídka"
        description="Upravte pizzu a ceny. Po změně nezapomeňte uložit."
      />

      <div className="space-y-6">
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
