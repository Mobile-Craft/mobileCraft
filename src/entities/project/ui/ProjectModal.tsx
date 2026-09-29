import { useCallback, useId, useState } from 'react';
import { AnimatePresence, m } from 'framer-motion';
import { Modal, PhoneFrame } from '@/shared/ui';
import { useEventListener } from '@/shared/lib/hooks';
import { imageSources } from '@/shared/lib/images';
import { useI18n } from '@/shared/i18n';
import { EASE_OUT } from '@/shared/lib/motion';
import type { Project } from '../model/types';
import styles from './ProjectModal.module.css';

interface ProjectModalProps {
  project: Project;
  onClose: () => void;
}

export function ProjectModal({ project, onClose }: ProjectModalProps) {
  const { t } = useI18n();
  const copy = t.projects.modal;
  const titleId = useId();
  const [index, setIndex] = useState(0);
  // Dirección del último cambio, para que la diapositiva entre por el lado correcto.
  const [direction, setDirection] = useState(0);

  const total = project.shots.length;

  const move = useCallback(
    (delta: number) => {
      if (total === 0) return;
      setDirection(delta);
      setIndex((current) => (current + delta + total) % total);
    },
    [total],
  );

  useEventListener('keydown', (event) => {
    if (event.key === 'ArrowRight') move(1);
    if (event.key === 'ArrowLeft') move(-1);
  });

  const shot = project.shots[index];
  const sources = imageSources(shot?.src ?? '');

  return (
    <Modal onClose={onClose} labelledBy={titleId}>
      <div className={styles.header}>
        <div style={{ minWidth: 0 }}>
          <p className={`eyebrow ${styles.org}`}>{project.org}</p>
          <h2 className={styles.name} id={titleId}>
            {project.name}
          </h2>
          <p className={styles.meta}>{project.meta}</p>
        </div>
        <button type="button" className={styles.close} onClick={onClose} aria-label={t.a11y.close}>
          <span aria-hidden="true">✕</span>
        </button>
      </div>

      <div className={styles.body}>
        <div className={styles.column}>
          <p className={styles.label}>{copy.what}</p>
          <p className={styles.paragraph}>{project.what}</p>

          <p className={styles.label}>{copy.challenge}</p>
          <p className={`${styles.paragraph} ${styles.challenge}`}>{project.challenge}</p>

          <p className={styles.label}>{copy.did}</p>
          <ul className={styles.bullets}>
            {project.bullets.map((bullet) => (
              <li key={bullet} className={styles.bullet}>
                <span>{bullet}</span>
              </li>
            ))}
          </ul>

          <p className={styles.label}>{copy.tech}</p>
          <ul className={styles.stack}>
            {project.stack.map((tech) => (
              <li key={tech} className="chip">
                {tech}
              </li>
            ))}
          </ul>

          <div className={styles.links}>
            <a className="chip" href={project.ios} target="_blank" rel="noopener noreferrer">
              {copy.ios}
            </a>
            <a className="chip" href={project.android} target="_blank" rel="noopener noreferrer">
              {copy.android}
            </a>
          </div>
        </div>

        {total > 0 ? (
          <div
            className={styles.gallery}
            role="group"
            aria-roledescription={copy.carousel}
            aria-label={copy.galleryLabel(project.name)}
          >
            <PhoneFrame className={styles.phone} notch>
              <AnimatePresence initial={false} custom={direction} mode="popLayout">
                {/*
                  El <img> tiene que ser el nodo animado, así que las variantes
                  se declaran alrededor con <source> en vez de usar <Picture>.
                */}
                <picture key={shot.src}>
                  <source type="image/avif" srcSet={sources.avif} sizes="320px" />
                  <source type="image/webp" srcSet={sources.webp} sizes="320px" />
                  <m.img
                    src={shot.src}
                    alt={shot.alt}
                    width={sources.width}
                    height={sources.height}
                    custom={direction}
                    initial={{ opacity: 0, x: direction >= 0 ? 40 : -40, filter: 'blur(6px)' }}
                    animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
                    exit={{ opacity: 0, x: direction >= 0 ? -40 : 40, filter: 'blur(6px)' }}
                    transition={{ duration: 0.32, ease: EASE_OUT }}
                    decoding="async"
                  />
                </picture>
              </AnimatePresence>
            </PhoneFrame>

            <div className={styles.controls}>
              <button
                type="button"
                className={styles.arrow}
                onClick={() => move(-1)}
                aria-label={copy.previousShot}
              >
                <span aria-hidden="true">←</span>
              </button>

              <div className={styles.dots}>
                {project.shots.map((item, i) => (
                  <button
                    key={item.src}
                    type="button"
                    className={styles.dot}
                    aria-label={copy.shotLabel(i + 1, total)}
                    aria-current={i === index}
                    onClick={() => {
                      setDirection(i > index ? 1 : -1);
                      setIndex(i);
                    }}
                  />
                ))}
              </div>

              <button
                type="button"
                className={styles.arrow}
                onClick={() => move(1)}
                aria-label={copy.nextShot}
              >
                <span aria-hidden="true">→</span>
              </button>
            </div>

            {/* El pie cambia con la diapositiva; `aria-live` lo anuncia sin mover el foco. */}
            <p className={styles.caption} aria-live="polite">
              {shot.caption}
            </p>
          </div>
        ) : null}
      </div>
    </Modal>
  );
}
