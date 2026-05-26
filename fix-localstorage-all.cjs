const fs = require('fs');
const path = require('path');

const dir = 'src/pages';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.tsx'));

for (const f of files) {
  const filePath = path.join(dir, f);
  let content = fs.readFileSync(filePath, 'utf8');
  let original = content;

  // Safe localStorage wrapper
  content = content.replace(/localStorage\.getItem\((.*?)\)/g, '(typeof window !== "undefined" ? localStorage.getItem($1) : null)');
  content = content.replace(/localStorage\.setItem\((.*?)\)/g, '(typeof window !== "undefined" ? localStorage.setItem($1) : undefined)');
  content = content.replace(/localStorage\.removeItem\((.*?)\)/g, '(typeof window !== "undefined" ? localStorage.removeItem($1) : undefined)');

  if (content !== original) {
    fs.writeFileSync(filePath, content);
  }
}
console.log('Fixed localStorage references.');
