import { sisterBrands } from '@/data/site'

function ExternalLinkIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 20 20"
      fill="currentColor"
      className="h-4 w-4 shrink-0"
      aria-hidden
    >
      <path d="M11 3a1 1 0 1 0 0 2h2.586l-6.293 6.293a1 1 0 1 0 1.414 1.414L15 6.414V9a1 1 0 1 0 2 0V4a1 1 0 0 0-1-1h-5z" />
      <path d="M5 5a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2v-3a1 1 0 1 0-2 0v3H5V7h3a1 1 0 0 0 0-2H5z" />
    </svg>
  )
}

export function SisterBrandsSection() {
  return (
    <section className="border-t-4 border-foreground bg-surface-elevated px-4 py-14 md:px-6 md:py-20">
      <div className="mx-auto max-w-[1400px]">
        <header className="text-center">
          <h2 className="font-display text-3xl text-gold-gradient sm:text-4xl md:text-5xl">
            Líbí se vám u nás?
          </h2>
          <div className="mx-auto mt-4 h-1 w-20 bg-gold-500" aria-hidden />
          <p className="mt-5 font-sans text-lg text-muted">Vyzkoušejte také</p>
        </header>

        <ul className="mt-12 flex flex-wrap justify-center gap-8">
          {sisterBrands.map((brand) => (
            <li key={brand.id} className="w-full max-w-[340px]">
              <article className="card-brutal flex h-full flex-col overflow-hidden bg-surface">
                {brand.image ? (
                  <div className="relative h-36 border-b-4 border-foreground">
                    <img
                      src={brand.image}
                      alt=""
                      className="h-full w-full object-cover"
                      aria-hidden
                    />
                    <div className="absolute inset-0 bg-surface/75" aria-hidden />
                  </div>
                ) : null}

                <div className="flex flex-1 flex-col items-center px-6 py-8 text-center">
                  <img
                    src={brand.logo}
                    alt={brand.name}
                    className="h-20 w-auto max-w-[200px] object-contain"
                  />
                  <h3 className="font-display mt-5 text-2xl text-foreground">{brand.name}</h3>
                  {brand.description ? (
                    <p className="mt-3 flex-1 font-sans text-sm leading-relaxed text-muted">
                      {brand.description}
                    </p>
                  ) : null}
                  <a
                    href={brand.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`btn-brutal inline-flex gap-2 text-base ${brand.description ? 'mt-6' : 'mt-5'}`}
                  >
                    <ExternalLinkIcon />
                    Navštívit web
                  </a>
                </div>
              </article>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
