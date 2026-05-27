import { motion } from 'framer-motion'
import { kempAccommodation } from '@/data/site'
import { galleryFallback } from '@/data/gallery'
import { BrutalButton } from '@/components/ui/BrutalButton'

type Props = {
  onOrder: (formValue: string) => void
}

export function BentoGrid({ onOrder }: Props) {
  return (
    <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
      {kempAccommodation.map((item, i) => (
        <motion.article
          key={item.id}
          className="card-brutal group flex flex-col overflow-hidden"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ delay: i * 0.07, duration: 0.4 }}
        >
          <div className="relative aspect-[5/4] overflow-hidden border-b-4 border-foreground">
            <img
              src={item.image}
              alt={item.title}
              loading="lazy"
              onError={(e) => {
                e.currentTarget.src = galleryFallback.camp
              }}
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div
              className="pointer-events-none absolute inset-0 bg-gradient-to-t from-surface via-surface/20 to-transparent"
              aria-hidden
            />
            <span
              className="font-display pointer-events-none absolute right-3 top-2 text-5xl leading-none text-foreground/15"
              aria-hidden
            >
              {String(i + 1).padStart(2, '0')}
            </span>
          </div>

          <div className="flex flex-1 flex-col gap-3 p-5 md:p-6">
            <h3 className="font-display text-2xl text-gold-gradient md:text-3xl">{item.title}</h3>
            <p className="font-display text-xl text-gold-500 md:text-2xl">{item.price}</p>
            <BrutalButton
              type="button"
              variant="outline"
              className="mt-auto w-full text-center"
              onClick={() => onOrder(item.formValue)}
            >
              OBJEDNAT →
            </BrutalButton>
          </div>
        </motion.article>
      ))}
    </div>
  )
}
