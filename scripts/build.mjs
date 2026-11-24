// Copies site/ to dist/. If SITE_URL is set (for example https://nadiarhee.com),
// it replaces https://example.com in the canonical link, social tags, robots.txt and sitemap.
// No dependencies: plain Node.js.
import { cpSync, rmSync, readFileSync, writeFileSync } from "node:fs";

const src = new URL("../site/", import.meta.url);
const out = new URL("../dist/", import.meta.url);
const siteUrl = (process.env.SITE_URL || "").replace(/\/$/, "");

rmSync(out, { recursive: true, force: true });
cpSync(src, out, { recursive: true });

if (siteUrl) {
  for (const file of ["index.html", "robots.txt", "sitemap.xml"]) {
    const path = new URL(file, out);
    writeFileSync(path, readFileSync(path, "utf8").replaceAll("https://example.com", siteUrl));
  }
}

console.log(`Built dist/${siteUrl ? ` for ${siteUrl}` : ""}`);
