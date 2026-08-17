import { motion } from 'framer-motion';
import { ArrowRight, MapPin, Calendar } from 'lucide-react';
import '../i18n/config';
import type { Locale } from '../i18n/locales';
import { usePageTranslation } from '../i18n/usePageTranslation';
import { MENORCA_URL } from '../constants/urls';

interface Props {
  locale?: Locale;
}

export default function DestinationsPreview({ locale }: Props) {
  const { t } = usePageTranslation(locale);

  return (
    <section className="py-24 md:py-32 px-8 md:px-16 bg-white">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          className="mb-14"
        >
          <div className="flex items-center gap-4 mb-4">
            <span className="block h-px w-7 bg-brand-gold/40" aria-hidden="true" />
            <p className="text-[9px] uppercase tracking-[0.38em] text-brand-gold font-semibold">
              {t('homePage.destinations.eyebrow')}
            </p>
          </div>
          <h2
            className="text-4xl md:text-5xl font-light text-brand-dark"
            style={{ fontFamily: 'var(--font-display)', fontStyle: 'italic' }}
          >
            {t('homePage.destinations.title')}
          </h2>
        </motion.div>

        {/* Menorca — single spotlight card */}
        <motion.a
          href={MENORCA_URL}
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="group relative rounded-card overflow-hidden flex flex-col justify-end"
          style={{ minHeight: '560px' }}
        >
          <div className="absolute inset-0 skeleton-light" aria-hidden="true" />
          <img
            src="/imagenes/cap roig.jpg"
            alt="Menorca"
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
          <div className="relative z-10 p-8 md:p-12">
            <div className="flex items-center gap-1.5 mb-3">
              <MapPin className="w-3.5 h-3.5 text-brand-gold flex-shrink-0" />
              <span className="text-[10px] uppercase tracking-widest text-brand-gold font-medium">
                {t('homePage.destinations.location')}
              </span>
            </div>

            <h3
              className="text-brand-light font-light leading-none mb-3 text-5xl md:text-6xl"
              style={{ fontFamily: 'var(--font-display)', fontStyle: 'italic' }}
            >
              MENORCA
            </h3>

            <p
              className="font-light mb-6 text-base md:text-lg"
              style={{ color: 'rgba(255,255,255,0.55)' }}
            >
              {t('homePage.destinations.tagline')}
            </p>

            <div className="flex items-center justify-between flex-wrap gap-4">
              <div className="flex items-center gap-2">
                <Calendar className="w-3.5 h-3.5 text-brand-gold" />
                <span className="text-[11px] uppercase tracking-widest text-white/60">
                  {t('homePage.destinations.dates')}
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
                {t('homePage.destinations.spots')}
              </span>
            </div>

            <div className="flex items-center gap-2 mt-6 opacity-0 group-hover:opacity-100 translate-y-1 group-hover:translate-y-0 transition-all duration-300">
              <span className="text-[11px] uppercase tracking-widest text-brand-gold font-medium">
                {t('homePage.destinations.explore')}
              </span>
              <ArrowRight className="w-3.5 h-3.5 text-brand-gold" />
            </div>
          </div>
        </motion.a>

      </div>
    </section>
  );
}
