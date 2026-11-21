// Runs after `vite build`. The page has nothing interactive, so the published HTML
// keeps only the prerendered markup and CSS: router scripts, module preloads and the
// unused JS chunks are removed from dist/client.
import { readFileSync, writeFileSync, readdirSync, rmSync } from "node:fs";

const dir = "dist/client";
const file = `${dir}/index.html`;
const html = readFileSync(file, "utf8")
  .replace(/<script\b[^>]*>[\s\S]*?<\/script>/g, "")
  .replace(/<link rel="modulepreload"[^>]*>/g, "");
writeFileSync(file, html);

for (const f of readdirSync(`${dir}/assets`)) {
  if (f.endsWith(".js")) rmSync(`${dir}/assets/${f}`);
}
console.log(`static-only: ${file} is ${html.length} bytes, no scripts`);
