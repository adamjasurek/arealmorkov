import type { ReactNode } from 'react'
import { contact } from '@/data/site'
import { Logo } from '@/components/ui/Logo'
import { Marquee } from '@/components/layout/Marquee'
import { useMergedSiteContent } from '@/hooks/useMergedSiteContent'

function FooterHeading({ children }: { children: ReactNode }) {
  return (
    <p className="font-display mb-4 text-xl tracking-wide text-gold-gradient">{children}</p>
  )
}

export function Footer() {
  const { data: site } = useMergedSiteContent()
  const pizzaDelivery = site.pizzaDelivery

  return (
    <footer className="relative mt-20 w-full max-w-full overflow-x-hidden border-t-4 border-foreground bg-surface">
      <Marquee className="border-t-0" />

      <div className="relative w-full overflow-hidden border-b-4 border-foreground">
        <div
          className="font-watermark pointer-events-none absolute right-4 bottom-4 select-none text-[clamp(4rem,18vw,12rem)] leading-none text-foreground/[0.04]"
          aria-hidden
        >
          MOŘKOV
        </div>

        <div className="relative mx-auto w-full max-w-[1400px] min-w-0 px-4 py-14 md:px-6 lg:py-16">
          <div className="grid grid-cols-1 items-center gap-12 md:grid-cols-2 md:gap-16 lg:gap-24">
            <div className="flex min-w-0 flex-col items-center md:items-end md:pr-4 lg:pr-8">
              <Logo linked bordered={false} imageClassName="h-28 w-auto max-w-[320px] md:h-32 md:max-w-[380px]" />
            </div>

            <div className="flex min-w-0 flex-col items-center md:items-start md:pl-4 lg:pl-8">
              <div className="w-full max-w-sm text-center md:text-left">
                <FooterHeading>Kontakt</FooterHeading>
                <address className="space-y-3 font-sans text-sm not-italic">
                  <p className="text-muted">{contact.address}</p>
                  <a
                    href={`mailto:${contact.email}`}
                    className="block break-all text-foreground transition-colors hover:text-gold-500"
                  >
                    {contact.email}
                  </a>
                  {contact.phones.map((phone) => (
                    <a
                      key={phone}
                      href={`tel:${phone.replace(/\s/g, '')}`}
                      className="block font-medium text-foreground transition-colors hover:text-gold-500"
                    >
                      {phone}
                    </a>
                  ))}
                </address>
              </div>
            </div>
          </div>

          <div className="mx-auto mt-12 w-full max-w-sm border-4 border-foreground bg-surface-elevated p-5 text-center shadow-brutal-sm md:mt-14 md:p-6">
            <p className="font-display text-base tracking-wider text-gold-500 md:text-lg">
              Rozvoz pizzy
            </p>
            <a
              href={`tel:${pizzaDelivery.phone.replace(/\s/g, '')}`}
              className="mt-2 block font-display text-4xl text-gold-gradient transition-opacity hover:opacity-90 md:text-5xl"
            >
              {pizzaDelivery.phone}
            </a>
          </div>
        </div>
      </div>

      <div className="w-full bg-[#1a1918] px-4 py-5 md:px-6">
        <div className="mx-auto grid w-full max-w-[1400px] min-w-0 gap-3 text-center sm:grid-cols-3 sm:text-left">
          <p className="font-display text-xs tracking-[0.15em] text-muted uppercase">
            © {new Date().getFullYear()} Rekreační areál Mořkov
          </p>
          <p className="font-sans text-xs text-muted sm:text-center">
            {contact.operator.name} · IČO {contact.operator.ico}
          </p>
          <a
            href="https://adamjasurek.cz"
            target="_blank"
            rel="noopener noreferrer"
            className="block font-sans text-xs text-muted underline-offset-4 transition-colors hover:text-gold-500 hover:underline sm:text-right"
          >
            Vytvořil Adam Jašúrek
          </a>
        </div>
      </div>
    </footer>
  )
}
