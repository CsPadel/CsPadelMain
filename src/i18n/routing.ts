import { defaultLocale, isLocale, type Locale } from './locales';

const LOCALE_PREFIX_PATTERN = /^\/(es|fr)(\/|$)/;

export function getLocaleFromPath(pathname: string): Locale {
  const match = pathname.match(LOCALE_PREFIX_PATTERN);
  if (match && isLocale(match[1])) {
    return match[1];
  }
  return defaultLocale;
}

export function stripLocalePrefix(pathname: string): string {
  const withoutPrefix = pathname.replace(LOCALE_PREFIX_PATTERN, '/');
  if (withoutPrefix === '') return '/';
  return withoutPrefix;
}

export function localizedPath(pathname: string, locale: Locale): string {
  const basePath = stripLocalePrefix(pathname.split('?')[0].split('#')[0]);
  const hash = pathname.includes('#') ? pathname.slice(pathname.indexOf('#')) : '';
  const query = pathname.includes('?') ? pathname.slice(pathname.indexOf('?'), pathname.includes('#') ? pathname.indexOf('#') : undefined) : '';

  if (locale === defaultLocale) {
    return `${basePath === '/' ? '/' : basePath}${query}${hash}`;
  }

  if (basePath === '/') {
    return `/${locale}/${query}${hash}`;
  }

  return `/${locale}${basePath}${query}${hash}`;
}

export function getLocaleFromDocument(): Locale {
  if (typeof document === 'undefined') return defaultLocale;
  const fromBody = document.body?.dataset?.locale;
  if (fromBody && isLocale(fromBody)) return fromBody;
  return getLocaleFromPath(window.location.pathname);
}
