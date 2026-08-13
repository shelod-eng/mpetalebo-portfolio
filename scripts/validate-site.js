const fs = require('fs');
const path = require('path');
const { renderAll, routes, dist, pagePath } = require('./render-site');

renderAll();

const failures = [];
const requiredRoutes = [
  '/',
  '/platforms',
  '/platforms/evoucher',
  '/services',
  '/methodology',
  '/architecture',
  '/architecture/gallery',
  '/architecture/platform',
  '/architecture/integration',
  '/repository',
  '/repository/architecture',
  '/repository/apis',
  '/repository/data',
  '/repository/security',
  '/repository/infrastructure',
  '/repository/governance',
  '/case-studies',
  '/case-studies/evoucher',
  '/contact',
];

for (const route of requiredRoutes) {
  if (!routes.some((item) => item.path === route)) failures.push(`Route not configured: ${route}`);
  const file = pagePath(route);
  if (!fs.existsSync(file)) failures.push(`Route not generated: ${route}`);
}

const htmlFiles = [];
function walk(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full);
    if (entry.isFile() && entry.name === 'index.html') htmlFiles.push(full);
  }
}
walk(dist);

const routeSet = new Set(requiredRoutes);
const forbidden = [
  'Lorem ipsum',
  'award-winning',
  'certified',
  'government client',
  'testimonial',
  'revenue:',
  'users:',
  'transactions:',
  'uptime:',
];

for (const file of htmlFiles) {
  const html = fs.readFileSync(file, 'utf8');
  for (const text of ['Lebo Mpeta', 'Enterprise FinTech Platform Architect']) {
    if (!html.includes(text)) failures.push(`${path.relative(dist, file)} missing ${text}`);
  }
  for (const text of forbidden) {
    if (html.toLowerCase().includes(text.toLowerCase())) failures.push(`Unsupported claim or fake metric found in ${path.relative(dist, file)}: ${text}`);
  }
  const links = [...html.matchAll(/href="([^"]+)"/g)].map((match) => match[1]);
  for (const link of links) {
    if (link.startsWith('mailto:') || link.startsWith('tel:') || link.startsWith('http')) continue;
    if (link.startsWith('#')) continue;
    const clean = link.replace(/\/$/, '') || '/';
    if (!routeSet.has(clean) && !link.endsWith('.css') && !link.endsWith('.svg')) {
      failures.push(`Broken internal link in ${path.relative(dist, file)}: ${link}`);
    }
  }
}

const home = fs.readFileSync(path.join(dist, 'index.html'), 'utf8');
for (const text of [
  'Platform Signals',
  'eVoucher Enterprise Platform',
  'Architecture at a Glance',
  'What I Help Organisations Solve',
  'How I Deliver',
  'Enterprise Repository',
  'Have a business idea',
]) {
  if (!home.includes(text)) failures.push(`Homepage missing required V2 content: ${text}`);
}

const css = fs.readFileSync(path.join(dist, 'styles.css'), 'utf8');
if (!css.includes('@media')) failures.push('Responsive media queries are missing.');
if (!css.includes('.mobile-menu')) failures.push('Mobile menu styles are missing.');
if (!css.includes(':hover')) failures.push('Hover states are missing.');
if (!css.includes('details')) failures.push('Interactive details panel styles are missing.');

if (failures.length) {
  console.error('Portfolio validation failed:');
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log(`Portfolio validation passed for ${requiredRoutes.length} routes.`);
