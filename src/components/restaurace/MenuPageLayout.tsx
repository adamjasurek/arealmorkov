import { Link } from 'react-router-dom'
import type { ReactNode } from 'react'

type Props = {
  children: ReactNode
}

export function MenuPageLayout({ children }: Props) {
  return (
    <>
      <section className="border-b-4 border-foreground px-4 py-8 md:px-6">
        <div className="mx-auto max-w-[1400px]">
          <Link
            to="/restaurace"
            className="font-sans text-sm text-muted underline-offset-4 hover:text-foreground hover:underline"
          >
            ← Restaurace Podhora
          </Link>
        </div>
      </section>
      <section className="px-4 py-16 md:px-6">
        <div className="mx-auto max-w-[1400px]">{children}</div>
      </section>
    </>
  )
}
