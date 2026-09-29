import { useCallback, useRef } from 'react';
import { m, useMotionValue, useReducedMotion, useSpring, useTransform } from 'framer-motion';
import { PhoneFrame, Picture } from '@/shared/ui';
import { useI18n } from '@/shared/i18n';
import { SPRING_TILT, staggerItem } from '@/shared/lib/motion';
import type { Project } from '../model/types';
import styles from './ProjectCard.module.css';

interface ProjectCardProps {
  project: Project;
  onOpen: (id: string) => void;
}

/** Inclinación máxima de la tarjeta, en grados. */
const TILT = 6;

export function ProjectCard({ project, onOpen }: ProjectCardProps) {
  const { t } = useI18n();
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  // −0.5 … 0.5 respecto al centro de la tarjeta.
  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const rotateX = useSpring(useTransform(py, [-0.5, 0.5], [TILT, -TILT]), SPRING_TILT);
  const rotateY = useSpring(useTransform(px, [-0.5, 0.5], [-TILT, TILT]), SPRING_TILT);

  const handleMove = useCallback(
    (event: React.PointerEvent<HTMLDivElement>) => {
      const node = ref.current;
      if (!node) return;

      const rect = node.getBoundingClientRect();
      const localX = event.clientX - rect.left;
      const localY = event.clientY - rect.top;

      // El halo se escribe directo en el nodo: mover el ratón no re-renderiza.
      node.style.setProperty('--pointer-x', `${localX}px`);
      node.style.setProperty('--pointer-y', `${localY}px`);

      if (reduced || event.pointerType !== 'mouse') return;
      px.set(localX / rect.width - 0.5);
      py.set(localY / rect.height - 0.5);
    },
    [px, py, reduced],
  );

  const resetTilt = useCallback(() => {
    px.set(0);
    py.set(0);
  }, [px, py]);

  /**
   * Toda la tarjeta abre el caso.
   *
   * El manejador vive en la tarjeta y no en el botón del título: al activar ese
   * botón con teclado el clic sintético burbujea hasta aquí, así que un solo
   * manejador cubre ratón y teclado sin duplicar la apertura.
   */
  const handleOpen = useCallback(
    (event: React.MouseEvent<HTMLElement>) => {
      // `detail === 0` es activación por teclado; sólo en un clic real hay que
      // comprobar si el usuario venía arrastrando para seleccionar texto.
      if (event.detail > 0 && window.getSelection()?.toString()) return;
      onOpen(project.id);
    },
    [onOpen, project.id],
  );

  return (
    <m.li variants={staggerItem} style={{ perspective: 1100 }}>
      <m.article
        ref={ref}
        className={styles.card}
        onClick={handleOpen}
        onPointerMove={handleMove}
        onPointerLeave={resetTilt}
        onPointerCancel={resetTilt}
        style={{ rotateX, rotateY, transformPerspective: 1100 }}
        whileHover={{ y: -5 }}
        transition={{ duration: 0.2 }}
      >
        <span className={styles.glow} aria-hidden="true" />

        <div className={styles.head}>
          <div className={styles.topRow}>
            <div>
              {/*
                El botón no lleva manejador propio: existe para que el caso sea
                alcanzable con teclado y tenga nombre accesible. Su clic sube a
                la tarjeta, que es la que abre.
              */}
              <h3 className={styles.name}>
                <button type="button" className={styles.trigger}>
                  {project.name}
                  <span className="visually-hidden">{t.projects.cardTriggerHint}</span>
                </button>
              </h3>
              <p className={styles.org}>{project.org}</p>
            </div>
            <span className={styles.status}>{project.status}</span>
          </div>

          <p className={styles.meta}>{project.meta}</p>
          <p className={styles.what}>{project.what}</p>

          <ul className={styles.chips}>
            {project.chips.map((chip) => (
              <li key={chip} className="chip">
                {chip}
              </li>
            ))}
          </ul>

          <p className={styles.cta} aria-hidden="true">
            {t.projects.cardCta}
            <span className={styles.ctaArrow}>↗</span>
          </p>
        </div>

        <div className={styles.device}>
          <PhoneFrame className={styles.phone}>
            <Picture
              src={project.cover}
              alt={project.coverAlt}
              sizes="(max-width: 760px) 45vw, 320px"
            />
          </PhoneFrame>
        </div>
      </m.article>
    </m.li>
  );
}
