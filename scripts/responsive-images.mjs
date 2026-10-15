/**
 * Generates WebP variants of the site's photos so pages can serve a size that
 * matches the screen (`srcset`) instead of the full 1920px JPEG.
 *
 * Runs from the Astro integration in astro.config.mjs on every `dev`/`build`.
 * Variants go to public/_img/ and a manifest of available widths to
 * src/generated/ — both gitignored. It is incremental: a variant is only
 * re-encoded when its source photo is newer.
 */
import { readdir, readFile, mkdir, stat, writeFile } from 'node:fs/promises';
import { dirname, extname, join, relative, sep } from 'node:path';
import sharp from 'sharp';

export const WIDTHS = [480, 960, 1600];
const QUALITY = 70;
const SOURCE_EXT = /\.(jpe?g|png)$/i;
/** Whole folders whose files are referenced by building paths at runtime. */
const FOLDERS = ['cms', 'menorca-gallery', 'menorca-itinerary', 'east-sussex-gallery', 'bali-gallery', 'about-us'];

async function walk(dir) {
  const out = [];
  for (const entry of await readdir(dir, { withFileTypes: true }).catch(() => [])) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) out.push(...(await walk(full)));
    else out.push(full);
  }
  return out;
}

/** Photos referenced literally anywhere in src/ (pages, components, locales). */
async function referencedPhotos(root) {
  const found = new Set();
  const pattern = /\/imagenes\/[^"'`\n]+?\.(?:jpe?g|png)/gi;
  for (const file of await walk(join(root, 'src'))) {
    if (!/\.(astro|tsx?|mjs)$/.test(file) || file.includes(`${sep}generated${sep}`)) continue;
    for (const match of (await readFile(file, 'utf8')).matchAll(pattern)) found.add(match[0]);
  }
  return found;
}

const isNewer = async (a, b) => {
  try {
    return (await stat(a)).mtimeMs > (await stat(b)).mtimeMs;
  } catch {
    return true;
  }
};

export async function generateResponsiveImages(root = process.cwd()) {
  const publicDir = join(root, 'public');
  const imagesDir = join(publicDir, 'imagenes');

  const sources = new Set(await referencedPhotos(root));
  for (const folder of FOLDERS) {
    for (const file of await walk(join(imagesDir, folder))) {
      if (SOURCE_EXT.test(file)) sources.add('/' + relative(publicDir, file).split(sep).join('/'));
    }
  }

  const manifest = {};
  let encoded = 0;
  for (const src of [...sources].sort()) {
    const input = join(publicDir, ...src.split('/'));
    let width;
    try {
      ({ width } = await sharp(input).metadata());
    } catch {
      continue; // referenced but missing on disk
    }
    const widths = WIDTHS.filter((w) => w < width);
    if (!widths.length) continue;

    const base = src.slice(0, -extname(src).length);
    for (const w of widths) {
      const output = join(publicDir, '_img', ...`${base}-${w}.webp`.split('/'));
      if (!(await isNewer(input, output))) continue;
      await mkdir(dirname(output), { recursive: true });
      await sharp(input).rotate().resize({ width: w }).webp({ quality: QUALITY }).toFile(output);
      encoded++;
    }
    manifest[src] = { widths, original: width };
  }

  const manifestPath = join(root, 'src', 'generated', 'responsive-images.json');
  await mkdir(dirname(manifestPath), { recursive: true });
  await writeFile(manifestPath, JSON.stringify(manifest) + '\n');
  return { images: Object.keys(manifest).length, encoded };
}
