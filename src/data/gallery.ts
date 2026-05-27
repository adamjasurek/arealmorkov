import { images } from '@/data/images'

export type GalleryFolder = 'restaurant' | 'camp' | 'pool'

const gallerySlotCount = 8

function gallerySlots(folder: GalleryFolder) {
  return Array.from({ length: gallerySlotCount }, (_, index) => `${folder}-${index + 1}.jpg`)
}

/** Lokální kopie z arealmorkov.cz – public/img/galleries/{folder}/ */
const galleryFiles: Record<GalleryFolder, string[]> = {
  restaurant: gallerySlots('restaurant'),
  camp: gallerySlots('camp'),
  pool: gallerySlots('pool'),
}

export function galleryImagePath(folder: GalleryFolder, filename: string) {
  return `/img/galleries/${folder}/${encodeURIComponent(filename)}`
}

export function getGalleryImages(folder: GalleryFolder) {
  const label =
    folder === 'restaurant'
      ? 'restaurace Podhora'
      : folder === 'camp'
        ? 'kemp'
        : 'koupaliště'

  return galleryFiles[folder].map((filename, index) => ({
    id: `${folder}-${index}`,
    filename,
    src: galleryImagePath(folder, filename),
    alt: `Fotka – ${label}`,
  }))
}

/** Záložní náhled, pokud se fotka nenačte */
export const galleryFallback: Record<GalleryFolder, string> = {
  restaurant: images.restaurantIntro,
  camp: images.campIntro,
  pool: images.poolIntro,
}
