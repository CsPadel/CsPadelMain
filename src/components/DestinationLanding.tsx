import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, MapPin } from 'lucide-react';
import '../i18n/config';
import type { Locale } from '../i18n/locales';
import { usePageTranslation } from '../i18n/usePageTranslation';
import { getWhatsAppConciergeUrl } from '../constants/urls';
import { trackWhatsAppClick } from '../lib/gtag';
import FooterIsland from './FooterIsland';

type Destination = 'bali' | 'dubai';

interface DestinationLandingProps {
  readonly destination: Destination;
  readonly locale?: Locale;
}

const heroMedia: Record<Destination, { type: 'video' | 'image'; src: string }> = {
  bali: { type: 'video', src: '/bali.mp4' },
  dubai: { type: 'video', src: '/vid5.mp4' },
};

// ─── Gallery images ──────────────────────────────────────────────────────────
// Bali: swap picsum URLs for AI-generated images placed in /public/bali/
//   wide  → /bali/bali-hero-wide.jpg
//   tall  → /bali/bali-athlete-pool.jpg
//   sq1   → /bali/bali-coaching-court.jpg
//   sq2   → /bali/bali-temple-dawn.jpg
const gallery: Record<Destination, { wide: string; tall: string; sq1: string; sq2: string }> = {
  bali: {
    wide: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=1400&h=550&fit=crop&crop=center&q=85',
    tall: 'https://images.unsplash.com/photo-1555400038-63f5ba517a47?w=600&h=780&fit=crop&crop=center&q=85',
    sq1:  'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&h=600&fit=crop&crop=center&q=85',
    sq2:  'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=600&fit=crop&crop=center&q=85',
  },
  // Dubai: swap for AI-generated → /dubai/dubai-hero-wide.jpg | dubai-skyline-portrait.jpg | dubai-court-night.jpg | dubai-desert-dunes.jpg
  dubai: {
    wide: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=1400&h=550&fit=crop&crop=center&q=85',
    tall: 'https://images.unsplash.com/photo-1518684079-3c830dcef090?w=600&h=780&fit=crop&crop=top&q=85',
    sq1:  'https://images.unsplash.com/photo-1580674684081-7617fbf3d745?w=800&h=600&fit=crop&crop=center&q=85',
    sq2:  'https://images.unsplash.com/photo-1451337516015-6b6e9a44a8a3?w=800&h=600&fit=crop&crop=center&q=85',
  },
};

// ─── Pillar card images ───────────────────────────────────────────────────────
// Bali: swap picsum URLs for AI-generated images placed in /public/bali/
//   [0] Coaching  → /bali/bali-pillar-coaching.jpg
//   [1] Villa     → /bali/bali-pillar-villa.jpg
//   [2] Wellness  → /bali/bali-pillar-wellness.jpg
//   [3] Culture   → /bali/bali-pillar-culture.jpg
const pillarImages: Record<Destination, string[]> = {
  bali: [
    'https://images.unsplash.com/photo-1554068865-24cecd4e34b8?w=900&h=506&fit=crop&crop=center&q=85',
    'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=900&h=506&fit=crop&crop=center&q=85',
    'https://images.unsplash.com/photo-1600334129128-685c5582fd35?w=900&h=506&fit=crop&crop=center&q=85',
    'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=900&h=506&fit=crop&crop=center&q=85',
  ],
  // Dubai pillars: swap for AI-generated → /dubai/dubai-pillar-courts.jpg | dubai-pillar-penthouse.jpg | dubai-pillar-network.jpg | dubai-pillar-desert.jpg
  dubai: [
    'https://images.unsplash.com/photo-1552674605-db6ffd4facb5?w=900&h=506&fit=crop&crop=center&q=85',
    'https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=900&h=506&fit=crop&crop=center&q=85',
    'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=900&h=506&fit=crop&crop=center&q=85',
    'https://images.unsplash.com/photo-1509316785289-025f5b846b35?w=900&h=506&fit=crop&crop=center&q=85',
  ],
};

