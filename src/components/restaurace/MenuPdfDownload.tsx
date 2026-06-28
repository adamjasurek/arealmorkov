import type { MenuPdfType } from '@/types/content'
import { usePublicMenuPdfs } from '@/hooks/usePublicContent'
import { BrutalButton } from '@/components/ui/BrutalButton'

const labels: Record<MenuPdfType, string> = {
  stala: 'Stáhnout PDF menu',
  poledni: 'Stáhnout PDF poledního menu',
  vikend: 'Stáhnout PDF víkendového menu',
  napoje: 'Stáhnout PDF nápojového lístku',
}

export function MenuPdfDownload({ type }: { type: MenuPdfType }) {
  const { data } = usePublicMenuPdfs()
  const path = data?.[type]

  if (!path) return null

  return (
    <div className="mb-8">
      <BrutalButton href={path} external variant="outline">
        {labels[type]} →
      </BrutalButton>
    </div>
  )
}
