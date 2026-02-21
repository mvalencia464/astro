import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  integrations: [react()],
  image: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.stokeleads.com',
        port: undefined,
        pathname: '**',
      },
    ],
  },
  vite: {
    plugins: [tailwindcss()], // No extra options needed here
    ssr: {
      external: ['lucide-react'],
    },
  },
});
