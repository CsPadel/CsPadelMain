import type { Locale } from './locales';
import { SITE_URL } from '../constants/site';
import { SOCIAL_URLS } from '../constants/urls';

/** JSON-LD (schema.org) graphs for search engines. Passed to Layout via `schema`. */

const ORG_ID = `${SITE_URL}/#organization`;
const WEBSITE_ID = `${SITE_URL}/#website`;

const absolute = (path: string) => new URL(encodeURI(path), SITE_URL).href;

const orgDescriptions: Record<Locale, string> = {
  en: 'Luxury padel retreats combining elite coaching, five-star stays and curated experiences beyond the court.',
  es: 'Retiros de pádel de lujo que combinan entrenamiento de élite, estancias de cinco estrellas y experiencias seleccionadas más allá de la pista.',
  fr: "Retraites de padel de luxe alliant coaching d'élite, séjours cinq étoiles et expériences sur mesure au-delà du court.",
};

function getOrganization(locale: Locale = 'en') {
  return {
    '@type': 'TravelAgency',
    '@id': ORG_ID,
    name: 'Courtside Padel',
    alternateName: 'Courtside Padel Retreats',
    legalName: 'Crtside Events Ltd',
    url: `${SITE_URL}/`,
    logo: absolute('/imagenes/Logo Blue.svg'),
    description: orgDescriptions[locale],
    sameAs: Object.values(SOCIAL_URLS),
    address: {
      '@type': 'PostalAddress',
      streetAddress: '24 Hendham Road',
      addressLocality: 'London',
      postalCode: 'SW17 7DQ',
      addressCountry: 'GB',
    },
  };
}

export function homeSchema(locale: Locale, url: string) {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      getOrganization(locale),
      {
        '@type': 'WebSite',
        '@id': WEBSITE_ID,
        name: 'Courtside Padel',
        url,
        inLanguage: locale,
        publisher: { '@id': ORG_ID },
      },
    ],
  };
}

interface TripOptions {
  locale: Locale;
  url: string;
  name: string;
  description: string;
  image: string;
  place: { name: string; locality?: string; region: string; country: string };
  /** Day-by-day titles, when the retreat has a fixed itinerary. */
  itinerary?: string[];
}

export function touristTripSchema({ locale, url, name, description, image, place, itinerary }: TripOptions) {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      getOrganization(locale),
      {
        '@type': 'TouristTrip',
        '@id': `${url}#trip`,
        name,
        description,
        url,
        image: absolute(image),
        inLanguage: locale,
        touristType: ['Padel players', 'Luxury travellers'],
        provider: { '@id': ORG_ID },
        touristDestination: {
          '@type': 'Place',
          name: place.name,
          address: {
            '@type': 'PostalAddress',
            ...(place.locality ? { addressLocality: place.locality } : {}),
            addressRegion: place.region,
            addressCountry: place.country,
          },
        },
        ...(itinerary
          ? {
              itinerary: {
                '@type': 'ItemList',
                numberOfItems: itinerary.length,
                itemListElement: itinerary.map((day, i) => ({
                  '@type': 'ListItem',
                  position: i + 1,
                  name: day,
                })),
              },
            }
          : {}),
      },
    ],
  };
}

export function aboutPageSchema(locale: Locale, url: string, title: string, description: string, image: string) {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        ...getOrganization(locale),
        founder: [
          { '@type': 'Person', name: 'Alexi Watelet', jobTitle: 'Co-Founder' },
          { '@type': 'Person', name: 'Oliver Watelet', jobTitle: 'Co-Founder' },
        ],
      },
      {
        '@type': 'AboutPage',
        '@id': `${url}#webpage`,
        url,
        name: title,
        description,
        inLanguage: locale,
        primaryImageOfPage: absolute(image),
        about: { '@id': ORG_ID },
      },
    ],
  };
}

export function servicePageSchema(locale: Locale, url: string, name: string, description: string, image: string) {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      getOrganization(locale),
      {
        '@type': 'Service',
        '@id': `${url}#service`,
        name,
        description,
        url,
        image: absolute(image),
        inLanguage: locale,
        provider: { '@id': ORG_ID },
        serviceType: 'Luxury Padel Retreats',
      },
    ],
  };
}

export function upcomingRetreatsSchema(
  locale: Locale,
  url: string,
  title: string,
  description: string,
  items: Array<{ name: string; url: string }>,
) {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      getOrganization(locale),
      {
        '@type': 'CollectionPage',
        '@id': `${url}#webpage`,
        url,
        name: title,
        description,
        inLanguage: locale,
        mainEntity: {
          '@type': 'ItemList',
          numberOfItems: items.length,
          itemListElement: items.map((item, i) => ({
            '@type': 'ListItem',
            position: i + 1,
            name: item.name,
            url: item.url,
          })),
        },
      },
    ],
  };
}
