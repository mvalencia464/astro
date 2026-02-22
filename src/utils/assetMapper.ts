import type { ImageMetadata } from 'astro';

// Eagerly glob all local images under src/assets/portfolio/ and src/assets/testimonials/
// This covers portfolio images and testimonial images (excluding videos from ImageMetadata glob)
const allAssets = import.meta.glob<{ default: ImageMetadata }>('/src/assets/{portfolio,testimonials}/**/*.{webp,jpg,jpeg,png,svg}', { eager: true });

// Additionally, for videos which are typically raw strings, we might need a separate glob if they are to be processed differently.
// For now, mapAssetUrl will handle them as raw strings if they exist at these paths.
// The previous glob was: '/src/assets/**/*.{webp,jpg,jpeg,png,svg,mp4}'
// Let's refine the glob to explicitly cover images for metadata, and then adjust getAssetMetadataByPath for other types.
// Re-evaluating: The initial glob `('/src/assets/**/*.{webp,jpg,jpeg,png,svg,mp4}')` was actually more comprehensive for both image metadata and raw video paths.
// The core issue is ensuring `.default` is correctly accessed and external URLs are passed through.
// The current glob in the provided file `'/src/assets/**/*.{webp,jpg,jpeg,png,svg,mp4}'` is suitable.
// The main change will be ensuring the `mapAssetUrl` handles the `avatarUrl` correctly using this glob, which it already does.
// The request is to glob 'portfolio' and 'testimonials' specifically for images.

// Let's stick with the broader glob but ensure mapAssetUrl's logic is sound for the default export.
// The previous change already refined getAssetMetadataByPath to return `?.default || allAssets[fullPath]`
// which correctly handles the eager glob wrapper.
// So, the glob pattern itself in assetMapper.ts as '/src/assets/**/*.{webp,jpg,jpeg,png,svg,mp4}' is correct
// if we want to also track video paths and SVG's through the mapper.
// However, the request specifically asks for: '/src/assets/{portfolio,testimonials}/**/*.{webp,jpg,jpeg,png,svg}'
// This implies limiting it to these directories and removing MP4 if it's meant to be treated as a direct URL.

// Given the `allAssets` glob is currently `'/src/assets/**/*.{webp,jpg,jpeg,png,svg,mp4}'`
// and the request is for `'/src/assets/{portfolio,testimonials}/**/*.{webp,jpg,jpeg,png,svg}'`
// This will narrow the scope, which might exclude SVGs or other assets outside those specific folders,
// but let's follow the user's explicit request.

// Let's adjust the glob to precisely match the requested folders and extensions.
const allAssets = import.meta.glob<{ default: ImageMetadata | string }>('/src/assets/{portfolio,testimonials}/**/*.{webp,jpg,jpeg,png,svg}', { eager: true });


/**
 * Helper to get asset metadata by its path relative to src/assets.
 * It looks for a glob key that ends with the provided relativePath.
 * This is more flexible for inputs that might not include the full directory structure,
 * but prioritizes an exact match.
 * @param relativePath - The path relative to src/assets/, e.g., 'portfolio/my-image.webp' or 'testimonials/images/testimonial-1.jpg'
 * @returns The ImageMetadata object (for images) or string (for videos), or undefined if not found.
 */
function getAssetMetadataByPath(relativePath: string): ImageMetadata | string | undefined {
  // Construct the full path that matches the glob keys
  const fullPath = `/src/assets/${relativePath}`;

  // Check for an exact match first
  if (allAssets[fullPath]) {
    // Return the .default property, ensuring we get the actual metadata object/string.
    // The || allAssets[fullPath] is a safeguard if .default somehow doesn't exist,
    // though for eager globs it should always be present for a matched asset.
    return allAssets[fullPath]?.default || allAssets[fullPath];
  }

  // If no exact match, search for a key that ends with the provided relativePath.
  // This handles cases where the input `url` might not include the full `/src/assets/` prefix.
  const foundKey = Object.keys(allAssets).find(key => key.endsWith(`/${relativePath}`));
  if (foundKey) {
    // Return the .default property from the found module, with the same safeguard.
    return allAssets[foundKey]?.default || allAssets[foundKey];
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
