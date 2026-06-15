import { motion } from 'framer-motion';
import '../i18n/config';
import type { Locale } from '../i18n/locales';
import { usePageTranslation } from '../i18n/usePageTranslation';
import { serviceMedia } from '../constants/serviceMedia';

interface HeroRouterProps {
  locale?: Locale;
}

export const HeroRouter = ({ locale: localeProp }: HeroRouterProps) => {
  const { t } = usePageTranslation(localeProp);

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
              'linear-gradient(to bottom, rgba(1,25,44,0.68) 0%, rgba(1,25,44,0.38) 38%, rgba(1,25,44,0.85) 68%, rgba(1,25,44,0.97) 100%)',
          }}
        />

        {/* Extra scrim behind CTAs — video recedes, cards advance */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            zIndex: 2,
            background:
              'radial-gradient(ellipse 95% 60% at 50% 88%, rgba(1,25,44,0.72) 0%, transparent 72%)',
          }}
        />

        {/* Barely-there gold warmth tint */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            zIndex: 3,
            background: 'rgba(217, 173, 98, 0.05)',
            mixBlendMode: 'soft-light',
          }}
        />

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
          <div className="mt-8 md:mt-12 w-full flex flex-col items-center">

            {/* Editorial divider label */}
            <div className="flex items-center justify-center gap-3 mb-6 md:mb-8 w-full">
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

            <div className="flex flex-col lg:flex-row gap-3 md:gap-4 w-full max-w-4xl mx-auto justify-center items-stretch">
              <IntentButton
                onClick={() => scrollToSection('individual-section')}
                media={serviceMedia.individual}
                text={t('gateway.hero.individual')}
                subtext={t('gateway.hero.individualSub')}
                descriptor={t('gateway.hero.individualDescriptor')}
              />
              <IntentButton
                onClick={() => scrollToSection('group-section')}
                media={serviceMedia.group}
                text={t('gateway.hero.group')}
                subtext={t('gateway.hero.groupSub')}
                descriptor={t('gateway.hero.groupDescriptor')}
              />
              <IntentButton
                onClick={() => scrollToSection('corporate-section')}
                media={serviceMedia.corporate}
                text={t('gateway.hero.corporate')}
                subtext={t('gateway.hero.corporateSub')}
                descriptor={t('gateway.hero.corporateDescriptor')}
              />
            </div>
          </div>
        </main>
      </div>

      {/* Luxury Signals Strip — credentials bar below the hero */}
      <LuxuryStrip locale={localeProp} />
    </>
  );
};

const LuxuryStrip = ({ locale: localeProp }: { locale?: Locale }) => {
  const { t } = usePageTranslation(localeProp);

  return (
  <div className="luxury-strip">
    <div className="luxury-item">
      <span className="luxury-number">3</span>
      <span className="luxury-label">{t('gateway.luxuryStrip.destinations')}</span>
    </div>
    <span className="luxury-divider" aria-hidden>—</span>
    <div className="luxury-item">
      <span className="luxury-number">100%</span>
      <span className="luxury-label">{t('gateway.luxuryStrip.privateAccess')}</span>
    </div>
    <span className="luxury-divider" aria-hidden>—</span>
    <div className="luxury-item">
      <span className="luxury-number">5★</span>
      <span className="luxury-label">{t('gateway.luxuryStrip.curatedProperties')}</span>
    </div>
    <span className="luxury-divider" aria-hidden>—</span>
    <div className="luxury-item">
      <span className="luxury-number">24/7</span>
      <span className="luxury-label">{t('gateway.luxuryStrip.conciergeService')}</span>
    </div>
  </div>
  );
};

// ─── Experience selector card ──────────────────────────────────
const IntentButton = ({
  onClick,
  media,
  text,
  subtext,
  descriptor,
}: {
  onClick: () => void;
  media: (typeof serviceMedia)[keyof typeof serviceMedia];
  text: string;
  subtext: string;
  descriptor: string;
}) => {
  return (
    <motion.button
      onClick={onClick}
      className="intent-card group relative flex-1 flex flex-col overflow-hidden will-change-transform"
      whileHover={{ y: -4, scale: 1.02 }}
      transition={{ ease: 'easeOut', duration: 0.28 }}
    >
      <div className="intent-card-media" aria-hidden>
        {media.type === 'image' ? (
          <img src={media.src} alt="" loading="lazy" />
        ) : (
          <video autoPlay muted loop playsInline>
            <source src={media.src} type="video/mp4" />
          </video>
        )}
        <div className="intent-card-media-overlay" />
      </div>

      <div className="intent-card-body">
        <span className="card-title text-balance w-full">{text}</span>
        <span
          className="card-subtext uppercase text-balance w-full"
          style={{ fontSize: '0.625rem', letterSpacing: '0.16em' }}
        >
          {subtext}
        </span>
        <span className="card-descriptor w-full text-balance">{descriptor}</span>
      </div>

      <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-brand-gold transition-all duration-500 ease-out group-hover:w-full" />
    </motion.button>
  );
};
