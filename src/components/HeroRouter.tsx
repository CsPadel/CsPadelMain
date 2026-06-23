import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import '../i18n/config';
import type { Locale } from '../i18n/locales';
import { usePageTranslation } from '../i18n/usePageTranslation';
import { serviceMedia } from '../constants/serviceMedia';

interface HeroRouterProps {
  locale?: Locale;
}

export const HeroRouter = ({ locale: localeProp }: HeroRouterProps) => {
  const { t } = usePageTranslation(localeProp);
  const heroRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });
  const videoScale = useTransform(scrollYProgress, [0, 1], [1.0, 1.15]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.55], [1, 0]);
  const contentY = useTransform(scrollYProgress, [0, 0.55], ['0%', '-10%']);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      {/* ── Cinematic Hero ──────────────────────────────────────── */}
      <div ref={heroRef} className="relative w-full h-screen overflow-hidden bg-brand-dark">

        {/* Parallax zoom on video */}
        <motion.div
          style={{ scale: videoScale }}
          className="absolute inset-0 origin-center will-change-transform"
        >
          <video
            autoPlay loop muted playsInline
            className="absolute inset-0 w-full h-full object-cover"
          >
            <source src="/vid5.mp4" type="video/mp4" />
          </video>
        </motion.div>

        {/* Cinematic multi-layer overlay */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'linear-gradient(to bottom, rgba(1,25,44,0.58) 0%, rgba(1,25,44,0.18) 32%, rgba(1,25,44,0.72) 68%, rgba(1,25,44,0.98) 100%)',
          }}
        />
        {/* Edge vignette */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'radial-gradient(ellipse 85% 85% at 50% 50%, transparent 48%, rgba(1,25,44,0.42) 100%)',
          }}
        />

        {/* Centered editorial content — parallax fade on scroll */}
        <motion.div
          style={{ opacity: contentOpacity, y: contentY }}
          className="absolute inset-0 flex flex-col items-center justify-center text-center z-10 px-6"
        >
          {/* Eyebrow — gold line + label + gold line */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85, delay: 0.3 }}
            className="flex items-center gap-5 mb-10 md:mb-12"
          >
            <span className="block h-px w-8 bg-brand-gold/55" aria-hidden="true" />
            <span className="text-[10px] uppercase tracking-[0.42em] text-brand-gold font-semibold">
              CourtSide Padel · Est. 2026
            </span>
            <span className="block h-px w-8 bg-brand-gold/55" aria-hidden="true" />
          </motion.div>

          {/* Headline — two-line stagger slide-up reveal from overflow-hidden */}
          <div role="heading" aria-level={1}>
            <div className="overflow-hidden mb-1 md:mb-2">
              <motion.div
                initial={{ y: '110%' }}
                animate={{ y: 0 }}
                transition={{ duration: 1.08, delay: 0.44, ease: [0.22, 1, 0.36, 1] }}
                className="text-white font-light tracking-tight"
                style={{
                  fontFamily: 'var(--font-display)',
                  fontStyle: 'italic',
                  fontSize: 'clamp(3rem, 8vw, 8.5rem)',
                  lineHeight: 0.9,
                }}
              >
                World-Class
              </motion.div>
            </div>
            <div className="overflow-hidden mb-9 md:mb-11">
              <motion.div
                initial={{ y: '110%' }}
                animate={{ y: 0 }}
                transition={{ duration: 1.08, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className="text-white font-light tracking-tight"
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'clamp(3rem, 8vw, 8.5rem)',
                  lineHeight: 0.9,
                }}
              >
                Padel Retreats.
              </motion.div>
            </div>
          </div>

          {/* Gold line divider */}
          <motion.div
            initial={{ scaleX: 0, opacity: 0 }}
            animate={{ scaleX: 1, opacity: 1 }}
            transition={{ duration: 0.65, delay: 0.94, ease: 'easeOut' }}
            className="w-10 h-px bg-brand-gold mb-8 origin-center"
          />

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.18 }}
            className="text-white/50 text-sm md:text-base font-light max-w-[280px] md:max-w-[340px] leading-relaxed tracking-[0.04em]"
          >
            {t('gateway.hero.subtitle')}
          </motion.p>

          {/* Discover CTA */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.4 }}
            className="mt-10"
          >
            <button
              onClick={() => scrollToSection('design-your-stay')}
              className="btn-luxury"
            >
              Discover Experiences
            </button>
          </motion.div>
        </motion.div>

        {/* Animated scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.4, duration: 1.2 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 pointer-events-none"
        >
          <span className="text-[8px] uppercase tracking-[0.38em] text-white/22 font-medium">
            Scroll
          </span>
          <motion.div
            animate={{ y: [0, 7, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
            className="w-px h-10 bg-gradient-to-b from-white/25 to-transparent"
          />
        </motion.div>
      </div>

      {/* ── Design Your Stay — Large Editorial Cards ─────────────── */}
      <section
        id="design-your-stay"
        className="bg-white py-24 md:py-32 px-6 md:px-12 lg:px-16"
      >
        <div className="max-w-7xl mx-auto">

          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
            className="text-center mb-16 md:mb-20"
          >
            <div className="flex items-center justify-center gap-4 mb-5">
              <span className="block h-px w-7 bg-brand-gold/40" aria-hidden="true" />
              <p className="text-[9px] uppercase tracking-[0.38em] text-brand-gold font-semibold">
                {t('gateway.hero.intent')}
              </p>
              <span className="block h-px w-7 bg-brand-gold/40" aria-hidden="true" />
            </div>
            <h2
              className="text-4xl md:text-5xl font-light text-brand-dark"
              style={{ fontFamily: 'var(--font-display)', fontStyle: 'italic' }}
            >
              Design Your Stay
            </h2>
          </motion.div>

          {/* 3 large portrait editorial cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6">
            <IntentCard
              index={0}
              onClick={() => scrollToSection('individual-section')}
              media={serviceMedia.individual}
              label={t('gateway.hero.individual')}
              eyebrow={t('gateway.hero.individualSub')}
              descriptor={t('gateway.hero.individualDescriptor')}
            />
            <IntentCard
              index={1}
              onClick={() => scrollToSection('group-section')}
              media={serviceMedia.group}
              label={t('gateway.hero.group')}
              eyebrow={t('gateway.hero.groupSub')}
              descriptor={t('gateway.hero.groupDescriptor')}
            />
            <IntentCard
              index={2}
              onClick={() => scrollToSection('corporate-section')}
              media={serviceMedia.corporate}
              label={t('gateway.hero.corporate')}
              eyebrow={t('gateway.hero.corporateSub')}
              descriptor={t('gateway.hero.corporateDescriptor')}
            />
          </div>
        </div>
      </section>

      {/* ── Luxury Signals Strip ────────────────────────────────── */}
      <LuxuryStrip locale={localeProp} />
    </>
  );
};

