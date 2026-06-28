import {
  creamPizzas,
  foodMenuNotes,
  foodMenuTitle,
  friedCheeses,
  otherOfferings,
  pizzaBoxes,
  pizzaPromos,
  tomatoPizzas,
} from '@/data/menu'
import { drinksMenuSections, drinksMenuTitle } from '@/data/drinks'
import { kempAccommodation, kempPricing, marqueeItems, pizzaDelivery, poolInfo, restaurantInfo } from '@/data/site'
import type {
  DrinksMenuData,
  FoodMenuData,
  LunchMenuData,
  SiteContentData,
  WaterTempData,
  WeekendMenuData,
} from '@/types/content'
import { emptyLunchMenu } from '@/lib/normalizeLunchMenu'

export const defaultWaterTemp: WaterTempData = {
  mainTemp: null,
  wadingTemp: null,
  updatedAt: null,
}

export const defaultFoodMenu: FoodMenuData = {
  title: foodMenuTitle,
  tomatoPizzas: [...tomatoPizzas],
  creamPizzas: [...creamPizzas],
  pizzaBoxes: [...pizzaBoxes],
  otherOfferings: [...otherOfferings],
  friedCheeses: [...friedCheeses],
  foodMenuNotes: { ...foodMenuNotes },
  pizzaPromos: [...pizzaPromos],
}

export const defaultDrinksMenu: DrinksMenuData = {
  title: drinksMenuTitle,
  sections: drinksMenuSections.map((section) => ({
    ...section,
    items: section.items.map((item) => ({ ...item })),
  })),
}

export const defaultLunchMenu: LunchMenuData = emptyLunchMenu()

export const defaultWeekendMenu: WeekendMenuData = {
  title: 'Víkendové menu',
  note: 'Platí každý víkend v sezóně',
  items: [],
}

export const defaultSiteContent: SiteContentData = {
  poolHours: poolInfo.hours.map((row) => ({ ...row })),
  poolAdmission: poolInfo.admission.map((row) => ({ ...row })),
  restaurantHours: restaurantInfo.hours.map((row) => ({ ...row })),
  kempPricing: kempPricing.map((row) => ({ ...row })),
  kempAccommodationPrices: kempAccommodation.map((item) => ({
    id: item.id,
    price: item.price,
  })),
  marqueeItems: [...marqueeItems],
  pizzaDelivery: {
    phone: pizzaDelivery.phone,
    zones: pizzaDelivery.zones.map((zone) => ({ ...zone })),
    freeOver: pizzaDelivery.freeOver,
  },
}
