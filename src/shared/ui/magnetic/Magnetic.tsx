import { useRef, type ReactNode } from 'react';
import { m, useMotionValue, useReducedMotion, useSpring } from 'framer-motion';
import styles from './Magnetic.module.css';

interface MagneticProps {
  children: ReactNode;
  /** Cuánto se desplaza el elemento hacia el cursor, en px. */
  strength?: number;
  className?: string;
}

/**
 * Atracción magnética hacia el cursor.
 *
 * Sólo se activa con puntero fino (ratón / trackpad): en táctil no hay hover y
 * el desplazamiento sería ruido. Con `prefers-reduced-motion` no hace nada.
 */
export function Magnetic({ children, strength = 10, className }: MagneticProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const reduced = useReducedMotion();

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 220, damping: 18, mass: 0.4 });
  const springY = useSpring(y, { stiffness: 220, damping: 18, mass: 0.4 });

  const handleMove = (event: React.PointerEvent<HTMLSpanElement>) => {
    if (reduced || event.pointerType !== 'mouse' || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const offsetX = event.clientX - (rect.left + rect.width / 2);
    const offsetY = event.clientY - (rect.top + rect.height / 2);
    x.set((offsetX / (rect.width / 2)) * strength);
    y.set((offsetY / (rect.height / 2)) * strength);
  };

  const reset = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <m.span
      ref={ref}
      className={[styles.magnetic, className].filter(Boolean).join(' ')}
      style={{ x: springX, y: springY }}
      onPointerMove={handleMove}
      onPointerLeave={reset}
      onPointerCancel={reset}
    >
      {children}
    </m.span>
  );
}
