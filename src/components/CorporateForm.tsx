import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FileDown, Briefcase } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import '../i18n/config';

export default function CorporateForm() {
  const { t } = useTranslation();
  const [email, setEmail] = useState('');
  const [category, setCategory] = useState<'leadership' | 'teamBuilding' | 'cSuite'>('cSuite');
  const [isDownloading, setIsDownloading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setIsDownloading(true);
      // Simulate download process
      setTimeout(() => {
        setIsDownloading(false);
        alert(`${t('corporate.downloadComplete')}Dossier_${category}.pdf`);
      }, 1500);
    }
  };

  return (
    <section className="bg-brand-dark text-brand-light py-32 px-8 md:px-16 border-t border-brand-gold/20 noise-section">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-20 items-center">
        {/* Left: Copy */}
        <div className="md:w-1/2 space-y-8">
          <Briefcase className="w-10 h-10 text-brand-gold opacity-80" />
          <div className="w-10 h-px bg-brand-gold mb-2" />
          <h2
            className="text-5xl lg:text-7xl font-bold tracking-tight leading-tight"
            style={{ fontFamily: 'var(--font-display)' }}
            dangerouslySetInnerHTML={{ __html: t('corporate.title') }}
          />
          <p className="text-xl font-light text-brand-light/70 max-w-lg mb-12">
            {t('corporate.desc')}
          </p>
          <div className="pt-12 w-full hidden md:flex md:justify-center">
            <video 
              autoPlay 
              muted 
              loop 
              playsInline
              className="w-full max-w-lg aspect-video object-cover rounded-sm filter grayscale opacity-70 border border-white/10 shadow-2xl shadow-black/40 hover:grayscale-0 hover:opacity-100 hover:shadow-brand-gold/20 hover:border-brand-gold/40 transition-all duration-500 ease-out will-change-transform"
            >
              <source src="/networkv.mp4" type="video/mp4" />
            </video>
          </div>
        </div>

        {/* Right: B2B Automated Form */}
        <div className="md:w-1/2 w-full max-w-xl">
          <motion.div
            className="p-12 border-l border-brand-gold/30 relative"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            {/* Minimalist Accents instead of literal cards */}
            <div className="absolute top-0 left-0 w-8 h-px bg-brand-gold"></div>
            <div className="absolute bottom-0 left-0 w-8 h-px bg-brand-gold"></div>

            <p className="text-sm uppercase tracking-widest text-brand-gold mb-12 font-semibold">
              {t('corporate.downloadLabel')}
            </p>
            
            <form onSubmit={handleSubmit} className="space-y-10">
              <div className="space-y-4">
                <label className="text-xs uppercase tracking-widest text-brand-light/40 font-semibold block">
                  {t('corporate.emailLabel')}
                </label>
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={t('corporate.emailPlaceholder')}
                  className="w-full bg-transparent border-b border-white/20 pb-4 text-2xl font-light focus:outline-none focus:border-brand-gold transition-colors text-brand-light placeholder:text-brand-light/20"
                  required
                />
              </div>

              <div className="space-y-6">
                <label className="text-xs uppercase tracking-widest text-brand-light/40 font-semibold block">
                  {t('corporate.verticalLabel')}
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {(['leadership', 'teamBuilding', 'cSuite'] as const).map((opt) => (
                    <button
                      key={opt}
                      type="button"
                      onClick={() => setCategory(opt)}
                      className={`py-4 text-sm tracking-wide transition-all border ${
                        category === opt 
                          ? 'border-brand-gold bg-brand-gold/10 text-brand-gold font-semibold' 
                          : 'border-white/10 text-brand-light/60 hover:border-white/30 hover:text-brand-light'
                      }`}
                    >
                      {t(`corporate.verticalValues.${opt}`)}
                    </button>
                  ))}
                </div>
              </div>

              <button
                type="submit"
                disabled={isDownloading}
                className="btn-luxury w-full group disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isDownloading ? t('corporate.generatingPdf') : t('corporate.getDossierBtn')}
                {!isDownloading && <FileDown className="w-5 h-5 group-hover:translate-y-0.5 transition-transform duration-200" />}
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
