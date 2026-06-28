import { DrinksMenu } from '@/components/restaurace/DrinksMenu'
import { MenuPageLayout } from '@/components/restaurace/MenuPageLayout'

export function RestauraceNapojovyListekPage() {
  return (
    <MenuPageLayout pdfType="napoje">
      <DrinksMenu />
    </MenuPageLayout>
  )
}
