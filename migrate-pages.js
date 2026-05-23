import fs from 'fs';
import path from 'path';

const appPath = path.join(process.cwd(), 'src', 'App.tsx');
const appContent = fs.readFileSync(appPath, 'utf8');

const routeRegex = /<Route\s+path="([^"]+)"\s+element=\{<LazyPage><([^>]+?)(?:\s+type="[^"]+")?\s*\/>(?:<\/LazyPage>)?\}\s*\/>/g;

const routes = [];
let match;
while ((match = routeRegex.exec(appContent)) !== null) {
  let routePath = match[1];
  const component = match[2];
  
  if (routePath === '*') continue; // NotFound handled separately
  
  // Clean path
  if (routePath.startsWith('/')) routePath = routePath.substring(1);
  if (routePath === '') routePath = 'page';
  
  routes.push({ routePath, component });
}

// Add the ones without LazyPage or slightly different
const routeRegex2 = /<Route\s+path="([^"]+)"\s+element=\{<([^>]+?)\s*\/>(?:<\/LazyPage>)?\}\s*\/>/g;
while ((match = routeRegex2.exec(appContent)) !== null) {
  let routePath = match[1];
  const component = match[2];
  
  if (routePath === '*' || routePath === '') continue; // skip
  if (routePath.startsWith('/')) routePath = routePath.substring(1);
  
  // Only add if not exists
  if (!routes.find(r => r.routePath === routePath)) {
    routes.push({ routePath, component });
  }
}

// Handle layout and pages
for (const { routePath, component } of routes) {
  let pageDir = path.join(process.cwd(), 'app', routePath);
  if (routePath === 'page') {
      pageDir = path.join(process.cwd(), 'app');
  }
  
  // Special dynamic routes
  if (pageDir.includes(':username')) {
    pageDir = pageDir.replace(':username', '[username]');
  }
  if (pageDir.includes(':id')) {
    pageDir = pageDir.replace(':id', '[id]');
  }
  if (pageDir.includes(':city')) {
    pageDir = pageDir.replace(':city', '[city]');
  }
  
  fs.mkdirSync(pageDir, { recursive: true });
  
  const pageFile = path.join(pageDir, 'page.tsx');
  
  // Create relative path to src/pages
  const relativeDepth = routePath === 'page' ? 1 : routePath.split('/').length + 1;
  const relativePrefix = '../'.repeat(relativeDepth) + 'src/pages/';
  
  const content = `'use client';\n\nimport { ${component} } from '${relativePrefix}${component}';\n\nexport default function Page(props: any) {\n  return <${component} {...props} />;\n}\n`;
  
  fs.writeFileSync(pageFile, content);
  console.log(`Created ${pageFile}`);
}
