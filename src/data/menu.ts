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

export const foodMenuTitle = 'Stálá nabídka' as const

export const tomatoPizzas: PizzaItem[] = [
  {
    num: 1,
    name: 'Margherita',
    ingredients: 'rajčata, mozzarella/eidam, oregano',
    price32: '169,-',
    price45: '289,-',
  },
  {
    num: 2,
    name: 'Šunková',
    ingredients: 'rajčata, mozzarella/eidam, šunka, oregano',
    price32: '189,-',
    price45: '309,-',
  },
  {
    num: 3,
    name: 'Cardinale',
    ingredients: 'rajčata, mozzarella/eidam, šunka, žampiony, oregano',
    price32: '199,-',
    price45: '309,-',
  },
  {
    num: 4,
    name: 'Salámová',
    ingredients: 'rajčata, mozzarella/eidam, salám, oregano',
    price32: '199,-',
    price45: '309,-',
  },
  {
    num: 5,
    name: 'Hawai',
    ingredients: 'rajčata, mozzarella/eidam, šunka, ananas, oregano',
    price32: '199,-',
    price45: '309,-',
  },
  {
    num: 6,
    name: 'Tvarůžková',
    ingredients:
      'rajčata, mozzarella/eidam, šunka, anglická slanina, tvarůžky, cibule, oregano',
    price32: '219,-',
    price45: '339,-',
  },
  {
    num: 7,
    name: 'Picante',
    ingredients:
      'rajčata, mozzarella/eidam, šunka, anglická slanina, klobása, zelený pepř, oregano',
    price32: '219,-',
    price45: '349,-',
  },
  {
    num: 8,
    name: 'Pollo',
    ingredients: 'rajčata, mozzarella/eidam, šunka, kuřecí maso, kukuřice, oregano',
    price32: '219,-',
    price45: '339,-',
  },
  {
    num: 9,
    name: 'Quattro Formaggi',
    ingredients: 'rajčata, mozzarella/eidam, uzený sýr, niva, oregano',
    price32: '209,-',
    price45: '329,-',
  },
  {
    num: 10,
    name: 'Olivová',
    ingredients: 'rajčata, mozzarella/eidam, šunka, olivy, hermelín, oregano',
    price32: '199,-',
    price45: '309,-',
  },
  {
    num: 11,
    name: 'Masová',
    ingredients:
      'rajčata, mozzarella/eidam, šunka, kuřecí maso, klobása, cibule, oregano',
    price32: '219,-',
    price45: '349,-',
  },
  {
    num: 12,
    name: 'Slaninová',
    ingredients: 'rajčata, mozzarella/eidam, slanina, klobása, uzený sýr, oregano',
    price32: '209,-',
    price45: '339,-',
  },
  {
    num: 13,
    name: 'Ostrá',
    ingredients:
      'rajčata, mozzarella/eidam, paprikáš, klobása, feferony, chilli, cibule, oregano',
    price32: '209,-',
    price45: '329,-',
  },
]

export const creamPizzas: PizzaItem[] = [
  {
    num: 14,
    name: 'Smetanová',
    ingredients:
      'smetanový základ, mozzarella/eidam, šunka, slanina, hermelín, niva, cibule, oregano',
    price32: '219,-',
    price45: '349,-',
  },
  {
    num: 15,
    name: 'Smetanita',
    ingredients:
      'smetanový základ, mozzarella/eidam, kuřecí maso, žampiony, cibule, oregano',
    price32: '209,-',
    price45: '339,-',
  },
  {
    num: 16,
    name: 'Špenátová',
    ingredients:
      'smetanový základ, mozzarella/eidam, kuřecí maso, špenát, parmazán, oregano',
    price32: '219,-',
    price45: '339,-',
  },
  {
    num: 17,
    name: 'Brusinková',
    ingredients:
      'smetanový základ, mozzarella/eidam, šunka, hermelín, brusinky, oregano',
    price32: '199,-',
    price45: '319,-',
  },
]

export const pizzaBoxes: MenuPriceItem[] = [
  { name: 'Krabice malá', price: '12,-' },
  { name: 'Krabice velká', price: '20,-' },
]

export const otherOfferings: MenuPriceItem[] = [
  { name: 'Hranolky + dip', price: '65,-' },
  { name: 'Smažené cibulové kroužky 10 ks + dip', price: '69,-' },
  { name: '3 ks bramboráčky se zelím', price: '65,-' },
  { name: 'Ďábelská topinka s masovou směsí', price: '139,-' },
  {
    name: 'Pečené vepřové koleno 750 g',
    description: 'beraní rohy, kyselé okurky, křen, hořčice, chleba',
    price: '285,-',
  },
  { name: 'Tvarůžkový tatarák + topinky', price: '109,-' },
]

export const friedCheeses: MenuPriceItem[] = [
  { name: '6 ks Mozzarella + dip', price: '79,-' },
  { name: '6 ks Camembert + dip', price: '79,-' },
  { name: '6 ks JalaPeño + dip', price: '79,-' },
]

export const foodMenuNotes = {
  extraIngredients: 'Suroviny navíc za příplatek 30 Kč',
  allergens: 'Seznam alergenů na vyžádání u obsluhy',
} as const

export const pizzaPromos = [
  '3 a více pizz = +1 pizza ZDARMA',
  'Při objednávce nad 600,- rozvoz ZDARMA',
  'Průměr 32 cm a 45 cm',
  'Šamotová pec · kvalitní suroviny',
] as const
