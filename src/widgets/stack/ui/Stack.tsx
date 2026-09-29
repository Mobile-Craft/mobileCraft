import { m } from 'framer-motion';
import { Aurora, SectionHeading } from '@/shared/ui';
import { useI18n } from '@/shared/i18n';
import { stagger, staggerItem, VIEWPORT } from '@/shared/lib/motion';
import styles from './Stack.module.css';

export function Stack() {
  const { t } = useI18n();

  return (
    <section className="section" id="stack" aria-labelledby="stack-titulo">
      <Aurora
        blobs={[
          { x: '90%', y: '10%', size: 520, color: 'var(--glow-green)', opacity: 0.22 },
          { x: '6%', y: '92%', size: 520, color: 'var(--glow-cyan)', opacity: 0.2 },
        ]}
      />

      <SectionHeading eyebrow={t.stack.eyebrow} title={t.stack.title} titleId="stack-titulo" />

      <m.ul
        className="autoGrid"
        style={{ gap: 'clamp(14px, 2vw, 20px)' }}
        variants={stagger(0.045)}
        initial="hidden"
        whileInView="visible"
        viewport={VIEWPORT}
      >
        {t.stack.groups.map((group) => (
          <m.li key={group.id} className={styles.group} variants={staggerItem}>
            <h3 className={styles.groupTitle}>{group.title}</h3>
            <ul className={styles.items}>
              {group.items.map((item) => (
                <li key={item} className="chip chip--mono">
                  {item}
                </li>
              ))}
            </ul>
          </m.li>
        ))}
      </m.ul>
    </section>
  );
}
