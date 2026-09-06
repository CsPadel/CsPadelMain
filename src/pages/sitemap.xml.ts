import type { APIRoute } from 'astro';
import { getSitemapEntries } from '../i18n/seo';
import { SITE_URL, sitePath } from '../constants/site';

/**
 * Generates the sitemap at build time from the same page registry the pages
 * themselves use.
 *
 * This replaces a hand-maintained public/sitemap.xml that had drifted: it was
 * missing /bali, /dubai, /upcoming-retreats and most /es and /fr variants, and
 * every URL in it pointed at a hostname that no longer resolves. Deriving it
 * from getSitemapEntries() means a new page can no longer be forgotten.
 */

/** English-only pages that sit outside the localized page registry. */
const STANDALONE_PAGES = [
  { path: '/legal/privacy-policy', changefreq: 'yearly', priority: '0.3' },
  { path: '/legal/terms-and-conditions', changefreq: 'yearly', priority: '0.3' },
];

const LASTMOD = '2026-09-05';

export const GET: APIRoute = () => {
  const entries = getSitemapEntries(SITE_URL).map((e) => ({ ...e, lastmod: LASTMOD }));

  for (const p of STANDALONE_PAGES) {
    entries.push({ loc: sitePath(p.path), lastmod: LASTMOD, changefreq: p.changefreq, priority: p.priority });
  }

  const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${entries
  .map(
    (e) => `  <url>
    <loc>${e.loc}</loc>
    <lastmod>${e.lastmod}</lastmod>
    <changefreq>${e.changefreq}</changefreq>
    <priority>${e.priority}</priority>
  </url>`,
  )
  .join('\n')}
</urlset>
`;

  return new Response(body, {
    headers: { 'Content-Type': 'application/xml; charset=utf-8' },
  });
};
