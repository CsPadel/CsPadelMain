/**
 * Link & CTA audit — Courtside Padel
 * ===================================
 *
 * Crawls the site, collects every <a> and every element that can trigger a
 * navigation, follows each destination, and reports what actually happens.
 *
 * Runs each crawl twice — 1440x900 and 390x844 — because the navigation is not
 * the same at both sizes: the desktop "Destinations" menu only renders on
 * hover, and the mobile menu only renders behind the hamburger. A crawl at a
 * single viewport silently misses half the navigation.
 *
 * Usage:
 *   node audit/link-audit.mjs --base https://www.cspadel.com
 *   node audit/link-audit.mjs --base http://localhost:4321 --label local
 *
 * Playwright is resolved from PLAYWRIGHT_CORE (a path to a playwright-core
 * install) or from node_modules. Chromium is taken from CHROMIUM_PATH so the
 * already-installed browser is reused instead of downloading another one.
 *
 * Outputs:
 *   audit/link-audit.csv  — one row per (page, viewport, link)
 *   audit/link-audit.md   — human-readable summary, worst first
 */

import { writeFileSync, mkdirSync } from 'node:fs';
import { dirname, resolve as resolvePath } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const HERE = dirname(fileURLToPath(import.meta.url));

/* ─── CLI ──────────────────────────────────────────────────── */

function arg(name, fallback) {
  const i = process.argv.indexOf(`--${name}`);
  return i !== -1 && process.argv[i + 1] ? process.argv[i + 1] : fallback;
}

const BASE = arg('base', 'https://www.cspadel.com').replace(/\/$/, '');
const LABEL = arg('label', new URL(BASE).host);
const MAX_PAGES = Number(arg('max-pages', '60'));
const OUT_CSV = arg('csv', resolvePath(HERE, 'link-audit.csv'));
const OUT_MD = arg('md', resolvePath(HERE, 'link-audit.md'));

const CHROMIUM_PATH = process.env.CHROMIUM_PATH || undefined;

const VIEWPORTS = [
  { name: 'desktop', width: 1440, height: 900 },
  { name: 'mobile', width: 390, height: 844 },
];

/**
 * The language switcher is a <button>, not a link, so a pure crawl never
 * reaches /es/ or /fr/. Seed them explicitly or two thirds of the site goes
 * unaudited.
 */
const SEED_PATHS = arg('seeds', '/,/es/,/fr/').split(',').filter(Boolean);

/**
 * Hosts whose 3xx/JS hop is the product working as designed, not a defect.
 * wa.me exists to bounce visitors to the WhatsApp client.
 */
const KNOWN_REDIRECTORS = ['wa.me', 'api.whatsapp.com', 'web.whatsapp.com', 'goo.gl'];

/* ─── Playwright resolution ────────────────────────────────── */

async function loadPlaywright() {
  const override = process.env.PLAYWRIGHT_CORE;
  // playwright-core is CommonJS: a path import hands back the module on
  // `default`, while a bare specifier also exposes named exports.
  const unwrap = (m) => (m?.chromium ? m : m?.default);

  if (override) {
    return unwrap(await import(pathToFileURL(resolvePath(override, 'index.js')).href));
  }
  try {
    return unwrap(await import('playwright-core'));
  } catch {
    return unwrap(await import('playwright'));
  }
}

/* ─── Helpers ──────────────────────────────────────────────── */

const baseHost = new URL(BASE).host;

/** Strips the hash and normalises the trailing slash, for same-page comparison. */
function normalise(url) {
  try {
    const u = new URL(url);
    u.hash = '';
    if (u.pathname !== '/' && u.pathname.endsWith('/')) u.pathname = u.pathname.slice(0, -1);
    return u.href;
  } catch {
    return url;
  }
}

/** Non-http schemes are destinations we must not fetch, but must still report. */
function schemeOf(href) {
  const m = /^([a-z][a-z0-9+.-]*):/i.exec(href.trim());
  const scheme = m ? m[1].toLowerCase() : 'relative';
  return ['http', 'https', 'relative'].includes(scheme) ? 'http' : scheme;
}

function isHtmlPage(url) {
  return !/\.(jpg|jpeg|png|webp|avif|gif|svg|mp4|webm|pdf|zip|ico|xml|txt|json|css|js)$/i.test(
    new URL(url).pathname,
  );
}

