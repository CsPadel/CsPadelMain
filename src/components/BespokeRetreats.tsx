import '../i18n/config';
import { motion } from 'framer-motion';
import type { Locale } from '../i18n/locales';
import { usePageTranslation } from '../i18n/usePageTranslation';
import EnquiryCta from './EnquiryForm';

interface BespokeRetreatsProps {
  locale?: Locale;
}

export default function BespokeRetreats({ locale }: BespokeRetreatsProps) {
  const { t } = usePageTranslation(locale);
  const features = t('bespokeRetreats.features', { returnObjects: true }) as string[];

  return (
    <motion.section
      id="bespoke"
      aria-label="Bespoke Private Retreats in Menorca"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.7, ease: 'easeOut' }}
      className="bg-brand-dark py-24 md:py-32 border-t border-white/7"
    >
      <div className="max-w-3xl mx-auto px-6 md:px-16 text-center">
        <div className="flex items-center justify-center gap-4 mb-5">
          <span className="block h-px w-7 bg-brand-gold/40" aria-hidden="true" />
          <p className="text-[9px] uppercase tracking-[0.38em] text-brand-gold font-semibold">
            {t('bespokeRetreats.eyebrow')}
          </p>
          <span className="block h-px w-7 bg-brand-gold/40" aria-hidden="true" />
        </div>

        <h2
          className="text-4xl md:text-5xl font-light text-white mb-7"
          style={{ fontFamily: 'var(--font-display)', fontStyle: 'italic' }}
        >
          {t('bespokeRetreats.title')}
        </h2>

        <p className="text-white/55 text-base md:text-lg leading-relaxed mb-12 max-w-2xl mx-auto font-light">
          {t('bespokeRetreats.description')}
        </p>

        <div className="flex flex-wrap justify-center gap-2.5 mb-14">
          {Array.isArray(features) && features.map((feature) => (
            <div
              key={feature}
              className="border border-white/15 rounded-full px-5 py-2 bg-transparent hover:border-brand-gold/40 hover:bg-brand-gold/8 transition-colors duration-200"
            >
              <p className="text-white/60 font-light text-sm tracking-wide">{feature}</p>
            </div>
          ))}
        </div>

        <EnquiryCta locale={locale} label={t('bespokeRetreats.cta')} destination="menorca" />
      </div>
    </motion.section>
  );
}
