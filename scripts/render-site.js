const fs = require('fs');
const path = require('path');
const {
  routes,
  primaryNav,
  signals,
  platformModules,
  valueJourney,
  architectureLayers,
  gallery,
  services,
  methodology,
  repoCategories,
  evidence,
  thinking,
} = require('./site-data');

const root = path.resolve(__dirname, '..');
const dist = path.join(root, 'dist');

function esc(value) {
  return String(value).replace(/[&<>"']/g, (char) => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
  }[char]));
}

function attr(value) {
  return esc(JSON.stringify(value));
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
<body data-route="${esc(route.path)}">
  <header class="site-header" aria-label="Primary navigation">
    <a class="brand" href="/" aria-label="Lebo Mpeta home"><span class="brand-mark">LM</span><span><strong>Lebo Mpeta</strong><small>Enterprise FinTech Platform Architect</small></span></a>
    <nav class="desktop-nav">${nav}</nav>
    <details class="mobile-menu"><summary>Menu</summary><nav>${nav}</nav></details>
  </header>
  <main class="page-shell">${body}</main>
  <footer class="site-footer"><p>Lebo Mpeta | Enterprise FinTech Platform Architect</p><a href="/contact">Discuss a Project</a></footer>
  <script src="${asset(route.path, 'app.js')}" defer></script>
</body>
</html>`;
}

function sectionHeading(eyebrow, title, intro = '') {
  return `<div class="section-heading"><p class="eyebrow">${esc(eyebrow)}</p><h2>${esc(title)}</h2>${intro ? `<p class="section-intro">${esc(intro)}</p>` : ''}</div>`;
}

function signalTable() {
  return `<div class="signal-table" role="table" aria-label="Platform signals"><div role="row" class="signal-head"><span>Signal</span><span>What it demonstrates</span></div>${signals.map(([a,b]) => `<div role="row"><strong>${esc(a)}</strong><span>${esc(b)}</span></div>`).join('')}</div>`;
}

function platformMap() {
  const primary = ['Consumer Marketplace', 'Payment', 'Voucher Engine', 'Billing Engine', 'Voucher Ledger', 'Settlement', 'Merchant Payout', 'Infrastructure'];
  return `<div class="platform-visual" aria-label="Illustrative eVoucher platform flow">
    <svg class="flow-svg" viewBox="0 0 900 520" role="img" aria-label="Illustrative platform flow from consumer to infrastructure">
      <defs><linearGradient id="flowStroke" x1="0" x2="1"><stop offset="0" stop-color="#16d9c7"/><stop offset="1" stop-color="#62a8ff"/></linearGradient></defs>
      <path class="flow-path" d="M450 45 L450 105 L450 165 L450 225 M450 225 L260 300 L260 375 M450 225 L640 300 L640 375 M260 375 L450 450 M640 375 L450 450" />
      <circle class="flow-dot dot-one" r="6"/><circle class="flow-dot dot-two" r="6"/><circle class="flow-dot dot-three" r="6"/>
    </svg>
    <div class="map-node consumer">Consumer</div>
    ${primary.map((name) => {
      const item = platformModules.find((mod) => mod.name === name);
      return `<button class="map-node module ${esc(item.id)}" type="button" data-module='${attr(item)}' aria-label="Inspect ${esc(item.name)}">${esc(item.name)}</button>`;
    }).join('')}
    <div class="map-branch analytics">Analytics</div><div class="map-branch merchant">Merchant Portal</div>
    <p class="flow-caption">Illustrative platform flow, not live production metrics.</p>
  </div>`;
}

function moduleInspector() {
  const billing = platformModules.find((item) => item.id === 'billing-engine');
  return `<aside class="module-inspector" aria-live="polite">
    <p class="eyebrow">Selected Module</p>
    <h3 data-inspector="name">${esc(billing.name)}</h3>
    <dl>
      <dt>Purpose</dt><dd data-inspector="purpose">${esc(billing.purpose)}</dd>
      <dt>Architecture Layer</dt><dd data-inspector="layer">${esc(billing.layer)}</dd>
      <dt>Business Problem</dt><dd data-inspector="problem">${esc(billing.problem)}</dd>
      <dt>Evidence</dt><dd data-inspector="evidence">${esc(billing.evidence)}</dd>
    </dl>
    <a class="button secondary" data-inspector="href" href="${billing.href}">Drill into Evidence</a>
  </aside>`;
}

function platformControlSurface() {
  return `<section class="control-surface" aria-labelledby="surface-title">
    <div class="surface-top"><div><p class="eyebrow">Lebo Mpeta - Enterprise Platform Architecture</p><h2 id="surface-title">Enterprise Platform Control Surface</h2></div><a class="button compact" href="/contact">Discuss a Project</a></div>
    <div class="signal-cards"><article><span>FinTech</span><strong>Platform</strong></article><article><span>Architecture</span><strong>Enterprise Design</strong></article><article><span>Platform</span><strong>Engineering</strong></article><article><span>Financial</span><strong>Systems</strong></article></div>
    <div class="platform-workbench">${platformMap()}${moduleInspector()}</div>
    <div class="surface-actions"><a href="/architecture">Architecture <span>Explore</span></a><a href="/methodology">Methodology <span>Discover to Operate</span></a><a href="/repository">Repository <span>Explore Evidence</span></a></div>
    ${signalTable()}
  </section>`;
}

function moduleGrid() {
  return `<div class="module-grid">${platformModules.map((item) => `<button class="module-card" type="button" data-module='${attr(item)}' title="${esc(item.purpose)}"><strong>${esc(item.name)}</strong><small>${esc(item.layer)}</small><span>${esc(item.purpose)}</span></button>`).join('')}</div>${moduleInspector()}`;
}

function valueJourneyPanel() {
  const first = valueJourney[0];
  return `<section class="dashboard-panel value-panel"><div>${sectionHeading('How Value Moves Through The Platform', 'Business, system, data, finance and operations in one trace', 'Move through the illustrative journey to see what each step creates and controls.')}
    <div class="value-workbench"><div class="journey-steps" role="tablist" aria-label="Platform value journey">${valueJourney.map((step, index) => `<button type="button" role="tab" class="journey-button${index === 0 ? ' is-active' : ''}" data-journey='${attr(step)}'><span>${String(index + 1).padStart(2, '0')}</span>${esc(step[0])}</button>`).join('')}</div>
    <article class="journey-detail" aria-live="polite"><p class="eyebrow">Illustrative platform flow</p><h3 data-journey-panel="event">${esc(first[0])}</h3><dl><dt>System Component</dt><dd data-journey-panel="component">${esc(first[1])}</dd><dt>Financial Control</dt><dd data-journey-panel="control">${esc(first[2])}</dd><dt>Data Created</dt><dd data-journey-panel="data">${esc(first[3])}</dd><dt>Operational Result</dt><dd data-journey-panel="result">${esc(first[4])}</dd></dl></article></div></div></section>`;
}

function architecturePanel() {
  const first = architectureLayers[0];
  return `<section class="dashboard-panel architecture-explorer"><div>${sectionHeading('Architecture Layer Explorer', 'Click a layer to understand how the platform behaves', 'The architecture view moves from business context to application, data, integration, infrastructure and operations.')}
    <div class="layer-workbench"><div class="layer-buttons" role="tablist" aria-label="Architecture layers">${architectureLayers.map(([name, desc, key], index) => `<button type="button" role="tab" class="layer-button${index === 0 ? ' is-active' : ''}" data-layer-name="${esc(name)}" data-layer-desc="${esc(desc)}" data-tier="${esc(key)}">${esc(name)}</button>`).join('')}</div>
    <article class="layer-detail" aria-live="polite"><p class="eyebrow">Selected Architecture Layer</p><h3 data-layer-panel="name">${esc(first[0])}</h3><p data-layer-panel="desc">${esc(first[1])}</p><a class="button secondary" href="/architecture/gallery">Explore Architecture Gallery</a></article></div></div></section>`;
}

function servicesPanel() {
  return `<section class="content-section"><div>${sectionHeading('What I Help Organisations Solve', 'Client problems first, technology second', 'Each capability is framed around the business pain, the architecture response and the operating result.')}</div><div class="problem-grid">${services.map(([title, problem, approach, outcome]) => `<article><p class="eyebrow">Client Problem</p><h3>${esc(title)}</h3><dl><dt>Problem</dt><dd>${esc(problem)}</dd><dt>I help design</dt><dd>${esc(approach)}</dd><dt>Outcome</dt><dd>${esc(outcome)}</dd></dl><a class="text-link" href="/services">Explore this capability</a></article>`).join('')}</div></section>`;
}

function methodologyPanel() {
  return `<section class="dashboard-panel"><div>${sectionHeading('How I Deliver', 'Discover -> Design -> Build -> Deliver -> Operate', 'Each stage is interactive and shows purpose, activities and artefacts.')}</div><div class="methodology-track">${methodology.map(([phase, purpose, activities, artefacts], index) => `<details class="method-card" ${index === 0 ? 'open' : ''}><summary><span>${String(index + 1).padStart(2, '0')}</span>${esc(phase)}</summary><p>${esc(purpose)}</p><small>Activities: ${esc(activities)}</small><small>Outputs: ${esc(artefacts)}</small></details>`).join('')}</div></section>`;
}

function galleryPanel(limit) {
  const items = limit ? gallery.slice(0, limit) : gallery;
  return `<section class="content-section"><div>${sectionHeading('Architecture Gallery', 'Visual artefacts that explain how the platform works', 'Each card has a preview, architecture layer, concise purpose and route to a deeper view.')}</div><div class="gallery-grid">${items.map(([title, layer, desc, href], index) => `<a class="gallery-card visual-card" href="${href}"><span>Artefact ${String(index + 1).padStart(2, '0')}</span><div class="diagram-mini"><i></i><i></i><i></i></div><strong>${esc(title)}</strong><small>${esc(layer)}</small><p>${esc(desc)}</p></a>`).join('')}</div></section>`;
}

function repositoryPanel() {
  return `<section class="content-section alt-section"><div>${sectionHeading('Enterprise Repository', 'The evidence behind the architecture', 'A professional knowledge centre for verified documents, API catalogues, architecture decisions and operational artefacts.')}</div><div class="repository-grid">${repoCategories.map(([title, href, desc, artefacts]) => `<a class="repo-card" href="${href}"><h3>${esc(title)}</h3><p>${esc(desc)}</p><small>${esc(artefacts[0])}</small><span>Open Repository Area</span></a>`).join('')}</div></section>`;
}

function repositoryDetail(routePath) {
  const category = repoCategories.find(([, href]) => href === routePath) || repoCategories[0];
  return `<section class="page-hero"><p class="eyebrow">Enterprise Repository</p><h1>${esc(category[0])}</h1><p>${esc(category[2])}</p><div class="evidence-band"><span>Artefacts pending verification</span><span>No fabricated documents</span><span>Knowledge centre ready</span></div></section><section class="content-section"><div>${sectionHeading('Repository Area', `${category[0]} evidence`, 'This page is structured for real artefacts as they are prepared and verified.')}</div><div class="repository-grid">${category[3].map((item) => `<article class="repo-card"><h3>${esc(item)}</h3><p>Documentation being prepared. This placeholder marks the intended evidence location without fabricating a completed artefact.</p><span>Artefact in development</span></article>`).join('')}</div></section>${repositoryPanel()}${contactPanel()}`;
}

function evidencePanel() {
  return `<section class="content-section evidence-section"><div>${sectionHeading('Engineering Evidence', 'Proof of capability without fake metrics', 'The portfolio uses verified platform surfaces, architecture evidence and deployment pipeline links. Sensitive production information is not exposed.')}</div><div class="evidence-grid">${evidence.map(([title, desc, href]) => `<a class="evidence-card" href="${href}"><span>Evidence</span><h3>${esc(title)}</h3><p>${esc(desc)}</p></a>`).join('')}</div></section>`;
}

function thinkingPanel() {
  return `<section class="dashboard-panel thinking-panel"><div>${sectionHeading('Enterprise Thinking', 'How Lebo thinks about platforms', 'Short executive principles that guide discovery, architecture, delivery and operations.')}</div><div class="thinking-grid">${thinking.map((item) => `<blockquote>${esc(item)}</blockquote>`).join('')}</div></section>`;
}

function caseStudyPanel(full = false) {
  const steps = ['The Business Challenge', 'Discovery', 'Business Model', 'Platform Architecture', 'Consumer Experience', 'Merchant Experience', 'Financial Operations', 'Billing', 'Ledger', 'Settlement', 'Infrastructure', 'Business Intelligence'];
  return `<section class="content-section"><div>${sectionHeading('Flagship Case Study', 'eVoucher Enterprise Platform', 'A verified architecture story focused on system thinking, financial operations and enterprise delivery. No unverified metrics or client claims are presented.')}</div><article class="case-study"><div><h3>System thinking, not a website build</h3><p>eVoucher demonstrates how a business idea becomes an enterprise fintech platform with connected consumer, merchant, payment, voucher, billing, ledger, settlement, infrastructure and analytics concerns.</p><a class="button secondary" href="/case-studies/evoucher">Open Case Study</a></div><ol class="story-steps">${steps.map(step => `<li>${esc(step)}</li>`).join('')}</ol></article>${full ? `<div class="evidence-band"><span>Production platform</span><span>Financial operations surface</span><span>Architecture capability</span><span>Engineering evidence</span></div>` : ''}</section>`;
}

function contactPanel() {
  return `<section class="contact-section"><div><p class="eyebrow">Client Conversion</p><h2>Have a business problem? Need to design a digital platform? Need to connect fragmented systems? Need better financial operations?</h2><p>Bring the business problem. The work starts with discovery, architecture and a practical route to delivery.</p><div class="hero-actions"><a class="button primary" href="mailto:mpetaebo@outlook.com">Start a Conversation</a><a class="button secondary" href="tel:+27604865147">Book a Consultation</a></div></div><address><strong>Lebo Mpeta</strong><span>Enterprise FinTech Platform Architect</span><a href="tel:+27604865147">0604865147</a><a href="mailto:mpetaebo@outlook.com">mpetaebo@outlook.com</a></address></section>`;
}

function home() {
  const steps = ['Business Idea','Discovery','Architecture','Technical Design','Development','Deployment','Operations','Business Intelligence'];
  return `<section class="hero"><div class="hero-grid"><div class="hero-copy"><p class="eyebrow">Enterprise FinTech</p><h1>Platform Architect</h1><p class="hero-lede">Designing Enterprise Digital Platforms That Power Business Growth. Turning Business Ideas into Enterprise Digital Platforms.</p><div class="hero-actions"><a class="button primary" href="/platforms">Explore My Platforms</a><a class="button secondary" href="/architecture">Explore My Architecture</a></div></div><div class="journey-panel" aria-label="Enterprise operating model"><div class="journey-orbit">${steps.map((step, index) => `<div class="journey-step" style="--i:${index}"><span>${String(index + 1).padStart(2, '0')}</span><strong>${esc(step)}</strong></div>`).join('')}</div><div class="hero-statement">Enterprise Operating Model</div></div></div></section>${platformControlSurface()}${valueJourneyPanel()}${architecturePanel()}${servicesPanel()}${methodologyPanel()}${galleryPanel(6)}${repositoryPanel()}${evidencePanel()}${thinkingPanel()}${caseStudyPanel()}${contactPanel()}`;
}

function standardPage(route) {
  if (route.path === '/platforms') return `${platformControlSurface()}<section class="content-section"><div>${sectionHeading('Platform Ecosystem', 'Platforms as connected operating systems', 'Click modules to understand their purpose, architecture layer, business problem and evidence path.')}</div>${moduleGrid()}</section>${valueJourneyPanel()}${evidencePanel()}${contactPanel()}`;
  if (route.path === '/platforms/evoucher') return `<section class="page-hero"><p class="eyebrow">Featured Platform</p><h1>eVoucher Enterprise Platform</h1><p>Consumer, merchant, payment, voucher, billing, ledger, settlement, infrastructure and analytics surfaces presented as a fintech architecture story.</p></section>${platformControlSurface()}${valueJourneyPanel()}${caseStudyPanel(true)}${contactPanel()}`;
  if (route.path === '/services') return `${servicesPanel()}${thinkingPanel()}${contactPanel()}`;
  if (route.path === '/methodology') return `${methodologyPanel()}${thinkingPanel()}${contactPanel()}`;
  if (route.path === '/architecture') return `${architecturePanel()}${galleryPanel(6)}${evidencePanel()}${contactPanel()}`;
  if (route.path === '/architecture/gallery') return `${galleryPanel()}${architecturePanel()}${contactPanel()}`;
  if (route.path === '/architecture/platform') return `<section class="page-hero"><p class="eyebrow">Architecture Detail View</p><h1>Platform Architecture</h1><p>Purpose, business context, components, data flow, integration, security considerations, operations and related repository artefacts.</p><a class="button secondary" href="/repository/architecture">Explore technical detail</a></section>${platformControlSurface()}${architecturePanel()}${contactPanel()}`;
  if (route.path === '/architecture/integration') return `<section class="page-hero"><p class="eyebrow">Architecture Detail View</p><h1>Integration Architecture</h1><p>APIs, events, callbacks and controlled system boundaries for enterprise platforms.</p><a class="button secondary" href="/repository/apis">Explore technical detail</a></section>${architecturePanel()}${contactPanel()}`;
  if (route.path === '/repository') return `${repositoryPanel()}${evidencePanel()}${contactPanel()}`;
  if (route.path.startsWith('/repository/')) return repositoryDetail(route.path);
  if (route.path === '/case-studies') return `${caseStudyPanel()}${evidencePanel()}${contactPanel()}`;
  if (route.path === '/case-studies/evoucher') return `${caseStudyPanel(true)}${valueJourneyPanel()}${architecturePanel()}${evidencePanel()}${contactPanel()}`;
  if (route.path === '/contact') return contactPanel();
  return home();
}

function renderAll() {
  if (fs.existsSync(dist)) fs.rmSync(dist, { recursive: true, force: true });
  fs.mkdirSync(dist, { recursive: true });
  fs.cpSync(path.join(root, 'styles.css'), path.join(dist, 'styles.css'));
  fs.cpSync(path.join(root, 'public'), path.join(dist, 'public'), { recursive: true });
  fs.cpSync(path.join(root, 'app.js'), path.join(dist, 'app.js'));
  for (const route of routes) {
    const output = pagePath(route.path);
    fs.mkdirSync(path.dirname(output), { recursive: true });
    fs.writeFileSync(output, layout(route, route.path === '/' ? home() : standardPage(route)), 'utf8');
  }
}

if (require.main === module) renderAll();
module.exports = { renderAll, routes, dist, pagePath };
