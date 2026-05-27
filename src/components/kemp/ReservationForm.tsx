import { useState, type FormEvent } from 'react'
import { BrutalButton } from '@/components/ui/BrutalButton'
import { isEmailConfigured, sendReservation } from '@/lib/email'

const accommodationOptions = [
  '4-lůžková chatka',
  '2-lůžková chatka',
  'Místo pro karavan',
  'Stan velký (3+ osoby)',
  'Stan malý (do 2 osob)',
]

export function ReservationForm() {
  const [status, setStatus] = useState<'idle' | 'loading' | 'ok' | 'error'>('idle')

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const form = e.currentTarget
    const data = new FormData(form)

    setStatus('loading')
    try {
      await sendReservation({
        name: String(data.get('name') ?? ''),
        email: String(data.get('email') ?? ''),
        phone: String(data.get('phone') ?? ''),
        accommodation: String(data.get('accommodation') ?? ''),
        guests: String(data.get('guests') ?? ''),
        dates: String(data.get('dates') ?? ''),
        message: String(data.get('message') ?? ''),
      })
      setStatus('ok')
      form.reset()
    } catch {
      setStatus('error')
    }
  }

  return (
    <form onSubmit={handleSubmit} className="card-brutal space-y-5 p-6 md:p-8">
      <div>
        <h3 className="font-display text-3xl text-gold-gradient">Poptávka na rezervaci</h3>
        <p className="mt-2 font-sans text-sm text-muted">
          {isEmailConfigured()
            ? 'Odešleme vám potvrzení e-mailem.'
            : 'Demo režim – nastavte EmailJS v .env pro odesílání.'}
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <label className="block">
          <span className="font-display text-sm uppercase">Jméno *</span>
          <input name="name" required className="input-brutal mt-1" />
        </label>
        <label className="block">
          <span className="font-display text-sm uppercase">E-mail *</span>
          <input name="email" type="email" required className="input-brutal mt-1" />
        </label>
        <label className="block">
          <span className="font-display text-sm uppercase">Telefon *</span>
          <input name="phone" type="tel" required className="input-brutal mt-1" />
        </label>
        <label className="block">
          <span className="font-display text-sm uppercase">Ubytování *</span>
          <select name="accommodation" required className="input-brutal mt-1">
            <option value="">Vyberte…</option>
            {accommodationOptions.map((o) => (
              <option key={o} value={o}>
                {o}
              </option>
            ))}
          </select>
        </label>
        <label className="block">
          <span className="font-display text-sm uppercase">Počet osob</span>
          <input name="guests" type="number" min={1} className="input-brutal mt-1" />
        </label>
        <label className="block">
          <span className="font-display text-sm uppercase">Termín pobytu *</span>
          <input
            name="dates"
            required
            placeholder="např. 15.7. – 20.7.2026"
            className="input-brutal mt-1"
          />
        </label>
      </div>

      <label className="block">
        <span className="font-display text-sm uppercase">Poznámka</span>
        <textarea name="message" rows={4} className="input-brutal mt-1 resize-y" />
      </label>

      <BrutalButton
        type="submit"
        className="w-full md:w-auto"
        disabled={status === 'loading'}
      >
        {status === 'loading' ? 'ODESÍLÁM…' : 'ODESLAT POPTÁVKU →'}
      </BrutalButton>

      {status === 'ok' && (
        <p className="font-accent text-xl text-gold-500" role="status">
          ✓ Poptávka odeslána! Brzy se ozveme.
        </p>
      )}
      {status === 'error' && (
        <p className="font-sans text-red-400" role="alert">
          Chyba při odesílání. Zkuste to znovu nebo volejte.
        </p>
      )}
    </form>
  )
}
