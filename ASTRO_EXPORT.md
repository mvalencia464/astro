# DECK MASTERS - VITE TO ASTRO EXPORT

## SEO METADATA

**Page Title:** DECK MASTERS | Anchorage Premium Decks

**Meta Description:** Expert deck builders in Anchorage serving South Anchorage, Hillside & Eagle River. Custom composite & cedar decks engineered for Alaska winters. 25-year warranty. Free quotes.

**Analytics Tracking:**
- Google Tag Manager ID: GTM-MCHFDGFK
- Google Analytics 4 ID: G-RD2XZW9K8V
- Cloudflare Turnstile (security verification)

**Fonts (Google Fonts):**
- Inter: wght@300;400;500;600 (body/UI)
- Oswald: wght@400;500;700 (headings, display)
- Caveat: wght@400;700 (handwriting/decorative)

---

## HTML STRUCTURE / SEMANTIC MARKUP

### Header Navigation
```
<nav> (fixed, top-0)
  - Logo + Brand Name (Deck Masters)
  - Desktop Menu (hidden on mobile)
    - Services dropdown (2-column grid)
    - Work (anchor scroll to #portfolio)
    - Process (anchor scroll to #process)
    - Reviews (anchor scroll to #reviews)
  - Phone CTA button: (907) 891-8283 (hidden on mobile)
  - Mobile menu toggle (visible on mobile)
```

### Hero Section
```
<header> (min-h-screen, pt-24 pb-48 on mobile, pt-0 pb-0 on desktop)
  - Background image with overlay (002-aerial-overview.webp)
  - H1: "Turn Your Backyard Into A Resort."
  - Subheading accent: "#1 Rated Deck Builder"
  - Testimonial rotator (rotating customer quotes)
  - Description paragraph
  - Desktop: Embedded quote form
  - Mobile: "Book Consultation" button
  - Hero footer bar:
    - #1 Rated in Anchorage
    - 25 Year Structural Warranty
    - Master Craftsmen Certified
  - Sticky mobile call button (bottom): "Call 907.891.8283"
```

### Portfolio Grid
```
<section id="portfolio">
  - 41+ high-quality deck project images
  - Responsive grid layout
  - Clickable to modal/detail view
  - Images use responsive variants (320px, 640px, 1024px, 1440px)
```

### Reviews Section
```
<section id="reviews" (py-32, bg-stone-950)
  - Section heading: "What Anchorage Is Saying."
  - 4.9 star rating with (122 Google Reviews)
  - Grid of testimonial cards with images
  - Link to full Google Reviews
  - CTA: "Leave Us a Review on Google"
```

### Process Section
```
<section id="process">
  - 4-step process visualization
  - Includes imagery for each step
```

### Footer / CTA
```
<footer> (bg-stone-950, pt-32 pb-12)
  - Left column:
    - H2: "Ready to Build?"
    - Description
    - Contact info (phone, email, address, hours)
    - Embedded Google Map with 4.9 rating badge
  - Right column:
    - Quote form
    - Footer testimonials rotator
  - SEO Sitemap & neighborhood keywords
  - Bottom footer nav:
    - Logo + Brand name
    - Links: Site Info, Alaska Service Area, Deck Building, Now Hiring
    - Social links: Instagram, Facebook, Twitter
```

---

## PAGE COPY / TEXT CONTENT

### Hero
- **Main Headline:** "Turn Your Backyard Into A Resort."
- **Subheading:** "#1 Rated Deck Builder"
- **Description:** "Skip the contractor nightmares. Weekly check-ins, transparent pricing, and frost-proof engineering designed for Alaska's climate. Build your 21-day legacy today."
- **Social Proof:** "4.9, 122 Google Reviews"

### Services (Dropdown)
1. **Composite Decking** - "Low maintenance, high durability premium composite solutions from Trex and TimberTech."
2. **Hardwood Crafts** - "Exotic Ipe, Tigerwood, and Cedar decks for those who appreciate natural beauty and aging."
3. **Outdoor Living** - "Complete outdoor kitchens, fire pits, and pergolas to extend your living space."

