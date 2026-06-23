import React, { useEffect, useState } from 'react';
import '../i18n/config';
import { locales, localeLabels } from '../i18n/useLocale';
import { getLocaleFromDocument, localizedPath } from '../i18n/routing';
import type { Locale } from '../i18n/locales';

interface LanguageToggleProps {
  variant?: 'dark' | 'light';
}

export default function LanguageToggle({ variant = 'dark' }: LanguageToggleProps) {
  const [mounted, setMounted] = useState(false);
  const [currentLang, setCurrentLang] = useState<Locale>('en');

  useEffect(() => {
    setCurrentLang(getLocaleFromDocument());
    setMounted(true);
  }, []);

  const switchLang = (nextLang: Locale) => {
    if (nextLang === currentLang) return;
    const nextPath = localizedPath(window.location.pathname + window.location.search + window.location.hash, nextLang);
    window.location.assign(nextPath);
  };

  if (!mounted) return null;

  const isLight = variant === 'light';

  return (
    <div className="flex items-center border border-brand-dark/10 rounded-full px-1 py-1 bg-white/10 backdrop-blur-sm">
      {locales.map((lang) => (
        <button
          key={lang}
          onClick={() => switchLang(lang)}
          className={`px-3 py-1.5 rounded-full text-xs font-semibold tracking-widest transition-all duration-200 ${
            currentLang === lang
              ? 'bg-brand-gold text-brand-dark shadow-sm'
              : 'text-brand-dark/50 hover:text-brand-dark'
          }`}
          aria-current={currentLang === lang ? 'true' : undefined}
        >
          {localeLabels[lang]}
        </button>
      ))}
    </div>
  );
}
