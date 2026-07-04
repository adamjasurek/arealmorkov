import type { ReactNode } from 'react'
import { AdminButton } from '@/components/admin/ui'

type Props = {
  onSave: () => void
  saving?: boolean
  children?: ReactNode
}

export function AdminSaveBar({ onSave, saving, children }: Props) {
  return (
    <div className="admin-save-bar space-y-3">
      {children}
      <AdminButton type="button" className="w-full" disabled={saving} onClick={onSave}>
        {saving ? 'Ukládám…' : 'Uložit změny'}
      </AdminButton>
    </div>
  )
}
