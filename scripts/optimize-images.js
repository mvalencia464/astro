#!/usr/bin/env node

/**
 * Image Optimization Script
 * Automatically resizes and compresses images to web-optimal sizes
 * 
 * Usage: node scripts/optimize-images.js
 * 
 * Supports:
 * - JPEG, PNG, WebP, AVIF
 * - Automatic quality detection
 * - Responsive image generation
 * - Metadata stripping for smaller files
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import sharp from 'sharp';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configuration
const CONFIG = {
  sourceDir: path.join(__dirname, '../src/assets'),
  outputDir: path.join(__dirname, '../src/assets'),
  
  // Responsive breakpoints
  breakpoints: {
    mobile: 640,
    tablet: 1024,
    desktop: 1440,
  },
  
  // Image quality settings (0-100)
  quality: {
    webp: 75,
    jpeg: 80,
    png: 80,
    avif: 65,
  },
  
  // Extensions to process
  extensions: ['.jpg', '.jpeg', '.png', '.webp'],
  
  // Directories to skip
  skipDirs: ['node_modules', '.git', 'dist'],
  
  // Only process if over this size (bytes)
  minSizeToOptimize: 100000, // 100KB
};

// Statistics tracking
const stats = {
  processed: 0,
  skipped: 0,
  totalOriginal: 0,
  totalOptimized: 0,
  savings: 0,
};

/**
 * Get file size in human readable format
 */
function formatBytes(bytes) {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + ' ' + sizes[i];
}

/**
 * Check if file should be optimized
 */
function shouldOptimize(filePath, fileSize) {
  const ext = path.extname(filePath).toLowerCase();
  if (!CONFIG.extensions.includes(ext)) return false;
  if (fileSize < CONFIG.minSizeToOptimize) return false;
  return true;
}

/**
 * Get appropriate quality for image type
 */
function getQualityForFormat(format) {
  return CONFIG.quality[format] || 75;
}

/**
 * Optimize a single image
 */
async function optimizeImage(filePath) {
  try {
    const fileStats = fs.statSync(filePath);
    const fileSize = fileStats.size;
    const ext = path.extname(filePath).toLowerCase();
    const fileName = path.basename(filePath, ext);
    const dir = path.dirname(filePath);
    
    if (!shouldOptimize(filePath, fileSize)) {
      console.log(`⊘ SKIP: ${fileName} (${formatBytes(fileSize)})`);
      return false;
    }
    
    console.log(`\n⚙️  OPTIMIZING: ${fileName}`);
    console.log(`   Original size: ${formatBytes(fileSize)}`);
    
    // Read image metadata
    const image = sharp(filePath);
    const metadata = await image.metadata();
    const { width, height } = metadata;
    
    console.log(`   Dimensions: ${width}×${height}px`);
    
    // Process image with optimization
    let optimized = image
      .rotate() // Auto-rotate based on EXIF
      .withMetadata(false); // Strip metadata to reduce size
    
    // Determine target format (prefer WebP for modern browsers)
    const targetFormat = 'webp';
    const targetQuality = getQualityForFormat(targetFormat);
    
    // For WebP files, save to a temp file first, then replace
    const isWebP = ext.toLowerCase() === '.webp';
    const webpPath = isWebP 
      ? path.join(dir, `${fileName}.webp.tmp`)
      : path.join(dir, `${fileName}.webp`);
    
    const webpOutput = await optimized
      .webp({ quality: targetQuality })
      .toFile(webpPath);
    
    // If this was a WebP file, replace the original with optimized version
    if (isWebP) {
      fs.renameSync(webpPath, filePath);
      const savings = fileSize - webpOutput.size;
      const savingsPercent = Math.round((savings / fileSize) * 100);
      console.log(`   ✓ WebP optimized: ${formatBytes(webpOutput.size)} (-${savingsPercent}%)`);
      
      stats.processed++;
      stats.totalOriginal += fileSize;
      stats.totalOptimized += webpOutput.size;
      stats.savings += savings;
    } else {
      // For non-WebP originals, generate WebP + responsive sizes
      console.log(`   ✓ WebP: ${formatBytes(webpOutput.size)}`);
      
      // Also generate AVIF for cutting-edge browsers
      const avifPath = path.join(dir, `${fileName}.avif`);
      await sharp(filePath)
        .rotate()
        .withMetadata(false)
        .avif({ quality: getQualityForFormat('avif') })
        .toFile(avifPath);
      console.log(`   ✓ AVIF: ${formatBytes((await fs.promises.stat(avifPath)).size)}`);
      
      // Generate responsive versions
      const responsiveSizes = Object.entries(CONFIG.breakpoints).map(([name, sizeWidth]) => ({
        name,
        width: sizeWidth,
        suffix: `@${sizeWidth}w`,
      }));
      
      const responsiveVersions = [];
      
      for (const size of responsiveSizes) {
        // Don't create larger versions than original
        if (size.width >= width) {
          responsiveVersions.push({
            width: width,
            srcset: `${fileName}${size.suffix}.webp`,
            size: webpOutput.size,
          });
          continue;
        }
        
        const responsiveWebpPath = path.join(dir, `${fileName}${size.suffix}.webp`);
        const responsiveOutput = await sharp(filePath)
          .rotate()
          .resize(size.width, Math.round(height * (size.width / width)), {
            fit: 'contain',
            withoutEnlargement: true,
          })
          .withMetadata(false)
          .webp({ quality: targetQuality })
          .toFile(responsiveWebpPath);
        
        responsiveVersions.push({
          width: size.width,
          srcset: `${fileName}${size.suffix}.webp`,
          size: responsiveOutput.size,
        });
      }
      
      responsiveVersions.forEach(v => {
        console.log(`   ✓ Responsive (${v.width}px): ${formatBytes(v.size)}`);
      });
      
      console.log(`   → Srcset recommendation:`);
      console.log(`      ${responsiveVersions.map(v => `${v.srcset} ${v.width}w`).join(', ')}`);
      
      const savings = fileSize - webpOutput.size;
      stats.processed++;
      stats.totalOriginal += fileSize;
      stats.totalOptimized += webpOutput.size;
      stats.savings += savings;
    }
    
    return true;
  } catch (error) {
    console.error(`✗ ERROR processing ${filePath}:`, error.message);
    return false;
  }
}

