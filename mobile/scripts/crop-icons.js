// One-off: crops transparent margins from the icon PNGs in assets/icons/.
// Usage: node scripts/crop-icons.js
const fs = require('fs');
const path = require('path');
const { PNG } = require('pngjs');

const DIR = path.join(__dirname, '..', 'assets', 'icons');
const MARGIN = 8; // keep a few transparent pixels around the artwork
const ALPHA_THRESHOLD = 10;

for (const file of fs.readdirSync(DIR).filter((f) => f.endsWith('.png'))) {
  const filePath = path.join(DIR, file);
  const png = PNG.sync.read(fs.readFileSync(filePath));
  const { width, height, data } = png;

  let minX = width, minY = height, maxX = -1, maxY = -1;
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      if (data[(y * width + x) * 4 + 3] > ALPHA_THRESHOLD) {
        if (x < minX) minX = x;
        if (x > maxX) maxX = x;
        if (y < minY) minY = y;
        if (y > maxY) maxY = y;
      }
    }
  }
  if (maxX < 0) {
    console.log(`${file}: helt genomskinlig, hoppar över`);
    continue;
  }

  minX = Math.max(0, minX - MARGIN);
  minY = Math.max(0, minY - MARGIN);
  maxX = Math.min(width - 1, maxX + MARGIN);
  maxY = Math.min(height - 1, maxY + MARGIN);

  const w = maxX - minX + 1;
  const h = maxY - minY + 1;
  const out = new PNG({ width: w, height: h });
  for (let y = 0; y < h; y++) {
    data.copy(out.data, y * w * 4, ((minY + y) * width + minX) * 4, ((minY + y) * width + maxX + 1) * 4);
  }
  fs.writeFileSync(filePath, PNG.sync.write(out));
  console.log(`${file}: ${width}x${height} -> ${w}x${h}`);
}
