import type { PhotoStripItem } from '../components/PhotoStrip';

/**
 * Photo strip shown at the foot of the East Sussex page.
 *
 * IMPORTANT: these are stock photographs from Pexels, not pictures of Crafted
 * at Powdermills. The venue supplied no photography, so the strip is styled to
 * evoke the setting — English countryside, lake, padel, wellness — rather than
 * to document it. Swap these for real venue shots as soon as they exist, and
 * keep the alt text describing what is actually in frame, never implying the
 * photo was taken at Powdermills.
 *
 * Pexels License: free for commercial use, no attribution required.
 * Per-file sources are listed in
 * `public/imagenes/east-sussex-gallery/CREDITS.txt`.
 *
 * Array order is the display order: padel, landscape, interior, water and
 * wellness alternate so no two neighbours are the same kind of shot.
 */
export const EAST_SUSSEX_GALLERY: PhotoStripItem[] = [
  { slug: '01-sussex-weald', title: 'Rolling green farmland under a wide sky', location: 'English countryside' },
  { slug: '02-centre-court', title: 'Covered padel courts', location: 'Padel club' },
  { slug: '03-main-house', title: 'A Georgian country house behind a lawn', location: 'English country house' },
  { slug: '04-mist-on-water', title: 'Morning mist over a still lake', location: 'Lakeside' },
  { slug: '05-match-point', title: 'A player reaching for a shot on court', location: 'Padel' },
  { slug: '06-four-poster', title: 'A four-poster bed in a country hotel room', location: 'Guest room' },
  { slug: '07-wood-fired-soak', title: 'A wood-fired hot tub steaming at dusk', location: 'Outdoor wellness' },
  { slug: '08-ready-to-play', title: 'A padel racket and ball resting on court', location: 'Padel' },
  { slug: '09-ancient-woodland', title: 'An ancient beech tree in old woodland', location: 'Woodland' },
  { slug: '10-on-the-water', title: 'A kayaker crossing calm open water', location: 'Lakeside' },
  { slug: '11-craft-barn', title: 'Hands shaping clay on a potter’s wheel', location: 'Craft workshop' },
  { slug: '12-lakeside-sauna', title: 'A barrel sauna looking out over water', location: 'Outdoor wellness' },
  { slug: '13-the-pub', title: 'A pint on a table by a pub window', location: 'Country pub' },
  { slug: '14-wild-swimming', title: 'Swimmers in open water at sunset', location: 'Wild swimming' },
  { slug: '15-dog-friendly', title: 'A dog running across an open field', location: 'Dog-friendly grounds' },
  { slug: '16-last-light', title: 'A wooden jetty reaching into a lake at sunset', location: 'Lakeside' },
];
