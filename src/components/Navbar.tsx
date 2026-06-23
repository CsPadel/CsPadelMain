import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ChevronDown } from 'lucide-react';
import '../i18n/config';
import LanguageToggle from './LanguageToggle';
import { MENORCA_URL } from '../constants/urls';
import type { Locale } from '../i18n/locales';
import { usePageTranslation } from '../i18n/usePageTranslation';
import { useLocalizedHref } from '../i18n/useLocale';
import { stripLocalePrefix } from '../i18n/routing';

interface NavbarProps {
  locale?: Locale;
}

export default function Navbar({ locale: localeProp }: NavbarProps) {
  const { t } = usePageTranslation(localeProp);
  const localizedHref = useLocalizedHref(localeProp);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDestinationsOpen, setIsDestinationsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [pathname, setPathname] = useState('');

  useEffect(() => {
    setPathname(window.location.pathname);
    const onScroll = () => setIsScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const basePath = stripLocalePrefix(pathname);
  const isActive = (href: string) => basePath === href;
  const homeHref = localizedHref('/');
  const logoSrc = isScrolled ? '/imagenes/Logo Blue.svg' : '/imagenes/Logo Gold.svg';

  const navLinkClass = (active: boolean) =>
    `nav-link text-sm tracking-widest uppercase font-medium transition-colors ${
      active
        ? 'text-brand-gold'
        : isScrolled
          ? 'text-brand-dark/70 hover:text-brand-gold'
          : 'text-brand-light/70 hover:text-brand-gold'
    }`;

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-out ${
          isScrolled
            ? 'bg-white shadow-sm shadow-black/5'
            : 'bg-transparent backdrop-blur-sm'
        }`}
        style={{
          borderBottom: isScrolled
            ? '1px solid rgba(1, 25, 44, 0.07)'
            : '1px solid rgba(255,255,255,0.04)',
        }}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between h-24">

          <a href={homeHref} className="flex-shrink-0 z-50">
            <img
              src={logoSrc}
              alt="CourtSide Padel"
              className="h-16 md:h-[4.5rem] object-contain transition-opacity duration-300"
            />
          </a>

          <div className="hidden md:flex items-center gap-12 absolute left-1/2 -translate-x-1/2">
            <a
              href={localizedHref('/about')}
              className={`nav-link text-sm tracking-widest uppercase font-medium transition-colors ${
                isActive('/about') ? 'text-brand-gold' : isScrolled ? 'text-brand-dark/60 hover:text-brand-gold' : 'text-brand-light/70 hover:text-brand-gold'
              }`}
            >
              {t('navbar.about')}
            </a>
            <a
              href={localizedHref('/services')}
              className={`nav-link text-sm tracking-widest uppercase font-medium transition-colors ${
                isActive('/services') ? 'text-brand-gold' : isScrolled ? 'text-brand-dark/60 hover:text-brand-gold' : 'text-brand-light/70 hover:text-brand-gold'
              }`}
            >
              {t('navbar.services')}
            </a>

            <div
              className="relative group"
              onMouseEnter={() => setIsDestinationsOpen(true)}
              onMouseLeave={() => setIsDestinationsOpen(false)}
            >
              <button className={`nav-link flex items-center gap-2 text-sm tracking-widest uppercase font-medium transition-colors cursor-pointer ${
                isActive('/menorca') || isActive('/bali') || isActive('/dubai')
                  ? 'text-brand-gold'
                  : isScrolled ? 'text-brand-dark/60 group-hover:text-brand-gold' : 'text-brand-light/70 group-hover:text-brand-gold'
              }`}>
                {t('navbar.destinations')} <ChevronDown size={16} className="transition-transform duration-200 group-hover:rotate-180" />
              </button>

              <AnimatePresence>
                {isDestinationsOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 8 }}
                    transition={{ duration: 0.2, ease: 'easeOut' }}
                    className="absolute top-full left-1/2 -translate-x-1/2 pt-6 w-48"
                  >
                    <div className="bg-brand-dark border border-brand-gold/20 rounded-card flex flex-col shadow-2xl shadow-black/50">
                      <a href={MENORCA_URL} className="px-4 py-3 text-sm tracking-widest uppercase text-brand-light/60 hover:text-brand-gold hover:bg-brand-gold/5 transition-all">{t('navbar.menorca')}</a>
                      <a href={localizedHref('/bali')} className="px-4 py-3 text-sm tracking-widest uppercase text-brand-light/60 hover:text-brand-gold hover:bg-brand-gold/5 transition-all">{t('navbar.bali')}</a>
                      <a href={localizedHref('/dubai')} className="px-4 py-3 text-sm tracking-widest uppercase text-brand-light/60 hover:text-brand-gold hover:bg-brand-gold/5 transition-all">{t('navbar.dubai')}</a>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          <div className="hidden md:flex items-center z-50">
            <LanguageToggle variant={isScrolled ? 'light' : 'dark'} />
          </div>

          <button
            className={`md:hidden z-50 transition-colors ${isScrolled ? 'text-brand-dark' : 'text-brand-light'}`}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </nav>

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
              <a href={localizedHref('/about')} className="text-3xl font-light tracking-wide text-white hover:text-brand-gold transition-colors" style={{ fontFamily: 'var(--font-display)' }}>{t('navbar.about')}</a>
              <a href={localizedHref('/services')} className="text-3xl font-light tracking-wide text-white hover:text-brand-gold transition-colors" style={{ fontFamily: 'var(--font-display)' }}>{t('navbar.services')}</a>

              <div className="w-full h-px bg-brand-gold/20 my-4" />

              <span className="text-xs tracking-[0.3em] uppercase text-brand-gold">{t('navbar.destinations')}</span>
              <a href={MENORCA_URL} className="text-2xl font-light text-white/70 hover:text-white transition-colors">{t('navbar.menorca')}</a>
              <a href={localizedHref('/bali')} className="text-2xl font-light text-white/70 hover:text-white transition-colors">{t('navbar.bali')}</a>
              <a href={localizedHref('/dubai')} className="text-2xl font-light text-white/70 hover:text-white transition-colors">{t('navbar.dubai')}</a>

              <div className="w-full h-px bg-brand-gold/20 my-4" />

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
