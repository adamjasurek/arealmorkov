import { useRef, useState } from 'react'
import { fileToBase64, uploadGalleryImage } from '@/api/adminApi'
import { adminToast } from '@/lib/adminToast'
import { AdminButton, AdminCard, AdminPageHeader } from '@/components/admin/ui'
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
    <AdminCard className="space-y-3 p-4">
      <p className="text-sm font-semibold text-[var(--admin-text)]">Fotka {slot}</p>

      <div className="overflow-hidden border border-[var(--admin-border)]">
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

      <AdminButton
        variant="secondary"
        className="w-full"
        disabled={uploading}
        onClick={() => inputRef.current?.click()}
      >
        {uploading ? 'Nahrávám…' : 'Vybrat a nahrát'}
      </AdminButton>

      {error ? (
        <p className="admin-error text-xs" role="alert">
          {error}
        </p>
      ) : null}
    </AdminCard>
  )
}

export function AdminGallery() {
  const [activeFolder, setActiveFolder] = useState<GalleryFolder>('pool')
  const slots = Array.from({ length: gallerySlotCount }, (_, index) => index + 1)

  return (
    <div>
      <AdminPageHeader
        title="Fotogalerie"
        description="Nahrajte novou fotku — automaticky se zmenší a uloží jako WebP. Každá pozice odpovídá jedné fotce na webu."
      />

      <div className="flex flex-wrap gap-2">
        {folders.map((folder) => (
          <button
            key={folder.id}
            type="button"
            onClick={() => setActiveFolder(folder.id)}
            className={`admin-tab ${activeFolder === folder.id ? 'active' : ''}`}
          >
            {folder.label}
          </button>
        ))}
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {slots.map((slot) => (
          <GallerySlotCard key={`${activeFolder}-${slot}`} folder={activeFolder} slot={slot} />
        ))}
      </div>
    </div>
  )
}
