/**
 * Builds docs/copy-proposals.md from the locale files and the rendered-heading
 * sweep, so the before/after tables cannot drift from what the site actually
 * ships. Prose is authored here; every table row is derived.
 *
 * Usage: node audit/gen-copy-proposals.mjs   (needs audit/headings.json)
 */

import { readFileSync, writeFileSync, mkdirSync, globSync } from 'node:fs';
import { dirname, resolve as resolvePath } from 'node:path';
import { fileURLToPath } from 'node:url';

const HERE = dirname(fileURLToPath(import.meta.url));
const ROOT = resolvePath(HERE, '..');

/* ─── Locale loading ───────────────────────────────────────── */

function loadLocale(name) {
  const src = readFileSync(resolvePath(ROOT, `src/i18n/locales/${name}.ts`), 'utf8')
    .replace(/^const \w+ = /, 'return ')
    .replace(/ as const;\s*$/m, ';')
    .replace(/export default \w+;\s*$/m, '');
  return new Function(src)();
}

function flatten(obj) {
  const out = {};
  (function walk(x, p) {
    for (const [k, v] of Object.entries(x)) {
      const q = p ? `${p}.${k}` : k;
      if (typeof v === 'string') out[q] = v;
      else if (Array.isArray(v)) v.forEach((y, i) => {
        if (typeof y === 'string') out[`${q}[${i}]`] = y;
        else if (y && typeof y === 'object') walk(y, `${q}[${i}]`);
      });
      else if (v && typeof v === 'object') walk(v, q);
    }
  })(obj, '');
  return out;
}

const F = { en: flatten(loadLocale('en')), es: flatten(loadLocale('es')), fr: flatten(loadLocale('fr')) };
const headings = JSON.parse(readFileSync(resolvePath(HERE, 'headings.json'), 'utf8'));

/* ─── Classification ───────────────────────────────────────── */

/** Keys whose value is rendered as a heading. Derived by name, then confirmed
 *  against the DOM sweep where the string was traceable. */
const HEADING_KEY = /(^|\.)(heroTitle|title|ctaTitle|bookTitle|stayTitle|courtsTitle|beyondTitle|padelTitle|roomsTitle|estateTitle|studiosTitle|apartTitle|offCourtTitle|foundersTitle)(\[\d+\])?$/;

/**
 * Whether a heading key actually reaches the page.
 *
 * Namespace is not a reliable signal: several `menorcaPage.*` keys are reused
 * on the home page even though the Menorca components themselves are orphaned.
 * The DOM sweep is the ground truth — if the string never appeared as a
 * heading on any page in any locale, it does not render.
 */
const RENDERED_KEYS = new Set(headings.flatMap((h) => h.keys));

/** Every component source, concatenated, for reference lookups. */
const COMPONENT_SRC = globSync('src/**/*.{astro,tsx,ts}', { cwd: ROOT })
  .filter((f) => !f.includes('i18n/locales') && !f.includes('i18n\\locales'))
  .map((f) => readFileSync(resolvePath(ROOT, f), 'utf8'))
  .join('\n');

/**
 * Three states, because one signal is not enough:
 *
 * - "renders"   the exact string was seen as an h1-h4 in the crawl.
 * - "unseen"    not seen as a heading, but some component still references its
 *               namespace. This codebase styles plenty of <p> elements as
 *               headings, so these are probably live and simply not <h*>.
 * - "dead"      no component references the namespace at any depth.
 */
function renderState(key) {
  if (RENDERED_KEYS.has(key)) return 'renders';
  let path = key.replace(/\[\d+\]/g, '');
  while (path.includes('.')) {
    path = path.slice(0, path.lastIndexOf('.'));
    if (COMPONENT_SRC.includes(path)) return 'unseen';
  }
  return 'dead';
}

const isOrphan = (key) => renderState(key) === 'dead';

/**
 * Keys that are a navigation label as well as a heading. Restyling them moves
 * the navbar or footer too, so they need a decision rather than a sweep.
 */
const SHARED_NAV = /^(navbar|footer)\./;

