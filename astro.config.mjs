// @ts-check
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  site: 'https://courtsidepadel.com',
  integrations: [react()],
  prefetch: {
    prefetchAll: false,
    defaultStrategy: 'hover',
  },
  vite: {
    plugins: [tailwindcss()],
    build: {
      rollupOptions: {
        output: {
          manualChunks: {
            'vendor-motion': ['framer-motion'],
            'vendor-react': ['react', 'react-dom'],
            'vendor-i18n': ['i18next', 'react-i18next'],
          },
        },
      },
      cssMinify: true,
    },
  },
});
