import { PROFILE } from '@/shared/config';
import { useI18n } from '@/shared/i18n';
import styles from './Footer.module.css';

export function Footer() {
  const { t } = useI18n();
  const year = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={`shell ${styles.inner}`}>
        <span className={styles.copy}>
          © {year} {PROFILE.shortName} · {t.footer.role}
        </span>

        <nav className={styles.links} aria-label={t.footer.linksLabel}>
          <a className={styles.link} href={`mailto:${PROFILE.email}`}>
            {PROFILE.email}
          </a>
          <a
            className={styles.link}
            href={PROFILE.linkedin.href}
            target="_blank"
            rel="noopener noreferrer"
          >
            LinkedIn
          </a>
          {/* Sin URL configurada el enlace no existe, en vez de apuntar a nada. */}
          {PROFILE.github.href ? (
            <a
              className={styles.link}
              href={PROFILE.github.href}
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub
            </a>
          ) : null}
        </nav>
      </div>
    </footer>
  );
}
