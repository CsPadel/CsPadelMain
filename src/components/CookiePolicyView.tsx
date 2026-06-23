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

      {/* ── Dark Hero ─────────────────────────────────────── */}
      <section className="relative w-full min-h-[52vh] flex flex-col items-center justify-center pt-28 pb-20 px-8 md:px-16 text-center overflow-hidden bg-brand-dark">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse 70% 60% at 50% 60%, rgba(217,173,98,0.06) 0%, transparent 70%)' }}
        />

        <div className="relative z-10 max-w-3xl mx-auto">
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

          <div className="overflow-hidden mb-6">
            <motion.h1
              initial={{ y: '110%' }}
              animate={{ y: 0 }}
              transition={{ duration: 1.05, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="text-white font-light tracking-tight"
              style={{
                fontFamily: 'var(--font-display)',
                fontStyle: 'italic',
                fontSize: 'clamp(2.6rem, 7vw, 6.5rem)',
                lineHeight: 0.92,
              }}
            >
              {t('cookiePolicy.title')}
            </motion.h1>
          </div>

          <motion.div
            initial={{ scaleX: 0, opacity: 0 }}
            animate={{ scaleX: 1, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.82 }}
            className="w-10 h-px bg-brand-gold mb-7 mx-auto origin-center"
          />

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.0 }}
            className="text-white/50 text-base md:text-lg font-light max-w-xl mx-auto leading-relaxed"
          >
            {t('cookiePolicy.intro')}
          </motion.p>
        </div>
      </section>

      {/* ── Policy Sections ───────────────────────────────── */}
      <section className="py-24 md:py-32 px-8 md:px-16 bg-white">
        <div className="max-w-3xl mx-auto space-y-14">
          {Array.isArray(sections) &&
            sections.map((section, idx) => (
              <motion.article
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.55, delay: idx * 0.05 }}
              >
                <div className="flex items-center gap-4 mb-5">
                  <span className="block h-px w-6 bg-brand-gold/40" />
                  <h2
                    className="text-xl md:text-2xl font-light text-brand-dark"
                    style={{ fontFamily: 'var(--font-display)', fontStyle: 'italic' }}
                  >
                    {section.title}
                  </h2>
                </div>
                <p className="text-brand-dark/55 leading-relaxed whitespace-pre-line font-light text-base md:text-lg">
                  {section.body}
                </p>
              </motion.article>
            ))}
        </div>
      </section>

    </div>
  );
}
