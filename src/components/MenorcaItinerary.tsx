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
      {
        time: '14:00',
        title: 'VIP Transfer & Check-in',
        desc: 'Private transport from Mahón Airport. Welcome mocktails and settling into suites.',
        image: '/imagenes/DSC_1523.JPG',
      },
      {
        time: '16:00',
        title: 'Wellness Assessment & Massage',
        desc: 'Deep tissue sports massage to release travel tension and baseline fitness checks.',
        image: '/imagenes/1685 copy.jpg',
      },
      {
        time: '19:00',
        title: 'Welcome Dinner & Networking',
        desc: 'Opening gala featuring Mediterranean gourmet dining and program briefing by the Head Coach.',
        image: '/imagenes/bambu.jpg',
      },
    ],
  },
  {
    dayStr: 'Day 02',
    label: 'Foundation',
    heroImage: '/imagenes/EM-2.jpg',
    activities: [
      {
        time: '08:00',
        title: 'Technical Padel Clinic',
        desc: "On-court intensive focusing on stroke mechanics, positioning, and the 'bandeja'.",
        image: '/imagenes/EM-4.jpg',
      },
      {
        time: '12:00',
        title: 'Infinity Pool Recovery',
        desc: 'Contrast bathing, saunas, and organic nutrition stations by the private pool.',
        image: '/imagenes/154A8644.JPG',
      },
      {
        time: '16:00',
        title: 'Match Strategy Session',
        desc: "Video analysis of the morning's performance breaking down tactical improvements.",
        image: '/imagenes/EM-22.jpg',
      },
      {
        time: '20:00',
        title: 'Leisure Evening',
        desc: 'Free evening. Recommendations for top-tier local restaurants managed by your Concierge.',
        image: '/imagenes/2313 copy.jpg',
      },
    ],
  },
  {
    dayStr: 'Day 03',
    label: 'Pro-Am & Yacht',
    heroImage: '/imagenes/JOPS-1071.JPG',
    activities: [
      {
        time: '08:30',
        title: 'Pro-Am Match Play',
        desc: 'Intense, competitive tournament-style matches alongside professional players.',
        image: '/imagenes/EM-53.jpg',
      },
      {
        time: '13:00',
        title: 'Charter Yacht Escape',
        desc: 'Afternoon sailing to secluded coves. Premium catering and ocean relaxation.',
        image: '/imagenes/Cala en porter.jpg',
      },
      {
        time: '18:00',
        title: 'Active Recovery',
        desc: 'On-deck physiotherapy and stretching sessions with the sunset.',
        image: '/imagenes/cap roig.jpg',
      },
    ],
  },
  {
    dayStr: 'Day 04',
    label: 'Departure',
    heroImage: '/imagenes/EM-67.jpg',
    activities: [
      {
        time: '09:00',
        title: 'Exhibition Matches',
        desc: 'Open play to finalise advanced tactics in a relaxed, competitive environment.',
        image: '/imagenes/EM-81.jpg',
      },
      {
        time: '13:00',
        title: 'Farewell Banquet',
        desc: 'Distribution of detailed performance dossiers and personalised luxury gifts.',
        image: '/imagenes/2808 copy.jpg',
      },
      {
        time: '15:00',
        title: 'Executive Check-out',
        desc: 'Private goodbyes and seamless airport transfers back to Mahón.',
        image: '/imagenes/IMG_2914.JPG',
      },
    ],
  },
];

