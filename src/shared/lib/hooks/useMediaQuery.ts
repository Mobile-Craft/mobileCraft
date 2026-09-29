import { useSyncExternalStore } from 'react';

/**
 * Suscribe el componente a una media query.
 *
 * Usa `useSyncExternalStore` para que el valor no se desincronice entre el
 * render y el efecto: el estado se lee siempre del `MediaQueryList` real.
 */
export function useMediaQuery(query: string): boolean {
  const subscribe = (onChange: () => void) => {
    const mql = window.matchMedia(query);
    mql.addEventListener('change', onChange);
    return () => mql.removeEventListener('change', onChange);
  };

  return useSyncExternalStore(
    subscribe,
    () => window.matchMedia(query).matches,
    () => false, // sin ventana (SSR / prerender): se asume "no coincide"
  );
}
