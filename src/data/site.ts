import { images } from '@/data/images'

export const contact = {
  address: 'Květná 649, 742 72 Mořkov',
  phones: ['+420 739 806 275', '+420 737 399 789'],
  pizzaPhone: '601 593 155',
  email: 'arealmorkov@seznam.cz',
  mapEmbed:
    'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2579.198058501984!2d18.06188687699939!3d49.53111197141399!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4713e70101010101%3A0x373e897c01010101!2sKv%C4%9Btn%C3%A1%20649%2C%20742%2072%20Mo%C5%99kov!5e0!3m2!1scs!2scz!4v1678886400000!5m2!1scs!2scz',
  operator: {
    name: 'Filip Stypka',
    address: 'Hoblikova 26, 741 01 Nový Jičín',
    ico: '07023600',
  },
} as const

export const about = {
  title: 'O našem areálu',
  lead:
    'Vítejte v rekreačním areálu v Mořkově, ideálním místě pro vaši dovolenou, rodinnou oslavu nebo jen odpolední relax u vody.',
  body: 'Nabízíme komplexní služby od ubytování v kempu, přes skvělou gastronomii v naší restauraci, až po letní radovánky na moderním koupališti. Užijte si klidné prostředí, krásnou přírodu a přátelskou atmosféru. Těšíme se na vaši návštěvu!',
  image: images.arealIntro,
} as const

export const heroColumns = [
  {
    id: 'koupaliste',
    title: 'Koupaliště',
    description:
      'Letní osvěžení pro celou rodinu – moderní bazén s atrakcemi pro děti i dospělé.',
    cta: 'Teplota & ceník',
    href: '/koupaliste',
    image: images.hero1,
    rotate: -4,
  },
  {
    id: 'kemp',
    title: 'Kemp',
    description:
      'Klid, pohoda a dobrodružství – stany, karavany i chatky jen pár kroků od restaurace.',
    cta: 'Rezervovat pobyt',
    href: '/kemp',
    image: images.hero2,
    rotate: 3,
  },
  {
    id: 'restaurace',
    title: 'Restaurace Podhora',
    description:
      'Gastronomie v srdci přírody – speciality naší kuchyně s výhledem a Pizza Olymp rozvoz.',
    cta: 'Menu & rozvoz',
    href: '/restaurace',
    image: images.hero3,
    rotate: -2,
  },
] as const

export const pizzaDelivery = {
  phone: '601 593 155',
  zones: [
    { place: 'Mořkov', min: 169, fee: 0 },
    { place: 'Hodslavice, Životice', min: 169, fee: 20 },
    { place: 'Bludovice, Žilina', min: 350, fee: 50 },
    { place: 'Nový Jičín, Hostašovice, Straník', min: 350, fee: 60 },
    { place: 'Ženklava, Veřovice', min: 350, fee: 30 },
  ],
  freeOver: 600,
  closing: 'Těšíme se na vaše objednávky! ❤️',
} as const

export const kempAccommodation = [
  {
    id: 'chatka-4',
    title: '4-lůžkové chatky',
    description:
      'Ideální pro rodiny nebo partu přátel. Plně vybavené pro vaše maximální pohodlí.',
    price: '2000,- / noc',
    size: 'large' as const,
    image: images.campIntro,
  },
  {
    id: 'chatka-2',
    title: '2-lůžkové chatky',
    description: 'Útulné a romantické útočiště pro páry hledající soukromí v přírodě.',
    price: '1000,- / noc',
    size: 'medium' as const,
    image: images.campIntro,
  },
  {
    id: 'karavan',
    title: 'Stání pro karavany',
    description: 'Prostorná místa s přípojkami pro váš mobilní domov na kolech.',
    price: '250,- / noc',
    size: 'small' as const,
    image: images.campIntro,
  },
  {
    id: 'stan',
    title: 'Místa pro stany',
    description:
      'Zažijte pravé kouzlo kempování a usínejte pod hvězdami na travnatých plochách.',
    price: 'od 100,- / noc',
    size: 'wide' as const,
    image: images.campIntro,
  },
] as const

