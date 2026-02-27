import React, { useState, useEffect, useRef } from 'react';
import GALLERY_DATA from '../data/portfolio-gallery.json';
import { ArrowRight } from 'lucide-react';

interface PortfolioItem {
  src: string;
  caption: string;
  optimizedSrc?: string;
  srcSet?: string;
}

interface PortfolioGridProps {
  initialData?: PortfolioItem[];
}

export const PortfolioGrid: React.FC<PortfolioGridProps> = ({ initialData }) => {
  const data = initialData || (GALLERY_DATA as PortfolioItem[]);
  const [visibleCount, setVisibleCount] = useState(6);
  const loaderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && visibleCount < data.length) {
          setVisibleCount((prev) => Math.min(prev + 6, data.length));
        }
      },
      { threshold: 0.1, rootMargin: '200px' }
    );

    if (loaderRef.current) {
      observer.observe(loaderRef.current);
    }

    return () => observer.disconnect();
  }, [visibleCount, data.length]);

  const displayedItems = data.slice(0, visibleCount);

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
          {displayedItems.map((item, index) => (
            <div
              key={index}
              className="relative group overflow-hidden rounded-sm bg-stone-800"
            >
              <img
                src={item.optimizedSrc || item.src}
                srcSet={item.srcSet}
                alt={item.caption}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                loading={index < 3 ? 'eager' : 'lazy'}
                decoding="async"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="absolute bottom-0 left-0 right-0 p-3 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                <p className="text-white text-xs font-semibold leading-tight">{item.caption}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Sentinel element for infinite scroll */}
        {visibleCount < data.length && (
          <div ref={loaderRef} className="h-20 w-full flex items-center justify-center mt-8">
            <div className="w-8 h-8 border-t-2 border-orange-600 rounded-full animate-spin"></div>
          </div>
        )}
      </div>
    </section>
  );
};

export default PortfolioGrid;
