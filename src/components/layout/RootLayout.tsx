import { Outlet, useLocation } from 'react-router-dom'
import { Header } from './Header'
import { Footer } from './Footer'
import { NoiseOverlay } from '@/components/ui/NoiseOverlay'

export function RootLayout() {
  const { pathname } = useLocation()
  const showFooter = pathname !== '/'

  return (
    <div
      className={`grid min-h-svh w-full max-w-full overflow-x-hidden ${
        showFooter ? 'grid-rows-[auto_1fr_auto]' : 'grid-rows-[auto_1fr]'
      }`}
    >
      <NoiseOverlay />
      <Header />
      <main className="relative min-h-0 w-full max-w-full min-w-0 overflow-x-hidden">
        <Outlet />
      </main>
      {showFooter ? <Footer /> : null}
    </div>
  )
}
