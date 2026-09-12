# East Sussex photography — where the images can come from

The strip at the foot of `/east-sussex` is licensed stock, not photographs of
Crafted at Powdermills. This records what has been searched, what it produced,
and the routes that are left — so the next person does not repeat the search.

**The constraint throughout:** images must be licensed for commercial use.
Taking them from the hotel's own website or from Google Images is not an
option — those belong to the hotel or its photographer. (SUITCASE credits
Euan Baker for its Powdermills photography, for instance.)

---

## What has been searched

| Source | Licence | Result |
| --- | --- | --- |
| **Pexels** | Commercial use, no attribution | One usable swap, now live: the guest room. Everything else was matched or beaten by what was already there. |
| **Unsplash** | Commercial use, no attribution | Good quality. Two candidates looked like upgrades as thumbnails and lost at full size in the 3:4 crop the strip uses. |
| **Pixabay** | Commercial use, no attribution | Not usable. "english manor house garden" returned German châteaux and haunted-castle illustrations; "outdoor hot tub wooden" returned coffee cups, a cat and a tin of paint. |
| **Wikimedia Commons / Geograph** | CC BY-SA 2.0 — attribution **and** share-alike required | Has photographs of the actual place, including the hotel itself. All are documentary snapshots: the hotel shot is 640×480, taken at midday, with parked cars and geese on the lawn. Real, but nowhere near the standard the page needs. |

The pattern is worth naming, because it explains why more searching of the same
kind will not help:

- **Stock libraries** give beautiful photographs of somewhere else.
- **Commons and Geograph** give amateur photographs of exactly the right place.

Neither gives professional photography of the right place. That is the gap, and
only the routes below close it.

The search tool is committed at `audit/stock-find.mjs` if the queries need
rerunning with different terms.

---

## Routes that remain, best first

### 1. The venue's own press pack — free, best quality

Crafted at Powdermills has a **Press Enquiries** contact at
[staycrafted.com/contact](https://www.staycrafted.com/contact/), and a phone
line on **01424 775511**. Courtside is a partner sending them guests, which is
the strongest possible position from which to ask.

This is one email and it solves the problem completely: professional
photography, of the actual venue, with written permission. Everything else on
this list is a workaround for not having done it.

Ask for: high-resolution images, written confirmation of permitted use
(website and social), and any credit line they want applied.

### 2. VisitBritain asset library — free, professional, regional

VisitBritain runs an image library at
[assets.visitbritain.org](https://assets.visitbritain.org/) for media, partner
and corporate use, with professional destination photography of England.

**Requires sign-up**, which has to be done by someone at Courtside — and the
terms need reading before anything is used. Tourism board libraries are often
licensed for *editorial and PR* use rather than a private company's commercial
marketing, and usually require a credit in the form
`©VisitBritain/[photographer]`. Worth ten minutes to check whether a retreat
operator's website qualifies.

### 3. Visit 1066 Country — the local board for Battle

[visit1066country.com](https://www.visit1066country.com/) covers Battle
specifically. It runs a membership programme and a **1066 Film Office** at
`/filming` that handles film and photography enquiries for the area. No public
image library, so this is a direct approach — but it is the organisation with
the most photography of the exact landscape the retreat sits in.

### 4. Paid stock — costs money, highest ceiling for generic imagery

Getty, Adobe Stock and Alamy have far better English country-house and
countryside photography than the free libraries, properly licensed. This buys
quality, not authenticity: it is still somewhere else. Needs a budget and an
account decision.

### 5. Commission a shoot — most expensive, but the assets are yours

A photographer's day rate at the venue during a retreat produces images
Courtside owns outright and can use anywhere, including the ones no stock
library has: actual guests, actual coaching, actual dinners. Worth costing
against the value of having no venue photography at all before the 2027
calendar.

---

## If the strip stays on stock for now

The current sixteen are a closer match to the real venue than most of what a
fresh search turns up. Crafted at Powdermills has a seven-acre lake, 78 acres of
ancient woodland, a lakeside sauna and cold plunge, a wood-fired hot tub,
creative workshops and two padel courts — and the strip covers all of it.

Two things to know if they are edited:

- The strip is **3:4 portrait at 1000×1333**. Judge candidates in that crop; a
  landscape thumbnail is misleading and cost two wrong calls during this search.
- `public/imagenes/east-sussex-gallery/CREDITS.txt` must stay in step with
  whatever is swapped, and the caption in `src/constants/eastSussexGallery.ts`
  must describe what is actually in frame — never imply the photo was taken at
  Powdermills.
