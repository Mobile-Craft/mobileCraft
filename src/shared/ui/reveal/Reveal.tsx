import { forwardRef } from 'react';
import { m, type HTMLMotionProps } from 'framer-motion';
import { fadeUp, VIEWPORT } from '@/shared/lib/motion';

interface RevealProps extends HTMLMotionProps<'div'> {
  delay?: number;
}

/**
 * Envoltorio de entrada al hacer scroll.
 *
 * Se anima una sola vez (`once: true`). Re-animar al volver a subir hace que la
 * página nunca termine de asentarse y cansa en un scroll largo como este.
 */
export const Reveal = forwardRef<HTMLDivElement, RevealProps>(function Reveal(
  { delay = 0, children, ...rest },
  ref,
) {
  return (
    <m.div
      ref={ref}
      initial="hidden"
      whileInView="visible"
      viewport={VIEWPORT}
      variants={fadeUp}
      transition={{ delay }}
      {...rest}
    >
      {children}
    </m.div>
  );
});
