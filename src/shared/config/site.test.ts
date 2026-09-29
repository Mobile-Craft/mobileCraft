import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';
import { es } from '@/shared/i18n';
import { PROFILE, SITE_URL, SOCIAL_LINKS } from './site';

const html = readFileSync('index.html', 'utf8');

const meta = (attribute: 'property' | 'name', key: string) =>
  html.match(new RegExp(`${attribute}="${key}"\\s+content="([^"]*)"`, 's'))?.[1] ??
  html.match(new RegExp(`content="([^"]*)"\\s*\\n?\\s*${attribute}="${key}"`, 's'))?.[1];

const jsonLd = JSON.parse(
  html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/)?.[1] ?? '{}',
);

/**
 * `index.html` es estático, así que sus etiquetas sociales no pueden importar
 * nada de `src`. Este test es lo que impide que se desincronicen: la última vez
 * la descripción se quedó diciendo "5 años" mientras el resto del sitio decía 6,
 * y `og:image` apuntaba a una ruta relativa, que hace que LinkedIn y WhatsApp
 * previsualicen el enlace sin imagen.
 */
describe('etiquetas sociales y datos estructurados', () => {
  it('publica todas las URLs sociales en absoluto', () => {
    for (const key of ['og:image', 'og:url'] as const) {
      const value = meta('property', key);
      expect(value, key).toBeDefined();
      expect(() => new URL(value!), `${key} debe ser absoluta`).not.toThrow();
      expect(value!.startsWith(SITE_URL), `${key} debe vivir en ${SITE_URL}`).toBe(true);
    }

    expect(meta('name', 'twitter:image')).toBe(meta('property', 'og:image'));
  });

  it('declara las dimensiones que espera summary_large_image', () => {
    expect(meta('name', 'twitter:card')).toBe('summary_large_image');
    expect(meta('property', 'og:image:width')).toBe('1200');
    expect(meta('property', 'og:image:height')).toBe('630');
  });

  it('mantiene el título y la descripción iguales a los del diccionario', () => {
    const decode = (value: string) => value.replace(/&amp;/g, '&');

    expect(decode(meta('property', 'og:title')!)).toBe(es.meta.title);
    expect(decode(meta('property', 'og:description')!)).toBe(es.meta.description);
    expect(decode(meta('name', 'description')!)).toBe(es.meta.description);
    expect(html).toContain(`<title>${es.meta.title.replace(/&/g, '&amp;')}</title>`);
  });

  it('describe a la persona correcta en los datos estructurados', () => {
    expect(jsonLd['@type']).toBe('Person');
    expect(jsonLd.name).toBe('Elder Moisés Tavárez');
    expect(jsonLd.email).toBe(`mailto:${PROFILE.email}`);
    expect(jsonLd.url).toBe(`${SITE_URL}/`);
    expect(jsonLd.sameAs).toEqual([...SOCIAL_LINKS]);
  });

  it('declara una alternativa por cada idioma, más x-default', () => {
    const hreflangs = [...html.matchAll(/hreflang="([^"]+)"/g)].map((match) => match[1]);
    expect(new Set(hreflangs)).toEqual(new Set(['es-DO', 'en', 'x-default']));
    expect(html).toContain(`href="${SITE_URL}/?lang=en"`);
  });

  it('apunta el sitemap y robots al dominio real', () => {
    const robots = readFileSync('public/robots.txt', 'utf8');
    const sitemap = readFileSync('public/sitemap.xml', 'utf8');

    expect(robots).toContain(`Sitemap: ${SITE_URL}/sitemap.xml`);
    expect(sitemap).toContain(`<loc>${SITE_URL}/</loc>`);
  });
});
