import { useState, type FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { loginUser } from '@/api/adminApi'
import { AdminButton, AdminField, AdminFormError, AdminInput } from '@/components/admin/ui'
import { requiredField } from '@/lib/formValidation'

const PASSWORD_FIELD_ID = 'admin-password'

export function AdminLogin() {
  const navigate = useNavigate()
  const [formError, setFormError] = useState<string | null>(null)
  const [fieldError, setFieldError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setFormError(null)

    const data = new FormData(event.currentTarget)
    const rawPassword = data.get('password')
    const password = typeof rawPassword === 'string' ? rawPassword : ''

    const passwordError = requiredField(password, 'Heslo')
    setFieldError(passwordError)
    if (passwordError) return

    setLoading(true)
    try {
      await loginUser(password)
      void navigate('/admin/dashboard', { replace: true })
    } catch (err) {
      setFormError(err instanceof Error ? err.message : 'Přihlášení se nezdařilo.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="admin-shell admin-login-wrap">
      <div className="admin-card admin-login-card">
        <p className="admin-login-brand">Areál Mořkov</p>
        <h1 className="admin-h1 mt-3">Přihlášení</h1>
        <p className="admin-desc">Správa obsahu webu</p>

        <form
          noValidate
          onSubmit={(e) => {
            void handleSubmit(e)
          }}
          className="mt-6 space-y-4"
        >
          <AdminField label="Heslo" htmlFor={PASSWORD_FIELD_ID} error={fieldError}>
            <AdminInput
              id={PASSWORD_FIELD_ID}
              name="password"
              type="password"
              autoComplete="current-password"
              invalid={Boolean(fieldError)}
              aria-describedby={fieldError ? `${PASSWORD_FIELD_ID}-error` : undefined}
              onChange={() => {
                if (fieldError) setFieldError(null)
              }}
            />
          </AdminField>

          {formError ? <AdminFormError message={formError} /> : null}

          <AdminButton type="submit" className="w-full" disabled={loading}>
            {loading ? 'Přihlašuji…' : 'Přihlásit se'}
          </AdminButton>
        </form>
      </div>
    </div>
  )
}
