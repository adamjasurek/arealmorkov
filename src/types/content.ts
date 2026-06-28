export type PizzaItem = {
  num: number
  name: string
  ingredients: string
  price32: string
  price45: string
}

export type MenuPriceItem = {
  name: string
  description?: string
  price: string
}

export type FoodMenuData = {
  title: string
  tomatoPizzas: PizzaItem[]
  creamPizzas: PizzaItem[]
  pizzaBoxes: MenuPriceItem[]
  otherOfferings: MenuPriceItem[]
  friedCheeses: MenuPriceItem[]
  foodMenuNotes: {
    extraIngredients: string
    allergens: string
  }
  pizzaPromos: string[]
  updatedAt?: string
}

export type DrinkRow = {
  name: string
  price?: string
  price05?: string
  price03?: string
}

export type DrinkSection = {
  id: string
  title: string
  dualSize?: boolean
  items: DrinkRow[]
}

export type DrinksMenuData = {
  title: string
  sections: DrinkSection[]
  updatedAt?: string
}

export type MenuMeal = {
  id: string
  name: string
  description?: string
}

export type LunchMenuDay = {
  id: string
  label: string
  closed?: boolean
  soup: MenuMeal
  rotatingMains: MenuMeal[]
}

export type LunchMenuData = {
  title: string
  menuFirstWorkdayKey?: string
  days: LunchMenuDay[]
  updatedAt?: string
}

export type WeekendMenuData = {
  title: string
  note?: string
  items: MenuPriceItem[]
  updatedAt?: string
}

export type WaterTempData = {
  mainTemp: number | null
  wadingTemp: number | null
  updatedAt: string | null
}

export type SiteContentData = {
  poolHours: { label: string; time: string }[]
  poolAdmission: { label: string; price: string; note?: string }[]
  restaurantHours: { days: string; time: string }[]
  kempPricing: { label: string; price: string }[]
  kempAccommodationPrices: { id: string; price: string }[]
  marqueeItems: string[]
  pizzaDelivery: {
    phone: string
    zones: { place: string; min: number; fee: number }[]
    freeOver: number
  }
  updatedAt?: string
}

export type ContentKey =
  | 'water-temp'
  | 'food-menu'
  | 'lunch-menu'
  | 'weekend-menu'
  | 'drinks-menu'
  | 'site'
  | 'menu-pdfs'

export type MenuPdfType = 'stala' | 'poledni' | 'vikend' | 'napoje'

export type MenuPdfsData = {
  stala: string | null
  poledni: string | null
  vikend: string | null
  napoje: string | null
  updatedAt?: string | null
}
