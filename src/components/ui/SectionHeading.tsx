import { motion } from 'framer-motion'

type Props = {
  eyebrow?: string
  title: string
  accent?: string
  className?: string
}

export function SectionHeading({ eyebrow, title, accent, className = '' }: Props) {
  return (
    <motion.header
      className={`relative ${className || 'mb-8 md:mb-10'}`}
      initial={{ opacity: 0, x: -24 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
    >
      {eyebrow && (
        <p className="font-accent mb-2 text-xl text-gold-500 -rotate-2 sm:text-2xl">{eyebrow}</p>
      )}
      <h2 className="font-display text-4xl text-gold-gradient sm:text-5xl md:text-7xl lg:text-8xl">
        {title}
      </h2>
      {accent && (
        <span
          className="font-watermark pointer-events-none absolute -right-2 -top-6 hidden text-6xl text-foreground md:block"
          aria-hidden
        >
          {accent}
        </span>
      )}
    </motion.header>
  )
}
