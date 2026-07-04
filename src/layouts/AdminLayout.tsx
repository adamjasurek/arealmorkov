import { NavLink, Outlet, useNavigate } from 'react-router-dom'
import { clearAdminSession } from '@/api/adminApi'
import { AdminButton } from '@/components/admin/ui'

const navGroups = [
  {
    label: 'Obecné',
    links: [{ to: '/admin/dashboard', label: 'Přehled' }],
  },
  {
    label: 'Koupaliště',
    links: [{ to: '/admin/teplota', label: 'Teplota vody' }],
  },
  {
    label: 'Restaurace',
    links: [
      { to: '/admin/stala-nabidka', label: 'Stálá nabídka' },
      { to: '/admin/poledni-menu', label: 'Polední menu' },
      { to: '/admin/vikendove-menu', label: 'Víkendové menu' },
      { to: '/admin/napojovy-listek', label: 'Nápojový lístek' },
      { to: '/admin/menu-pdf', label: 'PDF ke stažení' },
    ],
  },
  {
    label: 'Web',
    links: [
      { to: '/admin/obsah', label: 'Doby a ceníky' },
      { to: '/admin/fotky', label: 'Fotogalerie' },
    ],
  },
]

export function AdminLayout() {
  const navigate = useNavigate()

  function logout() {
    clearAdminSession()
    void navigate('/admin/login', { replace: true })
  }

  return (
    <div className="admin-shell min-h-screen">
      <div className="mx-auto flex min-h-screen max-w-7xl flex-col md:flex-row">
        <aside className="admin-sidebar flex w-full shrink-0 flex-col border-b md:min-h-screen md:w-60 md:border-b-0 md:border-r">
          <div className="border-b border-[var(--admin-border)] px-5 py-5">
            <p className="text-base font-bold text-[var(--admin-text)]">Areál Mořkov</p>
            <p className="mt-0.5 text-xs text-[var(--admin-muted)]">Správa webu</p>
          </div>

          <nav className="flex-1 overflow-y-auto px-3 py-4">
            {navGroups.map((group) => (
              <div key={group.label} className="mb-1">
                <p className="admin-nav-group px-3">{group.label}</p>
                <div className="mt-1 space-y-0.5">
                  {group.links.map((link) => (
                    <NavLink
                      key={link.to}
                      to={link.to}
                      className={({ isActive }) => `admin-nav-link ${isActive ? 'active' : ''}`}
                    >
                      {link.label}
                    </NavLink>
                  ))}
                </div>
              </div>
            ))}
          </nav>

          <div className="space-y-2 border-t border-[var(--admin-border)] p-4">
            <a
              href="/"
              target="_blank"
              rel="noopener noreferrer"
              className="admin-nav-link text-center text-sm"
            >
              Zobrazit web ↗
            </a>
            <AdminButton variant="ghost" className="w-full" onClick={logout}>
              Odhlásit se
            </AdminButton>
          </div>
        </aside>

        <main className="min-w-0 flex-1 p-5 md:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
