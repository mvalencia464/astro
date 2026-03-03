# Implementation Checklist: React → Astro 6 Conversion

Use this checklist to track your conversion progress and ensure quality.

---

## Pre-Conversion Setup

- [ ] Create backup branch: `git checkout -b react-to-astro-conversion`
- [ ] Review ASTRO_6_CONVERSION_GUIDE.md
- [ ] Review CONVERSION_TEMPLATES.md
- [ ] Set up Lighthouse DevTools for testing
- [ ] Set up mobile device for testing (or use iOS/Android simulator)

---

## Week 1: Quick Wins (Target 8 hours)

### Completed Components
- [x] TestimonialRotator.astro
- [x] TestimonialImageCarousel.astro  
- [x] LeadCaptureModal.astro

### Task 1: FAQSection.tsx → FAQSection.astro (10 min)

**Pre-conversion:**
- [ ] Read current FAQSection.tsx
- [ ] Identify all FAQ items and data
- [ ] Note styling and animations

**Conversion:**
- [ ] Create src/components/FAQSection.astro
- [ ] Copy all FAQ items to frontmatter
- [ ] Use native `<details>` element (no JS needed!)
- [ ] Add Tailwind styling
- [ ] Add `<summary>` styling in CSS

**Testing:**
- [ ] [ ] Click to open/close details (works natively)
- [ ] [ ] Multiple details don't interfere
- [ ] [ ] Keyboard navigation (Tab, Enter)
- [ ] [ ] Mobile responsive
- [ ] [ ] Browser console: no errors
- [ ] [ ] Lighthouse: Score > 90

**File location:** `/src/components/FAQSection.astro`  
**Completed:** ☐ (Date: _____)  
**Time taken:** _____ minutes  
**Notes:** _____________________________

---

### Task 2: Header.tsx → Header.astro (25 min)

**Pre-conversion:**
- [ ] Read current Header.tsx
- [ ] Note all menu items and navigation structure
- [ ] Identify mobile menu toggle behavior
- [ ] Check for any animations

**Conversion:**
- [ ] Create src/components/Header.astro
- [ ] Build desktop menu (always visible)
- [ ] Build mobile menu (hidden by default)
- [ ] Add menu button with click event listener
- [ ] Implement `classList.toggle()` for mobile menu
- [ ] Add keyboard listener for Escape to close menu
- [ ] Copy styling from original Header.tsx

**Testing:**
- [ ] [ ] Desktop menu displays correctly
- [ ] [ ] Mobile menu toggle works
- [ ] [ ] Clicking menu items closes mobile menu
- [ ] [ ] Escape key closes mobile menu
- [ ] [ ] Menu links are correct
- [ ] [ ] Responsive breakpoint at md (768px)
- [ ] [ ] Lighthouse: Score > 90
- [ ] [ ] Mobile device test: Touch works

**File location:** `/src/components/Header.astro`  
**Completed:** ☐ (Date: _____)  
**Time taken:** _____ minutes  
**Notes:** _____________________________

---

### Task 3: StickyMobileCTA.tsx → StickyMobileCTA.astro (15 min)

**Pre-conversion:**
- [ ] Read current StickyMobileCTA.tsx
- [ ] Note scroll behavior and visibility logic
- [ ] Find phone number prop

**Conversion:**
- [ ] Create src/components/StickyMobileCTA.astro
- [ ] Add button with `fixed` positioning
- [ ] Accept phone number as prop
- [ ] Implement IntersectionObserver to toggle visibility
- [ ] Hide on desktop (md:hidden)
- [ ] Add mobile-only breakpoint

**Key Code:**
```astro
<script>
  const cta = document.getElementById('sticky-cta');
  const hero = document.querySelector('main > section:first-child');
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        cta.classList.add('hidden');
      } else {
        cta.classList.remove('hidden');
      }
    });
  });
  
  if (hero) observer.observe(hero);
</script>
```

**Testing:**
- [ ] [ ] CTA visible when hero scrolls out of view
- [ ] [ ] CTA hidden when hero is visible
- [ ] [ ] Phone number is correct
- [ ] [ ] Hidden on desktop
- [ ] [ ] Mobile responsive
- [ ] [ ] Click opens phone dialer
- [ ] [ ] Lighthouse: Score > 90

**File location:** `/src/components/StickyMobileCTA.astro`  
**Completed:** ☐ (Date: _____)  
**Time taken:** _____ minutes  
**Notes:** _____________________________

---

