import { useState, type FormEvent } from 'react'
import { BrutalButton } from '@/components/ui/BrutalButton'
import { sendReservation } from '@/lib/email'
import {
  emailField,
  numberMinField,
  phoneField,
  requiredField,
} from '@/lib/formValidation'

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

type FieldErrors = Partial<
  Record<'name' | 'email' | 'phone' | 'accommodation' | 'guests' | 'dates', string>
>

type Props = {
  accommodation?: string
  onAccommodationChange?: (value: string) => void
}

function inputClass(invalid: boolean) {
  return `input-brutal mt-1 ${invalid ? 'input-brutal-invalid' : ''}`.trim()
}

export function ReservationForm({
  accommodation = '',
  onAccommodationChange,
}: Props) {
  const [status, setStatus] = useState<'idle' | 'loading' | 'ok' | 'error'>('idle')
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({})
  const [localAccommodation, setLocalAccommodation] = useState(accommodation)
  const isControlled = onAccommodationChange != null
  const selectedAccommodation = isControlled ? accommodation : localAccommodation

  function updateAccommodation(value: string) {
    if (isControlled) {
      onAccommodationChange(value)
    } else {
      setLocalAccommodation(value)
    }
    if (fieldErrors.accommodation) {
      setFieldErrors((prev) => ({ ...prev, accommodation: undefined }))
    }
  }

  function clearFieldError(field: keyof FieldErrors) {
    if (fieldErrors[field]) {
      setFieldErrors((prev) => ({ ...prev, [field]: undefined }))
    }
  }

  function validate(data: FormData): FieldErrors {
    const errors: FieldErrors = {}
    const name = formField(data, 'name')
    const email = formField(data, 'email')
    const phone = formField(data, 'phone')
    const accommodationValue = formField(data, 'accommodation')
    const guests = formField(data, 'guests')
    const dates = formField(data, 'dates')

    const nameError = requiredField(name, 'Jméno')
    if (nameError) errors.name = nameError

    const emailError = emailField(email)
    if (emailError) errors.email = emailError

    const phoneError = phoneField(phone)
    if (phoneError) errors.phone = phoneError

    const accommodationError = requiredField(accommodationValue, 'Ubytování')
    if (accommodationError) errors.accommodation = accommodationError

    const datesError = requiredField(dates, 'Termín pobytu')
    if (datesError) errors.dates = datesError

    const guestsError = numberMinField(guests, 'Počet osob', 1)
    if (guestsError) errors.guests = guestsError

    return errors
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const form = e.currentTarget
    const data = new FormData(form)

    const errors = validate(data)
    setFieldErrors(errors)
    if (Object.keys(errors).length > 0) return

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
      setFieldErrors({})
      form.reset()
      updateAccommodation('')
    } catch {
      setStatus('error')
    }
  }

  return (
    <form
      noValidate
      onSubmit={(e) => {
        void handleSubmit(e)
      }}
      className="card-brutal space-y-5 p-6 md:p-8"
    >
      <div>
        <h3 className="font-display text-3xl text-gold-gradient">Poptávka na rezervaci</h3>
        <p className="mt-2 font-sans text-sm text-muted">
          Vyplňte formulář a my se vám ozveme zpátky.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="block">
          <label htmlFor="reservation-name" className="block">
            <span className="font-display text-sm uppercase">Jméno *</span>
            <input
              id="reservation-name"
              name="name"
              aria-invalid={Boolean(fieldErrors.name)}
              aria-describedby={fieldErrors.name ? 'reservation-name-error' : undefined}
              className={inputClass(Boolean(fieldErrors.name))}
              onChange={() => clearFieldError('name')}
            />
          </label>
          {fieldErrors.name ? (
            <p id="reservation-name-error" className="form-field-error" role="alert">
              {fieldErrors.name}
            </p>
          ) : null}
        </div>

        <div className="block">
          <label htmlFor="reservation-email" className="block">
            <span className="font-display text-sm uppercase">E-mail *</span>
            <input
              id="reservation-email"
              name="email"
              type="email"
              inputMode="email"
              autoComplete="email"
              aria-invalid={Boolean(fieldErrors.email)}
              aria-describedby={fieldErrors.email ? 'reservation-email-error' : undefined}
              className={inputClass(Boolean(fieldErrors.email))}
              onChange={() => clearFieldError('email')}
            />
          </label>
          {fieldErrors.email ? (
            <p id="reservation-email-error" className="form-field-error" role="alert">
              {fieldErrors.email}
            </p>
          ) : null}
        </div>

        <div className="block">
          <label htmlFor="reservation-phone" className="block">
            <span className="font-display text-sm uppercase">Telefon *</span>
            <input
              id="reservation-phone"
              name="phone"
              type="tel"
              inputMode="tel"
              autoComplete="tel"
              aria-invalid={Boolean(fieldErrors.phone)}
              aria-describedby={fieldErrors.phone ? 'reservation-phone-error' : undefined}
              className={inputClass(Boolean(fieldErrors.phone))}
              onChange={() => clearFieldError('phone')}
            />
          </label>
          {fieldErrors.phone ? (
            <p id="reservation-phone-error" className="form-field-error" role="alert">
              {fieldErrors.phone}
            </p>
          ) : null}
        </div>

        <div className="block">
          <label htmlFor="reservation-accommodation" className="block">
            <span className="font-display text-sm uppercase">Ubytování *</span>
            <select
              id="reservation-accommodation"
              name="accommodation"
              value={selectedAccommodation}
              aria-invalid={Boolean(fieldErrors.accommodation)}
              aria-describedby={
                fieldErrors.accommodation ? 'reservation-accommodation-error' : undefined
              }
              onChange={(e) => updateAccommodation(e.target.value)}
              className={inputClass(Boolean(fieldErrors.accommodation))}
            >
              <option value="">Vyberte…</option>
              {accommodationOptions.map((o) => (
                <option key={o} value={o}>
                  {o}
                </option>
              ))}
            </select>
          </label>
          {fieldErrors.accommodation ? (
            <p id="reservation-accommodation-error" className="form-field-error" role="alert">
              {fieldErrors.accommodation}
            </p>
          ) : null}
        </div>

        <div className="block">
          <label htmlFor="reservation-guests" className="block">
            <span className="font-display text-sm uppercase">Počet osob</span>
            <input
              id="reservation-guests"
              name="guests"
              type="number"
              min={1}
              aria-invalid={Boolean(fieldErrors.guests)}
              aria-describedby={fieldErrors.guests ? 'reservation-guests-error' : undefined}
              className={inputClass(Boolean(fieldErrors.guests))}
              onChange={() => clearFieldError('guests')}
            />
          </label>
          {fieldErrors.guests ? (
            <p id="reservation-guests-error" className="form-field-error" role="alert">
              {fieldErrors.guests}
            </p>
          ) : null}
        </div>

        <div className="block">
          <label htmlFor="reservation-dates" className="block">
            <span className="font-display text-sm uppercase">Termín pobytu *</span>
            <input
              id="reservation-dates"
              name="dates"
              placeholder="např. 15.7. – 20.7.2026"
              aria-invalid={Boolean(fieldErrors.dates)}
              aria-describedby={fieldErrors.dates ? 'reservation-dates-error' : undefined}
              className={inputClass(Boolean(fieldErrors.dates))}
              onChange={() => clearFieldError('dates')}
            />
          </label>
          {fieldErrors.dates ? (
            <p id="reservation-dates-error" className="form-field-error" role="alert">
              {fieldErrors.dates}
            </p>
          ) : null}
        </div>
      </div>

      <label htmlFor="reservation-message" className="block">
        <span className="font-display text-sm uppercase">Poznámka</span>
        <textarea
          id="reservation-message"
          name="message"
          rows={4}
          className="input-brutal mt-1 resize-y"
        />
      </label>

      <BrutalButton
        type="submit"
        className="w-full md:w-auto"
        disabled={status === 'loading'}
      >
        {status === 'loading' ? 'ODESÍLÁM…' : 'ODESLAT POPTÁVKU →'}
      </BrutalButton>

      {status === 'ok' && (
        <p className="form-success" role="status">
          ✓ Poptávka odeslána! Brzy se ozveme.
        </p>
      )}
      {status === 'error' && (
        <p className="form-error" role="alert">
          Chyba při odesílání. Zkuste to znovu nebo volejte.
        </p>
      )}
    </form>
  )
}
