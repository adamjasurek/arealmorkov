import fs from 'node:fs'
import path from 'node:path'
import {
  creamPizzas,
  foodMenuNotes,
  foodMenuTitle,
  friedCheeses,
  otherOfferings,
  pizzaBoxes,
  pizzaPromos,
  tomatoPizzas,
} from '../src/data/menu.ts'
import { drinksMenuSections, drinksMenuTitle } from '../src/data/drinks.ts'

const outDir = path.join(process.cwd(), 'public/data')
fs.mkdirSync(outDir, { recursive: true })

function writeJson(name: string, data: unknown) {
  fs.writeFileSync(path.join(outDir, name), `${JSON.stringify(data, null, 2)}\n`, 'utf8')
}

writeJson('water-temp.json', {
  mainTemp: null,
  wadingTemp: null,
  updatedAt: null,
})

writeJson('food-menu.json', {
  title: foodMenuTitle,
  tomatoPizzas,
  creamPizzas,
  pizzaBoxes,
  otherOfferings,
  friedCheeses,
  foodMenuNotes,
  pizzaPromos,
})

writeJson('drinks-menu.json', {
  title: drinksMenuTitle,
  sections: drinksMenuSections,
})

writeJson('site-content.json', {
  poolHours: [
    { label: 'V sezóně (červenec – srpen)', time: '9:00 – 20:00' },
    { label: 'Noční koupání', time: '20:00 – 23:00' },
  ],
  poolAdmission: [
    {
      label: 'Dospělí (celodenní)',
      price: '100,-',
      note: 'Od 14:00 za 80 Kč, od 18:00 za 50 Kč',
    },
    {
      label: 'Děti (3–15 let), senioři, ZTP/P',
      price: '70,-',
      note: 'Od 14:00 za 50 Kč, od 18:00 za 30 Kč',
    },
    {
      label: 'Rodinné vstupné (2 dospělí + 1 dítě)',
      price: '230,-',
      note: 'Každé další dítě za 50 Kč',
    },
    { label: 'Děti do 3 let', price: 'Zdarma' },
    { label: 'Noční páteční koupání', price: 'Zdarma' },
  ],
  restaurantHours: [
    { days: 'Po–Út', time: 'Zavřeno' },
    { days: 'St–Čt', time: '15:00 – 20:00' },
    { days: 'Pá', time: '15:00 – 22:00' },
    { days: 'So', time: '11:00 – 22:00' },
    { days: 'Ne', time: '11:00 – 20:00' },
  ],
  kempPricing: [
    { label: '4-lůžková chatka / noc', price: '2000,-' },
    { label: '2-lůžková chatka / noc', price: '1000,-' },
    { label: 'Místo pro karavan / noc', price: '250,-' },
    { label: 'Stan velký (3+ osoby) / noc', price: '200,-' },
    { label: 'Stan malý (do 2 osob) / noc', price: '100,-' },
    { label: 'Osoba (k stan/karavan) / noc', price: '150,-' },
    { label: 'Auto / noc', price: '60,-' },
    { label: 'Pes / noc', price: '50,-' },
  ],
  kempAccommodationPrices: [
    { id: 'chatka-4', price: '2000,- / noc' },
    { id: 'chatka-2', price: '1000,- / noc' },
    { id: 'karavan', price: '250,- / noc' },
    { id: 'stan', price: 'od 100,- / noc' },
  ],
  marqueeItems: [
    'Těšíme se na vás',
    'Areál Mořkov',
    'Pizzu objednávejte na 601 593 155',
  ],
  pizzaDelivery: {
    phone: '601 593 155',
    zones: [
      { place: 'Mořkov', min: 169, fee: 0 },
      { place: 'Hodslavice, Životice', min: 169, fee: 20 },
      { place: 'Bludovice, Žilina', min: 350, fee: 50 },
      { place: 'Nový Jičín, Hostašovice, Straník', min: 350, fee: 60 },
      { place: 'Ženklava, Veřovice', min: 350, fee: 30 },
    ],
    freeOver: 600,
  },
})

const today = new Date()
const lunchDays = Array.from({ length: 10 }, (_, index) => {
  const d = new Date(today)
  d.setDate(d.getDate() + index)
  const label = new Intl.DateTimeFormat('cs-CZ', {
    weekday: 'long',
    day: 'numeric',
    month: 'numeric',
  }).format(d)
  return {
    id: d.toISOString().slice(0, 10),
    label,
    closed: false,
    soup: { id: `soup-${index}`, name: '', description: '' },
    rotatingMains: [
      { id: `main-${index}-1`, name: '', description: '' },
      { id: `main-${index}-2`, name: '', description: '' },
      { id: `main-${index}-3`, name: '', description: '' },
    ],
  }
})

writeJson('lunch-menu.json', {
  title: 'Polední menu',
  menuFirstWorkdayKey: today.toISOString().slice(0, 10),
  days: lunchDays,
})

writeJson('weekend-menu.json', {
  title: 'Víkendové menu',
  note: 'Platí každý víkend v sezóně',
  items: [
    { name: 'Nedělní pečené koleno', description: 's přílohami', price: '285,-' },
    { name: 'Víkendová pizza speciál', description: 'dle aktuální nabídky', price: '219,-' },
  ],
})

console.log('Seeded public/data/*.json')
