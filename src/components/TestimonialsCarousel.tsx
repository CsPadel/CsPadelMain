import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const testimonials = [
  {
    name: 'Tomasz Campbell',
    role: 'Senior Director, London',
    text: 'Truly life-changing. The coaching sessions elevated my game, but the yacht day and gourmet dinners made it a complete luxury escape. Already booked for next year.',
    initials: 'T',
    image: '/imagenes/IMG_2167.jpeg',
  },
  {
    name: 'Ana Martínez',
    role: 'CEO, Madrid',
    text: 'The attention to detail is unreal. From the airport transfer to the farewell dinner, every moment felt tailored. This is how a padel retreat should be.',
    initials: 'A',
    image: '/imagenes/JOPS-721.JPG',
  },
  {
    name: 'James Whitfield',
    role: 'Managing Partner, Edinburgh',
    text: 'I came for the padel and stayed for the experience. The vineyard lunch, the tournament day, the sunset at Cova d\'en Xoroi — every single day was extraordinary.',
    initials: 'J',
    image: '/imagenes/Cala en porter.jpg',
  },
];

export default function TestimonialsCarousel() {
  const [active, setActive] = useState(0);
  const total = testimonials.length;

  const go = (idx: number) => setActive(idx);
  const goNext = () => go((active + 1) % total);
  const goPrev = () => go((active - 1 + total) % total);

  const t = testimonials[active];

  return (
    <section
      id="testimonials"
      aria-label="Guest reviews of CourtSide Menorca padel retreat"
      className="bg-brand-dark py-24 md:py-32 px-6 md:px-16"
    >
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="text-center mb-14">
          <p className="text-xs uppercase tracking-[0.3em] text-brand-gold font-semibold mb-3">Reviews</p>
          <h2 className="text-4xl md:text-5xl font-light text-brand-light tracking-wide">Trust that is shared</h2>
          <p className="text-brand-light/40 text-lg mt-4 max-w-md mx-auto">
            Guests who arrived as players. Left as loyalists.
          </p>
        </div>

        {/* Carousel */}
        <div className="relative flex flex-col md:flex-row items-center md:items-end gap-0 max-w-4xl mx-auto">

          {/* Image */}
          <div className="w-full md:w-[58%] flex-shrink-0 relative rounded-2xl overflow-hidden h-72 md:h-[440px]">
            <AnimatePresence mode="sync">
              <motion.img
                key={`img-${active}`}
                src={t.image}
                alt={`${t.name} — CourtSide Menorca`}
                initial={{ opacity: 0, scale: 1.04 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.45, ease: 'easeOut' }}
                className="absolute inset-0 w-full h-full object-cover"
                loading="lazy"
                decoding="async"
                width={700}
                height={560}
              />
            </AnimatePresence>
            <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/30 to-transparent" />
          </div>

          {/* Review card — overlaps image on desktop */}
          <div className="w-full md:w-[50%] md:-ml-16 z-10 md:mb-10">
            <AnimatePresence mode="wait">
              <motion.div
                key={`card-${active}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.3, ease: 'easeOut' }}
                className="bg-white rounded-2xl p-6 md:p-8 shadow-2xl shadow-black/30"
              >
                {/* Avatar */}
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-11 h-11 rounded-full bg-brand-gold/20 flex items-center justify-center flex-shrink-0">
                    <span className="text-brand-gold font-bold text-base">{t.initials}</span>
                  </div>
                  <div>
                    <p className="text-brand-dark font-semibold text-sm">{t.name}</p>
                    <p className="text-brand-dark/45 text-xs">{t.role}</p>
                  </div>
                  <div className="ml-auto flex gap-0.5" aria-label="5 out of 5 stars">
                    {[...Array(5)].map((_, i) => (
                      <span key={i} className="text-brand-gold text-sm">★</span>
                    ))}
                  </div>
                </div>

                {/* Quote */}
                <p className="text-brand-dark/70 text-sm md:text-base leading-relaxed italic">
                  "{t.text}"
                </p>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-center gap-6 mt-10">
          <button
            onClick={goPrev}
            aria-label="Previous review"
            className="w-9 h-9 rounded-full border border-white/20 hover:border-brand-gold flex items-center justify-center text-white/40 hover:text-brand-gold transition-all duration-150 text-lg"
          >
            ‹
          </button>

          <div className="flex gap-2">
            {testimonials.map((_, idx) => (
              <button
                key={idx}
                onClick={() => go(idx)}
                aria-label={`Review ${idx + 1}`}
                className={`rounded-full transition-all duration-200 ${
                  active === idx ? 'w-6 h-1.5 bg-brand-gold' : 'w-1.5 h-1.5 bg-white/20 hover:bg-white/40'
                }`}
              />
            ))}
          </div>

          <button
            onClick={goNext}
            aria-label="Next review"
            className="w-9 h-9 rounded-full border border-white/20 hover:border-brand-gold flex items-center justify-center text-white/40 hover:text-brand-gold transition-all duration-150 text-lg"
          >
            ›
          </button>
        </div>

      </div>
    </section>
  );
}
