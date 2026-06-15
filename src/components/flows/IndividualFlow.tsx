import { motion } from 'framer-motion';
import { ArrowRight, MessageCircle } from 'lucide-react';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

export const IndividualFlow = ({ onClose }: { onClose: () => void }) => {
  const { t } = useTranslation();
  const [step, setStep] = useState<'choice' | 'payment-sim' | 'concierge-sim'>('choice');

  const fadeAnim = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.5 } },
    exit: { opacity: 0, y: -20, transition: { duration: 0.3 } }
  };

  return (
    <motion.div {...fadeAnim} className="flex flex-col h-full text-brand-light">
      <h2 className="text-3xl md:text-5xl font-light mb-4">{t('gateway.individual.title')}</h2>
      <p className="text-white/60 text-lg md:text-xl font-light mb-12 max-w-sm">
        {t('gateway.individual.desc')}
      </p>

      {step === 'choice' && (
        <div className="flex flex-col gap-6 mt-8">
          <button 
            onClick={() => setStep('payment-sim')}
            className="group flex items-center justify-between bg-white/5 border border-white/10 rounded-button hover:border-accent-olive hover:bg-accent-olive/10 transition-all duration-300 p-6 md:p-8"
          >
            <span className="text-xl md:text-2xl font-light tracking-wide text-white/90">{t('gateway.individual.directPay')}</span>
            <ArrowRight className="text-accent-olive transform transition-transform group-hover:translate-x-2" size={28} />
          </button>

          <button 
            onClick={() => setStep('concierge-sim')}
            className="group flex items-center justify-between border border-transparent rounded-button hover:border-white/20 transition-all duration-300 p-6 md:p-8"
          >
            <span className="text-xl md:text-2xl font-light tracking-wide text-white/70 group-hover:text-white">{t('gateway.individual.talkConcierge')}</span>
            <MessageCircle className="text-white/50 transform transition-transform group-hover:scale-110" size={28} />
          </button>
        </div>
      )}

      {step === 'payment-sim' && (
        <motion.div {...fadeAnim} className="mt-8">
          <div className="bg-white/5 border border-white/10 rounded-card p-8 text-center flex flex-col items-center justify-center min-h-[300px]">
            <h3 className="text-xl font-semibold mb-2">{t('gateway.individual.simPayTitle')}</h3>
            <p className="text-white/50 text-sm mb-6 max-w-xs mx-auto">
              {t('gateway.individual.simPayDesc')}
            </p>
            <div className="w-16 h-16 rounded-full border-t-2 border-accent-olive animate-spin mb-4" />
            <span className="text-accent-olive uppercase tracking-widest text-xs font-semibold">{t('gateway.individual.loadingCheckout')}</span>
          </div>
          <button onClick={() => setStep('choice')} className="mt-6 text-sm text-white/40 hover:text-white transition-colors">
            {t('gateway.individual.backOpts')}
          </button>
        </motion.div>
      )}

      {step === 'concierge-sim' && (
        <motion.div {...fadeAnim} className="mt-8 flex flex-col gap-6">
          <input 
            type="text" 
            placeholder={t('gateway.individual.nameHolder')}
            className="bg-transparent border-b border-white/20 px-0 py-4 text-xl text-white placeholder-white/30 focus:outline-none focus:border-accent-olive transition-colors"
          />
          <input 
            type="tel" 
            placeholder={t('gateway.individual.phoneHolder')}
            className="bg-transparent border-b border-white/20 px-0 py-4 text-xl text-white placeholder-white/30 focus:outline-none focus:border-accent-olive transition-colors"
          />
          <button className="mt-8 bg-accent-olive hover:bg-accent-olive-dark text-white font-medium tracking-widest uppercase text-sm py-5 px-8 rounded-button transition-colors flex items-center justify-center gap-3">
            {t('gateway.individual.reqCall')} <ArrowRight size={18} />
          </button>
          
          <button onClick={() => setStep('choice')} className="mt-6 text-sm text-white/40 hover:text-white transition-colors text-center">
            {t('gateway.individual.backOpts')}
          </button>
        </motion.div>
      )}
    </motion.div>
  );
};
