import type { ReactElement, ReactNode } from 'react';
import { render, type RenderOptions } from '@testing-library/react';
import { domAnimation, LazyMotion, MotionConfig } from 'framer-motion';
import { I18nProvider } from '@/shared/i18n';

/**
 * Monta un componente con los mismos proveedores que la aplicación real.
 *
 * `LazyMotion strict` es deliberado: si alguien vuelve a usar `motion.*` en vez
 * de `m.*` —lo que anularía el ahorro de peso sin romper nada visible— el test
 * falla en lugar de dejarlo pasar.
 */
function Providers({ children }: { children: ReactNode }) {
  return (
    <I18nProvider>
      <LazyMotion features={domAnimation} strict>
        <MotionConfig reducedMotion="never">{children}</MotionConfig>
      </LazyMotion>
    </I18nProvider>
  );
}

export function renderWithProviders(ui: ReactElement, options?: Omit<RenderOptions, 'wrapper'>) {
  return render(ui, { wrapper: Providers, ...options });
}

export * from '@testing-library/react';