export const kempPricing = [
  { label: '4-lůžková chatka / noc', price: '2000,-' },
  { label: '2-lůžková chatka / noc', price: '1000,-' },
  { label: 'Místo pro karavan / noc', price: '250,-' },
  { label: 'Stan velký (3+ osoby) / noc', price: '200,-' },
  { label: 'Stan malý (do 2 osob) / noc', price: '100,-' },
  { label: 'Osoba (k stan/karavan) / noc', price: '150,-' },
  { label: 'Auto / noc', price: '60,-' },
  { label: 'Pes / noc', price: '50,-' },
] as const

export const kempIntro = {
  title: 'Klid, pohoda a dobrodružství',
  body: 'Utečte od každodenního shonu a najděte své útočiště v našem kempu, který je obklopený uklidňující přírodou a přitom jen pár kroků od pohodlí naší restaurace. Ať už jste dobrodruh se stanem, cestovatel s karavanem, nebo hledáte komfort našich chatek, máme pro vás to pravé místo k odpočinku.',
  image: images.campIntro,
} as const

export const poolInfo = {
  title: 'Vodní radovánky po celý den',
  body: 'Naše koupaliště, které prošlo v roce 2008 celkovou rekonstrukcí, nabízí velký plavecký bazén o velikosti 33×15 m s parádní skluzavkou. Pro nejmenší návštěvníky máme připravené bezpečné dětské brouzdaliště.',
  image: images.poolIntro,
  hours: [
    { label: 'V sezóně (červenec – srpen)', time: '9:00 – 20:00' },
    { label: 'Noční koupání', time: '20:00 – 23:00' },
  ],
  admission: [
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
} as const

export const poolSortiment = [
  { name: 'Zmrzlina / nanuk', price: 'od 25,-' },
  { name: 'Točená limonáda 0,3 l', price: '35,-' },
  { name: 'Točená limonáda 0,5 l', price: '45,-' },
  { name: 'Voda perlivá / neperlivá 0,5 l', price: '30,-' },
  { name: 'Káva', price: '45,-' },
  { name: 'Pivo 0,5 l', price: '55,-' },
  { name: 'Klobása v housce', price: '85,-' },
  { name: 'Hranolky', price: '65,-' },
  { name: 'Párek v rohlíku', price: '55,-' },
] as const

export const restaurantInfo = {
  title: 'Restaurace Podhora',
  subtitle: 'Srdečně vás zveme k příjemnému posezení v Mořkově.',
  intro:
    'Naše restaurace se nachází hned vedle koupaliště v klidném prostředí, které je ideální pro relaxaci a dobré jídlo. Nabízíme velkorysé prostory pro každou příležitost.',
  image: images.restaurantIntro,
  hours: [
    { days: 'Po–Út', time: 'Zavřeno' },
    { days: 'St–Čt', time: '15:00 – 20:00' },
    { days: 'Pá', time: '15:00 – 22:00' },
    { days: 'So', time: '11:00 – 22:00' },
    { days: 'Ne', time: '11:00 – 20:00' },
  ],
  features: [
    { title: 'Restaurace & salonek', desc: 'Vnitřní kapacita až 90 osob' },
    { title: 'Venkovní terasy', desc: 'Kapacita až 100 osob' },
    {
      title: 'Rodinné oslavy & svatby',
      desc: 'Uspořádejte u nás nezapomenutelnou oslavu v soukromí salonku nebo hlavního sálu',
    },
    {
      title: 'Firemní večírky a školení',
      desc: 'Ideální prostory a technické zázemí pro firemní akce a prezentace',
    },
    {
      title: 'Společenské akce',
      desc: 'V létě ožívá naše pódium živou hudbou – skvělé místo pro setkání s přáteli',
    },
  ],
} as const
