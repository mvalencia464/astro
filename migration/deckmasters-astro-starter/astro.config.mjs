import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';

export default defineConfig({
  integrations: [
    react({
      experimentalReactChildren: true,
    }),
    tailwind({
      applyBaseStyles: false,
    }),
  ],
  image: {
    domains: ['cdn.jsdelivr.net'],
    remotePatterns: [{ protocol: 'https' }],
  },
  vite: {
    ssr: {
      external: ['lucide-react'],
    },
  },
});
