import { AnimatePresence, m } from 'framer-motion';
import { useI18n } from '@/shared/i18n';
import { EASE_OUT } from '@/shared/lib/motion';
import { useTheme } from '../model/context';
import styles from './ThemeToggle.module.css';

/** Alterna claro/oscuro. El icono cruza con una rotación corta al cambiar. */
export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const { t } = useI18n();

  return (
    <button
      type="button"
      className={styles.button}
      onClick={toggleTheme}
      aria-label={theme === 'dark' ? t.a11y.themeToLight : t.a11y.themeToDark}
      title={t.a11y.themeToggle}
    >
      <AnimatePresence mode="wait" initial={false}>
        <m.span
          key={theme}
          initial={{ opacity: 0, rotate: -90, scale: 0.6 }}
          animate={{ opacity: 1, rotate: 0, scale: 1 }}
          exit={{ opacity: 0, rotate: 90, scale: 0.6 }}
          transition={{ duration: 0.22, ease: EASE_OUT }}
          aria-hidden="true"
        >
          {theme === 'dark' ? '☾' : '☀'}
        </m.span>
      </AnimatePresence>
    </button>
  );
}
