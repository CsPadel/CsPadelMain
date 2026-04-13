import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import '../i18n/config';
import { Plus, Minus } from 'lucide-react';

interface FAQProps {
  destination: 'menorca' | 'bali' | 'dubai';
}

export default function FAQ({ destination }: FAQProps) {
  const { t } = useTranslation();
  const faqs = t(`${destination}Page.faq`, { returnObjects: true }) as Array<{ q: string; a: string }>;
  
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (idx: number) => {
    if (openIndex === idx) setOpenIndex(null);
    else setOpenIndex(idx);
  };

  return (
    <section className="bg-brand-dark py-32 px-8 md:px-16" id="faq">
      <div className="max-w-4xl mx-auto">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl font-light mb-16 tracking-wide text-center"
        >
          {t(`${destination}Page.faqTitle`)}
        </motion.h2>

        <div className="space-y-4">
          {faqs && Array.isArray(faqs) && faqs.map((faq, idx) => (
            <div key={idx} className="border-b border-white/10">
              <button 
                onClick={() => toggle(idx)}
                className="w-full py-8 flex items-center justify-between text-left focus:outline-none group"
              >
                <span className="text-xl md:text-2xl font-light text-white/90 group-hover:text-brand-gold transition-colors pr-8">
                  {faq.q}
                </span>
                <span className="text-white/50 group-hover:text-brand-gold transition-colors flex-shrink-0">
                  {openIndex === idx ? <Minus size={24} /> : <Plus size={24} />}
                </span>
              </button>
              
              <AnimatePresence>
                {openIndex === idx && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="overflow-hidden"
                  >
                    <p className="pb-8 text-white/50 text-lg leading-relaxed pr-12">
                      {faq.a}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
