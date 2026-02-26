import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwindcss from '@tailwindcss/vite';
import cloudflare from '@astrojs/cloudflare';

export default defineConfig({
  output: 'server',
  adapter: cloudflare(),
  integrations: [react()],
  image: {
    service: { entrypoint: 'astro/assets/services/noop' }
  },
  vite: {
    plugins: [tailwindcss()],
    build: {
      target: 'es2022',
      cssMinify: 'lightningcss',
    },
    ssr: {
      external: ['lucide-react'],
    },
  },
});