### Task 4: FloatingActionButton.tsx → FloatingActionButton.astro (15 min)

**Pre-conversion:**
- [ ] Read current FloatingActionButton.tsx
- [ ] Note positioning and visibility behavior

**Conversion:**
- [ ] Create src/components/FloatingActionButton.astro
- [ ] Accept props: icon, label, href, onClick
- [ ] Use fixed positioning
- [ ] Add IntersectionObserver for visibility
- [ ] Simple click handler for navigation

**Testing:**
- [ ] [ ] Button visible on page
- [ ] [ ] Visibility toggles based on scroll
- [ ] [ ] Click behavior works
- [ ] [ ] Styled correctly
- [ ] [ ] Mobile responsive
- [ ] [ ] Lighthouse: Score > 90

**File location:** `/src/components/FloatingActionButton.astro`  
**Completed:** ☐ (Date: _____)  
**Time taken:** _____ minutes  
**Notes:** _____________________________

---

### Task 5: TurnstileWidget.tsx → Keep (10 min)

**Status:** Minimal changes needed - third-party library

- [ ] Leave as-is for now OR wrap Turnstile in minimal Astro component
- [ ] Test that Turnstile loads correctly in Astro
- [ ] Verify form submission with CAPTCHA works

**File location:** `/src/components/TurnstileWidget.astro` (if updating)  
**Completed:** ☐ (Date: _____)  
**Notes:** _____________________________

---

### Week 1 Testing & Review (2.5 hours)

**Full Site Testing:**
- [ ] All components render without errors
- [ ] No console warnings
- [ ] All navigation works
- [ ] Mobile menu responsive
- [ ] Sticky CTA appears/disappears correctly
- [ ] FAQ accordion opens/closes
- [ ] Floating buttons functional

**Lighthouse Audit:**
- [ ] Run full audit on each page
- [ ] Target scores:
  - [ ] Performance: > 85
  - [ ] Accessibility: > 90
  - [ ] Best Practices: > 90
  - [ ] SEO: > 90
- [ ] Document baseline scores

**Performance Check:**
- [ ] Network tab: No React bundles loading
- [ ] JS files: Only Astro components
- [ ] Bundle size reduction documented
- [ ] No layout shift (CLS)

**Mobile Testing:**
- [ ] Test on real iOS device
- [ ] Test on real Android device
- [ ] Touch events work
- [ ] Responsive layout correct
- [ ] Form inputs accessible

**Browser Compatibility:**
- [ ] Chrome latest
- [ ] Firefox latest
- [ ] Safari latest
- [ ] Edge latest

**Week 1 Summary:**
- Components converted: _____ / 5
- Lighthouse avg score: _____ (goal: 90+)
- Bundle size reduction: _____ KB
- Issues found: _____________________________
- Completed: ☐ (Date: _____)

---

## Week 2: Core Features (Target 10 hours)

### Task 6: ReviewsGridWithModal.tsx (30 min)

**Pre-conversion:**
- [ ] Read ReviewsGridWithModal.tsx
- [ ] Identify modal trigger and modal content
- [ ] Note review data structure

**Conversion:**
- [ ] Create src/components/ReviewsGridWithModal.astro
- [ ] Build review grid layout
- [ ] Create button for each review to open modal
- [ ] Implement native `<dialog>` element for modal
- [ ] Add image display in modal
- [ ] Handle modal open/close events

**Testing:**
- [ ] [ ] Reviews display in grid
- [ ] [ ] Clicking review opens modal
- [ ] [ ] Modal displays full review with image
- [ ] [ ] Close button works
- [ ] [ ] Escape key closes modal
- [ ] [ ] Clicking backdrop closes modal
- [ ] [ ] Responsive on mobile
- [ ] [ ] Lighthouse: Score > 90

**File location:** `/src/components/ReviewsGridWithModal.astro`  
**Completed:** ☐ (Date: _____)  
**Time taken:** _____ minutes  
**Notes:** _____________________________

---

### Task 7: QuoteForm.tsx (40 min)

**Pre-conversion:**
- [ ] Read QuoteForm.tsx
- [ ] Note all form fields
- [ ] Identify validation rules
- [ ] Check Turnstile integration
- [ ] Note success/error handling

**Conversion:**
- [ ] Create src/components/QuoteForm.astro
- [ ] Build form with all fields
- [ ] Client-side validation with vanilla JS
- [ ] FormData API for submission
- [ ] Turnstile CAPTCHA integration
- [ ] Success/error message display
- [ ] Server-side endpoint for form handling

