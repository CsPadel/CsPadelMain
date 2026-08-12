import { motion } from 'framer-motion';
import '../i18n/config';
import type { Locale } from '../i18n/locales';
import { usePageTranslation } from '../i18n/usePageTranslation';
import EnquiryCta from './EnquiryForm';

interface ExperienceViewProps {
  locale?: Locale;
}

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show:   { opacity: 1, y: 0  },
};

const stagger = {
  hidden: {},
  show:   { transition: { staggerChildren: 0.13, delayChildren: 0.05 } },
};

export default function ExperienceView({ locale }: ExperienceViewProps) {
  const { t } = usePageTranslation(locale);
  const apart = t('experiencePage.apart', { returnObjects: true }) as Array<{
    title: string;
    desc: string;
  }>;

  return (
    <div className="w-full">

      {/* ── Hero ─────────────────────────────────────────────── */}
      <section className="relative w-full min-h-screen flex flex-col items-center justify-center pt-24 pb-24 px-8 md:px-16 text-center overflow-hidden bg-brand-dark">
        <img
          src="/imagenes/cms/experience-hero.jpg"
          alt=""
          aria-hidden="true"
          className="absolute inset-0 w-full h-full object-cover opacity-30"
        />
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: 'linear-gradient(to bottom, rgba(1,25,44,0.6) 0%, rgba(1,25,44,0.2) 40%, rgba(1,25,44,0.85) 100%)' }}
        />

        <div className="relative z-10 max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex items-center justify-center gap-5 mb-10"
          >
            <span className="block h-px w-8 bg-brand-gold/55" />
            <span className="text-[9px] uppercase tracking-[0.38em] text-brand-gold font-semibold">
              {t('experiencePage.heroEyebrow')}
            </span>
            <span className="block h-px w-8 bg-brand-gold/55" />
          </motion.div>

          <div className="overflow-hidden mb-8">
            <motion.h1
              initial={{ y: '110%' }}
              animate={{ y: 0 }}
              transition={{ duration: 1.05, delay: 0.44, ease: [0.22, 1, 0.36, 1] }}
              className="text-white font-light"
              style={{
                fontFamily: 'var(--font-display)',
                fontStyle: 'italic',
                fontSize: 'clamp(2.75rem, 8vw, 7.5rem)',
                lineHeight: 0.95,
              }}
            >
              {t('experiencePage.heroTitle')}
            </motion.h1>
          </div>

          <motion.div
            initial={{ scaleX: 0, opacity: 0 }}
            animate={{ scaleX: 1, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.9 }}
            className="w-10 h-px bg-brand-gold mb-8 mx-auto origin-center"
          />

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.1 }}
            className="text-white/55 text-base md:text-lg font-light max-w-xl mx-auto leading-relaxed"
          >
            {t('experiencePage.heroSubtitle')}
          </motion.p>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.2, duration: 1 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 pointer-events-none"
        >
          <span className="text-[8px] uppercase tracking-[0.38em] text-white/22">Scroll</span>
          <motion.div
            animate={{ y: [0, 7, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
            className="w-px h-10 bg-gradient-to-b from-white/25 to-transparent"
          />
        </motion.div>
      </section>

      {/* ── What sets us apart ───────────────────────────────── */}
      <section className="py-24 md:py-32 px-8 md:px-16 bg-white">
        <div className="max-w-7xl mx-auto">

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.65, ease: 'easeOut' }}
            className="mb-16 md:mb-20"
          >
            <span className="block h-px w-7 bg-brand-gold/40 mb-6" aria-hidden="true" />
            <h2
              className="text-4xl md:text-5xl font-light text-brand-dark"
              style={{ fontFamily: 'var(--font-display)', fontStyle: 'italic' }}
            >
              {t('experiencePage.apartTitle')}
            </h2>
          </motion.div>

          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-60px' }}
            className="grid grid-cols-1 md:grid-cols-3 gap-px bg-brand-dark/8"
          >
            {Array.isArray(apart) && apart.map((box, i) => (
              <motion.div
                key={box.title}
                variants={fadeUp}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className="bg-white p-10 md:p-12 group hover:bg-brand-ivory transition-colors duration-300"
              >
                <p className="text-[10px] uppercase tracking-[0.3em] text-brand-gold font-semibold mb-5">
                  {String(i + 1).padStart(2, '0')}
                </p>
                <h3
                  className="text-xl md:text-2xl font-light text-brand-dark mb-4 leading-snug"
                  style={{ fontFamily: 'var(--font-display)', fontStyle: 'italic' }}
                >
                  {box.title}
                </h3>
                <div className="w-6 h-px bg-brand-gold/30 mb-5 group-hover:w-10 transition-all duration-300" />
                <p className="text-brand-dark/60 font-light text-[15px] leading-relaxed">
                  {box.desc}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Off the Court ────────────────────────────────────── */}
      <section className="bg-brand-ivory overflow-hidden">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-0 items-center">

          <motion.div
            initial={{ opacity: 0, x: -32 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
            className="relative min-h-[420px] md:min-h-[580px] overflow-hidden"
          >
            {/* TODO: replace with a real off-court moment — boat day, vineyard
                tasting or cliffside sunset. */}
            <img
              src="/imagenes/EM-43.jpg"
              alt="Off the court on a CourtSide retreat"
              loading="lazy"
              decoding="async"
              className="absolute inset-0 w-full h-full object-cover object-center"
            />
            <div
              className="absolute inset-0"
              style={{ background: 'linear-gradient(to right, transparent 60%, rgba(247,244,239,0.35) 100%)' }}
            />
          </motion.div>

          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-80px' }}
            className="px-8 md:px-16 py-16 md:py-24"
          >
            <motion.div
              variants={fadeUp}
              transition={{ duration: 0.5 }}
              className="flex items-center gap-4 mb-6"
            >
              <span className="block h-px w-7 bg-brand-gold/40" aria-hidden="true" />
              <p className="text-[9px] uppercase tracking-[0.38em] text-brand-gold font-semibold">
                {t('experiencePage.offCourtEyebrow')}
              </p>
            </motion.div>

            <motion.h2
              variants={fadeUp}
              transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
              className="text-3xl md:text-4xl lg:text-5xl font-light text-brand-dark leading-tight mb-8"
              style={{ fontFamily: 'var(--font-display)', fontStyle: 'italic' }}
            >
              {t('experiencePage.offCourtTitle')}
            </motion.h2>

            <motion.p
              variants={fadeUp}
              transition={{ duration: 0.6 }}
              className="text-brand-dark/60 font-light text-base md:text-lg leading-relaxed"
            >
              {t('experiencePage.offCourtText')}
            </motion.p>
          </motion.div>

        </div>
      </section>

      {/* ── Founders' quote ──────────────────────────────────── */}
      <motion.section
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.7, ease: 'easeOut' }}
        className="bg-brand-dark py-24 md:py-32 px-8 md:px-16"
      >
        <figure className="max-w-4xl mx-auto text-center">
          <div className="flex items-center justify-center gap-4 mb-10">
            <span className="block h-px w-7 bg-brand-gold/40" aria-hidden="true" />
            <p className="text-[9px] uppercase tracking-[0.38em] text-brand-gold font-semibold">
              {t('experiencePage.quoteEyebrow')}
            </p>
            <span className="block h-px w-7 bg-brand-gold/40" aria-hidden="true" />
          </div>

          <blockquote
            className="text-xl md:text-2xl lg:text-3xl font-light text-white leading-relaxed mb-10"
            style={{ fontFamily: 'var(--font-display)', fontStyle: 'italic' }}
          >
            &ldquo;{t('experiencePage.quote')}&rdquo;
          </blockquote>

          <figcaption className="text-[10px] uppercase tracking-[0.3em] text-brand-gold/80 font-semibold">
            {t('experiencePage.quoteAuthor')}
          </figcaption>
        </figure>
      </motion.section>

      {/* ── CTA ──────────────────────────────────────────────── */}
      <section className="py-24 md:py-32 px-8 md:px-16 bg-brand-ivory">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          className="max-w-3xl mx-auto text-center"
        >
          <h2
            className="text-4xl md:text-5xl font-light text-brand-dark mb-5"
            style={{ fontFamily: 'var(--font-display)', fontStyle: 'italic' }}
          >
            {t('experiencePage.ctaTitle')}
          </h2>
          <p className="text-brand-dark/45 text-base font-light leading-relaxed mb-10 max-w-sm mx-auto">
            {t('experiencePage.ctaText')}
          </p>
          <EnquiryCta locale={locale} />
        </motion.div>
      </section>

    </div>
  );
}
