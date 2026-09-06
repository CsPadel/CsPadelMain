# Link & CTA audit — local (astro dev) — after phase 2

- Base: `http://[::1]:4321`
- Run: 2026-09-06T00:29:05.853Z
- Viewports: 1440x900, 390x844
- Pages crawled: 29
- Links checked: 1671

| Severity | Count |
| --- | ---: |
| P0 | 116 |
| OK | 1307 |
| INFO | 663 |

## Findings, worst first

| Sev | Issue | Link text | href | Final URL | Viewports | Pages |
| --- | --- | --- | --- | --- | --- | ---: |
| P0 | Dead link — resolves to the page it sits on | Courtside Padel on Instagram | `#` | — | desktop, mobile | 29 |
| P0 | Dead link — resolves to the page it sits on | Courtside Padel on LinkedIn | `#` | — | desktop, mobile | 29 |

## Page-level SEO

| Page | Status | Canonical | Canonical host resolves to this site? | H1 count |
| --- | ---: | --- | --- | ---: |
| http://[::1]:4321/ | 200 | https://www.cspadel.com/ | **no — www.cspadel.com** | **0** |
| http://[::1]:4321/es/ | 200 | https://www.cspadel.com/es/ | **no — www.cspadel.com** | **0** |
| http://[::1]:4321/fr/ | 200 | https://www.cspadel.com/fr/ | **no — www.cspadel.com** | **0** |
| http://[::1]:4321/our-story | 200 | https://www.cspadel.com/our-story | **no — www.cspadel.com** | 1 |
| http://[::1]:4321/the-experience | 200 | https://www.cspadel.com/the-experience | **no — www.cspadel.com** | 1 |
| http://[::1]:4321/east-sussex | 200 | https://www.cspadel.com/east-sussex | **no — www.cspadel.com** | 1 |
| http://[::1]:4321/bali | 200 | https://www.cspadel.com/bali | **no — www.cspadel.com** | 1 |
| http://[::1]:4321/dubai | 200 | https://www.cspadel.com/dubai | **no — www.cspadel.com** | 1 |
| http://[::1]:4321/upcoming-retreats | 200 | https://www.cspadel.com/upcoming-retreats | **no — www.cspadel.com** | 1 |
| http://[::1]:4321/executive-retreat | 200 | https://www.cspadel.com/executive-retreat | **no — www.cspadel.com** | 1 |
| http://[::1]:4321/legal/privacy-policy | 200 | https://www.cspadel.com/legal/privacy-policy | **no — www.cspadel.com** | 1 |
| http://[::1]:4321/legal/terms-and-conditions | 200 | https://www.cspadel.com/legal/terms-and-conditions | **no — www.cspadel.com** | 1 |
| http://[::1]:4321/cookies | 200 | https://www.cspadel.com/cookies | **no — www.cspadel.com** | 1 |
| http://[::1]:4321/es/our-story | 200 | https://www.cspadel.com/es/our-story | **no — www.cspadel.com** | 1 |
| http://[::1]:4321/es/the-experience | 200 | https://www.cspadel.com/es/the-experience | **no — www.cspadel.com** | 1 |
| http://[::1]:4321/es/east-sussex | 200 | https://www.cspadel.com/es/east-sussex | **no — www.cspadel.com** | 1 |
| http://[::1]:4321/es/bali | 200 | https://www.cspadel.com/es/bali | **no — www.cspadel.com** | 1 |
| http://[::1]:4321/es/dubai | 200 | https://www.cspadel.com/es/dubai | **no — www.cspadel.com** | 1 |
| http://[::1]:4321/es/upcoming-retreats | 200 | https://www.cspadel.com/es/upcoming-retreats | **no — www.cspadel.com** | 1 |
| http://[::1]:4321/es/executive-retreat | 200 | https://www.cspadel.com/es/executive-retreat | **no — www.cspadel.com** | 1 |
| http://[::1]:4321/es/cookies | 200 | https://www.cspadel.com/es/cookies | **no — www.cspadel.com** | 1 |
| http://[::1]:4321/fr/our-story | 200 | https://www.cspadel.com/fr/our-story | **no — www.cspadel.com** | 1 |
| http://[::1]:4321/fr/the-experience | 200 | https://www.cspadel.com/fr/the-experience | **no — www.cspadel.com** | 1 |
| http://[::1]:4321/fr/east-sussex | 200 | https://www.cspadel.com/fr/east-sussex | **no — www.cspadel.com** | 1 |
| http://[::1]:4321/fr/bali | 200 | https://www.cspadel.com/fr/bali | **no — www.cspadel.com** | 1 |
| http://[::1]:4321/fr/dubai | 200 | https://www.cspadel.com/fr/dubai | **no — www.cspadel.com** | 1 |
| http://[::1]:4321/fr/upcoming-retreats | 200 | https://www.cspadel.com/fr/upcoming-retreats | **no — www.cspadel.com** | 1 |
| http://[::1]:4321/fr/executive-retreat | 200 | https://www.cspadel.com/fr/executive-retreat | **no — www.cspadel.com** | 1 |
| http://[::1]:4321/fr/cookies | 200 | https://www.cspadel.com/fr/cookies | **no — www.cspadel.com** | 1 |

## JS-driven CTAs

These trigger no navigation, so no link checker sees them. Each needs a manual pass.

| CTA text | Pages |
| --- | ---: |
| DESTINATIONS | 20 |
| EN | 29 |
| ES | 29 |
| FR | 29 |
| DISCOVER EXPERIENCES | 1 |
| PLAN YOUR RETREAT | 2 |
| ‹ | 3 |
| Review 1 | 3 |
| Review 2 | 3 |
| Review 3 | 3 |
| Review 4 | 3 |
| › | 3 |
| REJECT NON-ESSENTIAL | 11 |
| ACCEPT ALL | 11 |
| DESTINOS | 9 |
| DESCUBRE LAS EXPERIENCIAS | 1 |
| PLANIFICA TU RETIRO | 2 |
| RECHAZAR NO ESENCIALES | 9 |
| ACEPTAR TODAS | 9 |
| DÉCOUVRIR LES EXPÉRIENCES | 1 |
| PLANIFIEZ VOTRE RETRAITE | 1 |
| REFUSER LES NON ESSENTIELS | 9 |
| TOUT ACCEPTER | 9 |
| ENQUIRE ABOUT A RETREAT | 2 |
| Previous images | 2 |
| Next images | 2 |
| ENQUIRE ABOUT EAST SUSSEX | 1 |
| ENQUIRE ABOUT BALI | 1 |
| GET IN TOUCH | 1 |
| CONSULTAR SOBRE UN RETIRO | 2 |
| Imágenes anteriores | 2 |
| Imágenes siguientes | 2 |
| CONSULTA SOBRE EAST SUSSEX | 1 |
| CONSULTA SOBRE BALI | 1 |
| CONTACTA CON NOSOTROS | 1 |
| DEMANDER UNE RETRAITE | 2 |
| Images précédentes | 2 |
| Images suivantes | 2 |
| SE RENSEIGNER SUR L'EAST SUSSEX | 1 |
| SE RENSEIGNER SUR BALI | 1 |
| NOUS CONTACTER | 1 |
| PLANIFIER VOTRE RETRAITE | 1 |