import en from './locales/en';
import es from './locales/es';
import fr from './locales/fr';
import { defaultLocale, type Locale } from './locales';

/**
 * Synchronous dictionary lookup for Astro components, which render on the
 * server where the i18next instance in `./config` is never initialised with a
 * locale. React islands should keep using `usePageTranslation` instead.
 */
const dictionaries: Record<Locale, typeof en> = {
  en,
  es: es as unknown as typeof en,
  fr: fr as unknown as typeof en,
};

export function getTranslations(locale: Locale): typeof en {
  return dictionaries[locale] ?? dictionaries[defaultLocale];
}
