import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { RootLayout } from '@/components/layout/RootLayout'
import { HomePage } from '@/pages/HomePage'
import { KoupalistePage } from '@/pages/KoupalistePage'
import { KempPage } from '@/pages/KempPage'
import { RestauracePage } from '@/pages/RestauracePage'
import { RestauraceStalaNabidkaPage } from '@/pages/RestauraceStalaNabidkaPage'
import { RestauraceNapojovyListekPage } from '@/pages/RestauraceNapojovyListekPage'
import { KontaktPage } from '@/pages/KontaktPage'
import { AdminPage } from '@/pages/AdminPage'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<RootLayout />}>
          <Route index element={<HomePage />} />
          <Route path="koupaliste" element={<KoupalistePage />} />
          <Route path="kemp" element={<KempPage />} />
          <Route path="restaurace" element={<RestauracePage />} />
          <Route path="restaurace/stala-nabidka" element={<RestauraceStalaNabidkaPage />} />
          <Route path="restaurace/napojovy-listek" element={<RestauraceNapojovyListekPage />} />
          <Route path="kontakt" element={<KontaktPage />} />
          <Route path="admin" element={<AdminPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
