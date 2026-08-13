const fs = require('fs');
const path = require('path');
const {
  routes,
  primaryNav,
  platformModules,
  signals,
  services,
  methodology,
  architectureLayers,
  gallery,
  repoCategories,
} = require('./site-data');

const root = path.resolve(__dirname, '..');
const dist = path.join(root, 'dist');

function esc(value) {
  return String(value).replace(/[&<>"']/g, (char) => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
  }[char]));
}

function asset(routePath, file) {
  const depth = routePath === '/' ? 0 : routePath.split('/').filter(Boolean).length;
  return `${'../'.repeat(depth)}${file}`;
}

function pagePath(routePath) {
  if (routePath === '/') return path.join(dist, 'index.html');
  return path.join(dist, ...routePath.split('/').filter(Boolean), 'index.html');
}

function layout(route, body) {
  const canonicalTitle = route.path === '/'
    ? 'Lebo Mpeta | Enterprise FinTech Platform Architect'
    : `${route.title} | Lebo Mpeta`;
  const nav = primaryNav.map(([label, href]) => `<a href="${href}"${route.path === href ? ' aria-current="page"' : ''}>${label}</a>`).join('');
  return `<!doctype html>
<html lang="en-ZA">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <meta name="theme-color" content="#07111f" />
  <title>${esc(canonicalTitle)}</title>
  <meta name="description" content="Lebo Mpeta enterprise portfolio for digital transformation, enterprise architecture, fintech platforms, financial systems and business intelligence." />
  <meta property="og:title" content="${esc(canonicalTitle)}" />
  <meta property="og:description" content="Turning Business Ideas into Enterprise Digital Platforms." />
  <meta property="og:type" content="website" />
  <meta property="og:locale" content="en_ZA" />
  <link rel="icon" href="${asset(route.path, 'public/favicon.svg')}" type="image/svg+xml" />
  <link rel="stylesheet" href="${asset(route.path, 'styles.css')}" />
</head>
<body>
  <header class="site-header" aria-label="Primary navigation">
    <a class="brand" href="/" aria-label="Lebo Mpeta home"><span class="brand-mark">LM</span><span><strong>Lebo Mpeta</strong><small>Enterprise FinTech Platform Architect</small></span></a>
    <nav class="desktop-nav">${nav}</nav>
    <details class="mobile-menu"><summary>Menu</summary><nav>${nav}</nav></details>
  </header>
  <main>${body}</main>
  <footer class="site-footer"><p>Lebo Mpeta | Enterprise FinTech Platform Architect</p><a href="/contact">Discuss a Project</a></footer>
</body>
</html>`;
}

function signalTable() {
  return `<div class="signal-table" role="table" aria-label="Platform signals"><div role="row" class="signal-head"><span>Signal</span><span>What it demonstrates</span></div>${signals.map(([a,b]) => `<div role="row"><strong>${esc(a)}</strong><span>${esc(b)}</span></div>`).join('')}</div>`;
}

function platformControlSurface() {
  return `<section class="control-surface" aria-labelledby="surface-title">
    <div class="surface-top"><div><p class="eyebrow">Lebo Mpeta - Enterprise Platform Architecture</p><h2 id="surface-title">Platform Signals</h2></div><a class="button compact" href="/contact">Discuss a Project</a></div>
    <div class="signal-cards"><article><span>FinTech</span><strong>Platform</strong></article><article><span>Architecture</span><strong>Enterprise FinTech</strong></article><article><span>Platform</span><strong>Engineering</strong></article></div>
    <article class="evoucher-console">
      <p class="eyebrow">Flagship Platform</p><h3>eVoucher Enterprise Platform</h3>
      <div class="flow-line"><span>Consumer</span><span>Merchant</span><span>Payment</span><span>Billing</span><span>Ledger</span></div>
      <div class="vertical-flow"><span>Settlement</span><span>Infrastructure / BI</span></div>
      <a class="button primary" href="/platforms/evoucher">Explore Platform</a>
    </article>
    <div class="surface-actions"><a href="/architecture">Architecture <span>Explore</span></a><a href="/methodology">Methodology <span>Discover to Operate</span></a><a href="/repository">Repository <span>Explore Evidence</span></a></div>
    ${signalTable()}
  </section>`;
}

function moduleGrid() {
  return `<div class="module-grid">${platformModules.map(([name, desc]) => `<a class="module-card" href="/platforms/evoucher" title="${esc(desc)}"><strong>${esc(name)}</strong><span>${esc(desc)}</span></a>`).join('')}</div>`;
}

