import type { ImageMetadata } from 'astro';

// Combined glob for all authorized assets (excluding video which is now in public)
const allAssets = import.meta.glob<{ default: ImageMetadata | string }>(
  '/src/assets/{portfolio,testimonials}/**/*.{webp,jpg,jpeg,png,svg}', 
  { eager: true }
);

function getAssetMetadataByPath(relativePath: string): ImageMetadata | string | undefined {
  // Normalize the path to match glob keys (/src/assets/...)
  const fullPath = `/src/assets/${relativePath.replace(/^\//, '')}`;

  // 1. Try exact match
  if (allAssets[fullPath]) {
    return allAssets[fullPath].default;
  }

  // 2. Try suffix match (handles cases where relativePath is missing leading folders)
  const foundKey = Object.keys(allAssets).find(key => key.endsWith(relativePath));
  if (foundKey) {
    return allAssets[foundKey].default;
  }

  return undefined;
}

export function mapAssetUrl(url: string): ImageMetadata | string | undefined {
  if (!url) return undefined;

  // Bypass for remote URLs
  if (url.startsWith('http')) return url;

  // Handle video paths directly from public directory
  if (url.startsWith('testimonials/videos/')) {
    return `/assets/testimonials/${url}`;
  }

  // Strip public-style prefix if present
  const cleanPath = url.startsWith('/assets/') ? url.substring(8) : url;

  return getAssetMetadataByPath(cleanPath);
}

export const isExternalUrl = (url: string) => url.startsWith('http');

export default { mapAssetUrl, isExternalUrl };