// @ts-check
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  site: 'https://courtsidepadel.com',
  integrations: [react()],
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
