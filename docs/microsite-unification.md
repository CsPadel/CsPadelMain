# Main site and Menorca microsite — unification options

**Status: decision document. Nothing has been implemented.**

Skywire's point: moving from `cspadel.com` to `menorca.cspadel.com` "feels like
leaving one website and entering a completely different one". This sets out
what actually diverges, three ways to close the gap, and what each costs.

| | |
| --- | --- |
| Main site | `www.cspadel.com` — `github.com/CsPadel/CsPadelMain` |
| Microsite | `menorca.cspadel.com` — `github.com/CsPadel/LandingMenorcaCsPadel` |
| Both | Astro 6.1, React 19, Tailwind 4, i18next. Same stack, same major versions. |

---

## What actually diverges

I compared the two repos directly rather than going on impression. The answer
is not what the brief assumes.

### Design tokens are already identical

`@theme` in both `global.css` files declares the same values:

| Token | Main site | Microsite |
| --- | --- | --- |
| `--color-brand-gold` | `#D9AD62` | `#D9AD62` |
| `--color-brand-dark` | `#01192C` | `#01192C` |
| `--color-brand-dark-2` | `#041E36` | `#041E36` |
| `--font-display` | Cormorant Garamond | Cormorant Garamond |
| `--font-inter` | Jost | Jost |

The main site adds `--radius-button/card/input`, which the microsite does not
use. That is the whole token difference.

**So "unify the design tokens", as option A is framed in the brief, is close to
a no-op.** The palette and type already match. What makes the transition feel
like a different website is structure and navigation, and no amount of token
work touches that. This is the main thing I would push back on in the plan as
written.

### Navigation is the real break

| | Main site | Microsite |
| --- | --- | --- |
| Shape | Multi-page, 10 routes × 3 locales | One page + 4 legal pages |
| Nav items | Our Story, The Experience, Destinations (dropdown), Upcoming Retreats | Includes, Itinerary, Book, FAQ |
| Nav targets | Real routes | In-page anchors (`#includes`, `#itinerary`, `#rooms`, `#faq`) |
| Logo links to | `/` on the main site | `/` on the microsite |
| Footer | 4 columns: brand + social, destinations, company, contact, then a legal bar | One row: logo, copyright, 4 legal links |
| Body background | White | Navy |
| Languages | Real routes: `/`, `/es/`, `/fr/` | Client-side toggle only — no `/es/` or `/fr/` routes |

A visitor arriving on the microsite loses the entire destination menu. There is
no Bali, no Dubai, no East Sussex, no Our Story. The brand's other four
retreats simply cease to exist.

### There is no way back

`menorca.cspadel.com` contains **no visible link to `cspadel.com` anywhere**.
The repo defines `BRAND_URL = 'https://cspadel.com'` in `src/lib/site.ts`, but
it is used only inside JSON-LD structured data — machine-readable, invisible to
a human. The logo links to the microsite's own root.

This is the single highest-value fix on this page, and it is small. A visitor
who wants to know who Courtside are has to type the address by hand.

### Two defects found while measuring

Both are on the microsite, both are cheap, and neither depends on which option
you choose.

1. **The navigation is dead on every sub-page.** The nav anchors are relative
   (`#itinerary`), so on the four legal pages and the 404 they point at
   sections that do not exist there. Verified: on `/legal/privacy-policy` all
   four targets are missing. Fix: make them `/#itinerary`. Six pages affected.
2. **Spanish and French are invisible to search.** The microsite translates via
   a client-side toggle with no localized routes, so `menorca.cspadel.com/es/`
   is a 404. The main site has real `/es/` and `/fr/` routes. Whatever is spent
   on translating the Menorca page earns nothing in Spanish or French search.

---

## Option A — Shared shell, two deploys

Replicate the main site's header and footer on the microsite, and add the
return links.

**Work**
- Port `Navbar` and `FooterIsland` from the main repo, with the destinations
  dropdown pointing back at `cspadel.com` routes.
- Keep the microsite's four in-page anchors as a secondary section nav, so the
  one-page flow that converts is not disturbed.
