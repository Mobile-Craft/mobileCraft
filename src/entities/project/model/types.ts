/**
 * La forma de un proyecto se define en `shared/model` porque los diccionarios
 * de i18n —que viven en `shared`— son los que tipan el contenido. La entidad
 * la reexporta para que las capas de arriba hablen siempre en su lenguaje.
 */
export type { Project, Shot } from '@/shared/model';
