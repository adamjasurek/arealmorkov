import { AdminSaveBar } from '@/components/admin/AdminSaveBar'
import { AdminButton, AdminCard, AdminField, AdminInput, AdminLoading, AdminPageHeader } from '@/components/admin/ui'
import { useAdminFoodMenu } from '@/hooks/admin/useAdminEditors'
import type { PizzaItem } from '@/types/content'

function emptyPizza(num: number): PizzaItem {
  return { num, name: '', ingredients: '', price32: '', price45: '' }
}

function renumber(tomatoPizzas: PizzaItem[], creamPizzas: PizzaItem[]) {
  return {
    tomatoPizzas: tomatoPizzas.map((pizza, index) => ({ ...pizza, num: index + 1 })),
    creamPizzas: creamPizzas.map((pizza, index) => ({
      ...pizza,
      num: tomatoPizzas.length + index + 1,
    })),
  }
}

function PizzaEditor({
  title,
  items,
  onChange,
  onAdd,
  onRemove,
}: {
  title: string
  items: PizzaItem[]
  onChange: (items: PizzaItem[]) => void
  onAdd: () => void
  onRemove: (index: number) => void
}) {
  return (
    <AdminCard className="space-y-4 p-5">
      <h2 className="admin-h2">{title}</h2>
      {items.length === 0 ? (
        <p className="text-sm text-[var(--admin-muted)]">Zatím žádná pizza. Přidejte první níže.</p>
      ) : null}
      {items.map((pizza, index) => (
        <div key={pizza.num} className="space-y-3 border-b border-[var(--admin-border)] pb-4 last:border-0">
          <div className="flex items-center justify-between">
            <p className="text-sm font-semibold text-[var(--admin-text)]">Pizza č. {pizza.num}</p>
            <AdminButton
              variant="ghost"
              onClick={() => {
                const label = pizza.name.trim() ? `„${pizza.name.trim()}"` : `č. ${pizza.num}`
                if (window.confirm(`Opravdu odebrat pizzu ${label}?`)) {
                  onRemove(index)
                }
              }}
            >
              Odebrat
            </AdminButton>
          </div>
          <div className="grid gap-3 md:grid-cols-2">
            <AdminField label="Název">
              <AdminInput
                value={pizza.name}
                placeholder="Název"
                onChange={(e) => {
                  const next = [...items]
                  next[index] = { ...pizza, name: e.target.value }
                  onChange(next)
                }}
              />
            </AdminField>
            <AdminField label="Ingredience">
              <AdminInput
                value={pizza.ingredients}
                placeholder="Ingredience"
                onChange={(e) => {
                  const next = [...items]
                  next[index] = { ...pizza, ingredients: e.target.value }
                  onChange(next)
                }}
              />
            </AdminField>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            <AdminField label="Cena 32 cm">
              <AdminInput
                value={pizza.price32}
                placeholder="Cena 32 cm"
                onChange={(e) => {
                  const next = [...items]
                  next[index] = { ...pizza, price32: e.target.value }
                  onChange(next)
                }}
              />
            </AdminField>
            <AdminField label="Cena 45 cm">
              <AdminInput
                value={pizza.price45}
                placeholder="Cena 45 cm"
                onChange={(e) => {
                  const next = [...items]
                  next[index] = { ...pizza, price45: e.target.value }
                  onChange(next)
                }}
              />
            </AdminField>
          </div>
        </div>
      ))}
      <AdminButton variant="secondary" onClick={onAdd}>
        + Přidat pizzu
      </AdminButton>
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
        description="Upravte, přidejte nebo odeberte pizzu a ceny. Po změně nezapomeňte uložit."
      />

      <div className="space-y-6">
        <PizzaEditor
          title="Rajčatový základ"
          items={data.tomatoPizzas}
          onChange={(tomatoPizzas) => setLocal((prev) => ({ ...prev, tomatoPizzas }))}
          onAdd={() =>
            setLocal((prev) => ({
              ...prev,
              ...renumber([...prev.tomatoPizzas, emptyPizza(0)], prev.creamPizzas),
            }))
          }
          onRemove={(index) =>
            setLocal((prev) => ({
              ...prev,
              ...renumber(
                prev.tomatoPizzas.filter((_, i) => i !== index),
                prev.creamPizzas,
              ),
            }))
          }
        />
        <PizzaEditor
          title="Smetanový základ"
          items={data.creamPizzas}
          onChange={(creamPizzas) => setLocal((prev) => ({ ...prev, creamPizzas }))}
          onAdd={() =>
            setLocal((prev) => ({
              ...prev,
              ...renumber(prev.tomatoPizzas, [...prev.creamPizzas, emptyPizza(0)]),
            }))
          }
          onRemove={(index) =>
            setLocal((prev) => ({
              ...prev,
              ...renumber(
                prev.tomatoPizzas,
                prev.creamPizzas.filter((_, i) => i !== index),
              ),
            }))
          }
        />
      </div>

      <AdminSaveBar
        onSave={() => saveMutation.mutate(data)}
        saving={saveMutation.isPending}
      />
    </div>
  )
}
