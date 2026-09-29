import { useRef } from 'react';
import { m, useScroll, useTransform } from 'framer-motion';
import { Aurora, Picture, Reveal } from '@/shared/ui';
import { PROFILE } from '@/shared/config';
import { useI18n } from '@/shared/i18n';
import styles from './About.module.css';

export function About() {
  const { t } = useI18n();
  const figureRef = useRef<HTMLDivElement>(null);

  // Paralaje suave del retrato: la foto es un 16% más alta que su marco, así que
  // puede desplazarse dentro sin dejar huecos.
  const { scrollYProgress } = useScroll({
    target: figureRef,
    offset: ['start end', 'end start'],
  });
  const y = useTransform(scrollYProgress, [0, 1], ['-6%', '6%']);

  return (
    <section className="section" id="sobre-mi" aria-labelledby="sobre-mi-titulo">
      <Aurora
        blobs={[
          { x: '14%', y: '6%', size: 540, color: 'var(--accent)', opacity: 0.22 },
          { x: '94%', y: '94%', size: 500, color: 'var(--glow-violet)', opacity: 0.2 },
        ]}
      />

      <div className={styles.layout}>
        <Reveal className={styles.figure} ref={figureRef}>
          {/*
            El parallax vive en el envoltorio y no en el <img>: así la imagen
            puede ser un <picture> con variantes AVIF/WebP sin perder el
            movimiento.
          */}
          <m.div className={styles.portraitWrap} style={{ y }}>
            <Picture
              className={styles.portrait}
              src={PROFILE.portrait}
              alt={t.about.portraitAlt(PROFILE.shortName)}
              sizes="(max-width: 900px) 90vw, 440px"
            />
          </m.div>
        </Reveal>

        <Reveal className={styles.text} delay={0.08}>
          <p className={`eyebrow ${styles.label}`}>{t.about.eyebrow}</p>
          <h2 className={styles.pull} id="sobre-mi-titulo">
            {t.about.headline}
          </h2>
          {t.about.paragraphs.map((paragraph) => (
            <p key={paragraph} className={styles.paragraph}>
              {paragraph}
            </p>
          ))}
          <div className={styles.footnotes}>
            {t.about.footnotes.map((footnote) => (
              <p key={footnote}>{footnote}</p>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
