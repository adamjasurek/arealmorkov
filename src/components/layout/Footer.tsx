import { contact } from '@/data/site'
import { Logo } from '@/components/ui/Logo'

export function Footer() {
  return (
    <footer className="relative mt-20 border-t-4 border-foreground bg-gold-gradient text-[#2b2a29]">
      <div
        className="font-watermark pointer-events-none absolute inset-0 flex items-center justify-center overflow-hidden text-[12vw] text-black/10"
        aria-hidden
      >
        MOŘKOV
      </div>

      <div className="relative mx-auto grid max-w-[1400px] gap-10 px-4 py-12 md:grid-cols-2 md:px-6">
        <div>
          <Logo imageClassName="h-20 w-auto max-w-[280px] md:h-24" />
        </div>

        <div>
          <p className="font-display mb-3 text-xl">Kontakt</p>
          <p className="font-sans text-sm">{contact.address}</p>
          <a
            href={`mailto:${contact.email}`}
            className="mt-1 block font-sans text-sm underline-offset-4 hover:underline"
          >
            {contact.email}
          </a>
          {contact.phones.map((phone) => (
            <a
              key={phone}
              href={`tel:${phone.replace(/\s/g, '')}`}
              className="mt-1 block font-sans font-semibold underline-offset-4 hover:underline"
            >
              {phone}
            </a>
          ))}
          <p className="mt-4 font-sans text-xs opacity-80">
            {contact.operator.name} · IČO {contact.operator.ico}
          </p>
        </div>
      </div>

      <div className="border-t-4 border-[#2b2a29] bg-[#2b2a29] px-4 py-3 text-center">
        <p className="font-display text-sm tracking-widest text-foreground">
          © {new Date().getFullYear()} Rekreační areál Mořkov · Pizza Olymp
        </p>
        <p className="mt-2 font-sans text-sm text-foreground/90">
          Vytvořil{' '}
          <a
            href="https://adamjasurek.cz"
            target="_blank"
            rel="noopener noreferrer"
            className="underline-offset-4 hover:underline"
          >
            Adam Jašúrek
          </a>
        </p>
      </div>
    </footer>
  )
}
