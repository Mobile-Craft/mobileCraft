/**
 * Deriva variantes modernas de cada foto y escribe el manifiesto que consume
 * `<Picture>`.
 *
 * Las capturas originales pesaban más de 100 kB cada una en JPEG para
 * renderizarse dentro de un marco de teléfono de ~300 px. AVIF y WebP dan la
 * misma imagen por una fracción, y el `srcset` evita mandar la versión grande a
 * un móvil. El JPEG original se conserva como último recurso.
 *
 * Es idempotente: se puede volver a correr sin duplicar nada.
 */
import { execFileSync } from 'node:child_process';
import { readdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

const DIR = 'public/assets';
const MANIFEST = 'src/shared/lib/images/manifest.ts';

/** Anchos objetivo. Nunca se escala hacia arriba: no añade detalle y sí peso. */
const WIDTHS = [320, 640, 960];

interface Variant {
  width: number;
  avif: string;
  webp: string;
}

/**
 * Sólo el contenido que la página sirve.
 *
 * `og-cover` lo consumen los previsualizadores de enlaces, que no entienden
 * `srcset`, y `et-horizontal-*` son el arte original del logo: en la página se
 * dibuja como SVG inline (`shared/ui/logo`), así que derivar variantes de esos
 * PNG generaría archivos que nadie pide.
 */
const files = (await readdir(DIR))
  .filter((name) => /\.(jpe?g|png)$/i.test(name))
  .filter((name) => !name.startsWith('og-') && !name.startsWith('et-horizontal-'))
  .sort();

const manifest: Record<string, { width: number; height: number; variants: Variant[] }> = {};

for (const file of files) {
  const source = path.join(DIR, file);
  const base = file.replace(/\.[^.]+$/, '');
  const image = sharp(source);
  const { width = 0, height = 0 } = await image.metadata();

  const targets = WIDTHS.filter((w) => w < width);
  if (targets[targets.length - 1] !== width) targets.push(width);

  const variants: Variant[] = [];

  for (const target of targets) {
    const resized = () => sharp(source).resize({ width: target, withoutEnlargement: true });
    const avif = `${base}-${target}.avif`;
    const webp = `${base}-${target}.webp`;

    await resized().avif({ quality: 52, effort: 6 }).toFile(path.join(DIR, avif));
    await resized().webp({ quality: 76, effort: 5 }).toFile(path.join(DIR, webp));

    variants.push({ width: target, avif: `/assets/${avif}`, webp: `/assets/${webp}` });
  }

  manifest[`/assets/${file}`] = { width, height, variants };
  console.log(`${file.padEnd(22)} ${width}×${height} → ${targets.join(', ')}`);
}

const body = `/**
 * GENERADO por \`npm run images\`. No editar a mano.
 *
 * Mapea cada imagen original a sus variantes AVIF/WebP y a sus dimensiones
 * intrínsecas, que \`<Picture>\` usa para reservar el espacio y evitar saltos
 * de layout mientras la imagen carga.
 */
export interface ImageVariant {
  width: number;
  avif: string;
  webp: string;
}

export interface ImageEntry {
  width: number;
  height: number;
  variants: ImageVariant[];
}

export const IMAGE_MANIFEST: Record<string, ImageEntry> = ${JSON.stringify(manifest, null, 2)};
`;

await writeFile(MANIFEST, body);

// Se formatea con las mismas reglas que el resto para que `format:check` pase
// sin que nadie tenga que acordarse de correr Prettier después de generarlo.
execFileSync('npx', ['prettier', '--write', MANIFEST], { stdio: 'ignore' });

console.log(`\n${MANIFEST} — ${Object.keys(manifest).length} imágenes`);
