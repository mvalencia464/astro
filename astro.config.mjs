import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwindcss from '@tailwindcss/vite';
import cloudflare from '@astrojs/cloudflare';

export default defineConfig({
  output: 'static', 
  adapter: cloudflare({
    imageService: 'compile',
    platformProxy: {
      enabled: true,
      // Add these flags to prevent the "Hung Worker" error
      experimentalCompatibilityFlags: ["nodejs_compat", "global_fetch_strictly_public"]
    }
  }),
  integrations: [react()],
  vite: {
    plugins: [tailwindcss()],
    optimizeDeps: {
      exclude: ['astro/compiler-runtime', 'astro/assets/services/sharp']
    },
    ssr: {
      noExternal: ['picomatch', 'lucide-react', '@astrojs/react'],
    },
    build: {
      target: 'es2022',
      cssMinify: 'lightningcss',
    },
  },
});