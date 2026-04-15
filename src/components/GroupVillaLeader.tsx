import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Users } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import '../i18n/config';

export default function GroupVillaLeader() {
  const { t } = useTranslation();
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
    <section className="relative w-full min-h-[80vh] flex flex-col md:flex-row items-stretch border-t border-brand-gold/20 noise-section">
      {/* Visual / Image Side */}
      <div className="w-full md:w-1/2 relative min-h-[50vh]">
        <img 
          src="/villa3.jpg" 
          alt="Villa Privada Courtside" 
          className="absolute inset-0 w-full h-full object-cover filter grayscale opacity-60"
        />
        <div className="absolute inset-0 bg-brand-dark/40 mix-blend-multiply"></div>
        <div className="absolute bottom-12 left-12 md:left-24 z-10 max-w-sm">
          <div className="w-8 h-px bg-brand-gold mb-5" />
          <h3 className="text-4xl text-brand-light font-bold mb-4 tracking-tight" style={{ fontFamily: 'var(--font-display)' }}>{t('groupVilla.sideTitle')}</h3>
          <p className="text-brand-light/70 font-light">{t('groupVilla.sideDesc')}</p>
        </div>
      </div>

      {/* Form Side (Cardless, just layout) */}
      <div className="w-full md:w-1/2 bg-brand-dark flex items-center justify-center p-12 md:p-32">
        <div className="w-full max-w-md">
          {!isCheckout ? (
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }}>
              <Users className="w-12 h-12 text-brand-gold mb-12" />
              <h2 className="text-5xl font-bold mb-6 tracking-tight" style={{ fontFamily: 'var(--font-display)' }}>{t('groupVilla.formTitle')}</h2>
              <p className="text-brand-light/60 font-light text-lg mb-16">
                {t('groupVilla.formDesc')}
              </p>

              {/* Simplified Form */}
              <form onSubmit={handleSubmit} className="space-y-12">
                <div className="relative group">
                  <label htmlFor="companions" className="absolute -top-6 left-0 text-xs uppercase tracking-widest text-brand-light/40 font-semibold transition-colors group-focus-within:text-brand-gold">
                    {t('groupVilla.guestsLabel')}
                  </label>
                  <input 
                    type="number" 
                    id="companions"
                    value={companions}
                    onChange={(e) => setCompanions(e.target.value ? Number(e.target.value) : '')}
                    min="8" max="20"
                    placeholder="12"
                    className="w-full bg-transparent border-b border-white/20 pb-4 text-4xl font-light focus:outline-none focus:border-brand-gold transition-colors text-brand-light placeholder:text-brand-light/20"
                    required
                  />
                </div>

                <div className="pt-8">
                  <p className="text-sm text-brand-light/40 mb-8 uppercase tracking-widest flex items-center gap-4">
                    <span>{t('groupVilla.investment')}</span>
                    <span className="h-px bg-white/20 flex-1"></span>
                    <span className="text-brand-light/80 font-semibold">{t('groupVilla.priceHint')}</span>
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
              <h2 className="text-3xl font-bold mb-8 text-center tracking-tighter">{t('groupVilla.finaliseTitle')}</h2>
              <div className="bg-brand-dark-2 border border-white/5 p-16 flex flex-col items-center justify-center text-center space-y-4">
                 <p className="text-xs tracking-widest uppercase text-brand-gold">JotForm Checkout Embed</p>
                 <p className="text-brand-light/40 font-light">
                   {t('groupVilla.simulatingCheckout', { count: companions })}
                 </p>
              </div>
              <button onClick={() => setIsCheckout(false)} className="mt-12 mx-auto text-brand-light/50 hover:text-brand-light text-sm uppercase tracking-widest">
                {t('groupVilla.backToForm')}
              </button>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
}
