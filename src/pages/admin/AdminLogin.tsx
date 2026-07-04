import { useState, type FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { loginUser } from '@/api/adminApi'
import { AdminButton, AdminField, AdminInput } from '@/components/admin/ui'

export function AdminLogin() {
  const navigate = useNavigate()
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setError(null)
    setLoading(true)
    const data = new FormData(event.currentTarget)
    const rawPassword = data.get('password')
    const password = typeof rawPassword === 'string' ? rawPassword : ''

    try {
      await loginUser(password)
      void navigate('/admin/dashboard', { replace: true })
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Přihlášení se nezdařilo.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="admin-shell admin-login-wrap">
      <div className="admin-card admin-login-card">
        <h1 className="admin-h1">Přihlášení</h1>
        <p className="admin-desc">Správa obsahu webu Areál Mořkov</p>

        <form onSubmit={(e) => { void handleSubmit(e) }} className="mt-6 space-y-4">
          <AdminField label="Heslo">
            <AdminInput
              name="password"
              type="password"
              required
              autoComplete="current-password"
            />
          </AdminField>

          {error ? (
            <p className="admin-error" role="alert">
              {error}
            </p>
          ) : null}

          <AdminButton type="submit" className="w-full" disabled={loading}>
            {loading ? 'Přihlašuji…' : 'Přihlásit se'}
          </AdminButton>
        </form>
      </div>
    </div>
  )
}