function csvCell(v) {
  const s = String(v ?? '');
  return /[",\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
}

/* ─── Severity model ───────────────────────────────────────── */

/**
 * P0 costs the user the journey, P1 costs search visibility or trust,
 * P2 is friction, P3 is hygiene. Sorted by this key in the report.
 */
const SEVERITY_ORDER = { P0: 0, P1: 1, P2: 2, P3: 3, OK: 4, INFO: 5 };

function classify(row) {
  if (row.samePage) {
    return { severity: 'P0', issue: 'Dead link — resolves to the page it sits on' };
  }
  if (row.scheme === 'http' && row.error) {
    return { severity: 'P0', issue: `Unreachable — ${row.error}` };
  }
  if (row.status >= 400) {
    return { severity: 'P0', issue: `HTTP ${row.status}` };
  }
  if (row.knownRedirector) {
    return { severity: 'INFO', issue: 'Intentional redirector (messaging deep link)' };
  }
  if (row.clientSideRedirect) {
    return { severity: 'P1', issue: 'Client-side redirect (meta refresh / JS) — passes no link equity' };
  }
  if (row.crossHost && row.targetBlank && !/noopener/.test(row.rel || '')) {
    return { severity: 'P3', issue: 'target=_blank without rel=noopener' };
  }
  if (row.redirected) {
    return { severity: 'P2', issue: `Redirects to ${row.finalUrl}` };
  }
  if (row.scheme !== 'http') {
    return { severity: 'INFO', issue: `${row.scheme}: link (not fetched)` };
  }
  return { severity: 'OK', issue: '' };
}

/* ─── Link extraction ──────────────────────────────────────── */

/**
 * Reveals navigation that is not in the initial DOM: the desktop Destinations
 * dropdown (hover) and the mobile menu (hamburger). Best-effort — a site
 * without them simply yields nothing extra.
 */
async function revealHiddenNav(page, viewport) {
  try {
    if (viewport.name === 'mobile') {
      const burger = page.locator('nav button').last();
      if (await burger.isVisible({ timeout: 1500 }).catch(() => false)) {
        await burger.click({ timeout: 2000 });
        await page.waitForTimeout(700);
      }
    } else {
      const trigger = page.locator('nav button', {
        hasText: /destinations|destinos|destinations/i,
      }).first();
      if (await trigger.isVisible({ timeout: 1500 }).catch(() => false)) {
        await trigger.hover({ timeout: 2000 });
        await page.waitForTimeout(500);
      }
    }
  } catch {
    /* navigation reveal is opportunistic; failures are not audit failures */
  }
}

/**
 * Playwright's CSS engine pierces open shadow roots, so a dev-mode crawl also
 * picks up the Astro dev toolbar's own links and headings. Those are not the
 * site under audit.
 */
const IN_DEV_TOOLBAR = `(el) => {
  let node = el;
  while (node) {
    const root = node.getRootNode();
    if (root && root.host) {
      const tag = root.host.tagName ? root.host.tagName.toLowerCase() : '';
      if (tag.startsWith('astro-dev-toolbar') || tag === 'astro-dev-overlay') return true;
      node = root.host;
    } else return false;
  }
  return false;
}`;

async function collectAnchors(page) {
  return page.$$eval('a', (els, fnSrc) => {
    const inToolbar = eval(fnSrc);
    return els.filter((a) => !inToolbar(a)).map((a) => ({
      text: (a.innerText || a.getAttribute('aria-label') || '').trim().replace(/\s+/g, ' ').slice(0, 120),
      href: a.getAttribute('href') ?? '',
      resolved: a.href,
      target: a.getAttribute('target') ?? '',
      rel: a.getAttribute('rel') ?? '',
      visible: !!(a.offsetWidth || a.offsetHeight || a.getClientRects().length),
    }));
  }, IN_DEV_TOOLBAR);
}

/**
 * Buttons that read like calls to action but are not anchors. These never show
 * up in a link checker, yet they are exactly where an enquiry is won or lost.
 */
async function collectJsCtas(page) {
  return page.$$eval('button, [role="button"]', (els, fnSrc) => {
    const inToolbar = eval(fnSrc);
    return els
      .filter((b) => !inToolbar(b))
      .map((b) => ({
        text: (b.innerText || b.getAttribute('aria-label') || '').trim().replace(/\s+/g, ' ').slice(0, 120),
        visible: !!(b.offsetWidth || b.offsetHeight || b.getClientRects().length),
      }))
      .filter((b) => b.visible && b.text.length > 0);
  }, IN_DEV_TOOLBAR);
}

/* ─── Destination checking ─────────────────────────────────── */

const checkCache = new Map();

async function checkUrl(request, url) {
  if (checkCache.has(url)) return checkCache.get(url);

  const out = { status: 0, finalUrl: url, error: '', clientSideRedirect: false };
  try {
    const res = await request.get(url, { timeout: 25000, maxRedirects: 10 });
    out.status = res.status();
    out.finalUrl = res.url();

    // A meta-refresh or location.replace() page returns 200 while still sending
    // the user somewhere else. Only an HTML body reveals it.
    const ct = res.headers()['content-type'] || '';
    if (ct.includes('text/html')) {
      const body = await res.text().catch(() => '');
      const meta = /<meta[^>]+http-equiv=["']?refresh["']?[^>]*content=["'][^"']*url=([^"';]+)/i.exec(body);
      const js = /location\.(?:replace|href\s*=)\s*\(?\s*["']([^"']+)["']/i.exec(body);
      if (meta || js) {
        out.clientSideRedirect = true;
        out.finalUrl = (meta?.[1] || js?.[1] || out.finalUrl).trim();
      }
    }
  } catch (e) {
    out.error = String(e.message || e).split('\n')[0].slice(0, 160);
  }

  checkCache.set(url, out);
  return out;
}

/* ─── Crawl ────────────────────────────────────────────────── */

async function run() {
  const { chromium, request: pwRequest } = await loadPlaywright();

  const browser = await chromium.launch({
    executablePath: CHROMIUM_PATH,
    args: ['--disable-dev-shm-usage'],
  });
  const request = await pwRequest.newContext({ ignoreHTTPSErrors: true });

  const rows = [];
  const pageMeta = [];

  for (const viewport of VIEWPORTS) {
    const context = await browser.newContext({
      viewport: { width: viewport.width, height: viewport.height },
      isMobile: viewport.name === 'mobile',
      hasTouch: viewport.name === 'mobile',
      userAgent:
        viewport.name === 'mobile'
          ? 'Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1'
          : undefined,
    });

    const queue = SEED_PATHS.map((p) => `${BASE}${p.startsWith('/') ? p : `/${p}`}`);
    const seen = new Set(queue.map(normalise));

    while (queue.length && seen.size <= MAX_PAGES) {
      const pageUrl = queue.shift();
      const page = await context.newPage();

      let landedUrl = pageUrl;
      let pageStatus = 0;
      try {
        const res = await page.goto(pageUrl, { waitUntil: 'domcontentloaded', timeout: 40000 });
        pageStatus = res?.status() ?? 0;
        // Islands hydrate after load; the footer only exists once React runs.
        await page.waitForTimeout(1800);
        landedUrl = page.url();
      } catch (e) {
        rows.push({
          viewport: viewport.name,
          sourcePage: pageUrl,
          text: '(page load)',
          href: '',
          resolved: pageUrl,
          finalUrl: '',
          status: 0,
          scheme: 'http',
          error: String(e.message || e).split('\n')[0].slice(0, 160),
          samePage: false,
          redirected: false,
          crossHost: false,
          clientSideRedirect: false,
          target: '',
          rel: '',
          visible: true,
          kind: 'page',
        });
        await page.close();
        continue;
      }

      // Page-level SEO facts. A canonical pointing at a host that does not
      // resolve is invisible to a link checker but fatal for search.
      if (viewport.name === 'desktop') {
        const canonical = await page
          .locator('link[rel="canonical"]')
          .first()
          .getAttribute('href')
          .catch(() => null);
        const title = await page.title().catch(() => '');
        const h1Count = await page
          .$$eval('h1', (els, fnSrc) => {
            const inToolbar = eval(fnSrc);
            return els.filter((h) => !inToolbar(h)).length;
          }, IN_DEV_TOOLBAR)
          .catch(() => 0);
        pageMeta.push({ url: landedUrl, status: pageStatus, canonical, title, h1Count });
      }

      await revealHiddenNav(page, viewport);

      // A page that navigates while we read it (meta refresh, JS redirect)
      // destroys the execution context mid-eval. Settle and retry once, then
      // record the page rather than aborting the whole crawl.
      const readDom = async (fn) => {
        try {
          return await fn(page);
        } catch {
          await page.waitForLoadState('domcontentloaded', { timeout: 10000 }).catch(() => {});
          await page.waitForTimeout(1200);
          return await fn(page).catch(() => []);
        }
      };

      const anchors = await readDom(collectAnchors);
      const ctas = await readDom(collectJsCtas);

      // Landed URL may have moved since load if the page self-redirects.
      if (page.url() !== landedUrl) {
        rows.push({
          viewport: viewport.name, sourcePage: landedUrl, text: '(self-redirect)',
          href: '', resolved: landedUrl, finalUrl: page.url(), status: pageStatus,
          scheme: 'http', error: '', samePage: false, redirected: true, crossHost: false,
          clientSideRedirect: true, knownRedirector: false, target: '', rel: '', visible: true,
          kind: 'page', severity: 'P1',
          issue: `Client-side redirect to ${page.url()} — passes no link equity`,
        });
        landedUrl = page.url();
      }

      for (const a of anchors) {
        const scheme = schemeOf(a.href);
        const row = {
          viewport: viewport.name,
          sourcePage: landedUrl,
          text: a.text || '(no text)',
          href: a.href,
          resolved: a.resolved,
          target: a.target,
          rel: a.rel,
          visible: a.visible,
          scheme,
          kind: 'anchor',
          status: 0,
          finalUrl: '',
          error: '',
          clientSideRedirect: false,
          samePage: false,
          redirected: false,
          crossHost: false,
          knownRedirector: false,
        };

        const isEmptyHref = ['', '#', '/#'].includes(a.href.trim());
        row.samePage = isEmptyHref || (scheme === 'http' && normalise(a.resolved) === normalise(landedUrl) && a.href.trim().startsWith('#'));

        if (scheme === 'http' && !row.samePage) {
          const host = (() => { try { return new URL(a.resolved).host; } catch { return ''; } })();
          row.crossHost = host !== baseHost;
          row.knownRedirector = KNOWN_REDIRECTORS.includes(host);

          const res = await checkUrl(request, a.resolved);
          row.status = res.status;
          row.finalUrl = res.finalUrl;
          row.error = res.error;
          row.clientSideRedirect = res.clientSideRedirect;
          row.redirected = !res.error && normalise(res.finalUrl) !== normalise(a.resolved);

          // Same-origin HTML pages feed the crawl.
          if (!row.crossHost && res.status === 200 && isHtmlPage(a.resolved) && !res.clientSideRedirect) {
            const key = normalise(a.resolved);
            if (!seen.has(key) && seen.size < MAX_PAGES) {
              seen.add(key);
              queue.push(a.resolved);
            }
          }
        }

        const { severity, issue } = classify(row);
        rows.push({ ...row, severity, issue });
      }

      for (const c of ctas) {
        const row = {
          viewport: viewport.name,
          sourcePage: landedUrl,
          text: c.text,
          href: '(javascript)',
          resolved: '',
          finalUrl: '',
          status: 0,
          scheme: 'js',
          error: '',
          samePage: false,
          redirected: false,
          crossHost: false,
          clientSideRedirect: false,
          target: '',
          rel: '',
          visible: true,
          kind: 'js-cta',
          severity: 'INFO',
          issue: 'JS-driven CTA — verify behaviour manually (opens modal / drawer)',
        };
        rows.push(row);
      }

      await page.close();
    }

    await context.close();
  }

  await request.dispose();
  await browser.close();

  writeReports(rows, pageMeta);
}

/* ─── Reporting ────────────────────────────────────────────── */

function writeReports(rows, pageMeta) {
  mkdirSync(HERE, { recursive: true });

  const cols = [
    'severity', 'issue', 'viewport', 'kind', 'sourcePage', 'text', 'href',
    'resolved', 'finalUrl', 'status', 'error', 'samePage', 'redirected',
    'crossHost', 'target', 'rel', 'visible',
  ];
  const csv = [cols.join(',')]
    .concat(rows.map((r) => cols.map((c) => csvCell(r[c])).join(',')))
    .join('\n');
  writeFileSync(OUT_CSV, csv, 'utf8');

  const ranked = [...rows].sort(
    (a, b) => (SEVERITY_ORDER[a.severity] ?? 9) - (SEVERITY_ORDER[b.severity] ?? 9),
  );

  const counts = rows.reduce((acc, r) => {
    acc[r.severity] = (acc[r.severity] || 0) + 1;
    return acc;
  }, {});

  // One line per distinct problem, with the pages and viewports it appears on.
  const grouped = new Map();
  for (const r of ranked) {
    if (r.severity === 'OK' || r.severity === 'INFO') continue;
    const key = `${r.severity}|${r.issue}|${r.text}|${r.href}`;
    if (!grouped.has(key)) grouped.set(key, { ...r, pages: new Set(), viewports: new Set() });
    grouped.get(key).pages.add(r.sourcePage);
    grouped.get(key).viewports.add(r.viewport);
  }

  const lines = [];
  lines.push(`# Link & CTA audit — ${LABEL}`);
  lines.push('');
  lines.push(`- Base: \`${BASE}\``);
  lines.push(`- Run: ${new Date().toISOString()}`);
  lines.push(`- Viewports: ${VIEWPORTS.map((v) => `${v.width}x${v.height}`).join(', ')}`);
  lines.push(`- Pages crawled: ${new Set(rows.map((r) => r.sourcePage)).size}`);
  lines.push(`- Links checked: ${rows.filter((r) => r.kind === 'anchor').length}`);
  lines.push('');
  lines.push('| Severity | Count |');
  lines.push('| --- | ---: |');
  for (const s of Object.keys(SEVERITY_ORDER)) {
    if (counts[s]) lines.push(`| ${s} | ${counts[s]} |`);
  }
  lines.push('');

  lines.push('## Findings, worst first');
  lines.push('');
  if (grouped.size === 0) {
    lines.push('No broken links or redirects found.');
  } else {
    lines.push('| Sev | Issue | Link text | href | Final URL | Viewports | Pages |');
    lines.push('| --- | --- | --- | --- | --- | --- | ---: |');
    for (const g of grouped.values()) {
      lines.push(
        `| ${g.severity} | ${g.issue} | ${g.text.replace(/\|/g, '\\|')} | \`${g.href}\` | ${g.finalUrl || '—'} | ${[...g.viewports].join(', ')} | ${g.pages.size} |`,
      );
    }
  }
  lines.push('');

  lines.push('## Page-level SEO');
  lines.push('');
  lines.push('| Page | Status | Canonical | Canonical host resolves to this site? | H1 count |');
  lines.push('| --- | ---: | --- | --- | ---: |');
  for (const p of pageMeta) {
    const host = (() => { try { return new URL(p.canonical, p.url).host; } catch { return '—'; } })();
    lines.push(
      `| ${p.url} | ${p.status} | ${p.canonical || '(none)'} | ${host === baseHost ? 'yes' : `**no — ${host}**`} | ${p.h1Count === 0 ? '**0**' : p.h1Count} |`,
    );
  }
  lines.push('');

  lines.push('## JS-driven CTAs');
  lines.push('');
  lines.push('These trigger no navigation, so no link checker sees them. Each needs a manual pass.');
  lines.push('');
  const ctaTexts = new Map();
  for (const r of rows.filter((r) => r.kind === 'js-cta')) {
    if (!ctaTexts.has(r.text)) ctaTexts.set(r.text, new Set());
    ctaTexts.get(r.text).add(r.sourcePage);
  }
  lines.push('| CTA text | Pages |');
  lines.push('| --- | ---: |');
  for (const [text, pages] of ctaTexts) {
    lines.push(`| ${text.replace(/\|/g, '\\|')} | ${pages.size} |`);
  }

  writeFileSync(OUT_MD, lines.join('\n'), 'utf8');

  console.log(`\n${OUT_CSV}\n${OUT_MD}\n`);
  console.log(
    Object.entries(counts)
      .sort((a, b) => (SEVERITY_ORDER[a[0]] ?? 9) - (SEVERITY_ORDER[b[0]] ?? 9))
      .map(([s, n]) => `${s}: ${n}`)
      .join('  '),
  );
}

run().catch((e) => {
  console.error(e);
  process.exit(1);
});
