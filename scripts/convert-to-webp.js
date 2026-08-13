#!/usr/bin/env node

/**
 * Convert PNG images to WebP format
 *
 * Usage: node scripts/convert-to-webp.js
 *
 * Prerequisites: npm install sharp
 *
 * Settings:
 * - Icons (public/icons): 512x512, quality 90
 * - Hero images (public/images): 2560px wide, quality 85
 * - Logo: 512px wide, quality 90
 */

const fs = require('fs');
const path = require('path');

let sharp;
try {
  sharp = require('sharp');
} catch (e) {
  console.error('Error: sharp is not installed.');
  console.error('Run: npm install sharp');
  process.exit(1);
}

const PUBLIC_DIR = path.join(__dirname, '..', 'public');

// Format bytes to human readable
function formatBytes(bytes) {
  if (bytes < 1024) return bytes + ' B';
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
  return (bytes / (1024 * 1024)).toFixed(2) + ' MB';
}

// Recursively find all PNG files in a directory
function findPngFiles(dir, files = []) {
  if (!fs.existsSync(dir)) return files;

  const entries = fs.readdirSync(dir, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      // Skip favicon directory
      if (entry.name === 'favicon') continue;
      findPngFiles(fullPath, files);
    } else if (entry.isFile() && entry.name.toLowerCase().endsWith('.png')) {
      files.push(fullPath);
    }
  }

  return files;
}

async function convertFile(pngPath, config) {
  const webpPath = pngPath.replace(/\.png$/i, '.webp');
  const originalSize = fs.statSync(pngPath).size;

  let pipeline = sharp(pngPath);

  if (config.size) {
    pipeline = pipeline.resize(config.size, config.size, {
      fit: 'contain',
      background: { r: 0, g: 0, b: 0, alpha: 0 }
    });
  } else if (config.width) {
    pipeline = pipeline.resize(config.width, null, {
      fit: 'inside',
      withoutEnlargement: true
    });
  }

  await pipeline
    .webp({ quality: config.quality })
    .toFile(webpPath);

  const newSize = fs.statSync(webpPath).size;

  // Delete original PNG
  fs.unlinkSync(pngPath);

  return { originalSize, newSize, path: webpPath };
}

async function main() {
  console.log('PNG to WebP Conversion');
  console.log('======================\n');

  let totalOriginal = 0;
  let totalNew = 0;
  let totalFiles = 0;

  // 1. Convert Icons (512x512, q90)
  const iconsDir = path.join(PUBLIC_DIR, 'icons');
  const iconFiles = findPngFiles(iconsDir);

  if (iconFiles.length > 0) {
    console.log(`ICONS (512x512, q90) - ${iconFiles.length} files`);
    console.log('-'.repeat(40));

    for (const pngPath of iconFiles) {
      const relativePath = path.relative(PUBLIC_DIR, pngPath);
      process.stdout.write(`  ${relativePath}...`);

      try {
        const result = await convertFile(pngPath, { size: 512, quality: 90 });
        totalOriginal += result.originalSize;
        totalNew += result.newSize;
        totalFiles++;
        console.log(` ${formatBytes(result.originalSize)} -> ${formatBytes(result.newSize)}`);
      } catch (err) {
        console.log(` FAILED: ${err.message}`);
      }
    }
    console.log();
  }

  // 2. Convert Hero Images (2560px wide, q85)
  const imagesDir = path.join(PUBLIC_DIR, 'images');
  const imageFiles = findPngFiles(imagesDir);

  if (imageFiles.length > 0) {
    console.log(`IMAGES (2560px wide, q85) - ${imageFiles.length} files`);
    console.log('-'.repeat(40));

    for (const pngPath of imageFiles) {
      const relativePath = path.relative(PUBLIC_DIR, pngPath);
      process.stdout.write(`  ${relativePath}...`);

      try {
        const result = await convertFile(pngPath, { width: 2560, quality: 85 });
        totalOriginal += result.originalSize;
        totalNew += result.newSize;
        totalFiles++;
        console.log(` ${formatBytes(result.originalSize)} -> ${formatBytes(result.newSize)}`);
      } catch (err) {
        console.log(` FAILED: ${err.message}`);
      }
    }
    console.log();
  }

  // 3. Convert logo.png (512px, q90)
  const logoPath = path.join(PUBLIC_DIR, 'logo.png');
  if (fs.existsSync(logoPath)) {
    console.log('LOGO (512px, q90)');
    console.log('-'.repeat(40));
    process.stdout.write('  logo.png...');

    try {
      const result = await convertFile(logoPath, { width: 512, quality: 90 });
      totalOriginal += result.originalSize;
      totalNew += result.newSize;
      totalFiles++;
      console.log(` ${formatBytes(result.originalSize)} -> ${formatBytes(result.newSize)}`);
    } catch (err) {
      console.log(` FAILED: ${err.message}`);
    }
    console.log();
  }

  // Print report
  const savings = totalOriginal - totalNew;
  const percentSaved = totalOriginal > 0 ? ((savings / totalOriginal) * 100).toFixed(1) : 0;

  console.log('='.repeat(40));
  console.log('CONVERSION REPORT');
  console.log('='.repeat(40));
  console.log(`Files processed:  ${totalFiles}`);
  console.log(`Original (PNG):   ${formatBytes(totalOriginal)}`);
  console.log(`Converted (WebP): ${formatBytes(totalNew)}`);
  console.log(`Savings:          ${formatBytes(savings)} (${percentSaved}%)`);
  console.log('='.repeat(40));
  console.log();
  console.log('Next: Update all .png references to .webp in your codebase');
}

main().catch(err => {
  console.error('Fatal error:', err);
  process.exit(1);
});
