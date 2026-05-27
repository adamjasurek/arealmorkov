import { useState } from 'react'
import {
  getGalleryImages,
  galleryFallback,
  type GalleryFolder,
} from '@/data/gallery'
import { BrutalFloatingImage } from '@/components/ui/BrutalFloatingImage'

type Props = {
  folder: GalleryFolder
  title?: string
}

export function GalleryGrid({ folder, title = 'Galerie' }: Props) {
  const items = getGalleryImages(folder)

  return (
    <section className="px-4 py-16 md:px-6">
      <div className="mx-auto max-w-[1400px]">
        <h3 className="font-display mb-8 text-4xl text-gold-gradient">{title}</h3>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((item) => (
            <GalleryImage
              key={item.filename}
              folder={folder}
              src={item.src}
              alt={item.alt}
            />
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
    <figure className="card-brutal relative min-h-[10rem] overflow-visible">
      <BrutalFloatingImage
        src={imageSrc}
        alt={alt}
        className="right-4 bottom-4"
        onError={() => setFailed(true)}
      />
    </figure>
  )
}
