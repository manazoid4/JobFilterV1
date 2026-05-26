const fs = require('fs');
const path = require('path');
const appDir = 'C:\\Users\\manaz\\Desktop\\JobFilter\\JobFilterV1\\app';

function getFiles(dir, fileList = []) {
  if(!fs.existsSync(dir)) return fileList;
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const stat = fs.statSync(path.join(dir, file));
    if (stat.isDirectory()) {
      fileList = getFiles(path.join(dir, file), fileList);
    } else if (file.endsWith('page.tsx')) {
      fileList.push(path.join(dir, file));
    }
  }
  return fileList;
}

const files = getFiles(appDir);
let fixedCount = 0;

for (const file of files) {
  if(file.includes('layout.tsx')) continue;
  let content = fs.readFileSync(file, 'utf8');
  
  // Calculate correct depth
  const depth = file.split(path.sep).length - appDir.split(path.sep).length;
  let prefix = '../src/pages';
  if (depth === 2) prefix = '../../src/pages';
  if (depth === 3) prefix = '../../../src/pages';

  // regex to match: import { PageName } from 'some/path/src/pages/PageName'
  // or import PageName from 'some/path/src/pages/PageName'
  
  const match = content.match(/import\s+(?:\{\s*([A-Za-z0-9_]+)\s*\}|([A-Za-z0-9_]+))\s+from\s+['"].*?\/src\/pages\/([^'"]+)['"]/);
  if (match) {
    const pageName = match[1] || match[2];
    const targetFile = match[3];
    const newImport = `import { ${pageName} } from '${prefix}/${targetFile}';`;
    content = content.replace(/import\s+.*from\s+['"].*?\/src\/pages\/[^'"]+['"];?/, newImport);
    fs.writeFileSync(file, content);
    fixedCount++;
  }
}
console.log('Fixed ' + fixedCount + ' app files.');
