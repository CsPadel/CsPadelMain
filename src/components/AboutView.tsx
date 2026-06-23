import React from 'react';
import { motion } from 'framer-motion';
import '../i18n/config';
import type { Locale } from '../i18n/locales';
import { usePageTranslation } from '../i18n/usePageTranslation';

interface AboutViewProps {
  locale?: Locale;
}

export default function AboutView({ locale: localeProp }: AboutViewProps) {
  const { t } = usePageTranslation(localeProp);
  const team = t('aboutPage.team', { returnObjects: true }) as Array<{ name: string; role: string; photo?: string }>;

  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="relative w-full min-h-[75vh] flex flex-col items-center justify-center pt-24 pb-20 px-8 md:px-16 text-center overflow-hidden bg-brand-dark">
        {/* Subtle radial glow */}
        <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse 70% 60% at 50% 60%, rgba(217,173,98,0.07) 0%, transparent 70%)' }} />

        <div className="relative z-10 max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.25 }}
            className="flex items-center justify-center gap-5 mb-10"
          >
            <span className="block h-px w-8 bg-brand-gold/55" />
            <span className="text-[10px] uppercase tracking-[0.42em] text-brand-gold font-semibold">CourtSide Padel</span>
            <span className="block h-px w-8 bg-brand-gold/55" />
          </motion.div>

          <div className="overflow-hidden mb-8">
            <motion.h1
              initial={{ y: '110%' }}
              animate={{ y: 0 }}
              transition={{ duration: 1.05, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="text-white font-light tracking-tight"
              style={{
                fontFamily: 'var(--font-display)',
                fontStyle: 'italic',
                fontSize: 'clamp(3rem, 9vw, 9rem)',
                lineHeight: 0.9,
              }}
            >
              {t('aboutPage.heroTitle')}
            </motion.h1>
          </div>

          <motion.div
            initial={{ scaleX: 0, opacity: 0 }}
            animate={{ scaleX: 1, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.88 }}
            className="w-10 h-px bg-brand-gold mb-8 mx-auto origin-center"
          />

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.05 }}
            className="text-white/52 text-base md:text-lg font-light max-w-2xl mx-auto leading-relaxed"
          >
            {t('aboutPage.heroSubtitle')}
          </motion.p>
        </div>
      </section>

      {/* Team Roster */}
      <section className="py-32 px-8 md:px-16 bg-white">
        <div className="max-w-7xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-light mb-20 text-center tracking-wide text-brand-dark"
            style={{ fontFamily: 'var(--font-display)', fontStyle: 'italic' }}
          >
            {t('aboutPage.teamTitle')}
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {team && Array.isArray(team) && team.map((member, idx) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                className="group relative overflow-hidden bg-brand-dark-2 border border-white/5 rounded-card aspect-[3/4] flex flex-col justify-end hover:border-brand-gold/30 transition-all duration-400 ease-out will-change-transform"
              >
                {/* Photo — swap src for the real image when available */}
                {member.photo ? (
                  <img
                    src={member.photo}
                    alt={member.name}
                    className="absolute inset-0 w-full h-full object-cover object-top z-0 transition-transform duration-700 group-hover:scale-105"
                  />
                ) : (
                  <div className="absolute inset-0 z-0 flex items-center justify-center" style={{ background: 'linear-gradient(160deg, #041E36 0%, #0a2840 60%, #072035 100%)' }}>
                    <span
                      className="select-none"
                      style={{ fontFamily: 'var(--font-display)', fontStyle: 'italic', fontSize: '5rem', fontWeight: 300, color: 'rgba(217,173,98,0.12)', letterSpacing: '0.04em' }}
                    >
                      {member.name.charAt(0)}
                    </span>
                  </div>
                )}

                {/* Gradient for text readability */}
                <div className="absolute inset-0 z-10" style={{ background: 'linear-gradient(to top, rgba(1,25,44,0.95) 0%, rgba(1,25,44,0.45) 45%, transparent 100%)' }} />

                <div className="relative z-20 p-7">
                  <div className="w-6 h-px bg-brand-gold mb-3 opacity-70" />
                  <h3 className="text-lg md:text-xl font-light tracking-wide text-white mb-1" style={{ fontFamily: 'var(--font-display)' }}>{member.name}</h3>
                  <p className="text-brand-gold tracking-widest text-[9px] md:text-[10px] uppercase font-medium">{member.role}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
