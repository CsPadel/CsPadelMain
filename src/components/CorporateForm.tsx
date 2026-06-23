import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, FileDown } from 'lucide-react';
import '../i18n/config';
import type { Locale } from '../i18n/locales';
import { usePageTranslation } from '../i18n/usePageTranslation';

interface CorporateFormProps {
  locale?: Locale;
}

type Category = 'leadership' | 'teamBuilding' | 'cSuite';

const cards: {
  id: Category;
  image: string;
  tag: string;
  title: string;
  desc: string;
}[] = [
  {
    id: 'leadership',
    image: '/imagenes/JOPS-1071.JPG',
    tag: 'Leadership Development',
    title: 'Sharpen minds. Elevate performance.',
    desc: 'Strategic coaching sessions designed to forge decisive leaders under pressure — on court and in the boardroom.',
  },
  {
    id: 'teamBuilding',
    image: '/imagenes/2808 copy.jpg',
    tag: 'Team Building',
    title: 'Build trust. Play together. Win together.',
    desc: 'Curated group experiences that strengthen cohesion, communication and collective drive across your team.',
  },
  {
    id: 'cSuite',
    image: '/imagenes/cap roig.jpg',
    tag: 'C-Suite Retreat',
    title: 'Silence the noise. Think clearly.',
    desc: 'Exclusive access for boards and executive committees. High-calibre networking in the most private settings.',
  },
];

export default function CorporateForm({ locale: localeProp }: CorporateFormProps) {
  const { t } = usePageTranslation(localeProp);
  const [email, setEmail] = useState('');
  const [category, setCategory] = useState<Category>('cSuite');
  const [isDownloading, setIsDownloading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setIsDownloading(true);
    setTimeout(() => {
      setIsDownloading(false);
      setSubmitted(true);
    }, 1400);
  };

  return (
    <section className="bg-white py-24 md:py-32 px-8 md:px-16 border-t border-brand-dark/6">
      <div className="max-w-7xl mx-auto">

        {/* ── Header ─────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-2xl mb-16 md:mb-20"
        >
          <p className="text-[10px] uppercase tracking-[0.3em] text-brand-gold font-semibold mb-4">
            Corporate Experiences
          </p>
          <h2
            className="text-4xl md:text-6xl lg:text-7xl font-light text-brand-dark leading-none mb-6"
            style={{ fontFamily: 'var(--font-display)', fontStyle: 'italic' }}
            dangerouslySetInnerHTML={{ __html: t('corporate.title') }}
          />
          <p className="text-brand-dark/50 text-lg font-light leading-relaxed max-w-lg">
            {t('corporate.desc')}
          </p>
        </motion.div>

        {/* ── Experience Cards ────────────────────────────── */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5 mb-20">
          {cards.map((card, i) => (
            <motion.button
              key={card.id}
              onClick={() => setCategory(card.id)}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, delay: i * 0.1 }}
              className={`group relative overflow-hidden rounded-card text-left transition-all duration-400 focus:outline-none ${
                category === card.id
                  ? 'ring-1 ring-brand-gold/70'
                  : 'ring-1 ring-white/5 hover:ring-white/20'
              }`}
              style={{ minHeight: '480px' }}
            >
              {/* Image */}
              <img
                src={card.image}
                alt={card.tag}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                loading="lazy"
              />

              {/* Gradient overlay */}
              <div
                className="absolute inset-0 transition-opacity duration-400"
                style={{
                  background:
                    category === card.id
                      ? 'linear-gradient(to bottom, rgba(1,25,44,0.18) 0%, rgba(1,25,44,0.55) 45%, rgba(1,25,44,0.97) 100%)'
                      : 'linear-gradient(to bottom, rgba(1,25,44,0.25) 0%, rgba(1,25,44,0.62) 45%, rgba(1,25,44,0.98) 100%)',
                }}
              />

              {/* Selected badge */}
              {category === card.id && (
                <div className="absolute top-5 right-5 w-6 h-6 rounded-full bg-brand-gold flex items-center justify-center">
                  <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                    <path d="M1 4L3.5 6.5L9 1" stroke="#01192C" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
              )}

              {/* Content */}
              <div className="absolute bottom-0 left-0 right-0 p-7 md:p-8">
                <span className="text-[10px] uppercase tracking-[0.22em] text-brand-gold font-semibold mb-3 block">
                  {card.tag}
                </span>
                <h3
                  className="text-xl md:text-2xl font-light text-white mb-3 leading-snug"
                  style={{ fontFamily: 'var(--font-display)', fontStyle: 'italic' }}
                >
                  {card.title}
                </h3>
                <p className="text-white/55 text-sm font-light leading-relaxed mb-5">
                  {card.desc}
                </p>
                <div
                  className={`flex items-center gap-2 text-[11px] uppercase tracking-widest font-semibold transition-colors duration-200 ${
                    category === card.id ? 'text-brand-gold' : 'text-white/40 group-hover:text-white/70'
                  }`}
                >
                  {category === card.id ? 'Selected' : 'Select'}
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </div>

              {/* Gold bottom line on selected */}
              <div
                className={`absolute bottom-0 left-0 h-[2px] bg-brand-gold transition-all duration-500 ${
                  category === card.id ? 'w-full' : 'w-0'
                }`}
              />
            </motion.button>
          ))}
        </div>

        {/* ── Dossier Request Form ─────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="max-w-xl mx-auto text-center"
        >
          <div className="flex items-center justify-center gap-4 mb-8">
            <div className="h-px flex-1 bg-brand-dark/10" />
            <p className="text-[10px] uppercase tracking-[0.25em] text-brand-dark/40 font-semibold whitespace-nowrap">
              {t('corporate.downloadLabel')}
            </p>
            <div className="h-px flex-1 bg-white/8" />
          </div>

          {submitted ? (
            <div className="py-8">
              <p
                className="text-2xl font-light text-brand-dark mb-2"
                style={{ fontFamily: 'var(--font-display)', fontStyle: 'italic' }}
              >
                Dossier on its way.
              </p>
              <p className="text-brand-dark/45 text-sm">Check your inbox — the executive file has been dispatched.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={t('corporate.emailPlaceholder')}
                required
                className="flex-1 bg-brand-dark/4 border border-brand-dark/10 rounded-button px-5 py-4 text-sm text-brand-dark placeholder:text-brand-dark/30 focus:outline-none focus:border-brand-gold/60 transition-colors"
              />
              <button
                type="submit"
                disabled={isDownloading}
                className="btn-luxury shrink-0 disabled:opacity-50 disabled:cursor-not-allowed group"
              >
                {isDownloading ? t('corporate.generatingPdf') : t('corporate.getDossierBtn')}
                {!isDownloading && (
                  <FileDown className="w-4 h-4 group-hover:translate-y-0.5 transition-transform duration-200" />
                )}
              </button>
            </form>
          )}

          <p className="text-brand-dark/30 text-[11px] mt-4 tracking-wide">
            Your dossier is tailored to the{' '}
            <span className="text-brand-gold">
              {cards.find((c) => c.id === category)?.tag}
            </span>{' '}
            vertical.
          </p>
        </motion.div>

      </div>
    </section>
  );
}
