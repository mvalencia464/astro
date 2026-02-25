# Quick Deployment Guide

## Pre-Deployment Checks (5 minutes)

```bash
# 1. Test locally
npm run dev
# → Visit http://localhost:3000
# → Verify all images load correctly
# → Check hero image loads fast
# → Scroll through portfolio - images should lazy load

# 2. Test on mobile
# → Open DevTools (F12)
# → Switch to device view (mobile)
# → Verify layout looks good
# → Verify fonts display correctly

# 3. Build for production
npm run build
# Should complete without errors
# Check console for any warnings

# 4. Verify build output
ls -lh dist/_astro/ | grep -E "\.webp|\.js|\.css"
# Should show reasonably sized files
```

## Deploy to Cloudflare Workers

```bash
# 1. Deploy with Wrangler
wrangler deploy --env production

# Expected output:
# ✓ Uploaded 2 files
# ✓ Deployed to https://decks.stokeleads.com/
```

## Post-Deployment (Immediate)

1. **Visit your site**: https://decks.stokeleads.com
   - [ ] Page loads quickly
   - [ ] All images visible
   - [ ] No console errors
   - [ ] Forms work (QuoteForm, contact)

2. **Run Pingdom test**: https://tools.pingdom.com/
   - [ ] Click "Start test"
   - [ ] Enter: https://decks.stokeleads.com
   - [ ] Run test from New York location
   - [ ] Compare with previous 3.7s score

3. **Check Core Web Vitals**: https://pagespeed.web.dev/
   - [ ] Enter: https://decks.stokeleads.com
   - [ ] Check mobile & desktop scores
   - [ ] LCP should be <2.5s
   - [ ] CLS should be <0.1

## Cloudflare Optimizations (Do This Now!)

### Enable Speed Optimizations

1. **Go to Cloudflare Dashboard**
   - Domain: decks.stokeleads.com
   - Tab: Speed > Optimization

2. **Enable these toggles**:
   - [ ] Polish: "Lossless" (auto compress images)
   - [ ] Rocket Loader: On (async JavaScript)
   - [ ] Mirage: On (lazy load images)
   - [ ] Mobile Image Optimization: On

### Create Cache Rules

**In Cloudflare Dashboard:**
Tab: Caching > Rules

**Rule 1: Images (1 year cache)**
- Expression: `(cf.file_extension in {"webp" "jpg" "jpeg" "png" "gif" "avif" "woff2" "woff" "ttf"})`
- Cache TTL: 1 year

**Rule 2: Static Assets (30 days)**
- Expression: `(cf.file_extension in {"js" "css"})`
- Cache TTL: 30 days

**Rule 3: HTML (No cache)**
- Expression: `(cf.file_extension eq "html")`
- Browser Cache TTL: 0 (Off)

### Enable HTTPS Redirect

Tab: Rules > Page Rules

**Add Rule:**
- URL: `http://decks.stokeleads.com/*`
- Always Use HTTPS: On

## Monitoring (First 24 Hours)

### Check every hour for first 4 hours:

```bash
# Quick health check
curl -I https://decks.stokeleads.com/
# Should show:
# HTTP/2 200
# Cache-Control: (varies)
# CF-Cache-Status: HIT (for images)

# Check JavaScript errors
# Open browser DevTools (F12)
# Go to Console tab
# Should be clean or minimal warnings
```

### In Cloudflare Dashboard:

- Analytics tab - Check traffic looks normal
- Performance tab - Check cache hit rate
- Security tab - Check for any blocks

## Expected Results

### Before Deployment
- Load time: ~3.7 seconds
- Image size: ~41 MB
- Blocking requests: ~15
- Pingdom score: ~60-70

### After Deployment (48 hours)
- Load time: ~2.0-2.3 seconds (-45%)
- Image size: ~11.6 MB (-72%)
- Blocking requests: <5
- Pingdom score: ~85-90
- Google PageSpeed: ~80-85 (mobile), ~90+ (desktop)

## Troubleshooting

### Images not loading
- [ ] Check browser Network tab (DevTools)
- [ ] Verify image paths in dist/_astro/
- [ ] Clear browser cache: Ctrl+Shift+Del
- [ ] Hard refresh: Ctrl+Shift+R

### Fonts look wrong
- [ ] Check Network tab for Google Fonts requests
- [ ] Should see Inter, Oswald, Caveat font files
- [ ] Allow ~2 seconds for fonts to load
- [ ] Check that `display=swap` is working

### Slow performance still
- [ ] Check Cloudflare cache status: Network > Response headers > CF-Cache-Status
- [ ] Should see "HIT" for images/assets
- [ ] If "MISS", cache rules may not be working
- [ ] Clear Cloudflare cache: Dashboard > Purge Cache > Purge Everything

### Rollback if needed
```bash
# Restore previous deployment
wrangler rollback

# Or manually restore from git
git revert HEAD
npm run build
wrangler deploy
```

## Success Criteria

Your deployment is successful when:

- ✅ Site loads in <2.5 seconds
- ✅ All images display correctly
- ✅ No console errors
- ✅ Forms submit successfully
- ✅ Mobile layout works
- ✅ Pingdom score > 85
- ✅ Google PageSpeed > 80 (mobile)
- ✅ Cache status shows "HIT" for assets

---

## Quick Commands Reference

```bash
# Local development
npm run dev

# Build for production
npm run build

# Deploy to Cloudflare
wrangler deploy

# Deploy to staging first (if configured)
wrangler deploy --env staging

# View logs
wrangler tail

# Check wrangler config
wrangler publish --dry-run

# Clear Cloudflare cache (via dashboard, not CLI)
# Dashboard > Caching > Purge Cache > Purge Everything
```

---

**Need help?** Check PERFORMANCE_IMPROVEMENTS_SUMMARY.md for detailed information.