- Fix the relative anchors (`/#itinerary`) while in there.
- Copy `--radius-*` across for completeness.

**Effort** 1–1.5 days.
**Risk** Low. Nothing about URLs, DNS or indexing changes.
**SEO** Neutral, with a small gain: real crawlable links from the microsite to
the main site's destination pages, where today there are none.

**What it does not solve.** Two codebases still drift. The header you copy
today diverges again the first time either side changes. This buys the
perception fix and nothing structural — which may be exactly right if the
priority is the customer journey before the 2027 calendar.

---

## Option B — Shared package in a monorepo

Extract `Navbar`, `FooterIsland`, the design tokens and the base UI into a
workspace package both sites consume.

**Work**
- Combine both repos into a pnpm workspace (`apps/main`, `apps/menorca`,
  `packages/ui`).
- Extract the shared components, reconciling the two i18n setups — the main
  site passes an explicit `locale` prop, the microsite relies on a detector.
  This is the fiddly part.
- Two Vercel projects pointing at two workspace roots.

**Effort** 4–6 days, most of it in i18n reconciliation and the deploy rewiring.
**Risk** Medium. The build and deploy setup for both live sites changes at
once. Wants a staging deploy before cutover.
**SEO** Neutral. URLs do not move.

**Worth noting:** both repos already run identical major versions of Astro,
React, Tailwind and i18next. That is the expensive precondition for a monorepo
and it is already met, which makes B substantially cheaper here than it usually
is. The cost is almost entirely in the i18n merge.

---

## Option C — Fold the microsite into the main domain

Serve the Menorca page at `cspadel.com/menorca` and 301 the subdomain to it.

**Work**
- Move the microsite's page and components into the main repo as a route.
- Reconcile it with the main site's locale routing so `/es/menorca` and
  `/fr/menorca` exist — which fixes the invisible-translations problem as a
  side effect.
- Vercel redirect from `menorca.cspadel.com/*` to `cspadel.com/menorca`.
- Update `MENORCA_URL` in `src/constants/urls.ts`; the main site already routes
  every Menorca link through that one constant, so this is a one-line change.
- Retire `src/pages/menorca.astro`, the client-side redirect stub.

**Effort** 5–8 days.
**Risk** Medium-high, and the risk is concentrated in the redirect. A subdomain
carrying live bookings has to keep working through the switch.
**SEO** The strongest case, and the only option that improves it materially:

- Authority consolidates on one host instead of splitting across two.
- The Menorca page inherits the main domain's standing instead of building its
  own.
- Spanish and French Menorca content becomes indexable for the first time.
- `sitemap.xml` stops listing an off-host URL, which Google ignores today
  without cross-domain verification.

**Blocked under the current rules.** This needs Vercel domain and redirect
configuration, which I was asked not to touch. I can prepare the code and the
`vercel.json`, but the cutover is someone else's hands on the dashboard.

---

## Recommendation

**A now, C when the 2027 calendar is planned. Skip B.**

A buys the perception fix Skywire is asking for in a day, at almost no risk,
and the return links are worth doing whatever else happens.

B is real engineering that produces no visitor-facing change. Its value is
preventing future drift — but if C is on the table at all, B is work you throw
away, because C leaves one codebase and nothing to keep in sync.

C is where the actual value is. It is also the only option that fixes the
Spanish and French Menorca content being invisible to search, and it retires
the client-side redirect stub that passes no link equity today. Do it when
there is a natural content break rather than mid-season.

**Regardless of which is chosen**, the two defects above should be fixed now.
They are cheap, and the dead sub-page navigation is a live conversion leak.

---

## Appendix — how this was measured

- Both repos read directly, side by side.
- `audit/link-audit.microsite.md` — the microsite crawled at 1440×900 and
  390×844, same tooling as the main site.
- Anchor targets on `/` and `/legal/privacy-policy` verified individually in a
  real browser rather than inferred from the crawl.
- The `/es/` and `/fr/` 404s in the microsite report are the crawler's standard
  locale seeds, not a regression: the microsite has no localized routes by
  design. That absence is itself finding 2 above.
