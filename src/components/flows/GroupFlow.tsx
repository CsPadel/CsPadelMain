import { motion } from 'framer-motion';
import { ArrowRight, Users } from 'lucide-react';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

export const GroupFlow = ({ onClose }: { onClose: () => void }) => {
  const { t } = useTranslation();
  const [companions, setCompanions] = useState<number>(8);
  const [submitted, setSubmitted] = useState(false);

  const fadeAnim = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.5 } },
    exit: { opacity: 0, y: -20, transition: { duration: 0.3 } }
  };

  if (submitted) {
    return (
      <motion.div {...fadeAnim} className="flex flex-col h-full text-brand-light items-center justify-center text-center">
        <div className="bg-white/5 border border-white/10 p-12 w-full max-w-md">
          <Users className="text-accent-olive mx-auto mb-6" size={48} strokeWidth={1} />
          <h3 className="text-2xl font-light mb-4">{t('gateway.group.securingFor', { count: companions })}</h3>
          <p className="text-white/50 text-sm mb-8 leading-relaxed">
            {t('gateway.group.redirectDesc')}
          </p>
          <div className="w-12 h-12 rounded-full border-t-2 border-accent-olive animate-spin mx-auto" />
        </div>
        <button onClick={() => setSubmitted(false)} className="mt-8 text-sm text-white/40 hover:text-white transition-colors">
          {t('gateway.group.back')}
        </button>
      </motion.div>
    );
  }

  return (
    <motion.div {...fadeAnim} className="flex flex-col h-full text-brand-light">
      <h2 className="text-3xl md:text-5xl font-light mb-4 text-balance">{t('gateway.group.title')}</h2>
      <p className="text-white/60 text-lg md:text-xl font-light mb-16 max-w-sm">
        {t('gateway.group.desc')}
      </p>

      <div className="flex-1 mt-8">
        <label className="block text-sm uppercase tracking-[0.2em] text-accent-olive font-semibold mb-6">
          {t('gateway.group.sizeLabel')}
        </label>
        
        <div className="flex flex-col gap-8">
          <div className="flex items-center justify-between text-4xl md:text-6xl font-light">
            <span className="text-white">{companions}</span>
            <span className="text-white/30 text-2xl">{t('gateway.group.guests')}</span>
          </div>
          
          <input 
            type="range" 
            min="8" 
            max="20" 
            value={companions} 
            onChange={(e) => setCompanions(Number(e.target.value))}
            className="w-full accent-accent-olive h-1 bg-white/20 rounded-none appearance-none cursor-pointer"
          />
          <div className="flex justify-between text-xs text-white/40 uppercase tracking-widest mt-2">
            <span>{t('gateway.group.min')} 8</span>
            <span>{t('gateway.group.max')} 20</span>
          </div>
        </div>
      </div>

      <div className="mt-auto pt-12">
         <button 
          onClick={() => setSubmitted(true)}
          className="w-full bg-white text-brand-dark hover:bg-accent-olive hover:text-white font-medium tracking-widest uppercase text-sm py-6 transition-all duration-300 flex items-center justify-center gap-3"
         >
          {t('gateway.group.bookBtn')} <ArrowRight size={18} />
        </button>
      </div>
    </motion.div>
  );
};
