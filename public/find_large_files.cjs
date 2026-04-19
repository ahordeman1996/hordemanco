const fs = require('fs');
const path = require('path');

function getFiles(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    file = path.join(dir, file);
    const stat = fs.statSync(file);
    if (stat && stat.isDirectory()) {
      results = results.concat(getFiles(file));
    } else {
      results.push({ file, size: stat.size });
    }
  });
  return results;
}

const files = getFiles('.');
files.sort((a,b) => b.size - a.size);
files.slice(0, 15).forEach(f => console.log(`${f.file}: ${(f.size/1024/1024).toFixed(2)} MB`));
