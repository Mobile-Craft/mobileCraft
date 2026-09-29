import { describe, expect, it, vi } from 'vitest';
import userEvent from '@testing-library/user-event';
import { render, screen, waitFor, within } from '@testing-library/react';
import { App } from '@/app';

/**
 * Prueba de humo de la página completa.
 *
 * Cubre la clase de fallo que ni los tipos ni el lint detectan: que algo
 * reviente al montar. En particular `LazyMotion strict`, que lanza si un
 * componente vuelve a usar `motion.*` en lugar de `m.*` — el cambio que
 * duplicaría el peso de Framer Motion sin romper nada visible.
 */
describe('página', () => {
  it('monta entera sin lanzar ni registrar errores', () => {
    const spy = vi.spyOn(console, 'error').mockImplementation(() => {});

    expect(() => render(<App />)).not.toThrow();
    expect(spy).not.toHaveBeenCalled();

    spy.mockRestore();
  });

  it('renderiza una sola jerarquía de encabezados con un único h1', () => {
    render(<App />);

    expect(screen.getAllByRole('heading', { level: 1 })).toHaveLength(1);
  });

  it('tiene un ancla de destino para cada enlace de la navegación', () => {
    const { container } = render(<App />);
    const nav = screen.getByRole('navigation', { name: /navegación principal/i });

    for (const link of within(nav).getAllByRole('link')) {
      const href = link.getAttribute('href') ?? '';
      if (!href.startsWith('#')) continue;
      expect(container.ownerDocument.getElementById(href.slice(1)), href).not.toBeNull();
    }
  });

  it('ofrece el salto al contenido como primer elemento enfocable', async () => {
    const user = userEvent.setup();
    render(<App />);

    await user.tab();
    expect(document.activeElement).toHaveAttribute('href', '#contenido');
  });

  it('abre el caso de un proyecto desde la tarjeta y lo cierra con Escape', async () => {
    const user = userEvent.setup();
    render(<App />);

    await user.click(screen.getAllByRole('button', { name: /mi siembra/i })[0]);

    const dialog = await screen.findByRole('dialog');
    expect(within(dialog).getByRole('heading', { level: 2 })).toHaveTextContent(/mi siembra/i);

    await user.keyboard('{Escape}');
    await waitFor(() => expect(screen.queryByRole('dialog')).toBeNull());
  });

  it('cambia todo el contenido de idioma desde el conmutador', async () => {
    const user = userEvent.setup();
    render(<App />);

    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
      /aplicaciones web y móviles/i,
    );

    await user.click(screen.getByRole('button', { name: /english/i }));

    await waitFor(() =>
      expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(/mobile apps/i),
    );
    expect(document.documentElement.lang).toBe('en');
  });
});
