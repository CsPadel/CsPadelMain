import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

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

const days: Day[] = [
  {
    dayStr: 'Day 01',
    date: 'Tue 30 Sep',
    label: 'Arrival & Warm-Up',
    activities: [
      {
        time: 'Morning',
        title: 'Airport Transfers & Check-In',
        desc: 'Private transfers from the airport to Barceló Nura. Welcome drinks on arrival and welcome packs in rooms.',
        image: '/imagenes/IMG_2914.JPG',
      },
      {
        time: '14:00 – 16:30',
        title: 'Settle In & Hotel Amenities',
        desc: 'Time to unwind at Barceló Nura. Pool and spa available to all guests.',
        image: '/imagenes/154A8644.JPG',
      },
      {
        time: '17:00 – 18:30',
        title: 'Light Padel & Social Games',
        desc: 'Easy intro session at Padelin. Mixers to warm up the group in a relaxed, social format.',
        image: '/imagenes/EM-4.jpg',
      },
      {
        time: '20:00',
        title: 'Welcome Dinner — Ses Forquilles',
        desc: 'Opening dinner at Ses Forquilles restaurant in Mahón. Group reservation confirmed.',
        image: '/imagenes/bambu.jpg',
      },
    ],
  },
  {
    dayStr: 'Day 02',
    date: 'Wed 1 Oct',
    label: 'Padel & Boat Tour',
    activities: [
      {
        time: '08:30 – 09:15',
        title: 'Breakfast — Barceló Nura',
        desc: 'Group breakfast with reserved seating at the hotel. Fuel up before a full morning on court.',
        image: '/imagenes/bambu.jpg',
      },
      {
        time: '10:00 – 12:00',
        title: 'Padel Coaching & Matchplay',
        desc: 'Court sessions at Padelin with coach-led drills and competitive matchplay.',
        image: '/imagenes/EM-22.jpg',
      },
      {
        time: '13:45 – 17:30',
        title: 'Lunch & Boat Tour — Sa Punta',
        desc: 'Lunch at Sa Punta restaurant followed by a charter boat tour from Es Castell.',
        image: '/imagenes/Cala en porter.jpg',
      },
      {
        time: '20:00',
        title: 'Dinner — Hotel / Free Evening',
        desc: 'Hotel meal included. Concierge available to assist with restaurant recommendations.',
        image: '/imagenes/2313 copy.jpg',
      },
    ],
  },
  {
    dayStr: 'Day 03',
    date: 'Thu 2 Oct',
    label: 'Padel & Vineyard',
    activities: [
      {
        time: '08:30 – 09:15',
        title: 'Breakfast — Barceló Nura',
        desc: 'Group breakfast with reserved seating. Skill-grouped sessions briefed at the table.',
        image: '/imagenes/bambu.jpg',
      },
      {
        time: '10:00 – 12:00',
        title: 'Padel Coaching & Matches',
        desc: 'Skill-grouped sessions at Padelin. Technical improvement and competitive play.',
        image: '/imagenes/EM-53.jpg',
      },
      {
        time: '13:30 – 16:30',
        title: 'Vineyard Tour & Lunch — Binifadet',
        desc: 'Tour and lunch at Binifadet winery. Wine & cheese tasting included.',
        image: '/imagenes/binifadet.jpeg',
      },
      {
        time: '20:00',
        title: 'Dinner — La Calita',
        desc: 'Dinner at La Calita restaurant. Hotel meal included.',
        image: '/imagenes/2313 copy.jpg',
      },
    ],
  },
  {
    dayStr: 'Day 04',
    date: 'Fri 3 Oct',
    label: 'Tournament & Sunset',
    activities: [
      {
        time: '07:30 – 08:15',
        title: 'Early Breakfast — Barceló Nura',
        desc: 'Tournament day starts early. Hydration packs ready and group seating reserved.',
        image: '/imagenes/bambu.jpg',
      },
      {
        time: '09:00 – 13:00',
        title: 'Padel Tournament — Padelin',
        desc: 'Mixed doubles round-robin tournament at Padelin. Trophy and prizes confirmed with venue.',
        image: '/imagenes/JOPS-1071.JPG',
      },
      {
        time: '13:00 – 14:30',
        title: 'Tournament Lunch & Awards',
        desc: 'On-site lunch at Padelin followed by the awards and trophy presentation ceremony.',
        image: '/imagenes/2808 copy.jpg',
      },
      {
        time: '17:00 – 19:00',
        title: "Sunset & Tapas — Cova d'en Xoroi",
        desc: "Live music, tapas and cocktails at the iconic Cova d'en Xoroi. Sunset at ~19:30.",
        image: '/imagenes/cap roig.jpg',
      },
    ],
  },
  {
    dayStr: 'Day 05',
    date: 'Sat 4 Oct',
    label: 'Departure',
    activities: [
      {
        time: '08:30 – 09:15',
        title: 'Final Breakfast — Barceló Nura',
        desc: 'Last group breakfast together. Luggage out by 11:00.',
        image: '/imagenes/bambu.jpg',
      },
      {
        time: '10:30 – 13:00',
        title: 'Optional Padel Session — Padelin',
        desc: 'Casual open-court session for those whose flights allow. Entirely optional.',
        image: '/imagenes/EM-81.jpg',
      },
      {
        time: 'From 11:00',
        title: 'Check-Out & Transfers to Airport',
        desc: 'Private transfers per individual flight time. Late checkout available on request.',
        image: '/imagenes/IMG_2914.JPG',
      },
    ],
  },
];

