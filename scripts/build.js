const fs = require("fs");
const path = require("path");

const root = path.resolve(__dirname, "..");
const dist = path.join(root, "dist");
if (fs.existsSync(dist)) fs.rmSync(dist, { recursive: true, force: true });
fs.mkdirSync(dist, { recursive: true });

for (const item of ["index.html", "styles.css", "public"]) {
  const src = path.join(root, item);
  const dest = path.join(dist, item === "public" ? "public" : item);
  fs.cpSync(src, dest, { recursive: true });
}

console.log("Build complete: dist/ is ready for Vercel.");
