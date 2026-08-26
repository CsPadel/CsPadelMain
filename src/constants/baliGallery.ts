/**
 * Photo strip shown at the foot of the Bali page.
 *
 * The strip renders images only — `title` and `location` are no longer drawn on
 * screen, but they are kept because they build each image's alt text, so they
 * still need to describe the photo accurately.
 *
 * Source photography lives in `imgparaslide/` and `new images/`, resized to a
 * 1000x1333 (3:4) card before landing in `public/imagenes/bali-gallery/`.
 */
import type { PhotoStripItem } from '../components/PhotoStrip';

/**
 * Array order is the display order. Padel, estate, wellness and food alternate
 * on purpose so no two neighbours are the same kind of shot — the run finishes
 * on the dusk and after-dark frames.
 *
 * The number in each slug is the source batch it arrived in, not its position
 * here, so the strip can be reordered without renaming any files.
 */
export const BALI_GALLERY: PhotoStripItem[] = [
  { slug: '01-cliff-edge', title: 'The Cliff Edge', location: 'Uluwatu, Bali' },
  { slug: '05-centre-court', title: 'Centre Court', location: 'Uluwatu, Bali' },
  // 2957 puts the four-poster on the right of the frame, so this one is cropped
  // east rather than centre — a centred crop loses the bed entirely.
  { slug: '04-the-suite', title: 'The Suite', location: 'The Estate, Uluwatu' },
  { slug: '09-one-on-one-coaching', title: 'One-on-One Coaching', location: 'With Oli & Alex' },
  { slug: '03-under-the-frangipani', title: 'Under the Frangipani', location: 'Uluwatu, Bali' },
  { slug: '08-court-from-above', title: 'Court From Above', location: 'Uluwatu, Bali' },
  { slug: '13-chefs-table', title: "The Chef's Table", location: 'The Estate, Uluwatu' },
  { slug: '06-golden-hour-rally', title: 'Golden Hour Rally', location: 'Sunset Session' },
  { slug: '11-lily-pond', title: 'The Lily Pond', location: 'The Estate, Uluwatu' },
  { slug: '07-tropical-baseline', title: 'Tropical Baseline', location: 'The Estate, Uluwatu' },
  { slug: '14-spa-pavilion', title: 'Spa Pavilion', location: 'The Estate, Uluwatu' },
  { slug: '10-courtside-social', title: 'Courtside Social', location: 'Padel Club, Bali' },
  { slug: '02-infinity-edge', title: 'The Infinity Edge', location: 'The Estate, Uluwatu' },
  { slug: '12-open-air-gym', title: 'Open-Air Gym', location: 'The Estate, Uluwatu' },
  { slug: '15-last-light', title: 'Last Light', location: 'Sunset, Uluwatu' },
  { slug: '16-after-dark', title: 'After Dark', location: 'The Estate, Uluwatu' },
];
