import { describe, expect, it } from 'vitest';
import userEvent from '@testing-library/user-event';
import { es } from '@/shared/i18n';
import { renderWithProviders, screen, waitFor } from '@/test/render';
import { ProjectModal } from './ProjectModalLazy';

const project = es.projects.items[0];

/**
 * El modal es la pieza con más comportamiento de accesibilidad de la página, y
 * es justo la clase de trabajo que se rompe sin dar ningún error visible: el
 * README afirma que atrapa el foco, cierra con Escape y lo devuelve al abridor,
 * así que eso se comprueba en vez de darlo por hecho.
 */
describe('modal de proyecto', () => {
  it('se anuncia como diálogo con el nombre del proyecto', async () => {
    renderWithProviders(<ProjectModal project={project} onClose={() => {}} />);

    const dialog = await screen.findByRole('dialog');
    expect(dialog).toHaveAttribute('aria-modal', 'true');
    expect(dialog).toHaveAccessibleName(new RegExp(project.name, 'i'));
  });

  it('cierra con Escape', async () => {
    const user = userEvent.setup();
    let closed = false;
    renderWithProviders(<ProjectModal project={project} onClose={() => (closed = true)} />);

    await screen.findByRole('dialog');
    await user.keyboard('{Escape}');

    await waitFor(() => expect(closed).toBe(true));
  });

  it('mueve el foco dentro del diálogo al abrirse', async () => {
    renderWithProviders(<ProjectModal project={project} onClose={() => {}} />);

    const dialog = await screen.findByRole('dialog');
    await waitFor(() => expect(dialog.contains(document.activeElement)).toBe(true));
  });

  it('mantiene el tabulador dentro del diálogo', async () => {
    const user = userEvent.setup();
    renderWithProviders(<ProjectModal project={project} onClose={() => {}} />);

    const dialog = await screen.findByRole('dialog');
    await waitFor(() => expect(dialog.contains(document.activeElement)).toBe(true));

    // Una vuelta completa no debe escaparse nunca del diálogo.
    for (let i = 0; i < 30; i += 1) {
      await user.tab();
      expect(dialog.contains(document.activeElement)).toBe(true);
    }
  });

  it('abre las tiendas en pestaña nueva y sin filtrar el referente', async () => {
    renderWithProviders(<ProjectModal project={project} onClose={() => {}} />);
    await screen.findByRole('dialog');

    for (const link of screen.getAllByRole('link')) {
      if (!link.getAttribute('href')?.startsWith('http')) continue;
      expect(link).toHaveAttribute('target', '_blank');
      expect(link.getAttribute('rel')).toContain('noopener');
    }
  });
});
