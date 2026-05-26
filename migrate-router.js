import fs from 'fs';
import path from 'path';

function processFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  let original = content;

  // Replace react-router-dom imports
  if (content.includes('react-router-dom')) {
    let newImports = [];
    if (content.includes('Link')) newImports.push("import Link from 'next/link';");
    
    let navImports = [];
    if (content.includes('useNavigate')) navImports.push('useRouter');
    if (content.includes('useLocation')) navImports.push('usePathname', 'useSearchParams');
    if (content.includes('useParams')) navImports.push('useParams');
    
    if (navImports.length > 0) {
      newImports.push(`import { ${navImports.join(', ')} } from 'next/navigation';`);
    }

    content = content.replace(/import\s+{([^}]+)}\s+from\s+['"]react-router-dom['"];?/g, (match, imports) => {
      // Return nothing here, we'll prepend new imports later if we matched Link/useNavigate/etc
      return '';
    });
    
    content = newImports.join('\n') + '\n' + content;
  }

  // Replace Link to= with Link href=
  content = content.replace(/<Link([^>]*?)\s+to=({[^}]+}|"[^"]+"|'[^']+')([^>]*?)>/g, '<Link$1 href=$2$3>');
  
  // Replace useNavigate
  content = content.replace(/useNavigate\(\)/g, 'useRouter()');

  if (content !== original) {
    fs.writeFileSync(filePath, content);
    console.log(`Updated ${filePath}`);
  }
}

function walkDir(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      walkDir(fullPath);
    } else if (fullPath.endsWith('.tsx') || fullPath.endsWith('.ts')) {
      processFile(fullPath);
    }
  }
}

walkDir(path.join(process.cwd(), 'src'));
