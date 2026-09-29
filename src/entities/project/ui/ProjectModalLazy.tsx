import { lazy, Suspense } from 'react';
import type { Project } from '../model/types';

/**
 * El caso completo —modal, carrusel, trampa de foco— sólo se necesita después
 * de un clic, así que viaja en su propio chunk en lugar de pesar en la primera
 * carga de todos los visitantes.
 *
 * El `fallback` es `null` a propósito: el chunk se descarga en milisegundos y
 * un esqueleto parpadeando durante ese tiempo se percibe peor que nada. La
 * animación de salida de `AnimatePresence` sigue funcionando porque el contexto
 * de presencia atraviesa el `Suspense`.
 */
const Lazy = lazy(() =>
  import('./ProjectModal').then((module) => ({ default: module.ProjectModal })),
);

interface ProjectModalProps {
  project: Project;
  onClose: () => void;
}

export function ProjectModal(props: ProjectModalProps) {
  return (
    <Suspense fallback={null}>
      <Lazy {...props} />
    </Suspense>
  );
}
