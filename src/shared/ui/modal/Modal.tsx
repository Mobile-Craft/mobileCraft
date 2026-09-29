import { useRef, type ReactNode } from 'react';
import { createPortal } from 'react-dom';
import { m } from 'framer-motion';
import { useEventListener, useFocusTrap, useLockBodyScroll } from '@/shared/lib/hooks';
import { EASE_OUT } from '@/shared/lib/motion';
import styles from './Modal.module.css';

interface ModalProps {
  onClose: () => void;
  labelledBy: string;
  children: ReactNode;
}

/**
 * Capa modal accesible: portal al `body`, trampa de foco, cierre con Escape y
 * con clic fuera, y bloqueo del scroll de fondo.
 *
 * Se monta sólo cuando está abierto; la animación de salida la orquesta el
 * `AnimatePresence` del componente padre.
 */
export function Modal({ onClose, labelledBy, children }: ModalProps) {
  const dialogRef = useRef<HTMLDivElement>(null);

  useLockBodyScroll(true);
  useFocusTrap(dialogRef, true);
  useEventListener('keydown', (event) => {
    if (event.key === 'Escape') onClose();
  });

  return createPortal(
    <m.div
      className={styles.overlay}
      onClick={onClose}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
    >
      <m.div
        ref={dialogRef}
        className={styles.dialog}
        role="dialog"
        aria-modal="true"
        aria-labelledby={labelledBy}
        // El clic dentro no debe llegar al overlay y cerrar el diálogo.
        onClick={(event) => event.stopPropagation()}
        initial={{ opacity: 0, scale: 0.96, y: 12 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.97, y: 8 }}
        transition={{ duration: 0.3, ease: EASE_OUT }}
      >
        {children}
      </m.div>
    </m.div>,
    document.body,
  );
}
