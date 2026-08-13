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

const commandCentre = [
  ['discover', 'Discover', 'Understand the business before designing the platform.', ['Business Discovery', 'Stakeholders', 'Business Processes', 'Requirements', 'User Journeys', 'Business Problems', 'Success Criteria'], 'A clear business problem, operating context and decision path.'],
  ['design', 'Design', 'Convert business understanding into enterprise architecture.', ['Enterprise Architecture', 'Solution Design', 'Data Architecture', 'Integration', 'Security', 'Financial Controls'], 'A platform blueprint that shows systems, data, controls and responsibilities.'],
  ['build', 'Build', 'Engineer the digital platform as connected business capability.', ['Web', 'Mobile', 'APIs', 'Business Automation', 'Financial Systems', 'Platform Engineering'], 'Working platform components aligned to the architecture.'],
  ['deliver', 'Deliver', 'Move the platform into a usable, supportable operating state.', ['Testing', 'CI/CD', 'Cloud', 'Deployment', 'Training', 'Knowledge Transfer'], 'A released platform with controls, handover and operational readiness.'],
  ['operate', 'Operate', 'Keep the platform visible, governed and improving.', ['Monitoring', 'Support', 'Governance', 'Analytics', 'Business Intelligence', 'Continuous Improvement'], 'Ongoing visibility into performance, support, improvement and business intelligence.'],
];

const signals = [
  ['Enterprise FinTech', 'Financial platform architecture'],
  ['Platform Engineering', 'Web, backend and operational systems'],
  ['Financial Operations', 'Billing, ledger, settlement, reconciliation'],
  ['Architecture', 'Business to application to data to infrastructure'],
  ['Operational Visibility', 'Dashboards, monitoring and BI'],
  ['Enterprise Documentation', 'Architecture and technical repository'],
  ['Evidence', 'Repository, documentation and deployment pipeline'],
];

