/**
 * Canonical origin for the site.
 *
 * Every canonical tag, hreflang alternate, Open Graph URL and sitemap entry is
 * built from this value. It was previously repeated as a literal in fourteen
 * files, which is how the whole site ended up pointing at a hostname that no
 * longer resolves — worth keeping in exactly one place.
 *
 * `www` is deliberate: the apex redirects to it, so a canonical without the
 * prefix would point at a URL that immediately redirects.
 */
export const SITE_URL = 'https://www.cspadel.com';

/** Host only, for comparisons and copy that names the site. */
export const SITE_HOST = 'www.cspadel.com';

/** Build an absolute URL on this origin. */
export function sitePath(path: string): string {
  return `${SITE_URL}${path.startsWith('/') ? path : `/${path}`}`;
}
