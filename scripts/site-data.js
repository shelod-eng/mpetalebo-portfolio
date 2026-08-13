const routes = [
  { path: '/', title: 'Executive Dashboard', nav: 'Home' },
  { path: '/platforms', title: 'Platform Ecosystem', nav: 'Platforms' },
  { path: '/platforms/evoucher', title: 'eVoucher Enterprise Platform', nav: 'eVoucher' },
  { path: '/services', title: 'Services', nav: 'Services' },
  { path: '/methodology', title: 'Methodology', nav: 'Methodology' },
  { path: '/architecture', title: 'Architecture Studio', nav: 'Architecture' },
  { path: '/architecture/gallery', title: 'Architecture Gallery', nav: 'Gallery' },
  { path: '/architecture/platform', title: 'Platform Architecture', nav: 'Platform Architecture' },
  { path: '/architecture/integration', title: 'Integration Architecture', nav: 'Integration' },
  { path: '/repository', title: 'Enterprise Repository', nav: 'Repository' },
  { path: '/repository/architecture', title: 'Repository | Architecture', nav: 'Repo Architecture' },
  { path: '/repository/apis', title: 'Repository | APIs', nav: 'Repo APIs' },
  { path: '/repository/data', title: 'Repository | Data', nav: 'Repo Data' },
  { path: '/repository/security', title: 'Repository | Security', nav: 'Repo Security' },
  { path: '/repository/infrastructure', title: 'Repository | Infrastructure', nav: 'Repo Infrastructure' },
  { path: '/repository/governance', title: 'Repository | Governance', nav: 'Repo Governance' },
  { path: '/case-studies', title: 'Case Studies', nav: 'Case Studies' },
  { path: '/case-studies/evoucher', title: 'Case Study | eVoucher Enterprise Platform', nav: 'eVoucher Case' },
  { path: '/contact', title: 'Contact', nav: 'Contact' },
];

const primaryNav = [
  ['Platforms', '/platforms'],
  ['Services', '/services'],
  ['Methodology', '/methodology'],
  ['Architecture', '/architecture'],
  ['Repository', '/repository'],
  ['Case Studies', '/case-studies'],
  ['Contact', '/contact'],
];

const platformModules = [
  ['Consumer Marketplace', 'Customer-facing discovery, purchase, voucher and support experience.'],
  ['Merchant Portal', 'Merchant operations, onboarding, product setup and commercial visibility.'],
  ['Payment', 'Controlled payment boundary prepared for provider integration and transaction traceability.'],
  ['Voucher Engine', 'Voucher issuance, expiry, redemption readiness and customer ownership.'],
  ['Billing Engine', 'Financial event visibility, ledger evidence, payout, invoice and settlement control.'],
  ['Voucher Ledger', 'Transaction tracking and controlled movement of value through the platform.'],
  ['Settlement', 'Merchant settlement flow, BankServ boundary and reconciliation posture.'],
  ['Merchant Payout', 'Payable calculation and operating evidence for merchant settlement.'],
  ['Infrastructure', 'Deployment, environment, platform health and operational readiness surface.'],
  ['Analytics', 'Executive visibility, operational dashboards and business intelligence readiness.'],
  ['Mobile', 'Mobile-first customer access and future platform interaction channels.'],
  ['USSD', 'Inclusive access channel for low-bandwidth and assisted customer journeys.'],
  ['Enterprise Repository', 'Architecture, APIs, data, security, infrastructure and governance artefacts.'],
];

const signals = [
  ['Enterprise FinTech', 'Financial platform architecture'],
  ['Platform Engineering', 'Web, backend and operational systems'],
  ['Financial Operations', 'Billing, ledger, settlement, reconciliation'],
  ['Architecture', 'Business to application to data to infrastructure'],
  ['Operational Visibility', 'Dashboards, monitoring and BI'],
  ['Enterprise Documentation', 'Architecture and technical repository'],
];