### Reviews Section
- **Heading:** "What Anchorage Is Saying."
- **Rating Display:** 4.9 Average · 122 Google Reviews
- **CTA:** "See All Google Reviews" → Google Maps link

### Footer
- **Heading:** "Ready to Build?"
- **Description:** "Schedule your complimentary design consultation today. Let's discuss how to elevate your property value and lifestyle."
- **Contact Display:**
  - Phone: (907) 782-4043
  - Email: CONTACT@DECKMASTERSAK.COM
  - Address: 625 W 59TH AVE UNIT J, ANCHORAGE, AK 99518
  - Hours: 7:30 AM - 7:00 PM, SUN - SAT

---

## STYLING / CSS

### Color Scheme
- **Primary Dark:** stone-950 (#0c0a09)
- **Secondary Dark:** stone-900 (#1c1917)
- **Accent:** orange-600 (#ea580c)
- **Text Light:** stone-100 (#f5f5f4)
- **Text Medium:** stone-400 (#a8a29e)
- **Borders:** stone-800 (#292422)

### Typography
- **Body:** Inter (regular, medium, semibold weights)
- **Headings (H1-H6):** Oswald (display font)
- **Decorative/Handwriting:** Caveat

### Breakpoints (Tailwind)
- Mobile: default (0px)
- `sm:` 640px
- `md:` 768px
- `lg:` 1024px
- `xl:` 1280px

### Key CSS Classes
```css
.font-display { font-family: 'Oswald'; }
.font-handwriting { font-family: 'Caveat'; }
.no-scrollbar { scrollbar-width: none; }

/* Animations */
.animate-slow-zoom (scale-105 with subtle animation)
.animate-fade-in-up (entrance animation)
.delay-100, .delay-200, .delay-300, .delay-700 (staggered)
.animate-spin (loading spinner)
```

### Responsive Design
- **Mobile-first approach**
- Navigation: hidden on mobile, visible on md breakpoint
- Hero: full screen height, form inline on desktop
- Quote form: mobile (overlay modal) → desktop (right sidebar)
- Sticky mobile call button (fixed bottom)
- Grid layouts responsive (1 col mobile → 2 cols tablet → multi desktop)

---

## IMAGES & ASSETS

### Hero Background
- **Filename:** `002-aerial-overview.webp`
- **Alt Text:** "Modern Deck in Anchorage"
- **Responsive Sizes:** 320px, 640px, 1024px, 1440px
- **Effects:** Grayscale disabled, slight zoom animation, 50% opacity overlay

### Logo
- **Filename:** `icon.webp`
- **Display Size:** 12x12 (nav), 8x8 (footer)
- **Alt Text:** "Deck Masters" / "Logo"

### Portfolio Grid
- **Count:** 41+ project images
- **Naming Pattern:** `001-aerial-wraparound`, `002-aerial-overview`, etc.
- **Responsive Variants:** Each image has -320, -640, -1024, -1440 size variants
- **Format:** WebP (modern format for performance)
- **Categories:**
  - Aerial views (drone footage)
  - Contemporary designs
  - Custom installations
  - Lighting details
  - Bonus project shots

### Service Images
- `hardwood-crafts.webp` - Hardwood material showcase
- `glen-alps-entertainer.webp` - Outdoor living example
- `frost-heave-engineering.webp` - Technical detail
- `common-failures-*.webp` - Educational images
- `materials-comparison.webp` - Product comparison
- `multi-level-design-*.webp` - Design showcase
- `railing-options-*.webp` - Customization options
- `cedar-decking-*.webp` - Material example
- `fire-pit-fuel.webp` - Outdoor living detail

### Process Section Images
- `consultation-*.webp` - Initial consultation
- `deck-demolition-crew.webp` - Demo phase
- `moa-inspection-permit.webp` - Permitting
- `deck-installation-thumbnail*.webp` - Installation
- `24-hour-replacement-promise.webp` - Quality guarantee

### Video Asset
- `drone-wraparound.mp4` - Drone video of project

### Icons (Lucide React)
- Menu / X (mobile nav toggle)
- ArrowRight (CTAs)
- Phone (contact)
- Star (ratings, social proof)
- Shield (warranty guarantee)
- Hammer (craftsmanship)
- MapPin (location)
- Mail (email)
- Clock (hours)
- CheckCircle (form success)
- AlertCircle (errors)
- ChevronDown (dropdowns)
- Instagram, Facebook, Twitter (social)

---

## LINKS & NAVIGATION

### Internal Links
- **Home:** `#/` or `/`
- **Products:** `#/products`
- **Privacy:** `#/privacy`
- **Terms:** `#/terms`
- **Services (Layer 2 pages):**
  - Composite Decking
  - Hardwood Crafts
  - Outdoor Living
  - Plus 30+ additional service pages

### External Links
- **Phone:** `tel:+19078918283`
- **Google Maps:** Embedded iframe + link to reviews
- **Social Media:** Instagram, Facebook, Twitter (currently placeholder `#` links)
- **Google Maps Review Link:** `https://www.google.com/maps/search/Deck+Masters+AK+Anchorage+reviews`

### Anchor Scroll Destinations
- `#portfolio` - Portfolio grid section
- `#process` - Process section
- `#reviews` - Reviews section

---

## INTERACTIVE ELEMENTS & JAVASCRIPT BEHAVIOR

### Mobile Menu
- Toggle button opens/closes navigation
- Prevents body scroll when open
- Auto-closes on route change
- Includes all service pages + quote form button

### Quote Form (Modal + Footer)
- **Fields:**
  - Full Name (required)
  - Phone (required, formatted to (XXX) XXX-XXXX)
  - Email (required, validated)
  - Property Address (required, with Google Places autocomplete)
  - Terms & Privacy consent (required)
  - Marketing consent (required)
  - Turnstile CAPTCHA verification (required)
  
- **Validation:**
  - Real-time error clearing
  - Field-level error messages
  - Phone formatting
  - Address autocomplete (restricts to US)

- **On Submit:**
  - Validates all fields
  - Checks Turnstile token
  - Submits lead data to backend
  - Shows success state: "Inquiry Received!"
  - Analytics tracking
  - Form reset after success

- **Error Handling:**
  - Server error display
  - Validation error messages
  - Submission retry capability

### Scroll Behaviors
- Navigation bar changes on scroll (adds background, border after 50px)
- Smooth scroll animations
- Fixed mobile call button (always visible at bottom)

### Testimonial Rotator
- Auto-rotating customer testimonials
- Used in hero and footer sections
- Displays customer quote + name

### Reviews Grid with Modal
- Image gallery of customer testimonials
- Click to open modal/detail view
- Image carousel in detail view
- Back to list functionality

### Form Submission Flow
1. User fills quote form
2. Completes Turnstile CAPTCHA
3. Submit triggers validation
4. Data sanitized (XSS prevention)
5. Lead data sent to backend with Turnstile token
6. Success: Show confirmation message
7. Form resets for another submission

### Analytics Events
- Page view tracking
- Quote form submission
- Lead capture events
- Form data collection (name, email, phone, address)

### Animations
- Fade-in-up on component mount
- Staggered delays (100ms, 200ms, 300ms, 700ms)
- Slow zoom on hero background
- Hover effects on buttons (color shift, arrow movement)
- Loading spinner (form submit state)

---

## COMPONENT STRUCTURE / ORGANIZATION

```
HomePage
├── Hero Section
│   ├── Background Image (ResponsiveImage)
│   ├── Content (H1, testimonial, description)
│   ├── QuoteForm (desktop only)
│   ├── Hero footer bar
│   └── Sticky mobile call button
├── PortfolioGrid
│   └── 41+ project images
├── Reviews Section
│   ├── ReviewsGridWithModal
│   └── Google Maps link CTA
└── ProcessSection

App (Root)
├── Navigation (fixed header)
│   ├── Logo
│   ├── Desktop menu (with Services dropdown)
│   └── CTA button (phone)
├── MobileMenu (overlay)
│   ├── Services list
│   ├── Other links
│   └── Quote form button
├── Main Router
│   ├── HomePage (default)
│   ├── ProductsPage (lazy)
│   ├── PrivacyPage (lazy)
│   ├── TermsPage (lazy)
│   └── ServicePageTemplate (dynamic)
├── LeadCaptureModal (quote form)
└── Footer
    ├── CTA section
    ├── QuoteForm
    ├── FooterTestimonials
    ├── SeoSitemap
    └── Footer navigation + socials
```

---

## PERFORMANCE NOTES

### Image Optimization
- All images in WebP format (modern, compressed)
- Responsive image variants (320px, 640px, 1024px, 1440px)
- Preload hero image variants
- Lazy loading on Google Maps iframe

### Font Loading Strategy
- Preconnect to Google Fonts
- Preload font stylesheet
- Fallback link with media="print"
- Noscript fallback

### Code Splitting
- Lazy load ProductsPage, PrivacyPage, TermsPage
- Loading fallback component during route transitions
- Only loads component when navigated to

### Bundle Size Considerations
- React 19.2.0
- Lucide React icons (tree-shakeable)
- Tailwind CSS 4.2.0
- No external UI library (custom components)

### Known Bottlenecks
- Google Maps Places API load time (lazy loaded on form mount)
- Turnstile CAPTCHA load
- Large image portfolio (41+ images) - mitigated by WebP + responsive variants
- Analytics scripts (GTM, GA4) - async/defer loaded

### Recommended Lighthouse Optimizations
- Minimize Cumulative Layout Shift (CLS)
- Reduce Largest Contentful Paint (LCP) via image preloads
- Minimize JavaScript execution time (code splitting helps)
- Add caching headers for static assets
- Consider image lazy loading for below-fold portfolio items

---

## FORM VALIDATION & ERROR HANDLING

### SimpleFormData Structure
```javascript
{
  name: string,
  email: string,
  phone: string,
  address: string,
  consent: boolean,
  marketingConsent: boolean
}
```

### Validation Rules
- **Name:** Required, non-empty
- **Email:** Required, valid email format
- **Phone:** Required, valid US phone format
- **Address:** Required, autocomplete from Google Places
- **Consent:** Required checkbox
- **Marketing Consent:** Required checkbox
- **Turnstile:** Required token

### Sanitization
- XSS prevention (sanitizeSimpleFormData utility)
- Phone number formatting to (XXX) XXX-XXXX
- Trim whitespace

### Error Messages (Real-time)
- Display on blur/change
- Clear when field is corrected
- Display above submit button for submission errors

---

## SEO & STRUCTURED DATA

### Sitemap Section (SeoSitemap Component)
- Neighborhood links (South Anchorage, Hillside, Eagle River, etc.)
- Service category links
- Internal page links

### Meta Information
- Canonical URL handling
- Open Graph tags (implied via framework)
- Twitter Card tags (implied via framework)
- Schema.org LocalBusiness markup (recommended for Astro)

### Keywords Coverage
- Anchorage deck builder
- Composite & cedar decks
- Alaska winters engineering
- South Anchorage, Hillside, Eagle River service areas
- Custom deck design
- 25-year warranty
- Free quotes/consultation

---

## MIGRATION NOTES FOR ASTRO

1. **Replace React Components** with Astro `.astro` components or `.tsx` if using JSX
2. **Navigation** → Use Astro routing (file-based) instead of hash-based routing
3. **Lazy Loading** → Use Astro's dynamic imports and `<Fragment>`
4. **Forms** → Can remain React component or rebuild with HTML + Astro
5. **Images** → Use Astro's `<Image />` component for optimization
6. **Fonts** → Load via `<link>` in Astro layout head
7. **Analytics** → Inject GTM/GA4 scripts in layout head
8. **Scroll Animations** → May need to refactor for SSR compatibility

---

## ENVIRONMENTAL VARIABLES

```
VITE_GOOGLE_MAPS_API_KEY=<api_key>
VITE_TURNSTILE_SITE_KEY=<site_key>
```

---

## DEPLOYMENT

- **Netlify Functions** integration for lead submission
- **Netlify CLI** available in dev dependencies
- Support for Netlify redirects (netlify.toml)

---

Last Updated: February 21, 2026
