import { defineMiddleware } from 'astro:middleware';

export const onRequest = defineMiddleware((context, next) => {
  const response = next();

  return Promise.resolve(response).then((res) => {
    const url = context.request.url;

    // Cache images & fonts for 1 year (immutable)
    if (url.match(/\.(webp|jpg|jpeg|png|gif|woff2|woff|ttf)$/i)) {
      res.headers.set('Cache-Control', 'public, max-age=31536000, immutable');
    }
    // Cache JS/CSS for 30 days
    else if (url.match(/\.(js|css)$/i)) {
      res.headers.set('Cache-Control', 'public, max-age=2592000');
    }
    // Don't cache HTML (always fresh)
    else if (url.endsWith('/') || url.endsWith('.html')) {
      res.headers.set('Cache-Control', 'public, max-age=0, must-revalidate');
    }

    // Security headers
    res.headers.set('X-Content-Type-Options', 'nosniff');
    res.headers.set('X-Frame-Options', 'SAMEORIGIN');
    res.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
    res.headers.set('Permissions-Policy', 'geolocation=(), microphone=(), camera=()');
    
    return res;
  });
});
