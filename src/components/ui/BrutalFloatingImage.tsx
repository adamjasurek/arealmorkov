type Props = {
  src: string
  alt?: string
  className?: string
  onError?: () => void
  /** corner = roh karty, center = střed, inset = volná pozice přes className */
  placement?: 'corner' | 'center' | 'inset'
}

const base =
  'pointer-events-none z-20 border-4 border-foreground object-cover shadow-brutal'

const placementClasses = {
  corner: 'absolute -bottom-6 -right-4 h-24 w-24 rotate-6 lg:h-32 lg:w-32',
  center: 'relative h-32 w-32 shrink-0 rotate-6 lg:h-40 lg:w-40',
  inset: 'absolute',
} as const

export function BrutalFloatingImage({
  src,
  alt = '',
  className = '',
  onError,
  placement = 'corner',
}: Props) {
  return (
    <img
      src={src}
      alt={alt}
      loading="lazy"
      className={`${base} ${placementClasses[placement]} ${className}`.trim()}
      onError={onError}
      {...(alt ? {} : { 'aria-hidden': true })}
    />
  )
}
