import { Marquee, Reveal } from '@/shared/ui';
import { CLIENTS } from '@/shared/config';
import { useI18n } from '@/shared/i18n';
import styles from './Clients.module.css';

export function Clients() {
  const { t } = useI18n();

  return (
    <section className={styles.section} aria-label={t.clients.aria}>
      {/*
        La cinta va a sangre y sólo el texto se queda en la columna: encerrada en
        el `shell` los nombres se cortaban contra el borde de la columna, que se
        lee como texto truncado en vez de como una cinta que cruza la pantalla.
      */}
      <Reveal className={styles.inner}>
        <p className={`shell eyebrow ${styles.label}`}>{t.clients.label}</p>
        <Marquee items={CLIENTS} />
        <p className={`shell ${styles.footnote}`}>{t.clients.footnote}</p>
      </Reveal>
    </section>
  );
}
