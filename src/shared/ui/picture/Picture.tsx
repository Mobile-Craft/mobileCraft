import { IMAGE_MANIFEST } from '@/shared/lib/images';

interface PictureProps {
  /** Ruta del original, tal cual aparece en el contenido (`/assets/x.jpg`). */
  src: string;
  alt: string;
  /** Pista de tamaño para que el navegador elija la variante antes de maquetar. */
  sizes?: string;
  className?: string;
  /** La imagen visible al cargar la página no debe diferirse. */
  priority?: boolean;
}

/**
 * Imagen con variantes modernas y `srcset`.
 *
 * El navegador elige el primer formato que entiende —AVIF, luego WebP— y dentro
 * de él el ancho que necesita, así que un móvil no descarga la versión grande y
 * nadie descarga el JPEG salvo que no soporte nada mejor.
 *
 * `width`/`height` salen del manifiesto para que el hueco quede reservado desde
 * el primer paint: sin ellos la página salta cuando la imagen llega.
 *
 * Una ruta que no esté en el manifiesto se sirve como `<img>` normal, de modo
 * que añadir una imagen nueva nunca rompe la página aunque se olvide correr
 * `npm run images`.
 */
export function Picture({ src, alt, sizes = '100vw', className, priority = false }: PictureProps) {
  const entry = IMAGE_MANIFEST[src];

  const loading = priority ? 'eager' : 'lazy';

  /*
   * React 18 no conoce `fetchPriority` en camelCase: lo descarta con un aviso
   * y la pista nunca llega al navegador. Se pasa en minúsculas, que es como se
   * llama el atributo real. (React 19 ya acepta la forma camelCase.)
   */
  const fetchPriority = priority ? ({ fetchpriority: 'high' } as Record<string, string>) : {};

  if (!entry) {
    return (
      <img
        src={src}
        alt={alt}
        className={className}
        loading={loading}
        decoding="async"
        {...fetchPriority}
      />
    );
  }

  const srcSet = (key: 'avif' | 'webp') =>
    entry.variants.map((variant) => `${variant[key]} ${variant.width}w`).join(', ');

  return (
    <picture>
      <source type="image/avif" srcSet={srcSet('avif')} sizes={sizes} />
      <source type="image/webp" srcSet={srcSet('webp')} sizes={sizes} />
      <img
        src={src}
        alt={alt}
        className={className}
        width={entry.width}
        height={entry.height}
        loading={loading}
        decoding="async"
        {...fetchPriority}
      />
    </picture>
  );
}
