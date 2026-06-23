import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Users } from 'lucide-react';
import '../i18n/config';
import type { Locale } from '../i18n/locales';
import { usePageTranslation } from '../i18n/usePageTranslation';
import { serviceMedia } from '../constants/serviceMedia';

interface GroupVillaLeaderProps {
  locale?: Locale;
}

export default function GroupVillaLeader({ locale: localeProp }: GroupVillaLeaderProps) {
  const { t } = usePageTranslation(localeProp);
  const [companions, setCompanions] = useState<number | ''>('');
  const [isCheckout, setIsCheckout] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (companions && Number(companions) >= 8 && Number(companions) <= 20) {
      setIsCheckout(true);
    } else {
      alert(t('groupVilla.alertMinGuests'));
    }
  };

  return (
    <motion.section
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.7 }}
      className="relative w-full min-h-[80vh] flex flex-col md:flex-row items-stretch border-t border-brand-dark/8"
    >
      {/* Visual / Image Side */}
      <motion.div
        initial={{ opacity: 0, x: -24 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
        className="w-full md:w-1/2 relative min-h-[50vh]"
      >
        <div className="absolute inset-0 skeleton-card" aria-hidden="true" />
        <img
          src={serviceMedia.group.src}
          alt="Villa Privada Courtside"
          loading="lazy"
          decoding="async"
          className="absolute inset-0 w-full h-full object-cover"
          onLoad={(e) => {
            const skel = e.currentTarget.previousElementSibling as HTMLElement;
            if (skel) skel.style.opacity = '0';
          }}
        />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(1,25,44,0.88) 0%, rgba(1,25,44,0.3) 60%, transparent 100%)' }} />
        <div className="absolute bottom-12 left-12 md:left-16 z-10 max-w-sm">
          <div className="w-8 h-px bg-brand-gold mb-5" />
          <h3 className="text-4xl text-brand-light font-light mb-3 tracking-tight" style={{ fontFamily: 'var(--font-display)', fontStyle: 'italic' }}>{t('groupVilla.sideTitle')}</h3>
          <p className="text-brand-light/60 font-light text-sm leading-relaxed">{t('groupVilla.sideDesc')}</p>
        </div>
      </motion.div>

      {/* Form Side (Cardless, just layout) */}
      <motion.div
        initial={{ opacity: 0, x: 24 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.85, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
        className="w-full md:w-1/2 bg-white text-brand-dark flex items-center justify-center p-12 md:p-20 lg:p-28"
      >
        <div className="w-full max-w-md">
          {!isCheckout ? (
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }}>
              <Users className="w-12 h-12 text-brand-gold mb-12" />
              <h2 className="text-4xl md:text-5xl font-light mb-4 tracking-tight text-brand-dark" style={{ fontFamily: 'var(--font-display)', fontStyle: 'italic' }}>{t('groupVilla.formTitle')}</h2>
              <p className="text-brand-dark/70 font-light text-lg mb-16">
                {t('groupVilla.formDesc')}
              </p>

              {/* Simplified Form */}
              <form onSubmit={handleSubmit} className="space-y-12">
                <div className="relative group">
                  <label htmlFor="companions" className="absolute -top-6 left-0 text-xs uppercase tracking-widest text-brand-dark/50 font-semibold transition-colors group-focus-within:text-brand-gold">
                    {t('groupVilla.guestsLabel')}
                  </label>
                  <input 
                    type="number" 
                    id="companions"
                    value={companions}
                    onChange={(e) => setCompanions(e.target.value ? Number(e.target.value) : '')}
                    min="8" max="20"
                    placeholder="12"
                    className="w-full bg-transparent border-b border-brand-dark/20 pb-4 text-4xl font-light focus:outline-none focus:border-brand-gold transition-colors text-brand-dark placeholder:text-brand-dark/25"
                    required
                  />
                </div>

                <div className="pt-8">
                  <p className="text-sm text-brand-dark/50 mb-8 uppercase tracking-widest flex items-center gap-4">
                    <span>{t('groupVilla.investment')}</span>
                    <span className="h-px bg-brand-dark/20 flex-1"></span>
                    <span className="text-brand-dark/80 font-semibold">{t('groupVilla.priceHint')}</span>
                  </p>

                  <button
                    type="submit"
                    className="btn-luxury w-full group"
                  >
                    {t('groupVilla.submitBtn')}
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
                  </button>
                </div>
              </form>
            </motion.div>
          ) : (
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="h-full flex flex-col justify-center">
              <h2 className="text-3xl font-bold mb-8 text-center tracking-tighter text-brand-dark">{t('groupVilla.finaliseTitle')}</h2>
              <div className="bg-white/50 border border-brand-dark/10 rounded-card p-16 flex flex-col items-center justify-center text-center space-y-4">
                 <p className="text-xs tracking-widest uppercase text-brand-gold">JotForm Checkout Embed</p>
                 <p className="text-brand-dark/50 font-light">
                   {t('groupVilla.simulatingCheckout', { count: companions })}
                 </p>
              </div>
              <button onClick={() => setIsCheckout(false)} className="mt-12 mx-auto text-brand-dark/50 hover:text-brand-dark text-sm uppercase tracking-widest">
                {t('groupVilla.backToForm')}
              </button>
            </motion.div>
          )}
        </div>
      </motion.div>
    </motion.section>
  );
}
