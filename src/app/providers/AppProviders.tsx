import type { ReactNode } from 'react';
import { domAnimation, LazyMotion, MotionConfig } from 'framer-motion';
import { ThemeProvider } from '@/features/theme-switcher';
import { I18nProvider } from '@/shared/i18n';

/**
 * Único punto donde se componen los proveedores globales. Las capas de abajo
 * consumen el contexto con sus hooks (`useI18n`, `useTheme`) y no vuelven a
 * montar nada.
 *
 * `reducedMotion="user"` hace que toda animación de Framer Motion respete la
 * preferencia del sistema sin tener que comprobarla componente a componente:
 * las transiciones de transform y opacidad se saltan solas.
 *
 * `LazyMotion` con `domAnimation` carga sólo las features que la página usa
 * —animaciones, variantes, salida y gestos de puntero— en lugar del paquete
 * completo. `strict` convierte en error usar `motion.*` en vez de `m.*`, que es
 * lo que anularía el ahorro sin que se note.
 */
export function AppProviders({ children }: { children: ReactNode }) {
  return (
    <I18nProvider>
      <ThemeProvider>
        <LazyMotion features={domAnimation} strict>
          <MotionConfig reducedMotion="user">{children}</MotionConfig>
        </LazyMotion>
      </ThemeProvider>
    </I18nProvider>
  );
}
