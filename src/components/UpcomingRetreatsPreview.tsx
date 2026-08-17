import { motion } from 'framer-motion';
import { ArrowRight, MapPin } from 'lucide-react';
import '../i18n/config';
import type { Locale } from '../i18n/locales';
import { useLocalizedHref } from '../i18n/useLocale';
import { usePageTranslation } from '../i18n/usePageTranslation';

interface Props {
  readonly locale?: Locale;
}

const retreats = [
  {
    id: 'bali',
    name: 'BALI',
    image: '/imagenes/cms/bali-estate-aerial.jpg' as string | null,
    href: '/bali',
  },
  {
    id: 'dubai',
    name: 'DUBAI',
    image: '/imagenes/cms/dubai-skyline.jpg' as string | null,
    href: '/dubai',
  },
];

export default function UpcomingRetreatsPreview({ locale }: Props) {
  const localizedHref = useLocalizedHref(locale);
  const { t } = usePageTranslation(locale);

  return (
    <section className="py-24 md:py-32 px-8 md:px-16 bg-brand-ivory">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          className="flex items-end justify-between mb-14 flex-wrap gap-6"
        >
          <div>
            <div className="flex items-center gap-4 mb-4">
              <span className="block h-px w-7 bg-brand-gold/40" aria-hidden="true" />
              <p className="text-[9px] uppercase tracking-[0.38em] text-brand-gold font-semibold">
                {t('homePage.upcoming.eyebrow')}
              </p>
            </div>
            <h2
              className="text-4xl md:text-5xl font-light text-brand-dark"
              style={{ fontFamily: 'var(--font-display)', fontStyle: 'italic' }}
            >
              {t('homePage.upcoming.title')}
            </h2>
            <p className="text-brand-dark/50 font-light text-base md:text-lg mt-4 max-w-xl">
              {t('homePage.upcoming.subtitle')}
            </p>
          </div>
          <a
            href={localizedHref('/upcoming-retreats')}
            className="hidden md:flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] text-brand-dark/40 hover:text-brand-gold transition-colors duration-300 pb-1 border-b border-transparent hover:border-brand-gold/40"
          >
            {t('homePage.upcoming.viewAll')} <ArrowRight className="w-3 h-3" />
          </a>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {retreats.map((r, i) => (
            <motion.a
              key={r.id}
              href={localizedHref(r.href)}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.8, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="group relative rounded-card overflow-hidden flex flex-col justify-end"
              style={{ minHeight: '420px' }}
            >
              {r.image ? (
                <img
                  src={r.image}
                  alt={r.name}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                  decoding="async"
                />
              ) : (
                <div
                  className="absolute inset-0 noise-section"
                  style={{ background: 'linear-gradient(135deg, #041E36 0%, #01192C 100%)' }}
                  aria-hidden="true"
                />
              )}
              <div
                className="absolute inset-0"
                style={{
                  background:
                    'linear-gradient(to bottom, rgba(1,25,44,0.08) 0%, rgba(1,25,44,0.3) 45%, rgba(1,25,44,0.93) 100%)',
                }}
              />
              <div className="relative z-10 p-7 md:p-8">
                <div className="flex items-center gap-1.5 mb-3">
                  <MapPin className="w-3 h-3 text-brand-gold flex-shrink-0" />
                  <span className="text-[10px] uppercase tracking-widest text-brand-gold font-medium">
                    {t(`homePage.upcoming.items.${r.id}.location`)}
                  </span>
                </div>

                <h3
                  className="text-brand-light font-light leading-none mb-2 text-3xl md:text-4xl"
                  style={{ fontFamily: 'var(--font-display)', fontStyle: 'italic' }}
                >
                  {r.name}
                </h3>

                <p className="font-light mb-5 text-sm" style={{ color: 'rgba(255,255,255,0.55)' }}>
                  {t(`homePage.upcoming.items.${r.id}.tagline`)}
                </p>

                <div className="flex items-center gap-2 mt-2 opacity-0 group-hover:opacity-100 translate-y-1 group-hover:translate-y-0 transition-all duration-300">
                  <span className="text-[11px] uppercase tracking-widest text-brand-gold font-medium">
                    {t('homePage.upcoming.explore')}
                  </span>
                  <ArrowRight className="w-3.5 h-3.5 text-brand-gold" />
                </div>
              </div>
            </motion.a>
          ))}
        </div>

      </div>
    </section>
  );
}
