export type Locale = 'es' | 'en';

export const LOCALES: readonly Locale[] = ['es', 'en'];

/** Etiqueta corta del selector del navbar. */
export const LOCALE_LABELS: Record<Locale, string> = {
  es: 'ES',
  en: 'EN',
};

export const LOCALE_NAMES: Record<Locale, string> = {
  es: 'Español',
  en: 'English',
};

/** Código BCP 47 completo, para `hreflang` y `og:locale`. */
export const LOCALE_TAGS: Record<Locale, string> = {
  es: 'es-DO',
  en: 'en',
};

export const DEFAULT_LOCALE: Locale = 'es';

/** Parámetro que hace compartible el idioma: `?lang=en` abre el sitio en inglés. */
export const LOCALE_QUERY_KEY = 'lang';

export const LOCALE_STORAGE_KEY = 'et-lang';

export function isLocale(value: unknown): value is Locale {
  return LOCALES.includes(value as Locale);
}

/** URL canónica de una versión de idioma. El idioma por defecto vive en la raíz. */
export function localeUrl(origin: string, locale: Locale): string {
  return locale === DEFAULT_LOCALE ? `${origin}/` : `${origin}/?${LOCALE_QUERY_KEY}=${locale}`;
}
