import type { SpringOptions, Variants } from 'framer-motion';

/** Curva base de la interfaz: salida rápida, asentamiento suave. */
export const EASE_OUT = [0.23, 1, 0.32, 1] as const;

/** Muelle para `useSpring` (MotionValues), que espera opciones sin `type`. */
export const SPRING_TILT: SpringOptions = { stiffness: 180, damping: 26, mass: 0.6 };

/** Entrada estándar de un bloque al aparecer en viewport. */
export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 18 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.52, ease: EASE_OUT },
  },
};

/** Contenedor que escalona la entrada de sus hijos. */
export const stagger = (staggerChildren = 0.06, delayChildren = 0): Variants => ({
  hidden: {},
  visible: { transition: { staggerChildren, delayChildren } },
});

/** Ítem de una lista escalonada; hereda el ritmo del contenedor. */
export const staggerItem: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE_OUT } },
};

/** Palabra del titular, para el efecto de aparición por palabras. */
export const wordReveal: Variants = {
  hidden: { opacity: 0, y: '0.5em', rotateX: -35 },
  visible: { opacity: 1, y: 0, rotateX: 0, transition: { duration: 0.7, ease: EASE_OUT } },
};

/**
 * Margen de disparo: el bloque revela justo antes de entrar del todo.
 *
 * Ojo con `once: true`: cuando el contenedor ya reveló, su observador se
 * desconecta y no vuelve a propagar la variante `visible`. Un hijo que se monte
 * después nace en `hidden` y se queda invisible. Por eso las listas que van
 * dentro de un contenedor con `whileInView` tienen que llevar una `key` estable
 * —un id, no el texto traducido—: si la `key` cambia al traducir, React
 * remonta los ítems y la sección desaparece.
 */
export const VIEWPORT = { once: true, amount: 0.15, margin: '0px 0px -8% 0px' } as const;
