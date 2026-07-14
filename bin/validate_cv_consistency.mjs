import { readFile } from "node:fs/promises";

const resume = JSON.parse(await readFile("assets/json/resume.json", "utf8"));
const cv = await readFile("_data/cv.yml", "utf8");
const config = await readFile("_config.yml", "utf8");
const failures = [];

const expectedName = `${config.match(/^first_name:\s*(.+)$/m)?.[1].trim() ?? ""} ${config.match(/^last_name:\s*(.+)$/m)?.[1].trim() ?? ""}`.trim();
const cvEmail = cv.match(/^\s+- name: Email\n\s+value: (.+)$/m)?.[1].trim();
const cvWebsite = cv.match(/^\s+- name: Website\n\s+value: (.+)$/m)?.[1].trim();
const siteUrl = config.match(/^url:\s*(\S+)/m)?.[1].trim();

if (resume.basics?.name !== expectedName) failures.push(`resume name does not match _config.yml: ${resume.basics?.name}`);
if (resume.basics?.email !== cvEmail) failures.push(`resume email does not match _data/cv.yml: ${resume.basics?.email}`);
if (resume.basics?.url?.replace(/\/$/, "") !== siteUrl?.replace(/\/$/, "")) {
  failures.push(`resume URL does not match _config.yml: ${resume.basics?.url}`);
}

for (const publication of resume.publications ?? []) {
  if (!cv.includes(publication.name)) failures.push(`publication missing from _data/cv.yml: ${publication.name}`);
}

if (!cvWebsite || !cvWebsite.includes(resume.basics?.url.replace(/\/$/, ""))) {
  failures.push(`website is missing or inconsistent in _data/cv.yml: ${cvWebsite ?? "missing"}`);
}

if (failures.length) {
  console.error("CV consistency validation failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("CV consistency validation passed.");