export default function MenorcaItinerary() {
  const [activeDay, setActiveDay] = useState(0);
  const [hoveredActivity, setHoveredActivity] = useState<number | null>(null);

  const currentDay = days[activeDay];
  const displayImage =
    hoveredActivity !== null
      ? currentDay.activities[hoveredActivity]?.image
      : currentDay.heroImage;

  return (
    <section
      id="itinerary"
      aria-label="Menorca padel retreat 4-day itinerary"
      className="bg-brand-dark-2 py-24 md:py-32"
    >
      {/* Title */}
      <div className="px-6 md:px-16 max-w-7xl mx-auto mb-16">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl font-light text-center text-brand-light tracking-wide"
        >
          The Itinerary
        </motion.h2>
        <p className="text-brand-light/40 text-center mt-4 text-lg max-w-lg mx-auto">
          Four days designed to perform, recover, and connect.
        </p>
      </div>

      {/* Day tabs */}
      <div className="px-6 md:px-16 max-w-7xl mx-auto">
        <div className="flex flex-wrap md:flex-nowrap justify-center gap-2 md:gap-0 mb-16 border-b border-white/10 relative">
          {days.map((day, idx) => (
            <button
              key={idx}
              onClick={() => { setActiveDay(idx); setHoveredActivity(null); }}
              className={`pb-5 px-6 md:px-10 text-sm md:text-base font-medium tracking-widest uppercase transition-all duration-300 relative whitespace-nowrap ${
                activeDay === idx ? 'text-brand-gold' : 'text-white/35 hover:text-white/70'
              }`}
            >
              <span className="block mb-1.5 text-xs opacity-50 font-mono tracking-widest">{day.dayStr}</span>
              {day.label}
              {activeDay === idx && (
                <motion.div
                  layoutId="itineraryTab"
                  className="absolute bottom-[-2px] left-0 right-0 h-[2px] bg-brand-gold"
                />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Content: split layout */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeDay}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -16 }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
          className="px-6 md:px-16 max-w-7xl mx-auto flex flex-col lg:flex-row gap-12 lg:gap-16 items-start"
        >
          {/* Left: activity timeline */}
          <div className="w-full lg:w-1/2 flex flex-col">
            {currentDay.activities.map((activity, idx) => (
              <div
                key={idx}
                onMouseEnter={() => setHoveredActivity(idx)}
                onMouseLeave={() => setHoveredActivity(null)}
                className={`group flex gap-6 md:gap-10 border-b border-white/8 py-8 last:border-b-0 cursor-default transition-all duration-300 ${
                  hoveredActivity === idx ? 'opacity-100' : hoveredActivity !== null ? 'opacity-40' : 'opacity-100'
                }`}
              >
                {/* Time */}
                <div className="w-16 flex-shrink-0 pt-1">
                  <span className="font-mono text-brand-gold text-lg md:text-xl tracking-widest">
                    {activity.time}
                  </span>
                </div>

                {/* Dot + line */}
                <div className="relative flex flex-col items-center flex-shrink-0">
                  <div
                    className={`w-2.5 h-2.5 rounded-full mt-2 transition-all duration-300 shadow-[0_0_10px_rgba(217,173,98,0.5)] ${
                      hoveredActivity === idx ? 'bg-brand-gold scale-125' : 'bg-brand-gold/60'
                    }`}
                  />
                  <div className="flex-1 w-px bg-white/10 mt-3 group-last:hidden" />
                </div>

                {/* Text + mobile image */}
                <div className="flex-1 pb-2">
                  <h3 className="text-xl md:text-2xl font-light text-white/90 mb-2 leading-snug group-hover:text-white transition-colors">
                    {activity.title}
                  </h3>
                  <p className="text-white/45 text-base leading-relaxed group-hover:text-white/65 transition-colors">
                    {activity.desc}
                  </p>

                  {/* Mobile-only image per activity */}
                  <div className="lg:hidden mt-5 overflow-hidden h-48">
                    <img
                      src={activity.image}
                      alt={`${activity.title} — CourtSide Menorca padel retreat`}
                      className="w-full h-full object-cover"
                      loading="lazy"
                      width={600}
                      height={300}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Right: sticky image panel (desktop only) */}
          <div className="hidden lg:block w-full lg:w-1/2 sticky top-28 self-start">
            <div className="relative overflow-hidden aspect-[4/3]">
              <AnimatePresence mode="wait">
                <motion.img
                  key={displayImage}
                  src={displayImage}
                  alt={
                    hoveredActivity !== null
                      ? `${currentDay.activities[hoveredActivity]?.title} — CourtSide Menorca`
                      : `${currentDay.label} — CourtSide Menorca padel retreat`
                  }
                  className="absolute inset-0 w-full h-full object-cover"
                  initial={{ opacity: 0, scale: 1.04 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5, ease: 'easeOut' }}
                  loading="lazy"
                  width={800}
                  height={600}
                />
              </AnimatePresence>

              {/* Day label overlay */}
              <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-brand-dark/80 to-transparent">
                <p className="text-xs uppercase tracking-widest text-brand-gold font-semibold mb-1">
                  {currentDay.dayStr}
                </p>
                <p className="text-white text-xl font-light">
                  {hoveredActivity !== null
                    ? currentDay.activities[hoveredActivity]?.title
                    : currentDay.label}
                </p>
              </div>

              {/* Activity thumbnails strip */}
              <div className="absolute top-4 right-4 flex flex-col gap-2">
                {currentDay.activities.map((act, idx) => (
                  <button
                    key={idx}
                    onMouseEnter={() => setHoveredActivity(idx)}
                    onMouseLeave={() => setHoveredActivity(null)}
                    className={`w-14 h-10 overflow-hidden border transition-all duration-200 ${
                      hoveredActivity === idx
                        ? 'border-brand-gold opacity-100'
                        : 'border-white/20 opacity-50 hover:opacity-80'
                    }`}
                    aria-label={act.title}
                  >
                    <img
                      src={act.image}
                      alt=""
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  </button>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </section>
  );
}
