import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const events = [
  {
    date: 'September 2026',
    title: 'Autumn Retreat',
    subtitle: '30 Sep – 4 Oct · Ideal climate, fewer crowds',
    desc: 'Five days of padel, vineyard visits, boat tours and a full tournament in the perfect Mediterranean autumn.',
    image: '/imagenes/binifadet.jpeg',
    alt: 'Autumn padel retreat Menorca 2026 — CourtSide',
  },
  {
    date: 'August 2026',
    title: 'Summer Bank',
    subtitle: 'Peak Mediterranean season',
    desc: 'The most vibrant edition of the retreat. Long evenings, warm sea and the best padel coaching of the year.',
    image: '/imagenes/cap roig.jpg',
    alt: 'Summer Bank padel retreat Menorca 2026 — CourtSide',
  },
  {
    date: 'December 2026',
    title: 'Christmas Holiday',
    subtitle: 'A winter luxury escape',
    desc: 'Escape the cold. Menorca in December is tranquil, exclusive and uniquely beautiful — a retreat unlike any other.',
    image: '/imagenes/sa punta.jpg',
    alt: 'Christmas Holiday padel retreat Menorca 2026 — CourtSide',
  },
];

export default function LicenceToLive() {
  const [active, setActive] = useState(0);

  const total = events.length;

  const go = (idx: number) => setActive(idx);

  const goNext = () => go((active + 1) % total);
  const goPrev = () => go((active - 1 + total) % total);

  const e = events[active];

  return (
    <section id="events" aria-label="Seasonal padel retreat events in Menorca" className="bg-white py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-6 md:px-16">

        {/* Header */}
        <div className="text-center mb-14">
          <p className="text-xs uppercase tracking-[0.3em] text-brand-gold font-semibold mb-3">Seasons</p>
          <h2 className="text-4xl md:text-5xl font-light text-brand-dark tracking-wide">Licence to live</h2>
          <p className="text-brand-dark/50 text-lg mt-4 max-w-md mx-auto">
            Choose your season. Each retreat offers a unique Menorca experience.
          </p>
        </div>

      </div>

      {/* Carousel row — arrows outside the image */}
      <div className="flex items-center justify-center gap-4 md:gap-8 px-4 md:px-16">

        {/* Left arrow */}
        <button
          onClick={goPrev}
          aria-label="Previous event"
          className="flex-shrink-0 w-10 h-10 rounded-full border border-brand-dark/20 hover:border-brand-gold flex items-center justify-center text-brand-dark/40 hover:text-brand-gold transition-all duration-150 text-xl"
        >
          ‹
        </button>

        {/* Main card */}
        <div className="relative overflow-hidden rounded-3xl h-[380px] md:h-[480px] w-full max-w-4xl">

          <AnimatePresence mode="sync">
            <motion.img
              key={`img-${active}`}
              src={e.image}
              alt={e.alt}
              initial={{ opacity: 0, scale: 1.04 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
              className="absolute inset-0 w-full h-full object-cover"
              loading="eager"
              width={1200}
              height={600}
            />
          </AnimatePresence>

          <div className="absolute inset-0 bg-gradient-to-t from-brand-dark via-brand-dark/25 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-brand-dark/40 via-transparent to-transparent" />

          <AnimatePresence mode="wait">
            <motion.div
              key={`text-${active}`}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
              className="absolute bottom-0 left-0 p-8 md:p-10 max-w-lg"
            >
              <p className="text-xs uppercase tracking-widest text-brand-gold mb-3 font-semibold">{e.date}</p>
              <h3 className="text-3xl md:text-4xl font-light text-white uppercase tracking-wide mb-2">{e.title}</h3>
              <p className="text-white/55 text-sm mb-3 tracking-wide">{e.subtitle}</p>
              <p className="text-white/65 text-sm leading-relaxed hidden md:block">{e.desc}</p>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Right arrow */}
        <button
          onClick={goNext}
          aria-label="Next event"
          className="flex-shrink-0 w-10 h-10 rounded-full border border-brand-dark/20 hover:border-brand-gold flex items-center justify-center text-brand-dark/40 hover:text-brand-gold transition-all duration-150 text-xl"
        >
          ›
        </button>

      </div>

      {/* Dots */}
      <div className="flex justify-center gap-2 mt-6">
        {events.map((_, idx) => (
          <button
            key={idx}
            onClick={() => go(idx)}
            aria-label={`Event ${idx + 1}`}
            className={`rounded-full transition-all duration-200 ${
              active === idx ? 'w-6 h-1.5 bg-brand-gold' : 'w-1.5 h-1.5 bg-brand-dark/20 hover:bg-brand-dark/40'
            }`}
          />
        ))}
      </div>

    </section>
  );
}
