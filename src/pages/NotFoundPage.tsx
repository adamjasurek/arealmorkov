import { BrutalButton } from '@/components/ui/BrutalButton'

export function NotFoundPage() {
  return (
    <div className="flex h-full min-h-0 flex-col">
      <section className="relative isolate flex h-full w-full flex-col items-center justify-center overflow-hidden bg-surface px-4 text-center">
        <p className="font-accent text-2xl text-gold-500 md:text-3xl">Ztratili jste se?</p>

        <div
          className="mt-4 flex items-center justify-center gap-2 md:gap-4"
          aria-hidden
        >
          <span
            className="font-display text-[clamp(5rem,22vw,11rem)] leading-none text-gold-gradient"
            style={{ transform: 'rotate(-6deg)' }}
          >
            4
          </span>
          <span className="font-display text-[clamp(5rem,22vw,11rem)] leading-none text-gold-gradient">
            0
          </span>
          <span
            className="font-display text-[clamp(5rem,22vw,11rem)] leading-none text-gold-gradient"
            style={{ transform: 'rotate(5deg)' }}
          >
            4
          </span>
        </div>

        <h1 className="font-display mt-6 text-3xl text-foreground md:text-5xl lg:text-6xl">
          TATO STRÁNKA NEEXISTUJE
        </h1>

        <BrutalButton to="/" className="mt-10">
          ZPĚT NA DOMOVSKOU STRÁNKU →
        </BrutalButton>
      </section>
    </div>
  )
}
