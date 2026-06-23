import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import type { Locale } from '../i18n/locales';
import { usePageTranslation } from '../i18n/usePageTranslation';
import { useLocalizedHref } from '../i18n/useLocale';
import { serviceMedia } from '../constants/serviceMedia';
import '../i18n/config';

interface ServicesViewProps {
  locale?: Locale;
}

const services = [
  { key: 'individual' as const, num: '01', label: 'Suite', anchor: 'individual-section' },
  { key: 'group' as const,      num: '02', label: 'Villa', anchor: 'group-section' },
  { key: 'corporate' as const,  num: '03', label: 'Executive', anchor: 'corporate-section' },
];

export default function ServicesView({ locale: localeProp }: ServicesViewProps) {
  const { t } = usePageTranslation(localeProp);
  const localizedHref = useLocalizedHref(localeProp);

  return (
    <div className="w-full">

      {/* ── Page Hero ───────────────────────────────────────────── */}
      <section className="relative w-full min-h-[65vh] flex flex-col justify-center pt-28 pb-20 px-8 md:px-16 overflow-hidden bg-brand-dark">
        {/* Subtle gradient texture */}
        <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse 80% 70% at 50% 60%, rgba(217,173,98,0.06) 0%, transparent 70%)' }} />

        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex items-center justify-center gap-5 mb-10"
          >
            <span className="block h-px w-8 bg-brand-gold/55" />
            <span className="text-[10px] uppercase tracking-[0.42em] text-brand-gold font-semibold">
              CourtSide Padel
            </span>
            <span className="block h-px w-8 bg-brand-gold/55" />
          </motion.div>

          <div className="overflow-hidden mb-1">
            <motion.h1
              initial={{ y: '110%' }}
              animate={{ y: 0 }}
              transition={{ duration: 1.05, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="text-white font-light tracking-tight"
              style={{
                fontFamily: 'var(--font-display)',
                fontStyle: 'italic',
                fontSize: 'clamp(2.8rem, 7vw, 7rem)',
                lineHeight: 0.92,
              }}
            >
              {t('servicesPage.heroTitle')}
            </motion.h1>
          </div>

          <motion.div
            initial={{ scaleX: 0, opacity: 0 }}
            animate={{ scaleX: 1, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.85 }}
            className="w-10 h-px bg-brand-gold my-8 mx-auto origin-center"
          />

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.05 }}
            className="text-white/52 text-base md:text-lg font-light max-w-2xl mx-auto leading-relaxed"
          >
            {t('servicesPage.heroSubtitle')}
          </motion.p>
        </div>
      </section>

      {/* ── Service Sections ────────────────────────────────────── */}
      <div className="bg-white">
        {services.map((svc, i) => {
          const isReversed = i % 2 !== 0;
          const media = serviceMedia[svc.key];

          return (
            <motion.div
              key={svc.key}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.6 }}
              className={`border-t border-brand-dark/7 flex flex-col ${isReversed ? 'md:flex-row-reverse' : 'md:flex-row'} items-stretch min-h-[60vh]`}
            >
              {/* Media panel */}
              <motion.div
                initial={{ opacity: 0, x: isReversed ? 30 : -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.85, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
                className="w-full md:w-1/2 relative overflow-hidden min-h-[340px] md:min-h-[540px] group"
              >
                {media.type === 'image' ? (
                  <img
                    src={media.src}
                    alt={t(`servicesPage.${svc.key}.title`)}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                    loading="lazy"
                  />
                ) : (
                  <video
                    autoPlay muted loop playsInline
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                  >
                    <source src={media.src} type="video/mp4" />
                  </video>
                )}
                {/* Subtle overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-brand-dark/30 to-transparent pointer-events-none" />

                {/* Index badge */}
                <div className="absolute top-8 left-8">
                  <span
                    className="text-white/30 font-light"
                    style={{ fontFamily: 'var(--font-display)', fontSize: '0.8rem', letterSpacing: '0.12em' }}
                  >
                    {svc.num}
                  </span>
                </div>
              </motion.div>

              {/* Text panel */}
              <motion.div
                initial={{ opacity: 0, x: isReversed ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.85, delay: 0.18, ease: [0.22, 1, 0.36, 1] }}
                className="w-full md:w-1/2 flex items-center px-10 md:px-16 lg:px-20 py-16 md:py-24"
              >
                <div className="max-w-md">
                  <div className="flex items-center gap-3 mb-6">
                    <span className="text-[9px] uppercase tracking-[0.3em] text-brand-gold font-semibold">
                      {svc.num} · {svc.label}
                    </span>
                    <span className="block h-px flex-1 max-w-[40px] bg-brand-gold/35" />
                  </div>

                  <h2
                    className="text-4xl md:text-5xl font-light text-brand-dark mb-6 leading-tight"
                    style={{ fontFamily: 'var(--font-display)', fontStyle: 'italic' }}
                  >
                    {t(`servicesPage.${svc.key}.title`)}
                  </h2>

                  <p className="text-brand-dark/55 text-base md:text-lg leading-relaxed mb-10 font-light">
                    {t(`servicesPage.${svc.key}.desc`)}
                  </p>

                  <a
                    href={`${localizedHref('/')}#${svc.anchor}`}
                    className="inline-flex items-center gap-3 group/link"
                  >
                    <span className="text-[10px] uppercase tracking-[0.22em] font-semibold text-brand-dark/50 group-hover/link:text-brand-gold transition-colors duration-300">
                      {t(`servicesPage.${svc.key}.action`)}
                    </span>
                    <ArrowRight className="w-3.5 h-3.5 text-brand-dark/40 group-hover/link:text-brand-gold group-hover/link:translate-x-1 transition-all duration-300" />
                  </a>
                </div>
              </motion.div>
            </motion.div>
          );
        })}
      </div>

    </div>
  );
}