function architecturePanel() {
  return `<section class="dashboard-panel"><div class="section-heading"><p class="eyebrow">Architecture at a Glance</p><h2>Business to operations, with every layer visible</h2><p class="section-intro">Select a layer to see how enterprise thinking moves from business intent into durable platform design.</p></div><div class="layer-stack">${architectureLayers.map(([name, desc]) => `<details><summary>${esc(name)}</summary><p>${esc(desc)}</p></details>`).join('')}</div></section>`;
}

function servicesPanel() {
  return `<section class="content-section"><div class="section-heading"><p class="eyebrow">What I Help Organisations Solve</p><h2>Consulting capability framed around business problems</h2></div><div class="problem-grid">${services.map(([title, problem, approach, outcome]) => `<article><h3>${esc(title)}</h3><dl><dt>Problem</dt><dd>${esc(problem)}</dd><dt>Approach</dt><dd>${esc(approach)}</dd><dt>Outcome</dt><dd>${esc(outcome)}</dd></dl></article>`).join('')}</div></section>`;
}

function methodologyPanel() {
  return `<section class="dashboard-panel"><div class="section-heading"><p class="eyebrow">How I Deliver</p><h2>Discover, design, build, deliver and operate</h2></div><div class="methodology-track">${methodology.map(([phase, purpose, activities, artefacts], index) => `<details class="method-card" ${index === 0 ? 'open' : ''}><summary><span>${String(index + 1).padStart(2, '0')}</span>${esc(phase)}</summary><p>${esc(purpose)}</p><small>Activities: ${esc(activities)}</small><small>Outputs: ${esc(artefacts)}</small></details>`).join('')}</div></section>`;
}

function galleryPanel(limit) {
  const items = limit ? gallery.slice(0, limit) : gallery;
  return `<section class="content-section"><div class="section-heading"><p class="eyebrow">Architecture Gallery</p><h2>Interactive architecture evidence framework</h2><p class="section-intro">Demonstration architecture views are clearly labelled and ready for verified artefacts.</p></div><div class="gallery-grid">${items.map(([title, desc], index) => `<details class="gallery-card"><summary><span>Demo View ${String(index + 1).padStart(2, '0')}</span><strong>${esc(title)}</strong></summary><div class="diagram-mini"><i></i><i></i><i></i></div><p>${esc(desc)}</p></details>`).join('')}</div></section>`;
}

function repositoryPanel() {
  return `<section class="content-section alt-section"><div class="section-heading"><p class="eyebrow">Enterprise Repository</p><h2>The evidence behind the architecture</h2><p class="section-intro">A professional knowledge centre for real documents, API catalogues, architecture decisions and operational artefacts as they are verified.</p></div><div class="repository-grid">${repoCategories.map(([title, href, desc]) => `<a class="repo-card" href="${href}"><h3>${esc(title)}</h3><p>${esc(desc)}</p><span>Open Repository Area</span></a>`).join('')}</div></section>`;
}

function caseStudyPanel(full = false) {
  const steps = ['The Challenge', 'The Discovery', 'The Architecture', 'The Platform', 'The Delivery', 'The Operations', 'The Business Outcome'];
  return `<section class="content-section"><div class="section-heading"><p class="eyebrow">Flagship Case Study</p><h2>eVoucher Enterprise Platform</h2><p class="section-intro">A verified architecture story focused on platform components, financial operations, technical delivery and operational visibility. No unverified metrics or client claims are presented.</p></div><article class="case-study"><div><h3>Architecture story</h3><p>eVoucher demonstrates how a business idea becomes an enterprise fintech platform with consumer journeys, merchant operations, payment boundaries, voucher lifecycle, billing events, ledger visibility, settlement preparation, infrastructure and analytics.</p><a class="button secondary" href="/case-studies/evoucher">Open Case Study</a></div><ol class="story-steps">${steps.map(step => `<li>${esc(step)}</li>`).join('')}</ol></article>${full ? `<div class="evidence-band"><span>Production platform</span><span>Financial operations surface</span><span>Architecture capability</span><span>Engineering evidence</span></div>` : ''}</section>`;
}

function contactPanel() {
  return `<section class="contact-section"><div><p class="eyebrow">Client Conversion</p><h2>Have a business idea, a fragmented system, or a platform that needs to be designed?</h2><p>Bring the business problem. The work starts with discovery, architecture and a practical route to delivery.</p><div class="hero-actions"><a class="button primary" href="mailto:mpetaebo@outlook.com">Let's Discuss Your Platform</a><a class="button secondary" href="tel:+27604865147">Book a Consultation</a></div></div><address><strong>Lebo Mpeta</strong><span>Enterprise FinTech Platform Architect</span><a href="tel:+27604865147">0604865147</a><a href="mailto:mpetaebo@outlook.com">mpetaebo@outlook.com</a></address></section>`;
}

