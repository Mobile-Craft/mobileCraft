import { m, useScroll, useSpring } from 'framer-motion';
import styles from './ScrollProgress.module.css';

/**
 * Barra de progreso de lectura.
 *
 * `useScroll` devuelve un MotionValue 0→1; se escala con `scaleX` en vez de
 * animar `width` para no invalidar el layout en cada frame de scroll.
 */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 140, damping: 26, restDelta: 0.001 });

  return (
    <div className={styles.track} aria-hidden="true">
      <m.div className={styles.bar} style={{ scaleX }} />
    </div>
  );
}
