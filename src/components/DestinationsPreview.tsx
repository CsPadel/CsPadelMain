import { motion } from 'framer-motion';
import { ArrowRight, MapPin, Calendar } from 'lucide-react';
import type { Locale } from '../i18n/locales';

interface Props {
  locale?: Locale;
}

const destinations = [
  {
    id: 'menorca',
    name: 'MENORCA',
    tagline: 'Mediterranean Sanctuary',
    location: 'Balearic Islands · Spain',
    date: 'Sep 30 – Oct 4, 2026',
    spots: '6 places left',
    image: '/imagenes/cap roig.jpg',
    href: '/menorca',
  },
  {
    id: 'bali',
    name: 'BALI',
    tagline: 'Jungle Luxury. Elite Padel.',
    location: 'Canggu · Indonesia',
    date: 'Jul 8–12 & 22–26, 2026',
    spots: 'Limited Places',
    image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=900&h=600&fit=crop&crop=center&q=85',
    href: '/bali',
  },
  {
    id: 'dubai',
    name: 'DUBAI',
    tagline: 'Urban Prestige. Desert Courts.',
    location: 'Downtown · UAE',
    date: 'Nov 19–22, 2026',
    spots: 'Limited Places',
    image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=900&h=600&fit=crop&crop=center&q=85',
    href: '/dubai',
  },
];

export default function DestinationsPreview({ locale }: Props) {
  const prefix = locale && locale !== 'en' ? `/${locale}` : '';

  return (
    <section className="py-24 md:py-32 px-8 md:px-16 bg-white">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          className="flex items-end justify-between mb-14"
        >
          <div>
            <div className="flex items-center gap-4 mb-4">
              <span className="block h-px w-7 bg-brand-gold/40" aria-hidden="true" />
              <p className="text-[9px] uppercase tracking-[0.38em] text-brand-gold font-semibold">
                2026 Season
              </p>
            </div>
            <h2
              className="text-4xl md:text-5xl font-light text-brand-dark"
              style={{ fontFamily: 'var(--font-display)', fontStyle: 'italic' }}
            >
              Our Destinations
            </h2>
          </div>
          <a
            href={`${prefix}/menorca`}
            className="hidden md:flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] text-brand-dark/40 hover:text-brand-gold transition-colors duration-300 pb-1 border-b border-transparent hover:border-brand-gold/40"
          >
            View all <ArrowRight className="w-3 h-3" />
          </a>
        </motion.div>

        {/* Grid — Menorca left tall, Bali + Dubai right stacked */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">

          {/* Menorca — tall left card */}
          <motion.a
            href={`${prefix}/${destinations[0].id}`}
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-2 group relative rounded-card overflow-hidden flex flex-col justify-end"
            style={{ minHeight: '520px' }}
          >
            <div className="absolute inset-0 skeleton-light" aria-hidden="true" />
            <img
              src={destinations[0].image}
              alt={destinations[0].name}
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              loading="lazy"
              decoding="async"
              onLoad={(e) => {
                const el = e.currentTarget.previousElementSibling as HTMLElement;
                if (el) el.style.opacity = '0';
              }}
            />
            <div
              className="absolute inset-0"
              style={{
                background:
                  'linear-gradient(to bottom, rgba(1,25,44,0.1) 0%, rgba(1,25,44,0.2) 40%, rgba(1,25,44,0.92) 100%)',
              }}
            />
            <DestinationCardContent d={destinations[0]} />
          </motion.a>

          {/* Bali + Dubai — stacked right */}
          <div className="lg:col-span-3 flex flex-col gap-4">
            {destinations.slice(1).map((d, i) => (
              <motion.a
                key={d.id}
                href={`${prefix}/${d.id}`}
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.8, delay: 0.12 + i * 0.13, ease: [0.22, 1, 0.36, 1] }}
                className="group relative rounded-card overflow-hidden flex flex-col justify-end flex-1"
                style={{ minHeight: '248px' }}
              >
                <div className="absolute inset-0 skeleton-light" aria-hidden="true" />
                <img
                  src={d.image}
                  alt={d.name}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                  decoding="async"
                  onLoad={(e) => {
                    const el = e.currentTarget.previousElementSibling as HTMLElement;
                    if (el) el.style.opacity = '0';
                  }}
                />
                <div
                  className="absolute inset-0"
                  style={{
                    background:
                      'linear-gradient(to bottom, rgba(1,25,44,0.05) 0%, rgba(1,25,44,0.3) 50%, rgba(1,25,44,0.92) 100%)',
                  }}
                />
                <DestinationCardContent d={d} compact />
              </motion.a>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}

function DestinationCardContent({
  d,
  compact = false,
}: {
  d: (typeof destinations)[number];
  compact?: boolean;
}) {
  return (
    <div className={`relative z-10 p-6 md:p-8 ${compact ? '' : 'pb-8'}`}>
      {/* Location */}
      <div className="flex items-center gap-1.5 mb-3">
        <MapPin className="w-3 h-3 text-brand-gold flex-shrink-0" />
        <span className="text-[10px] uppercase tracking-widest text-brand-gold font-medium">
          {d.location}
        </span>
      </div>

      {/* Name */}
      <h3
        className={`text-brand-light font-light leading-none mb-2 ${compact ? 'text-3xl md:text-4xl' : 'text-4xl md:text-5xl'}`}
        style={{ fontFamily: 'var(--font-display)', fontStyle: 'italic' }}
      >
        {d.name}
      </h3>

      {/* Tagline */}
      <p
        className="font-light mb-5"
        style={{
          color: 'rgba(255,255,255,0.55)',
          fontSize: compact ? '0.8rem' : '0.9rem',
        }}
      >
        {d.tagline}
      </p>

      {/* Date + spots */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Calendar className="w-3.5 h-3.5 text-brand-gold" />
          <span className="text-[11px] uppercase tracking-widest text-white/60">
            {d.date}
          </span>
        </div>
        <span
          className="text-[10px] uppercase tracking-widest px-3 py-1 rounded-full border"
          style={{
            color: '#D9AD62',
            borderColor: 'rgba(217,173,98,0.35)',
            background: 'rgba(217,173,98,0.08)',
          }}
        >
          {d.spots}
        </span>
      </div>

      {/* Hover CTA line */}
      <div className="flex items-center gap-2 mt-4 opacity-0 group-hover:opacity-100 translate-y-1 group-hover:translate-y-0 transition-all duration-300">
        <span className="text-[11px] uppercase tracking-widest text-brand-gold font-medium">
          Explore
        </span>
        <ArrowRight className="w-3.5 h-3.5 text-brand-gold" />
      </div>
    </div>
  );
}
