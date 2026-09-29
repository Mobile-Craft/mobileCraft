import { m } from 'framer-motion';
import { SectionHeading, SpotlightCard } from '@/shared/ui';
import { useI18n } from '@/shared/i18n';
import { stagger, staggerItem, VIEWPORT } from '@/shared/lib/motion';
import styles from './Solutions.module.css';

export function Solutions() {
  const { t } = useI18n();

  return (
    <section className="section" id="aporte" aria-labelledby="aporte-titulo">
      <SectionHeading
        eyebrow={t.solutions.eyebrow}
        title={t.solutions.title}
        titleId="aporte-titulo"
        lead={t.solutions.lead}
      />

      <m.ul
        className="autoGrid"
        variants={stagger(0.05)}
        initial="hidden"
        whileInView="visible"
        viewport={VIEWPORT}
      >
        {t.solutions.items.map((solution) => (
          <m.li key={solution.id} variants={staggerItem}>
            <SpotlightCard
              className={styles.card}
              whileHover={{ y: -4 }}
              transition={{ duration: 0.2 }}
            >
              <h3 className={styles.title}>{solution.title}</h3>
              <p className={styles.who}>{solution.who}</p>
              <p className={styles.body}>{solution.body}</p>
            </SpotlightCard>
          </m.li>
        ))}
      </m.ul>
    </section>
  );
}
