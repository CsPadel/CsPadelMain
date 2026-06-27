import { motion } from 'framer-motion';

const partners = [
  { name: 'Barceló Hotel Group',    logo: '/paterns/Frame-1984077457-1.png', width: 210 },
  { name: 'Mandarin Oriental',      logo: '/paterns/mandrain-logo-1.png',    width: 240 },
  { name: 'Bodegas Binifadet',      logo: '/paterns/Frame-1984077463.png',   width: 210 },
  { name: 'Stratford Padel Club',   logo: '/paterns/stratford-logo.png',     width: 130 },
  { name: 'Padelin',                logo: '/paterns/Frame-1984077456.png',   width: 170 },
  { name: 'En Caragol',             logo: '/paterns/Frame-1984077458-1.png', width: 155 },
  { name: 'El Rais Sesforquilles',  logo: '/paterns/Frame-1984077459-1.png', width: 155 },
  { name: 'VTC Menorca',            logo: '/paterns/Frame-1984077460-1.png', width: 140 },
  { name: 'Boat Charter Menorca',   logo: '/paterns/Frame-1984077461-1.png', width: 130 },
  { name: 'Rutas Kayak Menorca',    logo: '/paterns/Frame-1984077462-1.png', width: 125 },
  { name: 'Sant Patrici Menorca',   logo: '/paterns/Frame-1984077464.png',   width: 148 },
  { name: 'The Uluwatu Estate',     logo: '/paterns/Uluwatu-Estate-logo.png',width: 185 },
  { name: 'Padel Pro',              logo: '/paterns/padel-pro-Logo.png',     width: 140 },
];

export default function PartnersSection() {
  const track = [...partners, ...partners];

  return (
    <section
      className="py-20 md:py-28 bg-brand-ivory border-t border-brand-dark/6 overflow-hidden"
      aria-label="Our partners"
    >
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="text-center px-8 mb-14"
      >
        <div className="flex items-center justify-center gap-4 mb-4">
          <span className="block h-px w-7 bg-brand-gold/40" aria-hidden="true" />
          <p className="text-[9px] uppercase tracking-[0.38em] text-brand-gold font-semibold">
            Our Partners
          </p>
          <span className="block h-px w-7 bg-brand-gold/40" aria-hidden="true" />
        </div>
        <h3
          className="text-2xl md:text-3xl font-light text-brand-dark"
          style={{ fontFamily: 'var(--font-display)', fontStyle: 'italic' }}
        >
          Curated by the best.
        </h3>
      </motion.div>

      {/* Marquee */}
      <div className="relative">
        {/* Left fade */}
        <div
          className="absolute left-0 top-0 bottom-0 w-24 md:w-40 z-10 pointer-events-none"
          style={{ background: 'linear-gradient(to right, var(--color-brand-ivory), transparent)' }}
        />
        {/* Right fade */}
        <div
          className="absolute right-0 top-0 bottom-0 w-24 md:w-40 z-10 pointer-events-none"
          style={{ background: 'linear-gradient(to left, var(--color-brand-ivory), transparent)' }}
        />

        <div style={{ overflow: 'hidden' }}>
          <div className="cs-marquee-track">
            {track.map((partner, i) => (
              <div
                key={`${partner.name}-${i}`}
                className="cs-marquee-item"
                aria-hidden={i >= partners.length ? true : undefined}
              >
                <img
                  src={partner.logo}
                  alt={partner.name}
                  loading="lazy"
                  decoding="async"
                  className="cs-partner-logo"
                  style={{ width: `${partner.width}px` }}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
