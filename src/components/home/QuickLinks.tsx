import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { pizzaDelivery } from '@/data/site'

const cards = [
  {
    title: 'Rozvoz pizzy',
    desc: `Objednávejte na ☎ ${pizzaDelivery.phone}`,
    to: '/restaurace',
    rotate: -2,
  },
  {
    title: 'Rezervace kempu',
    desc: 'Chatky, stany, karavany – poptávka online',
    to: '/kemp',
    rotate: 1,
  },
  {
    title: 'Teplota vody',
    desc: 'Aktuální teplota bazénu',
    to: '/koupaliste',
    rotate: -1,
  },
]

export function QuickLinks() {
  return (
    <section className="px-4 py-16 md:px-6">
      <div className="mx-auto grid max-w-[1400px] gap-6 md:grid-cols-3">
        {cards.map((card, i) => (
          <motion.div
            key={card.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08 }}
          >
            <Link
              to={card.to}
              className="card-brutal block p-6"
              style={{ transform: `rotate(${card.rotate}deg)` }}
            >
              <h3 className="font-display text-3xl text-gold-gradient">{card.title}</h3>
              <p className="mt-2 font-sans text-sm text-muted">{card.desc}</p>
              <span className="mt-4 inline-block font-display text-lg underline decoration-gold-500">
                VSTOUPIT →
              </span>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
