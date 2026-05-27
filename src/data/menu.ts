import { images } from '@/data/images'

export type MenuItem = {
  id: string
  name: string
  description: string
  price: string
  image: string
}

const pizzaImg = images.restaurantIntro

/** Pizza rozvoz – orientační nabídka (kompletní menu na arealmorkov.cz) */
export const pizzaMenu: MenuItem[] = [
  {
    id: 'margarita',
    name: 'Margarita',
    description: 'Rajčatový základ, mozzarella, bazalka',
    price: '169,-',
    image: pizzaImg,
  },
  {
    id: 'sunkova',
    name: 'Šunková',
    description: 'Rajčatový základ, sýr, šunka, mozzarella',
    price: '189,-',
    image: pizzaImg,
  },
  {
    id: 'salami',
    name: 'Salami',
    description: 'Rajčatový základ, salám, mozzarella',
    price: '199,-',
    image: pizzaImg,
  },
  {
    id: 'hawai',
    name: 'Hawai',
    description: 'Šunka, ananas, mozzarella',
    price: '199,-',
    image: pizzaImg,
  },
  {
    id: 'quattro',
    name: 'Quattro Formaggi',
    description: 'Čtyři druhy sýrů na tenkém těstě',
    price: '219,-',
    image: pizzaImg,
  },
  {
    id: 'olympia',
    name: 'Olympia Speciál',
    description: 'Šunka, slanina, feferony, cibule, mozzarella',
    price: '229,-',
    image: pizzaImg,
  },
  {
    id: 'tuniakova',
    name: 'Tuňáková',
    description: 'Tuňák, cibule, olivy, mozzarella',
    price: '219,-',
    image: pizzaImg,
  },
  {
    id: 'vegetariana',
    name: 'Vegetariana',
    description: 'Zelenina, kukuřice, žampiony, mozzarella',
    price: '209,-',
    image: pizzaImg,
  },
  {
    id: 'mexicka',
    name: 'Mexická',
    description: 'Feferony, paprika, kukuřice, chilli',
    price: '219,-',
    image: pizzaImg,
  },
  {
    id: 'prosciutto',
    name: 'Prosciutto e Funghi',
    description: 'Šunka, žampiony, mozzarella',
    price: '209,-',
    image: pizzaImg,
  },
  {
    id: 'quattro-stagioni',
    name: 'Quattro Stagioni',
    description: 'Čtyři sezóny – šunka, salám, žampiony, artyčoky',
    price: '229,-',
    image: pizzaImg,
  },
  {
    id: 'lucifero',
    name: 'Lucifero',
    description: 'Extra feferony, salám, paprikáš',
    price: '239,-',
    image: pizzaImg,
  },
]

export const pizzaPromos = [
  '3 a více pizz = +1 pizza ZDARMA',
  'Při objednávce nad 600,- rozvoz ZDARMA',
  'Průměr 34 cm (klasická) a 40 cm',
  'Šamotová pec · kvalitní suroviny',
] as const
