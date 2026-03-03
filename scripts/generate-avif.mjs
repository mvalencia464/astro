#!/usr/bin/env node
/**
 * Convert WebP images to AVIF format for improved loading performance
 * Run with: node scripts/generate-avif.mjs
 */
import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.join(__dirname, '..');
const assetsDir = path.join(projectRoot, 'src', 'assets');
const publicDir = path.join(projectRoot, 'public');

async function findAndConvertImages(directory, baseDir = directory) {
  if (!fs.existsSync(directory)) {
    console.log(`Directory not found: ${directory}`);
    return;
  }

  const entries = fs.readdirSync(directory, { withFileTypes: true });
  let convertedCount = 0;

  for (const entry of entries) {
    const fullPath = path.join(directory, entry.name);
    
    if (entry.isDirectory()) {
      convertedCount += await findAndConvertImages(fullPath, baseDir);
    } else if (/\.(webp|png|jpg|jpeg)$/i.test(entry.name)) {
      const outputPath = fullPath.replace(/\.[^.]+$/, '.avif');
      
      // Skip if AVIF already exists (check mtime to avoid unnecessary work)
      if (fs.existsSync(outputPath)) {
        const sourceStats = fs.statSync(fullPath);
        const avifStats = fs.statSync(outputPath);
        if (avifStats.mtimeMs > sourceStats.mtimeMs) {
          // AVIF is newer than source, skip
          continue;
        }
      }

      try {
        const stats = fs.statSync(fullPath);
        await sharp(fullPath)
          .avif({ quality: 80 })
          .toFile(outputPath);
        
        const avifStats = fs.statSync(outputPath);
        const savings = ((1 - avifStats.size / stats.size) * 100).toFixed(1);
        console.log(`✅ ${path.relative(baseDir, outputPath)} (${savings}% smaller)`);
        convertedCount++;
      } catch (error) {
        console.error(`❌ Failed: ${path.relative(baseDir, fullPath)} - ${error.message}`);
      }
    }
  }

  return convertedCount;
}

async function main() {
  console.log('🖼️  Starting AVIF conversion...\n');
  
  let total = 0;
  
  console.log('Converting src/assets...');
  total += await findAndConvertImages(assetsDir);
  
  console.log('\nConverting public...');
  total += await findAndConvertImages(publicDir);
  
  console.log(`\n✨ Conversion complete! ${total} images converted to AVIF.`);
}

main().catch(error => {
  console.error('Error:', error);
  process.exit(1);
});
