import React from 'react';
import { motion } from 'framer-motion';
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



  return (
    <>
      <section className="relative w-screen h-screen overflow-hidden flex items-end pb-32 px-8 md:px-16" >
        <div className="absolute inset-0 w-full h-full z-0 bg-brand-dark">
          {bgVideoSrc ? (
            <video 
              src={bgVideoSrc}
              autoPlay
              muted 
              loop
              playsInline
              className={`absolute inset-0 w-full h-full object-cover scale-105 opacity-100`}
            />
          ) : bgImageSrc ? (
            <img 
              src={bgImageSrc}
              className={`absolute inset-0 w-full h-full object-cover scale-105 opacity-100`}
              alt={destination}
            />
          ) : (
            <div className="absolute inset-0 w-full h-full bg-brand-dark-2" />
          )}
          <div className="absolute inset-0 bg-brand-dark/50 bg-gradient-to-t from-brand-dark via-brand-dark/20 to-transparent z-20"></div>
        </div>

        <div className="relative z-10 w-full max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-end gap-12">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="max-w-3xl"
          >
            <h1 className="text-6xl md:text-8xl font-black mb-4 tracking-tighter text-transparent bg-clip-text bg-gradient-to-br from-brand-gold to-white">
              {t(`${destination}Page.heroTitle`)}
            </h1>
            <p className="mt-8 text-xl md:text-3xl font-light tracking-wide text-brand-light/90 max-w-2xl">
              {t(`${destination}Page.heroSubtitle`)}
            </p>
            {destination === 'menorca' && (
              <p className="mt-4 text-sm md:text-base font-semibold uppercase tracking-widest text-brand-gold">
                {t(`${destination}Page.heroMeta`)}
              </p>
            )}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            <button
              onClick={() => {
                const roomsSection = document.getElementById('rooms');
                if (roomsSection) {
                  roomsSection.scrollIntoView({ behavior: 'smooth' });
                }
              }}
              className="btn-luxury group"
            >
              {t(`${destination}Page.bookBtn`)}
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" />
            </button>
          </motion.div>
        </div>
      </section>

    </>
  );
}
