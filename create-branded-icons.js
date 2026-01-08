const fs = require('fs');
const PNG = require('pngjs').PNG;

function createBrandedIcon(size, filename) {
    const png = new PNG({ width: size, height: size });

    // Fill with navy blue gradient background (#1e3a8a)
    for (let y = 0; y < size; y++) {
        for (let x = 0; x < size; x++) {
            const idx = (size * y + x) << 2;

            // Create gradient from navy blue to darker navy blue
            const gradient = 1 - (y / size) * 0.2;
            png.data[idx] = Math.floor(30 * gradient);      // Red
            png.data[idx + 1] = Math.floor(58 * gradient);  // Green
            png.data[idx + 2] = Math.floor(138 * gradient); // Blue
            png.data[idx + 3] = 255;                        // Alpha
        }
    }

    // Add white "SA" text in the center (simplified as white rectangle for now)
    // In a real implementation, you'd use a proper text rendering library
    const centerX = size / 2;
    const centerY = size / 2;
    const textWidth = size * 0.6;
    const textHeight = size * 0.3;

    // Draw white rectangle as placeholder for "SA" text
    for (let y = Math.floor(centerY - textHeight / 2); y < Math.floor(centerY + textHeight / 2); y++) {
        for (let x = Math.floor(centerX - textWidth / 2); x < Math.floor(centerX + textWidth / 2); x++) {
            if (x >= 0 && x < size && y >= 0 && y < size) {
                const idx = (size * y + x) << 2;

                // Create "S" shape on left half
                if (x < centerX) {
                    const relY = y - (centerY - textHeight / 2);
                    const relHeight = textHeight;
                    if (relY < relHeight * 0.3 || (relY > relHeight * 0.4 && relY < relHeight * 0.6) || relY > relHeight * 0.7) {
                        png.data[idx] = 255;     // White
                        png.data[idx + 1] = 255;
                        png.data[idx + 2] = 255;
                        png.data[idx + 3] = 255;
                    }
                }
                // Create "A" shape on right half
                else {
                    const relY = y - (centerY - textHeight / 2);
                    const relHeight = textHeight;
                    const relX = x - centerX;
                    const halfWidth = textWidth / 4;

                    if (relY < relHeight * 0.8 && (relX < halfWidth * 0.3 || relX > halfWidth * 0.7 ||
                        (relY > relHeight * 0.4 && relY < relHeight * 0.5))) {
                        png.data[idx] = 255;     // White
                        png.data[idx + 1] = 255;
                        png.data[idx + 2] = 255;
                        png.data[idx + 3] = 255;
                    }
                }
            }
        }
    }

    png.pack().pipe(fs.createWriteStream(filename));
    console.log(`Created ${filename}`);
}

// Create icons
createBrandedIcon(192, 'icon-192.png');
createBrandedIcon(512, 'icon-512.png');
createBrandedIcon(32, 'favicon.ico');
