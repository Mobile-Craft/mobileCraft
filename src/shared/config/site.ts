/**
 * Origen público del sitio.
 *
 * Open Graph y JSON-LD exigen URLs absolutas: una ruta relativa hace que
 * LinkedIn, WhatsApp y Slack rendericen el enlace sin imagen. Todo lo que salga
 * del documento se compone con `absoluteUrl()`, nunca a mano.
 */
export const SITE_URL = 'https://eldertavarez.dev';

export function absoluteUrl(path: string): string {
  return new URL(path, SITE_URL).href;
}

/** Identidad y contacto: no cambian con el idioma. */
export const PROFILE = {
  name: 'Elder Moises Tavárez',
  shortName: 'Elder Tavárez',
  email: 'moisestavarez20@gmail.com',
  linkedin: {
    href: 'https://www.linkedin.com/in/elder-moises-tavarez-4874b9151/',
    label: 'Elder Moisés Tavárez',
  },
  /**
   * Perfil de GitHub. Con `href` vacío el enlace no se renderiza en ningún
   * sitio y tampoco entra en el `sameAs` del JSON-LD: rellenarlo es lo único
   * que hace falta para activarlo en toda la página.
   */
  github: {
    href: '',
    label: '',
  },
  /**
   * CV en PDF. Igual que GitHub: si la ruta está vacía el botón no aparece, así
   * que el sitio nunca publica un enlace roto mientras el archivo no exista.
   */
  cv: '/assets/cv-elder-tavarez.pdf',
  portrait: '/assets/elder.jpg',
} as const;

/** Enlaces sociales verificables, para el `sameAs` de los datos estructurados. */
export const SOCIAL_LINKS: readonly string[] = [PROFILE.linkedin.href, PROFILE.github.href].filter(
  Boolean,
);

/** Nombres propios: se muestran igual en cualquier idioma. */
export const CLIENTS = [
  'Banreservas',
  'AFP Siembra',
  'Grupo Humano',
  'Autoridad Portuaria Dominicana',
  'Solvex Dominicana',
  'RedBote',
];
