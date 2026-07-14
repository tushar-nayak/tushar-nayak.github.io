import { access, readFile, readdir } from "node:fs/promises";
import path from "node:path";

const projectsRoot = path.resolve("_projects");
const failures = [];
const seenUrls = new Map();

function frontMatter(content, file) {
  const match = content.match(/^---\n([\s\S]*?)\n---/);
  if (!match) {
    failures.push(`${file}: missing front matter`);
    return {};
  }

  const values = {};
  for (const line of match[1].split("\n")) {
    const field = line.match(/^([A-Za-z0-9_]+):\s*(.*)$/);
    if (field) values[field[1]] = field[2].trim().replace(/^['"]|['"]$/g, "");
  }
  return values;
}

async function fileExists(relativePath) {
  try {
    await access(path.resolve(relativePath));
    return true;
  } catch {
    return false;
  }
}

const files = (await readdir(projectsRoot)).filter((file) => file.endsWith(".md")).sort();

for (const file of files) {
  const relativeFile = path.join("_projects", file);
  const values = frontMatter(await readFile(path.join(projectsRoot, file), "utf8"), relativeFile);

  if (!values.img) {
    failures.push(`${relativeFile}: missing project thumbnail (img)`);
  } else if (!/^(https?:)?\/\//i.test(values.img) && !(await fileExists(values.img))) {
    failures.push(`${relativeFile}: thumbnail does not exist: ${values.img}`);
  }

  for (const field of ["github", "website", "report"]) {
    const url = values[field];
    if (!url) continue;
    const normalized = url.replace(/\/$/, "");
    if (seenUrls.has(normalized)) {
      failures.push(`${relativeFile}: ${field} duplicates ${seenUrls.get(normalized)}: ${url}`);
    } else {
      seenUrls.set(normalized, `${relativeFile} ${field}`);
    }
  }
}

if (failures.length) {
  console.error("Project metadata validation failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log(`Project metadata validation passed for ${files.length} projects.`);
