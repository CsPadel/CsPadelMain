import { motion } from 'framer-motion';
import { ArrowDownToLine, CheckCircle2 } from 'lucide-react';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

export const CorporateFlow = ({ onClose }: { onClose: () => void }) => {
  const { t } = useTranslation();
  const [downloading, setDownloading] = useState(false);
  const [success, setSuccess] = useState(false);

  const fadeAnim = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.5 } },
    exit: { opacity: 0, y: -20, transition: { duration: 0.3 } }
  };

  const handleDownload = (e: React.FormEvent) => {
    e.preventDefault();
    setDownloading(true);
    setTimeout(() => {
      setDownloading(false);
      setSuccess(true);
    }, 2000);
  };

  if (success) {
    return (
      <motion.div {...fadeAnim} className="flex flex-col h-full text-brand-light items-center justify-center text-center">
        <CheckCircle2 className="text-accent-olive mb-6" size={64} strokeWidth={1} />
        <h3 className="text-3xl font-light mb-4">{t('gateway.corporate.dossierDownloaded')}</h3>
        <p className="text-white/60 text-lg mb-8 max-w-sm font-light">
          {t('gateway.corporate.downloadSuccessDesc')}
        </p>
        <button onClick={onClose} className="text-accent-olive uppercase tracking-widest text-sm hover:text-white transition-colors">
          {t('gateway.corporate.backHome')}
        </button>
      </motion.div>
    );
  }

  return (
    <motion.div {...fadeAnim} className="flex flex-col h-full text-brand-light">
      <h2 className="text-3xl md:text-5xl font-light mb-4 text-balance">{t('gateway.corporate.title')}</h2>
      <p className="text-white/60 text-lg md:text-xl font-light mb-12 max-w-sm">
        {t('gateway.corporate.desc')}
      </p>

      <form onSubmit={handleDownload} className="flex flex-col gap-8 mt-4 flex-1">
        
        <div className="flex flex-col gap-2">
          <label className="text-xs uppercase tracking-widest text-white/50 font-semibold">{t('gateway.corporate.emailLabel')}</label>
          <input 
            type="email" 
            required
            placeholder="ejecutivo@empresa.com" 
            className="bg-transparent border-b border-white/20 px-0 py-4 text-2xl text-white placeholder-white/20 focus:outline-none focus:border-accent-olive transition-colors"
          />
        </div>

        <div className="flex flex-col gap-2 relative">
          <label className="text-xs uppercase tracking-widest text-white/50 font-semibold mb-2">{t('gateway.corporate.objectiveLabel')}</label>
          <select 
            required
            className="appearance-none bg-transparent border border-white/20 p-5 pl-4 text-xl text-white focus:outline-none focus:border-accent-olive transition-colors cursor-pointer rounded-button"
            defaultValue=""
          >
            <option value="" disabled className="bg-brand-dark-2 text-white/50">{t('gateway.corporate.selectFocus')}</option>
            <option value="liderazgo" className="bg-brand-dark-2 text-white py-2">{t('gateway.corporate.optLeadership')}</option>
            <option value="teambuilding" className="bg-brand-dark-2 text-white py-2">{t('gateway.corporate.optTeamBuilding')}</option>
            <option value="altadireccion" className="bg-brand-dark-2 text-white py-2">{t('gateway.corporate.optCLevel')}</option>
          </select>
          {/* Custom Select Arrow */}
          <div className="absolute right-5 bottom-5 pointer-events-none text-white/50">
            ▼
          </div>
        </div>

        <div className="mt-8 pt-8">
         <button 
          type="submit"
          disabled={downloading}
          className="w-full bg-accent-olive hover:bg-accent-olive-dark text-white font-medium tracking-widest uppercase text-sm py-6 rounded-button transition-colors flex items-center justify-center gap-3 disabled:opacity-70"
         >
          {downloading ? (
            <>{t('gateway.corporate.processingFile')} <div className="w-4 h-4 rounded-full border-t border-white animate-spin" /></>
            ) : (
            <>{t('gateway.corporate.downloadDossier')} <ArrowDownToLine size={20} /></>
          )}
        </button>
      </div>

      </form>
    </motion.div>
  );
};
