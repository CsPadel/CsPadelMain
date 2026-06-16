import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import '../i18n/config';

export default function TestimonialsCarousel() {
  const { t } = useTranslation();
  
  // Fetch testimonials from translation config
  const testimonials = t('testimonials.items', { returnObjects: true }) as Array<{
    name: string;
    role: string;
    text: string;
    initials: string;
    image: string;
  }>;
  const [active, setActive] = useState(0);
  const total = testimonials.length;

  const go = (idx: number) => setActive(idx);
  const goNext = () => go((active + 1) % total);
  const goPrev = () => go((active - 1 + total) % total);

  const testimonial = testimonials[active];

  return (
    <section
      id="testimonials"
      aria-label="Guest reviews of CourtSide Menorca padel retreat"
      className="bg-brand-ivory noise-section-light py-24 md:py-32 px-6 md:px-16"
    >
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="text-center mb-14">
          <p className="text-xs uppercase tracking-[0.3em] text-brand-gold font-semibold mb-3">{t('testimonials.label')}</p>
          <h2
            className="text-4xl md:text-5xl font-normal text-brand-dark tracking-wide"
            style={{ fontFamily: 'var(--font-display)', fontStyle: 'italic' }}
          >
            {t('testimonials.title')}
          </h2>
          <p className="text-brand-dark/50 text-lg mt-4 max-w-md mx-auto">
            {t('testimonials.subtitle')}
          </p>
        </div>

        {/* Carousel */}
        <div className="relative flex flex-col md:flex-row items-center md:items-end gap-0 max-w-4xl mx-auto">

          {/* Image */}
          <div className="w-full md:w-[58%] flex-shrink-0 relative rounded-2xl overflow-hidden h-72 md:h-[440px]">
            <AnimatePresence mode="sync">
              <motion.img
                key={`img-${active}`}
                src={testimonial.image}
                alt={`${testimonial.name} — CourtSide Menorca`}
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
            <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/20 to-transparent" />
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
                className="bg-white rounded-2xl p-6 md:p-8 border border-brand-dark/8 shadow-xl shadow-brand-dark/10"
              >
                {/* Avatar */}
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-11 h-11 rounded-full bg-brand-gold/20 flex items-center justify-center flex-shrink-0">
                    <span className="text-brand-gold font-bold text-base">{testimonial.initials}</span>
                  </div>
                  <div>
                    <p className="text-brand-dark font-semibold text-sm">{testimonial.name}</p>
                    <p className="text-brand-dark/45 text-xs">{testimonial.role}</p>
                  </div>
                  <div className="ml-auto flex gap-0.5" aria-label="5 out of 5 stars">
                    {[...Array(5)].map((_, i) => (
                      <span key={i} className="text-brand-gold text-sm">★</span>
                    ))}
                  </div>
                </div>

                {/* Quote */}
                <p className="text-brand-dark/70 text-sm md:text-base leading-relaxed italic">
                  "{testimonial.text}"
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
            className="w-9 h-9 rounded-full border border-brand-dark/15 hover:border-brand-gold flex items-center justify-center text-brand-dark/40 hover:text-brand-gold transition-all duration-150 text-lg"
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
                  active === idx ? 'w-6 h-1.5 bg-brand-gold' : 'w-1.5 h-1.5 bg-brand-dark/15 hover:bg-brand-dark/30'
                }`}
              />
            ))}
          </div>

          <button
            onClick={goNext}
            aria-label="Next review"
            className="w-9 h-9 rounded-full border border-brand-dark/15 hover:border-brand-gold flex items-center justify-center text-brand-dark/40 hover:text-brand-gold transition-all duration-150 text-lg"
          >
            ›
          </button>
        </div>

      </div>
    </section>
  );
}
