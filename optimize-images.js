const sharp = require('sharp');
const fs = require('fs');
const path = require('path');
const https = require('https');
const http = require('http');

const imgDir = path.join(__dirname, 'assets', 'img');

// Converter PNGs para WebP
async function convertPngToWebp() {
  const pngFiles = [
    path.join(imgDir, 'leak_cta.png'),
    path.join(imgDir, 'leak_friction.png'),
    path.join(imgDir, 'leak_trust.png'),
    path.join(imgDir, 'harmon-and-vale', 'mockup-1.png'),
    path.join(imgDir, 'harmon-and-vale', 'mockup-2.png'),
    path.join(imgDir, 'harmon-and-vale', 'mockup-3.png'),
  ];

  for (const file of pngFiles) {
    if (fs.existsSync(file)) {
      const webpPath = file.replace('.png', '.webp');
      await sharp(file)
        .webp({ quality: 85 })
        .toFile(webpPath);
      console.log(`Converted: ${path.basename(file)} -> ${path.basename(webpPath)}`);
    }
  }
}

// Baixar imagem do Unsplash
function downloadImage(url, filepath) {
  return new Promise((resolve, reject) => {
    const protocol = url.startsWith('https') ? https : http;
    protocol.get(url, (response) => {
      if (response.statusCode === 200) {
        const fileStream = fs.createWriteStream(filepath);
        response.pipe(fileStream);
        fileStream.on('finish', () => {
          fileStream.close();
          resolve(filepath);
        });
      } else {
        reject(new Error(`Failed to download: ${response.statusCode}`));
      }
    }).on('error', reject);
  });
}

// Otimizar imagens do Unsplash
async function optimizeUnsplashImages() {
  const unsplashDir = path.join(imgDir, 'unsplash');
  if (!fs.existsSync(unsplashDir)) {
    fs.mkdirSync(unsplashDir, { recursive: true });
  }

  const unsplashUrls = [
    { url: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&q=80', name: 'photo-1550751827.webp' },
    { url: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=800&q=80', name: 'photo-1550745165.webp' },
    { url: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57f58b?w=800&q=80', name: 'photo-1618005182.webp' },
    { url: 'https://images.unsplash.com/photo-1614729939124-032f0b56c9ce?w=800&q=80', name: 'photo-1614729939.webp' },
    { url: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=900&q=85', name: 'photo-1551288049.webp' },
    { url: 'https://images.unsplash.com/photo-1507925921958-8a62f3d1a50d?w=900&q=85', name: 'photo-1507925921.webp' },
    { url: 'https://images.unsplash.com/photo-1545670723-196ed0954986?w=900&q=85', name: 'photo-1545670723.webp' },
    { url: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=900&q=85', name: 'photo-1519389950.webp' },
    { url: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=1600&q=85', name: 'photo-1497366216.webp' },
  ];

  for (const { url, name } of unsplashUrls) {
    const tempPath = path.join(unsplashDir, name.replace('.webp', '.tmp'));
    const finalPath = path.join(unsplashDir, name);
    
    if (!fs.existsSync(finalPath)) {
      try {
        console.log(`Downloading: ${name}`);
        await downloadImage(url, tempPath);
        
        // Otimizar com Sharp
        await sharp(tempPath)
          .webp({ quality: 85 })
          .toFile(finalPath);
        
        fs.unlinkSync(tempPath);
        console.log(`Optimized: ${name}`);
      } catch (err) {
        console.error(`Error processing ${name}:`, err.message);
      }
    } else {
      console.log(`Already exists: ${name}`);
    }
  }
}

async function main() {
  console.log('Starting image optimization...');
  await convertPngToWebp();
  await optimizeUnsplashImages();
  console.log('Done!');
}

main().catch(console.error);
