#!/usr/bin/env node
import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.join(__dirname, '..');
const assetsDir = path.join(projectRoot, 'src', 'assets');
const publicDir = path.join(projectRoot, 'public');

async function convertToAvif(directory) {
  const files = fs.readdirSync(directory, { recursive: true });
  const imageFiles = files.filter(file => 
    /\.(webp|png|jpg|jpeg)$/i.test(file) && 
    !file.includes('avif') // Skip already converted files
  );

  console.log(`Found ${imageFiles.length} images in ${directory}`);

  for (const file of imageFiles) {
    const inputPath = path.join(directory, file);
    const outputPath = inputPath.replace(/\.[^.]+$/, '.avif');
    
    // Skip if AVIF already exists
    if (fs.existsSync(outputPath)) {
      console.log(`⏭️  Skipping (AVIF exists): ${file}`);
      continue;
    }

    try {
      await sharp(inputPath)
        .avif({ quality: 80 })
        .toFile(outputPath);
      console.log(`✅ Converted: ${file}`);
    } catch (error) {
      console.error(`❌ Failed to convert ${file}:`, error.message);
    }
  }
}

async function main() {
  console.log('Starting image conversion to AVIF...\n');
  await convertToAvif(assetsDir);
  await convertToAvif(publicDir);
  console.log('\n✨ Image conversion complete!');
}

main().catch(console.error);
