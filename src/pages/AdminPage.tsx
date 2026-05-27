import { useState, type FormEvent } from 'react'
import { useWaterTemp } from '@/hooks/useWaterTemp'
import { BrutalButton } from '@/components/ui/BrutalButton'

const ADMIN_PASSWORD =
  import.meta.env.VITE_ADMIN_PASSWORD ?? 'morkov2025'

export function AdminPage() {
  const { temp, setTemp, wadingTemp, setWadingTemp } = useWaterTemp()
  const [authed, setAuthed] = useState(false)
  const [inputTemp, setInputTemp] = useState(String(temp))
  const [inputWadingTemp, setInputWadingTemp] = useState(
    wadingTemp == null ? '' : String(wadingTemp),
  )
  const [saved, setSaved] = useState(false)

  function handleLogin(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const data = new FormData(e.currentTarget)
    const pwd = String(data.get('password') ?? '')
    if (pwd === ADMIN_PASSWORD) {
      setAuthed(true)
      setInputTemp(String(temp))
      setInputWadingTemp(wadingTemp == null ? '' : String(wadingTemp))
    } else {
      alert('Špatné heslo')
    }
  }

  function handleSave(e: FormEvent) {
    e.preventDefault()
    const value = Number.parseFloat(inputTemp.replace(',', '.'))
    if (!Number.isFinite(value)) return
    setTemp(value)

    const rawWading = inputWadingTemp.trim()
    if (rawWading === '') {
      setWadingTemp(null)
    } else {
      const wValue = Number.parseFloat(rawWading.replace(',', '.'))
      if (Number.isFinite(wValue)) setWadingTemp(wValue)
    }

    setSaved(true)
    setTimeout(() => setSaved(false), 2500)
  }

  return (
    <section className="mx-auto max-w-lg px-4 py-20 md:px-6">
      <h1 className="font-display text-5xl text-gold-gradient">Admin</h1>
      <p className="font-accent mt-2 text-xl text-muted -rotate-1">
        teplota vody · koupaliště
      </p>

      {!authed ? (
        <form onSubmit={handleLogin} className="card-brutal mt-8 space-y-4 p-6">
          <label className="block">
            <span className="font-display text-sm uppercase">Heslo</span>
            <input
              name="password"
              type="password"
              required
              className="input-brutal mt-1"
              autoComplete="current-password"
            />
          </label>
          <BrutalButton type="submit" className="w-full">
            PŘIHLÁSIT →
          </BrutalButton>
        </form>
      ) : (
        <form onSubmit={handleSave} className="card-brutal mt-8 space-y-4 p-6">
          <p className="font-sans text-sm text-muted">
            Aktuální teplota:{' '}
            <strong className="font-display text-2xl text-gold-500">{temp}°C</strong>
          </p>
          <label className="block">
            <span className="font-display text-sm uppercase">Nová teplota (°C)</span>
            <input
              type="text"
              inputMode="decimal"
              value={inputTemp}
              onChange={(e) => setInputTemp(e.target.value)}
              className="input-brutal mt-1 font-display text-3xl"
            />
          </label>

          <label className="block">
            <span className="font-display text-sm uppercase">
              Teplota brouzdaliště (°C)
            </span>
            <input
              type="text"
              inputMode="decimal"
              placeholder=""
              value={inputWadingTemp}
              onChange={(e) => setInputWadingTemp(e.target.value)}
              className="input-brutal mt-1 font-display text-2xl"
            />
          </label>
          <BrutalButton type="submit" className="w-full">
            ULOŽIT →
          </BrutalButton>
          {saved && (
            <p className="font-accent text-xl text-gold-500" role="status">
              ✓ Uloženo do prohlížeče (localStorage)
            </p>
          )}
        </form>
      )}
    </section>
  )
}
