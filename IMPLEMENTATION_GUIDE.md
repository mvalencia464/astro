# Performance Implementation Guide

## Step 1: Install Sharp for Image Optimization

```bash
npm install --save-dev sharp
```

## Step 2: Run Image Optimization Script

```bash
node scripts/optimize-images.js
```

This will:
- Compress all images in `src/assets/`
- Generate WebP and AVIF versions
- Create responsive sizes (640px, 1024px, 1440px)
- Strip metadata to reduce file size
- Print a summary of space saved

## Step 3: Update QuoteForm Component - Add Lazy Loading

File: `src/components/QuoteForm.tsx` (if using images)

```jsx
// Add loading="lazy" to images below the fold
<img
  loading="lazy"
  src="/path/to/image.webp"
  alt="Description"
/>
```

## Step 4: Update PortfolioGrid Component - Lazy Load Images

File: `src/components/PortfolioGrid.tsx`

The Image component should support lazy loading:

```jsx
<Image
  src={image}
  alt="Portfolio item"
  loading="lazy"
  sizes="(max-width: 640px) 640px, (max-width: 1024px) 1024px, 1440px"
/>
```

## Step 5: Update Hero Image - Prioritize Loading

File: `src/pages/index.astro` (Line 46-51)

```jsx
<Image
  src={heroImage}
  alt="Modern Deck in Anchorage"
  fetchpriority="high"  // Add this line
  loading="eager"       // Add this line
  class="w-full h-full object-cover opacity-70 scale-105 animate-slow-zoom"
  sizes="(max-width: 640px) 640px, (max-width: 1024px) 1024px, 1440px"
/>
```

## Step 6: Update BaseLayout - Optimize Google Fonts

File: `src/layouts/BaseLayout.astro` (Lines 27-29)

Current:
```html
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&family=Oswald:wght@400;500;700&family=Caveat:wght@400;700&display=swap" rel="stylesheet" />
```

Optimized (remove unused weights):
```html
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600&family=Oswald:wght@400;700&family=Caveat:wght@400;700&display=swap" rel="stylesheet" />
```

Consider this even more optimized version:
```html
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600&family=Oswald:wght@700&display=swap" rel="stylesheet" />
```

## Step 7: Update Astro Config - Move Images to Main Domain

File: `astro.config.mjs`

Currently, images are served from `images.stokeleads.com`. Update the remotePatterns:

```javascript
image: {
  remotePatterns: [
    {
      protocol: 'https',
      hostname: 'images.stokeleads.com',
    },
    {
      protocol: 'https',
      hostname: 'decks.stokeleads.com', // Add main domain
    },
  ],
},
```

Then update your asset URLs to use `decks.stokeleads.com` instead of `images.stokeleads.com`.

## Step 8: Update Wrangler Config - Add Cache Headers

File: `wrangler.toml`

Add cache control headers:

```toml
[[routes]]
pattern = "*.webp"
zone_id = "your_cloudflare_zone_id"
custom_domain = true
cache_default_ttl = 31536000  # 1 year for versioned images

[[routes]]
pattern = "*.js"
zone_id = "your_cloudflare_zone_id"
custom_domain = true
cache_default_ttl = 2592000   # 30 days for JS

[[routes]]
pattern = "*.css"
zone_id = "your_cloudflare_zone_id"
custom_domain = true
cache_default_ttl = 2592000   # 30 days for CSS
```

Or use Cloudflare dashboard > Caching > Cache Rules to set TTLs by file type.

## Step 9: Enable Cloudflare Optimizations

Log into Cloudflare Dashboard → Speed:
- [ ] Enable **Polish** (auto-compress images)
- [ ] Enable **Rocket Loader** (async JS)
- [ ] Enable **Mirage** (lazy load images)
- [ ] Set **Mobile Image Optimization** to "On"

## Step 9b: Enable Cloudflare Cache (Recommended)

Go to Cloudflare Dashboard > Caching > Cache Rules:

Create rule 1 (Images & Fonts - 1 year):
- Path: `*.webp OR *.avif OR *.jpg OR *.png OR *.woff2 OR *.woff OR *.ttf`
- Browser cache TTL: 1 year (31536000 seconds)

Create rule 2 (JS/CSS - 30 days):
- Path: `*.js OR *.css`
- Browser cache TTL: 30 days (2592000 seconds)

Create rule 3 (HTML - No cache):
- Path: `*.html`
- Browser cache TTL: 0 (always fresh)

## Step 10: Fix HTTP → HTTPS Redirect

In Cloudflare Dashboard → Rules → Page Rules:
1. Create rule for `http://decks.stokeleads.com/*`
2. Set "Always Use HTTPS" = ON

Or add to Wrangler config:

```toml
[routes]
pattern = "http://*"
zone_id = "your_zone_id"

[[env.production.headers]]
x-robots-tag = "noindex, nofollow"
```

## Step 11: Verify Changes

### Build & Deploy
```bash
npm run build
wrangler deploy --env production
```

### Test with Pingdom
1. Run Pingdom test on https://decks.stokeleads.com
2. Compare waterfall chart (should see fewer blocking requests)
3. Check image sizes (should show WebP files instead of massive originals)
4. Look for lazy-loaded images (marked with `loading="lazy"`)

### Expected Improvements
- Page load time: 3.7s → 2.0-2.3s
- Image size reduction: 3.5 MB → 0.8 MB (77% smaller)
- Fewer blocking assets: 15 → <5
- Connection pooling: Should be eliminated

## Troubleshooting

### Images not showing after optimization
- Ensure you're using the new `.webp` file names
- Check that the paths in your components match the optimized output paths
- Verify Cloudflare is serving the images (check Network tab in DevTools)

### Responsive images not working
- Make sure srcset attributes are correctly formatted
- Use proper size attributes: `sizes="(max-width: 640px) 640px, (max-width: 1024px) 1024px, 1440px"`
- Test with `<picture>` element for better browser support

### Lazy loading not working
- Use `loading="lazy"` on `<img>` tags
- Note: Astro's `<Image>` component may have different props
- Check browser support (all modern browsers support it)

### Cache not working
- Hard refresh browser (Cmd+Shift+R on Mac, Ctrl+Shift+R on Windows)
- Clear Cloudflare cache in dashboard
- Check Cache-Control headers in response headers (Network tab)

