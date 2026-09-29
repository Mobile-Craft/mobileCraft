import { useEffect } from 'react';

/**
 * Bloquea el scroll de fondo mientras hay una capa modal abierta.
 *
 * Compensa el ancho de la barra de scroll con `padding-right` para que el
 * contenido no dé un salto lateral al bloquear.
 */
export function useLockBodyScroll(locked: boolean) {
  useEffect(() => {
    if (!locked) return;

    const { body } = document;
    const previousPadding = body.style.paddingRight;
    const gap = window.innerWidth - document.documentElement.clientWidth;

    body.dataset.scrollLocked = 'true';
    if (gap > 0) body.style.paddingRight = `${gap}px`;

    return () => {
      delete body.dataset.scrollLocked;
      body.style.paddingRight = previousPadding;
    };
  }, [locked]);
}
