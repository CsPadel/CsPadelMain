import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import type { Locale } from '../i18n/locales';
import { MENORCA_URL } from '../constants/urls';

interface Props {
  locale?: Locale;
}

const retreats = [
  {
    id: 'open',
    tag: 'Solo or Friends',
    name: 'Open Retreat',
    desc: 'Join a curated group of like-minded players for five immersive days of padel, fine dining and Mediterranean life.',
    image: '/imagenes/EM-22.jpg',
    href: null as string | null,
    hrefExternal: MENORCA_URL + '#rooms',
    isExternal: true,
  },
  {
    id: 'private',
    tag: 'Ultimate Privacy',
    name: 'Private Retreat',
    desc: 'Reserve the entire estate exclusively for your group. Complete privacy, custom schedule, and total immersion.',
    image: '/imagenes/cms/private-retreat.jpg',
    href: null as string | null,
    hrefExternal: MENORCA_URL + '#rooms',
    isExternal: true,
  },
  {
    id: 'executive',
    tag: 'C-Suite & Boards',
    name: 'Corporate & Executive',
    desc: 'Strategy in silence. High-performance leadership and networking in the most exclusive padel setting.',
    image: '/imagenes/cms/open-retreat.jpg',
    href: '/executive-retreat',
    hrefExternal: null,
    isExternal: false,
  },
];

export default function RetreatTypesSection({ locale }: Props) {
  const prefix = locale && locale !== 'en' ? `/${locale}` : '';

  return (
    <section
      className="py-24 md:py-32 px-8 md:px-16 bg-brand-ivory"
      aria-label="Retreat types"
    >
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          className="mb-14 md:mb-18"
        >
          <div className="flex items-center gap-4 mb-5">
            <span className="block h-px w-7 bg-brand-gold/40" aria-hidden="true" />
            <p className="text-[9px] uppercase tracking-[0.38em] text-brand-gold font-semibold">
              Retreat Formats
            </p>
          </div>
          <h2
            className="text-4xl md:text-5xl lg:text-6xl font-light text-brand-dark leading-none"
            style={{ fontFamily: 'var(--font-display)', fontStyle: 'italic' }}
          >
            Choose Your Retreat.
          </h2>
        </motion.div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5">
          {retreats.map((retreat, i) => {
            const href = retreat.isExternal
              ? retreat.hrefExternal!
              : `${prefix}${retreat.href}`;

            return (
              <motion.a
                key={retreat.id}
                href={href}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.6, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                className="group relative overflow-hidden rounded-card flex flex-col justify-end focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold"
                style={{ minHeight: '500px' }}
                aria-label={`${retreat.name} — view details`}
              >
                {/* Background image */}
                <img
                  src={retreat.image}
                  alt={retreat.name}
                  loading="lazy"
                  decoding="async"
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 will-change-transform"
                />

                {/* Gradient overlay — weighted towards the bottom so the copy
                    stays legible whatever the photograph behind it */}
                <div
                  className="absolute inset-0 transition-opacity duration-400"
                  style={{
                    background:
                      'linear-gradient(to bottom, rgba(1,25,44,0.10) 0%, rgba(1,25,44,0.55) 45%, rgba(1,25,44,0.99) 100%)',
                  }}
                />

                {/* Content */}
                <div className="relative z-10 p-7 md:p-8">
                  <span className="text-[10px] uppercase tracking-[0.28em] text-brand-gold font-semibold mb-3 block">
                    {retreat.tag}
                  </span>
                  <h3
                    className="text-3xl md:text-4xl font-semibold text-white mb-4 leading-snug"
                    style={{ fontFamily: 'var(--font-display)', fontStyle: 'italic', textShadow: '0 2px 12px rgba(0,0,0,0.45)' }}
                  >
                    {retreat.name}
                  </h3>
                  <p
                    className="text-white text-[15px] md:text-base font-medium leading-relaxed mb-6 max-w-[34ch]"
                    style={{ textShadow: '0 1px 8px rgba(0,0,0,0.5)' }}
                  >
                    {retreat.desc}
                  </p>

                  <div className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] font-semibold text-white/70 group-hover:text-brand-gold transition-colors duration-300">
                    Explore
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                  </div>
                </div>

                {/* Gold bottom accent line on hover */}
                <div className="absolute bottom-0 left-0 h-[2px] bg-brand-gold w-0 group-hover:w-full transition-all duration-500" />
              </motion.a>
            );
          })}
        </div>

      </div>
    </section>
  );
}
