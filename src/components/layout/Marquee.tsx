import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type RefObject,
} from 'react'
import { defaultSiteContent } from '@/lib/contentDefaults'
import { usePublicSiteContent } from '@/hooks/usePublicContent'

type Props = {
  items?: readonly string[]
  reverse?: boolean
  className?: string
}

type TextPart = { kind: 'text'; value: string }

const MIN_COPIES = 4

function buildSequence(items: readonly string[]): Array<TextPart | { kind: 'sep' }> {
  const parts: Array<TextPart | { kind: 'sep' }> = []
  items.forEach((value, index) => {
    if (index > 0) parts.push({ kind: 'sep' })
    parts.push({ kind: 'text', value })
  })
  // Oddělovač i mezi koncem a začátkem další kopie v pásu
  if (items.length > 0) parts.push({ kind: 'sep' })
  return parts
}

function MarqueeSeparator() {
  return (
    <span className="marquee-sep" aria-hidden>
      ✦
    </span>
  )
}

function MarqueeGroup({
  parts,
  groupId,
  measureRef,
}: {
  parts: Array<TextPart | { kind: 'sep' }>
  groupId: string
  measureRef?: RefObject<HTMLDivElement | null>
}) {
  return (
    <div ref={measureRef} className="marquee-group" aria-hidden={groupId !== '0'}>
      {parts.map((part, i) =>
        part.kind === 'sep' ? (
          <MarqueeSeparator key={`${groupId}-sep-${i}`} />
        ) : (
          <span key={`${groupId}-${part.value}-${i}`} className="marquee-item">
            {part.value}
          </span>
        ),
      )}
    </div>
  )
}

export function Marquee({
  items: itemsProp,
  reverse = false,
  className = '',
}: Props) {
  const { data } = usePublicSiteContent()
  const items = itemsProp ?? data?.marqueeItems ?? defaultSiteContent.marqueeItems
  const sequence = buildSequence(items)
  const bandRef = useRef<HTMLDivElement>(null)
  const groupMeasureRef = useRef<HTMLDivElement>(null)
  const [copyCount, setCopyCount] = useState(MIN_COPIES)

  useEffect(() => {
    const band = bandRef.current
    const group = groupMeasureRef.current
    if (!band || !group) return

    const update = () => {
      const bandWidth = band.offsetWidth
      const groupWidth = group.offsetWidth
      if (groupWidth <= 0) return

      const needed = Math.ceil(bandWidth / groupWidth) + 2
      setCopyCount((prev) => {
        const next = Math.max(MIN_COPIES, needed)
        return prev === next ? prev : next
      })
    }

    update()
    const observer = new ResizeObserver(update)
    observer.observe(band)
    observer.observe(group)

    return () => observer.disconnect()
  }, [items, sequence])

  const trackStyle = {
    '--marquee-copies': copyCount,
    '--marquee-duration': `${Math.max(28, copyCount * 9)}s`,
  } as CSSProperties

  return (
    <div
      ref={bandRef}
      className={`marquee-band border-y-4 border-foreground ${className}`}
      aria-hidden
    >
      <div
        className={`marquee-track ${reverse ? 'marquee-track-reverse' : ''}`}
        style={trackStyle}
      >
        {Array.from({ length: copyCount }, (_, index) => (
          <MarqueeGroup
            key={index}
            parts={sequence}
            groupId={String(index)}
            measureRef={index === 0 ? groupMeasureRef : undefined}
          />
        ))}
      </div>
    </div>
  )
}
