import { beforeEach, describe, expect, it, vi } from 'vitest';
import userEvent from '@testing-library/user-event';
import { PROFILE } from '@/shared/config';
import { renderWithProviders, screen } from '@/test/render';
import { Contact } from './Contact';

/**
 * El formulario no tiene backend: compone un `mailto:`. Lo que puede romperse
 * en silencio es el escapado —un mensaje con `&` o un salto de línea corta la
 * URL y el correo llega truncado— y que se acepte un envío vacío.
 */
describe('formulario de contacto', () => {
  // jsdom no navega: se sustituye `location` por un objeto que sólo registra a
  // dónde se habría ido. El valor inicial es una URL válida porque el resto de
  // la app la lee para mantener `?lang=` sincronizado.
  beforeEach(() => {
    Object.defineProperty(window, 'location', {
      configurable: true,
      writable: true,
      value: new URL('http://localhost/') as unknown as Location,
    });
  });

  it('compone un mailto con el mensaje escapado', async () => {
    const user = userEvent.setup();
    renderWithProviders(<Contact />);

    await user.type(
      screen.getByLabelText(/qué necesitan construir/i),
      'Precio & plazo\nde una app',
    );
    await user.click(screen.getByRole('button', { name: 'Enviar' }));

    const url = new URL(window.location.href);
    expect(url.protocol).toBe('mailto:');
    expect(url.pathname).toBe(PROFILE.email);
    expect(new URLSearchParams(url.search).get('body')).toBe('Precio & plazo\nde una app');
  });

  it('añade el correo de quien escribe cuando lo rellena', async () => {
    const user = userEvent.setup();
    renderWithProviders(<Contact />);

    await user.type(screen.getByLabelText(/su correo/i), 'ana@empresa.com');
    await user.type(screen.getByLabelText(/qué necesitan construir/i), 'Hola');
    await user.click(screen.getByRole('button', { name: 'Enviar' }));

    const body = new URLSearchParams(new URL(window.location.href).search).get('body');
    expect(body).toContain('Hola');
    expect(body).toContain('ana@empresa.com');
  });

  it('no envía un mensaje vacío y lo dice', async () => {
    const user = userEvent.setup();
    renderWithProviders(<Contact />);

    await user.click(screen.getByRole('button', { name: 'Enviar' }));

    expect(window.location.href).toBe('http://localhost/');
    expect(screen.getByText(/escriba qué necesitan/i)).toBeInTheDocument();
  });

  it('ofrece el CV sólo si hay una ruta configurada', () => {
    renderWithProviders(<Contact />);
    const link = screen.queryByRole('link', { name: /descargar cv/i });

    if (PROFILE.cv) {
      expect(link).toHaveAttribute('href', PROFILE.cv);
    } else {
      expect(link).toBeNull();
    }
  });
});

// El aviso de éxito es un `aria-live`, no un alert: se comprueba que exista.
it('confirma el envío en una región anunciable', async () => {
  const user = userEvent.setup();
  vi.spyOn(console, 'error').mockImplementation(() => {});
  renderWithProviders(<Contact />);

  await user.type(screen.getByLabelText(/qué necesitan construir/i), 'Hola');
  await user.click(screen.getByRole('button', { name: 'Enviar' }));

  expect(await screen.findByText(/recibido/i)).toBeInTheDocument();
});
