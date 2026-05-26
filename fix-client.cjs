const fs = require('fs');
const path = require('path');
const dir = 'src/pages';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.tsx'));

for (const f of files) {
  const filePath = path.join(dir, f);
  let content = fs.readFileSync(filePath, 'utf8');
  let original = content;

  // Prepend "use client" if missing
  if (!content.includes('"use client"')) {
    content = '"use client";\n' + content;
  }
  
  // Safe window check for localStorage
  content = content.replace(/localStorage\.getItem\(/g, '(typeof window !== "undefined" ? localStorage : {getItem:()=>null}).getItem(');
  content = content.replace(/localStorage\.setItem\(/g, '(typeof window !== "undefined" ? localStorage : {setItem:()=>{}}).setItem(');
  content = content.replace(/localStorage\.removeItem\(/g, '(typeof window !== "undefined" ? localStorage : {removeItem:()=>{}}).removeItem(');

  if (content !== original) {
    fs.writeFileSync(filePath, content);
  }
}
console.log('Fixed localStorage references in src/pages');
