import { IMAGE_MANIFEST } from './manifest';

export interface ImageSources {
  /** `srcset` AVIF, o `undefined` si la imagen no está en el manifiesto. */
  avif?: string;
  webp?: string;
  width?: number;
  height?: number;
}

/**
 * Atributos de `srcset` para los casos que no pueden usar `<Picture>` porque el
 * `<img>` va animado y necesita ser el nodo de Framer Motion. Se combinan con
 * `<picture><source …/><m.img …/></picture>`, que da el mismo resultado.
 */
export function imageSources(src: string): ImageSources {
  const entry = IMAGE_MANIFEST[src];
  if (!entry) return {};

  const srcSet = (key: 'avif' | 'webp') =>
    entry.variants.map((variant) => `${variant[key]} ${variant.width}w`).join(', ');

  return {
    avif: srcSet('avif'),
    webp: srcSet('webp'),
    width: entry.width,
    height: entry.height,
  };
}
