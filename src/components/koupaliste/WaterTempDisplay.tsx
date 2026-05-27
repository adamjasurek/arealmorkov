import { useWaterTemp } from '@/hooks/useWaterTemp'

export function WaterTempDisplay() {
  const { temp, wadingTemp, updatedAt } = useWaterTemp()

  const formattedUpdatedAt =
    updatedAt != null
      ? new Intl.DateTimeFormat('cs-CZ', {
          day: '2-digit',
          month: '2-digit',
          year: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
        }).format(updatedAt)
      : null

  return (
    <div className="card-brutal relative overflow-visible bg-surface p-6 md:p-10">
      <p className="font-accent text-2xl text-gold-500 -rotate-1">teplota vody</p>
      <div className="mt-4 grid gap-4 lg:grid-cols-[1fr_auto] lg:items-end" aria-live="polite">
        <div>
          <p className="font-sans text-xs uppercase tracking-wide text-muted">
            bazén
          </p>
          <p className="font-display text-[clamp(5rem,18vw,14rem)] leading-none text-gold-gradient">
            {temp.toFixed(1)}°
          </p>
        </div>

        <div className="card-brutal bg-foreground/[0.03] px-5 py-4 lg:mb-[0.55em]">
          <p className="font-sans text-xs uppercase tracking-wide text-muted">
            brouzdaliště
          </p>
          <p className="font-display text-4xl leading-none text-foreground/70">
            {wadingTemp != null ? `${wadingTemp.toFixed(1)}°` : '—'}
          </p>
        </div>
      </div>
      <p className="mt-2 font-sans text-sm text-muted">
        Naposledy aktualizováno:{' '}
        <span className="font-medium text-foreground/80">
          {formattedUpdatedAt ?? '—'}
        </span>
      </p>
    </div>
  )
}
