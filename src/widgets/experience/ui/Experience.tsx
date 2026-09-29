import { useId, useState } from 'react';
import { AnimatePresence, m } from 'framer-motion';
import { Reveal, SectionHeading } from '@/shared/ui';
import { useI18n } from '@/shared/i18n';
import { EASE_OUT, stagger, staggerItem, VIEWPORT } from '@/shared/lib/motion';
import styles from './Experience.module.css';

export function Experience() {
  const { t } = useI18n();
  const baseId = useId();
  // Acordeón de un solo panel: abrir uno cierra el anterior.
  const [openId, setOpenId] = useState<string | null>(t.experience.jobs[0]?.id ?? null);

  return (
    <section className="section" id="experiencia" aria-labelledby="experiencia-titulo">
      <SectionHeading
        eyebrow={t.experience.eyebrow}
        title={t.experience.title}
        titleId="experiencia-titulo"
      />

      <m.div
        className={styles.list}
        variants={stagger(0.05)}
        initial="hidden"
        whileInView="visible"
        viewport={VIEWPORT}
      >
        {t.experience.jobs.map((job) => {
          const open = openId === job.id;
          const panelId = `${baseId}-${job.id}`;

          return (
            <m.article key={job.id} className={styles.job} data-open={open} variants={staggerItem}>
              <h3>
                <button
                  type="button"
                  className={styles.summary}
                  aria-expanded={open}
                  aria-controls={panelId}
                  onClick={() => setOpenId(open ? null : job.id)}
                >
                  <span className={styles.kind} data-group={job.group}>
                    {job.kind}
                  </span>
                  <span className={styles.identity}>
                    <span className={styles.company}>{job.company}</span>
                    <span className={styles.role}>{job.role}</span>
                  </span>
                  <span className={styles.dates}>{job.dates}</span>
                  <m.span
                    className={styles.sign}
                    animate={{ rotate: open ? 45 : 0 }}
                    transition={{ duration: 0.22, ease: EASE_OUT }}
                    aria-hidden="true"
                  >
                    +
                  </m.span>
                </button>
              </h3>

              <AnimatePresence initial={false}>
                {open ? (
                  <m.div
                    id={panelId}
                    className={styles.panel}
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.32, ease: EASE_OUT }}
                  >
                    <div className={styles.panelInner}>
                      <p className={styles.summaryText}>{job.body}</p>

                      {job.bullets.length > 0 ? (
                        <ul className={styles.bullets}>
                          {job.bullets.map((bullet) => (
                            <li key={bullet} className={styles.bullet}>
                              <span>{bullet}</span>
                            </li>
                          ))}
                        </ul>
                      ) : null}

                      <ul className={styles.tech}>
                        {job.tech.map((tech) => (
                          <li key={tech} className="chip">
                            {tech}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </m.div>
                ) : null}
              </AnimatePresence>
            </m.article>
          );
        })}
      </m.div>

      <Reveal className={styles.education}>
        <p className={`eyebrow ${styles.educationLabel}`}>{t.experience.educationLabel}</p>
        <ol className={styles.timeline}>
          {t.experience.education.map((item) => (
            <li key={item.name} className={styles.milestone} data-main={item.main}>
              <p className={styles.year}>{item.year}</p>
              <p className={styles.degree}>{item.name}</p>
              <p className={styles.place}>{item.place}</p>
            </li>
          ))}
        </ol>
      </Reveal>
    </section>
  );
}
