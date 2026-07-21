import { contact } from '@/data/site'
import { SectionHeading } from '@/components/ui/SectionHeading'

export function KontaktPage() {
  return (
    <section className="px-4 py-10 md:px-6 md:py-16">
      <div className="mx-auto max-w-[1400px]">
        <SectionHeading title="Kontakt" />

        <div className="grid gap-6 lg:grid-cols-2 lg:gap-8">
          <div className="card-brutal space-y-6 p-5 sm:p-6">
            <div>
              <h3 className="font-display text-2xl">Adresa areálu</h3>
              <p className="mt-2 font-sans text-base sm:text-lg">{contact.address}</p>
            </div>
            <div>
              <h3 className="font-display text-2xl">E-mail</h3>
              <a
                href={`mailto:${contact.email}`}
                className="mt-2 block break-all font-sans text-base font-semibold text-gold-500 hover:underline sm:text-lg"
              >
                {contact.email}
              </a>
            </div>
            <div>
              <h3 className="font-display text-2xl">Telefon</h3>
              {contact.phones.map((phone) => (
                <a
                  key={phone}
                  href={`tel:${phone.replace(/\s/g, '')}`}
                  className="mt-2 flex min-h-11 items-center font-sans text-base font-semibold text-gold-500 hover:underline sm:text-lg"
                >
                  {phone}
                </a>
              ))}
            </div>
            <div>
              <h3 className="font-display text-2xl">Rozvoz pizzy</h3>
              <a
                href={`tel:${contact.pizzaPhone}`}
                className="font-display inline-flex min-h-11 items-center text-2xl text-gold-gradient sm:text-3xl"
              >
                {contact.pizzaPhone}
              </a>
            </div>
          </div>

          <div className="card-brutal p-5 sm:p-6">
            <h3 className="font-display text-2xl">Fakturační údaje</h3>
            <p className="mt-4 font-sans">
              Provozovatel: {contact.operator.name}
              <br />
              {contact.operator.address}
              <br />
              IČO: {contact.operator.ico}
            </p>
          </div>
        </div>

        <div className="card-brutal mt-10 overflow-hidden p-0 md:mt-16">
          <iframe
            title="Mapa areálu Mořkov"
            src={contact.mapEmbed}
            width="100%"
            height="280"
            className="h-[min(50vh,350px)] min-h-[240px] w-full border-0 md:h-[350px]"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </div>
    </section>
  )
}
