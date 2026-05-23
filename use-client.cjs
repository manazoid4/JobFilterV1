const fs = require('fs');
['src/components/TopNav.tsx', 'src/components/Toast.tsx', 'src/components/Footer.tsx'].forEach(f => {
  let c = fs.readFileSync(f, 'utf8');
  if (!c.includes('"use client"')) {
    fs.writeFileSync(f, '"use client";\n' + c);
  }
});
