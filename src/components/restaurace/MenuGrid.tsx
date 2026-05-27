import { motion } from 'framer-motion'
import type { MenuItem } from '@/data/menu'
import { BrutalFloatingImage } from '@/components/ui/BrutalFloatingImage'

type Props = {
  items: MenuItem[]
}

export function MenuGrid({ items }: Props) {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((item, i) => (
        <motion.article
          key={item.id}
          className="card-brutal group relative overflow-visible"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: (i % 6) * 0.05 }}
        >
          <div className="relative min-h-[7rem] overflow-visible border-b-4 border-foreground p-4">
            <BrutalFloatingImage src={item.image} />
          </div>
          <div className="relative z-10 p-4">
            <div className="flex items-start justify-between gap-2">
              <h4 className="font-display text-2xl text-foreground">{item.name}</h4>
              <span className="font-display shrink-0 text-xl text-gold-gradient">
                {item.price}
              </span>
            </div>
            <p className="mt-2 font-sans text-sm text-muted">{item.description}</p>
          </div>
        </motion.article>
      ))}
    </div>
  )
}
