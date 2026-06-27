import { motion } from 'framer-motion';

const founders = [
  {
    name: 'Alex',
    role: 'Co-Founder',
    photo: '/imagenes/about-us/alex.webp',
    // TODO: Replace with real photo of Alex → /imagenes/about-us/alex-real.webp
    bio: "Alex brings the commercial instinct and operational edge to CourtSide. A lifelong competitor with a deep eye for hospitality, he ensures every retreat is delivered to a standard he'd be proud to attend himself.",
    layout: 'text-left' as const,
  },
  {
    name: 'Oli',
    role: 'Co-Founder',
    photo: '/imagenes/about-us/oli.webp',
    // TODO: Replace with real photo of Oli → /imagenes/about-us/oli-real.webp
    bio: 'Oli is the creative force behind the experience. His network spans padel professionals, luxury hospitality, and people who expect the extraordinary. He curates everything that makes CourtSide feel like an invitation, not a product.',
    layout: 'text-right' as const,
  },
];

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
      {founders.map((founder, i) => {
        const isEven = i % 2 === 0;

        return (
          <div
            key={founder.name}
            className={`${isEven ? 'bg-brand-ivory' : 'bg-white'}`}
          >
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-0 items-center">

              {/* ── Text side ── */}
              <motion.div
                variants={stagger}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: '-80px' }}
                className={`flex flex-col justify-center px-8 md:px-16 py-16 md:py-24 ${
                  isEven ? 'order-1' : 'order-1 md:order-2'
                }`}
              >
                <motion.p
                  variants={fadeUp}
                  transition={{ duration: 0.55, ease: 'easeOut' }}
                  className="text-[9px] uppercase tracking-[0.38em] text-brand-gold font-semibold mb-3"
                >
                  {founder.role}
                </motion.p>

                <motion.h3
                  variants={fadeUp}
                  transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
                  className="text-5xl md:text-6xl font-light text-brand-dark mb-5 leading-none"
                  style={{ fontFamily: 'var(--font-display)', fontStyle: 'italic' }}
                >
                  {founder.name}
                </motion.h3>

                <motion.div
                  variants={fadeUp}
                  transition={{ duration: 0.5, ease: 'easeOut' }}
                  className="w-8 h-px bg-brand-gold/40 mb-7"
                />

                <motion.p
                  variants={fadeUp}
                  transition={{ duration: 0.6, ease: 'easeOut' }}
                  className="text-brand-dark/55 font-light leading-relaxed text-base md:text-lg max-w-md"
                >
                  {founder.bio}
                </motion.p>
              </motion.div>

              {/* ── Photo side ── */}
              <motion.div
                initial={{ opacity: 0, scale: 0.96 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
                className={`p-6 md:p-10 ${isEven ? 'order-2' : 'order-2 md:order-1'}`}
              >
                <div
                  className="relative overflow-hidden rounded-2xl shadow-2xl"
                  style={{
                    minHeight: '480px',
                    boxShadow: '0 32px 80px rgba(1, 25, 44, 0.18), 0 8px 24px rgba(1, 25, 44, 0.10)',
                  }}
                >
                  <img
                    src={founder.photo}
                    alt={`${founder.name} — Co-Founder, CourtSide Padel`}
                    loading="lazy"
                    decoding="async"
                    className="absolute inset-0 w-full h-full object-cover object-top"
                  />
                  {/* Subtle gold border overlay */}
                  <div
                    className="absolute inset-0 rounded-2xl pointer-events-none"
                    style={{ boxShadow: 'inset 0 0 0 1px rgba(217, 173, 98, 0.18)' }}
                  />
                </div>
              </motion.div>

            </div>
          </div>
        );
      })}
    </div>
  );
}
