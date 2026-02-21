# Deck Masters - Astro 6.0 Beta Migration Guide

## Quick Start

This is a starter package extracted from your Vite project for Astro 6.0 Beta. It includes:
- Astro 6.0 beta configuration
- React components (existing ones from your Vite project)
- Tailwind CSS 4.0 setup
- Base layout with Google Fonts, GA4, Turnstile
- All utilities, types, constants, and data files

## Installation Steps

### 1. Extract Files
Extract this folder into your Astro project's `src/` directory (or the root, depending on your setup).

### 2. Install Dependencies
```bash
npm install
```

### 3. Environment Variables
Copy `.env.example` to `.env.local` and add your keys:
```bash
VITE_GOOGLE_MAPS_API_KEY=your_key_here
VITE_TURNSTILE_SITE_KEY=your_key_here
```

### 4. Copy Image Assets
Extract the `deckmasters-assets-optimized.zip` and drag the `assets/` folder into `src/assets/`.

Directory structure should look like:
```
src/
├── assets/
│   ├── hero/
│   ├── portfolio/
│   ├── process/
│   ├── content/
│   ├── branding/
│   └── hero-video/
├── components/
├── pages/
├── layouts/
└── ...
```

### 5. Start Development
```bash
npm run dev
```

## ⚠️ Astro 6.0 Beta Note

This starter is configured for Astro 6.0 beta. Be aware:
- APIs may change before final release
- Some breaking changes possible
- Check [Astro 6.0 Release Notes](https://docs.astro.build) for updates
- For stability, consider Astro 4.0 LTS

## Key Differences from Vite → Astro

### File-Based Routing
- **Vite**: Hash-based routing (`#/`, `#/products`)
- **Astro**: File-based routing (`/`, `/products`)

Create pages in `src/pages/`:
```
src/pages/
├── index.astro (homepage)
├── products.astro
├── privacy.astro
├── terms.astro
└── services/
    └── [service].astro (dynamic routes)
```

### Images
- **Vite**: Direct public path references
- **Astro**: Use `<Image />` component from `astro:assets`

```astro
---
import { Image } from 'astro:assets';
import heroImg from '../assets/hero/002-aerial-overview.webp';
---

<Image src={heroImg} alt="Hero" />
```

### React Components
Your existing React components work as-is. Use the `client:load` directive for interactivity:

```astro
---
import QuoteForm from '../components/QuoteForm';
---

<QuoteForm client:load />
```

### Styling
- **Vite**: Tailwind via `@tailwindcss/vite`
- **Astro**: Tailwind via `@astrojs/tailwind`

Tailwind configuration is in `tailwind.config.mjs`.

## Component Conversion Checklist

These components need conversion from React → Astro `.astro` files:

- [ ] HomePage
- [ ] Navigation/Header
- [ ] Footer
- [ ] Layout wrapper

**Components that stay React (interactive):**
- QuoteForm (client:load)
- TestimonialRotator (client:load)
- ReviewsGridWithModal (client:load)
- MobileMenu (client:load)
- PortfolioGrid (client:load)
- ProcessSection (client:load)

## Migration Path

1. **Phase 1**: Get structure working (this package)
2. **Phase 2**: Convert page-level components to Astro
3. **Phase 3**: Verify styling & responsiveness
4. **Phase 4**: Test forms (QuoteForm, Turnstile)
5. **Phase 5**: Analytics & performance

## Troubleshooting

### Images not loading
- Ensure `src/assets/` folder structure matches the guide above
- Use `<Image />` component from `astro:assets`, not `<img />`

### React components not working
- Add `client:load` directive: `<QuoteForm client:load />`
- Check console for hydration errors

### Tailwind not applying
- Run `npm install`
- Verify paths in `tailwind.config.mjs`
- Restart dev server

### Form submission failing
- Check environment variables are set correctly
- Verify Turnstile token in network tab
- Check Netlify function logs

## Build & Deploy

### Local Build
```bash
npm run build
```

### Netlify Deployment
The `netlify.toml` should include:
```toml
[build]
  command = "npm run build"
  publish = "dist"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

### Environment Variables on Netlify
Add to Site Settings → Environment:
- `VITE_GOOGLE_MAPS_API_KEY`
- `VITE_TURNSTILE_SITE_KEY`

## Questions?

Refer to:
- [Astro Docs](https://docs.astro.build)
- [Tailwind CSS](https://tailwindcss.com)
- Original ASTRO_EXPORT.md for full project specs

---

**Updated:** February 21, 2026
