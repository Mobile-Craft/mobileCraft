import { createContext, useContext } from 'react';
import type { Dictionary } from '../lib/es';
import type { Locale } from './locale';

export interface I18nContextValue {
  locale: Locale;
  /** Diccionario del idioma activo. */
  t: Dictionary;
  setLocale: (locale: Locale) => void;
  /** Alterna entre los dos idiomas disponibles. */
  toggleLocale: () => void;
}

export const I18nContext = createContext<I18nContextValue | null>(null);

export function useI18n(): I18nContextValue {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error('useI18n debe usarse dentro de <LanguageProvider>');
  return ctx;
}
