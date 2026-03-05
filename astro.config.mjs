import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import cloudflare from '@astrojs/cloudflare';

export default defineConfig({
  output: 'static',
  adapter: cloudflare({
    imageService: 'compile',
    platformProxy: {
      enabled: true,
    },
  }),
  image: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.stokeleads.com',
      },
    ],
  },
  integrations: [],
  vite: {
    plugins: [tailwindcss()],
    optimizeDeps: {
      exclude: ['astro/compiler-runtime', 'astro/assets/services/sharp'],
    },
    ssr: {
      noExternal: ['picomatch'],
    },
    build: {
      target: 'es2020',
      cssMinify: 'esbuild',
    },
  },
});
