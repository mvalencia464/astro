import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwindcss from '@tailwindcss/vite';
import cloudflare from '@astrojs/cloudflare';

export default defineConfig({
  output: 'server',
  adapter: cloudflare({
    cloudflareModules: true,
    imageService: 'cloudflare-binding',
    platformProxy: {
      enabled: true
    }
  }),
  integrations: [react()],
  vite: {
    server: {
      hmr: {
        port: 24678,
      }
    },
    plugins: [tailwindcss()],
    build: {
      target: 'es2022',
      cssTarget: 'es2022',
      cssMinify: 'lightningcss',
    },
    ssr: {
      external: ['lucide-react'],
    },
  },
});