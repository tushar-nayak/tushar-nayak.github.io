import { readFile, readdir, stat } from "node:fs/promises";
import path from "node:path";

const siteRoot = path.resolve("_site");
const siteOrigin = "https://tushar-nayak.github.io";
const htmlCache = new Map();

function isExternalHref(href) {
  return /^(https?:)?\/\//i.test(href) || /^(mailto|tel|javascript):/i.test(href);
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

async function fileExists(filePath) {
  try {
    await stat(filePath);
    return true;
  } catch {
    return false;
  }
}

function extractHrefs(html) {
  return [...html.matchAll(/<a\b[^>]*href=(["'])(.*?)\1/gi)].map((match) => match[2].trim());
}

function extractIds(html) {
  const ids = new Set();
  for (const match of html.matchAll(/\bid=(["'])(.*?)\1/gi)) {
    ids.add(match[2]);
  }
  for (const match of html.matchAll(/\bname=(["'])(.*?)\1/gi)) {
    ids.add(match[2]);
  }
  return ids;
}

async function getHtmlInfo(filePath) {
  if (!htmlCache.has(filePath)) {
    const html = await readFile(filePath, "utf8");
    htmlCache.set(filePath, { html, ids: extractIds(html), hrefs: extractHrefs(html) });
  }
  return htmlCache.get(filePath);
}

function resolveTargetPath(fromFile, pathname) {
  if (!pathname || pathname === "/") {
    return path.join(siteRoot, "index.html");
  }

  const normalized = pathname.startsWith("/") ? pathname.slice(1) : path.join(path.relative(siteRoot, path.dirname(fromFile)), pathname);
  const cleanPath = path.normalize(path.join(siteRoot, normalized));

  if (!cleanPath.startsWith(siteRoot)) {
    return null;
  }

  if (path.extname(cleanPath)) {
    return cleanPath;
  }

  return path.join(cleanPath, "index.html");
}

const failures = [];
const htmlFiles = await listHtmlFiles(siteRoot);

for (const file of htmlFiles) {
  const relativeFile = path.relative(siteRoot, file);
  if (relativeFile.startsWith("assets/")) continue;
  const { hrefs, ids } = await getHtmlInfo(file);

  for (const rawHref of hrefs) {
    if (!rawHref || isExternalHref(rawHref)) continue;

    let url;
    try {
      url = new URL(rawHref, `${siteOrigin}/${relativeFile}`);
    } catch {
      failures.push(`${relativeFile}: invalid href '${rawHref}'`);
      continue;
    }

    if (url.origin !== siteOrigin) continue;

    if (!url.pathname || url.pathname === "") {
      if (url.hash) {
        const anchor = decodeURIComponent(url.hash.slice(1));
        if (!ids.has(anchor)) {
          failures.push(`${relativeFile}: missing in-page anchor '${rawHref}'`);
        }
      }
      continue;
    }

    const targetFile = resolveTargetPath(file, url.pathname);
    if (!targetFile || !(await fileExists(targetFile))) {
      failures.push(`${relativeFile}: missing target '${rawHref}'`);
      continue;
    }

    if (url.hash) {
      const anchor = decodeURIComponent(url.hash.slice(1));
      const targetInfo = await getHtmlInfo(targetFile);
      if (!targetInfo.ids.has(anchor)) {
        failures.push(`${relativeFile}: missing anchor '${anchor}' in ${path.relative(siteRoot, targetFile)}`);
      }
    }
  }
}

if (failures.length > 0) {
  console.error("Internal link validation failed:");
  for (const failure of failures) {
    console.error(`- ${failure}`);
  }
  process.exit(1);
}

console.log(`Internal link validation passed for ${htmlFiles.length} HTML files.`);
