import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import '../i18n/config';

interface Activity {
  time: string;
  title: string;
  desc: string;
}

interface AgendaDay {
  dayStr: string;
  label: string;
  activities: Activity[];
}

interface AgendaProps {
  destination: 'menorca' | 'bali' | 'dubai';
}

export default function Agenda({ destination }: AgendaProps) {
  const { t } = useTranslation();
  
  const agendaItems = t(`${destination}Page.agenda`, { returnObjects: true }) as AgendaDay[];
  const [activeTab, setActiveTab] = useState(0);

  // Fallback if data is not loaded yet
  if (!agendaItems || !Array.isArray(agendaItems) || agendaItems.length === 0) {
    return null;
  }

  const currentDay = agendaItems[activeTab];

  return (
    <section className="bg-brand-dark-2 py-32 px-8 md:px-16" id="agenda">
      <div className="max-w-5xl mx-auto">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl font-light mb-16 tracking-wide text-center"
        >
          {t(`${destination}Page.agendaTitle`)}
        </motion.h2>

        {/* Tab Navigation */}
        <div className="flex flex-wrap md:flex-nowrap justify-center gap-2 md:gap-4 mb-20 border-b border-white/10 pb-4 relative">
          {agendaItems.map((day, idx) => (
            <button
              key={idx}
              onClick={() => setActiveTab(idx)}
              className={`pb-4 px-4 md:px-8 text-sm md:text-lg font-medium tracking-widest uppercase transition-all duration-300 relative whitespace-nowrap ${
                activeTab === idx ? 'text-brand-gold' : 'text-white/40 hover:text-white/80'
              }`}
            >
              <span className="block mb-2 text-xs opacity-60 font-mono tracking-widest">{day.dayStr}</span>
              {day.label}
              {activeTab === idx && (
                <motion.div 
                  layoutId="agendaTabIndicator"
                  className="absolute bottom-[-18px] left-0 right-0 h-[2px] bg-brand-gold"
                />
              )}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="min-h-[400px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="space-y-12"
            >
              {currentDay.activities && currentDay.activities.map((activity, actIdx) => (
                <div key={actIdx} className="group relative pl-12 md:pl-0 flex flex-col md:flex-row md:items-start gap-6 border-b border-white/5 pb-12 last:border-b-0 hover:border-brand-gold/30 transition-colors duration-500">
                  
                  {/* Timeline track (Mobile) */}
                  <div className="md:hidden absolute left-4 top-0 bottom-[-48px] w-px bg-white/10 group-last:hidden" />
                  <div className="md:hidden absolute left-4 top-2 w-2 h-2 -translate-x-[3.5px] rounded-full bg-brand-gold shadow-[0_0_12px_rgba(209,160,84,0.6)]" />
                  
                  <div className="md:w-1/4 pt-1 flex md:justify-end md:pr-12">
                    <span className="text-brand-gold font-mono text-xl md:text-2xl tracking-widest">{activity.time}</span>
                  </div>
                  
                  {/* Timeline track (Desktop) */}
                  <div className="hidden md:block relative px-12 pb-8 border-l border-white/10 group-last:border-transparent group-hover:border-brand-gold/30 transition-colors duration-500">
                    <div className="absolute left-[-4.5px] top-3 w-[9px] h-[9px] rounded-full bg-brand-gold shadow-[0_0_12px_rgba(209,160,84,0.6)]" />
                    
                    <h3 className="text-2xl md:text-3xl font-light mb-4 text-white/90 group-hover:text-white transition-colors duration-300">
                      {activity.title}
                    </h3>
                    <p className="text-white/50 text-lg leading-relaxed max-w-2xl group-hover:text-white/70 transition-colors duration-300">
                      {activity.desc}
                    </p>
                  </div>
                  
                  {/* Mobile Content */}
                  <div className="md:hidden">
                    <h3 className="text-2xl font-light mb-3 text-white/90 group-hover:text-white transition-colors">
                      {activity.title}
                    </h3>
                    <p className="text-white/50 text-base leading-relaxed">
                      {activity.desc}
                    </p>
                  </div>
                  
                </div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
