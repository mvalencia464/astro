import { mapAssetUrl } from './assetMapper';
import type { ImageMetadata } from 'astro';
import GALLERY_DATA from '../data/portfolio-gallery.json';

export interface GalleryItem {
  src: string;
  caption: string;
  metadata?: ImageMetadata | string;
}

export function getPortfolioGallery(): GalleryItem[] {
  return (GALLERY_DATA as any[]).map(item => ({
    ...item,
    metadata: mapAssetUrl(item.src)
  }));
}
