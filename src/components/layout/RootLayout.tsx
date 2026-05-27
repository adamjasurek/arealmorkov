import { Outlet } from 'react-router-dom'
import { Header } from './Header'
import { NoiseOverlay } from '@/components/ui/NoiseOverlay'

export function RootLayout() {
  return (
    <div className="grid min-h-svh grid-rows-[auto_1fr]">
      <NoiseOverlay />
      <Header />
      <main className="relative min-h-0">
        <Outlet />
      </main>
    </div>
  )
}
