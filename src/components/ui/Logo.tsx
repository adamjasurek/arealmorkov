import { Link } from 'react-router-dom'
import logo from '@/assets/logo.webp'

type Props = {
  className?: string
  imageClassName?: string
  linked?: boolean
  bordered?: boolean
}

export function Logo({
  className = '',
  imageClassName = 'h-16 w-auto md:h-20',
  linked = false,
  bordered = true,
}: Props) {
  const img = (
    <img
      src={logo}
      alt="Areál Mořkov – koupaliště, kemp, restaurace"
      className={`object-contain ${bordered ? 'border-4 border-foreground bg-surface shadow-brutal' : ''} ${imageClassName}`}
    />
  )

  if (linked) {
    return (
      <Link to="/" className={`group inline-block shrink-0 ${className}`}>
        {img}
      </Link>
    )
  }

  return <span className={`inline-block shrink-0 ${className}`}>{img}</span>
}
