import { motion } from 'framer-motion';
import { Mail, MessageCircle } from 'lucide-react';
import '../i18n/config';
import type { Locale } from '../i18n/locales';
import { usePageTranslation } from '../i18n/usePageTranslation';
import { useLocalizedHref } from '../i18n/useLocale';
import { MENORCA_URL, getWhatsAppConciergeUrl } from '../constants/urls';

interface FooterIslandProps {
  readonly locale?: Locale;
}

const linkClass =
  'text-white/40 hover:text-white text-sm font-light tracking-wide transition-colors duration-200';

const colVariants = {
  hidden: { opacity: 0, y: 20 },
  show:   { opacity: 1, y: 0  },
};

const stagger = {
  hidden: {},
  show:   { transition: { staggerChildren: 0.1, delayChildren: 0.05 } },
};

export default function FooterIsland({ locale: localeProp }: FooterIslandProps) {
  const { t }         = usePageTranslation(localeProp);
  const localizedHref = useLocalizedHref(localeProp);
  const waUrl         = getWhatsAppConciergeUrl(
    "Hello, I'd like to enquire about a CourtSide Padel retreat."
  );

  return (
    <footer className="bg-brand-dark" aria-label="Site footer">

      {/* Gold accent line */}
      <div
        className="h-px"
        style={{ background: 'linear-gradient(to right, transparent, rgba(217,173,98,0.45), transparent)' }}
      />

      <div className="max-w-7xl mx-auto px-8 md:px-16 pt-20 md:pt-28 pb-10">

        {/* ── Main grid ─────────────────────────────────────── */}
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-60px' }}
          className="grid grid-cols-2 md:grid-cols-12 gap-12 md:gap-6 mb-16 md:mb-20"
        >

          {/* ── Brand ── */}
          <motion.div
            variants={colVariants}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
            className="col-span-2 md:col-span-4 flex flex-col"
          >
            <img
              src="/logogold.webp"
              alt="CourtSide Padel"
              className="h-9 object-contain object-left mb-8"
              loading="lazy"
            />

            <p
              className="text-white/32 text-base font-light leading-relaxed mb-8 max-w-xs"
              style={{ fontFamily: 'var(--font-display)', fontStyle: 'italic' }}
            >
              "Padel is the excuse.<br />
              The experience is the reason."
            </p>

            {/* Social */}
            <div className="flex items-center gap-3 mt-auto">
              {/* Instagram */}
              <a
                href="#"
                aria-label="CourtSide Padel on Instagram"
                className="w-9 h-9 rounded-full border border-white/12 flex items-center justify-center text-white/35 hover:border-brand-gold/55 hover:text-brand-gold transition-colors duration-200"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                  <circle cx="12" cy="12" r="4" />
                  <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none" />
                </svg>
              </a>
              {/* LinkedIn */}
              <a
                href="#"
                aria-label="CourtSide Padel on LinkedIn"
                className="w-9 h-9 rounded-full border border-white/12 flex items-center justify-center text-white/35 hover:border-brand-gold/55 hover:text-brand-gold transition-colors duration-200"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6z" />
                  <rect x="2" y="9" width="4" height="12" />
                  <circle cx="4" cy="4" r="2" />
                </svg>
              </a>
            </div>
          </motion.div>

          {/* ── Destinations ── */}
          <motion.div
            variants={colVariants}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="col-span-1 md:col-span-2 md:col-start-6"
          >
            <p className="text-[9px] uppercase tracking-[0.38em] text-brand-gold font-semibold mb-6">
              Destinations
            </p>
            <ul className="space-y-4">
              <li>
                <a href={MENORCA_URL} className={linkClass}>
                  Menorca
                </a>
              </li>
              <li>
                <a href={localizedHref('/bali')} className={linkClass}>
                  Bali
                </a>
              </li>
              <li>
                <a href={localizedHref('/dubai')} className={linkClass}>
                  Dubai
                </a>
              </li>
            </ul>
          </motion.div>

          {/* ── Company ── */}
          <motion.div
            variants={colVariants}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="col-span-1 md:col-span-2"
          >
            <p className="text-[9px] uppercase tracking-[0.38em] text-brand-gold font-semibold mb-6">
              Company
            </p>
            <ul className="space-y-4">
              <li>
                <a href={localizedHref('/our-story')} className={linkClass}>
                  Our Story
                </a>
              </li>
              <li>
                <a href={localizedHref('/about')} className={linkClass}>
                  About Us
                </a>
              </li>
              <li>
                <a href={localizedHref('/services')} className={linkClass}>
                  Services
                </a>
              </li>
              <li>
                <a href={localizedHref('/executive-retreat')} className={linkClass}>
                  Executive Retreat
                </a>
              </li>
            </ul>
          </motion.div>

          {/* ── Contact ── */}
          <motion.div
            variants={colVariants}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="col-span-2 md:col-span-3"
          >
            <p className="text-[9px] uppercase tracking-[0.38em] text-brand-gold font-semibold mb-6">
              Get in Touch
            </p>
            <ul className="space-y-5">
              <li>
                <a
                  href={waUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-3 group"
                >
                  <MessageCircle className="w-4 h-4 text-brand-gold/50 group-hover:text-brand-gold mt-0.5 flex-shrink-0 transition-colors duration-200" />
                  <span className={linkClass}>WhatsApp Concierge</span>
                </a>
              </li>
              <li>
                <a
                  href="mailto:executive@courtsidepadel.com"
                  className="flex items-start gap-3 group"
                >
                  <Mail className="w-4 h-4 text-brand-gold/50 group-hover:text-brand-gold mt-0.5 flex-shrink-0 transition-colors duration-200" />
                  <span className={`${linkClass} break-all`}>
                    executive@courtsidepadel.com
                  </span>
                </a>
              </li>
            </ul>

            {/* Concierge CTA */}
            <a
              href={waUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 mt-8 group"
            >
              <span className="text-[9px] uppercase tracking-[0.32em] font-semibold text-white/30 group-hover:text-brand-gold transition-colors duration-200">
                Speak with a concierge
              </span>
              <svg
                className="w-3 h-3 text-white/25 group-hover:text-brand-gold group-hover:translate-x-0.5 transition-all duration-200"
                viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
          </motion.div>

        </motion.div>

        {/* ── Bottom bar ────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="border-t border-white/8 pt-8 flex flex-col md:flex-row justify-between items-center gap-4"
        >
          <p className="text-white/22 text-xs font-light tracking-wide">
            {t('footer.rights')}
          </p>
          <div className="flex items-center gap-6">
            <a href="#" className="text-white/22 text-xs font-light tracking-wide hover:text-white/50 transition-colors">
              {t('footer.privacy')}
            </a>
            <span className="text-white/12" aria-hidden="true">·</span>
            <a href="#" className="text-white/22 text-xs font-light tracking-wide hover:text-white/50 transition-colors">
              {t('footer.terms')}
            </a>
            <span className="text-white/12" aria-hidden="true">·</span>
            <a href={localizedHref('/cookies')} className="text-white/22 text-xs font-light tracking-wide hover:text-white/50 transition-colors">
              {t('footer.cookies')}
            </a>
          </div>
        </motion.div>

      </div>
    </footer>
  );
}
