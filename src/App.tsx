import { lazy, Suspense, type ReactNode } from 'react'
import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
} from 'react-router-dom'
import { RootLayout } from '@/components/layout/RootLayout'
import { AdminGuard } from '@/components/admin/AdminGuard'
import { AdminLayout } from '@/layouts/AdminLayout'
import { AdminLogin } from '@/pages/admin/AdminLogin'

const HomePage = lazy(() =>
  import('@/pages/HomePage').then((m) => ({ default: m.HomePage })),
)
const KoupalistePage = lazy(() =>
  import('@/pages/KoupalistePage').then((m) => ({ default: m.KoupalistePage })),
)
const KempPage = lazy(() => import('@/pages/KempPage').then((m) => ({ default: m.KempPage })))
const RestauracePage = lazy(() =>
  import('@/pages/RestauracePage').then((m) => ({ default: m.RestauracePage })),
)
const RestauraceStalaNabidkaPage = lazy(() =>
  import('@/pages/RestauraceStalaNabidkaPage').then((m) => ({
    default: m.RestauraceStalaNabidkaPage,
  })),
)
const RestauraceNapojovyListekPage = lazy(() =>
  import('@/pages/RestauraceNapojovyListekPage').then((m) => ({
    default: m.RestauraceNapojovyListekPage,
  })),
)
const RestauracePoledniMenuPage = lazy(() =>
  import('@/pages/RestauracePoledniMenuPage').then((m) => ({
    default: m.RestauracePoledniMenuPage,
  })),
)
const RestauraceVikendoveMenuPage = lazy(() =>
  import('@/pages/RestauraceVikendoveMenuPage').then((m) => ({
    default: m.RestauraceVikendoveMenuPage,
  })),
)
const KontaktPage = lazy(() =>
  import('@/pages/KontaktPage').then((m) => ({ default: m.KontaktPage })),
)
const NotFoundPage = lazy(() =>
  import('@/pages/NotFoundPage').then((m) => ({ default: m.NotFoundPage })),
)

const AdminDashboard = lazy(() =>
  import('@/pages/admin/AdminDashboard').then((m) => ({ default: m.AdminDashboard })),
)
const AdminWaterTemp = lazy(() =>
  import('@/pages/admin/AdminWaterTemp').then((m) => ({ default: m.AdminWaterTemp })),
)
const AdminFoodMenu = lazy(() =>
  import('@/pages/admin/AdminFoodMenu').then((m) => ({ default: m.AdminFoodMenu })),
)
const AdminLunchMenu = lazy(() =>
  import('@/pages/admin/AdminLunchMenu').then((m) => ({ default: m.AdminLunchMenu })),
)
const AdminWeekendMenu = lazy(() =>
  import('@/pages/admin/AdminWeekendMenu').then((m) => ({ default: m.AdminWeekendMenu })),
)
const AdminDrinksMenu = lazy(() =>
  import('@/pages/admin/AdminDrinksMenu').then((m) => ({ default: m.AdminDrinksMenu })),
)
const AdminPoolContent = lazy(() =>
  import('@/pages/admin/AdminPoolContent').then((m) => ({ default: m.AdminPoolContent })),
)
const AdminKempContent = lazy(() =>
  import('@/pages/admin/AdminKempContent').then((m) => ({ default: m.AdminKempContent })),
)
const AdminRestaurantContent = lazy(() =>
  import('@/pages/admin/AdminRestaurantContent').then((m) => ({ default: m.AdminRestaurantContent })),
)
const AdminSiteContent = lazy(() =>
  import('@/pages/admin/AdminSiteContent').then((m) => ({ default: m.AdminSiteContent })),
)
const AdminGallery = lazy(() =>
  import('@/pages/admin/AdminGallery').then((m) => ({ default: m.AdminGallery })),
)
const AdminMenuPdfs = lazy(() =>
  import('@/pages/admin/AdminMenuPdfs').then((m) => ({ default: m.AdminMenuPdfs })),
)

