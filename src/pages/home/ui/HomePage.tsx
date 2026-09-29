import { About } from '@/widgets/about';
import { Clients } from '@/widgets/clients';
import { Contact } from '@/widgets/contact';
import { Experience } from '@/widgets/experience';
import { Expertise } from '@/widgets/expertise';
import { Footer } from '@/widgets/footer';
import { Hero } from '@/widgets/hero';
import { Method } from '@/widgets/method';
import { Navbar } from '@/widgets/navbar';
import { Projects } from '@/widgets/projects';
import { ScrollProgress } from '@/widgets/scroll-progress';
import { Solutions } from '@/widgets/solutions';
import { Stack } from '@/widgets/stack';
import { useI18n } from '@/shared/i18n';

/**
 * La página sólo ordena widgets: no tiene lógica ni estilos propios. Cambiar el
 * orden de las secciones se hace aquí y en ningún otro sitio.
 */
export function HomePage() {
  const { t } = useI18n();

  return (
    <>
      <a className="skip-link" href="#contenido">
        {t.a11y.skipLink}
      </a>

      <ScrollProgress />
      <Navbar />

      <main id="contenido">
        <Hero />
        <Clients />
        <Expertise />
        <Solutions />
        <Projects />
        <Experience />
        <Stack />
        <Method />
        <About />
        <Contact />
      </main>

      <Footer />
    </>
  );
}
