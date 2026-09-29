import { LOCALE_LABELS, LOCALE_NAMES, LOCALES, useI18n } from '@/shared/i18n';
import styles from './LanguageSwitch.module.css';

/** Selector de idioma: un botón por locale, con el activo marcado. */
export function LanguageSwitch() {
  const { locale, t, setLocale } = useI18n();

  return (
    <div className={styles.group} role="group" aria-label={t.a11y.languageGroup}>
      {LOCALES.map((option) => (
        <button
          key={option}
          type="button"
          className={styles.option}
          aria-pressed={locale === option}
          aria-label={t.a11y.switchLanguage(LOCALE_NAMES[option])}
          title={LOCALE_NAMES[option]}
          onClick={() => setLocale(option)}
        >
          {LOCALE_LABELS[option]}
        </button>
      ))}
    </div>
  );
}
