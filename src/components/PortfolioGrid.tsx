import React, { useMemo } from 'react';
import { getPortfolioGallery, type GalleryItem } from '../utils/portfolio';
import { mapAssetUrl } from '../utils/assetMapper';
import ResponsiveImage from './ResponsiveImage';

interface PortfolioGridProps {
  images?: string[]; // Optional override
}

export const PortfolioGrid: React.FC<PortfolioGridProps> = ({ images }) => {
  // Use centralized gallery data or the provided override
  const galleryItems = useMemo(() => {
    if (images) {
      // If manual image list provided, map them using the same logic
      return images.map((src, index) => ({
        src,
        caption: `Project Image ${index + 1}`,
        metadata: mapAssetUrl(src)
      }));
    }
    return getPortfolioGallery();
  }, [images]);

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
          {galleryItems.map((item, index) => {
            const asset = item.metadata;
            // Extract src, width, height from the asset (ImageMetadata or string)
            const src = typeof asset === 'object' && asset !== null && 'src' in asset ? asset.src : (asset as string || '');
            const width = typeof asset === 'object' && asset !== null && 'width' in asset ? asset.width : undefined;
            const height = typeof asset === 'object' && asset !== null && 'height' in asset ? asset.height : undefined;

            return (
              <div
                key={index}
                className="relative group overflow-hidden rounded-sm bg-stone-800"
              >
                <ResponsiveImage
                  src={src}
                  alt={item.caption}
                  width={width}
                  height={height}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  containerClassName="absolute inset-0 w-full h-full"
                  sizes="(max-width: 640px) 320px, (max-width: 1024px) 640px, (max-width: 1440px) 1024px, 640px"
                  priority={false}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="absolute bottom-0 left-0 right-0 p-3 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                  <p className="text-white text-xs font-semibold leading-tight">{item.caption}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default PortfolioGrid;