export default function MenorcaItinerary() {
  const [activeDay, setActiveDay] = useState(0);
  const [activeActivity, setActiveActivity] = useState(0);

  const current = days[activeDay];
  const acts = current.activities;
  const total = acts.length;
  const prev = (activeActivity - 1 + total) % total;
  const next = (activeActivity + 1) % total;

  const handleDayChange = (idx: number) => {
    setActiveDay(idx);
    setActiveActivity(0);
  };

  const handleNext = () => setActiveActivity(next);
  const handlePrev = () => setActiveActivity(prev);

  return (
    <section id="itinerary" aria-label="Menorca padel retreat 5-day itinerary" className="bg-brand-dark py-24 md:py-32 overflow-hidden">
      <div className="max-w-5xl mx-auto px-4 md:px-8">

        {/* Header */}
        <div className="text-center mb-12">
          <p className="text-xs uppercase tracking-[0.3em] text-brand-gold font-semibold mb-3">Programme</p>
          <h2 className="text-5xl md:text-6xl font-light text-white tracking-wide">The Itinerary</h2>
        </div>

        {/* Day tabs */}
        <div className="flex justify-center">
          {days.map((day, idx) => (
            <button
              key={day.dayStr}
              onClick={() => handleDayChange(idx)}
              className="relative px-5 md:px-8 py-4 text-center group"
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

        {/* Three-image carousel */}
        <div className="flex items-center justify-center gap-4 md:gap-6 mb-10">

          {/* Left image */}
          <button
            onClick={handlePrev}
            aria-label="Previous activity"
            className="flex-shrink-0 focus:outline-none"
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={`left-${activeDay}-${prev}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="w-32 md:w-44 h-52 md:h-72 rounded-2xl overflow-hidden opacity-50 hover:opacity-65 transition-opacity duration-200"
              >
                <img
                  src={acts[prev].image}
                  alt={acts[prev].title}
                  className="w-full h-full object-cover"
                  loading="lazy"
                  width={350}
                  height={450}
                />
              </motion.div>
            </AnimatePresence>
          </button>

          {/* Center image */}
          <div className="flex-shrink-0">
            <AnimatePresence mode="wait">
              <motion.div
                key={`center-${activeDay}-${activeActivity}`}
                initial={{ opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.97 }}
                transition={{ duration: 0.22 }}
                className="w-44 md:w-60 h-72 md:h-96 rounded-2xl overflow-hidden shadow-2xl shadow-black/40"
              >
                <img
                  src={acts[activeActivity].image}
                  alt={acts[activeActivity].title}
                  className="w-full h-full object-cover"
                  loading="eager"
                  width={480}
                  height={640}
                />
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Right image */}
          <button
            onClick={handleNext}
            aria-label="Next activity"
            className="flex-shrink-0 focus:outline-none"
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={`right-${activeDay}-${next}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="w-32 md:w-44 h-52 md:h-72 rounded-2xl overflow-hidden opacity-50 hover:opacity-65 transition-opacity duration-200"
              >
                <img
                  src={acts[next].image}
                  alt={acts[next].title}
                  className="w-full h-full object-cover"
                  loading="lazy"
                  width={350}
                  height={450}
                />
              </motion.div>
            </AnimatePresence>
          </button>
        </div>

        {/* Activity info + navigation */}
        <div className="flex items-center justify-center gap-6 max-w-lg mx-auto">
          <button
            onClick={handlePrev}
            aria-label="Previous activity"
            className="text-white/30 hover:text-white/70 transition-colors duration-150 text-xl font-light flex-shrink-0 w-8 text-center"
          >
            ‹
          </button>

          <AnimatePresence mode="wait">
            <motion.div
              key={`info-${activeDay}-${activeActivity}`}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.2 }}
              className="flex-1 text-center"
            >
              <h3 className="text-white text-xl md:text-2xl font-light mb-2 leading-snug">
                {acts[activeActivity].title}
              </h3>
              <p className="text-white/45 text-sm leading-relaxed mb-4 max-w-sm mx-auto">
                {acts[activeActivity].desc}
              </p>
              <span className="inline-block font-mono text-brand-gold text-base tracking-widest">
                {acts[activeActivity].time}
              </span>
            </motion.div>
          </AnimatePresence>

          <button
            onClick={handleNext}
            aria-label="Next activity"
            className="text-white/30 hover:text-white/70 transition-colors duration-150 text-xl font-light flex-shrink-0 w-8 text-center"
          >
            ›
          </button>
        </div>

        {/* Dot indicators */}
        <div className="flex justify-center gap-2 mt-8">
          {acts.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setActiveActivity(idx)}
              aria-label={`Activity ${idx + 1}`}
              className={`rounded-full transition-all duration-200 ${
                activeActivity === idx
                  ? 'w-6 h-1.5 bg-brand-gold'
                  : 'w-1.5 h-1.5 bg-white/20 hover:bg-white/40'
              }`}
            />
          ))}
        </div>

      </div>
    </section>
  );
}
