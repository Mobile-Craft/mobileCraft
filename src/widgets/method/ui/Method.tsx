import { m } from 'framer-motion';
import { Reveal } from '@/shared/ui';
import { useI18n } from '@/shared/i18n';
import { stagger, staggerItem, VIEWPORT } from '@/shared/lib/motion';
import styles from './Method.module.css';

export function Method() {
  const { t } = useI18n();

  return (
    <section className="section" id="metodo" aria-labelledby="metodo-titulo">
      <div className={styles.layout}>
        <Reveal className={styles.aside}>
          <p className="eyebrow">{t.method.eyebrow}</p>
          <h2 className={styles.title} id="metodo-titulo">
            {t.method.title}
          </h2>
        </Reveal>

        <m.ul
          className={styles.list}
          variants={stagger(0.07)}
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT}
        >
          {t.method.items.map((item) => (
            <m.li key={item.id} className={styles.item} variants={staggerItem}>
              <h3 className={styles.itemTitle}>{item.title}</h3>
              <p className={styles.itemBody}>{item.body}</p>
            </m.li>
          ))}
        </m.ul>
      </div>
    </section>
  );
}
