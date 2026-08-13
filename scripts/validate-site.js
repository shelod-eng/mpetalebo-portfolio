const fs = require("fs");
const path = require("path");

const root = path.resolve(__dirname, "..");
const required = ["index.html", "styles.css", "public/favicon.svg"];
const failures = [];

for (const file of required) {
  if (!fs.existsSync(path.join(root, file))) failures.push(`Missing required file: ${file}`);
}

const html = fs.readFileSync(path.join(root, "index.html"), "utf8");
const css = fs.readFileSync(path.join(root, "styles.css"), "utf8");

const requiredText = [
  "Lebo Mpeta",
  "Enterprise FinTech Platform Architect",
  "Featured Platforms",
  "Enterprise Repository",
  "Architecture Gallery",
  "eVoucher Enterprise Platform",
  "mpetaebo@outlook.com",
  "0604865147",
];

for (const text of requiredText) {
  if (!html.includes(text)) failures.push(`Missing required content: ${text}`);
}

const forbidden = ["Lorem ipsum", "award-winning", "certified", "government client", "testimonial"];
for (const text of forbidden) {
  if (html.toLowerCase().includes(text.toLowerCase())) failures.push(`Unsupported or placeholder claim found: ${text}`);
}

const anchorTargets = [...html.matchAll(/href="#([^"]+)"/g)].map((match) => match[1]);
for (const target of anchorTargets) {
  if (!html.includes(`id="${target}"`)) failures.push(`Broken in-page link target: #${target}`);
}

if (!css.includes("@media")) failures.push("Responsive media queries are missing.");
if (!html.includes("<main")) failures.push("Semantic main landmark is missing.");
if (!html.includes("<nav")) failures.push("Semantic navigation is missing.");
if (!html.includes("aria-label")) failures.push("Accessible labels are missing.");

if (failures.length) {
  console.error("Portfolio validation failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("Portfolio validation passed.");
