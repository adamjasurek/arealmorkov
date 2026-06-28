import { AboutSection } from '@/components/home/AboutSection'
import { HeroColumns } from '@/components/home/HeroColumns'
import { QuickLinks } from '@/components/home/QuickLinks'

export function HomePage() {
  return (
    <>
      <HeroColumns />
      <AboutSection />
      <QuickLinks />
    </>
  )
}
