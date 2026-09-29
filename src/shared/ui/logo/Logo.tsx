import styles from './Logo.module.css';

/**
 * Marca `[ET]`.
 *
 * Es el vector del logo original (`public/assets/et-horizontal-*.png`): la
 * geometría son doce rectángulos alineados a los ejes, medidos sobre el máster
 * de 2400px, así que el trazado coincide píxel a píxel con el PNG.
 *
 * Se dibuja en vez de incrustar el PNG por dos razones: la E del original es
 * casi blanca (#f8f9fa) y desaparecería sobre el fondo del tema claro, y la T
 * está fijada en teal, con lo que dejaría de acompañar al acento cuando se
 * elige azul o lima.
 */
const RECTS = [
  // Corchete izquierdo
  { x: 0, y: 0, width: 60, height: 594, part: 'bracket' },
  { x: 0, y: 0, width: 199, height: 52, part: 'bracket' },
  { x: 0, y: 542, width: 199, height: 52, part: 'bracket' },
  // E
  { x: 357, y: 41, width: 75, height: 462, part: 'ink' },
  { x: 357, y: 41, width: 290, height: 62, part: 'ink' },
  { x: 357, y: 238, width: 282, height: 62, part: 'ink' },
  { x: 357, y: 441, width: 290, height: 62, part: 'ink' },
  // T
  { x: 754, y: 41, width: 363, height: 62, part: 'accent' },
  { x: 898, y: 41, width: 75, height: 462, part: 'accent' },
  // Corchete derecho
  { x: 1374, y: 0, width: 60, height: 594, part: 'bracket' },
  { x: 1236, y: 0, width: 198, height: 52, part: 'bracket' },
  { x: 1236, y: 542, width: 198, height: 52, part: 'bracket' },
] as const;

interface LogoProps {
  /** Nombre accesible. Sin él la marca es decorativa y se oculta al lector. */
  title?: string;
  className?: string;
}

export function Logo({ title, className }: LogoProps) {
  return (
    <svg
      className={className ? `${styles.logo} ${className}` : styles.logo}
      viewBox="0 0 1434 594"
      role={title ? 'img' : undefined}
      aria-hidden={title ? undefined : true}
      focusable="false"
    >
      {title ? <title>{title}</title> : null}
      {RECTS.map((rect) => (
        <rect
          key={`${rect.part}-${rect.x}-${rect.y}-${rect.width}`}
          className={styles[rect.part]}
          x={rect.x}
          y={rect.y}
          width={rect.width}
          height={rect.height}
        />
      ))}
    </svg>
  );
}