const services = [
  ['Enterprise Discovery', 'Unclear business problem or fragmented operating model.', 'Map stakeholders, processes, journeys, risks and capability gaps.', 'A clear platform direction before technical build begins.'],
  ['Enterprise Architecture', 'Systems grow without structure, ownership or integration discipline.', 'Design scalable application, data, security and operating architecture.', 'A platform blueprint that teams can build, operate and govern.'],
  ['Digital Platform Engineering', 'Business value is trapped in manual workflows or disconnected tools.', 'Engineer web, backend, API and operational platform layers.', 'A usable digital platform aligned to the business process.'],
  ['Financial Systems', 'Fragmented billing, settlement and reconciliation.', 'Design connected financial workflows with traceable events.', 'Greater financial control and operational visibility.'],
  ['Integration', 'Critical business systems do not speak to each other reliably.', 'Define integration contracts, events, APIs and control boundaries.', 'Cleaner flow of data, decisions and financial evidence.'],
  ['Business Automation', 'Teams depend on repeated manual actions and spreadsheet control.', 'Replace handoffs with governed workflows, dashboards and audit trails.', 'Better throughput, consistency and management visibility.'],
  ['Dashboard Engineering', 'Leaders cannot see operational reality quickly enough.', 'Model the data and build executive plus operational views.', 'Decision-ready visibility across platform activity.'],
];

const methodology = [
  ['Discover', 'Understand the business context and operating problem.', 'Business analysis, stakeholder discovery, process analysis, capability mapping, risk identification.', 'Business capability map, current-state assessment, future-state definition.'],
  ['Design', 'Shape the enterprise solution before delivery pressure takes over.', 'Architecture modelling, journey design, data design, integration design, security review.', 'Architecture blueprint, delivery backlog, design decisions and artefacts.'],
  ['Build', 'Engineer the platform in controlled increments.', 'Application build, APIs, data services, automation, dashboards and testable workflows.', 'Working platform components with traceable technical decisions.'],
  ['Deliver', 'Move the platform into usable operating shape.', 'Deployment, validation, user readiness, documentation and release support.', 'Released platform with known controls, owners and handover material.'],
  ['Operate', 'Keep the platform observable, improvable and evidence-led.', 'Monitoring, reconciliation, support loops, analytics and continuous improvement.', 'Operational intelligence and sustainable platform evolution.'],
];

const architectureLayers = [
  ['Business', 'Clarifies the business model, operating goals and transformation case.'],
  ['Capabilities', 'Groups what the organisation must be able to do into durable capability areas.'],
  ['Processes', 'Maps how work moves through people, systems, approvals and financial controls.'],
  ['Applications', 'Defines platform modules, portals, engines, dashboards and user surfaces.'],
  ['Data', 'Structures entities, evidence, events, reporting and decision intelligence.'],
  ['Integration', 'Connects systems using APIs, event contracts, callbacks and controlled boundaries.'],
  ['Infrastructure', 'Positions hosting, environments, deployments, observability and resilience.'],
  ['Operations', 'Turns delivery into ongoing support, monitoring, improvement and governance.'],
];

const gallery = [
  ['Platform Architecture', 'How business capability becomes modules, services and control surfaces.'],
  ['Financial Flow', 'Payment, voucher, billing, ledger, payout, settlement and reconciliation movement.'],
  ['Voucher Lifecycle', 'Issue, hold, present, redeem, audit and close the voucher journey.'],
  ['Billing Architecture', 'Billing events, ledger entries, invoices and financial evidence.'],
  ['Settlement Architecture', 'Merchant payout, settlement readiness and external banking boundary.'],
  ['Integration Architecture', 'System contracts, APIs, events, callbacks and platform interoperability.'],
  ['Data Architecture', 'Operational records, reporting models and BI-ready structure.'],
  ['Infrastructure', 'Deployment, environment, monitoring and platform operations.'],
  ['Security', 'Access control, audit, privacy and controlled administrative surfaces.'],
  ['Operations', 'Support, monitoring, reconciliation and continuous platform improvement.'],
];

const repoCategories = [
  ['Architecture', '/repository/architecture', 'Architecture principles, diagrams, decision records and platform views.'],
  ['APIs', '/repository/apis', 'API catalogues, request/response contracts and integration notes.'],
  ['Data', '/repository/data', 'Data models, event records, reporting structures and BI evidence.'],
  ['Security', '/repository/security', 'Access control, auditability, privacy posture and governance evidence.'],
  ['Infrastructure', '/repository/infrastructure', 'Deployment topology, environments, operations and monitoring evidence.'],
  ['Governance', '/repository/governance', 'Decision logs, controls, documentation standards and delivery governance.'],
];

module.exports = {
  routes,
  primaryNav,
  platformModules,
  signals,
  services,
  methodology,
  architectureLayers,
  gallery,
  repoCategories,
};
