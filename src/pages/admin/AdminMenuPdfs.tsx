import { useRef, useState } from 'react'
import { fileToBase64, uploadMenuPdf } from '@/api/adminApi'
import { adminToast } from '@/lib/adminToast'
import { AdminButton, AdminCard, AdminPageHeader } from '@/components/admin/ui'
import { useAdminMenuPdfs } from '@/hooks/admin/useAdminEditors'
import type { MenuPdfType } from '@/types/content'
import { useQueryClient } from '@tanstack/react-query'

const items: { type: MenuPdfType; label: string }[] = [
  { type: 'stala', label: 'Stálá nabídka' },
  { type: 'poledni', label: 'Polední menu' },
  { type: 'vikend', label: 'Víkendové menu' },
  { type: 'napoje', label: 'Nápojový lístek' },
]

function PdfUploadCard({ type, label }: { type: MenuPdfType; label: string }) {
  const inputRef = useRef<HTMLInputElement>(null)
  const queryClient = useQueryClient()
  const { data } = useAdminMenuPdfs()
  const [uploading, setUploading] = useState(false)

  const currentPath = data[type]

  async function handleFile(file: File) {
    if (file.type !== 'application/pdf' && !file.name.toLowerCase().endsWith('.pdf')) {
      adminToast.error('Vyberte soubor PDF.')
      return
    }

    setUploading(true)
    try {
      const pdfBase64 = await fileToBase64(file)
      await uploadMenuPdf(type, pdfBase64)
      adminToast.savedDeploy('PDF nahráno — odkaz ke stažení bude na webu do cca 1 minuty.')
      void queryClient.invalidateQueries({ queryKey: ['admin', 'menu-pdfs'] })
      void queryClient.invalidateQueries({ queryKey: ['public', 'menu-pdfs'] })
    } catch (err) {
      adminToast.error(err instanceof Error ? err.message : 'Nahrání PDF selhalo.')
    } finally {
      setUploading(false)
      if (inputRef.current) inputRef.current.value = ''
    }
  }

  return (
    <AdminCard className="space-y-3 p-5">
      <h2 className="admin-h2">{label}</h2>
      {currentPath ? (
        <p className="text-sm text-[var(--admin-muted)]">
          Aktuální PDF:{' '}
          <a href={currentPath} target="_blank" rel="noopener noreferrer" className="admin-link">
            zobrazit
          </a>
        </p>
      ) : (
        <p className="text-sm text-[var(--admin-muted)]">Zatím není nahráno žádné PDF.</p>
      )}
      <input
        ref={inputRef}
        type="file"
        accept="application/pdf,.pdf"
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
        {uploading ? 'Nahrávám…' : 'Nahrát PDF'}
      </AdminButton>
    </AdminCard>
  )
}

export function AdminMenuPdfs() {
  return (
    <div>
      <AdminPageHeader
        title="PDF menu"
        description="Nahrajte PDF verzi jídelního lístku. Na webu se vedle strukturovaného menu zobrazí odkaz ke stažení."
      />

      <div className="grid gap-4 sm:grid-cols-2">
        {items.map((item) => (
          <PdfUploadCard key={item.type} type={item.type} label={item.label} />
        ))}
      </div>
    </div>
  )
}