const platformModules = [
  ['consumer-marketplace', 'Consumer Marketplace', 'Consumer', 'Experience Layer', 'Customer-facing discovery, purchase, voucher and support experience.', 'Customers need a clear path from product discovery to usable voucher value.', ['Product discovery', 'Purchase journey', 'Voucher presentation', 'Customer support context'], ['Payment', 'Voucher Engine', 'Mobile'], 'Consumer journey, voucher purchase flow and platform experience design.', '/platforms/evoucher'],
  ['merchant-portal', 'Merchant Portal', 'Merchant', 'Operations Layer', 'Merchant onboarding, product setup, branch context and commercial visibility.', 'Merchants need a controlled operating surface for participation in the platform.', ['Merchant setup', 'Product configuration', 'Branch context', 'Operational visibility'], ['Consumer Marketplace', 'Billing Engine', 'Analytics'], 'Merchant operations, catalogue configuration and branch-aware platform logic.', '/platforms/evoucher'],
  ['payment', 'Payment', 'Financial', 'Financial Boundary', 'Controlled payment transaction creation and traceable reference propagation.', 'A purchase must create evidence that can continue through voucher, billing and reconciliation.', ['Payment status', 'Transaction reference', 'Provider boundary', 'Purchase evidence'], ['Consumer Marketplace', 'Voucher Engine', 'Billing Engine'], 'Payment transaction reference, controlled provider boundary and lifecycle trace.', '/architecture/integration'],
  ['voucher-engine', 'Voucher Engine', 'Platform', 'Application Layer', 'Voucher creation, ownership, expiry and redemption readiness.', 'Purchased value must become controlled, auditable voucher value.', ['Voucher issue', 'Customer ownership', 'Expiry readiness', 'Redemption preparation'], ['Payment', 'Billing Engine', 'Consumer Marketplace'], 'Voucher lifecycle, customer voucher record and redemption preparation.', '/architecture/platform'],
  ['billing-engine', 'Billing Engine', 'Financial', 'Financial Systems', 'Controls and records financial billing activity across the platform.', 'How does the platform maintain visibility and control over financial activity as transactions move through multiple stages?', ['Billing events', 'Financial records', 'Transaction traceability', 'Reconciliation support'], ['Payment', 'Voucher Engine', 'Ledger', 'Settlement'], 'Architecture, technical design, repository structure and documentation evidence for billing events, ledger, payout, invoice, settlement and reconciliation visibility.', '/case-studies/evoucher'],
  ['ledger', 'Ledger', 'Financial', 'Financial Control Layer', 'Traceable movement of voucher value through controlled accounting-style entries.', 'Value movement must remain explainable after the customer and merchant experience completes.', ['Debit and credit evidence', 'Transaction linkage', 'Voucher liability view', 'Audit support'], ['Billing Engine', 'Settlement', 'Analytics'], 'Ledger entries tied to transaction references and billing events.', '/repository/data'],
  ['payout', 'Payout', 'Financial', 'Financial Operations Layer', 'Merchant payable calculation and payout evidence.', 'Merchants need confidence that financial outcomes are controlled and auditable.', ['Merchant payable value', 'Invoice linkage', 'Payout readiness', 'Finance review'], ['Ledger', 'Settlement', 'Billing Engine'], 'Merchant payout records and invoice linkage.', '/repository/data'],
  ['settlement', 'Settlement', 'Financial', 'Financial Operations Layer', 'Settlement calculation and preparation for merchant-facing financial closure.', 'Completed transactions need a path toward payable settlement evidence.', ['Settlement amount', 'Settlement status', 'Banking boundary', 'Review evidence'], ['Payout', 'Reconciliation', 'Ledger'], 'Settlement records, payout preparation and external banking boundary.', '/architecture/platform'],
  ['reconciliation', 'Reconciliation', 'Financial', 'Control Layer', 'Lifecycle consistency review across payment, voucher, billing, ledger and settlement.', 'Finance needs to identify mismatches without hiding uncertainty.', ['Exception visibility', 'Lifecycle comparison', 'Control review', 'Audit support'], ['Billing Engine', 'Ledger', 'Settlement', 'Analytics'], 'Reconciliation exception structure and lifecycle evidence.', '/repository/data'],
  ['infrastructure', 'Infrastructure', 'Infrastructure', 'Infrastructure Layer', 'Deployment, environment, operational readiness and platform health surface.', 'A platform must be observable and deployable, not only coded.', ['Deployment readiness', 'Environment setup', 'Monitoring posture', 'Operational support'], ['GitHub Actions', 'Vercel', 'Monitoring'], 'Vercel deployment, GitHub Actions and infrastructure dashboard direction.', '/repository/infrastructure'],
  ['analytics', 'Analytics', 'Insight', 'Business Intelligence Layer', 'Executive visibility, operating insight and decision support.', 'Leaders need to understand platform behavior without reading raw system records.', ['Dashboard views', 'Trend visibility', 'Operational reporting', 'Decision support'], ['Ledger', 'Reconciliation', 'Infrastructure'], 'Dashboard engineering, lifecycle reporting and BI-ready data thinking.', '/architecture/gallery'],
  ['mobile', 'Mobile', 'Channels', 'Experience Layer', 'Mobile-first access for customers and operational users.', 'Platform access must fit real user contexts beyond desktop administration.', ['Mobile channel', 'Customer access', 'Future interaction path'], ['Consumer Marketplace', 'Payment', 'Voucher Engine'], 'Mobile application channel represented in the platform ecosystem.', '/platforms/evoucher'],
  ['ussd', 'USSD', 'Channels', 'Inclusive Access Layer', 'Low-bandwidth access channel for assisted and inclusive customer journeys.', 'Fintech platforms must account for customers who cannot depend on rich web access.', ['USSD menus', 'Low-bandwidth journey', 'Assisted access', 'Inclusive design'], ['Consumer Marketplace', 'Payment', 'Voucher Engine'], 'USSD journey architecture and assisted access channel planning.', '/architecture/integration'],
  ['enterprise-repository', 'Enterprise Repository', 'Knowledge', 'Evidence Layer', 'Architecture, APIs, data, security, infrastructure and governance artefacts.', 'Enterprise platforms need durable knowledge, not undocumented heroics.', ['Architecture evidence', 'Technical documentation', 'Governance records', 'Implementation artefacts'], ['Architecture', 'Documentation', 'Governance'], 'Repository routes, artefact placeholders and documentation governance model.', '/repository'],
  ['documentation', 'Documentation', 'Knowledge', 'Evidence Layer', 'Structured knowledge that supports handover, governance and future delivery.', 'A platform cannot remain sustainable if knowledge exists only in memory.', ['Technical notes', 'Architecture records', 'Operational handover', 'Governance evidence'], ['Enterprise Repository', 'Architecture', 'Operations'], 'Documentation framework and repository categories.', '/repository/governance'],
];

