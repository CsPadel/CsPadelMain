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
    <>
      <div className="relative w-full h-screen overflow-hidden bg-brand-dark">
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

        {/* Cinematic gradient overlay — preserves warm image tones */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            zIndex: 1,
            background:
              'linear-gradient(to bottom, rgba(1,25,44,0.55) 0%, rgba(1,25,44,0.25) 40%, rgba(1,25,44,0.65) 75%, rgba(1,25,44,0.85) 100%)',
          }}
        />

        {/* Barely-there gold warmth tint */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            zIndex: 2,
            background: 'rgba(217, 173, 98, 0.06)',
            mixBlendMode: 'soft-light',
          }}
        />

        {/* Top-Left Logo */}
        <div className="absolute top-6 left-6 md:top-10 md:left-12" style={{ zIndex: 50 }}>
          <img
            src="/logogold.webp"
            alt="CourtSide Padel"
            className="h-14 md:h-20 lg:h-24 w-auto object-contain"
            style={{
              filter:
                'drop-shadow(0 4px 24px rgba(1,25,44,0.8)) drop-shadow(0 0 14px rgba(217,173,98,0.18))',
            }}
          />
        </div>

        {/* Main Content */}
        <main
          className="relative w-full h-full flex flex-col items-center md:items-start justify-center px-6 md:px-16 lg:px-24 text-center md:text-left pt-24 md:pt-32 lg:pt-40"
          style={{ zIndex: 10 }}
        >
          {/* Headline block */}
          <div className="mb-8 md:mb-12 flex flex-col items-center md:items-start w-full max-w-6xl">
            <h2
              className="text-brand-light max-w-4xl leading-snug md:leading-relaxed font-light mt-4 text-balance"
              style={{
                fontFamily: 'var(--font-display)',
                fontStyle: 'italic',
                fontSize: 'clamp(2rem, 4.5vw, 4.5rem)',
                borderLeft: '3px solid #D9AD62',
                paddingLeft: '1.5rem',
                textShadow: '0 2px 20px rgba(1,25,44,0.6)',
              }}
            >
              {t('gateway.hero.intro')}
            </h2>
            <p
              className="hidden md:block text-base md:text-xl font-light tracking-wide text-balance mt-4 md:mt-6"
              style={{
                color: 'rgba(255,255,255,0.9)',
                maxWidth: '520px',
                paddingLeft: '1.5rem',
                textShadow: '0 2px 16px rgba(1,25,44,0.5)',
              }}
            >
              {t('gateway.hero.subtitle')}
            </p>
          </div>

          {/* Intent Router */}
          <div className="mt-8 md:mt-12 w-full max-w-7xl flex flex-col items-center md:items-start">

            {/* Editorial divider label */}
            <div className="flex items-center gap-3 mb-8 md:mb-10">
              <span
                style={{
                  display: 'inline-block',
                  width: '40px',
                  height: '1px',
                  background: '#D9AD62',
                  flexShrink: 0,
                  opacity: 0.8,
                }}
              />
              <h3
                className="text-xs md:text-sm uppercase font-semibold text-brand-gold whitespace-nowrap"
                style={{ letterSpacing: '0.2em', opacity: 0.9 }}
              >
                {t('gateway.hero.intent')}
              </h3>
              <span
                style={{
                  display: 'inline-block',
                  width: '40px',
                  height: '1px',
                  background: '#D9AD62',
                  flexShrink: 0,
                  opacity: 0.8,
                }}
              />
            </div>

            <div className="flex flex-col lg:flex-row gap-4 md:gap-6 lg:gap-8 w-full justify-center items-stretch px-2 md:px-0">
              <IntentButton
                onClick={() => scrollToSection('individual-section')}
                text={t('gateway.hero.individual')}
                subtext={t('gateway.hero.individualSub')}
                descriptor="A private court. Your rules."
              />
              <IntentButton
                onClick={() => scrollToSection('group-section')}
                text={t('gateway.hero.group')}
                subtext={t('gateway.hero.groupSub')}
                descriptor="Exclusive grounds for your circle."
              />
              <IntentButton
                onClick={() => scrollToSection('corporate-section')}
                text={t('gateway.hero.corporate')}
                subtext={t('gateway.hero.corporateSub')}
                descriptor="Strategy. On and off the court."
              />
            </div>
          </div>
        </main>
      </div>

      {/* Luxury Signals Strip — credentials bar below the hero */}
      <LuxuryStrip />
    </>
  );
};

// ─── Luxury Signals strip ──────────────────────────────────────
const LuxuryStrip = () => (
  <div className="luxury-strip">
    <div className="luxury-item">
      <span className="luxury-number">12</span>
      <span className="luxury-label">Exclusive Destinations</span>
    </div>
    <span className="luxury-divider" aria-hidden>—</span>
    <div className="luxury-item">
      <span className="luxury-number">100%</span>
      <span className="luxury-label">Private Access</span>
    </div>
    <span className="luxury-divider" aria-hidden>—</span>
    <div className="luxury-item">
      <span className="luxury-number">5★</span>
      <span className="luxury-label">Curated Properties</span>
    </div>
    <span className="luxury-divider" aria-hidden>—</span>
    <div className="luxury-item">
      <span className="luxury-number">24/7</span>
      <span className="luxury-label">Concierge Service</span>
    </div>
  </div>
);

// ─── Experience selector card ──────────────────────────────────
const IntentButton = ({
  onClick,
  text,
  subtext,
  descriptor,
}: {
  onClick: () => void;
  text: string;
  subtext: string;
  descriptor: string;
}) => {
  return (
    <motion.button
      onClick={onClick}
      className="intent-card group relative flex-1 flex flex-col justify-center items-center p-6 md:p-8 text-center overflow-hidden will-change-transform"
      whileHover={{ y: -3 }}
      transition={{ ease: 'easeOut', duration: 0.25 }}
    >
      {/* Card title */}
      <span
        className="font-light text-brand-dark group-hover:text-brand-dark transition-colors duration-300 mb-2 text-balance w-full leading-tight"
        style={{
          fontFamily: 'var(--font-display)',
          fontSize: '1.4rem',
          letterSpacing: '0.05em',
        }}
      >
        {text}
      </span>

      {/* Subtext — uppercase gold label */}
      <span
        className="card-subtext uppercase text-balance w-full"
        style={{ fontSize: '0.7rem', letterSpacing: '0.18em' }}
      >
        {subtext}
      </span>

      {/* Descriptor — italic whisper copy */}
      <span className="card-descriptor w-full text-balance">
        {descriptor}
      </span>

      {/* Bottom gold sweep */}
      <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-brand-gold transition-all duration-500 ease-out group-hover:w-full" />
    </motion.button>
  );
};
