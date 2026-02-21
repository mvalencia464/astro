# Deck Masters - Astro 6.0 Beta Starter

Complete migration starter from Vite → Astro 6.0 Beta

## What's Included

✅ **Astro 6.0 Configuration**
- astro.config.mjs (6.0 beta syntax)
- tailwind.config.mjs (Tailwind 4.0)
- tsconfig.json
- Base layout with presets

✅ **React Components** (from Vite)
- All interactive components (QuoteForm, PortfolioGrid, etc.)
- All utilities (validation, analytics, etc.)
- All data files (testimonials, portfolio, etc.)
- Type definitions and constants

✅ **Styling**
- Tailwind CSS 4.0+
- Custom animations (slow-zoom, fade-in-up)
- Google Fonts integration (Inter, Oswald, Caveat)
- Dark theme (stone-950 primary)

✅ **SEO & Analytics**
- Google Analytics 4 (GA4)
- Google Tag Manager (GTM)
- Cloudflare Turnstile CAPTCHA
- Meta tags template

✅ **Example Page**
- index.astro (homepage template)
- Shows how to use Image component
- Demonstrates client:load directive

## Quick Setup

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Add environment variables** (`.env.local`)
   ```
   VITE_GOOGLE_MAPS_API_KEY=xxx
   VITE_TURNSTILE_SITE_KEY=xxx
   ```

3. **Copy image assets**
   Extract `deckmasters-assets-optimized.zip` → `src/assets/`

4. **Start dev server**
   ```bash
   npm run dev
   ```

## Key Files to Review

1. **ASTRO_SETUP_GUIDE.md** - Full migration checklist
2. **src/layouts/BaseLayout.astro** - Main layout with head
3. **src/pages/index.astro** - Homepage example
4. **astro.config.mjs** - Build configuration
5. **tailwind.config.mjs** - Tailwind theme

## Components Needing Conversion

These React components should be converted to Astro pages:
- HomePage → src/pages/index.astro (started)
- ProductsPage → src/pages/products.astro
- PrivacyPage → src/pages/privacy.astro
- TermsPage → src/pages/terms.astro
- ServicePageTemplate → src/pages/services/[service].astro

**Interactive components stay as React:**
- QuoteForm
- TestimonialRotator
- PortfolioGrid
- etc.

Use `client:load` directive for interactivity.

## Image Assets

Two ZIP files provided:

1. **deckmasters-assets-optimized.zip** (38 MB)
   - All image assets (main versions only)
   - Ready to extract into `src/assets/`
   - No size variants (-320, -640, -1024)
   - Astro handles responsive optimization

2. **deckmasters-astro-starter.zip** (this)
   - All code, config, components
   - Ready to drag into Astro project

## Next Steps

1. Extract assets zip → `src/assets/`
2. Review ASTRO_SETUP_GUIDE.md
3. Start `npm run dev`
4. Check index.astro (homepage)
5. Convert remaining pages
6. Test forms and submissions
7. Deploy to Netlify

## Troubleshooting

**Images not loading?**
- Check `src/assets/` structure
- Use `<Image />` from `astro:assets`

**React components not interactive?**
- Add `client:load` directive
- Check browser console for hydration errors

**Tailwind not working?**
- Run `npm install`
- Restart dev server

## Resources

- [Astro Docs](https://docs.astro.build)
- [Tailwind CSS](https://tailwindcss.com)
- Original project: `ASTRO_EXPORT.md`

---

Built for Deck Masters - Anchorage Premium Decks
