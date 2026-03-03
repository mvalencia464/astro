import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import cloudflare from '@astrojs/cloudflare';

export default defineConfig({
  output: 'hybrid', 
  adapter: cloudflare({
    imageService: 'compile',
    platformProxy: {
      enabled: false,
      // Add these flags to prevent the "Hung Worker" error
      experimentalCompatibilityFlags: ["nodejs_compat", "global_fetch_strictly_public"]
    }
  }),
  image: {
    // Use AVIF with WebP fallback for better compression and performance
    formats: ['image/avif', 'image/webp', 'image/png', 'image/jpeg'],
    remotePattern: [],
    experimentalLayout: 'responsive',
  },
  integrations: [],
  vite: {
    plugins: [tailwindcss()],
    optimizeDeps: {
      exclude: ['astro/compiler-runtime', 'astro/assets/services/sharp']
    },
    ssr: {
      noExternal: ['picomatch', 'lucide-react'],
    },
    build: {
      target: 'es2020',
      cssMinify: 'esbuild',
    },
  },
});