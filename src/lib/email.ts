import emailjs from '@emailjs/browser'

type ReservationPayload = {
  name: string
  email: string
  phone: string
  accommodation: string
  guests: string
  dates: string
  message: string
}

const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID
const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID
const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY

export function isEmailConfigured(): boolean {
  return Boolean(serviceId && templateId && publicKey)
}

export async function sendReservation(payload: ReservationPayload): Promise<void> {
  if (!isEmailConfigured()) {
    await new Promise((r) => setTimeout(r, 800))
    console.info('[demo] Rezervace:', payload)
    return
  }

  emailjs.init(publicKey as string)
  await emailjs.send(serviceId as string, templateId as string, {
    from_name: payload.name,
    reply_to: payload.email,
    phone: payload.phone,
    accommodation: payload.accommodation,
    guests: payload.guests,
    dates: payload.dates,
    message: payload.message,
  })
}
