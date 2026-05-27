import heroAreal from '@/assets/hero.png'
import kemp from '@/assets/kemp.webp'
import koupaliste from '@/assets/koupaliste.webp'
import restaurace from '@/assets/restaurace.webp'
import pizzaOlympLogo from '@/assets/pizzaolymp.webp'

/** Fotky jednotlivých částí areálu (src/assets) */
export const images = {
  hero1: koupaliste,
  hero2: kemp,
  hero3: restaurace,
  arealIntro: heroAreal,
  restaurantIntro: restaurace,
  campIntro: kemp,
  poolIntro: koupaliste,
  pizzaOlymp: pizzaOlympLogo,
} as const
