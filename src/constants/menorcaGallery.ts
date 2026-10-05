import type { PhotoStripItem } from '../components/PhotoStrip';

/**
 * Photo strip shown at the foot of the Menorca page.
 *
 * These are photographs from the Courtside Menorca retreat and the Barceló
 * Nura, each cropped to the 3:4 card (1000x1333) the strip renders at and
 * stored in `public/imagenes/menorca-gallery/`.
 *
 * Array order is the display order: padel, coast, food and stay alternate so no
 * two neighbours are the same kind of shot. Alt text is `title – location`, so
 * describe what is actually in frame.
 */
export const MENORCA_GALLERY: PhotoStripItem[] = [
  { slug: '01-pool-at-dusk', title: 'A hotel pool glowing beneath a pink dusk sky', location: 'Hotel pool' },
  { slug: '02-coaching-at-the-net', title: 'A coaching session at the net', location: 'Padel' },
  { slug: '03-sailing-the-coast', title: 'Two small sailing boats crossing the bay', location: 'Menorca coast' },
  { slug: '04-wine-and-cheese', title: 'A wine and cheese tasting on a wooden table', location: 'Vineyard tasting' },
  { slug: '05-world-padel-tour-net', title: 'Low evening sun behind a World Padel Tour net', location: 'Padel' },
  { slug: '06-hidden-cove', title: 'A turquoise cove with a white-sand beach', location: 'Menorca coast' },
  { slug: '07-table-with-a-view', title: 'A dining table set beside tall windows', location: 'Island dining' },
  { slug: '08-hands-on-coaching', title: 'A coach adjusting a player’s grip on court', location: 'Padel' },
  { slug: '09-sunset-on-the-cliff', title: 'A cliffside bar glowing at sunset above the sea', location: 'Cova d’en Xoroi' },
  { slug: '10-long-table-lunch', title: 'Guests sharing a long-table lunch', location: 'Vineyard lunch' },
  { slug: '11-first-serve', title: 'Padel balls and a ball tube on a blue court', location: 'Padel' },
  { slug: '12-the-lighthouse', title: 'A black-and-white striped lighthouse on the shore', location: 'Menorca coast' },
  { slug: '13-in-the-rally', title: 'A coach and player in the middle of a rally', location: 'Padel' },
];
