import { useMemo } from 'react';
import styles from './Aurora.module.css';

export interface AuroraBlob {
  /** Centro del halo, en porcentaje de la caja de la aurora. */
  x: string;
  y: string;
  /** Radio base del halo en px; crece un poco con el ancho de pantalla. */
  size: number;
  color: string;
  opacity: number;
}

interface AuroraProps {
  blobs: AuroraBlob[];
  /** Deriva lenta de la capa. Reservado al hero: mover más de una capa a la vez sale caro. */
  drift?: boolean;
}

/** Fondo decorativo. `aria-hidden` y sin captura de puntero. */
export function Aurora({ blobs, drift = false }: AuroraProps) {
  const backgroundImage = useMemo(
    () =>
      blobs
        .map(
          (blob) =>
            // El radio suma 5vw para que en pantallas anchas los halos no se
            // queden como manchas pequeñas con un vacío plano en medio.
            `radial-gradient(calc(${blob.size}px + 5vw) circle at ${blob.x} ${blob.y}, ` +
            `color-mix(in oklab, ${blob.color} ${Math.round(blob.opacity * 100)}%, transparent) 0%, ` +
            `transparent 68%)`,
        )
        .join(', '),
    [blobs],
  );

  return (
    <div className={`${styles.aurora}${drift ? ` ${styles.drift}` : ''}`} aria-hidden="true">
      <div className={styles.layer} style={{ backgroundImage }} />
    </div>
  );
}
