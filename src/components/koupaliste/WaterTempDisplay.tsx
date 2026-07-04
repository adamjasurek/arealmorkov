import { usePublicWaterTemp } from '@/hooks/usePublicContent'

function formatDateTime(date: Date): string {
  const day = String(date.getDate()).padStart(2, '0')
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const year = date.getFullYear()
  const hours = String(date.getHours()).padStart(2, '0')
  const minutes = String(date.getMinutes()).padStart(2, '0')
  return `${day}.${month}.${year}, ${hours}:${minutes}`
}

export function WaterTempDisplay() {
  const { data } = usePublicWaterTemp()
  const temp = data?.mainTemp ?? null
  const wadingTemp = data?.wadingTemp ?? null
  const updatedAt =
    data?.updatedAt != null && data.updatedAt.trim() !== ''
      ? new Date(data.updatedAt)
      : null

  const formattedUpdatedAt =
    updatedAt != null && !Number.isNaN(updatedAt.getTime())
      ? formatDateTime(updatedAt)
      : null

  return (
    <div className="card-brutal relative overflow-visible bg-gold-gradient p-6 text-[#2b2a29] md:p-10">
      <p className="font-accent text-2xl -rotate-1">teplota vody</p>
      <div className="mt-4 grid gap-4 lg:grid-cols-[1fr_auto] lg:items-end" aria-live="polite">
        <div>
          <p className="font-sans text-xs uppercase tracking-wide opacity-70">bazén</p>
          <p className="font-display text-[clamp(5rem,18vw,14rem)] leading-none">
            {temp != null ? `${temp.toFixed(1)}°` : '-'}
          </p>
        </div>

        <div className="card-brutal bg-surface px-5 py-4 text-foreground lg:mb-[0.55em]">
          <p className="font-sans text-xs uppercase tracking-wide text-muted">brouzdaliště</p>
          <p className="font-display text-4xl leading-none text-gold-gradient">
            {wadingTemp != null ? `${wadingTemp.toFixed(1)}°` : '-'}
          </p>
        </div>
      </div>
      <p className="mt-2 font-sans text-sm opacity-70">
        Naposledy aktualizováno:{' '}
        <span className="font-medium opacity-90">{formattedUpdatedAt ?? '-'}</span>
      </p>
    </div>
  )
}
