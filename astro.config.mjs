import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwindcss from '@tailwindcss/vite';
import cloudflare from '@astrojs/cloudflare';

export default defineConfig({
  output: 'server',
  adapter: cloudflare({
    imageService: 'cloudflare',
    platformProxy: {
      enabled: true,
    },
  }),
  integrations: [react()],
  image: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.stokeleads.com',
      },
    ],
  },
vite: {
    plugins: [tailwindcss()],
    build: {
      target: 'esnext',
      cssMinify: 'esbuild', // Change from 'lightningcss' to 'esbuild'
    },
    ssr: {
      external: ['lucide-react'],
    },
  },});