import type { ImageMetadata } from 'astro';

// Use relative paths for glob to ensure Vite resolves them correctly
const allAssets = import.meta.glob<{ default: ImageMetadata | string }>(
  '../assets/**/*.{webp,jpg,jpeg,png,svg}',
  { eager: true }
);

function getAssetMetadataByPath(relativePath: string): ImageMetadata | string | undefined {
  if (!relativePath) return undefined;

  // Normalize path: remove leading slashes and leading 'assets/' or 'src/assets/'
  const normalizedPath = relativePath
    .replace(/^\//, '')
    .replace(/^src\/assets\//, '')
    .replace(/^assets\//, '');

  // 1. Try exact match with normalized path suffixes
  const keys = Object.keys(allAssets);

  // Try to find a key that ends with the normalized path
  // Vite keys usually look like '../assets/portfolio/image.webp' or '/src/assets/portfolio/image.webp'
  const foundKey = keys.find(key => {
    const normalizedKey = key.replace(/^\.\.\/assets\//, '').replace(/^\/src\/assets\//, '');
    return normalizedKey === normalizedPath || key.endsWith(normalizedPath);
  });

  if (foundKey) {
    return allAssets[foundKey].default;
  }

  return undefined;
}

export function mapAssetUrl(url: string | any): ImageMetadata | string | undefined {
  if (!url) return undefined;

  // If it's already an ImageMetadata object (has src property)
  if (typeof url === 'object' && url !== null && 'src' in url) {
    return url;
  }

  // Bypass for remote URLs
  if (typeof url === 'string' && url.startsWith('http')) return url;

  // Passthrough for public/ directory paths (stable URLs, no Vite hashing)
  if (typeof url === 'string' && url.startsWith('/images/')) return url;

  // Handle video paths directly from public directory
  if (typeof url === 'string' && url.startsWith('testimonials/videos/')) {
    return `/assets/${url}`;
  }

  // Strip public-style prefix if present
  const cleanPath = typeof url === 'string' && url.startsWith('/assets/') ? url.substring(8) : url;

  return getAssetMetadataByPath(cleanPath as string);
}

export const isExternalUrl = (url: string) => typeof url === 'string' && url.startsWith('http');

export default { mapAssetUrl, isExternalUrl };