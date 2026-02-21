import { defineMiddleware } from 'astro:middleware';

export const onRequest = defineMiddleware((context, next) => {
  const response = next();

  // Return a promise that adds headers
  return Promise.resolve(response).then((res) => {
    // Cache static assets for 30 days
    if (context.request.url.includes('/assets/')) {
      res.headers.set('Cache-Control', 'public, max-age=2592000, immutable');
    }
    
    // Cache HTML pages for 1 hour (revalidate often for freshness)
    if (context.request.url.endsWith('/') || context.request.url.endsWith('.html')) {
      res.headers.set('Cache-Control', 'public, max-age=3600, s-maxage=3600');
    }

    // Add security headers
    res.headers.set('X-Content-Type-Options', 'nosniff');
    res.headers.set('X-Frame-Options', 'SAMEORIGIN');
    res.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
    
    // Enable back/forward cache compatibility
    res.headers.set('Permissions-Policy', 'geolocation=(), microphone=(), camera=()');
    
    return res;
  });
});
