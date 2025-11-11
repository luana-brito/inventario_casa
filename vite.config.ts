import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

const manifest = {
  name: 'Inventário Casa Nova',
  short_name: 'Casa Nova',
  description:
    'Controle completo do inventário da nova casa com categorias por cômodo, cores e quantidade dos itens.',
  theme_color: '#1d4ed8',
  background_color: '#f8fafc',
  display: 'standalone',
  lang: 'pt-BR',
  start_url: '/',
  scope: '/',
  icons: [
    {
      src: 'favicon.svg',
      sizes: 'any',
      type: 'image/svg+xml',
      purpose: 'any maskable'
    },
    {
      src: 'icons/icon-192x192.svg',
      sizes: '192x192',
      type: 'image/svg+xml',
      purpose: 'any maskable'
    },
    {
      src: 'icons/icon-512x512.svg',
      sizes: '512x512',
      type: 'image/svg+xml',
      purpose: 'any maskable'
    }
  ],
  categories: ['productivity', 'utilities', 'house-and-home']
};

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      manifest,
      includeAssets: ['favicon.svg', 'icons/icon-192x192.svg', 'icons/icon-512x512.svg'],
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg,webp}']
      },
      devOptions: {
        enabled: true
      }
    })
  ]
});


