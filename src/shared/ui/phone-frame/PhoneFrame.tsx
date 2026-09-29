import type { ReactNode } from 'react';
import styles from './PhoneFrame.module.css';

interface PhoneFrameProps {
  children: ReactNode;
  /** Muesca superior: sólo en el visor grande del modal. */
  notch?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

/** Marco de teléfono. Decorativo, así que no aporta semántica propia. */
export function PhoneFrame({ children, notch = false, className, style }: PhoneFrameProps) {
  return (
    <div className={[styles.frame, className].filter(Boolean).join(' ')} style={style}>
      <div className={styles.screen}>
        {children}
        {notch ? <span className={styles.notch} aria-hidden="true" /> : null}
      </div>
    </div>
  );
}
