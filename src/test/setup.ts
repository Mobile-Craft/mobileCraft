import '@testing-library/jest-dom/vitest';
import { afterEach, vi } from 'vitest';
import { cleanup } from '@testing-library/react';

afterEach(cleanup);

/**
 * jsdom no implementa las APIs que la página usa para medir y observar. Se
 * rellenan aquí y no en cada test para que un componente nuevo no falle por
 * algo que no tiene que ver con lo que se está probando.
 */
if (!window.matchMedia) {
  window.matchMedia = vi.fn().mockImplementation((query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    addListener: vi.fn(),
    removeListener: vi.fn(),
    dispatchEvent: vi.fn(),
  }));
}

class NoopObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
  takeRecords() {
    return [];
  }
}

vi.stubGlobal('IntersectionObserver', NoopObserver);
vi.stubGlobal('ResizeObserver', NoopObserver);

window.scrollTo = vi.fn();

/**
 * jsdom no calcula layout, así que `offsetParent` es siempre `null` y cualquier
 * comprobación de visibilidad basada en él —como la de `useFocusTrap`— da un
 * resultado vacío. Se aproxima con la regla del navegador: un elemento tiene
 * `offsetParent` si está en el documento y ni él ni sus ancestros están
 * ocultos. No es un parche del código de producción; es rellenar lo que el
 * entorno de prueba no implementa.
 */
Object.defineProperty(HTMLElement.prototype, 'offsetParent', {
  configurable: true,
  get(this: HTMLElement): Element | null {
    if (!this.isConnected) return null;
    if (this.style.display === 'none' || this.hidden) return null;

    for (let ancestor = this.parentElement; ancestor; ancestor = ancestor.parentElement) {
      if (ancestor.style.display === 'none' || ancestor.hidden) return null;
    }

    return this.parentElement ?? document.body;
  },
});
