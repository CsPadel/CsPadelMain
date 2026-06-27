import { useTranslation } from 'react-i18next';
import '../i18n/config';
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

export default function BespokeRetreats() {
  const { t } = useTranslation();
  const features = t('bespokeRetreats.features', { returnObjects: true }) as string[];
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    // Real submission logic would go here
  };

  return (
    <>
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
            <p className="text-[9px] uppercase tracking-[0.38em] text-brand-gold font-semibold">Bespoke Private Retreats</p>
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
            {Array.isArray(features) && features.map((feature, idx) => (
              <div key={idx} className="border border-white/15 rounded-full px-5 py-2 bg-transparent hover:border-brand-gold/40 hover:bg-brand-gold/8 transition-colors duration-200">
                <p className="text-white/60 font-light text-sm tracking-wide">
                  {feature}
                </p>
              </div>
            ))}
          </div>

          <button
            onClick={() => setIsModalOpen(true)}
            className="btn-luxury"
            aria-label={t('bespokeRetreats.cta')}
          >
            {t('bespokeRetreats.cta')}
          </button>
        </div>
      </motion.section>

      <AnimatePresence>
        {isModalOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => { setIsModalOpen(false); setIsSubmitted(false); }}
              className="fixed inset-0 bg-brand-dark/80 backdrop-blur-sm z-[100]"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-lg bg-brand-dark-2 z-[110] p-8 md:p-12 border border-white/10 rounded-card shadow-2xl overflow-y-auto max-h-[90vh]"
            >
              <div className="flex justify-between items-center mb-8">
                <h3 className="text-2xl font-light text-brand-light tracking-wide">{t('bespokeRetreats.modalTitle')}</h3>
                <button 
                  onClick={() => { setIsModalOpen(false); setIsSubmitted(false); }} 
                  className="text-brand-light/50 hover:text-brand-light transition-colors"
                  aria-label="Close modal"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {!isSubmitted ? (
                <>
                  <p className="text-brand-light/60 font-light mb-8 text-sm leading-relaxed">
                    {t('bespokeRetreats.modalDesc')}
                  </p>
                  
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-2">
                      <label className="text-xs uppercase tracking-widest text-brand-light/40">{t('bespokeRetreats.nameLabel')}</label>
                      <input required type="text" className="w-full bg-transparent border-b border-white/20 pb-2 text-brand-light focus:outline-none focus:border-brand-gold transition-colors" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs uppercase tracking-widest text-brand-light/40">{t('bespokeRetreats.emailLabel')}</label>
                      <input required type="email" className="w-full bg-transparent border-b border-white/20 pb-2 text-brand-light focus:outline-none focus:border-brand-gold transition-colors" />
                    </div>
                    <div className="flex gap-4">
                      <div className="space-y-2 flex-1">
                        <label className="text-xs uppercase tracking-widest text-brand-light/40">{t('bespokeRetreats.guestsLabel')}</label>
                        <input type="number" min="6" className="w-full bg-transparent border-b border-white/20 pb-2 text-brand-light focus:outline-none focus:border-brand-gold transition-colors" placeholder="Min 6" />
                      </div>
                      <div className="space-y-2 flex-1">
                        <label className="text-xs uppercase tracking-widest text-brand-light/40">{t('bespokeRetreats.datesLabel')}</label>
                        <input type="text" className="w-full bg-transparent border-b border-white/20 pb-2 text-brand-light focus:outline-none focus:border-brand-gold transition-colors" placeholder="e.g. October" />
                      </div>
                    </div>
                    <button type="submit" className="btn-luxury w-full mt-6 justify-center">
                      {t('bespokeRetreats.submitBtn')}
                    </button>
                  </form>
                </>
              ) : (
                <div className="py-12 text-center">
                  <div className="w-16 h-16 rounded-full bg-brand-gold/10 flex items-center justify-center mx-auto mb-6">
                    <div className="w-2 h-2 rounded-full bg-brand-gold" />
                  </div>
                  <p className="text-brand-light text-lg font-light leading-relaxed">
                    {t('bespokeRetreats.successMsg')}
                  </p>
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
