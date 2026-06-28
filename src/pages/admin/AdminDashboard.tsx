import { Link } from 'react-router-dom'
import { usePublicFoodMenu, usePublicWaterTemp } from '@/hooks/usePublicContent'

const sections = [
  { to: '/admin/teplota', label: 'Teplota vody', hint: 'Bazén a brouzdaliště' },
  { to: '/admin/stala-nabidka', label: 'Stálá nabídka', hint: 'Pizza a přílohy' },
  { to: '/admin/poledni-menu', label: 'Polední menu', hint: 'Denní polévka a chody' },
  { to: '/admin/vikendove-menu', label: 'Víkendové menu', hint: 'Víkendové speciality' },
  { to: '/admin/napojovy-listek', label: 'Nápojový lístek', hint: 'Pivo, víno, nealko' },
  { to: '/admin/obsah', label: 'Doby a ceníky', hint: 'Koupaliště, restaurace, kemp' },
  { to: '/admin/fotky', label: 'Fotogalerie', hint: '8 fotek × 3 sekce' },
  { to: '/admin/menu-pdf', label: 'PDF menu', hint: 'Ke stažení vedle jídelníčku' },
]

export function AdminDashboard() {
  const water = usePublicWaterTemp()
  const food = usePublicFoodMenu()

  return (
    <div>
      <h1 className="font-display text-4xl text-gold-gradient">Přehled</h1>
      <p className="mt-2 font-sans text-muted">Vyberte sekci, kterou chcete upravit.</p>

      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        {sections.map((section) => (
          <Link
            key={section.to}
            to={section.to}
            className="card-brutal block p-5 transition-transform hover:-translate-y-0.5"
          >
            <p className="font-display text-2xl">{section.label}</p>
            <p className="mt-1 font-sans text-sm text-muted">{section.hint}</p>
          </Link>
        ))}
      </div>

      <div className="card-brutal mt-8 p-5 font-sans text-sm text-muted">
        <p>
          Aktuální teplota bazénu:{' '}
          <strong className="text-foreground">
            {water.data?.mainTemp != null ? `${water.data.mainTemp}°C` : '—'}
          </strong>
        </p>
        <p className="mt-1">
          Počet pizz ve stálé nabídce:{' '}
          <strong className="text-foreground">
            {(food.data?.tomatoPizzas.length ?? 0) + (food.data?.creamPizzas.length ?? 0)}
          </strong>
        </p>
      </div>
    </div>
  )
}