**Key Code Pattern:**
```astro
<script>
  const form = document.getElementById('quote-form');
  
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    // Validate
    const errors = validate();
    if (Object.keys(errors).length > 0) {
      showErrors(errors);
      return;
    }
    
    // Submit
    const formData = new FormData(form);
    const response = await fetch(form.action, {
      method: 'POST',
      body: formData,
    });
    
    if (response.ok) {
      showSuccess();
      form.reset();
    }
  });
</script>
```

**Testing:**
- [ ] [ ] Form displays all fields
- [ ] [ ] Validation works (required fields)
- [ ] [ ] Error messages show correctly
- [ ] [ ] Turnstile loads
- [ ] [ ] Form submits successfully
- [ ] [ ] Success message displays
- [ ] [ ] Server receives form data
- [ ] [ ] Mobile responsive
- [ ] [ ] Lighthouse: Score > 90

**File location:** `/src/components/QuoteForm.astro`  
**Completed:** ☐ (Date: _____)  
**Time taken:** _____ minutes  
**Notes:** _____________________________

---

### Task 8: TestimonialImageModal.tsx (20 min)

**Pre-conversion:**
- [ ] Read TestimonialImageModal.tsx
- [ ] Note modal trigger behavior
- [ ] Identify image and content structure

**Conversion:**
- [ ] Create src/components/TestimonialImageModal.astro
- [ ] Use native `<dialog>` element
- [ ] Display image in modal
- [ ] Add navigation arrows (if image gallery)
- [ ] Close button and keyboard handling

**Testing:**
- [ ] [ ] Modal opens on trigger
- [ ] [ ] Image displays clearly
- [ ] [ ] Navigation works (if gallery)
- [ ] [ ] Close works (button, escape, backdrop)
- [ ] [ ] Keyboard navigation (Tab, Escape)
- [ ] [ ] Responsive on mobile
- [ ] [ ] Lighthouse: Score > 90

**File location:** `/src/components/TestimonialImageModal.astro`  
**Completed:** ☐ (Date: _____)  
**Time taken:** _____ minutes  
**Notes:** _____________________________

---

### Week 2 Integration Testing (5 hours)

**Full Integration:**
- [ ] All Week 1 components still working
- [ ] All Week 2 components integrated
- [ ] No conflicts between components
- [ ] Forms submit to correct endpoints
- [ ] Modals work across all pages
- [ ] Navigation complete

**Lighthouse Audit:**
- [ ] Full site audit
- [ ] Target scores:
  - [ ] Performance: > 90 (improved from Week 1)
  - [ ] Accessibility: > 90
  - [ ] Best Practices: > 90
  - [ ] SEO: > 90

**Performance Benchmarks:**
- [ ] Page load time < 2s (goal: < 1.5s)
- [ ] Bundle size: < 15KB JS
- [ ] Time to Interactive: < 0.5s
- [ ] Largest Contentful Paint: < 2.5s

**Mobile Testing:**
- [ ] All components on iOS
- [ ] All components on Android
- [ ] Form submission on mobile
- [ ] Modal usability on mobile
- [ ] Touch events responsive

**Week 2 Summary:**
- Components converted: _____ / 8
- Lighthouse performance: _____ (goal: 90+)
- Page load time: _____ ms (goal: < 1500ms)
- JS bundle size: _____ KB (goal: < 15KB)
- Issues found: _____________________________
- Completed: ☐ (Date: _____)

---

## Week 3: Final Components & Cleanup (Target 6 hours)

### Task 9: Static Components Conversion (1.5 hours)

**Components to convert:**
- [ ] LocalReviews.tsx (15 min)
- [ ] ServicePageTemplate.tsx (15 min)
- [ ] ProcessSection.tsx (15 min)
- [ ] FooterTestimonials.tsx (15 min)

**Conversion Checklist (for each):**
- [ ] Create .astro component
- [ ] Copy all HTML/Tailwind styling
- [ ] Remove React imports
- [ ] Update props to Astro.props
- [ ] Test rendering
- [ ] Verify styling

**Completed:** ☐ (Date: _____)

---

### Task 10: Remove React Dependency (1 hour)

**Cleanup:**
- [ ] Remove React integration from `astro.config.mjs`
- [ ] Remove `@astrojs/react` from package.json
- [ ] Run: `npm uninstall @astrojs/react`
- [ ] Run: `npm run build` (verify no errors)
- [ ] Verify all components still render

