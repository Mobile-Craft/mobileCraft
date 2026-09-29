import type { ReactNode } from 'react';
import { Reveal } from '@/shared/ui/reveal';
import styles from './SectionHeading.module.css';

interface SectionHeadingProps {
  eyebrow: string;
  title: ReactNode;
  lead?: ReactNode;
  /** Id del `aria-labelledby` de la sección contenedora. */
  titleId?: string;
  className?: string;
}

export function SectionHeading({ eyebrow, title, lead, titleId, className }: SectionHeadingProps) {
  return (
    <Reveal className={[styles.heading, className].filter(Boolean).join(' ')}>
      <p className={styles.eyebrow}>{eyebrow}</p>
      <h2 className={styles.title} id={titleId}>
        {title}
      </h2>
      {lead ? <p className={styles.lead}>{lead}</p> : null}
    </Reveal>
  );
}
