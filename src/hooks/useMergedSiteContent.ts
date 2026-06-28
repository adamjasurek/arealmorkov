import { useMemo } from 'react'
import { kempAccommodation } from '@/data/site'
import { defaultSiteContent } from '@/lib/contentDefaults'
import { usePublicSiteContent } from '@/hooks/usePublicContent'

export function useMergedSiteContent() {
  const query = usePublicSiteContent()
  const data = query.data ?? defaultSiteContent

  const accommodation = useMemo(
    () =>
      kempAccommodation.map((item) => {
        const priceRow = data.kempAccommodationPrices.find((row) => row.id === item.id)
        return priceRow ? { ...item, price: priceRow.price } : item
      }),
    [data.kempAccommodationPrices],
  )

  return {
    ...query,
    data,
    accommodation,
  }
}
