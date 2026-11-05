import type { PhotoStripItem } from '../components/PhotoStrip';

/**
 * Photo strip shown at the foot of the Tunisia page.
 *
 * Unsplash destination photos (free licence, no attribution required), not
 * pictures of Mövenpick Hotel Gammarth Tunis. Keep the alt text to what is in
 * frame, and swap in hotel or retreat shots once they exist. Sources are listed
 * in `public/imagenes/tunisia-gallery/CREDITS.txt`.
 */
export const TUNISIA_GALLERY: readonly PhotoStripItem[] = [
  { slug: '01-palm-at-dusk', title: 'Palm at Dusk', location: 'Sidi Bou Said' },
  { slug: '02-the-blue-door', title: 'The Blue Door', location: 'Sidi Bou Said' },
  { slug: '03-whitewashed-lane', title: 'Whitewashed Lane', location: 'Sidi Bou Said' },
  { slug: '04-tiled-arches', title: 'Tiled Arches', location: 'Tunisia' },
  { slug: '05-blue-window', title: 'Blue Window', location: 'Sidi Bou Said' },
  { slug: '06-mosque-courtyard', title: 'Mosque Courtyard', location: 'Tunisia' },
  { slug: '07-studded-door', title: 'Studded Door', location: 'Sidi Bou Said' },
  { slug: '08-lane-to-the-sea', title: 'Lane to the Sea', location: 'Sidi Bou Said' },
];
