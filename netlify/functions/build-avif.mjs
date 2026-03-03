/**
 * Netlify Build Plugin: Convert images to AVIF if cache miss
 * This runs once per image set and avoids reconversion on cache hits
 */
import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const CACHE_DIR = '.netlify/cache/avif-conversion';

export async function onPreBuild({ utils }) {
  console.log('🖼️  Checking AVIF cache...');
  
  // Skip if AVIF files were restored from cache
  if (fs.existsSync(CACHE_DIR)) {
    console.log('✅ AVIF files restored from cache - skipping conversion');
    return;
  }

  console.log('🖼️  Starting AVIF conversion...\n');
  
  // Run conversion
  const convertScript = await import('../../scripts/generate-avif.mjs');
  
  // Save cache marker
  fs.mkdirSync(CACHE_DIR, { recursive: true });
  fs.writeFileSync(path.join(CACHE_DIR, '.converted'), 'true');
}

export async function onPostBuild({ utils }) {
  // Cache the AVIF files
  if (fs.existsSync('src/assets')) {
    utils.cache.save('src/assets/**/*.avif');
  }
  if (fs.existsSync('public')) {
    utils.cache.save('public/**/*.avif');
  }
}