export default function DestinationLanding({ destination, locale: localeProp }: DestinationLandingProps) {
  const { t } = usePageTranslation(localeProp);
  const pk = destination === 'bali' ? 'baliPage' : 'dubaiPage';
  const media = heroMedia[destination];
  const imgs = gallery[destination];

  const pillars = t(`${pk}.pillars`, { returnObjects: true }) as Array<{ tag: string; title: string; desc: string }>;
  const whatsappUrl = getWhatsAppConciergeUrl(t(`${pk}.whatsappMessage`));
  const pillarImgs = pillarImages[destination];

  return (
    <div className="w-full">

      {/* ── Hero ─────────────────────────────────────────────── */}
      <section className="relative w-full h-screen overflow-hidden flex items-end">
        <div className="absolute inset-0">
          {media.type === 'video' ? (
            <video autoPlay loop muted playsInline className="w-full h-full object-cover scale-105">
              <source src={media.src} type="video/mp4" />
            </video>
          ) : (
            <img src={media.src} alt={destination} className="w-full h-full object-cover" />
          )}
          {/* cinematic overlay — bottom-heavy so headline at bottom stays readable */}
          <div
            className="absolute inset-0"
            style={{
              background:
                'linear-gradient(to bottom, rgba(1,25,44,0.18) 0%, rgba(1,25,44,0.22) 30%, rgba(1,25,44,0.78) 68%, rgba(1,25,44,0.97) 100%)',
            }}
          />
          {/* gold warmth tint */}
          <div
            className="absolute inset-0"
            style={{ background: 'rgba(217,173,98,0.04)', mixBlendMode: 'soft-light' }}
          />
        </div>

        {/* Two-column layout: headline left, stats right */}
        <div className="relative z-10 w-full max-w-7xl mx-auto px-8 md:px-16 pb-20 md:pb-28 flex items-end justify-between gap-10">

          {/* LEFT — headline + CTA */}
          <div className="flex-1 min-w-0">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="flex items-center gap-2 mb-5"
            >
              <MapPin className="w-4 h-4 text-brand-gold flex-shrink-0" />
              <span className="text-sm tracking-widest uppercase font-medium text-brand-gold">
                {t(`${pk}.heroLocation`)}
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 32 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.08 }}
              className="text-brand-light mb-5"
              style={{
                fontFamily: 'var(--font-display)',
                fontStyle: 'italic',
                fontWeight: 300,
                fontSize: 'clamp(4rem, 10vw, 9.5rem)',
                lineHeight: 0.92,
                textShadow: '0 4px 48px rgba(1,25,44,0.55)',
              }}
            >
              {t(`${pk}.heroTitle`)}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="text-lg md:text-2xl font-light mb-8"
              style={{ color: 'rgba(255,255,255,0.72)', maxWidth: '440px' }}
            >
              {t(`${pk}.heroTagline`)}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <a href={whatsappUrl} onClick={trackWhatsAppClick} className="btn-luxury group">
                {t(`${pk}.enquireBtn`)}
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" />
              </a>
            </motion.div>
          </div>

          {/* RIGHT — vertical stats (desktop only) */}
          <motion.div
            initial={{ opacity: 0, x: 16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.42 }}
            className="hidden lg:flex flex-col items-end gap-5 flex-shrink-0 pb-1"
          >
            {[
              { value: t(`${pk}.stats.duration.value`), label: t(`${pk}.stats.duration.label`) },
              { value: t(`${pk}.stats.group.value`),    label: t(`${pk}.stats.group.label`) },
              { value: t(`${pk}.stats.rating.value`),   label: t(`${pk}.stats.rating.label`) },
              { value: t(`${pk}.stats.privacy.value`),  label: t(`${pk}.stats.privacy.label`) },
            ].map((stat, i) => (
              <React.Fragment key={stat.label}>
                {i > 0 && (
                  <div style={{ width: '3rem', height: '1px', background: 'rgba(217,173,98,0.18)', alignSelf: 'flex-end' }} />
                )}
                <div className="text-right">
                  <div
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontStyle: 'italic',
                      fontWeight: 300,
                      fontSize: 'clamp(1.8rem, 2.4vw, 2.4rem)',
                      color: '#D9AD62',
                      lineHeight: 1,
                      textShadow: '0 2px 16px rgba(1,25,44,0.9)',
                    }}
                  >
                    {stat.value}
                  </div>
                  <div
                    style={{
                      fontFamily: 'var(--font-inter)',
                      fontSize: '0.5rem',
                      letterSpacing: '0.24em',
                      textTransform: 'uppercase',
                      color: 'rgba(255,255,255,0.38)',
                      marginTop: '0.25rem',
                    }}
                  >
                    {stat.label}
                  </div>
                </div>
              </React.Fragment>
            ))}
          </motion.div>

        </div>

      </section>

      {/* ── Intro paragraph ──────────────────────────────────── */}
      <motion.section
        initial={{ opacity: 0, y: 22 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.7 }}
        className="py-24 md:py-28 px-8 md:px-16 bg-white"
      >
        <div className="max-w-3xl mx-auto text-center">
          <div className="flex items-center justify-center gap-4 mb-8">
            <span className="block h-px w-7 bg-brand-gold/40" aria-hidden="true" />
            <span className="text-[9px] uppercase tracking-[0.38em] text-brand-gold font-semibold">{t(`${pk}.sectionTag`)}</span>
            <span className="block h-px w-7 bg-brand-gold/40" aria-hidden="true" />
          </div>
          <p
            className="text-2xl md:text-3xl font-light leading-relaxed"
            style={{ fontFamily: 'var(--font-display)', fontStyle: 'italic', color: 'rgba(1,25,44,0.72)' }}
          >
            {t(`${pk}.heroSubtitle`)}
          </p>
        </div>
      </motion.section>

      {/* ── Gallery ──────────────────────────────────────────── */}
      <section className="px-8 md:px-16 pb-24 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {/* Wide — spans 2 cols */}
            <div className="col-span-2 rounded-card overflow-hidden" style={{ aspectRatio: '16/6.5' }}>
              <img
                src={imgs.wide}
                alt=""
                loading="lazy"
                className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
              />
            </div>
            {/* Tall */}
            <div className="row-span-2 rounded-card overflow-hidden" style={{ aspectRatio: '4/5', maxHeight: '420px' }}>
              <img
                src={imgs.tall}
                alt=""
                loading="lazy"
                className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
              />
            </div>
            {/* Square 1 */}
            <div className="rounded-card overflow-hidden" style={{ aspectRatio: '4/3' }}>
              <img
                src={imgs.sq1}
                alt=""
                loading="lazy"
                className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
              />
            </div>
            {/* Square 2 */}
            <div className="rounded-card overflow-hidden" style={{ aspectRatio: '4/3' }}>
              <img
                src={imgs.sq2}
                alt=""
                loading="lazy"
                className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── Experience pillars ───────────────────────────────── */}
      <section className="py-24 px-8 md:px-16 bg-white">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7 }}
            className="text-center mb-14"
          >
            <div className="flex items-center justify-center gap-4 mb-5">
              <span className="block h-px w-7 bg-brand-gold/40" aria-hidden="true" />
              <p className="text-[9px] uppercase tracking-[0.38em] text-brand-gold font-semibold">
                The Experience
              </p>
              <span className="block h-px w-7 bg-brand-gold/40" aria-hidden="true" />
            </div>
            <h2
              className="text-4xl md:text-5xl font-light text-brand-dark"
              style={{ fontFamily: 'var(--font-display)', fontStyle: 'italic' }}
            >
              {t(`${pk}.sectionTitle`)}
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {Array.isArray(pillars) && pillars.map((pillar, idx) => {
              const imgSrc = pillarImgs[idx];
              return (
                <motion.div
                  key={pillar.tag}
                  initial={{ opacity: 0, y: 28 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-60px' }}
                  transition={{ duration: 0.7, delay: idx * 0.1, ease: [0.22, 1, 0.36, 1] }}
                  className="border border-brand-dark/8 rounded-card bg-white hover:border-brand-gold/30 hover:shadow-lg hover:shadow-brand-dark/5 transition-all duration-400 overflow-hidden group"
                >
                  {imgSrc && (
                    <div className="relative w-full overflow-hidden" style={{ aspectRatio: '16/9' }}>
                      <img
                        src={imgSrc}
                        alt={pillar.title}
                        loading="lazy"
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                      />
                    </div>
                  )}
                  <div className="p-7 md:p-8">
                    <div className="flex items-center gap-2.5 mb-4">
                      <span className="block h-px w-4 bg-brand-gold/50" />
                      <span className="text-[9px] uppercase tracking-[0.28em] text-brand-gold font-semibold">
                        {pillar.tag}
                      </span>
                    </div>
                    <h3
                      className="text-xl md:text-2xl font-light mb-3 text-brand-dark leading-snug"
                      style={{ fontFamily: 'var(--font-display)', fontStyle: 'italic' }}
                    >
                      {pillar.title}
                    </h3>
                    <p className="font-light leading-relaxed text-brand-dark/52 text-sm md:text-base">
                      {pillar.desc}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── CTA banner ───────────────────────────────────────── */}
      <section
        className="py-32 px-8 md:px-16 text-center noise-section"
        style={{ background: 'linear-gradient(135deg, #041E36 0%, #01192C 100%)' }}
      >
        <div className="max-w-2xl mx-auto">
          <div className="w-10 h-px bg-brand-gold mx-auto mb-10 opacity-50" />
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-light mb-5 text-white"
            style={{ fontFamily: 'var(--font-display)', fontStyle: 'italic' }}
          >
            {t(`${pk}.ctaTitle`)}
          </motion.h2>
          <p className="font-light text-lg mb-12" style={{ color: 'rgba(255,255,255,0.50)' }}>
            {t(`${pk}.ctaDesc`)}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href={whatsappUrl} onClick={trackWhatsAppClick} className="btn-luxury group">
              {t(`${pk}.ctaBtn`)}
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" />
            </a>
            <a
              href={whatsappUrl}
              onClick={trackWhatsAppClick}
              className="inline-flex items-center justify-center gap-3 px-8 py-5 border border-white/20 rounded-button text-white font-medium text-sm uppercase tracking-widest hover:border-brand-gold hover:text-brand-gold transition-colors duration-250"
            >
              {t(`${pk}.ctaSecondaryBtn`)}
            </a>
          </div>
        </div>
      </section>

      <FooterIsland locale={localeProp} />
    </div>
  );
}
