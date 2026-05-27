type Props = {
  className?: string
  variant?: 'light' | 'dark'
}

const strokeColors = {
  light: 'rgba(254, 254, 254, 0.45)',
  dark: 'rgba(43, 42, 41, 0.35)',
} as const

const size = 160
const radius = 72

/** Čárkovaný kruh – střed v pravém horním rohu (cx, cy) = (160, 0) */
export function CornerOrbitDecoration({
  className = '',
  variant = 'light',
}: Props) {
  return (
    <div
      className={`pointer-events-none absolute right-0 top-0 z-40 ${className}`.trim()}
      aria-hidden
    >
      <svg
        className="corner-orbit block h-40 w-40 md:h-48 md:w-48"
        viewBox={`0 0 ${size} ${size}`}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        overflow="visible"
      >
        <circle
          cx={size}
          cy={0}
          r={radius}
          stroke={strokeColors[variant]}
          strokeWidth="2.5"
          strokeDasharray="9 13"
          strokeLinecap="round"
        />
      </svg>
    </div>
  )
}
