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
let modifiedCount = 0;

for (const file of allFiles) {
  let content = fs.readFileSync(file, 'utf8');
  let original = content;

  // Replace react-router-dom imports
  content = content.replace(/import\s+\{([^}]*)\}\s+from\s+['"]react-router-dom['"];?/g, (match, imports) => {
    let nextNavigation = [];
    let nextLink = false;
    if (imports.includes('useNavigate')) nextNavigation.push('useRouter');
    if (imports.includes('useLocation')) nextNavigation.push('usePathname');
    if (imports.includes('useSearchParams')) nextNavigation.push('useSearchParams');
    if (imports.includes('Link') || imports.includes('NavLink')) nextLink = true;

    let res = '';
    if (nextNavigation.length > 0) {
      res += `import { ${nextNavigation.join(', ')} } from 'next/navigation';\n`;
    }
    if (nextLink) {
      res += `import Link from 'next/link';\n`;
    }
    return res;
  });

  // Replace hooks
  content = content.replace(/useNavigate\(\)/g, 'useRouter()');
  content = content.replace(/useLocation\(\)/g, 'usePathname()');
  // Next.js usePathname returns a string, while useLocation returns an object with .pathname
  // So location.pathname -> pathname
  content = content.replace(/location\.pathname/g, 'pathname');

  // Replace NavLink with Link
  content = content.replace(/<NavLink/g, '<Link');
  content = content.replace(/<\/NavLink>/g, '</Link>');

  if (content !== original) {
    // If we added next/navigation hooks, make sure "use client"; is at the top
    if (content.includes('next/navigation') && !content.includes('"use client"')) {
      content = '"use client";\n\n' + content;
    }
    fs.writeFileSync(file, content);
    modifiedCount++;
  }
}

console.log('Replaced router imports in ' + modifiedCount + ' files.');
