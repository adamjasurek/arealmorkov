import { useRef, useState } from 'react'
import { fileToBase64, uploadGalleryImage } from '@/api/adminApi'
import { adminToast } from '@/lib/adminToast'
import { BrutalButton } from '@/components/ui/BrutalButton'
import {
  galleryFallback,
  galleryImagePath,
  gallerySlotCount,
  gallerySlotFilename,
  type GalleryFolder,
} from '@/data/gallery'

const folders: { id: GalleryFolder; label: string }[] = [
  { id: 'pool', label: 'Koupaliště' },
  { id: 'camp', label: 'Kemp' },
  { id: 'restaurant', label: 'Restaurace' },
]

function GallerySlotCard({ folder, slot }: { folder: GalleryFolder; slot: number }) {
  const inputRef = useRef<HTMLInputElement>(null)
  const filename = gallerySlotFilename(folder, slot)
  const baseSrc = galleryImagePath(folder, filename)
  const [previewSrc, setPreviewSrc] = useState(baseSrc)
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function handleFile(file: File) {
    if (!file.type.startsWith('image/')) {
      setError('Vyberte prosím obrázek (JPG, PNG, WebP…).')
      return
    }

    setUploading(true)
    setError(null)

    try {
      const imageBase64 = await fileToBase64(file)
      const result = await uploadGalleryImage(folder, slot, imageBase64)
      setPreviewSrc(`${result.src}?v=${encodeURIComponent(result.updatedAt)}`)
      adminToast.savedDeploy('Fotka nahrána — na webu se projeví do cca 1 minuty.')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Nahrání selhalo.')
    } finally {
      setUploading(false)
      if (inputRef.current) inputRef.current.value = ''
    }
  }

  return (
    <div className="card-brutal space-y-3 p-4">
      <div className="flex items-center justify-between gap-2">
        <p className="font-display text-lg">Fotka {slot}</p>
      </div>

      <div className="overflow-hidden border-2 border-foreground/20">
        <img
          src={previewSrc}
          alt={`${folder} ${slot}`}
          className="aspect-[4/5] w-full object-cover"
          onError={(e) => {
            e.currentTarget.src = galleryFallback[folder]
          }}
        />
      </div>

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => {
          const file = e.target.files?.[0]
          if (file) void handleFile(file)
        }}
      />

      <BrutalButton
        type="button"
        variant="outline"
        className="w-full"
        disabled={uploading}
        onClick={() => inputRef.current?.click()}
      >
        {uploading ? 'NAHRÁVÁM…' : 'VYBRAT A NAHRÁT →'}
      </BrutalButton>

      {error ? (
        <p className="font-sans text-xs text-red-600" role="alert">
          {error}
        </p>
      ) : null}
    </div>
  )
}

export function AdminGallery() {
  const [activeFolder, setActiveFolder] = useState<GalleryFolder>('pool')
  const slots = Array.from({ length: gallerySlotCount }, (_, index) => index + 1)

  return (
    <div>
      <h1 className="font-display text-4xl text-gold-gradient">Fotogalerie</h1>
      <p className="mt-2 font-sans text-muted">
        Nahrajte novou fotku — automaticky se zmenší a uloží jako WebP. Každá pozice odpovídá
        jedné fotce na webu.
      </p>

      <div className="mt-6 flex flex-wrap gap-2">
        {folders.map((folder) => (
          <button
            key={folder.id}
            type="button"
            onClick={() => setActiveFolder(folder.id)}
            className={`rounded-sm border-2 border-foreground px-4 py-2 font-display text-sm ${
              activeFolder === folder.id
                ? 'bg-gold-500 text-[#2b2a29]'
                : 'bg-surface text-foreground hover:bg-gold-500/10'
            }`}
          >
            {folder.label}
          </button>
        ))}
      </div>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {slots.map((slot) => (
          <GallerySlotCard key={`${activeFolder}-${slot}`} folder={activeFolder} slot={slot} />
        ))}
      </div>
    </div>
  )
}
