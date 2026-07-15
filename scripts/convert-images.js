/**
 * Image Conversion Script
 * Converts all PNG/JPEG images in public/ to WebP at quality 82
 * Run: node scripts/convert-images.js
 */

const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

const publicDir = path.join(__dirname, '..', 'public');

const images = [
  { input: 'mutton_chukka.png',          output: 'mutton_chukka.webp',          width: 900 },
  { input: 'bun_parotta.png',             output: 'bun_parotta.webp',             width: 800 },
  { input: 'kari_dosa.png',               output: 'kari_dosa.webp',               width: 800 },
  { input: 'jigarthanda.png',             output: 'jigarthanda.webp',             width: 800 },
  { input: 'chicken_biryani.png',         output: 'chicken_biryani.webp',         width: 800 },
  { input: 'country_chicken_biryani.png', output: 'country_chicken_biryani.webp', width: 800 },
  { input: 'mutton_biryani.png',          output: 'mutton_biryani.webp',          width: 800 },
  { input: 'kothu_parotta.png',           output: 'kothu_parotta.webp',           width: 800 },
  { input: 'pichu_pota_parotta.png',      output: 'pichu_pota_parotta.webp',      width: 800 },
  { input: 'rose_milk.png',               output: 'rose_milk.webp',               width: 800 },
  { input: 'Logo_Without_Bg.png',         output: 'Logo_Without_Bg.webp',         width: 200 },
];

async function convertImages() {
  console.log('🔄 Starting image conversion to WebP...\n');
  let totalSaved = 0;

  for (const img of images) {
    const inputPath  = path.join(publicDir, img.input);
    const outputPath = path.join(publicDir, img.output);

    if (!fs.existsSync(inputPath)) {
      console.log(`⚠️  Skipping ${img.input} — file not found`);
      continue;
    }

    try {
      await sharp(inputPath)
        .resize({ width: img.width, withoutEnlargement: true })
        .webp({ quality: 82, effort: 6 })
        .toFile(outputPath);

      const originalSize = fs.statSync(inputPath).size;
      const newSize      = fs.statSync(outputPath).size;
      const saved        = originalSize - newSize;
      const pct          = ((saved / originalSize) * 100).toFixed(0);
      totalSaved        += saved;

      console.log(`✅ ${img.input.padEnd(36)} ${(originalSize/1024).toFixed(0).padStart(5)} KB → ${(newSize/1024).toFixed(0).padStart(4)} KB  (−${pct}%)`);
    } catch (err) {
      console.error(`❌ Failed: ${img.input} — ${err.message}`);
    }
  }

  console.log(`\n🎉 Done! Total saved: ${(totalSaved / 1024 / 1024).toFixed(2)} MB`);
}

convertImages();
