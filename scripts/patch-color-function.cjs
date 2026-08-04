// Cross-platform postinstall patch (replaces a Unix-only `sed` command).
// html2canvas/html2pdf.js throw on some modern CSS color functions
// (e.g. oklch/lab) during PDF export; this neutralizes that throw so
// exports don't hard-fail on unsupported color functions.
const fs = require("fs");
const path = require("path");

const targets = [
  "node_modules/html2pdf.js/dist/html2pdf.bundle.js",
  "node_modules/html2pdf.js/dist/html2pdf.bundle.min.js",
  "node_modules/html2canvas/dist/html2canvas.js",
  "node_modules/html2canvas/dist/html2canvas.esm.js",
];

const searchValue = 'throw new Error("Attempting to parse an unsupported color function \\"" + value.name + "\\"")';
const replaceValue = "return 0";

for (const rel of targets) {
  const filePath = path.join(process.cwd(), rel);
  try {
    if (!fs.existsSync(filePath)) continue;
    const original = fs.readFileSync(filePath, "utf8");
    if (!original.includes(searchValue)) continue;
    const patched = original.split(searchValue).join(replaceValue);
    fs.writeFileSync(filePath, patched, "utf8");
    console.log(`[postinstall] patched ${rel}`);
  } catch (err) {
    // Never fail the install over this cosmetic patch.
    console.warn(`[postinstall] skipped ${rel}: ${err.message}`);
  }
}
