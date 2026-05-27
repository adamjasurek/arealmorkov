import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  getGalleryImages,
  galleryFallback,
  type GalleryFolder,
} from '@/data/gallery'

type Props = {
  folder: GalleryFolder
  title?: string
}

const rotations = [-3, 2, -2, 3, -1, 2, -3, 1] as const

export function GalleryGrid({ folder, title = 'Galerie' }: Props) {
  const items = getGalleryImages(folder)

  return (
    <section className="border-t-4 border-foreground px-4 py-16 md:px-6">
      <div className="mx-auto max-w-[1400px]">
        <h3 className="font-display mb-10 text-4xl text-gold-gradient md:text-5xl">{title}</h3>

        <div className="grid grid-cols-2 gap-6 md:gap-8 lg:grid-cols-4">
          {items.map((item, i) => (
            <motion.figure
              key={item.id}
              className="group border-4 border-foreground bg-[#fefefe] p-2 pb-8 shadow-brutal"
              style={{ transform: `rotate(${rotations[i % rotations.length]}deg)` }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ delay: i * 0.08, duration: 0.4 }}
            >
              <GalleryImage folder={folder} src={item.src} alt={item.alt} />
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  )
}

function GalleryImage({
  folder,
  src,
  alt,
}: {
  folder: GalleryFolder
  src: string
  alt: string
}) {
  const [failed, setFailed] = useState(false)
  const imageSrc = failed ? galleryFallback[folder] : src

  return (
    <div className="overflow-hidden">
      <img
        src={imageSrc}
        alt={alt}
        loading="lazy"
        referrerPolicy="no-referrer"
        onError={() => setFailed(true)}
        className="aspect-[4/5] w-full object-cover transition-transform duration-500 group-hover:scale-105"
      />
    </div>
  )
}
