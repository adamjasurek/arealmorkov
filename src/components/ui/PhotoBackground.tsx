type Props = {
  src: string
  alt?: string
  overlayClassName?: string
  loading?: 'lazy' | 'eager'
  fetchPriority?: 'high' | 'low' | 'auto'
}

export function PhotoBackground({
  src,
  alt = '',
  overlayClassName = 'bg-surface/80',
  loading = 'lazy',
  fetchPriority,
}: Props) {
  return (
    <>
      <img
        src={src}
        alt={alt}
        aria-hidden={!alt}
        loading={loading}
        fetchPriority={fetchPriority}
        className="pointer-events-none absolute inset-0 h-full w-full object-cover"
      />
      <div className={`absolute inset-0 ${overlayClassName}`} aria-hidden />
    </>
  )
}
