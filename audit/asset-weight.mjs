/**
 * Lists the heaviest files under public/.
 *
 * Written after the live home page was measured at 25-29 MB on a single view,
 * most of it one 20 MB JPEG. On a phone that is the difference between a site
 * that feels expensive and one that feels broken, so it is worth being able to
 * re-run this check.
 */

import { readdirSync, statSync } from 'node:fs';
import { join, relative } from 'node:path';

const ROOT = process.argv[2] ?? 'public';
const THRESHOLD = Number(process.argv[3] ?? 500) * 1024;

const files = [];
(function walk(dir) {
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) walk(full);
    else files.push([statSync(full).size, relative('.', full).split('\\').join('/')]);
  }
})(ROOT);

const heavy = files.filter(([size]) => size >= THRESHOLD).sort((a, b) => b[0] - a[0]);
const total = files.reduce((sum, [size]) => sum + size, 0);
const heavyTotal = heavy.reduce((sum, [size]) => sum + size, 0);
const mb = (b) => (b / 1048576).toFixed(1);

console.log(`${ROOT}: ${files.length} files, ${mb(total)} MB total`);
console.log(`over ${THRESHOLD / 1024} KB: ${heavy.length} files, ${mb(heavyTotal)} MB (${Math.round((heavyTotal / total) * 100)}%)\n`);

for (const [size, path] of heavy.slice(0, 30)) {
  console.log(`${mb(size).padStart(7)} MB  ${path}`);
}
