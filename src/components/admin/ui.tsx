import type { ButtonHTMLAttributes, InputHTMLAttributes, ReactNode } from 'react'

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'primary' | 'secondary' | 'ghost'
}

export function AdminButton({ variant = 'primary', className = '', children, ...props }: ButtonProps) {
  const variantClass =
    variant === 'secondary' ? 'admin-btn-secondary' : variant === 'ghost' ? 'admin-btn-ghost' : ''
  return (
    <button type="button" className={`admin-btn ${variantClass} ${className}`.trim()} {...props}>
      {children}
    </button>
  )
}

export function AdminInput({ className = '', ...props }: InputHTMLAttributes<HTMLInputElement>) {
  return <input className={`admin-input ${className}`.trim()} {...props} />
}

export function AdminPageHeader({ title, description }: { title: string; description?: string }) {
  return (
    <header className="admin-page-header">
      <div className="admin-page-header-accent" />
      <h1 className="admin-h1">{title}</h1>
      {description ? <p className="admin-desc">{description}</p> : null}
    </header>
  )
}

export function AdminCard({ children, className = '' }: { children: ReactNode; className?: string }) {
  return <div className={`admin-card ${className}`.trim()}>{children}</div>
}

export function AdminField({
  label,
  children,
  className = '',
}: {
  label: string
  children: ReactNode
  className?: string
}) {
  return (
    <label className={`block ${className}`.trim()}>
      <span className="admin-label">{label}</span>
      {children}
    </label>
  )
}

export function AdminLoading({ message = 'Načítám…' }: { message?: string }) {
  return (
    <div className="admin-shell admin-loading">
      <p>{message}</p>
    </div>
  )
}
