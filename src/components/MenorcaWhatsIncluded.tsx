import React from 'react';
import { useTranslation } from 'react-i18next';

export default function MenorcaWhatsIncluded() {
  const { t } = useTranslation();

  // We explicitly type the pillars array so TS knows what to expect,
  // or we can map over a hardcoded array of keys to fetch from translations.
  const pillars = [
    {
      image: '/imagenes/JOPS-1071.JPG',
      alt: 'Elite padel coaching session at CourtSide Menorca',
    },
    {
      image: '/imagenes/IMG_2914.JPG',
      alt: 'Luxury stay at Barcelo Nura Menorca',
    },
    {
      image: '/imagenes/bambu.jpg',
      alt: 'Fine dining and curated culinary journey',
    },
    {
      image: '/imagenes/Cala en porter.jpg',
      alt: 'Private boat tour and bespoke experiences',
    },
  ];

  return (
    <section id="includes" aria-label="What is included in the Menorca padel retreat" className="bg-brand-dark py-24 md:py-32 px-6 md:px-16">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-light text-center text-brand-light mb-4 tracking-wide">
          {t('menorcaPage.whatsIncluded.title')}
        </h2>
        <p className="text-brand-light/50 text-center text-lg mb-20 max-w-2xl mx-auto leading-relaxed">
          {t('menorcaPage.whatsIncluded.subtitle')}
        </p>

        <div className="flex flex-col gap-20">
          {pillars.map((pillar, index) => {
            const isTextLeft = index % 2 === 0;
            
            return (
              <div key={index} className="flex flex-col md:flex-row items-center gap-10 md:gap-16">
                {/* TEXT COLUMN */}
                <div className={`w-full md:w-1/2 ${isTextLeft ? 'order-2 md:order-1' : 'order-2'}`}>
                  <p className="text-xs uppercase tracking-widest text-brand-gold mb-4 font-semibold">
                    {t(`menorcaPage.whatsIncluded.pillars.${index}.tag`)}
                  </p>
                  <h3 className="text-2xl md:text-3xl font-light text-brand-light mb-5 leading-snug">
                    {t(`menorcaPage.whatsIncluded.pillars.${index}.title`)}
                  </h3>
                  <p className="text-brand-light/60 text-lg leading-relaxed">
                    {t(`menorcaPage.whatsIncluded.pillars.${index}.desc`)}
                  </p>
                </div>
                
                {/* IMAGE COLUMN */}
                <div className={`w-full md:w-1/2 overflow-hidden ${isTextLeft ? 'order-1 md:order-2' : 'order-1'}`}>
                  <img
                    src={pillar.image}
                    alt={pillar.alt}
                    className="w-full h-72 md:h-[450px] object-cover hover:scale-105 transition-transform duration-700 ease-in-out"
                    loading="lazy"
                    decoding="async"
                    width="640"
                    height="480"
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
