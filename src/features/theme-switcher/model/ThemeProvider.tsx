import { useCallback, useEffect, useMemo, useState, type ReactNode } from 'react';
import type { Theme } from './types';
import { ThemeContext, type ThemeContextValue } from './context';

const THEME_KEY = 'et-theme';

/**
 * Fuente de verdad del tema.
 *
 * El estado inicial se lee de `<html data-theme>`, que el script de arranque de
 * `index.html` ya resolvió antes del primer paint. Leer el resultado en vez de
 * repetir la consulta a `localStorage` evita que las dos copias de la regla
 * puedan discrepar.
 */
export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>(() =>
    document.documentElement.dataset.theme === 'light' ? 'light' : 'dark',
  );

  useEffect(() => {
    const root = document.documentElement;
    root.dataset.theme = theme;
    root.style.colorScheme = theme;

    try {
      localStorage.setItem(THEME_KEY, theme);
    } catch {
      /* sin persistencia; la sesión sigue funcionando */
    }
  }, [theme]);

  const toggleTheme = useCallback(() => {
    setTheme((current) => (current === 'dark' ? 'light' : 'dark'));
  }, []);

  const value = useMemo<ThemeContextValue>(() => ({ theme, toggleTheme }), [theme, toggleTheme]);

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}
