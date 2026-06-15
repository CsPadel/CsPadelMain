/** Visual assets for the three home service sections — shared with Services page */
export const HERO_ISLAND_VIDEOS = [
  '/bali.mp4',
  '/padelv.mp4',
  '/vid2.mp4',
  '/vid3.mp4',
] as const;

export const serviceMedia = {
  individual: {
    type: 'video' as const,
    src: HERO_ISLAND_VIDEOS[0],
  },
  group: {
    type: 'image' as const,
    src: '/villa3.jpg',
  },
  corporate: {
    type: 'video' as const,
    src: '/networkv.mp4',
  },
} as const;
