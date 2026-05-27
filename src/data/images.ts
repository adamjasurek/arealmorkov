import heroAreal from '@/assets/hero.png'
import kemp from '@/assets/kemp.webp'
import koupaliste from '@/assets/koupaliste.webp'
import restaurace from '@/assets/restaurace.webp'

/** Fotky jednotlivých částí areálu (src/assets) */
export const images = {
  hero1: koupaliste,
  hero2: kemp,
  hero3: restaurace,
  arealIntro: heroAreal,
  restaurantIntro: restaurace,
  campIntro: kemp,
  poolIntro: koupaliste,
} as const

export const liveSite = 'https://arealmorkov.cz' as const

export const menuLinks = {
  denni: `${liveSite}/get_menu.php?type=denni`,
  vikend: `${liveSite}/get_menu.php?type=vikend`,
  stalaNabidka: `${liveSite}/get_menu.php?type=stala-nabidka`,
  napojovy: `${liveSite}/get_menu.php?type=napojovy`,
  koupalisteMenu: `${liveSite}/get_menu.php?type=koupaliste-menu`,
  koupalisteNapoje: `${liveSite}/get_menu.php?type=koupaliste-napojovy`,
} as const
