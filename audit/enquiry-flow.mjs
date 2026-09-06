/**
 * Enquiry flow verification — Courtside Padel
 * ============================================
 *
 * A link checker cannot tell you that a form does not submit. This walks the
 * five-step enquiry modal end to end at both viewports, exercises the
 * validation on every step, and asserts both outcomes of the submit.
 *
 * The POST is intercepted, never delivered. The configured endpoint is the
 * founders' live Google Apps Script, which writes to their sheet and emails
 * them — a test run must not put fake enquiries in front of a real business.
 * Interception also lets us assert the payload shape and force the failure
 * branch, which a real submission could not do on demand.
 *
 * Usage:
 *   node audit/enquiry-flow.mjs --base http://[::1]:4321
 *
 * Outputs: audit/screenshots/enquiry-<viewport>-<step>.png and a pass/fail log.
 */

import { mkdirSync, writeFileSync } from 'node:fs';
import { dirname, resolve as resolvePath } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const HERE = dirname(fileURLToPath(import.meta.url));
const SHOTS = resolvePath(HERE, 'screenshots');

function arg(name, fallback) {
  const i = process.argv.indexOf(`--${name}`);
  return i !== -1 && process.argv[i + 1] ? process.argv[i + 1] : fallback;
}

const BASE = arg('base', 'http://[::1]:4321').replace(/\/$/, '');
const CHROMIUM_PATH = process.env.CHROMIUM_PATH || undefined;

const VIEWPORTS = [
  { name: 'desktop', width: 1440, height: 900 },
  { name: 'mobile', width: 390, height: 844 },
];

async function loadPlaywright() {
  const override = process.env.PLAYWRIGHT_CORE;
  const unwrap = (m) => (m?.chromium ? m : m?.default);
  if (override) return unwrap(await import(pathToFileURL(resolvePath(override, 'index.js')).href));
  try { return unwrap(await import('playwright-core')); } catch { return unwrap(await import('playwright')); }
}

const results = [];
function check(name, passed, detail = '') {
  results.push({ name, passed, detail });
  console.log(`${passed ? 'PASS' : 'FAIL'}  ${name}${detail ? ` — ${detail}` : ''}`);
}

/* ─── Flow ─────────────────────────────────────────────────── */

/** The dialog's primary button is the only .btn-luxury inside it. */
const nextButton = (dialog) => dialog.locator('button.btn-luxury');

/**
 * Every entry point into the enquiry modal. The label differs by page, so a
 * single selector would silently skip most of them.
 */
const CTA_LOCATIONS = [
  { path: '/the-experience', label: /enquire about a retreat/i },
  { path: '/our-story', label: /enquire about a retreat/i },
  { path: '/', label: /plan your retreat/i },
  { path: '/upcoming-retreats', label: /plan your retreat/i },
  { path: '/dubai', label: /get in touch/i },
  { path: '/east-sussex', label: /enquire about east sussex/i },
  { path: '/bali', label: /enquire about bali/i },
];

/** The page the full five-step walkthrough runs on. */
const FLOW_PATH = arg('path', '/the-experience');
const FLOW_LABEL = /enquire about a retreat/i;

/**
 * The cookie banner is also role="dialog" and overlays the page, so it is
 * dismissed first and the enquiry modal is matched by its accessible name.
 */
async function dismissCookieBanner(page) {
  const accept = page.getByRole('button', { name: /accept all|aceptar todas|tout accepter/i }).first();
  if (await accept.isVisible({ timeout: 3000 }).catch(() => false)) {
    await accept.click().catch(() => {});
    await page.waitForTimeout(500);
  }
}

async function openModal(page, label = FLOW_LABEL) {
  await dismissCookieBanner(page);

  const cta = page.getByRole('button', { name: label }).first();
  const dialog = page.getByRole('dialog', { name: /build your retreat/i });

  // Most of these CTAs are client:visible islands: the markup ships with the
  // page but React only hydrates once they scroll into view. Clicking before
  // hydration hits a button with no handler attached, so scroll, let it
  // hydrate, and retry rather than reporting a phantom broken CTA.
  for (let attempt = 0; attempt < 3; attempt++) {
    await cta.scrollIntoViewIfNeeded({ timeout: 10000 });
    await page.waitForTimeout(1200);
    await cta.click({ timeout: 10000 });
    try {
      await dialog.waitFor({ state: 'visible', timeout: 4000 });
      return dialog;
    } catch {
      if (attempt === 2) throw new Error('CTA never opened the enquiry modal after 3 attempts');
    }
  }
  return dialog;
}

