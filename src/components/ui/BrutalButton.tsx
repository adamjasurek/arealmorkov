import { Link } from 'react-router-dom'
import type { ComponentPropsWithoutRef } from 'react'

type Props = ComponentPropsWithoutRef<'button'> & {
  variant?: 'gold' | 'outline'
  href?: string
  to?: string
  external?: boolean
}

export function BrutalButton({
  variant = 'gold',
  href,
  to,
  external,
  className = '',
  children,
  ...props
}: Props) {
  const base =
    variant === 'gold' ? 'btn-brutal' : 'btn-brutal-outline'

  const classes = `${base} ${className}`.trim()

  if (to) {
    return (
      <Link to={to} className={classes}>
        {children}
      </Link>
    )
  }

  if (href) {
    return (
      <a
        href={href}
        className={classes}
        {...(external
          ? { target: '_blank', rel: 'noopener noreferrer' }
          : {})}
      >
        {children}
      </a>
    )
  }

  return (
    <button type="button" className={classes} {...props}>
      {children}
    </button>
  )
}
