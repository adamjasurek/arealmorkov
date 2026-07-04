import { Link } from 'react-router-dom'
import { usePublicFoodMenu, usePublicWaterTemp } from '@/hooks/usePublicContent'
import { AdminPageHeader } from '@/components/admin/ui'

const sections = [
  { to: '/admin/teplota', label: 'Teplota vody', hint: 'Bazén a brouzdaliště', icon: '🌡️', tone: 'pool' },
  { to: '/admin/stala-nabidka', label: 'Stálá nabídka', hint: 'Pizza a přílohy', icon: '🍕', tone: 'food' },
  { to: '/admin/poledni-menu', label: 'Polední menu', hint: 'Denní polévka a chody', icon: '🍽️', tone: 'food' },
  { to: '/admin/vikendove-menu', label: 'Víkendové menu', hint: 'Víkendové speciality', icon: '⭐', tone: 'food' },
  { to: '/admin/napojovy-listek', label: 'Nápojový lístek', hint: 'Pivo, víno, nealko', icon: '🍺', tone: 'food' },
  { to: '/admin/obsah', label: 'Doby a ceníky', hint: 'Koupaliště, restaurace, kemp', icon: '📋', tone: 'site' },
  { to: '/admin/fotky', label: 'Fotogalerie', hint: '8 fotek × 3 sekce', icon: '📷', tone: 'media' },
  { to: '/admin/menu-pdf', label: 'PDF menu', hint: 'Ke stažení vedle jídelníčku', icon: '📄', tone: 'media' },
] as const

export function AdminDashboard() {
  const water = usePublicWaterTemp()
  const food = usePublicFoodMenu()

  return (
    <div>
      <AdminPageHeader
        title="Přehled"
        description="Vyberte sekci, kterou chcete upravit."
      />

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {sections.map((section) => (
          <Link
            key={section.to}
            to={section.to}
            className="admin-card admin-dashboard-card p-4"
          >
            <span className={`admin-dashboard-icon tone-${section.tone}`}>{section.icon}</span>
            <p className="font-semibold text-[var(--admin-text)]">{section.label}</p>
            <p className="mt-1 text-sm text-[var(--admin-muted)]">{section.hint}</p>
          </Link>
        ))}
      </div>

      <div className="mt-8 grid gap-3 sm:grid-cols-2">
        <div className="admin-stat">
          <p className="admin-stat-label">Teplota bazénu</p>
          <p className="admin-stat-value">
            {water.data?.mainTemp != null ? `${water.data.mainTemp} °C` : '—'}
          </p>
        </div>
        <div className="admin-stat">
          <p className="admin-stat-label">Počet pizz ve stálé nabídce</p>
          <p className="admin-stat-value">
            {(food.data?.tomatoPizzas.length ?? 0) + (food.data?.creamPizzas.length ?? 0)}
          </p>
        </div>
      </div>
    </div>
  )
}
