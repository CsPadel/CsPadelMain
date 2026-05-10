import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import '../i18n/config';
import { ChevronDown } from 'lucide-react';

interface FAQProps {
  destination: 'menorca' | 'bali' | 'dubai';
  theme?: 'light' | 'dark';
}

export default function FAQ({ destination, theme = 'dark' }: FAQProps) {
  const { t, i18n } = useTranslation();
  const faqs = t(`${destination}Page.faq`, { returnObjects: true }) as Array<{ q: string; a: string }>;
  
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [showAll, setShowAll] = useState(false);

  const toggle = (idx: number) => {
    if (openIndex === idx) setOpenIndex(null);
    else setOpenIndex(idx);
  };

  const isLight = theme === 'light';

  return (
    <section className={`${isLight ? 'bg-gray-50' : 'bg-brand-dark'} py-32 px-8 md:px-16`} id="faq">
      <div className="max-w-4xl mx-auto">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className={`text-4xl md:text-5xl font-light mb-16 tracking-wide text-center ${isLight ? 'text-gray-900' : 'text-white'}`}
        >
          {t(`${destination}Page.faqTitle`)}
        </motion.h2>

        <div className="space-y-2">
          {faqs && Array.isArray(faqs) && faqs.map((faq, idx) => {
            if (!showAll && idx >= 3) return null;
            const isActive = openIndex === idx;
            const isOthersActive = openIndex !== null && !isActive;

            return (
              <motion.div 
                key={idx}
                layout
                className={`relative transition-all duration-500 ease-out rounded-2xl
                  ${isOthersActive ? 'opacity-40 blur-[1px] scale-[0.99]' : 'opacity-100 blur-0 scale-100'}
                  ${isActive ? (isLight ? 'bg-brand-gold/10 px-6 md:px-8 -mx-6 md:-mx-8 my-4' : 'bg-brand-gold/[0.05] shadow-[0_0_30px_rgba(212,175,55,0.08)] px-6 md:px-8 -mx-6 md:-mx-8 my-4') : 'bg-transparent border-b ' + (isLight ? 'border-gray-200' : 'border-white/10')}
                `}
              >
                <button 
                  onClick={() => toggle(idx)}
                  className="w-full py-8 flex items-center justify-between text-left focus:outline-none group"
                >
                  <span className={`text-xl md:text-2xl font-light transition-colors pr-8 ${isActive ? 'text-brand-gold' : (isLight ? 'text-gray-900 group-hover:text-brand-gold' : 'text-white/90 group-hover:text-brand-gold')}`}>
                    {faq.q}
                  </span>
                  <motion.span 
                    animate={{ rotate: isActive ? 180 : 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className={`flex-shrink-0 transition-colors ${isActive ? 'text-brand-gold' : (isLight ? 'text-gray-400 group-hover:text-brand-gold' : 'text-white/50 group-hover:text-brand-gold')}`}
                  >
                    <ChevronDown size={24} />
                  </motion.span>
                </button>
                
                <AnimatePresence>
                  {isActive && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <p className={`pb-8 text-lg leading-relaxed pr-12 ${isLight ? 'text-gray-600' : 'text-white/70'}`}>
                        {faq.a}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>

        {faqs && faqs.length > 3 && (
          <div className="mt-16 text-center">
            <button
              onClick={() => setShowAll(!showAll)}
              className={`px-8 py-3 border rounded-full text-sm uppercase tracking-widest transition-colors duration-300 ${
                isLight 
                  ? 'border-brand-gold text-brand-gold hover:bg-brand-gold hover:text-white' 
                  : 'border-brand-gold text-brand-gold hover:bg-brand-gold hover:text-brand-dark'
              }`}
            >
              {showAll 
                ? (i18n.language === 'es' ? 'Ver menos' : 'View less') 
                : (i18n.language === 'es' ? 'Ver todas las preguntas' : 'View all questions')}
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
