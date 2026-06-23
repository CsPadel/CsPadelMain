import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Calendar, ArrowRight, ChevronLeft } from 'lucide-react';
import '../i18n/config';
import { getRetreatUrl } from '../constants/urls';
import { HERO_ISLAND_VIDEOS } from '../constants/serviceMedia';
import type { Locale } from '../i18n/locales';
import { usePageTranslation } from '../i18n/usePageTranslation';

interface HeroIslandProps {
  locale?: Locale;
}

type Flow = 'retreat' | 'selection' | 'checkout' | 'concierge';

export default function HeroIsland({ locale: localeProp }: HeroIslandProps) {
  const { t } = usePageTranslation(localeProp);
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [flow, setFlow] = useState<Flow>('retreat');
  const [selectedRetreat, setSelectedRetreat] = useState<string | null>(null);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);

  const videos = [...HERO_ISLAND_VIDEOS];
  const [videoIndex, setVideoIndex] = useState(0);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);

  const availableDates = (retreat: string | null): string[] => {
    switch (retreat) {
      case 'menorca': return ['date1', 'date2'];
      case 'bali':    return ['date1', 'date2'];
      case 'dubai':   return ['date1'];
      default:        return [];
    }
  };

  useEffect(() => {
    videos.forEach((_, idx) => {
      const v = videoRefs.current[idx];
      if (!v) return;
      if (idx === videoIndex) {
        v.currentTime = 0;
        v.play().catch(() => {});
      } else {
        setTimeout(() => {
          if (videoRefs.current[idx] && idx !== videoIndex) {
            videoRefs.current[idx]!.pause();
          }
        }, 700);
      }
    });
  }, [videoIndex]);

  /* Lock body scroll when sidebar is open */
  useEffect(() => {
    if (isSidebarOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isSidebarOpen]);

  const handleTimeUpdate = (index: number) => {
    if (index !== videoIndex) return;
    const v = videoRefs.current[index];
    if (v && v.currentTime >= 2) {
      setVideoIndex((prev) => (prev + 1) % videos.length);
    }
  };

  const openSidebar = () => {
    setSidebarOpen(true);
    setFlow('retreat');
    setSelectedRetreat(null);
    setSelectedDate(null);
  };

  const closeSidebar = () => setSidebarOpen(false);

  const retreats = ['menorca', 'bali', 'dubai'] as const;

  return (
    <>
      {/* ── Video Hero ───────────────────────────────────────── */}
      <section className="relative w-full h-screen overflow-hidden flex items-end pb-24 md:pb-28 px-8 md:px-16">
        <div className="absolute inset-0 bg-brand-dark">
          {videos.map((src, idx) => (
            <video
              key={src}
              ref={(el) => { videoRefs.current[idx] = el; }}
              src={src}
              muted
              playsInline
              preload="auto"
              onTimeUpdate={() => handleTimeUpdate(idx)}
              onEnded={() => setVideoIndex((prev) => (prev + 1) % videos.length)}
              className={`absolute inset-0 w-full h-full object-cover scale-105 transition-opacity duration-700 ease-in-out ${
                videoIndex === idx ? 'opacity-100 z-10' : 'opacity-0 z-0'
              }`}
            />
          ))}
          <div className="absolute inset-0 bg-gradient-to-t from-brand-dark via-brand-dark/25 to-brand-dark/45 z-20" />
        </div>

        <div className="relative z-30 w-full max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-end gap-8">
          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: 'easeOut' }}
            className="text-white/72 text-lg md:text-2xl font-light max-w-md leading-relaxed"
          >
            {t('hero.subtitle')}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <button onClick={openSidebar} className="btn-luxury group">
              {t('hero.bookBtn')}
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
            </button>
          </motion.div>
        </div>
      </section>

      {/* ── Booking Sidebar ──────────────────────────────────── */}
      <AnimatePresence>
        {isSidebarOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={closeSidebar}
              className="fixed inset-0 bg-brand-dark/75 backdrop-blur-sm z-[60]"
            />

            {/* Panel */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 28, stiffness: 220 }}
              className="fixed top-0 right-0 h-full w-full max-w-[440px] bg-brand-dark-2 z-[70] flex flex-col border-l border-white/8 shadow-2xl shadow-black/50"
            >
              {/* Panel Header */}
              <div className="flex items-center justify-between px-8 py-6 border-b border-white/8 flex-shrink-0">
                <div className="flex items-center gap-3">
                  {flow !== 'retreat' && (
                    <button
                      onClick={() => setFlow(flow === 'selection' ? 'retreat' : 'selection')}
                      className="text-white/40 hover:text-white transition-colors mr-1"
                      aria-label="Go back"
                    >
                      <ChevronLeft className="w-5 h-5" />
                    </button>
                  )}
                  <span className="text-[9px] uppercase tracking-[0.38em] text-brand-gold font-semibold">
                    {flow === 'retreat'   ? t('sidebar.selectRetreatInfo')
                    : flow === 'selection' ? t('sidebar.selectDateInfo')
                    : flow === 'checkout'  ? 'Checkout'
                    : 'Concierge'}
                  </span>
                </div>
                <button
                  onClick={closeSidebar}
                  className="text-white/40 hover:text-white transition-colors p-1.5 -mr-1.5 rounded-md hover:bg-white/5"
                  aria-label="Close"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Panel Body — scrollable */}
              <div className="flex-1 overflow-y-auto">

                {/* ── Step 1: Choose destination ── */}
                {flow === 'retreat' && (
                  <div className="px-8 py-10 flex flex-col gap-8">
                    <div>
                      <div className="w-7 h-px bg-brand-gold mb-5" />
                      <h2
                        className="text-3xl font-light text-white mb-2"
                        style={{ fontFamily: 'var(--font-display)', fontStyle: 'italic' }}
                      >
                        {t('sidebar.yourExperience')}
                      </h2>
                      <p className="text-white/50 text-sm font-light leading-relaxed">
                        {t('sidebar.chooseRetreat')}
                      </p>
                    </div>

                    <div className="flex flex-col gap-3">
                      {retreats.map((retreat) => (
                        <button
                          key={retreat}
                          onClick={() => {
                            setSelectedRetreat(retreat);
                            setSelectedDate(null);
                            setFlow('selection');
                          }}
                          className="group w-full flex items-center justify-between px-6 py-4 border border-white/12 rounded-card text-white hover:border-brand-gold hover:bg-brand-gold/5 transition-all duration-250"
                        >
                          <span className="text-base font-light tracking-wide text-white group-hover:text-brand-gold transition-colors uppercase">
                            {t(`sidebar.retreats.${retreat}`)}
                          </span>
                          <ArrowRight className="w-4 h-4 text-white/30 group-hover:text-brand-gold group-hover:translate-x-0.5 transition-all duration-200" />
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* ── Step 2: Choose date ── */}
                {flow === 'selection' && (
                  <div className="px-8 py-10 flex flex-col gap-8">
                    <div>
                      <div className="w-7 h-px bg-brand-gold mb-5" />
                      <h2
                        className="text-3xl font-light text-white mb-2"
                        style={{ fontFamily: 'var(--font-display)', fontStyle: 'italic' }}
                      >
                        {t('sidebar.yourExperience')}
                      </h2>
                      <p className="text-white/50 text-sm font-light leading-relaxed">
                        {t('sidebar.chooseHow')}
                      </p>
                    </div>

                    {/* Selected destination row */}
                    <div className="flex items-center justify-between py-4 border-b border-white/10">
                      <div>
                        <p className="text-[9px] uppercase tracking-[0.28em] text-white/35 mb-1">
                          {t('sidebar.selectedRetreat')}
                        </p>
                        <p className="text-white text-base font-light uppercase tracking-widest">
                          {selectedRetreat ? t(`sidebar.retreats.${selectedRetreat}`) : ''}
                        </p>
                      </div>
                      <div className="flex items-center gap-4">
                        {selectedRetreat && (
                          <a
                            href={getRetreatUrl(selectedRetreat)}
                            className="text-[9px] uppercase tracking-[0.2em] text-brand-gold/70 hover:text-brand-gold transition-colors"
                          >
                            {t('sidebar.viewDetailsBtn')}
                          </a>
                        )}
                        <button
                          onClick={() => setFlow('retreat')}
                          className="text-[9px] uppercase tracking-[0.2em] text-white/35 hover:text-white/70 transition-colors"
                        >
                          {t('sidebar.changeBtn')}
                        </button>
                      </div>
                    </div>

                    {/* Date selection */}
                    <div>
                      <p className="text-[9px] uppercase tracking-[0.28em] text-white/35 mb-4">
                        {t('sidebar.availableDatesInfo')}
                      </p>
                      <div className="flex flex-col gap-2.5">
                        {availableDates(selectedRetreat).map((dateKey) => {
                          const isSelected = selectedDate === dateKey;
                          return (
                            <button
                              key={dateKey}
                              onClick={() => setSelectedDate(isSelected ? null : dateKey)}
                              className={`group w-full flex items-center gap-4 px-5 py-4 rounded-card border transition-all duration-250 text-left ${
                                isSelected
                                  ? 'border-brand-gold bg-brand-gold/8 text-white'
                                  : 'border-white/12 text-white/80 hover:border-brand-gold/50 hover:bg-white/3'
                              }`}
                            >
                              <Calendar className={`w-4 h-4 flex-shrink-0 transition-colors ${isSelected ? 'text-brand-gold' : 'text-white/35 group-hover:text-brand-gold/60'}`} />
                              <span className="text-sm font-light tracking-wide flex-1 text-white">
                                {t(`sidebar.dates.${selectedRetreat}.${dateKey}`)}
                              </span>
                              {isSelected && (
                                <span className="w-2 h-2 rounded-full bg-brand-gold flex-shrink-0" />
                              )}
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* CTA buttons — appear when date selected */}
                    <AnimatePresence>
                      {selectedDate && (
                        <motion.div
                          initial={{ opacity: 0, y: 12 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 8 }}
                          transition={{ duration: 0.3 }}
                          className="flex flex-col gap-3 pt-2"
                        >
                          <button onClick={() => setFlow('checkout')} className="btn-luxury w-full">
                            {t('sidebar.directCheckoutBtn')}
                          </button>
                          <button
                            onClick={() => setFlow('concierge')}
                            className="w-full py-4 border border-white/15 rounded-card text-white/75 text-sm font-light uppercase tracking-widest hover:border-brand-gold/40 hover:text-white transition-all duration-250"
                          >
                            {t('sidebar.conciergeBtn')}
                          </button>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                )}

                {/* ── Checkout placeholder ── */}
                {flow === 'checkout' && (
                  <div className="px-8 py-10 flex flex-col gap-6">
                    <div>
                      <div className="w-7 h-px bg-brand-gold mb-5" />
                      <h2
                        className="text-3xl font-light text-white mb-2"
                        style={{ fontFamily: 'var(--font-display)', fontStyle: 'italic' }}
                      >
                        {t('checkout.title')}
                      </h2>
                    </div>
                    <div className="flex flex-col items-center justify-center text-center py-14 px-6 border border-white/8 rounded-card bg-white/3">
                      <p className="text-[9px] uppercase tracking-[0.3em] text-brand-gold mb-3">
                        {t('checkout.placeholderTitle')}
                      </p>
                      <p className="text-white/45 text-sm font-light leading-relaxed">
                        {t('checkout.placeholderDesc')}
                      </p>
                    </div>
                    <button
                      onClick={() => setFlow('selection')}
                      className="text-white/35 hover:text-white/65 text-xs uppercase tracking-widest transition-colors self-start"
                    >
                      {t('checkout.backBtn')}
                    </button>
                  </div>
                )}

                {/* ── Concierge form ── */}
                {flow === 'concierge' && (
                  <div className="px-8 py-10 flex flex-col gap-6">
                    <div>
                      <div className="w-7 h-px bg-brand-gold mb-5" />
                      <h2
                        className="text-3xl font-light text-white mb-2"
                        style={{ fontFamily: 'var(--font-display)', fontStyle: 'italic' }}
                      >
                        {t('concierge.title')}
                      </h2>
                      <p className="text-white/48 text-sm font-light leading-relaxed">
                        {t('concierge.desc')}
                      </p>
                    </div>

                    <form
                      className="flex flex-col gap-8"
                      onSubmit={(e) => e.preventDefault()}
                    >
                      <div className="relative group">
                        <label className="block text-[9px] uppercase tracking-[0.28em] text-white/38 mb-3 font-semibold">
                          {t('concierge.nameLabel')}
                        </label>
                        <input
                          type="text"
                          placeholder={t('concierge.namePlaceholder')}
                          className="w-full bg-transparent border-b border-white/18 pb-3 text-white text-base font-light focus:outline-none focus:border-brand-gold transition-colors placeholder:text-white/22"
                        />
                      </div>
                      <div className="relative group">
                        <label className="block text-[9px] uppercase tracking-[0.28em] text-white/38 mb-3 font-semibold">
                          {t('concierge.emailLabel')}
                        </label>
                        <input
                          type="email"
                          placeholder={t('concierge.emailPlaceholder')}
                          className="w-full bg-transparent border-b border-white/18 pb-3 text-white text-base font-light focus:outline-none focus:border-brand-gold transition-colors placeholder:text-white/22"
                        />
                      </div>
                      <button type="submit" className="btn-luxury w-full mt-2">
                        {t('concierge.submitBtn')}
                      </button>
                    </form>

                    <button
                      onClick={() => setFlow('selection')}
                      className="text-white/35 hover:text-white/65 text-xs uppercase tracking-widest transition-colors self-start"
                    >
                      {t('checkout.backBtn')}
                    </button>
                  </div>
                )}
              </div>

              {/* Panel Footer */}
              <div className="flex-shrink-0 px-8 py-4 border-t border-white/8">
                <p className="text-[8px] uppercase tracking-[0.28em] text-white/22 text-center">
                  CourtSide Padel · Confidential &amp; Secure
                </p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
