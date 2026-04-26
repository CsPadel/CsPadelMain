import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Activity {
  time: string;
  title: string;
  desc: string;
  image: string;
}

interface Day {
  dayStr: string;
  label: string;
  heroImage: string;
  activities: Activity[];
}

const days: Day[] = [
  {
    dayStr: 'Day 01',
    label: 'VIP Arrival',
    heroImage: '/imagenes/JOPS-721.JPG',
    activities: [
      { time: '14:00', title: 'VIP Transfer & Check-in', desc: 'Private transport from Mahón Airport. Welcome mocktails and settling into suites.', image: '/imagenes/DSC_1523.JPG' },
      { time: '16:00', title: 'Wellness Assessment & Massage', desc: 'Deep tissue sports massage to release travel tension and baseline fitness checks.', image: '/imagenes/1685 copy.jpg' },
      { time: '19:00', title: 'Welcome Dinner & Networking', desc: 'Opening gala featuring Mediterranean gourmet dining and briefing by the Head Coach.', image: '/imagenes/bambu.jpg' },
    ],
  },
  {
    dayStr: 'Day 02',
    label: 'Foundation',
    heroImage: '/imagenes/EM-2.jpg',
    activities: [
      { time: '08:00', title: 'Technical Padel Clinic', desc: "On-court intensive on stroke mechanics, positioning, and the 'bandeja'.", image: '/imagenes/EM-4.jpg' },
      { time: '12:00', title: 'Infinity Pool Recovery', desc: 'Contrast bathing, saunas, and organic nutrition stations by the private pool.', image: '/imagenes/154A8644.JPG' },
      { time: '16:00', title: 'Match Strategy Session', desc: "Video analysis of the morning's performance with tactical improvements.", image: '/imagenes/EM-22.jpg' },
      { time: '20:00', title: 'Leisure Evening', desc: 'Free evening. Curated restaurant recommendations managed by your Concierge.', image: '/imagenes/2313 copy.jpg' },
    ],
  },
  {
    dayStr: 'Day 03',
    label: 'Pro-Am & Yacht',
    heroImage: '/imagenes/JOPS-1071.JPG',
    activities: [
      { time: '08:30', title: 'Pro-Am Match Play', desc: 'Tournament-style matches alongside professional players.', image: '/imagenes/EM-53.jpg' },
      { time: '13:00', title: 'Charter Yacht Escape', desc: 'Afternoon sailing to secluded coves with premium catering.', image: '/imagenes/Cala en porter.jpg' },
      { time: '18:00', title: 'Active Recovery', desc: 'On-deck physiotherapy and stretching sessions with the sunset.', image: '/imagenes/cap roig.jpg' },
    ],
  },
  {
    dayStr: 'Day 04',
    label: 'Departure',
    heroImage: '/imagenes/EM-67.jpg',
    activities: [
      { time: '09:00', title: 'Exhibition Matches', desc: 'Open play to finalise advanced tactics in a relaxed, competitive environment.', image: '/imagenes/EM-81.jpg' },
      { time: '13:00', title: 'Farewell Banquet', desc: 'Performance dossiers and personalised luxury gifts distributed.', image: '/imagenes/2808 copy.jpg' },
      { time: '15:00', title: 'Executive Check-out', desc: 'Private goodbyes and seamless VIP airport transfers.', image: '/imagenes/IMG_2914.JPG' },
    ],
  },
];