/* ─── Large editorial portrait intent card ─────────────────── */
const IntentCard = ({
  index,
  onClick,
  media,
  label,
  eyebrow,
  descriptor,
}: {
  index: number;
  onClick: () => void;
  media: (typeof serviceMedia)[keyof typeof serviceMedia];
  label: string;
  eyebrow: string;
  descriptor: string;
}) => (
  <motion.button
    onClick={onClick}
    initial={{ opacity: 0, y: 40 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: '-60px' }}
    transition={{ duration: 0.75, delay: index * 0.13, ease: [0.22, 1, 0.36, 1] }}
    className="group relative overflow-hidden rounded-card text-left cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold hover:-translate-y-2 transition-transform duration-300 ease-out will-change-transform"
    style={{ minHeight: '560px', display: 'flex', flexDirection: 'column' }}
  >
    {/* Full-bleed media background */}
    <div className="absolute inset-0">
      {media.type === 'image' ? (
        <img
          src={media.src}
          alt=""
          aria-hidden="true"
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.06]"
        />
      ) : (
        <video
          autoPlay muted loop playsInline
          aria-hidden="true"
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.06]"
        >
          <source src={media.src} type="video/mp4" />
        </video>
      )}
    </div>

    {/* Deep gradient overlay — reveals on hover */}
    <div
      className="absolute inset-0 transition-opacity duration-500 group-hover:opacity-95"
      style={{
        background:
          'linear-gradient(to top, rgba(1,25,44,0.95) 0%, rgba(1,25,44,0.38) 50%, rgba(1,25,44,0.06) 100%)',
      }}
    />

    {/* Gold top line — slides in on hover */}
    <div className="absolute top-0 left-0 right-0 h-[2px] bg-brand-gold origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ease-out" />

    {/* Card index — top right */}
    <span
      className="absolute top-6 right-7 text-white/20 font-light select-none transition-opacity duration-300 group-hover:text-white/35"
      style={{ fontFamily: 'var(--font-display)', fontSize: '0.85rem' }}
    >
      0{index + 1}
    </span>

    {/* Bottom editorial content */}
    <div className="relative mt-auto p-7 md:p-8 z-10">
      <p className="text-[9px] uppercase tracking-[0.28em] text-brand-gold font-semibold mb-3.5">
        {eyebrow}
      </p>
      <h3
        className="text-white font-light leading-tight mb-3"
        style={{
          fontFamily: 'var(--font-display)',
          fontStyle: 'italic',
          fontSize: 'clamp(1.65rem, 2.5vw, 2.25rem)',
        }}
      >
        {label}
      </h3>
      <p className="text-sm font-light leading-relaxed mb-5 max-w-[260px]" style={{ color: 'rgba(255,255,255,0.42)' }}>
        {descriptor}
      </p>

      {/* Explore CTA row */}
      <div className="flex items-center gap-2.5">
        <span className="text-[9px] uppercase tracking-[0.22em] font-semibold text-white/40 group-hover:text-brand-gold transition-colors duration-300">
          Explore
        </span>
        <ArrowRight
          className="w-3.5 h-3.5 text-white/40 group-hover:text-brand-gold group-hover:translate-x-1 transition-all duration-300"
        />
      </div>
    </div>
  </motion.button>
);

/* ─── Luxury credentials strip ─────────────────────────────── */
const LuxuryStrip = ({ locale: localeProp }: { locale?: Locale }) => {
  const { t } = usePageTranslation(localeProp);

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.65, ease: 'easeOut' }}
      className="luxury-strip"
    >
      <div className="luxury-item">
        <span className="luxury-number">3</span>
        <span className="luxury-label">{t('gateway.luxuryStrip.destinations')}</span>
      </div>
      <span className="luxury-divider" aria-hidden="true">—</span>
      <div className="luxury-item">
        <span className="luxury-number">100%</span>
        <span className="luxury-label">{t('gateway.luxuryStrip.privateAccess')}</span>
      </div>
      <span className="luxury-divider" aria-hidden="true">—</span>
      <div className="luxury-item">
        <span className="luxury-number">5★</span>
        <span className="luxury-label">{t('gateway.luxuryStrip.curatedProperties')}</span>
      </div>
      <span className="luxury-divider" aria-hidden="true">—</span>
      <div className="luxury-item">
        <span className="luxury-number">24/7</span>
        <span className="luxury-label">{t('gateway.luxuryStrip.conciergeService')}</span>
      </div>
    </motion.div>
  );
};
