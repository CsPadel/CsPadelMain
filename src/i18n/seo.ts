import type { Locale } from './locales';
import { localizedPath } from './routing';

export type PageId = 'home' | 'experience' | 'cookies' | 'executiveRetreat' | 'ourStory' | 'upcomingRetreats';

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
  experience: {
    en: {
      title: 'The Experience — CourtSide Padel',
      description:
        'Beyond the court. Real padel expertise, run end-to-end by our own team, plus boat days, vineyards and cliffside sunsets around every retreat.',
      keywords: 'padel retreat experience, luxury padel coaching, off-court experiences Menorca, CourtSide padel experience',
    },
    es: {
      title: 'La Experiencia — CourtSide Padel',
      description:
        'Más allá de la pista. Verdadera experiencia en pádel, gestionada de principio a fin por nuestro equipo, con salidas en barco, viñedos y atardeceres en cada retiro.',
      keywords: 'experiencia retiro pádel, coaching pádel de lujo, experiencias fuera de pista Menorca, experiencia CourtSide pádel',
    },
    fr: {
      title: 'L\'Expérience — CourtSide Padel',
      description:
        'Au-delà du terrain. Une véritable expertise padel, orchestrée de bout en bout par notre équipe, avec sorties en bateau, vignobles et couchers de soleil à chaque retraite.',
      keywords: 'expérience retraite padel, coaching padel luxe, expériences hors terrain Minorque, expérience CourtSide padel',
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
  executiveRetreat: {
    en: {
      title: 'Executive Retreat — CourtSide Padel',
      description: 'Strategy in silence. C-Suite and board-level padel retreats designed for absolute focus, elite networking and leadership development in Menorca.',
      keywords: 'executive padel retreat, C-suite retreat, corporate padel, leadership retreat Menorca, board retreat padel',
    },
    es: {
      title: 'Retiro Ejecutivo — CourtSide Padel',
      description: 'Estrategia en silencio. Retiros de pádel para C-Suite y consejos de administración diseñados para el máximo enfoque y networking de élite en Menorca.',
      keywords: 'retiro ejecutivo pádel, retiro C-suite, pádel corporativo, retiro liderazgo Menorca',
    },
    fr: {
      title: 'Retraite Exécutive — CourtSide Padel',
      description: 'Stratégie dans le silence. Retraites padel pour C-Suite et conseils d\'administration conçues pour un focus absolu et un networking d\'élite à Minorque.',
      keywords: 'retraite exécutive padel, retraite C-suite, padel corporate, retraite leadership Minorque',
    },
  },
  ourStory: {
    en: {
      title: 'Our Story — CourtSide Padel',
      description: 'Twin brothers Alexi and Oliver Watelet picked up padel in Menorca in 2019 and never looked back. This is how CourtSide began.',
      keywords: 'CourtSide story, padel founders, Alexi Oliver Watelet, luxury padel retreat founders',
    },
    es: {
      title: 'Nuestra Historia — CourtSide Padel',
      description: 'Los hermanos gemelos Alexi y Oliver Watelet descubrieron el pádel en Menorca en 2019 y nunca miraron atrás. Así nació CourtSide.',
      keywords: 'historia CourtSide, fundadores pádel, Alexi Oliver Watelet, fundadores retiro pádel lujo',
    },
    fr: {
      title: 'Notre Histoire — CourtSide Padel',
      description: 'Les frères jumeaux Alexi et Oliver Watelet ont découvert le padel à Minorque en 2019 et ne s\'en sont jamais remis. Voici comment CourtSide est né.',
      keywords: 'histoire CourtSide, fondateurs padel, Alexi Oliver Watelet, fondateurs retraite padel luxe',
    },
  },
  upcomingRetreats: {
    en: {
      title: 'Upcoming Retreats — CourtSide Padel',
      description: 'Three new CourtSide destinations arriving over the next 12–18 months — Bali, Dubai and Mykonos. Elite padel retreats. Register your interest.',
      keywords: 'upcoming padel retreats, CourtSide Bali, CourtSide Dubai, CourtSide Mykonos, new padel destinations',
    },
    es: {
      title: 'Próximos Retiros — CourtSide Padel',
      description: 'Tres nuevos destinos CourtSide llegan en los próximos 12 a 18 meses — Bali, Dubái y Mykonos. Retiros de pádel de élite. Regístrate para más información.',
      keywords: 'próximos retiros pádel, CourtSide Bali, CourtSide Dubái, CourtSide Mykonos, nuevos destinos pádel',
    },
    fr: {
      title: 'Prochaines Retraites — CourtSide Padel',
      description: 'Trois nouvelles destinations CourtSide arrivent dans les 12 à 18 prochains mois — Bali, Dubaï et Mykonos. Retraites padel d\'élite. Inscrivez votre intérêt.',
      keywords: 'prochaines retraites padel, CourtSide Bali, CourtSide Dubaï, CourtSide Mykonos, nouvelles destinations padel',
    },
  },
};

const pagePaths: Record<PageId, string> = {
  home: '/',
  experience: '/the-experience',
  cookies: '/cookies',
  executiveRetreat: '/executive-retreat',
  ourStory: '/our-story',
  upcomingRetreats: '/upcoming-retreats',
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
    { page: 'experience', changefreq: 'monthly', priority: '0.8' },
    { page: 'ourStory', changefreq: 'monthly', priority: '0.7' },
    { page: 'executiveRetreat', changefreq: 'monthly', priority: '0.7' },
    { page: 'upcomingRetreats', changefreq: 'weekly', priority: '0.8' },
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
