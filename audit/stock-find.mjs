/**
 * Finds candidate stock photos on Unsplash, Pexels and Pixabay.
 *
 * Both licences allow commercial use without attribution, same as Pexels.
 * What is off limits is the venue's own website or Google Images — those are
 * the hotel's copyright, or its photographer's.
 *
 * Both sites render results client-side, so the pages have to be driven in a
 * real browser. This only collects candidates; every one still has to be
 * looked at, and in the 3:4 crop the strip actually uses.
 *
 * Usage:
 *   node audit/stock-find.mjs unsplash "english country house" "misty lake"
 *   node audit/stock-find.mjs pexels "wood fired hot tub"
 */

import { writeFileSync, mkdirSync } from 'node:fs';
import { dirname, resolve as resolvePath } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const HERE = dirname(fileURLToPath(import.meta.url));
const CHROMIUM_PATH = process.env.CHROMIUM_PATH;

async function loadPlaywright() {
  const override = process.env.PLAYWRIGHT_CORE;
  const unwrap = (m) => (m?.chromium ? m : m?.default);
  if (override) return unwrap(await import(pathToFileURL(resolvePath(override, 'index.js')).href));
  return unwrap(await import('playwright-core'));
}

const SOURCES = {
  unsplash: {
    url: (q) => `https://unsplash.com/s/photos/${encodeURIComponent(q).replaceAll('%20', '-')}`,
    // profile-* are contributor avatars, not results.
    extract: (page) =>
      page.$$eval('img[src*="images.unsplash.com/photo-"]', (imgs) =>
        imgs.map((i) => (i.getAttribute('src') || '').split('?')[0]).filter(Boolean),
      ),
    // Unsplash serves any size from the base URL.
    thumb: (base) => `${base}?w=420&h=560&fit=crop&q=70`,
    full: (base) => `${base}?w=1000&h=1333&fit=crop&q=82`,
  },
  pexels: {
    url: (q) => `https://www.pexels.com/search/${encodeURIComponent(q)}/`,
    // The anchors carry the id and a descriptive slug; the <img> srcs in the
    // grid are polluted with 40px contributor avatars.
    extract: (page) =>
      page.$$eval('a[href*="/photo/"]', (as) =>
        as
          .map((a) => /\/photo\/.+-(\d+)\/?$/.exec(a.getAttribute('href') || '')?.[1])
          .filter(Boolean),
      ),
    thumb: (id) =>
      `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=420&h=560&fit=crop`,
    full: (id) =>
      `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=1000&h=1333&fit=crop`,
  },
  /**
   * Flickr, restricted to CC0 and Public Domain Mark (licence ids 9 and 10).
   * Those need no attribution, same as Pexels and Unsplash.
   *
   * Deliberately excludes CC BY (4) and CC BY-SA (5): both require a visible
   * credit, and BY-SA's share-alike bites on a crop. CC BY-ND (6) is excluded
   * outright — the strip crops to 3:4, which is a derivative.
   *
   * Flickr encodes size in the filename suffix: _n 320, _w 400, _c 800,
   * _b 1024, _h 1600, _k 2048. A 3:4 crop at 1000x1333 needs _h or _k, so
   * anything smaller has to be discarded after download.
   */
  flickr: {
    url: (q) => `https://www.flickr.com/search/?text=${encodeURIComponent(q)}&license=9%2C10`,
    extract: (page) =>
      page.$$eval('img', (imgs) =>
        imgs
          .map((i) => i.getAttribute('src') || '')
          .filter((s) => s.includes('live.staticflickr.com'))
          .map((s) => (s.startsWith('//') ? `https:${s}` : s)),
      ),
    thumb: (u) => u.replace(/_[a-z]?\.jpg$/, '_c.jpg'),
    full: (u) => u.replace(/_[a-z]?\.jpg$/, '_k.jpg'),
  },
  /**
   * Kept for completeness, but it did not earn its place: a search for
   * "english manor house garden" returned German châteaux and haunted-castle
   * illustrations, and "outdoor hot tub wooden" returned coffee cups, a cat
   * and a tin of paint. Try Unsplash and Pexels first.
   */
  pixabay: {
    url: (q) => `https://pixabay.com/images/search/${encodeURIComponent(q)}/?orientation=vertical`,
    extract: (page) =>
      page.$$eval('img[src*="cdn.pixabay.com/photo"]', (imgs) =>
        imgs.map((i) => (i.getAttribute('src') || '').split('?')[0]).filter(Boolean),
      ),
    thumb: (u) => u,
    full: (u) => u,
  },
};

const [sourceName, ...queries] = process.argv.slice(2);
const source = SOURCES[sourceName];
if (!source || !queries.length) {
  console.error('Usage: node audit/stock-find.mjs <unsplash|pexels|pixabay> "query" ["query" ...]');
  process.exit(1);
}

const { chromium } = await loadPlaywright();
const browser = await chromium.launch({ executablePath: CHROMIUM_PATH });
const results = {};

for (const [index, q] of queries.entries()) {
  // A fresh context and a pause: reusing one returns empty grids after the
  // first query on both sites.
  if (index > 0) await new Promise((r) => setTimeout(r, 8000));
  const context = await browser.newContext({
    viewport: { width: 1400, height: 1000 },
    userAgent:
      'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0 Safari/537.36',
  });
  const page = await context.newPage();
  try {
    await page.goto(source.url(q), { waitUntil: 'domcontentloaded', timeout: 45000 });
    await page.waitForTimeout(4000);
    for (let i = 0; i < 3; i++) {
      await page.evaluate(() => window.scrollBy(0, 900));
      await page.waitForTimeout(1000);
    }
    const found = await source.extract(page);
    results[q] = [...new Set(found)].slice(0, 12);
    console.log(`${q}: ${results[q].length}`);
  } catch (e) {
    console.error(`${q}: ${String(e.message).split('\n')[0]}`);
    results[q] = [];
  }
  await page.close();
  await context.close();
}

await browser.close();

// Contact sheet in the 3:4 crop the strip uses, so the choice is made on what
// will actually be on the page rather than on a landscape thumbnail.
const cells = Object.entries(results)
  .flatMap(([q, urls]) =>
    urls.map(
      (u, i) =>
        `<figure><img src="${source.thumb(u)}" loading="eager"><figcaption>${q} · ${i}<br><code>${u.slice(-28)}</code></figcaption></figure>`,
    ),
  )
  .join('');

mkdirSync(HERE, { recursive: true });
writeFileSync(resolvePath(HERE, 'stock-candidates.json'), JSON.stringify(results, null, 2), 'utf8');
writeFileSync(
  resolvePath(HERE, 'stock-sheet.html'),
  `<html><body style="background:#111;color:#eee;font:11px system-ui;margin:0;padding:12px">
<div style="display:grid;grid-template-columns:repeat(6,1fr);gap:8px">${cells}</div>
<style>figure{margin:0}img{width:100%;aspect-ratio:3/4;object-fit:cover;display:block;border-radius:3px}
figcaption{padding:3px 1px;line-height:1.25}code{color:#9ab}</style></body></html>`,
  'utf8',
);

console.log(`\n${resolvePath(HERE, 'stock-sheet.html')}`);
