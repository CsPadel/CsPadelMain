import React from 'react';
import { motion } from 'framer-motion';
import '../i18n/config';
import { ArrowRight } from 'lucide-react';

import type { Locale } from '../i18n/locales';
import { usePageTranslation } from '../i18n/usePageTranslation';
import { useLocalizedHref } from '../i18n/useLocale';
import { serviceMedia } from '../constants/serviceMedia';

interface ServicesViewProps {
  locale?: Locale;
}

function ServiceMediaPanel({
  media,
  alt,
  variant,
}: {
  media: (typeof serviceMedia)[keyof typeof serviceMedia];
  alt: string;
  variant: 'individual' | 'group' | 'corporate';
}) {
  const baseClass =
    'absolute inset-0 w-full h-full object-cover transition-all duration-500 ease-out';

  return (
    <div className="md:w-1/2 aspect-video border border-white/5 rounded-card relative overflow-hidden group-hover:border-brand-gold/30 transition-colors duration-700">
      {media.type === 'image' ? (
        <img
          src={media.src}
          alt={alt}
          className={`${baseClass} filter grayscale opacity-60 group-hover:opacity-80 group-hover:grayscale-[0.35]`}
          loading="lazy"
        />
      ) : (
        <video
          autoPlay
          muted
          loop
          playsInline
          className={`${baseClass} ${
            variant === 'corporate'
              ? 'filter grayscale opacity-70 group-hover:grayscale-0 group-hover:opacity-100'
              : 'scale-105'
          }`}
        >
          <source src={media.src} type="video/mp4" />
        </video>
      )}
      <div
        className={`absolute inset-0 pointer-events-none ${
          variant === 'group'
            ? 'bg-brand-dark/40 mix-blend-multiply'
            : 'bg-gradient-to-tr from-brand-dark/70 via-brand-dark/25 to-transparent'
        }`}
      />
    </div>
  );
}

export default function ServicesView({ locale: localeProp }: ServicesViewProps) {
  const { t } = usePageTranslation(localeProp);
  const localizedHref = useLocalizedHref(localeProp);

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
            <ServiceMediaPanel
              media={serviceMedia.individual}
              alt={t('servicesPage.individual.title')}
              variant="individual"
            />
            <div className="md:w-1/2">
              <span className="text-brand-gold font-mono tracking-widest text-sm uppercase mb-4 block">01 / Suite</span>
              <h2 className="text-4xl md:text-5xl font-light text-white mb-6 tracking-wide">{t('servicesPage.individual.title')}</h2>
              <p className="text-xl text-white/50 leading-relaxed mb-10">{t('servicesPage.individual.desc')}</p>
              <a href={`${localizedHref('/')}#individual-section`} className="inline-flex items-center gap-3 text-brand-gold uppercase tracking-widest font-semibold hover:text-white transition-colors">
                {t('servicesPage.individual.action')} <ArrowRight size={20} />
              </a>
            </div>
          </div>

          {/* Group */}
          <div className="flex flex-col md:flex-row-reverse items-center gap-16 group">
            <ServiceMediaPanel
              media={serviceMedia.group}
              alt={t('servicesPage.group.title')}
              variant="group"
            />
            <div className="md:w-1/2 md:text-right">
              <span className="text-brand-gold font-mono tracking-widest text-sm uppercase mb-4 block">02 / Villa</span>
              <h2 className="text-4xl md:text-5xl font-light text-white mb-6 tracking-wide">{t('servicesPage.group.title')}</h2>
              <p className="text-xl text-white/50 leading-relaxed mb-10">{t('servicesPage.group.desc')}</p>
              <a href={`${localizedHref('/')}#group-section`} className="inline-flex items-center gap-3 text-brand-gold uppercase tracking-widest font-semibold hover:text-white transition-colors">
                <ArrowRight size={20} className="md:rotate-180" /> {t('servicesPage.group.action')} 
              </a>
            </div>
          </div>

          {/* Corporate */}
          <div className="flex flex-col md:flex-row items-center gap-16 group">
            <ServiceMediaPanel
              media={serviceMedia.corporate}
              alt={t('servicesPage.corporate.title')}
              variant="corporate"
            />
            <div className="md:w-1/2">
              <span className="text-brand-gold font-mono tracking-widest text-sm uppercase mb-4 block">03 / Executive</span>
              <h2 className="text-4xl md:text-5xl font-light text-white mb-6 tracking-wide">{t('servicesPage.corporate.title')}</h2>
              <p className="text-xl text-white/50 leading-relaxed mb-10">{t('servicesPage.corporate.desc')}</p>
              <a href={`${localizedHref('/')}#corporate-section`} className="inline-flex items-center gap-3 text-brand-gold uppercase tracking-widest font-semibold hover:text-white transition-colors">
                {t('servicesPage.corporate.action')} <ArrowRight size={20} />
              </a>
            </div>
          </div>

        </div>
      </section>
    </div>
  );
}