const MINOR = new Set(['a','an','the','and','but','or','nor','for','so','yet','at','by','in','of','on','to','up','as','from','with','into','over','than','that','not','it','is','your','our','you']);

function styleOf(t) {
  const words = t.replace(/<[^>]+>/g, ' ').replace(/[^A-Za-z0-9'&,.?\- ]/g, '').split(/\s+/).filter((w) => /[A-Za-z]/.test(w));
  if (words.length < 2) return 'single';
  const content = words.slice(1).filter((w) => !MINOR.has(w.toLowerCase()));
  if (!content.length) return 'single';
  const ratio = content.filter((w) => /^[A-Z]/.test(w)).length / content.length;
  return ratio > 0.75 ? 'Title Case' : ratio < 0.2 ? 'sentence case' : 'MIXED';
}

/** Proper nouns that keep their capital in sentence case. */
const PROPER = ['Bali','Menorca','Dubai','Dubái','Dubaï','Mykonos','Uluwatu','East Sussex','London','Londres','Londra','WPT','Courtside','Barceló Nura','Padelin','Mahón','England','Wales','Aegean','Indian Ocean','Balearic','Alexi','Oliver','Watelet','Michelin','Powdermills','Bukit','Mandarin Oriental','Spain','España','Espagne','Indonesia','UAE','UK','Campiña Inglesa','Campagne Anglaise'];

/** Lowercases a Title Case heading, preserving the first word and proper nouns. */
function toSentenceCase(text) {
  let out = text.replace(/\b([A-Z][a-zà-ÿ'’]+)/g, (m, w, offset) => {
    if (offset === 0) return m;
    // keep if part of a known proper noun
    if (PROPER.some((p) => p.split(/\s+/).includes(w))) return m;
    return w.charAt(0).toLowerCase() + w.slice(1);
  });
  // Restore capital after a sentence break or an opening inverted mark.
  out = out.replace(/([.!?¿¡]\s*)([a-zà-ÿ])/g, (m, a, b) => a + b.toUpperCase());
  out = out.charAt(0).toUpperCase() + out.slice(1);
  return out;
}

const esc = (s) => String(s).replace(/\|/g, '\\|').replace(/\n/g, ' ');

/* ─── Table A: trailing periods ────────────────────────────── */

const periodKeys = Object.keys(F.en).filter(
  (k) => HEADING_KEY.test(k) && /\.$/.test(F.en[k]) && !/\.\.\.$/.test(F.en[k]),
);

const stripPeriod = (s) => s.replace(/\.$/, '');

const tableA = periodKeys.map((k) => {
  const flag = { renders: "", unseen: " 🔎", dead: " ⚠️" }[renderState(k)];
  return `| \`${k}\`${flag} | ${esc(F.en[k])} | **${esc(stripPeriod(F.en[k]))}** | ${esc(F.es[k] ?? '—')} | **${esc(stripPeriod(F.es[k] ?? '—'))}** | ${esc(F.fr[k] ?? '—')} | **${esc(stripPeriod(F.fr[k] ?? '—'))}** |`;
});

/* ─── Table B: English capitalization deviations ───────────── */

const enRendered = headings.filter(
  (h) => h.locale === 'en' && (h.tag === 'h2' || h.tag === 'h3')
    && !h.pages.some((p) => p.startsWith('/legal')) && !h.pages.includes('/cookies'),
);
// Proper names ("Alexi Watelet") classify as Title Case but convert to
// themselves; they are not deviations, so they do not belong in the table.
const enDeviations = enRendered.filter(
  (h) => styleOf(h.text) === 'Title Case' && toSentenceCase(h.text) !== h.text,
);

const tableB = enDeviations.map((h) => {
  const key = h.keys[0] ?? '(not traced — hardcoded in component)';
  const note = SHARED_NAV.test(key)
    ? '⚠️ also a nav label — restyling moves the navbar/footer too'
    : '';
  return `| ${h.tag} | \`${key}\` | ${esc(h.text)} | **${esc(toSentenceCase(h.text))}** | ${h.pages.join(', ')} | ${note} |`;
});

/* ─── Table C: ES / FR headings copying English Title Case ─── */

const tableC = [];
for (const loc of ['es', 'fr']) {
  const rows = headings.filter(
    (h) => h.locale === loc && (h.tag === 'h1' || h.tag === 'h2' || h.tag === 'h3')
      && !h.pages.includes('/cookies') && styleOf(h.text) === 'Title Case',
  );
  for (const h of rows) {
    if (toSentenceCase(h.text) === h.text) continue;
    const key = h.keys[0] ?? '(not traced)';
    tableC.push(`| ${loc.toUpperCase()} | ${h.tag} | \`${key}\` | ${esc(h.text)} | **${esc(toSentenceCase(h.text))}** |`);
  }
}

/* ─── Document ─────────────────────────────────────────────── */

const doc = `# Copy proposals — Courtside Padel

**Status: proposals. Nothing here has been applied to the site.**
Brand and positioning copy is Alexi and Oliver's call; this document exists to
be reviewed and signed off, then applied in a separate pass.

Generated by \`audit/gen-copy-proposals.mjs\` from the locale files and from
\`audit/headings.json\`, a sweep of every heading actually rendered on every page
and locale. Tables are derived, not transcribed.

- Scope: ${Object.keys(F.en).length} strings across \`en.ts\`, \`es.ts\`, \`fr.ts\`
- Headings observed in the DOM: ${headings.length} across 3 locales
Row markers in the tables:

- *(none)* — seen rendered as an \`<h1>\`–\`<h4>\` during the crawl.
- 🔎 — not seen as a heading, but a live component still references it. This
  codebase styles a lot of \`<p>\` elements as headings, so these are almost
  certainly on the page, just not in a heading tag. Worth an eyeball.
- ⚠️ — no component references it at any depth. Dead copy. Included at your
  request; see "Orphaned copy" at the end.

---

## 1. Proposed house style

Skywire asked for "a single house style applied across the site". One literal
style across three languages would be wrong, because Spanish and French do not
capitalise headline words the way English does. The proposal is therefore one
*rule*, expressed per language.

| | English | Spanish | French |
| --- | --- | --- | --- |
| H1 | Title Case | Sentence case | Sentence case |
| H2, H3, H4 | Sentence case | Sentence case | Sentence case |
| Eyebrows / kickers | UPPERCASE (already set in CSS, leave the source string in sentence case) | same | same |
| Buttons / CTAs | UPPERCASE via CSS, source string in Title Case | same, source in sentence case | same, source in sentence case |
| Trailing period | Never on a heading | Never | Never |
| Question marks | Kept — they are not decoration | Kept, with \`¿\` | Kept, with narrow space before \`?\` |

**Why H1 stays Title Case in English only.** The site is already 100 %
consistent there — all 10 English H1s are Title Case. That is a house style
that exists and works; there is no reason to churn it. The inconsistency is
entirely below H1.

**Why Spanish and French go sentence case throughout.** Both languages
capitalise only the first word and proper nouns in a title. The current site
has copied the English pattern mechanically, producing headings that read as
incorrect to a native speaker — "La Campiña Inglesa, a 70 Minutos de Londres",
"Une Escapade à Bali", "Retiros Corporativos y Ejecutivos". Applying a single
Title Case rule across all three languages would entrench that error rather
than fix it. This is the one place where I would push back on the brief as
written.

---

## 2. Trailing periods on headings

${periodKeys.length} heading keys end in a period. The change is mechanical —
drop the final period, touch nothing else.

Two need care because the period is not the last character in the source:
\`dubaiPage.landing.title\` and \`executivePage.ctaTitle\` both contain \`<br/>\`,
and only the *final* period should go.

| Key | EN before | EN after | ES before | ES after | FR before | FR after |
| --- | --- | --- | --- | --- | --- | --- |
${tableA.join('\n')}

---

## 3. Capitalization — English

The dominant pattern below H1 is sentence case (33 of 45 rendered H2s). The
following ${enDeviations.length} headings deviate into Title Case.

**The clearest evidence that this needs fixing:** the same sentence ships in
both styles depending on the page.

| Page | Heading |
| --- | --- |
| \`/\` | Have your own dates in mind? |
| \`/east-sussex\` | Have Your Own Dates in Mind? |
| \`/\` | Ready to build your own story? |
| \`/bali\` | Ready to Experience Uluwatu? |
| \`/east-sussex\` | Ready to Experience East Sussex? |
| \`/the-experience\` | Ready to experience it? |

A visitor moving from the home page to a destination page sees the same
invitation styled two different ways. That is exactly the kind of seam Skywire
is pointing at.

Proposed conversions — **please eyeball the proper nouns**, the lowercasing is
automated and conservative but not infallible:

| Tag | Key | Before | After | Pages | Note |
| --- | --- | --- | --- | --- | --- |
${tableB.join('\n')}

---

## 4. Capitalization — Spanish and French

${tableC.length} headings in ES/FR currently follow English Title Case. Under the
rule in section 1 they become sentence case.

**The two sweeps compose.** This table changes capitalisation only, so rows
that also appear in section 2 still show their trailing period here. Apply
section 2 first, then this.

**These need a native speaker's eye more than the English ones.** The
lowercasing is automated with a proper-noun whitelist, and the judgement calls
are real: I have kept "La Campiña Inglesa" capitalised on the grounds that it
reads as a name, but a Spanish copywriter may well want "la campiña inglesa".
Treat the "after" column as a first pass, not a verdict.

| Locale | Tag | Key | Before | After |
| --- | --- | --- | --- | --- |
${tableC.join('\n')}

---

## 5. "Flights are not included"

### What the site says today

Nothing. Skywire reports that this appears "only in the FAQs" — that is true of
the Menorca microsite, but on this site the disclosure **does not exist
anywhere a visitor can see**. The only copy that carries it is
\`menorcaPage.faq[2]\`, and \`FAQ.tsx\` is imported by no page, so it never
renders. The Bali, Dubai and East Sussex pages have no inclusions section at
all.

So the problem is not "hard to find". It is absent. On an offer that reads as
all-inclusive, at these prices, a guest can reach the enquiry form without ever
being told they are buying their own flights.

### Proposed placement

Three touchpoints, in order of importance. The wording is deliberately plain —
a premium brand states the terms of the offer confidently rather than burying
them.

**a) On each destination page, in the booking/CTA section.** This is where cost
is being evaluated. Bali's CTA already says "Dates and pricing are confirmed
once we know your group and plans" — the natural sentence to extend.

> **Bali** — \`baliPage.landing.ctaText\`
> Before: *Dates and pricing are confirmed once we know your group and plans. Full itinerary available on request.*
> After: *Dates and pricing are confirmed once we know your group and plans. Everything from arrival to departure is included — international flights are not. Full itinerary available on request.*

Mirror the same closing clause in \`eastSussexPage.landing.bookText2\` and
\`dubaiPage\`'s equivalent, so the disclosure reads identically everywhere.

**b) A shared inclusions line, as one i18n key.** Add \`common.flightsNote\` and
render it under every "what's included" and pricing block. One key means it
cannot drift between destinations the way the sitemap did.

> *Retreat prices cover everything from arrival to departure, including airport transfers. International flights are arranged separately — our concierge can advise on routes or arrange a private charter.*

That last clause matters: it turns a limitation into a service, which is the
premium register the brand already uses elsewhere.

**c) In the enquiry modal, on the dates step.** One quiet line under the month
selector, where the visitor is already thinking about travel:

> *Flights aren't included — we'll help you plan them once dates are set.*

### What I would not do

Put it in a footnote or an asterisk. It reads as something being hidden, which
costs more trust than the fact itself.

---

## 6. The three flagged lines

Three alternatives each, in the brand's register. **None applied.**

### 6.1 "Nothing outsourced"

Location: \`experiencePage.apart[1]\` — H3 "Run End-to-End, By Us" plus its
description.

> Current: **Run End-to-End, By Us** — *Coaching, hospitality, logistics and dining, all handled directly by our own team. Nothing outsourced, nothing generic.*

Skywire is right that this contradicts the site. Confirmed in the code:
\`baliPage.landing.beyondText\` credits "a local activity coordinator who knows
the island inside out", \`baliPage.landing.studiosText\` refers to arrangements
"through local partners", and the home page runs a partners section titled "In
partnership with the best" carrying the Barceló and Mandarin Oriental marks. The
claim and the evidence are on the same website.

| # | Proposed | What it buys you |
| --- | --- | --- |
| 1 | **Run End-to-End, By Us** — *Coaching, hospitality, logistics and dining, personally directed by our own team. We choose every partner and we are there when it happens.* | Closest to the original. Keeps the reassurance of total control while making the partners an act of curation rather than a contradiction. |
| 2 | **One Team, Start to Finish** — *From the first enquiry to the last transfer, the same people run your week. Nothing is handed to a third party and forgotten.* | Shifts the promise from *who does the work* to *who is accountable* — which is what a buyer actually worries about, and it is defensible. |
| 3 | **Nothing Left to Chance** — *Every coach, venue and partner is chosen by us, briefed by us, and overseen by us on the ground.* | Strongest premium register of the three. Names the partners openly and turns the selection itself into the proof of quality. |

### 6.2 "Strategy in silence" and "the most exclusive padel setting"

Both sit in a single string: \`homePage.retreatTypes.types.executive.desc\`.
Fixing one means rewriting the other, so these alternatives address both.

> Current: *Strategy in silence. High-performance leadership and networking in the most exclusive padel setting.*

Two problems. "Strategy in silence" is abstract — it does not say what a company
gets. And "the most exclusive padel setting" is an absolute superlative that
cannot be substantiated, which on a premium site reads as insecurity rather than
confidence.

| # | Proposed | What it buys you |
| --- | --- | --- |
| 1 | *Leadership offsites without the boardroom. Time for your team to think, compete and talk properly — on private courts, away from everything.* | Most concrete. Names the occasion (offsite), the benefit (thinking and talking time) and the exclusivity (private courts) without asserting a superlative. |
| 2 | *Where senior teams get each other's full attention. Closed retreats built around your agenda, at venues we take over entirely.* | Leads with the real scarcity for executives — undivided attention — and substitutes "we take over entirely", which is a verifiable fact, for "most exclusive". |
| 3 | *Board-level connection, off the record. Private venues, a closed guest list, and a week that does what a conference room cannot.* | Keeps the discretion the original was reaching for with "in silence", and makes it specific: closed list, private venue. |

Note on \`corporateDescriptor\` — "Strategy. On and off the court." — which sits
nearby and is not flagged. It has the same abstraction problem in miniature. If
you adopt any of the above, it is worth revisiting in the same pass so the
corporate proposition reads consistently.

---

## 7. Two things found while sweeping

**The home page has no \`<h1>\`.** All three locales. Every other page has
exactly one. This is a copy decision before it is a code change — something has
to be promoted to the page's main heading — which is why it is here rather than
in the phase 2 fixes.

**Orphaned copy.** ${periodKeys.filter(isOrphan).length} of the ${periodKeys.length} trailing-period keys are dead: no component
references them at any depth. They are included in the tables above as
requested, but applying the sweep to them changes nothing a visitor sees.

Thirteen components are imported by nothing at all:

\`\`\`
FAQ  CorporateForm  Agenda  RoomsSelector  GroupVillaLeader  HeroIsland
RetreatLandingHero  MenorcaItinerary  MenorcaItineraryAccordion
MenorcaWhatsIncluded  flows/IndividualFlow  flows/GroupFlow
flows/CorporateFlow
\`\`\`

Worth a separate decision: revive, or delete along with their keys. Note that
this is not a clean cut — some \`menorcaPage.*\` keys are reused by live
components on the home page even though the Menorca components themselves are
dead, so a namespace-wide delete would break the home page.
`;

mkdirSync(resolvePath(ROOT, 'docs'), { recursive: true });
writeFileSync(resolvePath(ROOT, 'docs/copy-proposals.md'), doc, 'utf8');

console.log('docs/copy-proposals.md written');
console.log(`  trailing-period keys: ${periodKeys.length} (orphaned: ${periodKeys.filter(isOrphan).length})`);
console.log(`  EN capitalization deviations: ${enDeviations.length}`);
console.log(`  ES/FR headings to convert: ${tableC.length}`);
