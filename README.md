# Portafolio — Elder Tavárez

Portafolio personal de Elder Tavárez, Ingeniero de Software Móvil (React Native · Flutter).
Construido con **React + Vite + TypeScript**, sin framework de UI ni utilidades CSS: sólo
CSS Modules sobre un conjunto de tokens, y Framer Motion para el movimiento.

## Puesta en marcha

```bash
npm install
npm run dev
```

| Script               | Qué hace                                                 |
| -------------------- | -------------------------------------------------------- |
| `npm run dev`        | Servidor de desarrollo con HMR                           |
| `npm run build`      | Chequeo de tipos + build de producción a `dist/`         |
| `npm run preview`    | Sirve el build de producción                             |
| `npm run test`       | Vitest, una pasada                                       |
| `npm run test:watch` | Vitest en modo observación                               |
| `npm run lint`       | ESLint, incluidas las reglas de capas de FSD             |
| `npm run typecheck`  | Sólo TypeScript                                          |
| `npm run format`     | Prettier sobre todo el repo                              |
| `npm run images`     | Regenera variantes AVIF/WebP y la portada de Open Graph  |
| `npm run check`      | Tipos + lint + formato + tests: lo mismo que corre en CI |

`npm run check` es literalmente lo que ejecuta `.github/workflows/ci.yml` en cada push y
cada pull request.

## Arquitectura

