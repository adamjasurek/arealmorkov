type Props = {
  items?: string[]
  reverse?: boolean
  className?: string
}

const defaultItems = [
  '★ AREÁL MOŘKOV ★',
  'KOUPALIŠTĚ',
  'KEMP',
  'PIZZA OLYMP',
  'RESTAURACE PODHORA',
  '★ VODA ★',
  '★ PŘÍRODA ★',
]

export function Marquee({
  items = defaultItems,
  reverse = false,
  className = '',
}: Props) {
  const doubled = [...items, ...items]

  return (
    <div
      className={`overflow-hidden border-y-4 border-foreground bg-gold-gradient py-3 ${className}`}
      aria-hidden
    >
      <div
        className={`marquee-track ${reverse ? 'marquee-track-reverse' : ''}`}
      >
        {doubled.map((item, i) => (
          <span
            key={`${item}-${i}`}
            className="font-display shrink-0 px-8 text-2xl tracking-[0.2em] text-[#2b2a29] md:text-3xl"
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  )
}