function PageLoader() {
  return (
    <div className="flex min-h-[40vh] items-center justify-center font-sans text-muted">
      Načítám…
    </div>
  )
}

function LazyPage({ children }: { children: ReactNode }) {
  return <Suspense fallback={<PageLoader />}>{children}</Suspense>
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route
          path="/admin"
          element={
            <AdminGuard>
              <AdminLayout />
            </AdminGuard>
          }
        >
          <Route index element={<Navigate to="dashboard" replace />} />
          <Route
            path="dashboard"
            element={
              <LazyPage>
                <AdminDashboard />
              </LazyPage>
            }
          />
          <Route
            path="teplota"
            element={
              <LazyPage>
                <AdminWaterTemp />
              </LazyPage>
            }
          />
          <Route
            path="stala-nabidka"
            element={
              <LazyPage>
                <AdminFoodMenu />
              </LazyPage>
            }
          />
          <Route
            path="poledni-menu"
            element={
              <LazyPage>
                <AdminLunchMenu />
              </LazyPage>
            }
          />
          <Route
            path="vikendove-menu"
            element={
              <LazyPage>
                <AdminWeekendMenu />
              </LazyPage>
            }
          />
          <Route
            path="napojovy-listek"
            element={
              <LazyPage>
                <AdminDrinksMenu />
              </LazyPage>
            }
          />
          <Route
            path="koupaliste-obsah"
            element={
              <LazyPage>
                <AdminPoolContent />
              </LazyPage>
            }
          />
          <Route
            path="kemp-obsah"
            element={
              <LazyPage>
                <AdminKempContent />
              </LazyPage>
            }
          />
          <Route
            path="restaurace-obsah"
            element={
              <LazyPage>
                <AdminRestaurantContent />
              </LazyPage>
            }
          />
          <Route
            path="obsah"
            element={
              <LazyPage>
                <AdminSiteContent />
              </LazyPage>
            }
          />
          <Route
            path="fotky"
            element={
              <LazyPage>
                <AdminGallery />
              </LazyPage>
            }
          />
          <Route
            path="menu-pdf"
            element={
              <LazyPage>
                <AdminMenuPdfs />
              </LazyPage>
            }
          />
        </Route>

        <Route element={<RootLayout />}>
          <Route
            index
            element={
              <LazyPage>
                <HomePage />
              </LazyPage>
            }
          />
          <Route
            path="koupaliste"
            element={
              <LazyPage>
                <KoupalistePage />
              </LazyPage>
            }
          />
          <Route
            path="kemp"
            element={
              <LazyPage>
                <KempPage />
              </LazyPage>
            }
          />
          <Route
            path="restaurace"
            element={
              <LazyPage>
                <RestauracePage />
              </LazyPage>
            }
          />
          <Route
            path="restaurace/stala-nabidka"
            element={
              <LazyPage>
                <RestauraceStalaNabidkaPage />
              </LazyPage>
            }
          />
          <Route
            path="restaurace/poledni-menu"
            element={
              <LazyPage>
                <RestauracePoledniMenuPage />
              </LazyPage>
            }
          />
          <Route
            path="restaurace/vikendove-menu"
            element={
              <LazyPage>
                <RestauraceVikendoveMenuPage />
              </LazyPage>
            }
          />
          <Route
            path="restaurace/napojovy-listek"
            element={
              <LazyPage>
                <RestauraceNapojovyListekPage />
              </LazyPage>
            }
          />
          <Route
            path="kontakt"
            element={
              <LazyPage>
                <KontaktPage />
              </LazyPage>
            }
          />
          <Route path="admin" element={<Navigate to="/admin/dashboard" replace />} />
          <Route
            path="404"
            element={
              <LazyPage>
                <NotFoundPage />
              </LazyPage>
            }
          />
          <Route path="*" element={<Navigate to="/404" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
