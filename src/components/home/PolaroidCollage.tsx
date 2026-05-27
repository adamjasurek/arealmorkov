import { useState } from 'react'
import { aboutPolaroids, getPolaroidSizeClass } from '@/data/aboutGallery'
import { images } from '@/data/images'

export function PolaroidCollage() {
  return (
    <div className="about-polaroid-stack relative mx-auto min-h-[640px] w-full max-w-[700px] md:min-h-[720px] lg:mx-0 lg:max-w-none">
      {aboutPolaroids.map((photo) => (
        <PolaroidCard key={photo.src} photo={photo} />
      ))}
    </div>
  )
}

function PolaroidCard({
  photo,
}: {
  photo: (typeof aboutPolaroids)[number]
}) {
  const [failed, setFailed] = useState(false)

  return (
    <figure
      className={`about-polaroid absolute border-4 border-foreground bg-[#fefefe] p-2 pb-10 shadow-brutal ${getPolaroidSizeClass(photo.size)}`}
      style={{
        left: photo.left,
        top: photo.top,
        zIndex: photo.zIndex,
        transform: `rotate(${photo.rotate}deg)`,
      }}
    >
      <img
        src={failed ? images.arealIntro : photo.src}
        alt={photo.alt}
        loading="lazy"
        onError={() => setFailed(true)}
        className="aspect-[4/5] h-auto w-full object-cover"
      />
    </figure>
  )
}
