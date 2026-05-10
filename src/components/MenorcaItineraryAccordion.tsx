import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';

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

export default function MenorcaItineraryAccordion() {
  const { t } = useTranslation();
  const days = t('menorcaPage.agenda', { returnObjects: true }) as Day[];
  
  const [openDay, setOpenDay] = useState<number | null>(0); // Default open first day

  const toggleDay = (idx: number) => {
    setOpenDay(openDay === idx ? null : idx);
  };

  return (
    <section aria-label="Menorca padel retreat 5-day itinerary (Accordion)" className="bg-brand-dark py-24 md:py-32 overflow-hidden border-t border-white/10">
      <div className="max-w-4xl mx-auto px-4 md:px-8">
        
        {/* Header */}
        <div className="text-center mb-16">
          <p className="text-xs uppercase tracking-[0.3em] text-brand-gold font-semibold mb-3">Option 2 (Test)</p>
          <h2 className="text-4xl md:text-5xl font-light text-white tracking-wide">The Itinerary (Accordion)</h2>
        </div>

        <div className="space-y-4">
          {days.map((day, idx) => {
            const isOpen = openDay === idx;
            return (
              <div key={day.dayStr} className="border border-white/10 rounded-xl overflow-hidden bg-white/5 backdrop-blur-sm">
                
                {/* Accordion Header */}
                <button
                  onClick={() => toggleDay(idx)}
                  className="w-full px-4 md:px-6 py-6 flex items-center justify-between text-left focus:outline-none group hover:bg-white/5 transition-colors"
                >
                  <div className="flex items-center gap-4 md:gap-6">
                    <div className="w-14 md:w-16">
                      <span className="block font-mono text-brand-gold text-xs md:text-sm tracking-widest">{day.dayStr}</span>
                    </div>
                    <div>
                      <h3 className="text-white text-lg md:text-2xl font-light">{day.label}</h3>
                      <span className="block text-white/50 text-xs md:text-sm mt-1">{day.date}</span>
                    </div>
                  </div>
                  <div className={`w-8 h-8 rounded-full border border-white/20 flex items-center justify-center transition-transform duration-300 flex-shrink-0 ${isOpen ? 'rotate-180 bg-brand-gold border-brand-gold text-brand-dark' : 'text-white group-hover:border-white/50'}`}>
                    <svg width="12" height="8" viewBox="0 0 12 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M1 1.5L6 6.5L11 1.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                </button>

                {/* Accordion Content */}
                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: 'easeInOut' }}
                      className="overflow-hidden"
                    >
                      <div className="p-4 md:p-6 pt-0 border-t border-white/10 mt-2">
                        <div className="flex flex-col gap-8 mt-6">
                          {day.activities.map((act, actIdx) => (
                            <div key={actIdx} className="flex flex-col md:flex-row gap-4 md:gap-6 items-start">
                              {/* Small Image Thumbnail */}
                              <div className="flex-shrink-0 w-full md:w-32 h-48 md:h-24 rounded-lg overflow-hidden shadow-lg border border-white/10 relative group">
                                <img src={act.image} alt={act.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" loading="lazy" />
                              </div>
                              
                              {/* Details */}
                              <div className="flex-1">
                                <span className="inline-block font-mono text-brand-gold text-[10px] md:text-xs tracking-widest mb-2 px-2 py-1 bg-brand-gold/10 rounded border border-brand-gold/20">
                                  {act.time}
                                </span>
                                <h4 className="text-white text-base md:text-lg font-medium mb-1.5">{act.title}</h4>
                                <p className="text-white/60 text-xs md:text-sm leading-relaxed max-w-2xl">{act.desc}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
