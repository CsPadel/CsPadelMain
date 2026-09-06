/**
 * Heading sweep — Courtside Padel
 * ================================
 *
 * Collects every rendered heading on every page and locale, then maps each one
 * back to the i18n key it came from.
 *
 * Reading the locale files alone cannot tell you what is actually a heading:
 * `title` keys land in <h2>, <p> and button labels depending on the component.
 * Taking the DOM as the source of truth means the house-style sweep only
 * touches text that is really a heading.
 *
 * Usage:
 *   node audit/heading-sweep.mjs --base http://[::1]:4321
 *
 * Output: audit/headings.json — one record per distinct heading string.
 */

import { readFileSync, writeFileSync } from 'node:fs';
import { dirname, resolve as resolvePath } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const HERE = dirname(fileURLToPath(import.meta.url));
const ROOT = resolvePath(HERE, '..');

function arg(name, fallback) {
  const i = process.argv.indexOf(`--${name}`);
  return i !== -1 && process.argv[i + 1] ? process.argv[i + 1] : fallback;
}

const BASE = arg('base', 'http://[::1]:4321').replace(/\/$/, '');
const CHROMIUM_PATH = process.env.CHROMIUM_PATH || undefined;

async function loadPlaywright() {
  const override = process.env.PLAYWRIGHT_CORE;
  const unwrap = (m) => (m?.chromium ? m : m?.default);
  if (override) return unwrap(await import(pathToFileURL(resolvePath(override, 'index.js')).href));
  try { return unwrap(await import('playwright-core')); } catch { return unwrap(await import('playwright')); }
}

/* ─── Locale files ─────────────────────────────────────────── */

/**
 * The locale modules are plain object literals with `as const`. Stripping the
 * TS wrapper is enough to evaluate them without pulling in a transpiler.
 */
function loadLocale(name) {
  const src = readFileSync(resolvePath(ROOT, `src/i18n/locales/${name}.ts`), 'utf8')
    .replace(/^const \w+ = /, 'return ')
    .replace(/ as const;\s*$/m, ';')
    .replace(/export default \w+;\s*$/m, '');
  // eslint-disable-next-line no-new-func
  return new Function(src)();
}

/** Flattens to dot-paths, with [i] for array members. */
function flatten(obj, prefix = '', out = new Map()) {
  for (const [k, v] of Object.entries(obj)) {
    const path = prefix ? `${prefix}.${k}` : k;
    if (typeof v === 'string') {
      if (!out.has(v)) out.set(v, []);
      out.get(v).push(path);
    } else if (Array.isArray(v)) {
      v.forEach((item, i) => {
        if (typeof item === 'string') {
          if (!out.has(item)) out.set(item, []);
          out.get(item).push(`${path}[${i}]`);
        } else if (item && typeof item === 'object') {
          flatten(item, `${path}[${i}]`, out);
        }
      });
    } else if (v && typeof v === 'object') {
      flatten(v, path, out);
    }
  }
  return out;
}

/* ─── Routes ───────────────────────────────────────────────── */

const PATHS = [
  '/', '/our-story', '/the-experience', '/upcoming-retreats',
  '/executive-retreat', '/east-sussex', '/bali', '/dubai', '/cookies',
  '/legal/privacy-policy', '/legal/terms-and-conditions',
];

const LOCALES = { en: '', es: '/es', fr: '/fr' };

/* ─── Sweep ────────────────────────────────────────────────── */

const IN_DEV_TOOLBAR = `(el) => {
  let node = el;
  while (node) {
    const root = node.getRootNode();
    if (root && root.host) {
      const tag = root.host.tagName ? root.host.tagName.toLowerCase() : '';
      if (tag.startsWith('astro-dev-toolbar')) return true;
      node = root.host;
    } else return false;
  }
  return false;
}`;

async function run() {
  const { chromium } = await loadPlaywright();
  const locales = { en: flatten(loadLocale('en')), es: flatten(loadLocale('es')), fr: flatten(loadLocale('fr')) };

  const browser = await chromium.launch({ executablePath: CHROMIUM_PATH });
  const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });

  /** key: `${locale}|${tag}|${text}` */
  const found = new Map();

  for (const [locale, prefix] of Object.entries(LOCALES)) {
    for (const path of PATHS) {
      // Legal pages are English-only.
      if (path.startsWith('/legal') && locale !== 'en') continue;

      const url = `${BASE}${prefix}${path === '/' ? '/' : path}`;
      const page = await context.newPage();
      try {
        await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 40000 });
        await page.waitForTimeout(2000);
        // Lazy sections only render once scrolled.
        await page.evaluate(async () => {
          for (let y = 0; y < document.body.scrollHeight; y += 600) {
            window.scrollTo(0, y);
            await new Promise((r) => setTimeout(r, 90));
          }
          window.scrollTo(0, 0);
        });
        await page.waitForTimeout(1200);

        const heads = await page.$$eval('h1, h2, h3, h4', (els, fnSrc) => {
          const inToolbar = eval(fnSrc);
          return els
            .filter((h) => !inToolbar(h))
            .map((h) => ({
              tag: h.tagName.toLowerCase(),
              text: (h.innerText || '').replace(/\s+/g, ' ').trim(),
            }))
            .filter((h) => h.text.length > 0);
        }, IN_DEV_TOOLBAR);

        for (const h of heads) {
          const id = `${locale}|${h.tag}|${h.text}`;
          if (!found.has(id)) {
            found.set(id, { locale, tag: h.tag, text: h.text, pages: new Set(), keys: locales[locale].get(h.text) ?? [] });
          }
          found.get(id).pages.add(`${prefix}${path}`);
        }
      } catch (e) {
        console.error(`skip ${url}: ${String(e.message).split('\n')[0]}`);
      }
      await page.close();
    }
  }

  await context.close();
  await browser.close();

  const records = [...found.values()]
    .map((r) => ({ ...r, pages: [...r.pages] }))
    .sort((a, b) => a.locale.localeCompare(b.locale) || a.tag.localeCompare(b.tag) || a.text.localeCompare(b.text));

  writeFileSync(resolvePath(HERE, 'headings.json'), JSON.stringify(records, null, 2), 'utf8');

  const withPeriod = records.filter((r) => /[.]$/.test(r.text) && !/\.\.\.$/.test(r.text));
  const unmapped = records.filter((r) => r.keys.length === 0);
  console.log(`headings: ${records.length}`);
  console.log(`ending in a period: ${withPeriod.length}`);
  console.log(`not traced to an i18n key: ${unmapped.length}`);
}

run().catch((e) => { console.error(e); process.exit(1); });
