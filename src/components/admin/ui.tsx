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

type AdminInputProps = InputHTMLAttributes<HTMLInputElement> & {
  invalid?: boolean
}

export function AdminInput({ className = '', invalid = false, ...props }: AdminInputProps) {
  return (
    <input
      className={`admin-input ${invalid ? 'admin-input-invalid' : ''} ${className}`.trim()}
      aria-invalid={invalid || undefined}
      {...props}
    />
  )
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
  htmlFor,
  error,
  children,
  className = '',
}: {
  label: string
  htmlFor?: string
  error?: string | null
  children: ReactNode
  className?: string
}) {
  const errorId = htmlFor ? `${htmlFor}-error` : undefined

  return (
    <div className={`admin-field ${className}`.trim()}>
      <label htmlFor={htmlFor} className="block">
        <span className="admin-label">{label}</span>
        {children}
      </label>
      {error ? (
        <p id={errorId} className="admin-field-error" role="alert">
          {error}
        </p>
      ) : null}
    </div>
  )
}

export function AdminFormError({ message }: { message: string }) {
  return (
    <p className="admin-form-error" role="alert">
      {message}
    </p>
  )
}

export function AdminLoading({ message = 'Načítám…' }: { message?: string }) {
  return (
    <div className="admin-shell admin-loading">
      <p>{message}</p>
    </div>
  )
}
