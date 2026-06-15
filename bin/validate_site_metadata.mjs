import { readFile, readdir } from "node:fs/promises";
import path from "node:path";

const siteRoot = path.resolve("_site");
const requiredPages = [
  { path: "index.html", label: "home", mustInclude: [/"@type"\s*:\s*"Person"/, /"@type"\s*:\s*"ProfilePage"/] },
  { path: "cv/index.html", label: "cv", mustInclude: [/"@type"\s*:\s*"WebPage"/] },
  { path: "projects/index.html", label: "projects", mustInclude: [/"@type"\s*:\s*"WebPage"/] },
  { path: "research/index.html", label: "research", mustInclude: [/"@type"\s*:\s*"WebPage"/] },
  { path: "publications/index.html", label: "publications", mustInclude: [/"@type"\s*:\s*"WebPage"/] },
  { path: "teaching/index.html", label: "teaching", mustInclude: [/"@type"\s*:\s*"WebPage"/] },
];

function extractMeta(html, name) {
  const match = html.match(new RegExp(`<meta[^>]+name=["']${name}["'][^>]+content=["']([^"']+)["']`, "i"));
  return match ? match[1].trim() : "";
}

function extractCanonical(html) {
  const match = html.match(/<link[^>]+rel=["']canonical["'][^>]+href=["']([^"']+)["']/i);
  return match ? match[1].trim() : "";
}

async function listHtmlFiles(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...(await listHtmlFiles(fullPath)));
    } else if (entry.isFile() && entry.name.endsWith(".html")) {
      files.push(fullPath);
    }
  }
  return files;
}

const failures = [];

for (const page of requiredPages) {
  const fullPath = path.join(siteRoot, page.path);
  const html = await readFile(fullPath, "utf8");
  const description = extractMeta(html, "description");
  const canonical = extractCanonical(html);
  const hasJsonLd = html.includes('type="application/ld+json"');

  if (!description || description === "." || description.length < 40) {
    failures.push(`${page.label}: weak or missing meta description`);
  }
  if (!canonical) {
    failures.push(`${page.label}: missing canonical URL`);
  }
  if (!hasJsonLd) {
    failures.push(`${page.label}: missing JSON-LD block`);
  }
  for (const requiredPattern of page.mustInclude) {
    if (!requiredPattern.test(html)) {
      failures.push(`${page.label}: JSON-LD missing ${requiredPattern}`);
    }
  }
}

const htmlFiles = await listHtmlFiles(siteRoot);
for (const file of htmlFiles) {
  const relativePath = path.relative(siteRoot, file);
  if (relativePath.startsWith("assets/")) continue;
  if (/^google.*\.html$/i.test(relativePath)) continue;
  const html = await readFile(file, "utf8");
  const description = extractMeta(html, "description");
  if (!description || description === ".") {
    failures.push(`${relativePath}: missing non-placeholder description`);
  }
}

if (failures.length > 0) {
  console.error("Metadata validation failed:");
  for (const failure of failures) {
    console.error(`- ${failure}`);
  }
  process.exit(1);
}

console.log(`Metadata validation passed for ${requiredPages.length} required pages and ${htmlFiles.length} HTML files.`);
