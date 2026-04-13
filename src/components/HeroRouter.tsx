import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import '../i18n/config';

export const HeroRouter = () => {
  const { t } = useTranslation();

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="relative w-full h-screen overflow-hidden bg-brand-dark font-inter">
      {/* Background Cinematic Video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover z-0"
      >
        <source src="/vid5.mp4" type="video/mp4" />
      </video>

      {/* Dark overlay for better text readability */}
      <div className="absolute inset-0 bg-black/70 z-0 pointer-events-none" />

      {/* Top-Left Logo (Visible on all devices) */}
      <div className="absolute top-6 left-6 md:top-10 md:left-12 z-50">
        <img 
          src="/logogold.webp" 
          alt="CourtSide Padel" 
          className="h-14 md:h-20 lg:h-24 w-auto object-contain drop-shadow-2xl"
        />
      </div>

      {/* Main Content Area */}
      <main className="relative z-10 w-full h-full flex flex-col items-center md:items-start justify-center px-6 md:px-16 lg:px-24 text-center md:text-left pt-24 md:pt-32 lg:pt-40">
        
        {/* Header Texts */}
        <div className="mb-8 md:mb-12 flex flex-col items-center md:items-start w-full max-w-6xl">
          <h2 className="text-xl md:text-3xl lg:text-4xl text-brand-light max-w-4xl leading-snug md:leading-relaxed font-light mt-4 text-balance">
            {t('gateway.hero.intro')}
          </h2>
          <p className="hidden md:block text-base md:text-xl text-brand-light/70 max-w-3xl mt-4 md:mt-6 font-light tracking-wide text-balance">
            {t('gateway.hero.subtitle')}
          </p>
        </div>

        {/* Intent Router */}
        <div className="mt-8 md:mt-12 w-full max-w-7xl flex flex-col items-center md:items-start">
          <h3 className="text-xs md:text-sm lg:text-base uppercase tracking-[0.25em] md:tracking-[0.3em] text-brand-gold font-semibold mb-8 md:mb-10 opacity-80 text-balance">
            {t('gateway.hero.intent')}
          </h3>
          
          <div className="flex flex-col lg:flex-row gap-4 md:gap-6 lg:gap-8 w-full justify-center items-stretch px-2 md:px-0">
            <IntentButton 
              onClick={() => scrollToSection('individual-section')}
              text={t('gateway.hero.individual')}
              subtext={t('gateway.hero.individualSub')}
            />
            <IntentButton 
              onClick={() => scrollToSection('group-section')}
              text={t('gateway.hero.group')}
              subtext={t('gateway.hero.groupSub')}
            />
            <IntentButton 
              onClick={() => scrollToSection('corporate-section')}
              text={t('gateway.hero.corporate')}
              subtext={t('gateway.hero.corporateSub')}
            />
          </div>
        </div>
      </main>
    </div>
  );
};

// Extracted Sub-component for the massive typographic buttons
const IntentButton = ({ onClick, text, subtext }: { onClick: () => void, text: string, subtext: string }) => {
  return (
    <motion.button
      onClick={onClick}
      className="group relative flex-1 flex flex-col justify-center items-center p-6 md:p-8 bg-white/5 border border-white/10 backdrop-blur-sm hover:border-brand-gold hover:bg-black/40 transition-all duration-500 rounded-lg text-center overflow-hidden"
      whileHover={{ y: -5 }}
      transition={{ ease: 'easeOut', duration: 0.3 }}
    >
      <span className="text-xl md:text-2xl lg:text-3xl font-light text-white/90 group-hover:text-white transition-colors duration-500 mb-3 text-balance w-full leading-tight">{text}</span>
      <span className="text-xs md:text-sm uppercase tracking-widest text-brand-gold/70 group-hover:text-brand-gold transition-colors text-balance w-full">{subtext}</span>
      <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-[3px] bg-brand-gold transition-all duration-700 ease-in-out group-hover:w-full rounded-full" />
    </motion.button>
  );
};
