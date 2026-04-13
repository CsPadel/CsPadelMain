import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ChevronDown } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import '../i18n/config';
import LanguageToggle from './LanguageToggle';

export default function Navbar() {
  const { t } = useTranslation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDestinationsOpen, setIsDestinationsOpen] = useState(false);

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 bg-brand-dark/30 backdrop-blur-md border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between h-24">
          
          {/* Logo */}
          <a href="/" className="flex-shrink-0 z-50">
            <img src="/logogold.webp" alt="CourtSide Padel" className="h-10 md:h-12 object-contain" />
          </a>

          {/* Desktop Center Links */}
          <div className="hidden md:flex items-center gap-12 absolute left-1/2 -translate-x-1/2">
            <a href="/about" className="text-sm tracking-widest uppercase font-medium text-brand-light/70 hover:text-brand-gold transition-colors">
              {t('navbar.about')}
            </a>
            <a href="/services" className="text-sm tracking-widest uppercase font-medium text-brand-light/70 hover:text-brand-gold transition-colors">
              {t('navbar.services')}
            </a>
            
            <div 
              className="relative group"
              onMouseEnter={() => setIsDestinationsOpen(true)}
              onMouseLeave={() => setIsDestinationsOpen(false)}
            >
              <button className="flex items-center gap-2 text-sm tracking-widest uppercase font-medium text-brand-light/70 group-hover:text-brand-gold transition-colors cursor-pointer">
                {t('navbar.destinations')} <ChevronDown size={16} />
              </button>
              
              <AnimatePresence>
                {isDestinationsOpen && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute top-full left-1/2 -translate-x-1/2 pt-6 w-48"
                  >
                    <div className="bg-brand-dark-2 border border-white/10 flex flex-col p-2 shadow-2xl">
                      <a href="/menorca" className="px-4 py-3 text-sm tracking-widest uppercase text-brand-light/60 hover:text-brand-gold hover:bg-white/5 transition-all">{t('navbar.menorca')}</a>
                      <a href="/bali" className="px-4 py-3 text-sm tracking-widest uppercase text-brand-light/60 hover:text-brand-gold hover:bg-white/5 transition-all">{t('navbar.bali')}</a>
                      <a href="/dubai" className="px-4 py-3 text-sm tracking-widest uppercase text-brand-light/60 hover:text-brand-gold hover:bg-white/5 transition-all">{t('navbar.dubai')}</a>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Right Actions */}
          <div className="hidden md:flex items-center z-50">
            <LanguageToggle />
          </div>

          {/* Mobile Hamburger toggle */}
          <button 
            className="md:hidden z-50 text-brand-light"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </nav>

      {/* Mobile Full Screen Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: '-100%' }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: '-100%' }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-40 bg-brand-dark flex flex-col items-center justify-center pt-24 pb-12 px-6"
          >
            <div className="flex flex-col items-center gap-8 w-full max-w-sm">
              <a href="/about" className="text-3xl font-light tracking-wide text-white hover:text-brand-gold transition-colors">{t('navbar.about')}</a>
              <a href="/services" className="text-3xl font-light tracking-wide text-white hover:text-brand-gold transition-colors">{t('navbar.services')}</a>
              
              <div className="w-full h-px bg-white/10 my-4" />
              
              <span className="text-sm tracking-widest uppercase text-brand-gold">{t('navbar.destinations')}</span>
              <a href="/menorca" className="text-2xl font-light text-white/70 hover:text-white transition-colors">{t('navbar.menorca')}</a>
              <a href="/bali" className="text-2xl font-light text-white/70 hover:text-white transition-colors">{t('navbar.bali')}</a>
              <a href="/dubai" className="text-2xl font-light text-white/70 hover:text-white transition-colors">{t('navbar.dubai')}</a>
              
              <div className="w-full h-px bg-white/10 my-4" />
              
              <div className="scale-125 mt-4">
                <LanguageToggle />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
