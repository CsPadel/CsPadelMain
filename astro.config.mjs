// @ts-check
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwindcss from '@tailwindcss/vite';
import { SITE_URL } from './src/constants/site.ts';
import { generateResponsiveImages } from './scripts/responsive-images.mjs';

/** Builds WebP size variants of the site's photos before Astro starts. */
const responsiveImages = {
  name: 'responsive-images',
  hooks: {
    'astro:config:setup': async ({ logger }) => {
      const { images, encoded } = await generateResponsiveImages();
      logger.info(`${images} photos, ${encoded} variants encoded`);
    },
  },
};

export default defineConfig({
  site: SITE_URL,
  integrations: [react(), responsiveImages],
  // "About Us" became "The Experience". Keep the old URLs alive so existing
  // links and search results don't 404.
  redirects: {
    '/about': '/the-experience',
    '/es/about': '/es/the-experience',
    '/fr/about': '/fr/the-experience',
  },
  prefetch: {
    prefetchAll: false,
    defaultStrategy: 'hover',
  },
  vite: {
    plugins: [tailwindcss()],
    build: {
      cssMinify: true,
    },
  },
});
