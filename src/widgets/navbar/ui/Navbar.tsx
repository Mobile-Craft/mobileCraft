import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { AnimatePresence, m, useMotionValueEvent, useScroll } from 'framer-motion';
import { LanguageSwitch } from '@/features/language-switcher';
import { ThemeToggle } from '@/features/theme-switcher';
import { PROFILE } from '@/shared/config';
import { Logo } from '@/shared/ui';
import { NAV_SECTION_IDS, useI18n } from '@/shared/i18n';
import {
  useActiveSection,
  useEventListener,
  useLockBodyScroll,
  useMediaQuery,
} from '@/shared/lib/hooks';
import { EASE_OUT } from '@/shared/lib/motion';
import styles from './Navbar.module.css';

export function Navbar() {
  const { locale, t } = useI18n();
  const isNarrow = useMediaQuery('(max-width: 760px)');
  const [menuOpen, setMenuOpen] = useState(false);
  const [stuck, setStuck] = useState(false);

  const active = useActiveSection(NAV_SECTION_IDS);

  /**
   * Posición del subrayado activo.
   *
   * Se mide del propio enlace y se pasa a CSS como custom properties, así que
   * moverlo no cuesta un render ni obliga a cargar las animaciones de layout de
   * Framer Motion. Hay que recalcular al traducir —cambian los anchos— y al
   * redimensionar.
   */
  const linksRef = useRef<HTMLDivElement>(null);
  const underlineRef = useRef<HTMLSpanElement>(null);

  const placeUnderline = useCallback(() => {
    const bar = underlineRef.current;
    if (!bar) return;

    const current = linksRef.current?.querySelector<HTMLElement>('[aria-current="true"]');
    if (!current) {
      bar.style.setProperty('--underline-o', '0');
      return;
    }

    bar.style.setProperty('--underline-w', `${current.offsetWidth}px`);
    bar.style.setProperty('--underline-x', `${current.offsetLeft}px`);
    bar.style.setProperty('--underline-o', '1');
    bar.dataset.ready = 'true';
  }, []);

  useLayoutEffect(placeUnderline, [placeUnderline, active, locale]);
  useEventListener('resize', placeUnderline);

  const { scrollY } = useScroll();
  useMotionValueEvent(scrollY, 'change', (latest) => setStuck(latest > 8));

  // El panel sólo existe en anchos estrechos: si la ventana crece, se cierra.
  useEffect(() => {
    if (!isNarrow) setMenuOpen(false);
  }, [isNarrow]);

  useEventListener('keydown', (event) => {
    if (event.key === 'Escape') setMenuOpen(false);
  });

  useLockBodyScroll(menuOpen);

  return (
    <m.nav
      className={styles.nav}
      data-stuck={stuck}
      aria-label={t.a11y.mainNav}
      initial={{ y: -24, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: EASE_OUT }}
    >
      <div className={`shell ${styles.inner}`}>
        <a href="#inicio" className={styles.brand}>
          <span className={styles.pulse} aria-hidden="true" />
          <Logo title={PROFILE.shortName} className={styles.logo} />
        </a>

        <div className={styles.links} ref={linksRef}>
          {t.nav.links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={styles.link}
              aria-current={active === link.href.slice(1) ? 'true' : undefined}
            >
              {link.label}
            </a>
          ))}
          <span
            className={styles.underline}
            ref={underlineRef}
            data-ready="false"
            aria-hidden="true"
          />
        </div>

        <div className={styles.actions}>
          <LanguageSwitch />
          <ThemeToggle />

          <button
            type="button"
            className={styles.burger}
            onClick={() => setMenuOpen((open) => !open)}
            aria-expanded={menuOpen}
            aria-controls="menu-movil"
            aria-label={menuOpen ? t.a11y.closeMenu : t.a11y.openMenu}
          >
            <span className={styles.burgerLines} aria-hidden="true">
              <span />
              <span />
              <span />
            </span>
          </button>
        </div>
      </div>

      <AnimatePresence>
        {menuOpen && isNarrow ? (
          <m.div
            id="menu-movil"
            className={styles.panel}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.28, ease: EASE_OUT }}
          >
            <div className={`shell ${styles.panelInner}`}>
              {t.nav.links.map((link, index) => (
                <m.a
                  key={link.href}
                  href={link.href}
                  className={styles.panelLink}
                  onClick={() => setMenuOpen(false)}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.04 * index + 0.06, duration: 0.3, ease: EASE_OUT }}
                >
                  <span>{link.label}</span>
                  <span className={styles.panelArrow} aria-hidden="true">
                    ↓
                  </span>
                </m.a>
              ))}
              <a
                href={`mailto:${PROFILE.email}`}
                className={styles.panelCta}
                onClick={() => setMenuOpen(false)}
              >
                {t.nav.cta}
              </a>
            </div>
          </m.div>
        ) : null}
      </AnimatePresence>
    </m.nav>
  );
}
