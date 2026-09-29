import { m } from 'framer-motion';
import { stagger, wordReveal } from '@/shared/lib/motion';
import styles from './SplitText.module.css';

interface SplitTextProps {
  text: string;
  className?: string;
  delay?: number;
}

/**
 * Titular que entra palabra a palabra.
 *
 * El texto completo queda en un `<span>` accesible y las palabras animadas van
 * `aria-hidden`: así el lector de pantalla anuncia la frase de una vez en lugar
 * de leerla troceada, y el copiar/pegar sigue devolviendo el texto original.
 */
export function SplitText({ text, className, delay = 0 }: SplitTextProps) {
  const words = text.split(' ');

  return (
    <span className={className}>
      <span className="visually-hidden">{text}</span>
      <m.span
        className={styles.line}
        aria-hidden="true"
        variants={stagger(0.045, delay)}
        initial="hidden"
        animate="visible"
      >
        {words.map((word, i) => (
          <m.span key={`${word}-${i}`} className={styles.word} variants={wordReveal}>
            {word}
            {i < words.length - 1 ? ' ' : ''}
          </m.span>
        ))}
      </m.span>
    </span>
  );
}
