import { Outlet } from 'react-router-dom'
import { Header } from './Header'
import { Footer } from './Footer'
import { NoiseOverlay } from '@/components/ui/NoiseOverlay'

export function RootLayout() {
  return (
    <div className="grid min-h-svh w-full max-w-full grid-rows-[auto_1fr_auto] overflow-x-hidden">
      <NoiseOverlay />
      <Header />
      <main className="relative min-h-0 w-full max-w-full min-w-0 overflow-x-hidden">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}
