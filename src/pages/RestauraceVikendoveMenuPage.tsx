import { MenuPageLayout } from '@/components/restaurace/MenuPageLayout'
import { WeekendMenuView } from '@/components/restaurace/WeekendMenuView'

export function RestauraceVikendoveMenuPage() {
  return (
    <MenuPageLayout pdfType="vikend">
      <WeekendMenuView />
    </MenuPageLayout>
  )
}
