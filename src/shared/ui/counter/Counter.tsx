import { useEffect, useRef, useState } from 'react';
import { animate, useInView, useReducedMotion } from 'framer-motion';

interface CounterProps {
  to: number;
  suffix?: string;
  duration?: number;
}

/**
 * Contador que arranca cuando la cifra entra en pantalla.
 *
 * El número vive en estado local (no en el DOM directamente) porque es texto
 * que los lectores de pantalla deben poder anunciar; con `prefers-reduced-motion`
 * salta directo al valor final.
 */
export function Counter({ to, suffix = '', duration = 1.1 }: CounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const reduced = useReducedMotion();
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!inView) return;
    if (reduced) {
      setValue(to);
      return;
    }
    const controls = animate(0, to, {
      duration,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (latest) => setValue(Math.round(latest)),
    });
    return () => controls.stop();
  }, [inView, to, duration, reduced]);

  return (
    <span ref={ref}>
      {value}
      {suffix}
    </span>
  );
}
