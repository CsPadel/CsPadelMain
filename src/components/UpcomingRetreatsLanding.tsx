import { useEffect, useRef, useState, type MouseEvent } from 'react';
import { motion, useMotionValue, useScroll, useSpring, useTransform } from 'framer-motion';
import { ArrowDown, ArrowUpRight, MapPin } from 'lucide-react';
import '../i18n/config';
import type { Locale } from '../i18n/locales';
import { usePageTranslation } from '../i18n/usePageTranslation';
import { getWhatsAppConciergeUrl } from '../constants/urls';
import { trackWhatsAppClick } from '../lib/gtag';

interface Props {
  readonly locale?: Locale;
}

type Destination = 'bali' | 'dubai' | 'mykonos';

const destinations: readonly Destination[] = ['bali', 'dubai', 'mykonos'];

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

const panelImage: Record<Destination, string> = {
  bali: 'https://images.unsplash.com/photo-1636619306699-2d27a100605e?w=1000&h=1400&fit=crop&crop=center&q=85',
  dubai: 'https://images.unsplash.com/photo-1518684079-3c830dcef090?w=1000&h=1400&fit=crop&crop=top&q=85',
  mykonos: 'https://images.unsplash.com/photo-1655535586022-a9e8ed3e2fe4?w=1000&h=1400&fit=crop&crop=center&q=85',
};

const chapterImage: Record<Destination, string> = {
  bali: 'https://images.unsplash.com/photo-1664918706173-6349ca225dd0?w=1920&h=1200&fit=crop&crop=center&q=85',
  dubai: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=1920&h=1200&fit=crop&crop=center&q=85',
  mykonos: 'https://images.unsplash.com/photo-1706189431324-c062a5060a2b?w=1920&h=1200&fit=crop&crop=center&q=85',
};

const copyContainer = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.05 } },
};

const copyItem = {
  hidden: { opacity: 0, y: 22 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: EASE } },
};