function home() {
  return `<section class="hero"><div class="hero-grid"><div class="hero-copy"><p class="eyebrow">Enterprise FinTech</p><h1>Platform Architect</h1><p class="hero-lede">Designing Enterprise Digital Platforms That Power Business Growth. Turning Business Ideas into Enterprise Digital Platforms.</p><div class="hero-actions"><a class="button primary" href="/platforms">Explore My Platforms</a><a class="button secondary" href="/architecture">Explore My Architecture</a></div></div><div class="journey-panel" aria-label="Enterprise operating model"><div class="journey-orbit">${['Business Idea','Discovery','Architecture','Technical Design','Development','Deployment','Operations','Business Intelligence'].map((step, index) => `<div class="journey-step" style="--i:${index}"><span>${String(index + 1).padStart(2, '0')}</span><strong>${esc(step)}</strong></div>`).join('')}</div><div class="hero-statement">Enterprise Operating Model</div></div></div></section>${platformControlSurface()}${architecturePanel()}${servicesPanel()}${methodologyPanel()}${galleryPanel(6)}${repositoryPanel()}${caseStudyPanel()}${contactPanel()}`;
}

function standardPage(route) {
  if (route.path === '/platforms') return `${platformControlSurface()}<section class="content-section"><div class="section-heading"><p class="eyebrow">Platform Ecosystem</p><h2>Platforms as connected operating systems</h2><p class="section-intro">The platform view connects consulting, repository evidence and the eVoucher flagship case.</p></div>${moduleGrid()}</section>${contactPanel()}`;
  if (route.path === '/platforms/evoucher') return `<section class="page-hero"><p class="eyebrow">Featured Platform</p><h1>eVoucher Enterprise Platform</h1><p>Consumer, merchant, payment, voucher, billing, ledger, settlement, infrastructure and analytics surfaces presented as a fintech architecture story.</p></section><section class="content-section">${moduleGrid()}</section>${caseStudyPanel(true)}${contactPanel()}`;
  if (route.path === '/services') return `${servicesPanel()}${contactPanel()}`;
  if (route.path === '/methodology') return `${methodologyPanel()}${contactPanel()}`;
  if (route.path === '/architecture') return `${architecturePanel()}${galleryPanel(6)}${contactPanel()}`;
  if (route.path === '/architecture/gallery') return `${galleryPanel()}${contactPanel()}`;
  if (route.path === '/architecture/platform') return `<section class="page-hero"><p class="eyebrow">Architecture Studio</p><h1>Platform Architecture</h1><p>How business capability becomes modules, services, data, infrastructure and operations.</p></section>${architecturePanel()}${contactPanel()}`;
  if (route.path === '/architecture/integration') return `<section class="page-hero"><p class="eyebrow">Architecture Studio</p><h1>Integration Architecture</h1><p>APIs, events, callbacks and controlled system boundaries for enterprise platforms.</p></section>${architecturePanel()}${contactPanel()}`;
  if (route.path === '/repository') return `${repositoryPanel()}${contactPanel()}`;
  if (route.path.startsWith('/repository/')) {
    const category = repoCategories.find(([, href]) => href === route.path) || ['Repository', route.path, 'Verified artefacts will be added progressively.'];
    return `<section class="page-hero"><p class="eyebrow">Enterprise Repository</p><h1>${esc(category[0])}</h1><p>${esc(category[2])}</p><div class="evidence-band"><span>Artefacts pending verification</span><span>No fabricated documents</span><span>Knowledge centre ready</span></div></section>${repositoryPanel()}${contactPanel()}`;
  }
  if (route.path === '/case-studies') return `${caseStudyPanel()}${contactPanel()}`;
  if (route.path === '/case-studies/evoucher') return `${caseStudyPanel(true)}${architecturePanel()}${contactPanel()}`;
  if (route.path === '/contact') return contactPanel();
  return home();
}

function renderAll() {
  if (fs.existsSync(dist)) fs.rmSync(dist, { recursive: true, force: true });
  fs.mkdirSync(dist, { recursive: true });
  fs.cpSync(path.join(root, 'styles.css'), path.join(dist, 'styles.css'));
  fs.cpSync(path.join(root, 'public'), path.join(dist, 'public'), { recursive: true });
  for (const route of routes) {
    const output = pagePath(route.path);
    fs.mkdirSync(path.dirname(output), { recursive: true });
    fs.writeFileSync(output, layout(route, route.path === '/' ? home() : standardPage(route)), 'utf8');
  }
}

if (require.main === module) renderAll();
module.exports = { renderAll, routes, dist, pagePath };
