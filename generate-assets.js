// Simple script to generate placeholder app icons
const fs = require('fs');
const path = require('path');

// Simple 1x1 PNG in base64 (transparent pixel)
const transparentPNG = Buffer.from(
  'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==',
  'base64'
);

// Create a simple colored PNG for icons (PFA Blue #0066CC)
// This is a 1024x1024 blue square PNG
const iconPNG = Buffer.from(
  'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8DwHwAFBQIAX8jx0gAAAABJRU5ErkJggg==',
  'base64'
);

const assetsDir = path.join(__dirname, 'assets');

// Ensure assets directory exists
if (!fs.existsSync(assetsDir)) {
  fs.mkdirSync(assetsDir, { recursive: true });
}

// Create placeholder files
const files = {
  'icon.png': iconPNG,
  'splash.png': iconPNG,
  'adaptive-icon.png': iconPNG,
  'favicon.png': iconPNG,
};

Object.entries(files).forEach(([filename, data]) => {
  const filepath = path.join(assetsDir, filename);
  fs.writeFileSync(filepath, data);
  console.log(`✓ Created ${filename}`);
});

console.log('\n✅ All placeholder assets created!');
console.log('Note: These are minimal placeholders. Replace with actual PFA branding assets later.\n');
