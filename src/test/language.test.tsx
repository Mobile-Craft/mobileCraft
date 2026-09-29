import { beforeEach, describe, expect, it } from 'vitest';
import userEvent from '@testing-library/user-event';
import { render, screen, waitFor } from '@testing-library/react';
import { LanguageSwitch } from '@/features/language-switcher';
import { I18nProvider, useI18n } from '@/shared/i18n';
import { SITE_URL } from '@/shared/config';

function Probe() {
  const { locale, t } = useI18n();
  return (
    <p>
      {locale}:{t.nav.cta}
    </p>
  );
}

function setUrl(search: string) {
  window.history.replaceState(null, '', `/${search}`);
}

describe('idioma', () => {
  beforeEach(() => {
    localStorage.clear();
    setUrl('');
    document.documentElement.lang = 'es';
  });

  it('arranca en el idioma que dejó resuelto el script de arranque', async () => {
    document.documentElement.lang = 'en';
    render(
      <I18nProvider>
        <Probe />
      </I18nProvider>,
    );

    // El inglés viaja en su propio chunk: llega en el siguiente tick.
    expect(await screen.findByText(/^en:/)).toBeInTheDocument();
  });

  it('cae al español cuando `lang` trae algo que no es un idioma soportado', async () => {
    document.documentElement.lang = 'fr-CA';
    render(
      <I18nProvider>
        <Probe />
      </I18nProvider>,
    );

    expect(await screen.findByText(/^es:/)).toBeInTheDocument();
  });

  it('refleja el idioma en la URL para que el enlace se pueda compartir', async () => {
    const user = userEvent.setup();
    render(
      <I18nProvider>
        <LanguageSwitch />
        <Probe />
      </I18nProvider>,
    );

    await screen.findByText(/^es:/);
    expect(window.location.search).toBe('');

    await user.click(screen.getByRole('button', { name: /english/i }));

    await waitFor(() => expect(window.location.search).toBe('?lang=en'));
    expect(document.documentElement.lang).toBe('en');
  });

  it('quita el parámetro al volver al idioma por defecto, que vive en la raíz', async () => {
    const user = userEvent.setup();
    setUrl('?lang=en');
    document.documentElement.lang = 'en';

    render(
      <I18nProvider>
        <LanguageSwitch />
        <Probe />
      </I18nProvider>,
    );

    await screen.findByText(/^en:/);
    await user.click(screen.getByRole('button', { name: /español/i }));

    await waitFor(() => expect(window.location.search).toBe(''));
  });

  it('conserva el resto de la query y el ancla al conmutar', async () => {
    const user = userEvent.setup();
    setUrl('?ref=linkedin#proyectos');

    render(
      <I18nProvider>
        <LanguageSwitch />
        <Probe />
      </I18nProvider>,
    );

    await screen.findByText(/^es:/);
    await user.click(screen.getByRole('button', { name: /english/i }));

    await waitFor(() => expect(window.location.search).toContain('lang=en'));
    expect(window.location.search).toContain('ref=linkedin');
    expect(window.location.hash).toBe('#proyectos');
  });

  it('apunta la canónica y las alternativas al idioma activo', async () => {
    const user = userEvent.setup();
    document.head.innerHTML = `
      <link rel="canonical" href="${SITE_URL}/" />
      <link rel="alternate" hreflang="es-DO" href="${SITE_URL}/" />
      <link rel="alternate" hreflang="en" href="${SITE_URL}/?lang=en" />
      <meta name="description" content="" />
      <meta property="og:url" content="" />
    `;

    render(
      <I18nProvider>
        <LanguageSwitch />
        <Probe />
      </I18nProvider>,
    );

    await screen.findByText(/^es:/);
    await user.click(screen.getByRole('button', { name: /english/i }));

    await waitFor(() =>
      expect(document.querySelector('link[rel="canonical"]')).toHaveAttribute(
        'href',
        `${SITE_URL}/?lang=en`,
      ),
    );
    expect(document.querySelector('meta[property="og:url"]')).toHaveAttribute(
      'content',
      `${SITE_URL}/?lang=en`,
    );
  });
});
