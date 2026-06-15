import type { Locale } from './locales';
import { localizedPath } from './routing';

export type PageId = 'home' | 'about' | 'services' | 'cookies';

export interface PageSeo {
  title: string;
  description: string;
  keywords: string;
}

const seoContent: Record<PageId, Record<Locale, PageSeo>> = {
  home: {
    en: {
      title: 'CourtSide | Premium Padel Experience',
      description:
        'Premium padel retreats in the Mediterranean. Book a private suite or exclusive villa. CourtSide — where world-class padel meets ultra-luxury.',
      keywords:
        'padel retreat, luxury padel holiday, Menorca padel, padel experience, private padel villa, CourtSide padel',
    },
    es: {
      title: 'CourtSide | Experiencia Premium de Pádel',
      description:
        'Retiros de pádel premium en el Mediterráneo. Reserve una suite privada o una villa exclusiva. CourtSide — donde el pádel de clase mundial se encuentra con el ultra-lujo.',
      keywords:
        'retiro de pádel, vacaciones de pádel de lujo, pádel Menorca, experiencia de pádel, villa privada de pádel, CourtSide pádel',
    },
    fr: {
      title: 'CourtSide | Expérience Padel Premium',
      description:
        'Retraites padel premium en Méditerranée. Réservez une suite privée ou une villa exclusive. CourtSide — là où le padel d\'exception rencontre l\'ultra-luxe.',
      keywords:
        'retraite padel, séjour padel luxe, padel Minorque, expérience padel, villa padel privée, CourtSide padel',
    },
  },
  about: {
    en: {
      title: 'CourtSide | About Us',
      description:
        'Meet the team behind CourtSide Padel — elevating the global padel experience through world-class performance and uncompromising luxury.',
      keywords: 'CourtSide about, padel founders, Oliver Watellet, Alexy Watellet, luxury padel retreats',
    },
    es: {
      title: 'CourtSide | Nuestra Historia',
      description:
        'Conozca al equipo detrás de CourtSide Padel — elevando la experiencia global del pádel con rendimiento de clase mundial y lujo sin concesiones.',
      keywords: 'CourtSide historia, fundadores pádel, Oliver Watellet, Alexy Watellet, retiros de pádel de lujo',
    },
    fr: {
      title: 'CourtSide | Notre Histoire',
      description:
        'Découvrez l\'équipe derrière CourtSide Padel — élever l\'expérience padel mondiale par la performance d\'exception et un luxe sans compromis.',
      keywords: 'CourtSide histoire, fondateurs padel, Oliver Watellet, Alexy Watellet, retraites padel luxe',
    },
  },
  services: {
    en: {
      title: 'CourtSide | Our Services',
      description:
        'Personal suites, full villa exclusivity, and C-level executive retreats. CourtSide services tailored to your ambition.',
      keywords: 'padel services, private padel suite, villa padel booking, executive padel retreat, corporate padel',
    },
    es: {
      title: 'CourtSide | Nuestros Servicios',
      description:
        'Suites personales, exclusividad en villa completa y retiros ejecutivos C-Level. Servicios CourtSide adaptados a su ambición.',
      keywords: 'servicios pádel, suite padel privada, reserva villa pádel, retiro ejecutivo pádel, pádel corporativo',
    },
    fr: {
      title: 'CourtSide | Nos Services',
      description:
        'Suites personnelles, villa entière en exclusivité et retraites exécutives C-Level. Des services CourtSide adaptés à vos ambitions.',
      keywords: 'services padel, suite padel privée, réservation villa padel, retraite exécutive padel, padel corporate',
    },
  },
  cookies: {
    en: {
      title: 'CourtSide | Cookie Policy',
      description: 'Learn how CourtSide Padel uses cookies and how you can manage your preferences.',
      keywords: 'CourtSide cookies, cookie policy, privacy preferences',
    },
    es: {
      title: 'CourtSide | Política de Cookies',
      description: 'Descubra cómo CourtSide Padel utiliza cookies y cómo puede gestionar sus preferencias.',
      keywords: 'CourtSide cookies, política de cookies, preferencias de privacidad',
    },
    fr: {
      title: 'CourtSide | Politique de Cookies',
      description: 'Découvrez comment CourtSide Padel utilise les cookies et comment gérer vos préférences.',
      keywords: 'CourtSide cookies, politique de cookies, préférences de confidentialité',
    },
  },
};

const pagePaths: Record<PageId, string> = {
  home: '/',
  about: '/about',
  services: '/services',
  cookies: '/cookies',
};

export function getPageSeo(page: PageId, locale: Locale): PageSeo {
  return seoContent[page][locale];
}

export function getAlternateUrls(siteUrl: string, page: PageId): Record<Locale, string> {
  const base = siteUrl.replace(/\/$/, '');
  const path = pagePaths[page];

  return {
    en: `${base}${localizedPath(path, 'en')}`,
    es: `${base}${localizedPath(path, 'es')}`,
    fr: `${base}${localizedPath(path, 'fr')}`,
  };
}

export function getSitemapEntries(siteUrl: string): Array<{ loc: string; lastmod: string; changefreq: string; priority: string }> {
  const base = siteUrl.replace(/\/$/, '');
  const lastmod = '2026-06-15';
  const pages: Array<{ page: PageId; changefreq: string; priority: string }> = [
    { page: 'home', changefreq: 'weekly', priority: '1.0' },
    { page: 'about', changefreq: 'monthly', priority: '0.7' },
    { page: 'services', changefreq: 'monthly', priority: '0.8' },
    { page: 'cookies', changefreq: 'yearly', priority: '0.3' },
  ];

  const entries: Array<{ loc: string; lastmod: string; changefreq: string; priority: string }> = [];

  for (const { page, changefreq, priority } of pages) {
    const urls = getAlternateUrls(base, page);
    for (const loc of Object.values(urls)) {
      entries.push({ loc, lastmod, changefreq, priority });
    }
  }

  return entries;
}
