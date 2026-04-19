import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const PUBLIC_DIR = path.resolve('public', 'images');

export async function compressImages() {
  const getFiles = (dir) => {
    let results = [];
    const list = fs.readdirSync(dir);
    list.forEach(file => {
      file = path.join(dir, file);
      const stat = fs.statSync(file);
      if (stat && stat.isDirectory()) {
        results = results.concat(getFiles(file));
      } else {
        results.push(file);
      }
    });
    return results;
  };

  const files = getFiles(PUBLIC_DIR);
  
  for (const file of files) {
    if (file.toLowerCase().endsWith('.png') || file.toLowerCase().endsWith('.jpg')) {
      const stats = fs.statSync(file);
      if (stats.size > 200 * 1024) { // over 200KB
        console.log(`Compressing ${file} (${(stats.size/1024/1024).toFixed(2)} MB)`);
        const newFile = file.replace(/\.(png|jpg|jpeg)$/i, '.webp');
        await sharp(file)
          .webp({ quality: 75 })
          .toFile(newFile);
        
        console.log(`Created ${newFile}, deleting original...`);
        fs.unlinkSync(file);
      }
    }
  }
}

compressImages().then(() => console.log('Done compression.')).catch(console.error);
