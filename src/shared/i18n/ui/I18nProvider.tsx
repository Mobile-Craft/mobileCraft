import { useCallback, useEffect, useMemo, useState, type ReactNode } from 'react';
import { loadDictionary, SYNC_DICTIONARIES } from '../lib/load';
import { syncDocumentMeta, syncLocaleInUrl } from '../lib/documentMeta';
import type { Dictionary } from '../lib/es';
import { I18nContext, type I18nContextValue } from '../model/context';
import {
  DEFAULT_LOCALE,
  isLocale,
  LOCALE_STORAGE_KEY,
  LOCALES,
  type Locale,
} from '../model/locale';

/**
 * Idioma inicial.
 *
 * La decisión —`?lang=` > preferencia guardada > idioma del navegador— la toma
 * una sola vez el script de arranque de `index.html`, que la escribe en
 * `<html lang>` antes del primer paint. Aquí se lee ese resultado en lugar de
 * repetir la regla: cuando estaba duplicada, las dos copias podían discrepar
 * (el script miraba `navigator.language` y React `navigator.languages`) y la
 * página arrancaba anunciando un idioma y renderizando otro.
 */
function readInitialLocale(): Locale {
  const resolved = document.documentElement.lang;
  return isLocale(resolved) ? resolved : DEFAULT_LOCALE;
}

/**
 * Fuente de verdad del idioma.
 *
 * Mantiene sincronizados el diccionario, las etiquetas del `<head>` y el
 * parámetro `?lang=` de la URL, para que la versión traducida se pueda
 * compartir tal cual.
 */
export function I18nProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(readInitialLocale);
  const [dictionaries, setDictionaries] =
    useState<Partial<Record<Locale, Dictionary>>>(SYNC_DICTIONARIES);

  const t = dictionaries[locale];

  // El diccionario que no viene en el bundle inicial se pide al conmutar.
  useEffect(() => {
    if (dictionaries[locale]) return;

    let cancelled = false;
    void Promise.resolve(loadDictionary(locale)).then((loaded) => {
      if (!cancelled) setDictionaries((current) => ({ ...current, [locale]: loaded }));
    });

    return () => {
      cancelled = true;
    };
  }, [locale, dictionaries]);

  useEffect(() => {
    if (!t) return;

    syncDocumentMeta(locale, t);
    syncLocaleInUrl(locale, DEFAULT_LOCALE);

    try {
      localStorage.setItem(LOCALE_STORAGE_KEY, locale);
    } catch {
      /* sin persistencia; la sesión sigue funcionando */
    }
  }, [locale, t]);

  const setLocale = useCallback((next: Locale) => setLocaleState(next), []);

  const toggleLocale = useCallback(() => {
    setLocaleState((current) => LOCALES[(LOCALES.indexOf(current) + 1) % LOCALES.length]);
  }, []);

  const value = useMemo<I18nContextValue | null>(
    () => (t ? { locale, t, setLocale, toggleLocale } : null),
    [locale, t, setLocale, toggleLocale],
  );

  // Sólo ocurre al abrir directamente en un idioma que viaja en chunk aparte:
  // se espera al diccionario en vez de pintar un idioma y cambiarlo a mitad.
  if (!value) return null;

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}
