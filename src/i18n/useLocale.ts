import { useEffect, useState } from 'react';
import { locales, localeLabels, type Locale } from './locales';
import { getLocaleFromDocument, localizedPath } from './routing';

export function useLocale(): Locale {
  const [locale, setLocale] = useState<Locale>(() =>
    typeof window !== 'undefined' ? getLocaleFromDocument() : 'en'
  );

  useEffect(() => {
    setLocale(getLocaleFromDocument());
  }, []);

  return locale;
}

export function useLocalizedHref(localeProp?: Locale) {
  const locale = localeProp ?? useLocale();

  return (path: string) => localizedPath(path, locale);
}

export { locales, localeLabels };
