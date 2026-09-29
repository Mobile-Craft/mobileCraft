import { useCallback, useRef, type ReactNode } from 'react';
import { m, type HTMLMotionProps } from 'framer-motion';
import styles from './SpotlightCard.module.css';

interface SpotlightCardProps extends Omit<HTMLMotionProps<'div'>, 'children'> {
  children: ReactNode;
  className?: string;
}

/**
 * Tarjeta con halo de acento que sigue al cursor.
 *
 * La posición se escribe como custom properties directamente en el nodo, sin
 * pasar por el estado de React: mover el ratón no debe provocar renders.
 */
export function SpotlightCard({ children, className, ...rest }: SpotlightCardProps) {
  const ref = useRef<HTMLDivElement>(null);

  const handleMove = useCallback((event: React.PointerEvent<HTMLDivElement>) => {
    const node = ref.current;
    if (!node) return;
    const rect = node.getBoundingClientRect();
    node.style.setProperty('--pointer-x', `${event.clientX - rect.left}px`);
    node.style.setProperty('--pointer-y', `${event.clientY - rect.top}px`);
  }, []);

  return (
    <m.div
      ref={ref}
      className={[styles.card, className].filter(Boolean).join(' ')}
      onPointerMove={handleMove}
      {...rest}
    >
      <span className={styles.spotlight} aria-hidden="true" />
      {children}
    </m.div>
  );
}