/** Advances one step and reports whether a validation message blocked it. */
async function advance(dialog) {
  await nextButton(dialog).click();
  await dialog.page().waitForTimeout(500);
  const alert = dialog.locator('[role="alert"]');
  return (await alert.count()) > 0 ? (await alert.first().innerText()).trim() : null;
}

async function stepCounter(dialog) {
  const el = dialog.locator('span', { hasText: /^\d+ \/ \d+$/ }).first();
  return (await el.count()) ? (await el.innerText()).trim() : '(hidden)';
}

async function fillFlow(page, viewport, { submitStatus }) {
  const tag = `${viewport.name}-${submitStatus}`;
  const dialog = await openModal(page);
  await page.screenshot({ path: `${SHOTS}/enquiry-${viewport.name}-1-open.png` });
  check(`[${tag}] modal opens from CTA`, await dialog.isVisible());

  // Step 1 — destination. Empty submit must be refused.
  const blocked = await advance(dialog);
  check(`[${tag}] step 1 blocks empty destination`, blocked !== null, blocked ?? 'advanced with no selection');
  await dialog.getByRole('button', { name: 'Menorca', exact: true }).click();
  check(`[${tag}] step 1 accepts a destination`, (await advance(dialog)) === null);

  // Step 2 — dates.
  const blockedDates = await advance(dialog);
  check(`[${tag}] step 2 blocks empty dates`, blockedDates !== null, blockedDates ?? 'advanced with no date');
  await dialog.getByRole('button', { name: 'September', exact: true }).click();
  await dialog.getByRole('button', { name: '2027', exact: true }).click();
  check(`[${tag}] step 2 accepts month + year`, (await advance(dialog)) === null);

  // Step 3 — group size.
  await dialog.locator('#enquiry-group-size').fill('8');
  check(`[${tag}] step 3 accepts group size`, (await advance(dialog)) === null);

  // Step 4 — priorities.
  await dialog.getByRole('button', { name: /coaching and improvement/i }).click();
  await dialog.getByRole('button', { name: /food and wine/i }).click();
  await dialog.locator('#enquiry-notes').fill('Automated flow check — please ignore.');
  check(`[${tag}] step 4 accepts priorities`, (await advance(dialog)) === null);

  check(`[${tag}] reaches final step`, (await stepCounter(dialog)).startsWith('5'), await stepCounter(dialog));
  await page.screenshot({ path: `${SHOTS}/enquiry-${viewport.name}-2-contact.png` });

  // Step 5 — contact validation.
  const blockedEmpty = await advance(dialog);
  check(`[${tag}] step 5 blocks empty contact`, blockedEmpty !== null, blockedEmpty ?? 'submitted empty');

  await dialog.locator('#enquiry-first-name').fill('Flow');
  await dialog.locator('#enquiry-last-name').fill('Check');
  await dialog.locator('#enquiry-email').fill('not-an-email');
  const blockedEmail = await advance(dialog);
  check(`[${tag}] step 5 rejects a malformed email`, blockedEmail !== null, blockedEmail ?? 'accepted "not-an-email"');

  await dialog.locator('#enquiry-email').fill('flow.check@example.com');
  const blockedConsent = await advance(dialog);
  check(`[${tag}] step 5 requires consent`, blockedConsent !== null, blockedConsent ?? 'submitted without consent');

  await dialog.locator('input[type="checkbox"]').check();
  return dialog;
}

