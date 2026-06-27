import { motion } from 'framer-motion';
import '../i18n/config';
import type { Locale } from '../i18n/locales';
import { usePageTranslation } from '../i18n/usePageTranslation';

interface AboutViewProps {
  locale?: Locale;
}

const values = [
  {
    number: '01',
    title: 'Performance First',
    desc: 'Every retreat is built around elite padel — world-class coaching, competitive play, and a programme that pushes you to your best.',
  },
  {
    number: '02',
    title: 'Uncompromising Curation',
    desc: 'From the hotel to the restaurant to the boat trip — nothing reaches our guests without passing a single question: Would we want this?',
  },
  {
    number: '03',
    title: 'Total Discretion',
    desc: 'Privacy is not a feature. It is the foundation. Everything we do — from closed retreats to private transfers — is designed around it.',
  },
];

const stats = [
  { value: '5', label: 'Days per retreat' },
  { value: '100%', label: 'Private access' },
  { value: '5★', label: 'Curated properties' },
  { value: '3', label: 'Destinations' },
  { value: '24/7', label: 'Concierge' },
];

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show:   { opacity: 1, y: 0  },
};

const stagger = {
  hidden: {},
  show:   { transition: { staggerChildren: 0.13, delayChildren: 0.05 } },
};

export default function AboutView({ locale: localeProp }: AboutViewProps) {
  const { t } = usePageTranslation(localeProp);
  const team = t('aboutPage.team', { returnObjects: true }) as Array<{
    name: string; role: string; photo?: string;
  }>;

  return (
    <div className="w-full">

      {/* ── Hero ─────────────────────────────────────────────── */}
      <section className="relative w-full min-h-screen flex flex-col items-center justify-center pt-24 pb-24 px-8 md:px-16 text-center overflow-hidden bg-brand-dark">
        <img
          src="/imagenes/EM-6.jpg"
          alt=""
          aria-hidden="true"
          className="absolute inset-0 w-full h-full object-cover opacity-25"
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
            <span className="text-[9px] uppercase tracking-[0.38em] text-brand-gold font-semibold">CourtSide Padel</span>
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
                fontSize: 'clamp(3rem, 9vw, 9rem)',
                lineHeight: 0.9,
              }}
            >
              {t('aboutPage.heroTitle')}
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
            className="text-white/50 text-base md:text-lg font-light max-w-xl mx-auto leading-relaxed"
          >
            {t('aboutPage.heroSubtitle')}
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

      {/* ── What we stand for ────────────────────────────────── */}
      <section className="py-24 md:py-32 px-8 md:px-16 bg-white">
        <div className="max-w-7xl mx-auto">

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.65, ease: 'easeOut' }}
            className="mb-16 md:mb-20"
          >
            <div className="flex items-center gap-4 mb-5">
              <span className="block h-px w-7 bg-brand-gold/40" aria-hidden="true" />
              <p className="text-[9px] uppercase tracking-[0.38em] text-brand-gold font-semibold">
                What We Stand For
              </p>
            </div>
            <h2
              className="text-4xl md:text-5xl font-light text-brand-dark"
              style={{ fontFamily: 'var(--font-display)', fontStyle: 'italic' }}
            >
              Three principles.<br />No compromises.
            </h2>
          </motion.div>

          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-60px' }}
            className="grid grid-cols-1 md:grid-cols-3 gap-px bg-brand-dark/8"
          >
            {values.map((v) => (
              <motion.div
                key={v.number}
                variants={fadeUp}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className="bg-white p-10 md:p-12 group hover:bg-brand-ivory transition-colors duration-300"
              >
                <p className="text-[10px] uppercase tracking-[0.3em] text-brand-gold font-semibold mb-5">{v.number}</p>
                <h3
                  className="text-xl md:text-2xl font-light text-brand-dark mb-4 leading-snug"
                  style={{ fontFamily: 'var(--font-display)', fontStyle: 'italic' }}
                >
                  {v.title}
                </h3>
                <div className="w-6 h-px bg-brand-gold/30 mb-5 group-hover:w-10 transition-all duration-300" />
                <p className="text-brand-dark/52 font-light text-sm leading-relaxed">{v.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Editorial split — image + vision text ─────────────── */}
      <section className="bg-brand-ivory overflow-hidden">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-0 items-center">

          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: -32 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
            className="relative min-h-[420px] md:min-h-[580px] overflow-hidden"
          >
            <img
              src="/imagenes/EM-43.jpg"
              alt="CourtSide Padel retreat in Menorca"
              loading="lazy"
              decoding="async"
              className="absolute inset-0 w-full h-full object-cover object-center"
            />
            <div
              className="absolute inset-0"
              style={{ background: 'linear-gradient(to right, transparent 60%, rgba(247,244,239,0.35) 100%)' }}
            />
          </motion.div>

          {/* Text */}
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
                The CourtSide Difference
              </p>
            </motion.div>

            <motion.h2
              variants={fadeUp}
              transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
              className="text-3xl md:text-4xl lg:text-5xl font-light text-brand-dark leading-tight mb-8"
              style={{ fontFamily: 'var(--font-display)', fontStyle: 'italic' }}
            >
              More than a padel trip.<br />An experience you'll
              keep talking about.
            </motion.h2>

            <motion.div
              variants={fadeUp}
              transition={{ duration: 0.6 }}
              className="space-y-5 text-brand-dark/55 font-light text-base leading-relaxed"
            >
              <p>
                Most padel trips offer courts and accommodation. CourtSide offers something different — a curated retreat where every detail, from the coaching staff to the dinner table, has been personally selected.
              </p>
              <p>
                We don't do generic. We do considered. And that's the difference between a trip you forget and a week you talk about for years.
              </p>
            </motion.div>
          </motion.div>

        </div>
      </section>

      {/* ── Stats strip ─────────────────────────────────────── */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-40px' }}
        transition={{ duration: 0.65, ease: 'easeOut' }}
        className="bg-brand-dark py-16 md:py-20 px-8 md:px-16"
      >
        <div className="max-w-5xl mx-auto flex flex-wrap items-center justify-center gap-x-12 gap-y-8 md:gap-x-16">
          {stats.map((s, i) => (
            <div key={i} className="flex flex-col items-center text-center">
              <span
                className="text-3xl md:text-4xl font-light text-white mb-1"
                style={{ fontFamily: 'var(--font-display)' }}
              >
                {s.value}
              </span>
              <span className="text-[8px] uppercase tracking-[0.3em] text-white/35 font-medium">{s.label}</span>
            </div>
          ))}
        </div>
      </motion.section>

      {/* ── Team ────────────────────────────────────────────── */}
      <section className="py-24 md:py-32 px-8 md:px-16 bg-white">
        <div className="max-w-7xl mx-auto">

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.65, ease: 'easeOut' }}
            className="mb-16 md:mb-20"
          >
            <div className="flex items-center gap-4 mb-5">
              <span className="block h-px w-7 bg-brand-gold/40" aria-hidden="true" />
              <p className="text-[9px] uppercase tracking-[0.38em] text-brand-gold font-semibold">The Team</p>
            </div>
            <h2
              className="text-4xl md:text-5xl font-light text-brand-dark"
              style={{ fontFamily: 'var(--font-display)', fontStyle: 'italic' }}
            >
              {t('aboutPage.teamTitle')}
            </h2>
          </motion.div>

          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-60px' }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5"
          >
            {team && Array.isArray(team) && team.map((member, idx) => {
              const hasPhoto = member.photo && !member.photo.includes('/team/');
              return (
                <motion.div
                  key={member.name}
                  variants={fadeUp}
                  transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
                  className="group relative overflow-hidden rounded-2xl bg-brand-dark-2 border border-white/5 aspect-[3/4] flex flex-col justify-end hover:border-brand-gold/25 transition-all duration-500"
                >
                  {hasPhoto ? (
                    <>
                      <div className="absolute inset-0 skeleton-card z-[1]" aria-hidden="true" />
                      <img
                        src={member.photo}
                        alt={member.name}
                        loading="lazy"
                        decoding="async"
                        className="absolute inset-0 w-full h-full object-cover object-top z-0 transition-transform duration-700 group-hover:scale-105"
                        onLoad={(e) => {
                          const skel = e.currentTarget.previousElementSibling as HTMLElement;
                          if (skel) skel.style.display = 'none';
                        }}
                      />
                    </>
                  ) : (
                    <div
                      className="absolute inset-0 z-0 flex items-center justify-center"
                      style={{ background: 'linear-gradient(160deg, #041E36 0%, #0a2840 60%, #072035 100%)' }}
                    >
                      <span
                        style={{
                          fontFamily: 'var(--font-display)',
                          fontStyle: 'italic',
                          fontSize: '6rem',
                          fontWeight: 300,
                          color: 'rgba(217,173,98,0.10)',
                          letterSpacing: '0.04em',
                          userSelect: 'none',
                        }}
                      >
                        {member.name.charAt(0)}
                      </span>
                    </div>
                  )}

                  <div
                    className="absolute inset-0 z-10"
                    style={{ background: 'linear-gradient(to top, rgba(1,25,44,0.95) 0%, rgba(1,25,44,0.40) 50%, transparent 100%)' }}
                  />

                  <div className="relative z-20 p-6 md:p-7">
                    <div className="w-6 h-px bg-brand-gold mb-3 opacity-60 group-hover:w-10 transition-all duration-300" />
                    <h3
                      className="text-lg font-light text-white mb-1 leading-snug"
                      style={{ fontFamily: 'var(--font-display)', fontStyle: 'italic' }}
                    >
                      {member.name}
                    </h3>
                    <p className="text-brand-gold/80 tracking-widest text-[9px] uppercase font-medium">{member.role}</p>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* ── CTA ─────────────────────────────────────────────── */}
      <section className="py-24 md:py-32 px-8 md:px-16 bg-brand-ivory">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          className="max-w-3xl mx-auto text-center"
        >
          <div className="flex items-center justify-center gap-4 mb-5">
            <span className="block h-px w-7 bg-brand-gold/40" aria-hidden="true" />
            <p className="text-[9px] uppercase tracking-[0.38em] text-brand-gold font-semibold">Join Us</p>
            <span className="block h-px w-7 bg-brand-gold/40" aria-hidden="true" />
          </div>
          <h2
            className="text-4xl md:text-5xl font-light text-brand-dark mb-5"
            style={{ fontFamily: 'var(--font-display)', fontStyle: 'italic' }}
          >
            Ready to see it<br />for yourself?
          </h2>
          <p className="text-brand-dark/45 text-base font-light leading-relaxed mb-10 max-w-sm mx-auto">
            The next Menorca retreat is open. A few spots remain.
          </p>
          <a href="/menorca" className="btn-luxury inline-flex items-center gap-3">
            View the Menorca Retreat
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </motion.div>
      </section>

    </div>
  );
}
