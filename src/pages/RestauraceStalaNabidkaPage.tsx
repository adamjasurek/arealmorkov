import { FoodMenu } from '@/components/restaurace/FoodMenu'
import { MenuPageLayout } from '@/components/restaurace/MenuPageLayout'

export function RestauraceStalaNabidkaPage() {
  return (
    <MenuPageLayout pdfType="stala">
      <FoodMenu />
    </MenuPageLayout>
  )
}