export default function MenorcaItinerary() {
  const [activeDay, setActiveDay] = useState(0);
  const [activeActivity, setActiveActivity] = useState<number | null>(null);

  const current = days[activeDay];

  return (
    <section id="itinerary" aria-label="Menorca padel retreat 4-day itinerary" className="bg-brand-dark py-24 md:py-32 overflow-hidden">
      <div className="px-4 md:px-16 max-w-7xl mx-auto">

        {/* Header */}
        <div className="text-center mb-14">
          <p className="text-xs uppercase tracking-[0.3em] text-brand-gold font-semibold mb-3">Programme</p>
          <h2 className="text-4xl md:text-5xl font-light text-white tracking-wide">The Itinerary</h2>
          <p className="text-white/35 mt-4 text-lg max-w-md mx-auto">Four days designed to perform, recover, and connect.</p>
        </div>

        {/* Day selector pills */}
        <div className="flex justify-center gap-2 md:gap-3 mb-12 flex-wrap">
          {days.map((day, idx) => (
            <button
              key={day.dayStr}
              onClick={() => { setActiveDay(idx); setActiveActivity(null); }}
              className={`px-5 py-3 rounded-2xl text-xs md:text-sm font-medium tracking-wide transition-colors duration-150 ${
                activeDay === idx
                  ? 'bg-brand-gold text-brand-dark shadow-lg shadow-brand-gold/20'
                  : 'bg-white/5 text-white/50 hover:bg-white/10 hover:text-white/80 border border-white/8'
              }`}
            >
              <span className="block text-[10px] font-mono opacity-70 mb-0.5">{day.dayStr}</span>
              {day.label}
            </button>
          ))}
        </div>

        {/* ── DESKTOP layout ── */}
        <div className="hidden lg:grid grid-cols-2 gap-8 items-start">

          {/* Sticky image — all images stacked, CSS crossfade */}
          <div className="sticky top-28 self-start">
            <div className="relative overflow-hidden rounded-3xl aspect-[4/3] bg-brand-dark/40">

              {/* Hero image per day */}
              {days.map((day, dIdx) => (
                <img
                  key={day.heroImage}
                  src={day.heroImage}
                  alt={`${day.label} — CourtSide Menorca`}
                  className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-200 will-change-[opacity] ${
                    activeDay === dIdx && activeActivity === null ? 'opacity-100' : 'opacity-0'
                  }`}
                  loading={dIdx === 0 ? 'eager' : 'lazy'}
                  width={800}
                  height={600}
                />
              ))}

              {/* Activity images — all pre-loaded, crossfade instantly */}
              {days.map((day, dIdx) =>
                day.activities.map((act, aIdx) => (
                  <img
                    key={`${day.dayStr}-${act.image}`}
                    src={act.image}
                    alt={`${act.title} — CourtSide Menorca`}
                    className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-150 will-change-[opacity] ${
                      activeDay === dIdx && activeActivity === aIdx ? 'opacity-100' : 'opacity-0'
                    }`}
                    loading="lazy"
                    width={800}
                    height={600}
                  />
                ))
              )}

              {/* Gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/70 via-transparent to-transparent pointer-events-none rounded-3xl" />

              {/* Label */}
              <div className="absolute bottom-0 left-0 right-0 p-7">
                <p className="text-[11px] uppercase tracking-[0.25em] text-brand-gold font-semibold mb-1">
                  {current.dayStr} · {current.label}
                </p>
                <p className="text-white text-xl font-light transition-all duration-150">
                  {activeActivity !== null ? current.activities[activeActivity]?.title : current.label}
                </p>
              </div>

              {/* Thumbnail strip */}
              <div className="absolute top-4 right-4 flex flex-col gap-2 z-10">
                {current.activities.map((act, idx) => (
                  <button
                    key={act.image}
                    onMouseEnter={() => setActiveActivity(idx)}
                    onMouseLeave={() => setActiveActivity(null)}
                    className={`w-12 h-9 overflow-hidden rounded-lg border-2 transition-all duration-150 ${
                      activeActivity === idx
                        ? 'border-brand-gold opacity-100 scale-110'
                        : 'border-white/20 opacity-45 hover:opacity-75'
                    }`}
                    aria-label={act.title}
                  >
                    <img src={act.image} alt="" className="w-full h-full object-cover" loading="lazy" />
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Activity list */}
          <div className="flex flex-col gap-3">
            <AnimatePresence mode="sync">
              {current.activities.map((activity, idx) => {
                const isActive = activeActivity === idx;
                return (
                  <motion.div
                    key={`${current.dayStr}-${idx}`}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.2, delay: idx * 0.04 }}
                    onMouseEnter={() => setActiveActivity(idx)}
                    onMouseLeave={() => setActiveActivity(null)}
                    className={`rounded-2xl p-6 cursor-default transition-colors duration-150 border ${
                      isActive
                        ? 'bg-white/8 border-brand-gold/30 shadow-lg shadow-brand-gold/5'
                        : 'bg-white/3 border-white/6 hover:bg-white/6 hover:border-white/15'
                    }`}
                  >
                    <div className="flex items-start gap-5">
                      {/* Time badge */}
                      <div className={`flex-shrink-0 w-16 h-8 rounded-full flex items-center justify-center text-xs font-mono tracking-widest transition-colors duration-150 ${
                        isActive ? 'bg-brand-gold text-brand-dark' : 'bg-white/8 text-brand-gold/70'
                      }`}>
                        {activity.time}
                      </div>

                      <div className="flex-1 min-w-0">
                        <h3 className={`text-lg font-light leading-snug transition-colors duration-150 ${isActive ? 'text-white' : 'text-white/70'}`}>
                          {activity.title}
                        </h3>
                        <div className={`overflow-hidden transition-all duration-200 ${isActive ? 'max-h-20 opacity-100 mt-2' : 'max-h-0 opacity-0'}`}>
                          <p className="text-white/50 text-sm leading-relaxed">{activity.desc}</p>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        </div>

        {/* ── MOBILE layout: cards with images ── */}
        <div className="lg:hidden">
          {/* Day hero */}
          <div className="relative overflow-hidden rounded-3xl aspect-video mb-5 bg-brand-dark/40">
            {days.map((day, dIdx) => (
              <img
                key={day.heroImage}
                src={day.heroImage}
                alt={`${day.label} — CourtSide Menorca`}
                className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-200 will-change-[opacity] ${activeDay === dIdx ? 'opacity-100' : 'opacity-0'}`}
                loading={dIdx === 0 ? 'eager' : 'lazy'}
                width={800}
                height={450}
              />
            ))}
            <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/70 to-transparent" />
            <div className="absolute bottom-5 left-5">
              <p className="text-[10px] uppercase tracking-widest text-brand-gold mb-1 font-semibold">{current.dayStr}</p>
              <p className="text-white text-lg font-light">{current.label}</p>
            </div>
          </div>

          {/* Activity cards */}
          <div className="flex flex-col gap-4">
            {current.activities.map((activity, idx) => (
              <motion.div
                key={`${current.dayStr}-mob-${idx}`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.18, delay: idx * 0.05 }}
                className="rounded-2xl overflow-hidden bg-white/5 border border-white/8"
              >
                <div className="relative h-44 overflow-hidden bg-brand-dark/20">
                  <img
                    src={activity.image}
                    alt={`${activity.title} — CourtSide Menorca`}
                    className="w-full h-full object-cover"
                    loading="lazy"
                    width={600}
                    height={250}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/60 to-transparent" />
                  <div className="absolute top-3 left-3">
                    <span className="bg-brand-gold text-brand-dark text-xs font-mono font-semibold px-3 py-1 rounded-full tracking-widest">
                      {activity.time}
                    </span>
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="text-white text-lg font-light mb-1.5">{activity.title}</h3>
                  <p className="text-white/50 text-sm leading-relaxed">{activity.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
