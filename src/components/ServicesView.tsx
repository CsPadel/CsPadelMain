import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import type { Locale } from '../i18n/locales';
import { usePageTranslation } from '../i18n/usePageTranslation';
import { useLocalizedHref } from '../i18n/useLocale';
import { serviceMedia } from '../constants/serviceMedia';
import '../i18n/config';
import { useEffect, useRef, useState } from 'react';

interface ServicesViewProps {
  readonly locale?: Locale;
}

const serviceFeatures: Record<string, string[]> = {
  individual: [
    'Daily expert coaching sessions',
    'Private court allocation',
    'Bespoke nutrition programme',
    'Recovery & wellness suite',
    'Personal concierge service',
  ],
  group: [
    'Full villa buy-out (8–20 guests)',
    'Dedicated retreat director',
    'Private padel tournament',
    'Curated dinners & excursions',
    'Airport transfers & logistics',
  ],
  corporate: [
    'C-suite only access',
    'Facilitated strategy sessions',
    'NDA-protected environment',
    'Premium AV & workspace setup',
    'Full media blackout available',
  ],
};

const serviceCtas: Record<string, string> = {
  individual: '/menorca',
  group:      '/menorca',
  corporate:  '/executive-retreat',
};

const services = [
  {
    key:          'individual' as const,
    num:          '01',
    label:        'Suite',
    bg:           'bg-white',
    textColor:    'text-brand-dark',
    subColor:     'text-brand-dark/55',
    featureColor: 'text-brand-dark/48',
  },
  {
    key:          'group' as const,
    num:          '02',
    label:        'Villa',
    bg:           'bg-brand-ivory',
    textColor:    'text-brand-dark',
    subColor:     'text-brand-dark/55',
    featureColor: 'text-brand-dark/48',
  },
  {
    key:          'corporate' as const,
    num:          '03',
    label:        'Executive',
    bg:           'bg-brand-dark',
    textColor:    'text-white',
    subColor:     'text-white/55',
    featureColor: 'text-white/45',
  },
];

