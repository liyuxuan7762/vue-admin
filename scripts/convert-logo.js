const sharp = require('sharp');
const path = require('path');

sharp(path.join(__dirname, '../src/assets/logo.svg'))
  .resize(128, 128)
  .png()
  .toFile(path.join(__dirname, '../src/assets/logo.png'))
  .then(() => console.log('Logo converted successfully!'))
  .catch(err => console.error('Error converting logo:', err)); 