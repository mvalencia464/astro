import React, { useState, useRef, useEffect } from 'react';

interface ResponsiveImageProps {
  src: string;
  alt: string;
  className?: string;
  containerClassName?: string;
  sizes?: string;
  priority?: boolean;
  onLoad?: () => void;
}

/**
 * ResponsiveImage Component
 * 
 * Handles image loading with lazy loading and error states.
 * 
 * Portfolio images: Uses base image only (no responsive variants generated)
 * Other images: Attempts srcset if variants exist, falls back to base
 * 
 * Standard:
 * - Portfolio images: Single base file (e.g., 001-aerial-wraparound.webp)
 * - Other images: Base + optional variants (-320.webp, -640.webp, etc.)
 * 
 * Example:
 * <ResponsiveImage src="/images/portfolio/001-aerial-wraparound.webp" alt="Project" />
 */
const ResponsiveImage: React.FC<ResponsiveImageProps> = ({
  src,
  alt,
  className = '',
  containerClassName = '',
  sizes = '(max-width: 640px) 320px, (max-width: 1024px) 640px, (max-width: 1440px) 1024px, 1440px',
  priority = false,
  onLoad,
}) => {
  const [isLoading, setIsLoading] = useState(priority ? false : true);
  const [hasError, setHasError] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    setIsLoading(priority ? false : true); // Re-initialize loading state on src/priority change
    setHasError(false);

    if (imgRef.current?.complete) { setIsLoading(false); }
  }, [src, priority, onLoad]);

  // Generate responsive srcset with available image variants
  const generateSrcSet = (imagePath: string): string | undefined => { // `imagePath` is expected to be a string based on `src` prop type
    const path = imagePath; // `src` prop is always a string, so simplify this assignment.

    if (!path) return undefined;

    // Extract base path without extension
    const basePath = path.replace(/\.[^/.]+$/, '');

    // For portfolio images, just use the base image without srcset variants
    // This avoids 404s for missing responsive variants
    if (path.includes('/portfolio/')) {
      return undefined;
    }

    // Check if this is a non-portfolio image that has variants
    if (basePath.match(/-(320|640|1024)$/)) {
      // Already a specific size variant, don't modify
      return undefined;
    }

    // For other images, check if they have variants
    return `${basePath}-320.webp 320w, ${basePath}-640.webp 640w, ${basePath}.webp 1024w`;
  };

  const srcSet = generateSrcSet(src);


  return (
    <div className={`relative overflow-hidden ${isLoading ? 'animate-pulse bg-stone-800' : ''} ${containerClassName || 'w-full h-full'}`}>
      <img
        ref={imgRef}
        src={src}
        srcSet={srcSet}
        sizes={srcSet ? sizes : undefined}
        alt={alt}
        className={`${className}`}
        loading={priority ? 'eager' : 'lazy'}
        decoding="async"
        onLoad={() => { setIsLoading(false); console.log('IMAGE LOADED:', src); }}
        onError={() => { setIsLoading(false); setHasError(true); console.error('IMAGE ERROR:', src); }}
      />
      {hasError && (
        <div className="absolute inset-0 bg-stone-800 flex items-center justify-center">
          <span className="text-stone-600 text-xs">Image unavailable</span>
        </div>
      )}
    </div>
  );
};

export default ResponsiveImage;