**Final Check:**
- [ ] No React imports anywhere
- [ ] No React in package.json
- [ ] No React in bundle
- [ ] Build successful

**Completed:** ☐ (Date: _____)

---

### Task 11: Final Testing & Optimization (2 hours)

**Lighthouse Audit:**
- [ ] Full site performance audit
- [ ] Target all scores > 95
- [ ] Fix any remaining issues

**Performance Optimization:**
- [ ] Image optimization (use Image component)
- [ ] Remove unused CSS
- [ ] Minify JavaScript
- [ ] Enable compression

**Accessibility:**
- [ ] Screen reader test
- [ ] Keyboard navigation complete
- [ ] Color contrast verified
- [ ] ARIA labels where needed

**Final Benchmarks:**
- [ ] Lighthouse Performance: 95+ (goal: 98+)
- [ ] Time to Interactive: < 0.5s
- [ ] Page load: < 1.5s on 3G
- [ ] Bundle size: < 12KB JS

**Deployment:**
- [ ] Merge PR to main
- [ ] Deploy to production
- [ ] Monitor errors on Sentry/logs
- [ ] Check analytics for improvements

**Completed:** ☐ (Date: _____)

---

## Final Verification

### Before Going Live
- [ ] All pages load without errors
- [ ] No console warnings or errors
- [ ] All forms work
- [ ] All modals work
- [ ] Navigation complete
- [ ] Mobile tested on real devices
- [ ] Lighthouse scores > 95
- [ ] Bundle size < 15KB
- [ ] No React in package.json or build

### Post-Deployment Monitoring
- [ ] Monitor error rates (should be 0)
- [ ] Check page load times in analytics
- [ ] Monitor bounce rate (should decrease)
- [ ] Check conversion rate (should increase)
- [ ] Track user engagement metrics

---

## Conversion Summary

**Total Time Invested:** _____ hours (goal: 24 hours)

**Performance Improvements:**
- React JS eliminated: 85%
- Page load time: _____ sec → _____ sec
- Lighthouse Performance: _____ → _____ (goal: 95+)
- Bundle size: _____ KB → _____ KB

**Components Converted:**
- Week 1: _____ / 5
- Week 2: _____ / 5
- Week 3: _____ / 4
- **Total: _____ / 14**

**Business Impact:**
- Mobile load time reduction: _____% faster
- Estimated conversion lift: _____% (industry avg: 25%)
- User satisfaction: Improved response time

**Lessons Learned:**
_________________________________________
_________________________________________
_________________________________________

**Next Steps:**
- [ ] Document patterns in team wiki
- [ ] Update dev standards to default to Astro
- [ ] Train team on vanilla JS + Astro patterns
- [ ] Monitor performance in production
- [ ] Plan A/B test to measure conversion impact

---

## Troubleshooting Reference

### "Component doesn't render"
1. Check browser console for errors
2. Verify Astro.props destructuring
3. Check file paths are correct
4. Run `npm run build` for build errors

### "JavaScript not running"
1. Verify script tag has no attributes that might prevent execution
2. Check that element IDs match between HTML and JS
3. Use `console.log` to verify script runs
4. Check for syntax errors in script

### "Styles not applying"
1. Verify Tailwind class names (no typos)
2. Check `<style>` tags (should be scoped automatically)
3. Verify no conflicting global CSS
4. Check cascade/specificity issues

### "Touch events not firing on iOS"
1. Add `touch-action: manipulation` to element
2. Use `addEventListener` (not inline `ontouchstart`)
3. Test with actual device (simulator can be unreliable)

### "Lighthouse score lower"
1. Check for new console errors
2. Look for layout shift (missing dimensions)
3. Verify images have width/height
4. Profile with DevTools Performance tab

---

## Resources

- **ASTRO_6_CONVERSION_GUIDE.md** - Deep dive on patterns
- **CONVERSION_TEMPLATES.md** - Copy/paste code
- **PRIORITY_CONVERSION_LIST.md** - Detailed component info
- **MDN Web Docs** - JavaScript reference
- **Astro Docs** - astro.build/docs
- **DevTools** - Chrome/Firefox built-in debugging

---

## Final Goal

By the end of Week 3, your deck business website will be:

✅ **85% faster** on mobile  
✅ **98+ Lighthouse score**  
✅ **100% Astro** (zero React)  
✅ **Production ready**  
✅ **Optimized for conversions**  

You've got this! 🚀
