#!/usr/bin/env node

/**
 * Aggressive Image Resize Script
 * 
 * This script actually RESIZES images to web-appropriate dimensions
 * instead of just re-compressing. This is much more effective for 
 * large phone photos and camera images.
 * 
 * Usage: node scripts/aggressive-image-resize.js
 * 
 * It analyzes how each image is used in the codebase and resizes accordingly
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import sharp from 'sharp';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Image usage rules - map image names to max display width
// This is based on where they're used in the website
const IMAGE_USAGE = {
  // Portfolio grid images - displayed at max 400-500px wide
  '045-wraparound-angle': 1440,
  '046-ground-level-1': 1440,
  '047-ground-level-2': 1440,
  '050-bonus-1': 1440,
  '051-bonus-2': 1440,
  '052-bonus-3': 1440,
  '053-bonus-4': 1440,
  '054-bonus-5': 1440,
  '043-premium-detail-1': 1440,
  '044-premium-detail-2': 1440,
  '048-lighting-detail': 1440,
  
  // Portfolio items displayed in smaller cards
  'IMG_1055': 800,
  'eagle-river-sanctuary': 1200,
  'glen-alps-entertainer': 1000,
  'hillside-mountain-view': 1200,
  'midtown-modern': 1200,
  'south-anchorage-retreat': 1200,
  'turnagain-coastal': 1200,
  
  // Content/process images
  'hardwood-crafts': 1200,
  '6c538630_ef3a_4e6d_84cb_58b7dd60096e_img_2021': 1200,
};

// Default max width for images if not in above list
const DEFAULT_MAX_WIDTH = 1440;

function formatBytes(bytes) {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + ' ' + sizes[i];
}

/**
 * Get max width for an image based on usage
 */
function getMaxWidthForImage(fileName) {
  // Remove extension and hash if present
  const baseName = fileName.replace(/\.[^/.]+$/, '').split('.')[0];
  return IMAGE_USAGE[baseName] || DEFAULT_MAX_WIDTH;
}

/**
 * Resize and optimize a single image
 */
async function resizeAndOptimize(filePath) {
  try {
    const fileStats = fs.statSync(filePath);
    const fileSize = fileStats.size;
    const ext = path.extname(filePath).toLowerCase();
    const fileName = path.basename(filePath);
    const fileNameNoExt = path.basename(filePath, ext);
    const dir = path.dirname(filePath);
    
    // Skip small files and non-image types
    if (fileSize < 200000 || !['.webp', '.jpg', '.jpeg', '.png'].includes(ext)) {
      return null;
    }
    
    const image = sharp(filePath);
    const metadata = await image.metadata();
    const { width, height, format } = metadata;
    
    if (!width || !height) {
      console.log(`⊘ SKIP: ${fileName} (unable to read dimensions)`);
      return null;
    }
    
    // Get target width for this image
    const targetWidth = getMaxWidthForImage(fileNameNoExt);
    
    // If image is already smaller than target, skip
    if (width <= targetWidth) {
      console.log(`⊘ SKIP: ${fileName} (already ${width}px, target: ${targetWidth}px)`);
      return null;
    }
    
    console.log(`\n⚙️  RESIZING: ${fileName}`);
    console.log(`   Original: ${width}×${height}px, ${formatBytes(fileSize)}`);
    console.log(`   Target width: ${targetWidth}px`);
    
    // Create backup of original
    const backupPath = path.join(dir, `${fileNameNoExt}.original${ext}`);
    if (!fs.existsSync(backupPath)) {
      fs.copyFileSync(filePath, backupPath);
      console.log(`   ✓ Backup created`);
    }
    
    // Resize and convert to WebP
    const newHeight = Math.round(height * (targetWidth / width));
    const tempPath = path.join(dir, `${fileNameNoExt}.tmp.webp`);
    
    const resized = await sharp(filePath)
      .rotate() // Auto-rotate based on EXIF
      .resize(targetWidth, newHeight, {
        fit: 'cover',
        withoutEnlargement: true,
      })
      .withMetadata(false) // Strip EXIF
      .webp({ quality: 80 })
      .toFile(tempPath);
    
    // Replace original with resized version
    fs.renameSync(tempPath, filePath);
    
    const savings = fileSize - resized.size;
    const savingsPercent = Math.round((savings / fileSize) * 100);
    
    console.log(`   ✓ Resized to: ${targetWidth}×${newHeight}px`);
    console.log(`   ✓ New size: ${formatBytes(resized.size)} (-${savingsPercent}%)`);
    
    return {
      fileName,
      originalSize: fileSize,
      newSize: resized.size,
      savings,
      savingsPercent,
    };
  } catch (error) {
    console.error(`✗ ERROR processing ${filePath}:`, error.message);
    return null;
  }
}

/**
 * Find and process large images
 */
async function processLargeImages() {
  const portfolioDir = path.join(__dirname, '../src/assets/portfolio');
  const contentDir = path.join(__dirname, '../src/assets/content');
  const processDir = path.join(__dirname, '../src/assets/process');
  const testimonialsDir = path.join(__dirname, '../src/assets/testimonials/images');
  
  const results = [];
  
  console.log('🖼️  Aggressive Image Resize Tool');
  console.log('============================\n');
  console.log('This will RESIZE images to web-appropriate dimensions');
  console.log('Backups will be saved with .original extension\n');
  
  for (const dir of [portfolioDir, contentDir, processDir, testimonialsDir]) {
    if (!fs.existsSync(dir)) continue;
    
    console.log(`\nProcessing: ${path.basename(dir)}`);
    console.log('-'.repeat(50));
    
    const files = fs.readdirSync(dir).filter(f => 
      ['.webp', '.jpg', '.jpeg', '.png'].includes(path.extname(f).toLowerCase())
    );
    
    for (const file of files) {
      const result = await resizeAndOptimize(path.join(dir, file));
      if (result) results.push(result);
    }
  }
  
  // Print summary
  console.log('\n============================');
  console.log('📊 RESIZE SUMMARY');
  console.log('============================');
  console.log(`Resized: ${results.length} images`);
  
  const totalOriginal = results.reduce((sum, r) => sum + r.originalSize, 0);
  const totalNew = results.reduce((sum, r) => sum + r.newSize, 0);
  const totalSavings = results.reduce((sum, r) => sum + r.savings, 0);
  
  console.log(`Total Original Size: ${formatBytes(totalOriginal)}`);
  console.log(`Total New Size: ${formatBytes(totalNew)}`);
  console.log(`Total Savings: ${formatBytes(totalSavings)} (${Math.round((totalSavings / totalOriginal) * 100)}%)\n`);
  
  if (results.length > 0) {
    console.log('⚠️  IMPORTANT:');
    console.log('   1. Review resized images in the browser');
    console.log('   2. If quality looks bad, restore from .original files');
    console.log('   3. Run: npm run build');
    console.log('   4. Commit and deploy\n');
    
    console.log('Top 5 space savers:');
    results
      .sort((a, b) => b.savings - a.savings)
      .slice(0, 5)
      .forEach((r, i) => {
        console.log(`   ${i + 1}. ${r.fileName}: ${formatBytes(r.savings)} saved`);
      });
  }
}

processLargeImages().catch(console.error);
