import { Outlet, useLocation } from 'react-router-dom'
import { Header } from './Header'
import { Footer } from './Footer'
import { NoiseOverlay } from '@/components/ui/NoiseOverlay'

export function RootLayout() {
  const { pathname } = useLocation()
  const isFullscreen = pathname === '/' || pathname === '/404'

  return (
    <div
      className={`grid w-full max-w-full overflow-x-hidden ${
        isFullscreen
          ? 'home-fullscreen h-svh grid-rows-[auto_1fr] overflow-y-hidden'
          : 'min-h-svh grid-rows-[auto_1fr_auto]'
      }`}
    >
      <NoiseOverlay />
      <Header />
      <main className="relative min-h-0 w-full max-w-full min-w-0 overflow-x-hidden">
        <Outlet />
      </main>
      {!isFullscreen && <Footer />}
    </div>
  )
}
