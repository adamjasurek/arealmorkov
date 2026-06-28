export type RestaurantMenuLink = {
  id: string
  label: string
  to?: string
}

export const restaurantMenuLinks: RestaurantMenuLink[] = [
  { id: 'poledni', label: 'Polední menu', to: '/restaurace/poledni-menu' },
  { id: 'vikend', label: 'Víkendové menu', to: '/restaurace/vikendove-menu' },
  { id: 'stala', label: 'Stálá nabídka', to: '/restaurace/stala-nabidka' },
  { id: 'napoje', label: 'Nápojový lístek', to: '/restaurace/napojovy-listek' },
]
