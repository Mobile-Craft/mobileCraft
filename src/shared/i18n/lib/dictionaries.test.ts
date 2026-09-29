import { describe, expect, it } from 'vitest';
import { en } from './en';
import { es } from './es';

type Node = unknown;

/** Camino completo de cada hoja, para que el fallo diga exactamente dónde está. */
function leaves(node: Node, path: string[] = []): string[] {
  if (Array.isArray(node)) {
    return node.flatMap((item, index) => leaves(item, [...path, `[${index}]`]));
  }
  if (node && typeof node === 'object') {
    return Object.entries(node).flatMap(([key, value]) => leaves(value, [...path, key]));
  }
  return [`${path.join('.')}:${typeof node}`];
}

function texts(node: Node, path: string[] = []): [string, string][] {
  if (Array.isArray(node)) {
    return node.flatMap((item, index) => texts(item, [...path, `[${index}]`]));
  }
  if (node && typeof node === 'object') {
    return Object.entries(node).flatMap(([key, value]) => texts(value, [...path, key]));
  }
  return typeof node === 'string' ? [[path.join('.'), node]] : [];
}

/**
 * `Dictionary = typeof es` obliga a que las claves coincidan, pero no comprueba
 * ni que los arrays tengan la misma longitud ni que el contenido esté de verdad
 * traducido. Estas son las dos formas reales de que un idioma se rompa.
 */
describe('paridad de diccionarios', () => {
  it('tiene exactamente las mismas hojas, con el mismo tipo y en el mismo orden', () => {
    expect(leaves(en)).toEqual(leaves(es));
  });

  it('no deja prosa sin traducir', () => {
    /*
     * Sólo se miran los campos que son frases. Las listas de tecnologías, los
     * nombres de empresa y las URLs son iguales en los dos idiomas a propósito,
     * así que compararlas produciría ruido en vez de fallos reales.
     */
    const PROSE = new RegExp(
      [
        'title$',
        'body$',
        'lead$',
        'headline$',
        'description$',
        'what$',
        'challenge$',
        'who$',
        'caption$',
        'alt$',
        'bullets\\.\\[\\d+\\]$',
        'paragraphs\\.\\[\\d+\\]$',
      ].join('|'),
    );

    const spanish = new Map(texts(es));
    const untranslated = texts(en).filter(
      ([path, value]) => PROSE.test(path) && spanish.get(path) === value,
    );

    expect(untranslated).toEqual([]);
  });

  it('mantiene los mismos ids en las listas con identidad estable', () => {
    const ids = (dictionary: typeof es) => ({
      solutions: dictionary.solutions.items.map((item) => item.id),
      projects: dictionary.projects.items.map((item) => item.id),
      jobs: dictionary.experience.jobs.map((item) => item.id),
      stack: dictionary.stack.groups.map((item) => item.id),
      method: dictionary.method.items.map((item) => item.id),
    });

    expect(ids(en)).toEqual(ids(es));
  });

  it('mantiene los anclas de navegación idénticas, porque son ids del DOM', () => {
    expect(en.nav.links.map((link) => link.href)).toEqual(es.nav.links.map((link) => link.href));
  });
});
