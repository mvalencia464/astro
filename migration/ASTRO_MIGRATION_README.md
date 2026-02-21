# Deck Masters - Astro 6.0 Beta Migration Package

Everything you need to rebuild your homepage in Astro 6.0 Beta with the exact look from your Vite project.

**Note:** This is configured for Astro 6.0 beta. APIs may change before final release.

## 📦 What You Have

Two ZIP files in your Downloads folder:

### 1. **deckmasters-astro-starter.zip** (207 KB)
Complete Astro 6.0 Beta starter package with:
- ✅ Astro 6.0 beta configuration (astro.config.mjs, tailwind.config.mjs)
- ✅ React components (QuoteForm, PortfolioGrid, TestimonialRotator, etc.)
- ✅ All utilities (validation, analytics, form submission)
- ✅ All data files (testimonials, portfolio info, FAQs)
- ✅ Type definitions and constants
- ✅ Base layout with GA4, Turnstile, Google Fonts
- ✅ Example homepage (src/pages/index.astro)
- ✅ Setup guide & documentation

### 2. **deckmasters-assets-optimized.zip** (38 MB)
Image assets folder with:
- ✅ 66 main image files (no size variants)
- ✅ Organized by category: hero, portfolio, process, content, branding, hero-video
- ✅ Ready to extract into `src/assets/`
- ✅ Astro will auto-generate responsive variants at build time

## 🚀 Quick Start

### Step 1: Create New Astro 6.0 Beta Project
```bash
npm create astro@latest --version 6.0.0-beta.0 deckmasters-astro
cd deckmasters-astro
```

Or if you already started with 6.0 beta, skip this step.

### Step 2: Extract Starter Files
- Extract `deckmasters-astro-starter.zip`
- Copy all files into your new Astro project root

### Step 3: Extract Image Assets
- Extract `deckmasters-assets-optimized.zip`
- Drag the `assets/` folder into `src/`

Final structure should look like:
```
deckmasters-astro/
├── src/
│   ├── assets/
│   │   ├── hero/
│   │   ├── portfolio/
│   │   ├── process/
│   │   ├── content/
│   │   ├── branding/
│   │   └── hero-video/
│   ├── components/      (from starter zip)
│   ├── pages/          (from starter zip)
│   ├── layouts/        (from starter zip)
│   ├── utils/
│   ├── data/
│   └── ...
├── astro.config.mjs    (from starter zip)
├── tailwind.config.mjs  (from starter zip)
├── package.json        (from starter zip)
└── ...
```

### Step 4: Install & Run
```bash
npm install
npm run dev
```

### Step 5: Environment Variables
Create `.env.local`:
```
VITE_GOOGLE_MAPS_API_KEY=your_key
VITE_TURNSTILE_SITE_KEY=your_key
```

That's it. You should see your homepage running at http://localhost:3000

## 📋 What's Included

### Ready to Use:
- ✅ Homepage layout (`src/pages/index.astro`)
- ✅ Base layout with all metadata/fonts/scripts
- ✅ All React components (interactive)
- ✅ All styling (Tailwind with custom animations)
- ✅ All utilities and data
- ✅ Analytics setup (GA4, GTM)
- ✅ Form validation (Turnstile, email, phone)

### Still Need to Build:
- ⚠️ Header/Navigation (will create as Astro component)
- ⚠️ Footer (will create as Astro component)
- ⚠️ Additional pages (products, privacy, terms, services)
- ⚠️ Netlify functions (for form submission)

## 🔄 Migration Notes

### Key Differences from Vite

| Aspect | Vite | Astro |
|--------|------|-------|
| Routing | Hash-based (#/) | File-based (/) |
| Images | Direct public path | `<Image />` component |
| Components | React everywhere | Astro + React mix |
| Styling | Tailwind via plugin | Tailwind integration |
| Built-in | Manual optimization | Auto-optimized images |

### Component Structure

**Astro Components** (.astro files):
- Page layouts
- Static sections
- Navigation, footer
- Anything non-interactive

**React Components** (.tsx files):
- Forms (QuoteForm)
- Interactive galleries (PortfolioGrid)
- Modals (ReviewsGridWithModal)
- Carousels (TestimonialRotator)

Mark React components with `client:load`:
```astro
<QuoteForm client:load />
```

## 📚 Documentation

Inside the starter zip:

1. **ASTRO_SETUP_GUIDE.md** - Full migration checklist
2. **README.md** - Project overview
3. **src/pages/index.astro** - Homepage template showing patterns

Also available in current project:
- **ASTRO_EXPORT.md** - Full specifications
- **ASTRO_IMAGE_MIGRATION.md** - Image asset guide

## ✅ Testing Checklist

After setup:
- [ ] Dev server starts (`npm run dev`)
- [ ] Homepage loads at http://localhost:3000
- [ ] Hero image displays
- [ ] Forms render (QuoteForm visible on desktop)
- [ ] Mobile menu works
- [ ] Testimonial rotator cycles through quotes
- [ ] Portfolio grid loads images
- [ ] Tailwind styling applies (dark theme)

## 🚢 Deployment

Once ready, deploy to Netlify:

```bash
npm run build
# Outputs to dist/
```

Add environment variables in Netlify dashboard:
- `VITE_GOOGLE_MAPS_API_KEY`
- `VITE_TURNSTILE_SITE_KEY`

## 🆘 Troubleshooting

**Images not showing?**
- Verify `src/assets/` folder structure
- Use `<Image />` from `astro:assets`, not `<img />`

**React components not interactive?**
- Add `client:load` directive
- Check browser console for hydration errors

**Tailwind not applying?**
- Run `npm install` again
- Restart dev server (`npm run dev`)

**Build failing?**
- Check Node version (need 18+)
- Clear `node_modules` and reinstall
- Check for TypeScript errors: `npm run astro check`

## 📞 Next Steps

1. Extract both ZIPs into your new Astro project
2. Run `npm install && npm run dev`
3. See your homepage render
4. Review `ASTRO_SETUP_GUIDE.md` for remaining tasks
5. Create Header and Footer components
6. Convert additional pages
7. Test form submissions
8. Deploy!

---

**Everything extracted from your current Vite project.**
**Ready to use as-is with Astro 4.0.**
**All assets optimized and organized.**

Good luck with the migration! 🚀
