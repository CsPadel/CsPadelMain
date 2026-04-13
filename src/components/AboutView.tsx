import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import '../i18n/config';

export default function AboutView() {
  const { t } = useTranslation();
  const team = t('aboutPage.team', { returnObjects: true }) as Array<{ name: string; role: string }>;

  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="relative w-full min-h-[70vh] flex items-center pt-24 px-8 md:px-16 overflow-hidden">
        <div className="absolute inset-0 bg-brand-dark-2 z-0">
          {/* Subtle gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-brand-dark via-brand-dark-2 to-brand-gold/10 opacity-50 z-10"></div>
        </div>
        
        <div className="relative z-20 max-w-5xl mx-auto">
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-5xl md:text-7xl lg:text-8xl font-black mb-8 tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-brand-gold via-white to-brand-light"
          >
            {t('aboutPage.heroTitle')}
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl md:text-3xl font-light leading-relaxed text-white/80 max-w-4xl"
          >
            {t('aboutPage.heroSubtitle')}
          </motion.p>
        </div>
      </section>

      {/* Team Roster */}
      <section className="py-32 px-8 md:px-16 bg-brand-dark">
        <div className="max-w-7xl mx-auto">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-light mb-20 text-center tracking-wide text-brand-gold"
          >
            {t('aboutPage.teamTitle')}
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team && Array.isArray(team) && team.map((member, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="group relative overflow-hidden bg-brand-dark-2 border border-white/5 aspect-[3/4] flex flex-col justify-end p-8 hover:border-brand-gold/30 transition-colors"
              >
                {/* Image Placeholder Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-brand-dark via-brand-dark/50 to-transparent z-10"></div>
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/10 transition-colors z-0"></div>
                
                <div className="relative z-20 transition-transform duration-500">
                  <h3 className="text-xl md:text-2xl font-semibold tracking-wide text-white mb-2">{member?.name}</h3>
                  <p className="text-brand-gold font-mono tracking-widest text-[10px] md:text-xs uppercase">{member?.role}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
