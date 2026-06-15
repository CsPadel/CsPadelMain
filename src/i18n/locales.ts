export const locales = ['en', 'es', 'fr'] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = 'en';

export const localeLabels: Record<Locale, string> = {
  en: 'EN',
  es: 'ES',
  fr: 'FR',
};

export const ogLocales: Record<Locale, string> = {
  en: 'en_GB',
  es: 'es_ES',
  fr: 'fr_FR',
};

export function isLocale(value: string): value is Locale {
  return locales.includes(value as Locale);
}
