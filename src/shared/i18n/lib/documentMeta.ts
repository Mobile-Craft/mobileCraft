import { SITE_URL } from '@/shared/config';
import { LOCALE_QUERY_KEY, LOCALE_TAGS, localeUrl, type Locale } from '../model/locale';
import type { Dictionary } from './es';

function setMeta(selector: string, content: string) {
  document.querySelector(selector)?.setAttribute('content', content);
}

function setLink(rel: string, href: string, hreflang?: string) {
  const selector = hreflang
    ? `link[rel="${rel}"][hreflang="${hreflang}"]`
    : `link[rel="${rel}"]:not([hreflang])`;
  document.querySelector(selector)?.setAttribute('href', href);
}

/**
 * Sincroniza con el idioma activo todo lo que vive en `<head>`.
 *
 * El sitio es una SPA: esas etiquetas se escriben una vez en `index.html` y no
 * cambian solas al conmutar de idioma. Sin esto, un enlace compartido desde la
 * versión en inglés se previsualiza en español y la canónica apunta al idioma
 * equivocado.
 */
export function syncDocumentMeta(locale: Locale, t: Dictionary) {
  const canonical = localeUrl(SITE_URL, locale);

  document.documentElement.lang = t.htmlLang;
  document.title = t.meta.title;

  setMeta('meta[name="description"]', t.meta.description);
  setMeta('meta[property="og:title"]', t.meta.title);
  setMeta('meta[property="og:description"]', t.meta.description);
  setMeta('meta[property="og:locale"]', t.ogLocale);
  setMeta('meta[property="og:url"]', canonical);
  setMeta('meta[name="twitter:title"]', t.meta.title);
  setMeta('meta[name="twitter:description"]', t.meta.description);
  setMeta('meta[property="og:image:alt"]', t.meta.ogImageAlt);
  setMeta('meta[name="twitter:image:alt"]', t.meta.ogImageAlt);

  setLink('canonical', canonical);
  for (const tag of Object.keys(LOCALE_TAGS) as Locale[]) {
    setLink('alternate', localeUrl(SITE_URL, tag), LOCALE_TAGS[tag]);
  }
}

/**
 * Refleja el idioma en la barra de direcciones para que el enlace se pueda
 * compartir ya traducido. `replaceState` en vez de `pushState`: cambiar de
 * idioma no es navegar, y no debería llenar el historial de vuelta atrás.
 */
export function syncLocaleInUrl(locale: Locale, defaultLocale: Locale) {
  const url = new URL(window.location.href);
  const current = url.searchParams.get(LOCALE_QUERY_KEY);

  if (locale === defaultLocale) {
    if (current === null) return;
    url.searchParams.delete(LOCALE_QUERY_KEY);
  } else {
    if (current === locale) return;
    url.searchParams.set(LOCALE_QUERY_KEY, locale);
  }

  window.history.replaceState(null, '', `${url.pathname}${url.search}${url.hash}`);
}
