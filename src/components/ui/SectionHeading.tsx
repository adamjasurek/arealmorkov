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
      className={`relative mb-10 ${className}`}
      initial={{ opacity: 0, x: -24 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
    >
      {eyebrow && (
        <p className="font-accent mb-2 text-2xl text-gold-500 -rotate-2">{eyebrow}</p>
      )}
      <h2 className="font-display text-5xl text-gold-gradient md:text-7xl lg:text-8xl">
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
