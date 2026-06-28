import { NavLink, Outlet, useNavigate } from 'react-router-dom'
import { clearAdminSession } from '@/api/adminApi'
import { BrutalButton } from '@/components/ui/BrutalButton'

const links = [
  { to: '/admin/dashboard', label: 'Přehled' },
  { to: '/admin/teplota', label: 'Teplota vody' },
  { to: '/admin/stala-nabidka', label: 'Stálá nabídka' },
  { to: '/admin/poledni-menu', label: 'Polední menu' },
  { to: '/admin/vikendove-menu', label: 'Víkendové menu' },
  { to: '/admin/napojovy-listek', label: 'Nápojový lístek' },
  { to: '/admin/obsah', label: 'Doby a ceníky' },
  { to: '/admin/fotky', label: 'Fotogalerie' },
  { to: '/admin/menu-pdf', label: 'PDF menu' },
]

export function AdminLayout() {
  const navigate = useNavigate()

  function logout() {
    clearAdminSession()
    void navigate('/admin/login', { replace: true })
  }

  return (
    <div className="min-h-screen bg-surface text-foreground">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-8 md:flex-row md:px-6">
        <aside className="card-brutal h-fit w-full shrink-0 p-4 md:w-64">
          <p className="font-display text-2xl text-gold-gradient">Správa webu</p>
          <p className="mt-1 font-sans text-sm text-muted">Areál Mořkov</p>
          <nav className="mt-6 space-y-1">
            {links.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) =>
                  `block rounded-sm px-3 py-2 font-sans text-sm ${
                    isActive ? 'bg-gold-500/15 font-medium text-foreground' : 'text-muted hover:text-foreground'
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
          </nav>
          <BrutalButton type="button" variant="outline" className="mt-6 w-full" onClick={logout}>
            ODHLÁSIT SE
          </BrutalButton>
        </aside>
        <main className="min-w-0 flex-1">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
