import { useState, type FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { loginUser } from '@/api/adminApi'
import { BrutalButton } from '@/components/ui/BrutalButton'

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
    <section className="mx-auto flex min-h-screen max-w-lg items-center px-4 py-20 md:px-6">
      <div className="w-full">
        <h1 className="font-display text-5xl text-gold-gradient">Admin</h1>
        <p className="mt-2 font-sans text-sm text-muted">Přihlášení do správy webu</p>

        <form onSubmit={(e) => { void handleSubmit(e) }} className="card-brutal mt-8 space-y-4 p-6">
          <label className="block">
            <span className="font-display text-sm uppercase">Heslo</span>
            <input
              name="password"
              type="password"
              required
              autoComplete="current-password"
              className="input-brutal mt-1 w-full"
            />
          </label>
          {error ? (
            <p className="font-sans text-sm text-red-600" role="alert">
              {error}
            </p>
          ) : null}
          <BrutalButton type="submit" className="w-full" disabled={loading}>
            {loading ? 'PŘIHLÁŠUJI…' : 'PŘIHLÁSIT →'}
          </BrutalButton>
        </form>
      </div>
    </section>
  )
}
