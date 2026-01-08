const fs = require('fs');

// Create a simple PNG file with a colored rectangle
function createSimplePNG(width, height, filename) {
    const PNG = require('pngjs').PNG;
    const png = new PNG({ width, height });

    // Fill with purple color (#4f46e5 = rgb(79, 70, 229))
    for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
            const idx = (width * y + x) << 2;
            png.data[idx] = 79;      // Red
            png.data[idx + 1] = 70;  // Green
            png.data[idx + 2] = 229; // Blue
            png.data[idx + 3] = 255; // Alpha
        }
    }

    png.pack().pipe(fs.createWriteStream(filename));
    console.log(`Created ${filename}`);
}

// Try to create icons
try {
    createSimplePNG(192, 192, 'icon-192.png');
    createSimplePNG(512, 512, 'icon-512.png');
} catch (err) {
    console.log('pngjs not available, will need to install it');
    console.log('Run: npm install pngjs');
}
