import { useEffect } from 'react';
import i18n from './config';
import type { Locale } from './locales';
import { getLocaleFromDocument } from './routing';

export function usePageTranslation(localeProp?: Locale) {
  const locale = localeProp ?? getLocaleFromDocument();

  useEffect(() => {
    if (i18n.language !== locale) {
      void i18n.changeLanguage(locale);
    }
  }, [locale]);

  const t = i18n.getFixedT(locale);
  return { t, locale };
}
