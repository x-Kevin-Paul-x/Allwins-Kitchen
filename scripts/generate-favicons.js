const sharp = require('sharp');
const path = require('path');

const input = path.join(__dirname, '..', 'public', 'Logo_Without_Bg.png');
const publicDir = path.join(__dirname, '..', 'public');

async function generateFavicons() {
    console.log('🔄 Generating standard favicon files using sharp...\n');
    
    // Create favicon.ico (48x48 is Google's recommended standard size)
    await sharp(input)
        .resize(48, 48)
        .png()
        .toFile(path.join(publicDir, 'favicon.ico'));
    console.log('✅ Created favicon.ico (48x48)');

    // Create apple-touch-icon.png (180x180 for iOS)
    await sharp(input)
        .resize(180, 180)
        .png()
        .toFile(path.join(publicDir, 'apple-touch-icon.png'));
    console.log('✅ Created apple-touch-icon.png (180x180)');

    // Create favicon-32x32.png
    await sharp(input)
        .resize(32, 32)
        .png()
        .toFile(path.join(publicDir, 'favicon-32x32.png'));
    console.log('✅ Created favicon-32x32.png (32x32)');

    // Create favicon-16x16.png
    await sharp(input)
        .resize(16, 16)
        .png()
        .toFile(path.join(publicDir, 'favicon-16x16.png'));
    console.log('✅ Created favicon-16x16.png (16x16)');

    // Create android-chrome-192x192.png
    await sharp(input)
        .resize(192, 192)
        .png()
        .toFile(path.join(publicDir, 'android-chrome-192x192.png'));
    console.log('✅ Created android-chrome-192x192.png (192x192)');

    // Create android-chrome-512x512.png
    await sharp(input)
        .resize(512, 512)
        .png()
        .toFile(path.join(publicDir, 'android-chrome-512x512.png'));
    console.log('✅ Created android-chrome-512x512.png (512x512)');

    console.log('\n🎉 All favicons generated successfully!');
}

generateFavicons().catch(err => {
    console.error('❌ Error generating favicons:', err);
});