/**
 * Recursively find and optimize all images
 */
async function processDirectory(dir) {
  try {
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    
    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);
      
      // Skip unwanted directories
      if (entry.isDirectory()) {
        if (CONFIG.skipDirs.includes(entry.name)) {
          continue;
        }
        await processDirectory(fullPath);
      } else if (entry.isFile()) {
        const processed = await optimizeImage(fullPath);
        if (!processed) {
          stats.skipped++;
        }
      }
    }
  } catch (error) {
    console.error(`Error reading directory ${dir}:`, error);
  }
}

/**
 * Main execution
 */
async function main() {
  console.log('🖼️  Image Optimization Tool');
  console.log('============================\n');
  console.log(`Source Directory: ${CONFIG.sourceDir}`);
  console.log(`Target Formats: WebP, AVIF`);
  console.log(`Breakpoints: ${Object.values(CONFIG.breakpoints).join('px, ')}px\n`);
  
  // Check if sharp is installed
  try {
    await import('sharp');
  } catch {
    console.error('❌ Sharp is not installed. Install with: npm install --save-dev sharp');
    process.exit(1);
  }
  
  // Process all images
  await processDirectory(CONFIG.sourceDir);
  
  // Print summary
  console.log('\n============================');
  console.log('📊 OPTIMIZATION SUMMARY');
  console.log('============================');
  console.log(`Processed: ${stats.processed} images`);
  console.log(`Skipped: ${stats.skipped} images`);
  console.log(`Total Original Size: ${formatBytes(stats.totalOriginal)}`);
  console.log(`Total Optimized Size: ${formatBytes(stats.totalOptimized)}`);
  const savingsPercent = stats.totalOriginal > 0 ? Math.round((stats.savings / stats.totalOriginal) * 100) : 0;
  console.log(`Total Savings: ${formatBytes(stats.savings)} (${savingsPercent}%)\n`);
  
  if (stats.processed > 0) {
    console.log('✓ Optimization complete!');
    console.log('📝 Next steps:');
    console.log('   1. Update image paths in components to use .webp');
    console.log('   2. Use responsive srcset attributes for images');
    console.log('   3. Add loading="lazy" to below-fold images');
    console.log('   4. Deploy and re-test with Pingdom\n');
  }
}

main().catch(console.error);
