import { images } from '@/data/images'

export type GalleryFolder = 'restaurant' | 'camp' | 'pool'

/** Soubory z gallery_helper.php na arealmorkov.cz (ukázky stažené lokálně) */
const galleryFiles: Record<GalleryFolder, string[]> = {
  restaurant: [
    '20250503_115011.jpg',
    '20250503_164932.jpg',
    '20250508_084607.jpg',
    '20250508_085509.jpg',
  ],
  camp: [
    'IMG-20250612-WA0000.jpg',
    'IMG-20250612-WA0001.jpg',
    'IMG-20250612-WA0002.jpg',
    'IMG-20250612-WA0003.jpg',
  ],
  pool: [
    'FB_IMG_1744872802311.jpg',
    'FB_IMG_1744872814004.jpg',
    'FB_IMG_1744872841837.jpg',
    'FB_IMG_1744872850552.jpg',
  ],
}

export function galleryImagePath(folder: GalleryFolder, filename: string) {
  return `/img/galleries/${folder}/${encodeURIComponent(filename)}`
}

export function getGalleryImages(folder: GalleryFolder) {
  return galleryFiles[folder].map((filename) => ({
    filename,
    src: galleryImagePath(folder, filename),
    alt: `Fotka – ${folder === 'restaurant' ? 'restaurace Podhora' : folder === 'camp' ? 'kemp' : 'koupaliště'}`,
  }))
}

/** Záložní náhled, pokud galerie ještě není stažená */
export const galleryFallback: Record<GalleryFolder, string> = {
  restaurant: images.restaurantIntro,
  camp: images.campIntro,
  pool: images.poolIntro,
}
