import manifest from '../generated/responsive-images.json';

const available = manifest as Record<string, { widths: number[]; original: number }>;

/**
 * `srcset` of WebP variants for a photo under /public, generated at build time
 * by scripts/responsive-images.mjs. Returns undefined when no variants exist,
 * so the plain `src` is used and nothing breaks.
 */
export function srcSet(src: string): string | undefined {
  const entry = available[src];
  if (!entry) return undefined;
  const base = src.slice(0, src.lastIndexOf('.'));
  return [
    ...entry.widths.map((w) => `${encodeURI(`/_img${base}-${w}.webp`)} ${w}w`),
    `${encodeURI(src)} ${entry.original}w`,
  ].join(', ');
}

/** Common `sizes` values, matching the layouts the photos sit in. */
export const SIZES = {
  full: '100vw',
  half: '(min-width: 768px) 50vw, 100vw',
  third: '(min-width: 768px) 33vw, 100vw',
} as const;
