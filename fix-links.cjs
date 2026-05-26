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
for (const file of allFiles) {
  let content = fs.readFileSync(file, 'utf8');
  let original = content;

  // If next/link is used, change to= to href= inside <Link ...>
  if (content.includes('next/link')) {
    content = content.replace(/<Link([^>]*?)to=/g, '<Link$1href=');
  }

  if (content !== original) {
    fs.writeFileSync(file, content);
  }
}
