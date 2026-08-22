/**
 * Photo strip shown at the foot of the Bali page.
 *
 * Titles and locations stay in English across all three locales — they read as
 * editorial captions rather than body copy, which is the tone the layout is
 * built around. Localise `baliPage.landing.gallery` (eyebrow, title, controls)
 * in the locale files; the captions below are deliberately shared.
 *
 * Source photography lives in `imgparaslide/` and is resized to a 1000x1333
 * (3:4) card before landing in `public/imagenes/bali-gallery/`.
 */
export interface BaliGalleryItem {
  /** File under /imagenes/bali-gallery/, without extension. */
  slug: string;
  title: string;
  location: string;
}

export const BALI_GALLERY: BaliGalleryItem[] = [
  { slug: '01-infinity-edge', title: 'The Infinity Edge', location: 'Uluwatu, Bali' },
  { slug: '02-poolside-recovery', title: 'Poolside Recovery', location: 'The Estate, Uluwatu' },
  { slug: '03-cliffside-villa', title: 'Cliffside Villa', location: 'Uluwatu, Bali' },
  { slug: '04-straight-to-the-sea', title: 'Straight to the Sea', location: 'The Estate, Uluwatu' },
  { slug: '05-centre-court', title: 'Centre Court', location: 'Uluwatu, Bali' },
  { slug: '06-golden-hour-rally', title: 'Golden Hour Rally', location: 'Sunset Session' },
  { slug: '07-tropical-baseline', title: 'Tropical Baseline', location: 'The Estate, Uluwatu' },
  { slug: '08-full-swing', title: 'Full Swing', location: 'Courtside Padel' },
  { slug: '09-one-on-one-coaching', title: 'One-on-One Coaching', location: 'With Oli & Alex' },
  // Source photo (154A5599) shows a single coach, so the caption is singular.
  { slug: '10-meet-oli-alex', title: 'Meet Your Coach', location: 'Uluwatu, Bali' },
  { slug: '11-garden-path', title: 'The Garden Path', location: 'The Estate, Uluwatu' },
  { slug: '12-open-air-gym', title: 'Open-Air Gym', location: 'The Estate, Uluwatu' },
  { slug: '13-breakfast-on-the-cliff', title: 'Breakfast on the Cliff', location: 'Uluwatu, Bali' },
  { slug: '14-under-the-frangipani', title: 'Under the Frangipani', location: 'Uluwatu, Bali' },
  { slug: '15-last-light', title: 'Last Light', location: 'Sunset, Uluwatu' },
  { slug: '16-estate-after-dark', title: 'The Estate After Dark', location: 'Uluwatu, Bali' },
];
