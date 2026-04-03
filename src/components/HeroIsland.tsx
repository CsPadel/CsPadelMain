import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Calendar, User, ArrowRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import '../i18n/config';

export default function HeroIsland() {
  const { t } = useTranslation();
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [flow, setFlow] = useState<'selection' | 'checkout' | 'concierge'>('selection');

  const videos = ['/bali.mp4', '/padelv.mp4', '/vid2.mp4', '/vid3.mp4'];
  const [videoIndex, setVideoIndex] = useState(0);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);

  useEffect(() => {
    videos.forEach((_, idx) => {
      const v = videoRefs.current[idx];
      if (v) {
        if (idx === videoIndex) {
          v.currentTime = 0;
          v.play().catch(e => console.error("Auto-play prevented", e));
        } else {
          // Allow previous video to play through the crossfade (700ms) before pausing
          setTimeout(() => {
            if (videoRefs.current[idx] && idx !== videoIndex) {
              videoRefs.current[idx]!.pause();
            }
          }, 700);
        }
      }
    });
  }, [videoIndex]);

  const handleNextVideo = (index: number) => {
    if (index === videoIndex) {
      setVideoIndex((prev) => (prev + 1) % videos.length);
    }
  };

  const handleTimeUpdate = (index: number) => {
    if (index === videoIndex) {
      const v = videoRefs.current[index];
      if (v && v.currentTime >= 2) {
        handleNextVideo(index);
      }
    }
  };

  const openSidebar = () => {
    setSidebarOpen(true);
    setFlow('selection');
  };

  const closeSidebar = () => setSidebarOpen(false);

  return (
    <>
      <section className="relative w-screen h-screen overflow-hidden flex items-end pb-32 px-8 md:px-16" >
        {/* Background Video */}
        <div className="absolute inset-0 w-full h-full z-0 bg-brand-dark">
          {videos.map((src, idx) => (
            <video 
              key={src}
              ref={(el) => { videoRefs.current[idx] = el; }}
              src={src}
              muted 
              playsInline
              preload="auto"
              onTimeUpdate={() => handleTimeUpdate(idx)}
              onEnded={() => handleNextVideo(idx)}
              className={`absolute inset-0 w-full h-full object-cover scale-105 transition-opacity duration-700 ease-in-out ${videoIndex === idx ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}
            />
          ))}
          {/* Overlay gradient for text readability */}
          <div className="absolute inset-0 bg-brand-dark/40 bg-gradient-to-t from-brand-dark via-brand-dark/20 to-transparent z-20"></div>
        </div>

        {/* Hero Content */}
        <div className="relative z-10 w-full max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-end gap-12">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="max-w-3xl"
          >
            <img src="/logogold.webp" alt="CourtSide Padel" className="h-28 md:h-40 xl:h-52 mb-6 object-contain origin-bottom-left filter drop-shadow-2xl" />
            <p className="mt-8 text-xl md:text-2xl font-light tracking-wide text-brand-light/80 max-w-xl">
              {t('hero.subtitle')}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            <button 
              onClick={openSidebar}
              className="group relative inline-flex items-center justify-center px-10 py-5 bg-brand-gold text-brand-dark font-semibold text-lg uppercase tracking-widest overflow-hidden transition-transform hover:scale-105 active:scale-95"
            >
              <span className="relative z-10 flex items-center gap-3">
                {t('hero.bookBtn')} <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </span>
              <div className="absolute inset-0 bg-brand-light transform scale-x-0 origin-left group-hover:scale-x-100 transition-transform duration-500 ease-out z-0"></div>
              <span className="absolute inset-0 z-10 flex items-center justify-center gap-3 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100 text-brand-dark">
                {t('hero.bookBtn')} <ArrowRight className="w-5 h-5 translate-x-1" />
              </span>
            </button>
          </motion.div>
        </div>
      </section>

      {/* Sidebar Overlay & Panel */}
      <AnimatePresence>
        {isSidebarOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeSidebar}
              className="fixed inset-0 bg-brand-dark/80 backdrop-blur-sm z-40"
            />
            <motion.div 
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 h-full w-full max-w-md bg-brand-dark-2 z-50 p-8 md:p-12 overflow-y-auto border-l border-white/5"
            >
              <div className="flex justify-between items-center mb-16">
                <span className="text-sm font-semibold tracking-widest text-brand-gold uppercase">{t('sidebar.selectDateInfo')}</span>
                <button onClick={closeSidebar} className="text-brand-light/50 hover:text-brand-light transition-colors p-2 -mr-2">
                  <X className="w-6 h-6" />
                </button>
              </div>

              {flow === 'selection' && (
                <div className="flex flex-col gap-12">
                  <div className="space-y-4">
                    <h2 className="text-4xl font-bold tracking-tight">{t('sidebar.yourExperience')}</h2>
                    <p className="text-brand-light/60 font-light text-lg">{t('sidebar.chooseHow')}</p>
                  </div>

                  {/* Dummy Date Picker UI */}
                  <div className="border-b border-white/10 pb-8 space-y-4">
                    <label className="text-xs uppercase tracking-widest text-brand-light/40 font-semibold">{t('sidebar.desiredDate')}</label>
                    <div className="flex items-center justify-between group cursor-pointer">
                      <div className="flex items-center gap-4 text-xl">
                        <Calendar className="w-6 h-6 text-brand-gold" />
                        <span>{t('sidebar.mockDate')}</span>
                      </div>
                      <span className="text-brand-gold opacity-0 group-hover:opacity-100 transition-opacity">{t('sidebar.changeBtn')}</span>
                    </div>
                  </div>

                  <div className="flex flex-col gap-4 mt-8">
                    <button 
                      onClick={() => setFlow('checkout')}
                      className="w-full py-5 bg-brand-gold text-brand-dark font-semibold text-lg uppercase tracking-wide hover:bg-brand-light transition-colors flex items-center justify-center gap-2"
                    >
                      {t('sidebar.directCheckoutBtn')}
                    </button>
                    <button 
                      onClick={() => setFlow('concierge')}
                      className="w-full py-5 border border-white/20 text-brand-light font-semibold text-lg uppercase tracking-wide hover:border-brand-gold hover:text-brand-gold transition-colors flex items-center justify-center gap-2"
                    >
                      {t('sidebar.conciergeBtn')}
                    </button>
                  </div>
                </div>
              )}

              {flow === 'checkout' && (
                <div className="flex flex-col h-full animate-in fade-in slide-in-from-right-4 duration-500">
                  <h2 className="text-2xl font-bold mb-8">{t('checkout.title')}</h2>
                  <div className="flex-1 bg-brand-dark border border-white/5 flex flex-col items-center justify-center text-center p-8 text-brand-light/40">
                    <p className="text-sm tracking-widest uppercase mb-4 text-brand-gold">{t('checkout.placeholderTitle')}</p>
                    <p>{t('checkout.placeholderDesc')}</p>
                  </div>
                  <button onClick={() => setFlow('selection')} className="mt-8 text-brand-light/50 hover:text-brand-light text-sm uppercase tracking-widest text-left">
                    {t('checkout.backBtn')}
                  </button>
                </div>
              )}

              {flow === 'concierge' && (
                <div className="flex flex-col animate-in fade-in slide-in-from-right-4 duration-500">
                  <h2 className="text-2xl font-bold mb-4">{t('concierge.title')}</h2>
                  <p className="text-brand-light/50 text-sm mb-8">{t('concierge.desc')}</p>
                  
                  <form className="space-y-8" onSubmit={(e) => e.preventDefault()}>
                    <div className="space-y-2">
                      <label className="text-xs uppercase tracking-widest text-brand-light/40">{t('concierge.nameLabel')}</label>
                      <input type="text" className="w-full bg-transparent border-b border-white/20 pb-2 text-lg focus:outline-none focus:border-brand-gold transition-colors" placeholder={t('concierge.namePlaceholder')} />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs uppercase tracking-widest text-brand-light/40">{t('concierge.emailLabel')}</label>
                      <input type="email" className="w-full bg-transparent border-b border-white/20 pb-2 text-lg focus:outline-none focus:border-brand-gold transition-colors" placeholder={t('concierge.emailPlaceholder')} />
                    </div>
                    <button className="w-full py-5 mt-4 bg-brand-gold text-brand-dark font-semibold text-lg uppercase tracking-wide hover:bg-brand-light transition-colors">
                      {t('concierge.submitBtn')}
                    </button>
                  </form>
                  <button onClick={() => setFlow('selection')} className="mt-12 text-brand-light/50 hover:text-brand-light text-sm uppercase tracking-widest text-left">
                    {t('checkout.backBtn')}
                  </button>
                </div>
              )}

            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
