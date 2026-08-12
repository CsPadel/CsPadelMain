import { motion } from 'framer-motion';

const founders = [
  {
    name: 'Alexi Watelet',
    role: 'Co-Founder',
    photo: '/imagenes/cms/alexi-watelet.jpg',
    layout: 'text-left' as const,
  },
  {
    name: 'Oliver Watelet',
    role: 'Co-Founder',
    photo: '/imagenes/cms/oliver-watelet.jpg',
    layout: 'text-right' as const,
  },
];

/** Shared line that sits beneath both founder portraits. */
const sharedLine =
  'Alexi grew up chasing tennis. Oliver grew up chasing football. Padel gave us the exact same obsession, just for a different game.';

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show:   { opacity: 1, y: 0  },
};

const stagger = {
  hidden: {},
  show:   { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
};

export default function FoundersSection() {
  return (
    <div>
      {/* ── Portraits ── */}
      <div className="bg-brand-ivory px-8 md:px-16 pt-12 md:pt-16 pb-4">
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-80px' }}
          className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-10"
        >
          {founders.map((founder) => (
            <motion.figure
              key={founder.name}
              variants={fadeUp}
              transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-col"
            >
              <div
                className="relative overflow-hidden rounded-2xl aspect-[4/5]"
                style={{
                  boxShadow:
                    '0 32px 80px rgba(1, 25, 44, 0.18), 0 8px 24px rgba(1, 25, 44, 0.10)',
                }}
              >
                <img
                  src={founder.photo}
                  alt={`${founder.name} — Co-Founder, CourtSide Padel`}
                  loading="lazy"
                  decoding="async"
                  className="absolute inset-0 w-full h-full object-cover object-top"
                />
                <div
                  className="absolute inset-0 rounded-2xl pointer-events-none"
                  style={{ boxShadow: 'inset 0 0 0 1px rgba(217, 173, 98, 0.18)' }}
                />
              </div>

              <figcaption className="pt-6">
                <h3
                  className="text-2xl md:text-3xl font-light text-brand-dark leading-none mb-2"
                  style={{ fontFamily: 'var(--font-display)', fontStyle: 'italic' }}
                >
                  {founder.name}
                </h3>
                <p className="text-[9px] uppercase tracking-[0.38em] text-brand-gold font-semibold">
                  {founder.role}
                </p>
              </figcaption>
            </motion.figure>
          ))}
        </motion.div>
      </div>

      {/* ── Shared line beneath both portraits ── */}
      <div className="bg-brand-ivory px-8 md:px-16 pb-20 md:pb-28 pt-10 md:pt-14">
        <motion.blockquote
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          className="max-w-3xl mx-auto text-center"
        >
          <span className="block w-8 h-px bg-brand-gold/50 mx-auto mb-8" aria-hidden="true" />
          <p
            className="text-2xl md:text-3xl lg:text-4xl font-light text-brand-dark leading-snug"
            style={{ fontFamily: 'var(--font-display)', fontStyle: 'italic' }}
          >
            &ldquo;{sharedLine}&rdquo;
          </p>
        </motion.blockquote>
      </div>
    </div>
  );
}
