import React from 'react';
import { motion } from 'framer-motion';
import '../i18n/config';
import type { Locale } from '../i18n/locales';
import { usePageTranslation } from '../i18n/usePageTranslation';

interface CookiePolicyViewProps {
  locale?: Locale;
}

export default function CookiePolicyView({ locale: localeProp }: CookiePolicyViewProps) {
  const { t } = usePageTranslation(localeProp);
  const sections = t('cookiePolicy.sections', { returnObjects: true }) as Array<{
    title: string;
    body: string;
  }>;

  return (
    <div className="w-full">
      <section className="relative w-full min-h-[50vh] flex items-center pt-24 px-8 md:px-16">
        <div className="max-w-4xl mx-auto">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-6xl font-light mb-6 text-brand-gold tracking-wide"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            {t('cookiePolicy.title')}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="text-brand-light/70 text-lg leading-relaxed"
          >
            {t('cookiePolicy.intro')}
          </motion.p>
        </div>
      </section>

      <section className="pb-32 px-8 md:px-16">
        <div className="max-w-4xl mx-auto space-y-12">
          {Array.isArray(sections) &&
            sections.map((section, idx) => (
              <motion.article
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.05 }}
              >
                <h2
                  className="text-2xl text-brand-gold mb-4 font-light"
                  style={{ fontFamily: 'var(--font-display)' }}
                >
                  {section.title}
                </h2>
                <p className="text-brand-light/70 leading-relaxed whitespace-pre-line">
                  {section.body}
                </p>
              </motion.article>
            ))}
        </div>
      </section>
    </div>
  );
}
