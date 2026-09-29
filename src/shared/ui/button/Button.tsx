import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from 'react';
import { Magnetic } from '@/shared/ui/magnetic';
import styles from './Button.module.css';

type Variant = 'primary' | 'ghost';

interface CommonProps {
  variant?: Variant;
  /** Desactiva la atracción al cursor (útil dentro de listas densas). */
  magnetic?: boolean;
  children: ReactNode;
  className?: string;
}

type LinkProps = CommonProps & AnchorHTMLAttributes<HTMLAnchorElement> & { href: string };
type ActionProps = CommonProps & ButtonHTMLAttributes<HTMLButtonElement> & { href?: undefined };

/** Botón o enlace con el mismo aspecto; el elemento lo decide la presencia de `href`. */
export function Button(props: LinkProps | ActionProps) {
  const { variant = 'primary', magnetic = true, className, children, ...rest } = props;
  const classes = [styles.button, styles[variant], className].filter(Boolean).join(' ');

  const element =
    'href' in rest && rest.href ? (
      <a className={classes} {...(rest as AnchorHTMLAttributes<HTMLAnchorElement>)}>
        {children}
      </a>
    ) : (
      <button
        type="button"
        className={classes}
        {...(rest as ButtonHTMLAttributes<HTMLButtonElement>)}
      >
        {children}
      </button>
    );

  return magnetic ? <Magnetic strength={7}>{element}</Magnetic> : element;
}