export default function ServicesView({ locale: localeProp }: ServicesViewProps) {
  const { t }         = usePageTranslation(localeProp);
  const localizedHref = useLocalizedHref(localeProp);

  const wrapperRef   = useRef<HTMLDivElement>(null);
  const trackRef     = useRef<HTMLDivElement>(null);

  const [activeIndex, setActiveIndex] = useState(0);
  const [navVisible,  setNavVisible]  = useState(false);
  const [progress,    setProgress]    = useState(0);

  useEffect(() => {
    const wrapper = wrapperRef.current;
    const track   = trackRef.current;
    if (!wrapper || !track) return;

    const update = () => {
      const rect         = wrapper.getBoundingClientRect();
      const wrapperH     = wrapper.offsetHeight;
      const vh           = window.innerHeight;
      const denominator  = wrapperH - vh;

      // Active = the sticky panel is pinned (between entering and exiting)
      const isActive = rect.top <= 0 && rect.bottom >= vh;
      setNavVisible(isActive);

      if (!isActive) return;

      const p   = Math.max(0, Math.min(1, -rect.top / denominator));
      const tx  = p * (services.length - 1) * window.innerWidth;

      track.style.transform = `translateX(-${tx}px)`;
      setProgress(p);
      setActiveIndex(Math.round(p * (services.length - 1)));
    };

    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update, { passive: true });
    update();
    return () => {
      window.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
    };
  }, []);

  const scrollToPanel = (index: number) => {
    const wrapper = wrapperRef.current;
    if (!wrapper) return;
    const vh          = window.innerHeight;
    const denominator = wrapper.offsetHeight - vh;
    const target      = (index / (services.length - 1)) * denominator;
    const wrapperTop  = wrapper.getBoundingClientRect().top + window.scrollY;
    window.scrollTo({ top: wrapperTop + target, behavior: 'smooth' });
  };

  return (
    <div className="w-full">

      {/* ── Full-screen Hero ─────────────────────────────────── */}
      <section
        id="services-hero"
        className="relative w-full min-h-screen flex flex-col justify-end pb-24 md:pb-36 px-8 md:px-16 overflow-hidden"
      >
        <img
          src="/imagenes/EM-22.jpg"
          alt="CourtSide Padel — Curated services"
          className="absolute inset-0 w-full h-full object-cover object-top"
          fetchPriority="high"
          decoding="async"
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(to bottom, rgba(1,25,44,0.10) 0%, rgba(1,25,44,0.38) 40%, rgba(1,25,44,0.97) 100%)',
          }}
        />

        <div className="relative z-10 max-w-7xl mx-auto w-full">
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex items-center gap-4 mb-6"
          >
            <span className="block h-px w-7 bg-brand-gold/40" aria-hidden="true" />
            <p className="text-[9px] uppercase tracking-[0.38em] text-brand-gold font-semibold">
              CourtSide Padel
            </p>
          </motion.div>

          <div className="overflow-hidden mb-5">
            <motion.h1
              initial={{ y: '110%' }}
              animate={{ y: 0 }}
              transition={{ duration: 1.05, delay: 0.45, ease: [0.22, 1, 0.36, 1] }}
              className="text-5xl md:text-7xl lg:text-8xl font-light text-white leading-none"
              style={{ fontFamily: 'var(--font-display)', fontStyle: 'italic' }}
            >
              {t('servicesPage.heroTitle')}
            </motion.h1>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.85 }}
            className="text-white/52 text-base md:text-lg font-light max-w-xl leading-relaxed mb-14"
          >
            {t('servicesPage.heroSubtitle')}
          </motion.p>

          {/* Quick-jump to each panel */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 1.1 }}
            className="flex flex-wrap items-center gap-8 md:gap-12"
          >
            {services.map((s, i) => (
              <button
                key={s.label}
                onClick={() => scrollToPanel(i)}
                className="flex items-center gap-3 group"
              >
                <span
                  className="text-white/28 font-light text-xs"
                  style={{ fontFamily: 'var(--font-display)', letterSpacing: '0.1em' }}
                >
                  {s.num}
                </span>
                <span className="text-[10px] uppercase tracking-[0.28em] font-semibold text-white/50 group-hover:text-brand-gold transition-colors duration-300">
                  {s.label}
                </span>
              </button>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Fixed mini-nav ───────────────────────────────────── */}
      <div
        className="fixed left-0 right-0 z-40 border-b border-brand-dark/8"
        style={{
          top: '96px',
          background: 'rgba(247,244,239,0.94)',
          backdropFilter: 'blur(14px)',
          WebkitBackdropFilter: 'blur(14px)',
          opacity: navVisible ? 1 : 0,
          pointerEvents: navVisible ? 'auto' : 'none',
          transform: navVisible ? 'translateY(0)' : 'translateY(-6px)',
          transition: 'opacity 0.28s ease, transform 0.28s ease',
        }}
        aria-hidden={!navVisible}
      >
        <div className="max-w-7xl mx-auto px-8 md:px-16 flex items-center gap-1 h-13">
          <span className="text-[9px] uppercase tracking-[0.35em] text-brand-dark/30 font-semibold mr-4 hidden md:block">
            Services
          </span>
          <span className="w-px h-4 bg-brand-dark/12 mr-4 hidden md:block" aria-hidden="true" />
          {services.map((s, i) => (
            <button
              key={s.label}
              onClick={() => scrollToPanel(i)}
              className="relative flex items-center gap-2 px-4 py-3.5 group"
            >
              <span className="text-[9px] text-brand-dark/30 font-light">{s.num}</span>
              <span
                className={`text-[10px] uppercase tracking-[0.28em] font-semibold transition-colors duration-300 ${
                  activeIndex === i
                    ? 'text-brand-dark'
                    : 'text-brand-dark/38 group-hover:text-brand-dark/65'
                }`}
              >
                {s.label}
              </span>
              {activeIndex === i && (
                <motion.div
                  layoutId="svc-indicator"
                  className="absolute bottom-0 left-0 right-0 h-px bg-brand-gold"
                  transition={{ duration: 0.3, ease: 'easeOut' }}
                />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* ── Horizontal scroll section ────────────────────────── */}
      {/*
        Outer wrapper: tall enough to give 1 viewport of scroll per panel.
        height = 100vh × n (extra 2 viewports of scroll for 3 panels).
      */}
      <div
        ref={wrapperRef}
        style={{ height: `${services.length * 100}vh` }}
      >
        {/* Sticky viewport-height container */}
        <div className="sticky top-0 overflow-hidden" style={{ height: '100svh' }}>

          {/* Progress bar at top */}
          <div className="absolute top-0 left-0 right-0 h-px z-30 bg-brand-dark/8">
            <div
              className="h-full bg-brand-gold/60 origin-left transition-transform duration-75"
              style={{ transform: `scaleX(${progress})` }}
            />
          </div>

          {/* Horizontal track — translateX driven by scroll */}
          <div
            ref={trackRef}
            className="flex h-full will-change-transform"
            style={{ width: `${services.length * 100}vw` }}
          >
            {services.map((svc, i) => {
              const isReversed = i % 2 !== 0;
              const media      = serviceMedia[svc.key];
              const features   = serviceFeatures[svc.key];

              return (
                <div
                  key={svc.key}
                  className={`flex-shrink-0 flex flex-col ${
                    isReversed ? 'md:flex-row-reverse' : 'md:flex-row'
                  } ${svc.bg}`}
                  style={{ width: '100vw', height: '100svh' }}
                >
                  {/* ── Media panel ── */}
                  <div className="w-full md:w-[52%] relative overflow-hidden min-h-[40vh] md:min-h-full flex-shrink-0">
                    {media.type === 'image' ? (
                      <img
                        src={media.src}
                        alt={t(`servicesPage.${svc.key}.title`)}
                        className="absolute inset-0 w-full h-full object-cover"
                        loading={i === 0 ? 'eager' : 'lazy'}
                        decoding="async"
                      />
                    ) : (
                      <video
                        autoPlay
                        muted
                        loop
                        playsInline
                        className="absolute inset-0 w-full h-full object-cover"
                      >
                        <source src={media.src} type="video/mp4" />
                      </video>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-br from-brand-dark/25 to-transparent pointer-events-none" />
                    <div className="absolute top-8 left-8">
                      <span
                        className="text-white/22"
                        style={{ fontFamily: 'var(--font-display)', fontSize: '0.75rem', letterSpacing: '0.14em' }}
                      >
                        {svc.num}
                      </span>
                    </div>
                  </div>

                  {/* ── Text panel ── */}
                  <div className="w-full md:w-[48%] flex items-center px-8 md:px-14 lg:px-20 py-14 md:py-24 flex-shrink-0">
                    <div className="max-w-md w-full">

                      {/* Eyebrow */}
                      <div className="flex items-center gap-3 mb-7">
                        <span className="text-[9px] uppercase tracking-[0.38em] text-brand-gold font-semibold">
                          {svc.num} · {svc.label}
                        </span>
                        <span className="block h-px w-8 bg-brand-gold/35 flex-shrink-0" />
                      </div>

                      {/* Title */}
                      <h2
                        className={`text-4xl md:text-5xl lg:text-[3.2rem] font-light leading-none mb-2 ${svc.textColor}`}
                        style={{ fontFamily: 'var(--font-display)', fontStyle: 'italic' }}
                      >
                        {t(`servicesPage.${svc.key}.title`)}
                      </h2>

                      {/* Gold divider */}
                      <div className="w-8 h-px bg-brand-gold/45 mb-7" />

                      {/* Description */}
                      <p className={`text-base md:text-lg leading-relaxed mb-8 font-light ${svc.subColor}`}>
                        {t(`servicesPage.${svc.key}.desc`)}
                      </p>

                      {/* Features */}
                      <ul className="space-y-3 mb-10">
                        {features.map((feature) => (
                          <li key={feature} className="flex items-center gap-3.5">
                            <span className="w-1 h-1 rounded-full bg-brand-gold flex-shrink-0" />
                            <span className={`text-sm font-light tracking-wide ${svc.featureColor}`}>
                              {feature}
                            </span>
                          </li>
                        ))}
                      </ul>

                      {/* CTA */}
                      <a
                        href={localizedHref(serviceCtas[svc.key])}
                        className="btn-luxury inline-flex items-center gap-3 group/cta"
                      >
                        <span>{t(`servicesPage.${svc.key}.action`)}</span>
                        <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover/cta:translate-x-1" />
                      </a>

                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Scroll hint (visible on first panel only) */}
          {progress < 0.08 && (
            <div className="absolute bottom-8 right-10 flex items-center gap-2 pointer-events-none">
              <span className="text-[9px] uppercase tracking-[0.3em] text-brand-dark/30 font-semibold">
                Scroll
              </span>
              <svg className="w-3.5 h-3.5 text-brand-dark/30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 5v14m7-7l-7 7-7-7" />
              </svg>
            </div>
          )}

          {/* Panel counter */}
          <div className="absolute bottom-8 left-8 flex items-center gap-3">
            {services.map((s, i) => (
              <button
                key={s.key}
                onClick={() => scrollToPanel(i)}
                className={`transition-all duration-300 rounded-full ${
                  i === activeIndex
                    ? 'w-6 h-1.5 bg-brand-gold'
                    : 'w-1.5 h-1.5 bg-brand-dark/20 hover:bg-brand-dark/35'
                }`}
                style={services[activeIndex].key === 'corporate' ? {
                  background: i === activeIndex ? 'var(--color-brand-gold)' : 'rgba(255,255,255,0.2)',
                } : {}}
                aria-label={s.label}
              />
            ))}
          </div>
        </div>
      </div>

      {/* ── Closing CTA ─────────────────────────────────────── */}
      <section id="services-cta" className="relative py-28 md:py-40 px-8 md:px-16 bg-brand-dark overflow-hidden">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'radial-gradient(ellipse 70% 55% at 50% 55%, rgba(217,173,98,0.07) 0%, transparent 70%)',
          }}
        />
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          className="max-w-3xl mx-auto text-center relative z-10"
        >
          <div className="flex items-center justify-center gap-4 mb-8">
            <span className="block h-px w-7 bg-brand-gold/40" aria-hidden="true" />
            <p className="text-[9px] uppercase tracking-[0.38em] text-brand-gold font-semibold">
              Begin Your Journey
            </p>
            <span className="block h-px w-7 bg-brand-gold/40" aria-hidden="true" />
          </div>

          <h2
            className="text-4xl md:text-5xl lg:text-6xl font-light text-white mb-6 leading-tight"
            style={{ fontFamily: 'var(--font-display)', fontStyle: 'italic' }}
          >
            Not sure which is<br />right for you?
          </h2>

          <p className="text-white/42 text-base font-light leading-relaxed mb-12 max-w-sm mx-auto">
            Our concierge team will guide you to the experience that fits your group, goals, and preferred dates.
          </p>

          <a
            href={localizedHref('/menorca')}
            className="btn-luxury inline-flex items-center gap-3 group/cta"
          >
            Explore Menorca Retreat
            <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover/cta:translate-x-1" />
          </a>
        </motion.div>
      </section>

    </div>
  );
}
