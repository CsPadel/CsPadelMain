import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import '../i18n/config';

interface RetreatLandingHeroProps {
  destination: 'menorca' | 'bali' | 'dubai';
  bgVideoSrc?: string;
  bgImageSrc?: string;
}

export default function RetreatLandingHero({ destination, bgVideoSrc, bgImageSrc }: RetreatLandingHeroProps) {
  const { t } = useTranslation();
  const heroRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });
  const mediaScale = useTransform(scrollYProgress, [0, 1], [1.0, 1.12]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const contentY = useTransform(scrollYProgress, [0, 0.5], ['0%', '-10%']);

  return (
    <div ref={heroRef} className="relative w-full h-screen overflow-hidden bg-brand-dark">

      {/* Parallax media */}
      <motion.div style={{ scale: mediaScale }} className="absolute inset-0 origin-center will-change-transform">
        {bgVideoSrc ? (
          <video
            src={bgVideoSrc}
            autoPlay muted loop playsInline
            className="absolute inset-0 w-full h-full object-cover"
          />
        ) : bgImageSrc ? (
          <img
            src={bgImageSrc}
            alt={destination}
            className="absolute inset-0 w-full h-full object-cover"
          />
        ) : (
          <div className="absolute inset-0 bg-brand-dark-2" />
        )}
      </motion.div>

      {/* Cinematic overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'linear-gradient(to bottom, rgba(1,25,44,0.55) 0%, rgba(1,25,44,0.15) 35%, rgba(1,25,44,0.75) 70%, rgba(1,25,44,0.98) 100%)' }}
      />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 80% 80% at 50% 50%, transparent 50%, rgba(1,25,44,0.35) 100%)' }}
      />

      {/* Centered content */}
      <motion.div
        style={{ opacity: contentOpacity, y: contentY }}
        className="absolute inset-0 flex flex-col items-center justify-center text-center z-10 px-6"
      >
        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.25 }}
          className="flex items-center gap-5 mb-10"
        >
          <span className="block h-px w-8 bg-brand-gold/55" aria-hidden="true" />
          <span className="text-[10px] uppercase tracking-[0.42em] text-brand-gold font-semibold">
            CourtSide Padel
          </span>
          <span className="block h-px w-8 bg-brand-gold/55" aria-hidden="true" />
        </motion.div>

        {/* Title — slide-up reveal */}
        <div className="overflow-hidden mb-8">
          <motion.h1
            initial={{ y: '110%' }}
            animate={{ y: 0 }}
            transition={{ duration: 1.05, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="text-white font-light tracking-tight"
            style={{
              fontFamily: 'var(--font-display)',
              fontStyle: 'italic',
              fontSize: 'clamp(3.5rem, 10vw, 10rem)',
              lineHeight: 0.88,
            }}
          >
            {t(`${destination}Page.heroTitle`)}
          </motion.h1>
        </div>

        {/* Gold divider */}
        <motion.div
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ scaleX: 1, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.88 }}
          className="w-10 h-px bg-brand-gold mb-8 origin-center"
        />

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.1 }}
          className="text-white/52 text-sm md:text-base font-light max-w-sm leading-relaxed tracking-[0.04em] mb-2"
        >
          {t(`${destination}Page.heroSubtitle`)}
        </motion.p>

        {destination === 'menorca' && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.3 }}
            className="text-[10px] uppercase tracking-[0.28em] text-brand-gold font-semibold mt-4 mb-2"
          >
            {t(`${destination}Page.heroMeta`)}
          </motion.p>
        )}

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.4 }}
          className="mt-8"
        >
          <button
            onClick={() => {
              const el = document.getElementById('rooms');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
            className="btn-luxury group"
          >
            {t(`${destination}Page.bookBtn`)}
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
          </button>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.2, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 pointer-events-none"
      >
        <span className="text-[8px] uppercase tracking-[0.38em] text-white/22 font-medium">Scroll</span>
        <motion.div
          animate={{ y: [0, 7, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
          className="w-px h-10 bg-gradient-to-b from-white/25 to-transparent"
        />
      </motion.div>
    </div>
  );
}