// ─── Hero panel — mouse-parallax image + staggered reveal ───────────────────
function TriptychPanel({
  id, index, name, image, comingSoonLabel, hintLabel,
}: {
  id: Destination; index: number; name: string; image: string; comingSoonLabel: string; hintLabel: string;
}) {
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const springX = useSpring(mx, { stiffness: 140, damping: 18, mass: 0.4 });
  const springY = useSpring(my, { stiffness: 140, damping: 18, mass: 0.4 });
  const translateX = useTransform(springX, [-0.5, 0.5], [-16, 16]);
  const translateY = useTransform(springY, [-0.5, 0.5], [-16, 16]);

  const handleMouseMove = (e: MouseEvent<HTMLAnchorElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    mx.set((e.clientX - rect.left) / rect.width - 0.5);
    my.set((e.clientY - rect.top) / rect.height - 0.5);
  };
  const handleMouseLeave = () => {
    mx.set(0);
    my.set(0);
  };

  return (
    <motion.a
      href={`#${id}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      initial={{ opacity: 0, scale: 1.08 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1.3, delay: 0.12 + index * 0.14, ease: EASE }}
      className="group relative w-full min-h-[52vh] md:min-h-0 md:flex-1 md:h-full overflow-hidden border-b md:border-b-0 md:border-r border-white/8 last:border-b-0 md:last:border-r-0"
    >
      <div className="absolute inset-0 skeleton-light" aria-hidden="true" style={{ background: 'rgba(255,255,255,0.03)' }} />
      <motion.img
        src={image}
        alt={name}
        loading={index === 0 ? 'eager' : 'lazy'}
        decoding="async"
        initial={{ scale: 1.18 }}
        animate={{ scale: 1.1 }}
        whileHover={{ scale: 1.18 }}
        transition={{ duration: 1.4, ease: EASE }}
        style={{ x: translateX, y: translateY }}
        className="absolute inset-0 w-full h-full object-cover grayscale-[35%] group-hover:grayscale-0 transition-[filter] duration-700 ease-out"
      />
      <div className="absolute inset-0 bg-brand-dark/60 group-hover:bg-brand-dark/35 transition-colors duration-500" />
      <div
        className="absolute inset-0"
        style={{ background: 'linear-gradient(to top, rgba(1,25,44,0.9) 0%, rgba(1,25,44,0.15) 45%, rgba(1,25,44,0.55) 100%)' }}
      />

      <motion.div
        initial="hidden"
        animate="show"
        variants={{ hidden: {}, show: { transition: { staggerChildren: 0.09, delayChildren: 0.5 + index * 0.14 } } }}
        className="absolute inset-0 flex flex-col items-center justify-end pb-14 md:pb-20 px-6 text-center"
      >
        <motion.span
          variants={{ hidden: { opacity: 0, y: 10 }, show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } } }}
          className="text-[9px] uppercase tracking-[0.32em] text-brand-gold font-semibold mb-3"
        >
          0{index + 1} · {comingSoonLabel}
        </motion.span>
        <motion.h2
          variants={{ hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } } }}
          className="text-white leading-none"
          style={{ fontFamily: 'var(--font-display)', fontStyle: 'italic', fontWeight: 300, fontSize: 'clamp(2.25rem, 4.2vw, 3.4rem)' }}
        >
          {name}
        </motion.h2>
        <span className="mt-5 flex items-center gap-2 text-[10px] uppercase tracking-[0.24em] text-white/0 group-hover:text-brand-gold opacity-0 group-hover:opacity-100 -translate-y-1 group-hover:translate-y-0 transition-all duration-400 ease-out">
          {hintLabel} <ArrowDown className="w-3 h-3" />
        </span>
      </motion.div>
    </motion.a>
  );
}

// ─── Chapter image — scroll parallax + hover lift ────────────────────────────
function ChapterImage({ src, alt, index, total }: { src: string; alt: string; index: number; total: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: cardRef, offset: ['start end', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], ['-7%', '7%']);

  return (
    <div ref={cardRef} className="relative rounded-card overflow-hidden" style={{ aspectRatio: '4/5' }}>
      <motion.div
        initial={{ opacity: 0, y: 46, scale: 0.97 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 1.1, ease: EASE }}
        className="absolute inset-0 group"
      >
        <div className="absolute inset-0 skeleton-light" aria-hidden="true" />
        <motion.img
          src={src}
          alt={alt}
          loading="lazy"
          decoding="async"
          style={{ y }}
          whileHover={{ scale: 1.07 }}
          transition={{ duration: 0.9, ease: EASE }}
          className="absolute left-0 top-[-8%] w-full h-[116%] object-cover"
          onLoad={(e) => {
            const el = e.currentTarget.previousElementSibling as HTMLElement;
            if (el) el.style.opacity = '0';
          }}
        />
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: 'linear-gradient(to top, rgba(1,25,44,0.4) 0%, transparent 32%)' }}
        />
        <span
          className="absolute bottom-6 left-6 text-white/75 text-sm font-light pointer-events-none"
          style={{ fontFamily: 'var(--font-display)', fontStyle: 'italic' }}
        >
          0{index + 1} / 0{total}
        </span>
      </motion.div>
    </div>
  );
}

export default function UpcomingRetreatsLanding({ locale: localeProp }: Props) {
  const { t } = usePageTranslation(localeProp);
  const rk = 'upcomingRetreatsPage';
  const [active, setActive] = useState<Destination>('bali');
  const sectionRefs = useRef<Partial<Record<Destination, HTMLElement | null>>>({});

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.getAttribute('id') as Destination | null;
            if (id) setActive(id);
          }
        });
      },
      { rootMargin: '-45% 0px -45% 0px', threshold: 0 }
    );

    destinations.forEach((id) => {
      const el = sectionRefs.current[id];
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="w-full bg-white">

      {/* ── Hero — triptych gateway ─────────────────────────── */}
      <section className="relative w-full overflow-hidden">
        {/* Headline — stacked above panels on mobile, overlaid with a gradient fade on desktop */}
        <div className="relative md:absolute md:top-0 md:inset-x-0 z-10 pt-28 md:pt-40 pb-10 px-8 text-center bg-brand-dark md:bg-transparent md:pointer-events-none">
          <div
            className="hidden md:block absolute inset-0"
            aria-hidden="true"
            style={{ background: 'linear-gradient(to bottom, rgba(1,25,44,0.92) 0%, rgba(1,25,44,0.5) 65%, transparent 100%)' }}
          />
          <div className="relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: EASE }}
              className="flex items-center justify-center gap-4 mb-6"
            >
              <span className="block h-px w-8 bg-brand-gold/40" aria-hidden="true" />
              <p className="text-[9px] uppercase tracking-[0.38em] text-brand-gold font-semibold">
                {t(`${rk}.eyebrow`)}
              </p>
              <span className="block h-px w-8 bg-brand-gold/40" aria-hidden="true" />
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 26 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.1, ease: EASE }}
              className="text-white mb-6"
              style={{ fontFamily: 'var(--font-display)', fontStyle: 'italic', fontWeight: 300, fontSize: 'clamp(2.5rem, 6vw, 5rem)', lineHeight: 0.98 }}
            >
              {t(`${rk}.heroTitle`)}
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.22, ease: EASE }}
              className="text-white/55 text-sm md:text-base font-light max-w-xl mx-auto leading-relaxed"
            >
              {t(`${rk}.heroSubtitle`)}
            </motion.p>
          </div>
        </div>

        <div className="flex flex-col md:flex-row md:h-screen">
          {destinations.map((id, i) => (
            <TriptychPanel
              key={id}
              id={id}
              index={i}
              name={t(`${id}Page.heroTitle`)}
              image={panelImage[id]}
              comingSoonLabel={t(`${rk}.comingSoon`)}
              hintLabel={t(`${rk}.heroHint`)}
            />
          ))}
        </div>
      </section>

      {/* ── Sticky scroll-spy index (desktop) ───────────────── */}
      <nav
        className="hidden lg:flex fixed right-6 top-1/2 -translate-y-1/2 z-40 flex-col items-center gap-4 py-4 px-2.5 rounded-full"
        style={{ background: 'rgba(1,25,44,0.55)', backdropFilter: 'blur(10px)', border: '1px solid rgba(217,173,98,0.18)' }}
        aria-label={t(`${rk}.indexLabel`)}
      >
        {destinations.map((id) => (
          <a
            key={id}
            href={`#${id}`}
            className="group relative flex items-center justify-center"
          >
            <span
              className={`absolute right-full top-1/2 -translate-y-1/2 mr-3 text-[10px] uppercase tracking-[0.22em] whitespace-nowrap transition-all duration-300 ease-out ${
                active === id ? 'opacity-100 text-brand-gold translate-x-0' : 'opacity-0 text-white/60 translate-x-2 group-hover:opacity-100 group-hover:translate-x-0'
              }`}
            >
              {t(`${id}Page.heroTitle`)}
            </span>
            <span className="relative w-2.5 h-2.5 flex items-center justify-center">
              <span
                className={`block rounded-full bg-white/40 group-hover:bg-brand-gold/70 transition-all duration-300 ${
                  active === id ? 'opacity-0 w-1.5 h-1.5' : 'opacity-100 w-1.5 h-1.5'
                }`}
              />
              {active === id && (
                <motion.span
                  layoutId="upcomingRetreatsActiveDot"
                  transition={{ type: 'spring', stiffness: 420, damping: 32 }}
                  className="absolute inset-0 rounded-full bg-brand-gold"
                />
              )}
            </span>
          </a>
        ))}
      </nav>

      {/* ── Chapters ─────────────────────────────────────────── */}
      {destinations.map((id, i) => {
        const pk = `${id}Page`;
        const pillars = t(`${pk}.pillars`, { returnObjects: true }) as Array<{ tag: string; title: string; desc: string }>;
        const whatsappUrl = getWhatsAppConciergeUrl(t(`${pk}.whatsappMessage`));
        const nextId = destinations[i + 1];
        const reversed = i % 2 === 1;

        return (
          <section
            key={id}
            id={id}
            ref={(el) => { sectionRefs.current[id] = el; }}
            className="relative py-24 md:py-32 px-8 md:px-16 scroll-mt-24"
            style={{ background: i % 2 === 0 ? '#ffffff' : 'var(--color-brand-ivory)' }}
          >
            <div className="max-w-7xl mx-auto">
              <div className={`grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center ${reversed ? 'lg:[&>*:first-child]:order-2' : ''}`}>

                <ChapterImage src={chapterImage[id]} alt={t(`${pk}.heroTitle`)} index={i} total={destinations.length} />

                {/* Copy */}
                <motion.div
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true, margin: '-100px' }}
                  variants={copyContainer}
                >
                  <motion.div variants={copyItem} className="flex items-center gap-2 mb-4">
                    <MapPin className="w-3.5 h-3.5 text-brand-gold flex-shrink-0" />
                    <p className="text-[9px] uppercase tracking-[0.38em] text-brand-gold font-semibold">
                      {t(`${pk}.heroLocation`)}
                    </p>
                  </motion.div>

                  <motion.h2
                    variants={copyItem}
                    className="text-brand-dark leading-none mb-5"
                    style={{ fontFamily: 'var(--font-display)', fontStyle: 'italic', fontWeight: 300, fontSize: 'clamp(2.75rem, 5vw, 4.5rem)' }}
                  >
                    {t(`${pk}.heroTitle`)}
                  </motion.h2>

                  <motion.span
                    variants={copyItem}
                    className="inline-flex items-center gap-2 text-[10px] uppercase tracking-widest px-3.5 py-1.5 rounded-full border mb-7"
                    style={{ color: '#b88645', borderColor: 'rgba(217,173,98,0.3)', background: 'rgba(217,173,98,0.06)' }}
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-brand-gold" />
                    {t(`${rk}.comingSoon`)}
                  </motion.span>

                  <motion.p variants={copyItem} className="text-brand-dark/55 text-lg font-light leading-relaxed mb-9 max-w-lg">
                    {t(`${pk}.heroSubtitle`)}
                  </motion.p>

                  {/* Stats row */}
                  <motion.div variants={copyItem} className="flex items-center gap-6 md:gap-9 mb-9 flex-wrap">
                    {[
                      { value: t(`${pk}.stats.duration.value`), label: t(`${pk}.stats.duration.label`) },
                      { value: t(`${pk}.stats.group.value`), label: t(`${pk}.stats.group.label`) },
                      { value: t(`${pk}.stats.rating.value`), label: t(`${pk}.stats.rating.label`) },
                    ].map((stat) => (
                      <div key={stat.label}>
                        <div
                          style={{ fontFamily: 'var(--font-display)', fontStyle: 'italic', fontWeight: 300, fontSize: '1.5rem', color: '#b88645', lineHeight: 1 }}
                        >
                          {stat.value}
                        </div>
                        <div className="text-[9px] uppercase tracking-[0.22em] text-brand-dark/35 mt-1.5">
                          {stat.label}
                        </div>
                      </div>
                    ))}
                  </motion.div>

                  {/* Highlights */}
                  <motion.div variants={copyItem} className="flex flex-wrap gap-2.5 mb-10 max-w-xl">
                    {Array.isArray(pillars) && pillars.map((pillar) => (
                      <motion.span
                        key={pillar.tag}
                        whileHover={{ y: -2, borderColor: 'rgba(217,173,98,0.55)' }}
                        transition={{ duration: 0.3, ease: EASE }}
                        className="text-xs font-light tracking-wide text-brand-dark/60 px-3.5 py-2 rounded-full border border-brand-dark/12 hover:text-brand-dark"
                      >
                        {pillar.tag}
                      </motion.span>
                    ))}
                  </motion.div>

                  {/* CTAs */}
                  <motion.div variants={copyItem} className="flex flex-wrap items-center gap-x-10 gap-y-4">
                    <motion.a
                      href={whatsappUrl}
                      onClick={trackWhatsAppClick}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ x: 3 }}
                      transition={{ duration: 0.3, ease: EASE }}
                      className="inline-flex items-center gap-3 text-xs uppercase tracking-[0.2em] font-semibold text-brand-dark hover:text-brand-gold transition-colors duration-250 border-b border-brand-dark/15 hover:border-brand-gold pb-1"
                    >
                      {t(`${rk}.enquireBtn`)}
                      <ArrowUpRight className="w-4 h-4" />
                    </motion.a>

                    {nextId && (
                      <a
                        href={`#${nextId}`}
                        className="group inline-flex items-center gap-3 text-[10px] uppercase tracking-[0.24em] text-brand-dark/35 hover:text-brand-gold transition-colors duration-250"
                      >
                        {t(`${rk}.nextLabel`)}
                        <span style={{ fontFamily: 'var(--font-display)', fontStyle: 'italic' }} className="text-sm normal-case tracking-normal text-brand-dark/70 group-hover:text-brand-gold">
                          {t(`${nextId}Page.heroTitle`)}
                        </span>
                        <ArrowUpRight className="w-3.5 h-3.5 rotate-90 group-hover:translate-y-0.5 transition-transform duration-300 ease-out" />
                      </a>
                    )}
                  </motion.div>
                </motion.div>

              </div>
            </div>
          </section>
        );
      })}

      {/* ── CTA ──────────────────────────────────────────────── */}
      <section className="py-32 px-8 md:px-16 text-center noise-section" style={{ background: 'linear-gradient(135deg, #041E36 0%, #01192C 100%)' }}>
        <div className="max-w-2xl mx-auto">
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease: EASE }}
            className="w-10 h-px bg-brand-gold mx-auto mb-10 opacity-50"
          />
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: EASE }}
            className="text-[9px] uppercase tracking-[0.38em] text-brand-gold font-semibold mb-6"
          >
            {t(`${rk}.ctaEyebrow`)}
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, delay: 0.08, ease: EASE }}
            className="text-4xl md:text-5xl font-light mb-5 text-white"
            style={{ fontFamily: 'var(--font-display)', fontStyle: 'italic' }}
          >
            {t(`${rk}.ctaTitle`)}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.16, ease: EASE }}
            className="font-light text-lg mb-12"
            style={{ color: 'rgba(255,255,255,0.50)' }}
          >
            {t(`${rk}.ctaDesc`)}
          </motion.p>
          <motion.a
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.24, ease: EASE }}
            whileHover={{ scale: 1.035 }}
            whileTap={{ scale: 0.97 }}
            href={getWhatsAppConciergeUrl("Hello, I'd like to register my interest in an upcoming CourtSide retreat.")}
            onClick={trackWhatsAppClick}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-luxury group inline-flex items-center gap-3"
          >
            {t(`${rk}.ctaBtn`)}
            <ArrowUpRight className="w-5 h-5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200" />
          </motion.a>
        </div>
      </section>

    </div>
  );
}
