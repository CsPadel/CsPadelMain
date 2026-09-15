/**
 * Cross-references files in public/ against the source, so the heavy ones can
 * be split into "optimise this" and "this is not even used".
 *
 * Matching is by filename rather than full path: images are referenced from
 * .astro, .tsx and .ts through template literals and constants, so a literal
 * path search misses a good share of them. Filename matching over-reports
 * rather than under-reports, which is the safe direction — nothing gets
 * deleted on the strength of this alone.
 */

import { readdirSync, statSync, readFileSync } from 'node:fs';
import { join, relative, basename } from 'node:path';

function walk(dir, out = []) {
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) walk(full, out);
    else out.push(full);
  }
  return out;
}

const source = walk('src')
  .filter((f) => /\.(astro|tsx?|css|mjs|js)$/.test(f))
  .map((f) => readFileSync(f, 'utf8'))
  .join('\n');

const assets = walk('public').filter((f) => /\.(jpe?g|png|webp|mp4|svg|ico)$/i.test(f));

const used = [];
const unused = [];
for (const file of assets) {
  const name = basename(file);
  (source.includes(name) ? used : unused).push([statSync(file).size, relative('.', file).split('\\').join('/')]);
}

const mb = (b) => (b / 1048576).toFixed(1);
const sum = (rows) => rows.reduce((a, [s]) => a + s, 0);

used.sort((a, b) => b[0] - a[0]);
unused.sort((a, b) => b[0] - a[0]);

console.log(`referenced:   ${used.length} files, ${mb(sum(used))} MB`);
console.log(`unreferenced: ${unused.length} files, ${mb(sum(unused))} MB\n`);

console.log('--- referenced and over 1 MB: these are what visitors download ---');
for (const [size, path] of used.filter(([s]) => s > 1048576)) {
  console.log(`${mb(size).padStart(7)} MB  ${path}`);
}

console.log('\n--- unreferenced and over 1 MB: dead weight in the repo ---');
for (const [size, path] of unused.filter(([s]) => s > 1048576).slice(0, 15)) {
  console.log(`${mb(size).padStart(7)} MB  ${path}`);
}
