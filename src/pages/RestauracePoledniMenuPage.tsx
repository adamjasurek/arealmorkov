import { MenuPageLayout } from '@/components/restaurace/MenuPageLayout'
import { LunchMenuView } from '@/components/restaurace/LunchMenuView'

export function RestauracePoledniMenuPage() {
  return (
    <MenuPageLayout pdfType="poledni">
      <LunchMenuView />
    </MenuPageLayout>
  )
}
