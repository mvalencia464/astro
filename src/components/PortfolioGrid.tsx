import React, { useMemo } from 'react'; // Removed useState, useEffect
// Removed X, ChevronLeft, ChevronRight as they are for the lightbox
import { mapAssetUrl } from '../utils/assetMapper';
import ResponsiveImage from './ResponsiveImage';
import { PORTFOLIO_GALLERY } from '../constants/portfolio';
import type { ImageMetadata } from 'astro';

interface PortfolioGridProps {
  images?: string[];
}

export const PortfolioGrid: React.FC<PortfolioGridProps> = ({ images }) => {
  // Removed selectedImageMetadata, setCurrentImageIndex states

  // Map image URLs to their metadata objects or external strings
  const mappedPortfolioAssets = useMemo(() => {
    const sourceImages = images || PORTFOLIO_GALLERY.map(item => item.src);
    return sourceImages.map(url => mapAssetUrl(url));
  }, [images]);

  // Removed portfolioImageSources as it was primarily for preloading in the modal

  const getCaption = (index: number) => {
    if (images) return `Project Image ${index + 1}`;
    return PORTFOLIO_GALLERY[index]?.caption || '';
  };

  // Removed handleImageClick, preloadAdjacentImages, handleNextImage, handlePrevImage, useEffect for keyboard navigation

  return (
    <section className="py-24 bg-stone-900 relative overflow-hidden">
      {/* Decorative border at top */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/3 h-[2px] bg-gradient-to-r from-transparent via-orange-600 to-transparent"></div>

      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="mb-16">
          <div className="flex items-center gap-4 mb-6">
            <div className="h-[1px] w-12 bg-orange-600"></div>
            <span className="text-orange-500 font-bold uppercase tracking-[0.3em] text-sm">Portfolio</span>
          </div>
          <h2 className="text-4xl md:text-6xl font-display font-bold uppercase leading-[0.9] mb-6">
            Your Backyard Dreams, <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-orange-600">
              Now Reality.
            </span>
          </h2>
          <p className="text-stone-400 text-lg max-w-2xl">
            Every image tells a story of transformation. From wraparound resort spaces to intimate gathering areas—see what's possible when engineering meets artistry.
          </p>
        </div>

        {/* Image Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 auto-rows-[250px]">
          {mappedPortfolioAssets.map((asset, index) => {
            // Extract src, width, height from the asset (ImageMetadata or string)
            const src = typeof asset === 'object' && asset !== null && 'src' in asset ? asset.src : (asset as string || '');
            const width = typeof asset === 'object' && asset !== null && 'width' in asset ? asset.width : undefined;
            const height = typeof asset === 'object' && asset !== null && 'height' in asset ? asset.height : undefined;

            return (
              <div
                key={index}
                // Removed onClick handler as modal functionality is removed
                className="relative group overflow-hidden rounded-sm bg-stone-800" // Removed cursor-pointer
              >
                {/* ResponsiveImage is read-only. We pass src, width, and height. */}
                {/* It's assumed ResponsiveImage internally uses an <img> tag and applies these props. */}
                <ResponsiveImage
                  src={src}
                  alt={getCaption(index)}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  containerClassName="absolute inset-0 w-full h-full"
                  sizes="(max-width: 640px) 320px, (max-width: 1024px) 640px, (max-width: 1440px) 1024px, 640px"
                  priority={false}
                  // Pass width and height to ResponsiveImage component
                  {...(width && { width })}
                  {...(height && { height })}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="absolute bottom-0 left-0 right-0 p-3 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                  <p className="text-white text-xs font-semibold leading-tight">{getCaption(index)}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Removed Image Lightbox */}
    </section>
  );
};

export default PortfolioGrid;
