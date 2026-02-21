import type { ImageMetadata } from 'astro';

// Eagerly glob all portfolio images
// The keys in `allPortfolioImages` will be like '/src/assets/portfolio/001-aerial-wraparound.webp'
const allPortfolioImages = import.meta.glob<{ default: ImageMetadata }>('../assets/portfolio/*.webp', { eager: true });

/**
 * Helper to get image metadata by its path relative to src/assets
 * @param assetPath - The path relative to src/assets/, e.g., 'portfolio/my-image.webp'
 * @returns The ImageMetadata object, or undefined if not found.
 */
function getMetadataByAssetPath(assetPath: string): ImageMetadata | undefined {
  const globKey = `/src/assets/${assetPath}`;
  const imageModule = allPortfolioImages[globKey];
  return imageModule?.default;
}

/**
 * Maps local asset URLs or returns external URLs as-is.
 * For known portfolio images, returns their optimized src from metadata.
 * @param url - The asset URL (local or absolute). Expected format for local assets: `/assets/path/to/image.webp`
 * @returns The resolved and optimized URL string for local assets, or the original URL for external ones.
 */
export function mapAssetUrl(url: string): string {
  if (!url) return '';
  
  // If already an external URL, return as-is (avatars, etc.)
  if (url.startsWith('http://') || url.startsWith('https://')) {
    return url;
  }
  
  // Check if it's a portfolio image
  if (url.startsWith('/assets/portfolio/')) {
    // Remove '/assets/' prefix to match our internal assetPath format (e.g., 'portfolio/image.webp')
    const assetPath = url.substring('/assets/'.length); 
    const metadata = getMetadataByAssetPath(assetPath);
    if (metadata) {
      return metadata.src; // Return optimized src from Astro ImageMetadata
    }
  }
  
  // For any other local asset not covered by the glob, return as-is (original behavior)
  // This maintains compatibility for other assets if they exist and are not managed by glob
  return url;
}

/**
 * Returns the full ImageMetadata object for a portfolio asset.
 * This is useful when you need width, height, or other metadata for components
 * like Astro's <Image /> or to prevent CLS.
 * @param assetPath - The path relative to src/assets/, e.g., 'portfolio/my-image.webp'
 * @returns The ImageMetadata object, or undefined if not found.
 */
export function getPortfolioImageMetadata(assetPath: string): ImageMetadata | undefined {
  return getMetadataByAssetPath(assetPath);
}

/**
 * Check if URL is a remote CDN URL
 * @param url - The URL string to check.
 * @returns True if the URL starts with 'http://' or 'https://', false otherwise.
 */
export function isExternalUrl(url: string): boolean {
  return url.startsWith('http://') || url.startsWith('https://');
}

export default {
  mapAssetUrl,
  isExternalUrl,
  getPortfolioImageMetadata,
};
