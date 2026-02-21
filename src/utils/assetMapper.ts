import type { ImageMetadata } from 'astro';

// Eagerly glob all portfolio images
const allPortfolioImages = import.meta.glob<{ default: ImageMetadata }>('../assets/portfolio/**/*.{jpeg,jpg,png,gif,webp}', { eager: true });

// Eagerly glob all testimonial images and videos (assuming ImageMetadata for images, direct path for videos)
const allTestimonialAssets = import.meta.glob<{ default: ImageMetadata | string }>('../assets/testimonials/**/*.{webp,jpg,png,svg,mp4}', { eager: true });


/**
 * Helper to get asset metadata by its path relative to src/assets.
 * This function can retrieve metadata for both portfolio images and testimonial assets.
 * @param assetPath - The path relative to src/assets/, e.g., 'portfolio/my-image.webp' or 'testimonials/images/testimonial-1.jpg'
 * @returns The ImageMetadata object (for images) or string (for videos), or undefined if not found.
 */
function getAssetMetadataByPath(assetPath: string): ImageMetadata | string | undefined {
  const globKey = `/src/assets/${assetPath}`;
  
  // Check portfolio images
  let assetModule = allPortfolioImages[globKey];
  if (assetModule) {
    return assetModule.default;
  }

  // Check testimonial assets
  assetModule = allTestimonialAssets[globKey];
  if (assetModule) {
    return assetModule.default;
  }

  return undefined;
}

/**
 * Maps local asset URLs or returns external URLs as-is.
 * For known portfolio and testimonial assets, returns their optimized src from metadata.
 * @param url - The asset URL (local or absolute). Expected format for local assets: `/assets/path/to/image.webp`
 * @returns The resolved and optimized URL string for local assets, or the original URL for external ones.
 */
export function mapAssetUrl(url: string): string {
  if (!url) return '';
  
  // If already an external URL, return as-is (avatars, etc.)
  if (url.startsWith('http://') || url.startsWith('https://')) {
    return url;
  }
  
  // Remove '/assets/' prefix to match our internal assetPath format (e.g., 'portfolio/image.webp')
  if (url.startsWith('/assets/')) {
    const assetPath = url.substring('/assets/'.length); 
    const metadata = getAssetMetadataByPath(assetPath);

    if (metadata) {
        // If it's an ImageMetadata object, return its src
        if (typeof metadata !== 'string' && 'src' in metadata) {
            return metadata.src;
        }
        // If it's a direct path string (e.g., for video or other non-image asset), return it
        if (typeof metadata === 'string') {
            return metadata;
        }
    }
  }
  
  // For any other local asset not covered by the globs, return as-is (original behavior)
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
  const globKey = `/src/assets/${assetPath}`;
  const imageModule = allPortfolioImages[globKey];
  return imageModule?.default;
}

/**
 * Returns the full ImageMetadata object or direct path for a testimonial asset.
 * @param assetPath - The path relative to src/assets/, e.g., 'testimonials/images/testimonial-1.jpg' or 'testimonials/videos/video-1.mp4'
 * @returns The ImageMetadata object (for images) or string (for videos), or undefined if not found.
 */
export function getTestimonialAssetMetadata(assetPath: string): ImageMetadata | string | undefined {
  const globKey = `/src/assets/${assetPath}`;
  const assetModule = allTestimonialAssets[globKey];
  return assetModule?.default;
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
  getTestimonialAssetMetadata,
};
