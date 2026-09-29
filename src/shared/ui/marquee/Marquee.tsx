import { useLayoutEffect, useRef, useState } from 'react';
import styles from './Marquee.module.css';

interface MarqueeProps {
  items: string[];
  /** Duración de una vuelta completa, en segundos. */
  duration?: number;
}

/**
 * Cinta de nombres en movimiento continuo.
 *
 * La pista se desplaza exactamente el ancho de un grupo, así que al terminar el
 * ciclo la copia siguiente está donde empezó la anterior y el bucle no tiene
 * costura. Para que nunca se vea el final de la cinta hace falta que la pista
 * mida al menos un grupo más que el área visible; con dos copias eso sólo se
 * cumple si el grupo ya es más ancho que la pantalla, así que el número de
 * copias se mide en vez de fijarse. Las copias van `aria-hidden` para que un
 * lector de pantalla lea la lista una sola vez.
 */
export function Marquee({ items, duration = 38 }: MarqueeProps) {
  const viewportRef = useRef<HTMLDivElement>(null);
  const groupRef = useRef<HTMLUListElement>(null);
  const [copies, setCopies] = useState(2);

  useLayoutEffect(() => {
    const viewport = viewportRef.current;
    const group = groupRef.current;
    if (!viewport || !group) return;

    const measure = () => {
      const groupWidth = group.getBoundingClientRect().width;
      if (groupWidth === 0) return;
      const visible = viewport.getBoundingClientRect().width;
      setCopies(Math.max(2, Math.ceil(visible / groupWidth) + 1));
    };

    measure();

    // Observa ambos: el área visible cambia al redimensionar y el grupo cambia
    // de ancho cuando terminan de cargar las tipografías.
    const observer = new ResizeObserver(measure);
    observer.observe(viewport);
    observer.observe(group);
    return () => observer.disconnect();
  }, [items]);

  return (
    <div className={styles.viewport} ref={viewportRef}>
      <div
        className={styles.track}
        style={
          {
            '--marquee-duration': `${duration}s`,
            // La pista mide `copies` grupos; avanzar 1/copies es avanzar uno.
            '--marquee-shift': `-${100 / copies}%`,
          } as React.CSSProperties
        }
      >
        {Array.from({ length: copies }, (_, index) => (
          <ul
            key={index}
            className={styles.group}
            ref={index === 0 ? groupRef : undefined}
            aria-hidden={index > 0 || undefined}
          >
            {items.map((item) => (
              <li key={item} className={styles.item}>
                {item}
              </li>
            ))}
          </ul>
        ))}
      </div>
    </div>
  );
}