const valueJourney = [
  ['Consumer', 'A person starts with a need or buying intent.', 'Identify the customer journey and access context.', 'No financial movement yet; intent is captured.', 'Marketplace'],
  ['Marketplace', 'The customer discovers participating merchant value.', 'Present product, merchant and offer context.', 'Commercial terms are visible before payment.', 'Payment'],
  ['Payment', 'The customer commits to purchasing value.', 'Create a traceable payment transaction reference.', 'Payment status controls whether voucher value may be issued.', 'Voucher'],
  ['Voucher', 'Purchased value becomes a controlled voucher.', 'Issue voucher value to the customer record.', 'Voucher liability and commercial context become traceable.', 'Billing'],
  ['Billing', 'The commercial transaction becomes financial evidence.', 'Record billing events and connect the transaction lifecycle.', 'Billing activity is visible for finance review.', 'Ledger'],
  ['Ledger', 'Value movement can be audited.', 'Record accounting-style entries tied to the transaction.', 'Debit and credit movement becomes explainable.', 'Payout'],
  ['Payout', 'Merchant payable value is prepared.', 'Calculate payout evidence from platform activity.', 'Merchant financial outcome is linked back to source records.', 'Settlement'],
  ['Settlement', 'The platform prepares financial closure.', 'Create settlement evidence and external banking boundary context.', 'Settlement amount and status become reviewable.', 'Reconciliation'],
  ['Reconciliation', 'Finance validates consistency across the lifecycle.', 'Surface exceptions and lifecycle mismatches for review.', 'Control gaps can be identified without hiding uncertainty.', 'Analytics'],
  ['Analytics', 'Leadership gains visibility into platform behavior.', 'Turn operational records into business intelligence.', 'Financial activity supports decision-ready reporting.', 'Continuous Improvement'],
];

const architectureLayers = [
  ['Business', 'Business model, stakeholders, user journeys, success criteria and transformation purpose.', ['Consumer Marketplace', 'Merchant Portal', 'Enterprise Repository']],
  ['Channel', 'Web, mobile and USSD access paths that connect users to the platform.', ['Consumer Marketplace', 'Mobile', 'USSD']],
  ['Application', 'Platform modules, services and workflow engines that run the operating model.', ['Voucher Engine', 'Merchant Portal', 'APIs', 'Business Services']],
  ['Financial', 'Payment, billing, ledger, payout, settlement and reconciliation control.', ['Payment', 'Billing Engine', 'Ledger', 'Payout', 'Settlement', 'Reconciliation']],
  ['Data', 'Transaction, voucher, customer, billing and settlement records that remain traceable.', ['Ledger', 'Analytics', 'Business Intelligence']],
  ['Integration', 'APIs, callbacks, events and external service boundaries.', ['Payment', 'APIs', 'USSD', 'Enterprise Repository']],
  ['Infrastructure', 'Deployment, monitoring, environments and operational readiness.', ['Infrastructure', 'Deployment', 'Monitoring']],
  ['Security', 'Access, audit, privacy and controlled administrative surfaces.', ['Governance', 'Documentation', 'Repository']],
];

const gallery = [
  ['Platform Architecture', 'Application', 'How business capability becomes modules, services and control surfaces.', '/architecture/platform'],
  ['Financial Architecture', 'Financial Operations', 'Payment, voucher, billing, ledger, payout, settlement and reconciliation movement.', '/case-studies/evoucher'],
  ['Integration Architecture', 'Integration', 'System contracts, APIs, events, callbacks and platform interoperability.', '/architecture/integration'],
  ['Data Architecture', 'Data', 'Operational records, evidence, reporting models and BI-ready structure.', '/repository/data'],
  ['Infrastructure Architecture', 'Infrastructure', 'Deployment, environment, monitoring and platform operations.', '/repository/infrastructure'],
  ['Security Architecture', 'Security', 'Access control, audit, privacy and controlled administrative surfaces.', '/repository/security'],
  ['Operations Architecture', 'Operations', 'Support, monitoring, reconciliation and continuous platform improvement.', '/repository/governance'],
];

