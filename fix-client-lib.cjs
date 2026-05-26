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

const allFiles = [...walk('./src/lib'), ...walk('./src/components')];

for (const f of allFiles) {
  let content = fs.readFileSync(f, 'utf8');
  let original = content;

  // Safe window check for localStorage
  content = content.replace(/localStorage\.getItem\(/g, '(typeof window !== "undefined" ? localStorage : {getItem:()=>null}).getItem(');
  content = content.replace(/localStorage\.setItem\(/g, '(typeof window !== "undefined" ? localStorage : {setItem:()=>{}}).setItem(');
  content = content.replace(/localStorage\.removeItem\(/g, '(typeof window !== "undefined" ? localStorage : {removeItem:()=>{}}).removeItem(');

  if (content !== original) {
    fs.writeFileSync(f, content);
  }
}
console.log('Fixed localStorage references in src/lib and src/components');
