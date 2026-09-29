import { m } from 'framer-motion';
import { Aurora, SectionHeading, SpotlightCard } from '@/shared/ui';
import { useI18n } from '@/shared/i18n';
import { stagger, staggerItem, VIEWPORT } from '@/shared/lib/motion';
import styles from './Expertise.module.css';

export function Expertise() {
  const { t } = useI18n();

  return (
    <section className="section section--first" id="experto" aria-labelledby="experto-titulo">
      <Aurora
        blobs={[
          { x: '10%', y: '8%', size: 460, color: 'var(--accent)', opacity: 0.24 },
          { x: '88%', y: '92%', size: 520, color: 'var(--glow-violet)', opacity: 0.22 },
        ]}
      />

      <SectionHeading
        eyebrow={t.expertise.eyebrow}
        title={t.expertise.title}
        titleId="experto-titulo"
        lead={t.expertise.lead}
      />

      <m.ul
        className="autoGrid"
        style={{ '--card-min': '320px' } as React.CSSProperties}
        variants={stagger(0.06)}
        initial="hidden"
        whileInView="visible"
        viewport={VIEWPORT}
      >
        {t.expertise.items.map((item) => (
          <m.li key={item.n} variants={staggerItem}>
            <SpotlightCard
              className={styles.card}
              whileHover={{ y: -4 }}
              transition={{ duration: 0.2 }}
              style={{ height: '100%' }}
            >
              <span className={styles.index}>{item.n}</span>
              <h3 className={styles.title}>{item.title}</h3>
              <p className={styles.body}>{item.body}</p>
            </SpotlightCard>
          </m.li>
        ))}
      </m.ul>
    </section>
  );
}
