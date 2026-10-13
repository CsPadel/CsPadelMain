export interface ItineraryImage {
  src: string;
  /** CSS object-position, for photos whose subject sits off-centre. */
  position?: string;
}

/**
 * One photo per activity, in the same order as `menorcaPage.landing.journey[n].activities`
 * in the locale files. Files live in `public/imagenes/menorca-itinerary/`.
 */
const dir = '/imagenes/menorca-itinerary';

export const MENORCA_ITINERARY_IMAGES: ItineraryImage[][] = [
  [
    { src: `${dir}/d1-arrival.jpg` },
    { src: `${dir}/d1-warm-up.jpg` },
    { src: `${dir}/d1-welcome-dinner.jpg` },
  ],
  [
    { src: `${dir}/d2-breakfast.jpg` },
    { src: `${dir}/d2-coaching.webp` },
    { src: `${dir}/d2-lunch-boat.jpg` },
    { src: `${dir}/d2-dinner.jpg` },
  ],
  [
    { src: `${dir}/d3-breakfast.jpg` },
    { src: `${dir}/d3-coaching.jpg` },
    { src: `${dir}/d3-vineyard.jpg` },
    { src: `${dir}/d3-group-dinner.jpg`, position: 'center 70%' },
  ],
  [
    { src: `${dir}/d4-early-breakfast.jpg` },
    { src: `${dir}/d4-tournament.jpg` },
    { src: `${dir}/d4-awards-lunch.jpg` },
    { src: `${dir}/d4-sunset-tapas.jpg` },
  ],
  [
    { src: `${dir}/d5-final-breakfast.jpg` },
    { src: `${dir}/d5-optional-padel.jpg` },
    { src: `${dir}/d5-departure.jpg` },
  ],
];
