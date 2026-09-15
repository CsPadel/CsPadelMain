/**
 * Re-encodes oversized photographs in public/ in place.
 *
 * The site was shipping camera originals: the home page alone pulled 25-29 MB
 * for one view, of which a single 6172x4115 JPEG was 19.6 MB. On a phone that
 * is the difference between a site that feels expensive and one that feels
 * broken — which matters more to the brand than any individual photograph.
 *
 * In place and same filename on purpose: every reference in the source keeps
 * working, so this needs no code changes and can be re-run whenever new
 * originals are dropped in.
 *
 * 2400px on the long edge covers a full-bleed hero on a 2x 1440 display. The
 * originals stay recoverable from git history.
 *
 * Usage:
 *   node scripts/optimise-images.mjs            # report only
 *   node scripts/optimise-images.mjs --write    # actually rewrite
 */

import { readdirSync, statSync, readFileSync, writeFileSync } from 'node:fs';
import { join, relative, basename } from 'node:path';
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);
// sharp is a transitive dependency of Astro's image service; resolve it from
// the pnpm store rather than adding a direct dependency for a build script.
const sharp = require('../node_modules/.pnpm/sharp@0.34.5/node_modules/sharp');

const WRITE = process.argv.includes('--write');
const MAX_EDGE = 2400;
const QUALITY = 82;
const MIN_SIZE = 500 * 1024;

function walk(dir, out = []) {
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) walk(full, out);
    else out.push(full);
  }
  return out;
}

/** Only touch what the site actually serves; unused originals are a separate decision. */
const source = walk('src')
  .filter((f) => /\.(astro|tsx?|css)$/.test(f))
  .map((f) => readFileSync(f, 'utf8'))
  .join('\n');

const targets = walk('public')
  .filter((f) => /\.(jpe?g|png)$/i.test(f))
  .filter((f) => statSync(f).size >= MIN_SIZE)
  .filter((f) => source.includes(basename(f)));

const kb = (b) => (b / 1024).toFixed(0);
let before = 0;
let after = 0;

console.log(`${targets.length} referenced images over ${MIN_SIZE / 1024} KB\n`);

for (const file of targets) {
  const originalSize = statSync(file).size;
  // Read to memory first: on Windows, sharp keeps the source handle open long
  // enough that writing back to the same path fails with UNKNOWN/EBUSY.
  const input = readFileSync(file);
  const meta = await sharp(input).metadata();

  const buffer = await sharp(input)
    // Honours EXIF orientation before the resize, then drops the metadata.
    .rotate()
    .resize({ width: MAX_EDGE, height: MAX_EDGE, fit: 'inside', withoutEnlargement: true })
    .jpeg({ quality: QUALITY, mozjpeg: true, progressive: true })
    .toBuffer();

  before += originalSize;
  after += buffer.length;

  const saved = Math.round((1 - buffer.length / originalSize) * 100);
  console.log(
    `${relative('.', file).split('\\').join('/').padEnd(46)} ` +
      `${String(meta.width) + 'x' + meta.height}`.padEnd(12) +
      `${kb(originalSize).padStart(7)} KB -> ${kb(buffer.length).padStart(6)} KB  (-${saved}%)`,
  );

  if (WRITE) writeFileSync(file, buffer);
}

const mb = (b) => (b / 1048576).toFixed(1);
console.log(`\ntotal: ${mb(before)} MB -> ${mb(after)} MB  (-${Math.round((1 - after / before) * 100)}%)`);
if (!WRITE) console.log('\nreport only — pass --write to apply');
