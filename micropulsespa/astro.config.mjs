// @ts-nocheck
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import vercel from '@astrojs/vercel';
import sitemap from '@astrojs/sitemap'; // 1. Importamos la integración

// https://astro.build/config
export default defineConfig({
  // Dominio principal para generar las URLs del sitemap
  site: 'https://micropulsespa.com',

  // 2. Añadimos la integración aquí
  integrations: [sitemap()],

  vite: {
    plugins: [tailwindcss()]
  },

  adapter: vercel()
});