import type { ImageMetadata } from 'astro';

// Eagerly glob all local assets (images and videos) under src/assets/
const allAssets = import.meta.glob<{ default: ImageMetadata | string }>('../assets/**/*.{jpeg,jpg,png,gif,webp,svg,mp4}', { eager: true });


/**
 * Helper to get asset metadata by its path relative to src/assets.
 * It looks for a glob key that ends with the provided relativePath.
 * This is more flexible for inputs that might not include the full directory structure,
 * but prioritizes an exact match.
 * @param relativePath - The path relative to src/assets/, e.g., 'portfolio/my-image.webp' or 'testimonials/images/testimonial-1.jpg'
 * @returns The ImageMetadata object (for images) or string (for videos), or undefined if not found.
 */
function getAssetMetadataByPath(relativePath: string): ImageMetadata | string | undefined {
  // Prioritize exact match
  const exactGlobKey = `/src/assets/${relativePath}`;
  if (allAssets[exactGlobKey]) {
    return allAssets[exactGlobKey].default;
  }

  // If no exact match, search for a key that ends with the provided path.
  // This is less efficient, but robust for various input formats.
  const foundKey = Object.keys(allAssets).find(key => key.endsWith(`/${relativePath}`));
  if (foundKey) {
    return allAssets[foundKey].default;
  }

  return undefined;
}

/**
 * Maps local asset URLs or returns external URLs as-is.
 * For known local assets, returns their ImageMetadata object (for images) or raw string path (for videos).
 * This allows consumers to access `src`, `width`, `height` properties for images.
 *
 * @param url - The asset URL (local or absolute). Expected format for local assets:
 *              - 'portfolio/my-image.webp' (relative to src/assets/)
 *              - '/assets/portfolio/my-image.webp' (absolute from project root, with /assets/ prefix)
 * @returns The ImageMetadata object for images, a direct string path for videos/external URLs, or undefined if a local asset is not found.
 */
export function mapAssetUrl(url: string): ImageMetadata | string | undefined {
  if (!url) return undefined; // Return undefined instead of empty string as per new return type

  // If already an external URL, return as-is (avatars, etc.)
  if (url.startsWith('http://') || url.startsWith('https://')) {
    return url;
  }
  
  let relativePath = url;
  // If the URL starts with '/assets/', strip it to get the path relative to src/assets/
  if (url.startsWith('/assets/')) {
    relativePath = url.substring('/assets/'.length);
  }
  
  // Attempt to find metadata for the relative path
  const metadata = getAssetMetadataByPath(relativePath);
  
  // Return the metadata object (ImageMetadata or string for video)
  if (metadata) {
    return metadata;
  }

  // If no metadata found for a local path, return undefined
  return undefined;
}

// Removed getPortfolioImageMetadata and getTestimonialAssetMetadata as they are superseded by getAssetMetadataByPath
// and mapAssetUrl now returns the full metadata object.

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
  // getPortfolioImageMetadata, // Removed as mapAssetUrl now provides metadata directly
  // getTestimonialAssetMetadata, // Removed as mapAssetUrl now provides metadata directly
};
