# Astro 6 Content Collections Migration

## Completed

### Files Deleted
- ✅ `src/components/PortfolioGrid.tsx` - Old React portfolio grid
- ✅ `src/types/portfolio.ts` - Old portfolio types
- ✅ `src/data/projects.json` - Old projects data file
- ✅ `src/data/portfolio-gallery.json` - Old gallery data file
- ✅ `src/components/portfolio/ProjectCard.tsx` - Old project card component
- ✅ `src/components/portfolio/BeforeAfterSlider.tsx` - Old before/after slider
- ✅ `src/components/MicroOffers.tsx` - MicroOffers component
- ✅ `src/components/portfolio/` - Entire directory

### Files Created/Updated
- ✅ `src/content/config.ts` - New Astro 6 content collection config with glob loader
- ✅ `src/components/DeckGallery.astro` - New Astro component using content collections
- ✅ `src/pages/index.astro` - Updated to use DeckGallery and removed portfolio data imports
- ✅ `src/constants/portfolio.ts` - Simplified to export NICHES constant only
- ✅ `src/utils/portfolio.ts` - Cleaned up (marked for removal of old utilities)

## Next Steps

### 1. Move Deck Images
The content collection expects images in `src/assets/decks/`. Currently, images are in `src/assets/portfolio/`.

```bash
# If portfolio folder exists and has images, move them:
mv src/assets/portfolio/*.webp src/assets/decks/
```

Or create symlink for now:
```bash
ln -s ../portfolio decks
```

### 2. Image Metadata (Optional but Recommended for SEO)
To add titles/descriptions to deck images, create `.json` sidecars:

```
src/assets/decks/
├── hillside-mountain-view.webp
├── hillside-mountain-view.json
├── south-anchorage-retreat.webp
└── south-anchorage-retreat.json
```

Each `.json` file:
```json
{
  "title": "Hillside Mountain View - Custom Trex Deck"
}
```

### 3. Add Infinite Scroll (If Needed)
The current `DeckGallery.astro` shows first 6 images. To add infinite scroll:
- Create a new React component `InfiniteScrollGallery.tsx`
- Use `client:load` directive in DeckGallery.astro
- Component fetches additional items as user scrolls

### 4. Before/After Sliders (If Still Needed)
If you need before/after sliders on detail pages:
- Create a new `.astro` component `BeforeAfterSlider.astro`
- Use native HTML canvas or CSS clip-path instead of React
- Keep it SSR-friendly for better performance

### 5. Clean Up Unused Files
- `src/utils/portfolio.ts` - Now just comments, can delete when verified
- Check if any pages still import from deleted files

## Benefits of This Setup

✅ **Type-Safe**: Full TypeScript support via Astro content layer
✅ **Performant**: Images loaded via Astro's optimized Image component with AVIF format support
✅ **Incremental Builds**: Adding one image only rebuilds that entry
✅ **Dev Speed**: No more glob scanning of massive image folders
✅ **Future-Proof**: Easy to add metadata (descriptions, testimonials) per image
✅ **Clean Code**: No more messy JSON files; images are first-class citizens

## Content Collection API Usage

In any `.astro` file:
```astro
---
import { getCollection } from 'astro:content';

const allDecks = await getCollection('decks');
const featured = allDecks.slice(0, 3);
---
```

In any `.ts` file (for API endpoints):
```typescript
import { getCollection } from 'astro:content';

export async function GET() {
  const decks = await getCollection('decks');
  return new Response(JSON.stringify(decks));
}
```

## Notes

- The content collection loader uses Astro's built-in `glob` loader
- Images must be in `src/assets/decks/` directory (or update the path in `config.ts`)
- The `Image` component from `astro:assets` handles all optimization automatically
- No need for manual `getImage()` calls or srcSet generation anymore
