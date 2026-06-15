import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from './locales/en';
import es from './locales/es';
import fr from './locales/fr';
import { getLocaleFromDocument } from './routing';

export const resources = {
  en: { translation: en },
  es: { translation: es },
  fr: { translation: fr },
};

const initialLocale = typeof window !== 'undefined' ? getLocaleFromDocument() : 'en';

i18n.use(initReactI18next).init({
  resources,
  lng: initialLocale,
  fallbackLng: 'en',
  supportedLngs: ['en', 'es', 'fr'],
  interpolation: {
    escapeValue: false,
  },
});

if (typeof window !== 'undefined') {
  const syncLocaleFromUrl = () => {
    const locale = getLocaleFromDocument();
    if (i18n.language !== locale) {
      i18n.changeLanguage(locale);
    }
  };

  syncLocaleFromUrl();
  window.addEventListener('popstate', syncLocaleFromUrl);
}

export default i18n;