El proyecto sigue [Feature-Sliced Design](https://feature-sliced.design/). El código se
organiza en **capas**, cada capa en **slices** y cada slice en **segmentos** (`ui`, `model`,
`lib`, `config`).

```
src/
  app/          Arranque: proveedores globales y estilos base.
  test/         Utilidades de prueba y los tests que cruzan varias capas.
  pages/        Composición de una pantalla. Sólo ordena widgets.
  widgets/      Bloques autónomos de la página: navbar, hero, proyectos, contacto…
  features/     Acciones del usuario: cambiar de tema, cambiar de idioma.
  entities/     Conceptos de negocio con presentación propia: project.
  shared/       Sin dominio y reutilizable: ui, hooks, i18n, config, tipos de contenido.
  main.tsx      Punto de entrada. Monta `app/`.
```

### Las dos reglas

1. **Una capa sólo importa de las capas de abajo.** `widgets` puede usar `features`,
   `entities` y `shared`; nunca al revés. Dos slices de la misma capa tampoco se importan
   entre sí: lo que compartan baja de capa.
2. **Un slice se importa por su API pública**, el `index.ts` de su raíz —
   `@/widgets/navbar`, no `@/widgets/navbar/ui/Navbar`. Lo que no está en el `index.ts` es
   interno y se puede mover sin avisar a nadie.

Las dos reglas están puestas como error en `eslint.config.js`, así que `npm run lint` las
verifica en cada cambio en vez de dejarlas en la documentación.

`shared` es la excepción a la regla 2: no tiene slices sino segmentos, y esos segmentos
—`@/shared/ui`, `@/shared/lib/hooks`, `@/shared/i18n`— sí son públicos.

### Dónde está cada cosa

```
app/
  providers/       I18nProvider + ThemeProvider + MotionConfig, montados una vez.
  styles/          tokens.css (color, tipografía, espacio, curvas) y global.css (reset y base).
pages/home/        La única página: el orden de las secciones se decide aquí.
widgets/           navbar, scroll-progress, hero, clients, expertise, solutions, projects,
                   experience, stack, method, about, contact, footer.
features/
  theme-switcher/  Estado del tema claro/oscuro + el control que lo cambia.
  language-switcher/ El conmutador ES/EN.
entities/project/  Tarjeta y modal de proyecto: la forma de "un proyecto" en pantalla.
shared/
  ui/              Primitivas sin dominio: Button, Modal, Reveal, Marquee, PhoneFrame, Picture…
  lib/             motion.ts (variantes y curvas), images/ (manifiesto de variantes) y
                   hooks/ (media query, focus trap, scroll lock…).
  i18n/            Diccionarios es/en, contexto, proveedor y RichText.
  config/          Identidad y contacto: no cambian con el idioma.
  model/           Los tipos del contenido (Project, Job, Stat…).
```

El contenido vive separado de la presentación: para actualizar un proyecto o un empleo se
edita `src/shared/i18n/lib/es.ts` y su equivalente en inglés, no un componente.

**Por qué los tipos de contenido están en `shared/model` y no en cada entidad.** Los
diccionarios de i18n son los que tipan el contenido y viven en `shared`; si `Project` viviera
en `entities/project`, `shared` tendría que importar hacia arriba. La entidad reexporta el
tipo en su API pública, así que las capas de arriba siguen escribiendo
`import type { Project } from '@/entities/project'`.

## Decisiones

**Una sola decisión, tomada una vez.** El script de arranque de `index.html` resuelve tema e
idioma antes del primer paint y los escribe en `<html>`. React lee ese resultado en vez de
repetir la regla: cuando estaba duplicada, el script miraba `navigator.language` y React
`navigator.languages`, así que podían discrepar y la página arrancaba anunciando un idioma y
renderizando otro. El tema es sólo un atributo: todo el cambio de color ocurre en CSS, sin
recalcular estilos desde JavaScript.

**Un acento, no tres.** Antes el visitante podía elegir entre tres colores desde la barra.
Una identidad personal no se repinta a gusto de quien mira, y un color de marca deja de
significar algo si cada quien ve uno distinto.

**Idioma compartible.** El idioma viaja en `?lang=`, así que se puede mandar el enlace ya
traducido. `I18nProvider` mantiene sincronizados `<html lang>`, el título, la descripción,
las etiquetas de Open Graph, la canónica y las alternativas `hreflang`.

**Movimiento con presupuesto.** Las auroras de fondo se pintan como varios `radial-gradient`
en una sola capa por sección. La primera versión usaba un `<div>` con `filter: blur()` por
halo — unas veinte capas compuestas en toda la página — y el scroll se atascaba. Un degradado
radial ya es suave, así que el desenfoque no aportaba nada que justificara ese coste.

**Fondo a sangre, contenido medido.** Las secciones ocupan el ancho completo y centran su
contenido con `padding-inline: max(--gutter, (100% - --shell) / 2 + --gutter)`, en vez de
`max-width` + `margin: auto`. Así los halos decorativos son `inset-inline: 0` y llegan al borde
en cualquier resolución, sin cuentas con `100vw` — que nunca cuadran, porque `100vw` incluye la
barra de scroll y el ancho real del contenido no.

**Nada que se mueva sin permiso.** `MotionConfig reducedMotion="user"` desactiva de golpe las
animaciones de transform y layout cuando el sistema lo pide, y `global.css` neutraliza las
animaciones declaradas en CSS. Los efectos de puntero (imán, inclinación 3D, halo) sólo se
activan con ratón, nunca en táctil.

**Accesibilidad.** Un solo anillo de foco para toda la app; el modal es un `dialog` con
trampa de foco, cierre con `Escape` y devolución del foco al abridor; las tarjetas de proyecto
usan el patrón de "tarjeta enlazada" (un único botón dentro del `h3` cuyo `::after` cubre la
tarjeta) para que todo el área sea clicable sin romper la jerarquía de encabezados ni duplicar
paradas de tabulación.

**Rendimiento del puntero.** Las posiciones del cursor para los halos se escriben como custom
properties directamente en el nodo. Mover el ratón sobre una tarjeta no provoca ningún render
de React.

**Presupuesto de peso.** La primera carga son ~104 kB comprimidos. Framer Motion se monta con
`LazyMotion` + `domAnimation` en lugar del paquete completo —de ahí que los componentes sean
`m.div` y no `motion.div`, y que `strict` lo verifique—, el diccionario en inglés y el modal
de proyecto viajan en chunks aparte, y el subrayado del navbar se anima en CSS porque la
animación compartida de layout era lo único que obligaba a cargar todas las features. El
número que muestra la tarjeta del hero lo mide `vite/plugins/buildInfo.ts` sobre el bundle
real, no está escrito a mano.

**Imágenes.** `npm run images` deriva variantes AVIF y WebP de cada foto y escribe
`src/shared/lib/images/manifest.ts`, que `<Picture>` consume para componer el `srcset` y las
dimensiones intrínsecas. Las capturas pasaron de más de 100 kB en JPEG a unos 20 kB en AVIF.
Una ruta que no esté en el manifiesto se sirve como `<img>` normal, así que añadir una imagen
nunca rompe la página aunque se olvide regenerar.

## Tests

`npm run test`. No busca cobertura amplia; cubre lo que se rompe en silencio:

- **Paridad de diccionarios** (`shared/i18n/lib/dictionaries.test.ts`). `Dictionary = typeof es`
  garantiza las claves, pero no que los arrays midan lo mismo ni que la prosa esté traducida
  de verdad. Eso lo comprueba el test.
- **Coherencia del SEO** (`shared/config/site.test.ts`). `index.html` es estático y no puede
  importar de `src`, así que el test compara sus etiquetas con `PROFILE` y el diccionario. Es
  lo que impide que la descripción vuelva a decir una cifra distinta a la del resto del sitio,
  o que `og:image` vuelva a ser una ruta relativa —lo que hace que LinkedIn y WhatsApp
  previsualicen el enlace sin imagen.
- **Accesibilidad del modal** (`entities/project/ui/ProjectModal.test.tsx`). El README afirma
  que atrapa el foco, cierra con Escape y lo devuelve; el test lo verifica en vez de darlo por
  hecho.
- **Formulario de contacto** (`widgets/contact/ui/Contact.test.tsx`). El escapado del `mailto:`
  y que no se acepte un envío vacío.
- **Humo de la página** (`test/home.test.tsx`). Que todo monte sin errores en consola. Es lo que
  atrapa una vuelta a `motion.*`, que anularía el ahorro de peso sin romper nada visible.

`src/test/setup.ts` rellena lo que jsdom no implementa —`matchMedia`, los observers y
`offsetParent`, del que depende la comprobación de visibilidad de la trampa de foco.

## Contenido dinámico

El formulario de contacto no tiene backend: compone un `mailto:` con lo escrito. Es honesto
con lo que el sitio puede hacer y no promete un envío que nadie está recibiendo. Para
conectarlo a un servicio real basta con reemplazar `handleSubmit` en
`src/widgets/contact/ui/Contact.tsx`.
