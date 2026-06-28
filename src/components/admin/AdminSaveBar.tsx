import type { ReactNode } from 'react'
import { BrutalButton } from '@/components/ui/BrutalButton'

type Props = {
  onSave: () => void
  saving?: boolean
  children?: ReactNode
}

export function AdminSaveBar({ onSave, saving, children }: Props) {
  return (
    <div className="sticky bottom-4 z-20 mt-8 space-y-3">
      {children}
      <BrutalButton type="button" className="w-full" disabled={saving} onClick={onSave}>
        {saving ? 'UKLÁDÁM…' : 'ULOŽIT →'}
      </BrutalButton>
    </div>
  )
}
