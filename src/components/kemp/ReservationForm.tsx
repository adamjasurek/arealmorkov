import { useState, type FormEvent } from 'react'
import { BrutalButton } from '@/components/ui/BrutalButton'
import { sendReservation } from '@/lib/email'

function formField(data: FormData, name: string): string {
  const value = data.get(name)
  return typeof value === 'string' ? value : ''
}

const accommodationOptions = [
  '4-lůžková chatka',
  '2-lůžková chatka',
  'Místo pro karavan',
  'Stan velký (3+ osoby)',
  'Stan malý (do 2 osob)',
] as const

type Props = {
  accommodation?: string
  onAccommodationChange?: (value: string) => void
}

export function ReservationForm({
  accommodation = '',
  onAccommodationChange,
}: Props) {
  const [status, setStatus] = useState<'idle' | 'loading' | 'ok' | 'error'>('idle')
  const [localAccommodation, setLocalAccommodation] = useState(accommodation)
  const isControlled = onAccommodationChange != null
  const selectedAccommodation = isControlled ? accommodation : localAccommodation

  function updateAccommodation(value: string) {
    if (isControlled) {
      onAccommodationChange(value)
    } else {
      setLocalAccommodation(value)
    }
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const form = e.currentTarget
    const data = new FormData(form)

    setStatus('loading')
    try {
      await sendReservation({
        name: formField(data, 'name'),
        email: formField(data, 'email'),
        phone: formField(data, 'phone'),
        accommodation: formField(data, 'accommodation'),
        guests: formField(data, 'guests'),
        dates: formField(data, 'dates'),
        message: formField(data, 'message'),
      })
      setStatus('ok')
      form.reset()
      updateAccommodation('')
    } catch {
      setStatus('error')
    }
  }

  return (
    <form onSubmit={(e) => { void handleSubmit(e) }} className="card-brutal space-y-5 p-6 md:p-8">
      <div>
        <h3 className="font-display text-3xl text-gold-gradient">Poptávka na rezervaci</h3>
        <p className="mt-2 font-sans text-sm text-muted">
          Vyplňte formulář a my se vám ozveme zpátky.
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
          <select
            name="accommodation"
            required
            value={selectedAccommodation}
            onChange={(e) => updateAccommodation(e.target.value)}
            className="input-brutal mt-1"
          >
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