async function run() {
  const { chromium } = await loadPlaywright();
  mkdirSync(SHOTS, { recursive: true });

  const browser = await chromium.launch({ executablePath: CHROMIUM_PATH });

  // Every enquiry entry point must actually open the modal. A CTA that looks
  // like a button and does nothing is the most expensive bug on the site.
  {
    const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });
    for (const { path, label } of CTA_LOCATIONS) {
      const page = await context.newPage();
      try {
        await page.goto(`${BASE}${path}`, { waitUntil: 'domcontentloaded', timeout: 40000 });
        await page.waitForTimeout(2200);
        await openModal(page, label);
        check(`CTA on ${path} opens the enquiry modal`, true);
      } catch (e) {
        check(`CTA on ${path} opens the enquiry modal`, false, String(e.message).split('\n')[0].slice(0, 100));
      }
      await page.close();
    }
    await context.close();
  }

  for (const viewport of VIEWPORTS) {
    for (const submitStatus of [200, 500]) {
      const tag = `${viewport.name}-${submitStatus}`;
      const context = await browser.newContext({
        viewport: { width: viewport.width, height: viewport.height },
        isMobile: viewport.name === 'mobile',
        hasTouch: viewport.name === 'mobile',
      });
      const page = await context.newPage();

      // Intercept before anything can leave the machine.
      let captured = null;
      await context.route('**/*', async (route) => {
        const req = route.request();
        if (req.method() === 'POST' && /script\.google\.com|script\.googleusercontent\.com/.test(req.url())) {
          captured = req.postData();
          return route.fulfill({
            status: submitStatus,
            contentType: 'application/json',
            body: JSON.stringify({ ok: submitStatus === 200 }),
          });
        }
        return route.continue();
      });

      await page.goto(`${BASE}${FLOW_PATH}`, { waitUntil: 'domcontentloaded', timeout: 40000 });
      await page.waitForTimeout(2500);

      const dialog = await fillFlow(page, viewport, { submitStatus });

      await nextButton(dialog).click();
      await page.waitForTimeout(2500);

      check(`[${tag}] enquiry POST was sent`, captured !== null, captured ? '' : 'no request reached the endpoint');

      if (captured) {
        let payload = null;
        try { payload = JSON.parse(captured); } catch { /* reported below */ }
        check(`[${tag}] payload is JSON`, payload !== null, payload ? '' : captured.slice(0, 120));
        if (payload) {
          const required = ['destination', 'month', 'year', 'groupSize', 'priorities', 'email', 'firstName', 'lastName'];
          const missing = required.filter((k) => payload[k] === undefined || payload[k] === '');
          check(`[${tag}] payload carries every answer`, missing.length === 0, missing.length ? `missing: ${missing.join(', ')}` : '');
          check(`[${tag}] destination is a stable key, not a label`, payload.destination === 'menorca', String(payload.destination));
        }
      }

      const confirmed = await dialog.getByText(/thank you|we'll be in touch|received/i).count().catch(() => 0);
      const failedAlert = await dialog.locator('[role="alert"]').count().catch(() => 0);

      if (submitStatus === 200) {
        check(`[${tag}] confirmation screen renders`, confirmed > 0, confirmed ? '' : 'no success copy found');
        const footerGone = (await nextButton(dialog).count()) === 0;
        check(`[${tag}] submit button is retired after success`, footerGone);
        await page.screenshot({ path: `${SHOTS}/enquiry-${viewport.name}-3-confirmation.png` });
      } else {
        check(`[${tag}] failure is surfaced to the user`, failedAlert > 0, failedAlert ? '' : 'endpoint failed silently');
        await page.screenshot({ path: `${SHOTS}/enquiry-${viewport.name}-4-failure.png` });
      }

      await context.close();
    }
  }

  await browser.close();

  const failed = results.filter((r) => !r.passed);
  const md = [
    '# Enquiry flow verification',
    '',
    `- Base: \`${BASE}\``,
    `- Run: ${new Date().toISOString()}`,
    `- Checks: ${results.length}, failed: ${failed.length}`,
    '- The submit POST is intercepted and never delivered to the live endpoint.',
    '',
    '| Result | Check | Detail |',
    '| --- | --- | --- |',
    ...results.map((r) => `| ${r.passed ? 'PASS' : '**FAIL**'} | ${r.name} | ${r.detail || ''} |`),
  ].join('\n');
  writeFileSync(resolvePath(HERE, 'enquiry-flow.md'), md, 'utf8');

  console.log(`\n${results.length} checks, ${failed.length} failed`);
  process.exit(failed.length ? 1 : 0);
}

run().catch((e) => { console.error(e); process.exit(1); });
