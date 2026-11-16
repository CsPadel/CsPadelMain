import React, { useEffect, useState } from 'react';
import '../i18n/config';
import { locales, localeLabels } from '../i18n/useLocale';
import { getLocaleFromDocument, localizedPath } from '../i18n/routing';
import type { Locale } from '../i18n/locales';

interface LanguageToggleProps {
  /** `onDark` is for dark panels such as the mobile menu. */
  variant?: 'dark' | 'light' | 'onDark';
  locale?: Locale;
  pathname?: string;
}

export default function LanguageToggle({ variant = 'dark', locale: localeProp, pathname: pathnameProp }: LanguageToggleProps) {
  const [currentLang, setCurrentLang] = useState<Locale>(localeProp ?? 'en');
  const [currentPath, setCurrentPath] = useState<string>(pathnameProp ?? '/');

  useEffect(() => {
    setCurrentLang(localeProp ?? getLocaleFromDocument());
    setCurrentPath(window.location.pathname + window.location.search + window.location.hash);
  }, [localeProp]);

  const onDark = variant === 'onDark';

  return (
    <div className={`flex items-center border rounded-full px-1 py-1 bg-white/10 backdrop-blur-sm ${onDark ? 'border-white/15' : 'border-brand-dark/10'}`}>
      {locales.map((lang) => {
        const href = localizedPath(currentPath, lang);
        return (
          <a
            key={lang}
            href={href}
            hrefLang={lang}
            lang={lang}
            onClick={(e) => {
              if (lang === currentLang) {
                e.preventDefault();
              }
            }}
            className={`px-3 py-1.5 rounded-full text-xs font-semibold tracking-widest transition-all duration-200 ${
              currentLang === lang
                ? 'bg-brand-gold text-brand-dark shadow-sm'
                : onDark
                  ? 'text-white/60 hover:text-white'
                  : 'text-brand-dark/50 hover:text-brand-dark'
            }`}
            aria-current={currentLang === lang ? 'true' : undefined}
          >
            {localeLabels[lang]}
          </a>
        );
      })}
    </div>
  );
}
