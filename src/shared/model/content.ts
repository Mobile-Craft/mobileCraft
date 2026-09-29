export interface Stat {
  /** Valor final del contador animado. */
  target: number;
  suffix: string;
  label: string;
}

export interface Expertise {
  n: string;
  title: string;
  body: string;
}

export interface Solution {
  /** Identidad estable entre idiomas: sirve de `key` en las listas. */
  id: string;
  title: string;
  who: string;
  body: string;
}

export interface Shot {
  src: string;
  alt: string;
  caption: string;
}

export interface Project {
  id: string;
  name: string;
  org: string;
  status: string;
  meta: string;
  chips: string[];
  what: string;
  challenge: string;
  bullets: string[];
  stack: string[];
  ios: string;
  android: string;
  cover: string;
  coverAlt: string;
  shots: Shot[];
}

export interface Job {
  id: string;
  kind: string;
  group: 'interno' | 'cliente';
  company: string;
  role: string;
  dates: string;
  body: string;
  bullets: string[];
  tech: string[];
}

export interface Education {
  name: string;
  place: string;
  year: string;
  /** Marca la formación principal: pinta el punto de la línea de tiempo con el acento. */
  main: boolean;
}

export interface StackGroup {
  /** Identidad estable entre idiomas: sirve de `key` en las listas. */
  id: string;
  title: string;
  items: string[];
}

export interface MethodItem {
  /** Identidad estable entre idiomas: sirve de `key` en las listas. */
  id: string;
  title: string;
  body: string;
}

export interface NavLink {
  href: string;
  label: string;
}
