const fs = require('fs');
const path = require('path');
const { renderAll, routes, dist, pagePath } = require('./render-site');

renderAll();

const failures = [];
const requiredRoutes = [
  '/', '/platforms', '/platforms/evoucher', '/services', '/methodology', '/architecture',
  '/architecture/gallery', '/architecture/platform', '/architecture/integration', '/repository',
  '/repository/architecture', '/repository/apis', '/repository/data', '/repository/security',
  '/repository/infrastructure', '/repository/governance', '/case-studies', '/case-studies/evoucher', '/contact',
];

for (const route of requiredRoutes) {
  if (!routes.some((item) => item.path === route)) failures.push(`Route not configured: ${route}`);
  if (!fs.existsSync(pagePath(route))) failures.push(`Route not generated: ${route}`);
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
const forbidden = ['Lorem ipsum', 'award-winning', 'certified', 'government client', 'testimonial', 'revenue:', 'users:', 'transactions:', 'uptime:', '99.9%', '120k', '10,000'];

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
    if (link.startsWith('mailto:') || link.startsWith('tel:') || link.startsWith('http') || link.startsWith('#')) continue;
    if (link.endsWith('.css') || link.endsWith('.svg') || link.endsWith('.js')) continue;
    const clean = link.replace(/\/$/, '') || '/';
    if (!routeSet.has(clean)) failures.push(`Broken internal link in ${path.relative(dist, file)}: ${link}`);
  }
}

const home = fs.readFileSync(path.join(dist, 'index.html'), 'utf8');
for (const text of [
  'Enterprise Platform Command Centre',
  'Enter through the operating model',
  'Discover',
  'Design',
  'Build',
  'Deliver',
  'Operate',
  'A working example of how business requirements become an integrated enterprise digital platform.',
  'Billing Engine',
  'Controls and records financial billing activity across the platform.',
  'Responsibilities',
  'Integration Relationships',
  'Related Area',
  'How Value Moves Through The Platform',
  'Architecture Layers',
  'Engineering Evidence',
  'Enterprise Thinking',
  'Illustrative platform flow, not live production metrics.',
]) {
  if (!home.includes(text)) failures.push(`Homepage missing required V3 content: ${text}`);
}

const css = fs.readFileSync(path.join(dist, 'styles.css'), 'utf8');
for (const text of ['@media', 'prefers-reduced-motion', '.command-centre', '.platform-visual', '.flow-path', '.module-inspector', '.value-node', '.layer-button', ':hover']) {
  if (!css.includes(text)) failures.push(`CSS missing required V3 support: ${text}`);
}

const js = fs.readFileSync(path.join(dist, 'app.js'), 'utf8');
for (const text of ['data-command', 'data-module', 'data-journey', 'data-layer-name', 'prefers-reduced-motion']) {
  if (!js.includes(text)) failures.push(`Interaction script missing required behavior: ${text}`);
}

if (failures.length) {
  console.error('Portfolio validation failed:');
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log(`Portfolio validation passed for ${requiredRoutes.length} routes and V4 Phase 2A interactive checks.`);


