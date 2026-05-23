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

const allFiles = walk('./src/pages');
let modifiedCount = 0;

for (const file of allFiles) {
  let content = fs.readFileSync(file, 'utf8');
  let original = content;

  // Prepend use client
  if (!content.includes('"use client"')) {
    content = '"use client";\n' + content;
  }

  // Replace react-router-dom imports
  content = content.replace(/import\s+\{([^}]*)\}\s+from\s+['"]react-router-dom['"];?/g, (match, imports) => {
    let nextNavigation = [];
    let nextLink = false;
    if (imports.includes('useNavigate')) nextNavigation.push('useRouter');
    if (imports.includes('useLocation')) nextNavigation.push('usePathname');
    if (imports.includes('useParams')) nextNavigation.push('useParams');
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
  content = content.replace(/const\s+navigate\s*=\s*useNavigate\(\)/g, 'const router = useRouter()');
  content = content.replace(/navigate\(/g, 'router.push(');
  content = content.replace(/const\s+location\s*=\s*useLocation\(\)/g, 'const pathname = usePathname()');
  content = content.replace(/location\.pathname/g, 'pathname');
  content = content.replace(/const\s+\[searchParams\]\s*=\s*useSearchParams\(\)/g, 'const searchParams = useSearchParams()');
  content = content.replace(/searchParams\.get/g, 'searchParams?.get');

  // Params destructuring
  content = content.replace(/const\s+\{\s*([^=\}]+)\s*=\s*([^}]+)\s*\}\s*=\s*useParams(?:<[^>]+>)?\(\);/g, 'const params = useParams();\n  const $1 = (params?.$1 as string) || $2;');
  content = content.replace(/const\s+\{\s*([^}]+)\s*\}\s*=\s*useParams(?:<[^>]+>)?\(\);/g, 'const params = useParams();\n  const $1 = (params?.$1 as string);');

  // Replace NavLink with Link
  content = content.replace(/<NavLink([^>]*?)to=/g, '<Link$1href=');
  content = content.replace(/<\/NavLink>/g, '</Link>');
  
  // Replace Link to= with Link href=
  content = content.replace(/<Link([^>]*?)to=/g, '<Link$1href=');

  if (content !== original) {
    fs.writeFileSync(file, content);
    modifiedCount++;
  }
}

console.log('Replaced router imports in ' + modifiedCount + ' files.');
