import { galleryImagePath } from '@/data/gallery'
import { images } from '@/data/images'

/** Fotky areálu stažené z arealmorkov.cz – galerie koupaliště, kemp, restaurace */
export const aboutPolaroids = [
  {
    src: images.arealIntro,
    alt: 'Areál Mořkov',
    rotate: -8,
    left: '0%',
    top: '2%',
    zIndex: 2,
    size: 'md' as const,
  },
  {
    src: galleryImagePath('pool', 'FB_IMG_1744872802311.jpg'),
    alt: 'Koupaliště',
    rotate: 5,
    left: '28%',
    top: '0%',
    zIndex: 4,
    size: 'sm' as const,
  },
  {
    src: galleryImagePath('camp', 'IMG-20250612-WA0001.jpg'),
    alt: 'Kemp',
    rotate: -4,
    left: '52%',
    top: '6%',
    zIndex: 3,
    size: 'lg' as const,
  },
  {
    src: galleryImagePath('restaurant', '20250508_084607.jpg'),
    alt: 'Restaurace',
    rotate: 9,
    left: '68%',
    top: '18%',
    zIndex: 5,
    size: 'md' as const,
  },
  {
    src: galleryImagePath('pool', 'FB_IMG_1744872841837.jpg'),
    alt: 'Bazén',
    rotate: -6,
    left: '8%',
    top: '32%',
    zIndex: 6,
    size: 'lg' as const,
  },
  {
    src: galleryImagePath('camp', 'IMG-20250612-WA0002.jpg'),
    alt: 'Chatky v kempu',
    rotate: 7,
    left: '38%',
    top: '28%',
    zIndex: 7,
    size: 'md' as const,
  },
  {
    src: galleryImagePath('restaurant', '20250503_115011.jpg'),
    alt: 'Restaurace Podhora',
    rotate: -10,
    left: '58%',
    top: '38%',
    zIndex: 8,
    size: 'sm' as const,
  },
  {
    src: galleryImagePath('camp', 'IMG-20250612-WA0000.jpg'),
    alt: 'Příroda kolem areálu',
    rotate: 4,
    left: '18%',
    top: '52%',
    zIndex: 9,
    size: 'md' as const,
  },
  {
    src: galleryImagePath('pool', 'FB_IMG_1744872850552.jpg'),
    alt: 'Koupaliště v létě',
    rotate: -5,
    left: '42%',
    top: '48%',
    zIndex: 10,
    size: 'lg' as const,
  },
  {
    src: galleryImagePath('restaurant', '20250512_084511.jpg'),
    alt: 'Posezení u vody',
    rotate: 8,
    left: '62%',
    top: '55%',
    zIndex: 11,
    size: 'md' as const,
  },
  {
    src: galleryImagePath('camp', 'IMG-20250612-WA0003.jpg'),
    alt: 'Kempování',
    rotate: -7,
    left: '2%',
    top: '62%',
    zIndex: 12,
    size: 'sm' as const,
  },
  {
    src: galleryImagePath('restaurant', '20250521_173734.jpg'),
    alt: 'Areál z výšky',
    rotate: 3,
    left: '72%',
    top: '68%',
    zIndex: 13,
    size: 'md' as const,
  },
] as const

const sizeClasses = {
  sm: 'w-36 md:w-40',
  md: 'w-40 md:w-48',
  lg: 'w-44 md:w-52',
} as const

export function getPolaroidSizeClass(size: (typeof aboutPolaroids)[number]['size']) {
  return sizeClasses[size]
}
