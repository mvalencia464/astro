# Performance Optimization Checklist

## Phase 1: Image Optimization (Today) ⚡
- [x] Install Sharp: `npm install --save-dev sharp`
- [x] Run optimization script: `node scripts/optimize-images.js` (2% additional savings)
- [x] Run aggressive resize script: `node scripts/aggressive-image-resize.js` (72% savings!)
- [x] Rebuild: `npm run build`
- [x] **Result: 41.67 MB → 11.57 MB (30.1 MB saved)**
  - 045-wraparound-angle: 1.6 MB → 328 KB (-80%)
  - 046-ground-level-1: 2.4 MB → 296 KB (-88%)
  - 047-ground-level-2: 2.9 MB → 380 KB (-87%)
  - And 7 other images with 70-86% reduction

## Phase 2: Update Components for Lazy Loading (Today) ⚡
- [x] Add `fetchpriority="high"` to hero image in `src/pages/index.astro`
- [x] Add `loading="eager"` to hero image (above fold, critical)
- [x] PortfolioGrid - Already uses ResponsiveImage with `priority={false}` (lazy loads)
- [x] ReviewsGridWithModal - Already uses ResponsiveImage with `priority={false}` + lazy avatars
- [x] All `<Image>` components already have responsive `sizes` attributes
- [x] Avatar images already have `loading="lazy"` on img tags

## Phase 3: Font Optimization (Done!) ✍️
- [x] Remove unused font weights from Google Fonts URL in BaseLayout
  - Inter: `wght@300;400;500;600` → `wght@300;400;600;700` (removed 500, added 700 for bold)
  - Oswald: `wght@400;500;700` → `wght@700` (only using 700 for headings)
  - Caveat: `wght@400;700` → Keep as is (both used)
  - Estimated savings: ~50-100 KB from fewer font files
- [x] Font display already set to `display=swap` in URL

## Phase 4: Image Domain Migration (Optional but Recommended) 🌐
- [ ] Audit current image URLs (count on images.stokeleads.com)
- [ ] Move images to decks.stokeleads.com (saves ~80ms per image)
- [ ] Update astro.config.mjs remotePatterns
- [ ] Test images load correctly
- [ ] Expected savings: ~200-400ms for full portfolio load

## Phase 5: Cloudflare Optimizations (Before Deployment) ⚙️
- [ ] Enable **Polish** (auto image compression)
- [ ] Enable **Rocket Loader** (async JS optimization)
- [ ] Enable **Mirage** (image lazy loading)
- [ ] Enable **Mobile Image Optimization**
- [ ] Create Cache Rules in Cloudflare dashboard:
  - [ ] Images (*.webp|*.jpg|*.png): 1 year cache
  - [ ] JS/CSS: 30 days cache
  - [ ] HTML: No cache (always fresh)
- [ ] Verify wrangler.toml has cache configuration

## Phase 6: Responsive Images (Optional but Recommended) 📱
- [ ] Update QuoteForm image paths to use responsive variants
- [ ] Update PortfolioGrid to use responsive srcset
- [ ] Update ReviewsGridWithModal to use responsive srcset
- [ ] Test different viewport sizes (mobile, tablet, desktop)
- [ ] Verify correct image size loads on each breakpoint

## Phase 7: Testing & Validation (End of Week) 🧪
- [ ] Run Pingdom test again: https://decks.stokeleads.com
- [ ] Compare with baseline (current 3.7s score)
- [ ] Check waterfall chart for blocked requests (should be <5)
- [ ] Verify all images are WebP format
- [ ] Check that lazy-loaded images appear only when needed
- [ ] Validate no broken images or missing resources
- [ ] Test on mobile (Chrome mobile emulation)
- [ ] Test on slow 3G network (DevTools throttling)
- [ ] Verify PageSpeed Insights score: https://pagespeed.web.dev/
- [ ] Verify GTmetrix score: https://gtmetrix.com/

## Phase 8: Monitoring (Ongoing) 📊
- [ ] Set up weekly Pingdom tests (automated via email)
- [ ] Monitor Cloudflare Analytics for image serving
- [ ] Track Core Web Vitals in Google Search Console
- [ ] Set up alerts for any regressions in load time
- [ ] Document improvements in team wiki/docs

---

## Success Metrics

### Target Improvements
- [ ] Page load time: < 2.5s (from 3.7s = 32% improvement)
- [ ] Image bytes: < 1 MB total (from 3.5 MB = 71% reduction)
- [ ] Blocking requests: < 5 (from 15)
- [ ] Largest Contentful Paint (LCP): < 2.5s
- [ ] Cumulative Layout Shift (CLS): < 0.1
- [ ] First Input Delay (FID): < 100ms

### Performance Score Targets
- [ ] Pingdom: > 90 score
- [ ] PageSpeed Insights: > 85 (mobile & desktop)
- [ ] GTmetrix: > A grade

---

## Notes & Issues

```
[Use this section to track any blockers or questions]

Example:
- Issue: Image optimization script failing on PNG files
  Status: BLOCKED - waiting for Sharp PNG support
  ETA: 2/25/2026

```

---

## Rollback Plan

If any optimization causes issues:

1. **Images not displaying**: Revert image paths, rebuild, redeploy
2. **Fonts broken**: Re-add font weights to Google Fonts URL
3. **Performance worse**: Disable Cloudflare optimizations temporarily
4. **Caching issues**: Clear CloudFlare cache (Purge Everything)

All changes are easy to revert since we're not modifying build process fundamentally.

