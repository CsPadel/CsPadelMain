import { useCallback, useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import '../i18n/config';
import type { Locale } from '../i18n/locales';
import { usePageTranslation } from '../i18n/usePageTranslation';
import { BALI_GALLERY } from '../constants/baliGallery';

interface BaliGalleryProps {
  locale?: Locale;
}

/** How far the arrows move the strip: one card plus its gap. */
const SCROLL_STEP = 320;

export default function BaliGallery({ locale }: Readonly<BaliGalleryProps>) {
  const { t } = usePageTranslation(locale);
  const scroller = useRef<HTMLDivElement>(null);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);
  const [hasDragged, setHasDragged] = useState(false);

  // Pointer-drag state kept in a ref so moving the pointer never re-renders.
  const drag = useRef({ active: false, startX: 0, startScroll: 0, moved: 0 });

  const syncEdges = useCallback(() => {
    const el = scroller.current;
    if (!el) return;
    setAtStart(el.scrollLeft <= 1);
    setAtEnd(el.scrollLeft >= el.scrollWidth - el.clientWidth - 1);
  }, []);

  useEffect(() => {
    const el = scroller.current;
    if (!el) return;
    syncEdges();
    el.addEventListener('scroll', syncEdges, { passive: true });
    window.addEventListener('resize', syncEdges);
    return () => {
      el.removeEventListener('scroll', syncEdges);
      window.removeEventListener('resize', syncEdges);
    };
  }, [syncEdges]);

  const scrollBy = (direction: 1 | -1) => {
    scroller.current?.scrollBy({ left: direction * SCROLL_STEP, behavior: 'smooth' });
  };

  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    // Let touch devices keep their native momentum scrolling.
    if (e.pointerType === 'touch') return;
    const el = scroller.current;
    if (!el) return;
    drag.current = { active: true, startX: e.clientX, startScroll: el.scrollLeft, moved: 0 };
    el.setPointerCapture(e.pointerId);
  };

  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const el = scroller.current;
    if (!el || !drag.current.active) return;
    const delta = e.clientX - drag.current.startX;
    drag.current.moved = Math.abs(delta);
    el.scrollLeft = drag.current.startScroll - delta;
    if (drag.current.moved > 4 && !hasDragged) setHasDragged(true);
  };

  const endDrag = (e: React.PointerEvent<HTMLDivElement>) => {
    const el = scroller.current;
    if (!el || !drag.current.active) return;
    drag.current.active = false;
    if (el.hasPointerCapture(e.pointerId)) el.releasePointerCapture(e.pointerId);
  };

  return (
    <section className="py-24 md:py-32 bg-white overflow-hidden">
      {/* Header — title, rule and arrows, matching the editorial reference */}
      <motion.div
        initial={{ opacity: 0, y: 22 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.7, ease: 'easeOut' }}
        className="max-w-7xl mx-auto px-8 md:px-16 mb-12 md:mb-14"
      >
        <div className="flex items-center gap-4 mb-6">
          <span className="block h-px w-7 bg-brand-gold/40" aria-hidden="true" />
          <p className="text-[9px] uppercase tracking-[0.38em] text-brand-gold font-semibold">
            {t('baliPage.landing.gallery.eyebrow')}
          </p>
        </div>

        <div className="flex items-end gap-6 md:gap-10">
          <h2
            className="text-4xl md:text-5xl font-light text-brand-dark leading-none flex-shrink-0"
            style={{ fontFamily: 'var(--font-display)', fontStyle: 'italic' }}
          >
            {t('baliPage.landing.gallery.title')}
          </h2>

          <span className="hidden md:block flex-1 h-px bg-brand-dark/12 mb-3" aria-hidden="true" />

          <div className="hidden md:flex items-center gap-3 mb-1 flex-shrink-0">
            <button
              type="button"
              onClick={() => scrollBy(-1)}
              disabled={atStart}
              aria-label={t('baliPage.landing.gallery.prev')}
              className="w-11 h-11 rounded-full border border-brand-dark/15 flex items-center justify-center text-brand-dark/50 transition-all duration-200 enabled:hover:border-brand-gold enabled:hover:text-brand-gold disabled:opacity-25 disabled:cursor-not-allowed cursor-pointer"
            >
              <ArrowLeft size={16} />
            </button>
            <button
              type="button"
              onClick={() => scrollBy(1)}
              disabled={atEnd}
              aria-label={t('baliPage.landing.gallery.next')}
              className="w-11 h-11 rounded-full border border-brand-dark/15 flex items-center justify-center text-brand-dark/50 transition-all duration-200 enabled:hover:border-brand-gold enabled:hover:text-brand-gold disabled:opacity-25 disabled:cursor-not-allowed cursor-pointer"
            >
              <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </motion.div>

      {/* Strip */}
      <div className="cs-strip-wrap relative">
        <div
          ref={scroller}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={endDrag}
          onPointerCancel={endDrag}
          className="cs-strip flex gap-4 md:gap-5 overflow-x-auto pb-2 pl-8 pr-8 scroll-pl-8 md:pl-[var(--cs-gutter)] md:pr-[var(--cs-gutter)] md:scroll-pl-[var(--cs-gutter)] cursor-grab active:cursor-grabbing select-none"
          style={{ scrollSnapType: 'x mandatory' }}
        >
          {BALI_GALLERY.map((item, i) => (
            <motion.figure
              key={item.slug}
              initial={{ opacity: 0, y: 26 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1], delay: Math.min(i, 4) * 0.08 }}
              className="flex-shrink-0 w-[240px] md:w-[300px]"
              style={{ scrollSnapAlign: 'start' }}
            >
              <div className="relative rounded-card overflow-hidden aspect-[3/4] bg-brand-ivory">
                <img
                  src={`/imagenes/bali-gallery/${item.slug}.jpg`}
                  alt={`${item.title} – ${item.location}`}
                  loading={i < 3 ? 'eager' : 'lazy'}
                  decoding="async"
                  width={1000}
                  height={1333}
                  draggable={false}
                  className="absolute inset-0 w-full h-full object-cover pointer-events-none"
                />
              </div>
              <figcaption className="pt-5">
                <p
                  className="text-lg md:text-xl font-light text-brand-dark leading-snug"
                  style={{ fontFamily: 'var(--font-display)' }}
                >
                  {item.title}
                </p>
                <p className="mt-1.5 text-[10px] uppercase tracking-[0.1em] text-brand-dark/35">
                  {item.location}
                </p>
              </figcaption>
            </motion.figure>
          ))}

          {/* Trailing spacer so the last card can clear the viewport edge */}
          <div className="flex-shrink-0 w-1 md:w-8" aria-hidden="true" />
        </div>

        {/* Drag affordance — retires once the visitor has dragged */}
        <div
          className={`hidden md:flex absolute left-[var(--cs-gutter)] top-6 pointer-events-none items-center gap-2 transition-opacity duration-500 ${
            hasDragged ? 'opacity-0' : 'opacity-100'
          }`}
        >
          <span className="px-3 py-1.5 rounded-full bg-white/85 backdrop-blur-sm text-[9px] uppercase tracking-[0.28em] text-brand-dark/55 shadow-sm">
            {t('baliPage.landing.gallery.dragHint')}
          </span>
        </div>
      </div>

      <style>{`
        .cs-strip { scrollbar-width: none; -ms-overflow-style: none; }
        .cs-strip::-webkit-scrollbar { display: none; }
        /* Line the first card up with the heading above it. The heading sits in a
           centred max-w-7xl (80rem) box with 4rem of padding, so mirror that
           offset here. Uses 100% rather than 100vw to stay clear of the scrollbar. */
        .cs-strip-wrap { --cs-gutter: 2rem; }
        @media (min-width: 768px) {
          .cs-strip-wrap { --cs-gutter: max(4rem, calc((100% - 80rem) / 2 + 4rem)); }
        }
      `}</style>
    </section>
  );
}