const services = [
  ['Fragmented Systems', 'Your business operates across disconnected systems.', 'Integrated enterprise platforms, APIs, data flows, financial workflows and operational dashboards.', 'A coherent platform direction that joins business activity together.'],
  ['Enterprise Architecture', 'Delivery starts before the operating model is understood.', 'Discovery, capability mapping, architecture decisions, data and integration design.', 'Clarity before development begins.'],
  ['Digital Platform Engineering', 'Teams need more than a website; they need an operating platform.', 'Web applications, backend services, APIs, automation and dashboards.', 'A platform that supports real workflows.'],
  ['Financial Systems', 'Billing, settlement and reconciliation are fragmented or opaque.', 'Traceable financial events, ledger thinking, payout flows and invoice visibility.', 'Greater financial control and operational confidence.'],
  ['Integration', 'Critical systems do not speak to each other reliably.', 'API contracts, events, callbacks and external system boundaries.', 'Cleaner data movement and fewer hidden handoffs.'],
  ['Business Automation', 'Manual processes slow teams down and hide risk.', 'Workflow automation, approvals, audit trails and operational control surfaces.', 'More consistent execution and better visibility.'],
  ['Dashboard Engineering', 'Leadership cannot see operational reality quickly enough.', 'Executive dashboards, operational views, BI structure and evidence-led reporting.', 'Decision-ready visibility across platform activity.'],
];

const methodology = [
  ['Discover', 'Understand the business context and operating problem.', 'Business analysis, stakeholder discovery, process mapping, capability mapping.', 'Business capability map and current-state assessment.'],
  ['Design', 'Shape the enterprise solution before delivery pressure takes over.', 'Architecture, user journeys, data, integration and security.', 'Architecture blueprint and delivery backlog.'],
  ['Build', 'Engineer the platform in controlled increments.', 'Platform engineering, APIs, applications and automation.', 'Working platform components with traceable technical decisions.'],
  ['Deliver', 'Move the platform into usable operating shape.', 'Deployment, testing, training and documentation.', 'Released platform with known controls and handover material.'],
  ['Operate', 'Keep the platform observable, improvable and evidence-led.', 'Monitoring, support, analytics and continuous improvement.', 'Operational intelligence and sustainable platform evolution.'],
];

const repoCategories = [
  ['Architecture', '/repository/architecture', 'Architecture principles, diagrams, decision records and platform views.', ['Platform architecture overview', 'Decision records in development', 'Architecture diagrams being prepared']],
  ['APIs', '/repository/apis', 'API catalogues, request/response contracts and integration notes.', ['API catalogue in development', 'Integration contracts being prepared', 'Webhook documentation placeholder']],
  ['Data', '/repository/data', 'Data models, event records, reporting structures and BI evidence.', ['Transaction lifecycle model', 'Voucher and billing data view', 'BI model in development']],
  ['Security', '/repository/security', 'Access control, auditability, privacy posture and governance evidence.', ['Access control overview', 'Audit trail model', 'Security notes being prepared']],
  ['Infrastructure', '/repository/infrastructure', 'Deployment topology, environments, operations and monitoring evidence.', ['Vercel deployment pipeline', 'Environment model in development', 'Monitoring view placeholder']],
  ['Governance', '/repository/governance', 'Decision logs, controls, documentation standards and delivery governance.', ['Documentation standards', 'Review controls in development', 'Operational governance notes']],
];

const evidence = [
  ['Live eVoucher Platform', 'Production platform surface', 'https://www.evoucher.co.za'],
  ['Billing Engine', 'Financial operations and lifecycle visibility', '/case-studies/evoucher'],
  ['Voucher Ledger', 'Transaction tracking and financial control evidence', '/repository/data'],
  ['Infrastructure Dashboard', 'Platform operations design direction', '/repository/infrastructure'],
  ['GitHub Repository', 'Portfolio deployment and CI evidence', 'https://github.com/shelod-eng/mpetalebo-portfolio'],
  ['Architecture Diagrams', 'Architecture gallery and repository framework', '/architecture/gallery'],
  ['Deployment Pipeline', 'GitHub Actions and Vercel production deployment', 'https://github.com/shelod-eng/mpetalebo-portfolio/actions'],
];

const thinking = [
  'Technology should not simply automate a process. It should improve how the business operates.',
  'Architecture should create clarity before development begins.',
  'Financial systems require traceability, control and reconciliation.',
  'Operational visibility is part of platform design.',
  'Documentation is part of engineering.',
];

module.exports = {
  routes,
  primaryNav,
  commandCentre,
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
};
