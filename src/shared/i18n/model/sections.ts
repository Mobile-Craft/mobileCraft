import { es } from '../lib/es';

/**
 * Ids de las secciones enlazadas desde la navegación.
 *
 * Los `href` son anclas del DOM, no texto: son idénticos en todos los idiomas,
 * así que se derivan del diccionario de referencia. Traducir una etiqueta no
 * cambia a qué sección apunta ni qué sección se marca como activa.
 */
export const NAV_SECTION_IDS = es.nav.links.map((link) => link.href.slice(1));
