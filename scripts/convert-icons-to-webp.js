#!/usr/bin/env node

/**
 * Convert PNG icons to WebP format
 *
 * Usage: node scripts/convert-icons-to-webp.js
 *
 * Prerequisites: npm install sharp
 *
 * This script:
 * 1. Finds all PNG files in public/icons/**
 * 2. Converts each to WebP (512x512, quality 90)
 * 3. Replaces the original PNG with the WebP file
 * 4. Reports memory savings
 */

const fs = require('fs');
const path = require('path');

// Check if sharp is installed
let sharp;
try {
  sharp = require('sharp');
} catch (e) {
  console.error('Error: sharp is not installed.');
  console.error('Run: npm install sharp');
  process.exit(1);
}

const ICONS_DIR = path.join(__dirname, '..', 'public', 'icons');
const SIZE = 512;
const QUALITY = 90;

// Recursively find all PNG files
function findPngFiles(dir, files = []) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      findPngFiles(fullPath, files);
    } else if (entry.isFile() && entry.name.toLowerCase().endsWith('.png')) {
      files.push(fullPath);
    }
  }

  return files;
}

// Format bytes to human readable
function formatBytes(bytes) {
  if (bytes < 1024) return bytes + ' B';
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
  return (bytes / (1024 * 1024)).toFixed(2) + ' MB';
}

async function convertIcon(pngPath) {
  const webpPath = pngPath.replace(/\.png$/i, '.webp');
  const originalSize = fs.statSync(pngPath).size;

  await sharp(pngPath)
    .resize(SIZE, SIZE, {
      fit: 'contain',
      background: { r: 0, g: 0, b: 0, alpha: 0 }
    })
    .webp({ quality: QUALITY })
    .toFile(webpPath);

  const newSize = fs.statSync(webpPath).size;

  // Delete original PNG
  fs.unlinkSync(pngPath);

  return { originalSize, newSize, path: webpPath };
}

async function main() {
  console.log('Icon Conversion: PNG to WebP');
  console.log('============================');
  console.log(`Size: ${SIZE}x${SIZE}, Quality: ${QUALITY}`);
  console.log(`Directory: ${ICONS_DIR}\n`);

  if (!fs.existsSync(ICONS_DIR)) {
    console.error('Error: Icons directory not found:', ICONS_DIR);
    process.exit(1);
  }

  const pngFiles = findPngFiles(ICONS_DIR);

  if (pngFiles.length === 0) {
    console.log('No PNG files found.');
    return;
  }

  console.log(`Found ${pngFiles.length} PNG files\n`);

  let totalOriginal = 0;
  let totalNew = 0;
  const results = [];

  for (const pngPath of pngFiles) {
    const relativePath = path.relative(ICONS_DIR, pngPath);
    process.stdout.write(`Converting: ${relativePath}...`);

    try {
      const result = await convertIcon(pngPath);
      totalOriginal += result.originalSize;
      totalNew += result.newSize;
      results.push({ ...result, relativePath });
      console.log(` done (${formatBytes(result.originalSize)} -> ${formatBytes(result.newSize)})`);
    } catch (err) {
      console.log(` FAILED: ${err.message}`);
    }
  }

  // Print report
  const savings = totalOriginal - totalNew;
  const percentSaved = ((savings / totalOriginal) * 100).toFixed(1);

  console.log('\n============================');
  console.log('Conversion Report');
  console.log('============================');
  console.log(`Files processed:  ${results.length}`);
  console.log(`Original (PNG):   ${formatBytes(totalOriginal)}`);
  console.log(`Converted (WebP): ${formatBytes(totalNew)}`);
  console.log(`Savings:          ${formatBytes(savings)} (${percentSaved}%)`);
  console.log('============================\n');

  console.log('Next steps:');
  console.log('1. Update all .png references to .webp in your codebase');
  console.log('2. Files to update:');
  console.log('   - components/ui/NormalizedIcon usages');
  console.log('   - app/about/page.tsx');
  console.log('   - app/pricing/page.tsx');
  console.log('   - components/home/Sidebar.tsx');
  console.log('   - components/home/AppShell.tsx');
  console.log('   - components/home/HomeContent.tsx');
  console.log('   - app/features/page.tsx');
}

main().catch(err => {
  console.error('Fatal error:', err);
  process.exit(1);
});
