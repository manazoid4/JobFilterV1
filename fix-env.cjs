const fs = require('fs');
const path = require('path');

function walk(dir, fileList = []) {
  if (!fs.existsSync(dir)) return fileList;
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const stat = fs.statSync(path.join(dir, file));
    if (stat.isDirectory()) {
      walk(path.join(dir, file), fileList);
    } else if (file.endsWith('.tsx') || file.endsWith('.ts')) {
      fileList.push(path.join(dir, file));
    }
  }
  return fileList;
}

const allFiles = [...walk('./src'), ...walk('./app')];
let count = 0;
for (const file of allFiles) {
  let content = fs.readFileSync(file, 'utf8');
  if (content.includes('import.meta.env.VITE_')) {
    content = content.replace(/import\.meta\.env\.VITE_([A-Za-z0-9_]+)/g, 'process.env.NEXT_PUBLIC_$1');
    fs.writeFileSync(file, content);
    count++;
  } else if (content.includes('import.meta.env')) {
    content = content.replace(/import\.meta\.env/g, 'process.env');
    fs.writeFileSync(file, content);
    count++;
  }
}
console.log('Fixed env vars in ' + count + ' files.');
