const fs = require('fs');
const path = require('path');
const file = 'src/pages/DevPortalPage.tsx';
let c = fs.readFileSync(file, 'utf8');
c = c.replace(/localStorage\.getItem/g, '(typeof window !== "undefined" ? localStorage.getItem.bind(localStorage) : () => null)');
c = c.replace(/localStorage\.setItem/g, '(typeof window !== "undefined" ? localStorage.setItem.bind(localStorage) : () => null)');
c = c.replace(/localStorage\.removeItem/g, '(typeof window !== "undefined" ? localStorage.removeItem.bind(localStorage) : () => null)');
fs.writeFileSync(file, c);
