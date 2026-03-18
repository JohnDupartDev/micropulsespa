// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

import vercel from '@astrojs/vercel';

// https://astro.build/config
export default defineConfig({
  // Agrega tu dominio aquí
  site: 'https://micropulsespa.com',

  vite: {
    plugins: [tailwindcss()]
  },

  adapter: vercel()
});