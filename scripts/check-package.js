import assert from "node:assert/strict";
import { readFileSync, statSync } from "node:fs";

const root = new URL("../", import.meta.url);
const read = (path) => readFileSync(new URL(path, root), "utf8");

const manifest = JSON.parse(read("hacs.json"));
assert.ok(typeof manifest.name === "string" && manifest.name.trim());
const moduleName = manifest.filename ?? "ziggo-modem-card.js";
assert.equal(moduleName, "ziggo-modem-card.js");
assert.ok(statSync(new URL(`dist/${moduleName}`, root)).isFile());

const modemImage = readFileSync(new URL("dist/ziggo-modem-device.webp", root));
assert.equal(modemImage.toString("ascii", 8, 12), "WEBP");
const screenshot = readFileSync(new URL("docs/ziggo-modem-neon.png", root));
assert.equal(screenshot.subarray(0, 8).toString("hex"), "89504e470d0a1a0a");

const readme = read("README.md");
assert.match(readme, /!\[[^\]]+\]\(docs\/ziggo-modem-neon\.png\)/);
assert.match(readme, /https:\/\/github\.com\/dkwolf1\/ha-ziggo-modem#readme/);
assert.match(readme, /^## Nederlands$/m);
assert.match(readme, /^## English$/m);

for (const path of ["README.md", "docs/README.en.md"]) {
  const contents = read(path);
  for (const [, href] of contents.matchAll(/\]\(([^)]+)\)/g)) {
    const target = new URL(href, new URL(path, root));
    if (target.protocol !== "file:") continue;

    const anchor = target.hash.slice(1);
    target.hash = "";
    assert.ok(statSync(target).isFile(), `${path}: ${href}`);
    if (!anchor) continue;

    const headings = readFileSync(target, "utf8").matchAll(/^#{1,6} (.+)$/gm);
    assert.ok(
      Array.from(headings, ([, heading]) =>
        heading.trim().toLowerCase().replaceAll(" ", "-"),
      ).includes(anchor),
      `${path}: missing anchor ${href}`,
    );
  }
}

console.log("Marketplace files, image formats and README links are valid.");
