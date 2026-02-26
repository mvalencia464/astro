import { defineMiddleware } from 'astro:middleware';

export const onRequest = defineMiddleware(async (context, next) => {
  const response = await next();
  const url = context.request.url;

  // Cache images & fonts for 1 year (immutable)
  if (url.match(/\.(webp|jpg|jpeg|png|gif|woff2|woff|ttf)(\?.*)?$/i)) {
    response.headers.set('Cache-Control', 'public, max-age=31536000, immutable');
  }
  // Cache JS/CSS for 30 days
  else if (url.match(/\.(js|css)(\?.*)?$/i)) {
    response.headers.set('Cache-Control', 'public, max-age=2592000');
  }
  // Don't cache HTML (always fresh)
  else if (url.match(/\/($|\?|index\.html)/i)) {
    response.headers.set('Cache-Control', 'public, max-age=0, must-revalidate');
  }

  // Security headers
  response.headers.set('X-Frame-Options', 'SAMEORIGIN');
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');

  return response;
});
