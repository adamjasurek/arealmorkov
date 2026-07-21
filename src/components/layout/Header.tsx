import { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Logo } from '@/components/ui/Logo'

const links = [
  { to: '/koupaliste', label: 'Koupaliště' },
  { to: '/kemp', label: 'Kemp' },
  { to: '/restaurace', label: 'Restaurace' },
  { to: '/kontakt', label: 'Kontakt' },
]

export function Header() {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    document.body.classList.toggle('nav-open', open)
    return () => document.body.classList.remove('nav-open')
  }, [open])

  return (
    <header className="sticky top-0 z-50 w-full max-w-full border-b-4 border-foreground bg-surface pt-[env(safe-area-inset-top)]">
      <div className="mx-auto flex w-full max-w-[1400px] min-w-0 items-center justify-between gap-3 px-4 py-3 md:gap-4 md:px-6">
        <Logo linked bordered={false} imageClassName="h-12 w-auto sm:h-14 md:h-20" />

        <nav className="hidden items-center gap-1 md:flex">
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                `font-display border-2 border-transparent px-4 py-2 text-lg uppercase tracking-wider transition-colors hover:border-foreground hover:bg-gold-gradient hover:text-[#2b2a29] ${
                  isActive ? 'border-foreground bg-gold-gradient text-[#2b2a29]' : ''
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        <button
          type="button"
          className="btn-brutal-outline min-h-11 min-w-11 px-3 py-2.5 text-lg md:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-label="Menu"
        >
          {open ? '✕' : '☰'}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.nav
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden border-t-4 border-foreground md:hidden"
          >
            {links.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                onClick={() => setOpen(false)}
                className="font-display block border-b-2 border-foreground/20 px-6 py-4 text-2xl uppercase hover:bg-gold-gradient hover:text-[#2b2a29]"
              >
                {link.label}
              </NavLink>
            ))}
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  )
}
