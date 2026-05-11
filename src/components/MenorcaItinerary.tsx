import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import '../i18n/config';

interface Activity {
  time: string;
  title: string;
  desc: string;
  image: string;
}

interface Day {
  dayStr: string;
  date: string;
  label: string;
  activities: Activity[];
}

// Days data is now fetched from i18n config

export default function MenorcaItinerary() {
  const { t } = useTranslation();
  const days = t('menorcaPage.agenda', { returnObjects: true }) as Day[];

  const [activeDay, setActiveDay] = useState(0);

  const current = days[activeDay];
  const acts = current.activities;

  return (
    <section id="itinerary" aria-label="Menorca padel retreat 5-day itinerary" className="bg-brand-dark py-24 md:py-32 overflow-hidden">
      <div className="max-w-5xl mx-auto px-4 md:px-8">

        {/* Header */}
        <div className="text-center mb-12">
          <p className="text-xs uppercase tracking-[0.3em] text-brand-gold font-semibold mb-3">{t('menorcaPage.itineraryEyebrow')}</p>
          <h2 className="text-5xl md:text-6xl font-light text-white tracking-wide">{t('menorcaPage.itineraryTitle')}</h2>
        </div>

        {/* Day tabs */}
        <div className="flex justify-center flex-wrap gap-y-4 mb-8">
          {days.map((day, idx) => (
            <button
              key={day.dayStr}
              onClick={() => setActiveDay(idx)}
              className="relative px-4 md:px-8 py-4 text-center group"
            >
              <span className="block text-[10px] font-mono text-brand-gold mb-1 tracking-widest">{day.dayStr}</span>
              <span className={`block text-[11px] md:text-xs uppercase tracking-[0.18em] font-medium transition-colors duration-150 ${
                activeDay === idx ? 'text-white' : 'text-white/25 group-hover:text-white/50'
              }`}>
                {day.label}
              </span>
              {activeDay === idx && (
                <motion.div
                  layoutId="day-indicator"
                  className="absolute bottom-0 left-0 right-0 h-px bg-brand-gold"
                />
              )}
            </button>
          ))}
        </div>
        <div className="w-full h-px bg-white/8 mb-12" />

        {/* Grid of Activities */}
        <AnimatePresence mode="wait">
          <motion.div 
            key={`grid-${activeDay}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8"
          >
            {acts.map((act, idx) => (
              <motion.div
                key={`${activeDay}-${idx}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                className="flex flex-col bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl overflow-hidden shadow-2xl hover:bg-white/10 transition-colors duration-300"
              >
                <div className="relative h-56 md:h-64 w-full overflow-hidden">
                  <img
                    src={act.image}
                    alt={act.title}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent pointer-events-none" />
                  <div className="absolute bottom-4 left-4">
                    <span className="inline-block font-mono text-brand-gold text-sm tracking-widest px-4 py-1.5 bg-black/50 backdrop-blur-sm rounded-full border border-white/10 shadow-lg">
                      {act.time}
                    </span>
                  </div>
                </div>
                <div className="p-6 md:p-8 flex-1 flex flex-col justify-start">
                  <h3 className="text-white text-2xl font-light mb-3 leading-snug">
                    {act.title}
                  </h3>
                  <p className="text-white/60 text-sm leading-relaxed">
                    {act.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

      </div>
    </section>
  );
}
