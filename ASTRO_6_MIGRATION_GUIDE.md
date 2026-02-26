# Astro 6 Beta Migration & Troubleshooting Guide

This document captures the specific steps, fixes, and potential future pitfalls related to upgrading this project to Astro 6.0 Beta and Vite 6. 

## 1. Upgrading & Configuration Checks

To successfully run Astro 6.0 Beta on this codebase, the following setups are strictly required and have been verified:
- **Node.js Version**: Must be `>=22.0.0` defined in `package.json`.
- **Cloudflare Adapter**: We use `@astrojs/cloudflare` which natively supports Vite's Environment API. Ensure `astro.config.mjs` configures the adapter and has `output: 'server'`.
- **Environment Variables**: Access Cloudflare bindings natively via the standard Astro parameters, avoiding the deprecated `Astro.locals.runtime`.
- **Glob Imports**: Never use the deprecated `Astro.glob()`. Instead, always enforce `import.meta.glob()`.

## 2. Walkthrough of Applied Fixes

During the migration, we resolved the following issues that broke the build:

### A. TypeScript Strictness (`markdown.tsx`)
- **Issue:** `npx astro check` now strictly enforces types. Our `parseMarkdown(text)` function was throwing an `implicitly has an 'any' type` error.
- **Fix:** Explicitly annotated the parameter as `text: string`. 
- **Takeaway:** Astro 6 uses stricter TypeScript checking by default. Ensure all components and utilities have explicitly defined types for props and parameters.

### B. LightningCSS Build Target Error
- **Issue:** Astro 6 upgrades to Vite 6, which uses LightningCSS for CSS minification by default instead of esbuild. Our `.browserslistrc` targets Node 22 (`es2024`), but LightningCSS currently does not support minifying to `"es2024"`. This resulted in an `[ERROR] [vite] ✗ Build failed: Unsupported target "es2024"`.
- **Fix:** Overrode the `cssTarget` setting inside `astro.config.mjs` to target `'es2022'`:
```javascript
export default defineConfig({
  vite: {
    build: {
      target: 'es2022',
      cssTarget: 'es2022', // <-- Prevents LightningCSS crash
      cssMinify: 'lightningcss',
    }
  }
});
```

---

## 3. Potential Future Pitfalls & Best Practices

To prevent repeating these mistakes and to foresee future breaking changes, keep the following in mind as you develop in Astro 6:

### Pitfall 1: Content Collections Upgrades
Astro 5 and 6 push heavily for the new **Content Layer API** and deprecate the v2.0 Content Collections API (where collections were implicitly driven by the `src/content/` folder).
- **Future Mistake:** Creating a collection using `type: 'content'` or without defining a `loader: glob(...)`. 
- **Prevention:** Always explicitly define a `loader` (like `glob()` or `file()`) in `src/content.config.ts` (note the new filename, not `config.ts`).

### Pitfall 2: `is:inline` for `<script>` tags
Astro changed the default behavior of script tags. Conditionally rendered scripts are no longer implicitly inlined.
- **Future Mistake:** Adding a conditional script like `{condition && <script>console.log("x")</script>}` expecting it to run without issues.
- **Prevention:** You must explicitly add `is:inline` to conditionally rendered scripts: `<script is:inline>...</script>`.

### Pitfall 3: Form Actions & Redirects
Astro 6 removes cookie-forwarding for form actions, meaning `actions` submitted by an HTML form render directly as POST results without a redirect.
- **Future Mistake:** Relying on `Astro.redirect` to pass form action results back to the user via cookies, which will cause a 4KB cookie limit error or a broken UI flow.
- **Prevention:** Assume standard POST behavior for actions. If you need persistency across redirects, implement your own session storage using Netlify Blobs or Cloudflare KV (`Astro.session`).

### Pitfall 4: "Squoosh" Image Service is Dead
Astro deprecated and completely removed the Squoosh image service.
- **Future Mistake:** Trying to define `squooshImageService()` in `astro.config.mjs` to handle custom image resizing.
- **Prevention:** Use the built-in `sharp` image service, or configure a `noop` service if you are handling images via an external CDN (as we currently do for our Cloudflare custom asset handling).

### Pitfall 5: Third-party Package Target Formats
Vite 6 no longer processes locally-linked JS dependencies in `astro.config.mjs` with Vite; it imports them via standard Node.js module resolution.
- **Future Mistake:** Creating a local package/script in the monorepo that relies on Vite to compile raw TypeScript on the fly when imported by the Astro config.
- **Prevention:** Ensure any local plugins/packages export CJS/ESM correctly.
