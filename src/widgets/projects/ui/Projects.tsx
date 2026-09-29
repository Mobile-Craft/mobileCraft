import { useState } from 'react';
import { AnimatePresence, m } from 'framer-motion';
import { ProjectCard, ProjectModal } from '@/entities/project';
import { Aurora, Reveal } from '@/shared/ui';
import { useI18n } from '@/shared/i18n';
import { stagger, VIEWPORT } from '@/shared/lib/motion';
import styles from './Projects.module.css';

export function Projects() {
  const { t } = useI18n();
  // Se guarda el id y no el objeto: si cambia el idioma con el modal abierto,
  // el contenido se relee del diccionario nuevo en vez de quedarse congelado.
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const selected = t.projects.items.find((project) => project.id === selectedId) ?? null;

  return (
    <section className="section" id="proyectos" aria-labelledby="proyectos-titulo">
      <Aurora
        blobs={[
          { x: '94%', y: '14%', size: 480, color: 'var(--glow-cyan)', opacity: 0.22 },
          { x: '10%', y: '90%', size: 500, color: 'var(--glow-green)', opacity: 0.2 },
        ]}
      />

      <Reveal className={styles.head}>
        <p className="eyebrow">{t.projects.eyebrow}</p>
        <h2 className={styles.title} id="proyectos-titulo">
          {t.projects.title}
        </h2>
      </Reveal>

      <m.ul
        className={styles.grid}
        variants={stagger(0.06)}
        initial="hidden"
        whileInView="visible"
        viewport={VIEWPORT}
      >
        {t.projects.items.map((project) => (
          <ProjectCard key={project.id} project={project} onOpen={setSelectedId} />
        ))}
      </m.ul>

      <AnimatePresence>
        {selected ? <ProjectModal project={selected} onClose={() => setSelectedId(null)} /> : null}
      </AnimatePresence>
    </section>
  );
}
