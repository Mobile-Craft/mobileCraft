import { useEffect, useRef } from 'react';

/**
 * Registra un listener sin volver a suscribirse cada vez que cambia el handler.
 * El handler se guarda en un ref, así que siempre corre la versión más reciente.
 */
export function useEventListener<K extends keyof WindowEventMap>(
  type: K,
  handler: (event: WindowEventMap[K]) => void,
  options?: AddEventListenerOptions,
) {
  const saved = useRef(handler);

  useEffect(() => {
    saved.current = handler;
  }, [handler]);

  useEffect(() => {
    const listener = (event: WindowEventMap[K]) => saved.current(event);
    window.addEventListener(type, listener as EventListener, options);
    return () => window.removeEventListener(type, listener as EventListener, options);
    // `options` es un objeto literal en cada render; se compara por sus campos.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [type, options?.capture, options?.passive, options?.once]);
}
