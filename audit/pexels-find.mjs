/**
 * Finds candidate Pexels photos for the East Sussex strip.
 *
 * Pexels renders search results client-side, so the page has to be driven in a
 * real browser rather than fetched. This only collects candidate URLs — every
 * one still has to be looked at before it goes near the site, because a search
 * for "lake sauna" returns plenty of things that are neither.
 *
 * Usage: node audit/pexels-find.mjs "wood fired hot tub" "misty lake morning"
 */

import { writeFileSync, mkdirSync } from 'node:fs';
import { dirname, resolve as resolvePath } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const HERE = dirname(fileURLToPath(import.meta.url));
const OUT = resolvePath(HERE, 'pexels-candidates.json');
const CHROMIUM_PATH = process.env.CHROMIUM_PATH;

async function loadPlaywright() {
  const override = process.env.PLAYWRIGHT_CORE;
  const unwrap = (m) => (m?.chromium ? m : m?.default);
  if (override) return unwrap(await import(pathToFileURL(resolvePath(override, 'index.js')).href));
  return unwrap(await import('playwright-core'));
}

const queries = process.argv.slice(2);
if (!queries.length) {
  console.error('Pass at least one search query.');
  process.exit(1);
}

const { chromium } = await loadPlaywright();
const browser = await chromium.launch({ executablePath: CHROMIUM_PATH });

const results = {};

// A fresh context and a pause between searches: reusing one context returns
// empty grids from the second query onward.
for (const [index, q] of queries.entries()) {
  if (index > 0) await new Promise((r) => setTimeout(r, 9000));
  const context = await browser.newContext({
    viewport: { width: 1400, height: 1000 },
    userAgent:
      'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0 Safari/537.36',
  });
  const page = await context.newPage();
  const url = `https://www.pexels.com/search/${encodeURIComponent(q)}/?orientation=landscape`;
  try {
    await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 45000 });
    await page.waitForTimeout(3500);
    // Lazy grid: a couple of scrolls is enough for the first two rows.
    for (let i = 0; i < 3; i++) {
      await page.evaluate(() => window.scrollBy(0, 900));
      await page.waitForTimeout(900);
    }

    // The anchors carry both the id and a descriptive slug. The <img> srcs are
    // unreliable here — the grid mixes in 40px avatars and UI icons.
    const found = await page.$$eval('a[href*="/photo/"]', (as) =>
      as
        .map((a) => a.getAttribute('href') || '')
        .map((h) => {
          const m = /\/photo\/(.+)-(\d+)\/?$/.exec(h);
          return m ? { id: m[2], slug: m[1] } : null;
        })
        .filter(Boolean),
    );

    const seen = new Set();
    results[q] = found.filter((f) => !seen.has(f.id) && seen.add(f.id)).slice(0, 14);
    console.log(`${q}: ${results[q].length} candidatos`);
    for (const f of results[q]) console.log(`   ${f.id}  ${f.slug}`);
  } catch (e) {
    console.error(`${q}: ${String(e.message).split('\n')[0]}`);
    results[q] = [];
  }
  await page.close();
  await context.close();
}

await browser.close();

mkdirSync(HERE, { recursive: true });
writeFileSync(OUT, JSON.stringify(results, null, 2), 'utf8');
console.log(`\n${OUT}`);
