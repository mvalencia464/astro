# Performance Optimization Plan for decks.stokeleads.com

**Current Score**: 3.7s load time
**Target Score**: <2.5s (32% improvement)

## Priority 1: Image Optimization (Highest Impact - ~1.2s savings)

### Current Issues
- `045-wraparound-angle.webp`: 1.69 MB (likely 4000px+ wide)
- `048-lighting-detail.webp`: 869 KB
- `IMG_1055.webp`: 522 KB
- **Total image bloat**: ~3.5 MB+ on initial load

### Action Items
- [ ] Create image optimization script (node script that auto-resizes & compresses)
- [ ] Set up responsive image sizes (mobile: 640px, tablet: 1024px, desktop: 1440px)
- [ ] Add `loading="lazy"` to portfolio/reviews images
- [ ] Add `fetchpriority="high"` to hero image
- [ ] Implement picture elements with srcset for responsive images
- [ ] Target: Reduce 1.69 MB image to <300 KB, 869 KB to <200 KB

---

## Priority 2: Lazy Loading & Resource Blocking (Medium Impact - ~400ms savings)

### Current Issues
- Browser connection limit (6 per domain) causing blocking
- 30+ requests to images.stokeleads.com (separate DNS/SSL handshake each)
- Blocking assets detected (~15)

### Action Items
- [ ] Add `loading="lazy"` to all below-fold images
- [ ] Move images from images.stokeleads.com to decks.stokeleads.com (update astro.config.mjs)
- [ ] Verify Cloudflare HTTP/2 Server Push is enabled
- [ ] Implement connection pooling (Keep-Alive headers)
- [ ] Defer non-critical JavaScript

---

## Priority 3: Google Fonts Optimization (Low/Medium Impact - ~150-300ms)

### Current Issues
- Loading 300, 400, 500, 600, 700 font weights (likely all unused)
- External DNS lookup to fonts.googleapis.com + gstatic.com

### Action Items
- [ ] Audit which weights are actually used (likely just 400, 600, 700)
- [ ] Reduce to 2-3 critical weights only
- [ ] Consider self-hosting fonts locally
- [ ] Add font-display: swap for faster paint

---

## Priority 4: HTTP Redirects (Quick Win - ~40ms)

### Current Issues
- http://decks.stokeleads.com → https:// redirect

### Action Items
- [ ] Add HSTS header in Cloudflare or wrangler.toml
- [ ] Ensure all internal links use https:// directly
- [ ] Redirect old URLs to https in build phase, not at request time

---

## Priority 5: Caching & CDN Optimization (Ongoing - ~200ms savings)

### Action Items
- [ ] Set Cache-Control headers for static assets (images: 1 year, JS/CSS: 30 days)
- [ ] Enable Cloudflare's image optimization (Polish)
- [ ] Enable Cloudflare's Rocket Loader for JS optimization
- [ ] Set up proper ETags for cache invalidation

---

## Implementation Schedule

**Phase 1 (Today)**: Image optimization script + lazy loading
**Phase 2 (Tomorrow)**: Move images to main domain + verify redirects
**Phase 3 (This Week)**: Font optimization + caching headers
**Phase 4 (Ongoing)**: Monitor with Pingdom, iterate

---

## Expected Results

| Fix | Current | Target | Savings |
|-----|---------|--------|---------|
| Image compression | 3.5 MB | 0.8 MB | ~1.2s |
| Lazy loading + blocking | 15 blocked | 0 blocked | ~400ms |
| Font optimization | ~300KB | ~80KB | ~150ms |
| HTTP redirect | 40ms | 0ms | ~40ms |
| **TOTAL** | **3.7s** | **~2.0s** | **~1.8s (48%)** |

