import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import '../i18n/config';

const pillars = [
  { image: '/imagenes/JOPS-1071.JPG',         alt: 'Elite padel coaching session at CourtSide Menorca' },
  { image: '/imagenes/IMG_2914.JPG',           alt: 'Luxury stay at Barcelo Nura Menorca' },
  { image: '/imagenes/bambu.jpg',              alt: 'Fine dining and curated culinary journey' },
  { image: '/imagenes/Cala en porter.jpg',     alt: 'Private boat tour and bespoke experiences' },
];

export default function MenorcaWhatsIncluded() {
  const { t } = useTranslation();

  return (
    <section
      id="includes"
      aria-label="What is included in the Menorca padel retreat"
      className="bg-white py-24 md:py-32 px-6 md:px-16"
    >
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          className="text-center mb-20 md:mb-28"
        >
          <div className="flex items-center justify-center gap-4 mb-5">
            <span className="block h-px w-7 bg-brand-gold/40" aria-hidden="true" />
            <p className="text-[9px] uppercase tracking-[0.38em] text-brand-gold font-semibold">
              Included
            </p>
            <span className="block h-px w-7 bg-brand-gold/40" aria-hidden="true" />
          </div>
          <h2
            className="text-4xl md:text-5xl font-light text-brand-dark mb-5"
            style={{ fontFamily: 'var(--font-display)', fontStyle: 'italic' }}
          >
            {t('menorcaPage.whatsIncluded.title')}
          </h2>
          <p className="text-brand-dark/50 text-base md:text-lg font-light max-w-xl mx-auto leading-relaxed">
            {t('menorcaPage.whatsIncluded.subtitle')}
          </p>
        </motion.div>

        {/* Pillar rows */}
        <div className="flex flex-col gap-24 md:gap-32">
          {pillars.map((pillar, index) => {
            const isReversed = index % 2 !== 0;

            return (
              <div
                key={index}
                className={`flex flex-col ${isReversed ? 'md:flex-row-reverse' : 'md:flex-row'} items-center gap-10 md:gap-16`}
              >
                {/* Text */}
                <motion.div
                  initial={{ opacity: 0, x: isReversed ? 30 : -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: '-60px' }}
                  transition={{ duration: 0.8, delay: 0.05, ease: [0.22, 1, 0.36, 1] }}
                  className="w-full md:w-1/2"
                >
                  <div className="flex items-center gap-3 mb-5">
                    <span className="block h-px w-5 bg-brand-gold/50" aria-hidden="true" />
                    <p className="text-[9px] uppercase tracking-[0.3em] text-brand-gold font-semibold">
                      {t(`menorcaPage.whatsIncluded.pillars.${index}.tag`)}
                    </p>
                  </div>
                  <h3
                    className="text-3xl md:text-4xl font-light text-brand-dark mb-5 leading-snug"
                    style={{ fontFamily: 'var(--font-display)', fontStyle: 'italic' }}
                  >
                    {t(`menorcaPage.whatsIncluded.pillars.${index}.title`)}
                  </h3>
                  <p className="text-brand-dark/52 text-base md:text-lg leading-relaxed font-light">
                    {t(`menorcaPage.whatsIncluded.pillars.${index}.desc`)}
                  </p>
                </motion.div>

                {/* Image */}
                <motion.div
                  initial={{ opacity: 0, x: isReversed ? -30 : 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: '-60px' }}
                  transition={{ duration: 0.8, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
                  className="w-full md:w-1/2 overflow-hidden rounded-card"
                >
                  <img
                    src={pillar.image}
                    alt={pillar.alt}
                    className="w-full h-72 md:h-[460px] object-cover hover:scale-[1.04] transition-transform duration-700 ease-out"
                    loading="lazy"
                    decoding="async"
                    width="640"
                    height="480"
                  />
                </motion.div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
