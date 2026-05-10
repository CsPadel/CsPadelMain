import { useTranslation } from 'react-i18next';
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
      <section id="bespoke" aria-label="Bespoke Private Retreats in Menorca" className="bg-white py-24 md:py-32">
        <div className="max-w-4xl mx-auto px-6 md:px-16 text-center">
          <p className="text-xs uppercase tracking-[0.3em] text-brand-gold font-semibold mb-4">Bespoke Private Retreats</p>
          <h2 className="text-4xl md:text-5xl font-light text-brand-dark tracking-wide mb-8">
            {t('bespokeRetreats.title')}
          </h2>
          <p className="text-brand-dark/70 text-lg md:text-xl leading-relaxed mb-10 max-w-3xl mx-auto">
            {t('bespokeRetreats.description')}
          </p>
          
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {Array.isArray(features) && features.map((feature, idx) => (
              <div key={idx} className="border border-brand-dark/15 rounded-full px-6 py-2.5 bg-brand-dark/5">
                <p className="text-brand-dark/80 font-medium text-[15px]">
                  {feature}
                </p>
              </div>
            ))}
          </div>

          <div>
            <button
              onClick={() => setIsModalOpen(true)}
              className="inline-flex items-center gap-3 px-10 py-5 rounded-full bg-brand-dark text-brand-light font-bold uppercase tracking-widest text-sm hover:bg-brand-gold hover:text-brand-dark transition-colors duration-300"
              aria-label={t('bespokeRetreats.cta')}
            >
              {t('bespokeRetreats.cta')}
            </button>
          </div>
        </div>
      </section>

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
              className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-lg bg-brand-dark-2 z-[110] p-8 md:p-12 border border-white/10 shadow-2xl overflow-y-auto max-h-[90vh]"
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
                    <button type="submit" className="w-full py-4 mt-6 bg-brand-gold text-brand-dark font-bold uppercase tracking-widest text-sm hover:bg-brand-light transition-colors duration-300">
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
