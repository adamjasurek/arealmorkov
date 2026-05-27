import { motion } from 'framer-motion'
import { kempAccommodation } from '@/data/site'
import { PhotoBackground } from '@/components/ui/PhotoBackground'

const sizeClasses = {
  large: 'md:col-span-2 md:row-span-2',
  medium: 'md:col-span-1 md:row-span-2',
  small: 'md:col-span-1 md:row-span-1',
  wide: 'md:col-span-2 md:row-span-1',
} as const

export function BentoGrid() {
  return (
    <div className="grid auto-rows-[200px] grid-cols-1 gap-4 md:grid-cols-3 md:auto-rows-[180px]">
      {kempAccommodation.map((item, i) => (
        <motion.article
          key={item.id}
          className={`card-brutal-photo group relative isolate overflow-hidden ${sizeClasses[item.size]}`}
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.06 }}
        >
          <PhotoBackground src={item.image} overlayClassName="bg-surface/88" />
          <div className="relative z-10 flex h-full min-h-[200px] flex-col justify-end p-4 md:p-6">
            <div className="max-w-[85%]">
              <h3 className="font-display text-2xl text-gold-gradient md:text-3xl">
                {item.title}
              </h3>
              <p className="mt-2 font-sans text-xs text-muted md:text-sm">
                {item.description}
              </p>
              <p className="mt-4 font-display text-lg text-gold-gradient">{item.price}</p>
            </div>
          </div>
        </motion.article>
      ))}
    </div>
  )
}
