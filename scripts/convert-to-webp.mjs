// One-off: convert every JPG/PNG under public/assets/images to WebP.
// Skips app/icon.png and app/apple-icon.png (favicons stay PNG).
// Deletes originals on successful conversion.

import { readdir, stat, unlink } from "node:fs/promises";
import { join, parse, relative } from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const REPO_ROOT = fileURLToPath(new URL("..", import.meta.url));

const QUALITY = 85;
const SCAN_DIRS = [
  fileURLToPath(new URL("../public/assets/images", import.meta.url)),
];
const ROOT_FILES = [
  fileURLToPath(new URL("../public/cyrix-professional.png", import.meta.url)),
];

async function walk(dir) {
  const out = [];
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) {
      out.push(...(await walk(full)));
    } else if (/\.(jpe?g|png)$/i.test(entry.name)) {
      out.push(full);
    }
  }
  return out;
}

const files = [...ROOT_FILES];
for (const dir of SCAN_DIRS) files.push(...(await walk(dir)));
let saved = 0;
let originalTotal = 0;
let webpTotal = 0;

for (const file of files) {
  const { dir, name, ext } = parse(file);
  const outPath = join(dir, `${name}.webp`);

  const originalSize = (await stat(file)).size;
  originalTotal += originalSize;

  const hasAlpha = ext.toLowerCase() === ".png";

  await sharp(file)
    .webp({
      quality: QUALITY,
      alphaQuality: 90,
      effort: 6,
      nearLossless: hasAlpha && originalSize < 50_000,
    })
    .toFile(outPath);

  const newSize = (await stat(outPath)).size;
  webpTotal += newSize;

  if (newSize < originalSize) {
    await unlink(file);
    saved++;
    const pct = ((1 - newSize / originalSize) * 100).toFixed(1);
    console.log(`  ${relative(REPO_ROOT, file)}: ${(originalSize / 1024).toFixed(0)}KB -> ${(newSize / 1024).toFixed(0)}KB  (-${pct}%)`);
  } else {
    // WebP came out bigger — keep the original, drop the .webp
    await unlink(outPath);
    console.log(`  ${relative(REPO_ROOT, file)}: skipped (WebP was larger)`);
  }
}

const totalSaved = originalTotal - webpTotal;
console.log(`\nConverted ${saved}/${files.length} files`);
console.log(`Original: ${(originalTotal / 1024 / 1024).toFixed(2)} MB`);
console.log(`WebP:     ${(webpTotal / 1024 / 1024).toFixed(2)} MB`);
console.log(`Saved:    ${(totalSaved / 1024 / 1024).toFixed(2)} MB`);
