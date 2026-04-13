import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import '../i18n/config';
import { ArrowRight } from 'lucide-react';

export default function ServicesView() {
  const { t } = useTranslation();

  return (
    <div className="w-full">
      <section className="relative w-full min-h-[60vh] flex flex-col justify-center pt-24 px-8 md:px-16 overflow-hidden bg-brand-dark">
        <div className="relative z-20 max-w-5xl mx-auto text-center">
          <motion.h1 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="text-5xl md:text-7xl font-black mb-8 tracking-tighter text-brand-gold"
          >
            {t('servicesPage.heroTitle')}
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl md:text-2xl font-light leading-relaxed text-white/70 max-w-3xl mx-auto"
          >
            {t('servicesPage.heroSubtitle')}
          </motion.p>
        </div>
      </section>

      <section className="py-24 px-8 md:px-16 bg-brand-dark-2">
        <div className="max-w-7xl mx-auto flex flex-col gap-32">
          
          {/* Individual */}
          <div className="flex flex-col md:flex-row items-center gap-16 group">
            <div className="md:w-1/2 aspect-video bg-black/40 border border-white/5 relative overflow-hidden group-hover:border-brand-gold/30 transition-colors duration-700">
              <div className="absolute inset-0 bg-gradient-to-tr from-brand-dark to-transparent opacity-80" />
            </div>
            <div className="md:w-1/2">
              <span className="text-brand-gold font-mono tracking-widest text-sm uppercase mb-4 block">01 / Suite</span>
              <h2 className="text-4xl md:text-5xl font-light text-white mb-6 tracking-wide">{t('servicesPage.individual.title')}</h2>
              <p className="text-xl text-white/50 leading-relaxed mb-10">{t('servicesPage.individual.desc')}</p>
              <a href="/#individual-section" className="inline-flex items-center gap-3 text-brand-gold uppercase tracking-widest font-semibold hover:text-white transition-colors">
                {t('servicesPage.individual.action')} <ArrowRight size={20} />
              </a>
            </div>
          </div>

          {/* Group */}
          <div className="flex flex-col md:flex-row-reverse items-center gap-16 group">
            <div className="md:w-1/2 aspect-video bg-black/40 border border-white/5 relative overflow-hidden group-hover:border-brand-gold/30 transition-colors duration-700">
              <div className="absolute inset-0 bg-gradient-to-tr from-brand-dark to-transparent opacity-80" />
            </div>
            <div className="md:w-1/2 md:text-right">
              <span className="text-brand-gold font-mono tracking-widest text-sm uppercase mb-4 block">02 / Villa</span>
              <h2 className="text-4xl md:text-5xl font-light text-white mb-6 tracking-wide">{t('servicesPage.group.title')}</h2>
              <p className="text-xl text-white/50 leading-relaxed mb-10">{t('servicesPage.group.desc')}</p>
              <a href="/#group-section" className="inline-flex items-center gap-3 text-brand-gold uppercase tracking-widest font-semibold hover:text-white transition-colors">
                <ArrowRight size={20} className="md:rotate-180" /> {t('servicesPage.group.action')} 
              </a>
            </div>
          </div>

          {/* Corporate */}
          <div className="flex flex-col md:flex-row items-center gap-16 group">
            <div className="md:w-1/2 aspect-video bg-black/40 border border-white/5 relative overflow-hidden group-hover:border-brand-gold/30 transition-colors duration-700">
              <div className="absolute inset-0 bg-gradient-to-tr from-brand-dark to-transparent opacity-80" />
            </div>
            <div className="md:w-1/2">
              <span className="text-brand-gold font-mono tracking-widest text-sm uppercase mb-4 block">03 / Executive</span>
              <h2 className="text-4xl md:text-5xl font-light text-white mb-6 tracking-wide">{t('servicesPage.corporate.title')}</h2>
              <p className="text-xl text-white/50 leading-relaxed mb-10">{t('servicesPage.corporate.desc')}</p>
              <a href="/#corporate-section" className="inline-flex items-center gap-3 text-brand-gold uppercase tracking-widest font-semibold hover:text-white transition-colors">
                {t('servicesPage.corporate.action')} <ArrowRight size={20} />
              </a>
            </div>
          </div>

        </div>
      </section>
    </div>
  );
}
