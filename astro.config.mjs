import { defineConfig } from 'astro/config';
import cloudflare from '@astrojs/cloudflare';

export default defineConfig({
    // Connects your site to the Cloudflare network
    adapter: cloudflare({
        imageService: 'cloudflare-binding',
    }),

    // 'server' output is best for ranking + lead generation
    output: 'server',

    // New in Astro 6: Protects your site from script injection automatically
    csp: true,

    // Performance optimizations
    prefetch: {
        prefetchAll: true,
    },

    // Image optimization settings
    image: {
        // Cloudflare adapter handles image service automatically
        domains: [],
        remotePatterns: [{
            protocol: 'https',
        }],
    },

    // Vite optimization
    vite: {
        build: {
            minify: 'terser',
            terserOptions: {
                compress: {
                    drop_console: false,
                },
            },
            rollupOptions: {
                output: {
                    manualChunks: {
                        'vendor': ['astro'],
                    },
                },
            },
        },
    },
});