import { es, type Dictionary } from './es';
import { DEFAULT_LOCALE, type Locale } from '../model/locale';

/**
 * Carga del diccionario.
 *
 * El idioma por defecto se importa de forma estática: es el diccionario que
 * tipa a los demás y el que lee la mayoría del público, así que tenerlo en el
 * bundle inicial evita una ida y vuelta de red antes del primer contenido.
 * El resto viaja en su propio chunk y sólo se descarga si alguien lo pide, de
 * modo que un visitante en español nunca paga los ~30 kB del inglés.
 */
const LOADERS: Partial<Record<Locale, () => Promise<Dictionary>>> = {
  en: () => import('./en').then((module) => module.en),
};

export function loadDictionary(locale: Locale): Dictionary | Promise<Dictionary> {
  return LOADERS[locale]?.() ?? es;
}

/** Diccionario disponible sin esperar: sólo el del idioma por defecto. */
export const SYNC_DICTIONARIES: Partial<Record<Locale, Dictionary>> = { [DEFAULT_LOCALE]: es };
