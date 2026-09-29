import js from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import tseslint from 'typescript-eslint';

/**
 * Capas de Feature-Sliced Design, de arriba abajo. Una capa sólo puede importar
 * de las que tiene por debajo, y nunca de otra slice de su misma capa.
 */
const LAYERS = ['app', 'pages', 'widgets', 'features', 'entities', 'shared'];

/**
 * Un slice se importa por su API pública (`@/widgets/navbar`), nunca por un
 * archivo de dentro (`@/widgets/navbar/ui/Navbar`). `shared` no tiene slices,
 * así que sus segmentos —`@/shared/ui`, `@/shared/lib/hooks`— sí son públicos.
 */
const deepImportPatterns = [
  ...['app', 'pages', 'widgets', 'features', 'entities'].flatMap((layer) => [
    `@/${layer}/*/*`,
    `@/${layer}/*/*/*`,
  ]),
  '@/app/*',
  '@/shared/*/*/*',
];

/** Todo lo que una capa tiene prohibido importar: lo de arriba y lo de al lado. */
function forbiddenFor(layer) {
  const index = LAYERS.indexOf(layer);
  const above = LAYERS.slice(0, index).flatMap((l) => [`@/${l}`, `@/${l}/**`]);
  // `shared` no tiene slices: sus segmentos se importan entre sí sin problema.
  const sameLayer = layer === 'shared' || layer === 'app' ? [] : [`@/${layer}/**`];
  return [...above, ...sameLayer];
}

const DEEP_IMPORT_MESSAGE =
  'FSD: importa el slice por su API pública (su `index.ts`), no por un archivo interno.';

/**
 * Cada capa repite el grupo de importaciones profundas porque ESLint reemplaza
 * las opciones de una regla al reconfigurarla: si sólo se listaran las capas
 * prohibidas, la comprobación de API pública dejaría de aplicarse ahí.
 */
const layerBoundaries = LAYERS.filter((layer) => forbiddenFor(layer).length > 0).map((layer) => ({
  files: [`src/${layer}/**/*.{ts,tsx}`],
  rules: {
    '@typescript-eslint/no-restricted-imports': [
      'error',
      {
        patterns: [
          {
            group: forbiddenFor(layer),
            message: `FSD: "${layer}" sólo puede importar de capas inferiores, y nunca de otra slice de su propia capa. Mueve lo compartido a una capa de abajo.`,
          },
          { group: deepImportPatterns, message: DEEP_IMPORT_MESSAGE },
        ],
      },
    ],
  },
}));

export default tseslint.config(
  { ignores: ['dist', 'node_modules'] },
  {
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2022,
      globals: globals.browser,
    },
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
      '@typescript-eslint/consistent-type-imports': [
        'error',
        { prefer: 'type-imports', fixStyle: 'inline-type-imports' },
      ],
      '@typescript-eslint/no-restricted-imports': [
        'error',
        {
          patterns: [{ group: deepImportPatterns, message: DEEP_IMPORT_MESSAGE }],
        },
      ],
    },
  },
  ...layerBoundaries,
  // El punto de entrada monta la capa `app`; es el único que puede tocarla.
  {
    files: ['src/main.tsx'],
    rules: { '@typescript-eslint/no-restricted-imports': 'off' },
  },
  /*
   * Utilidades de prueba. No forman parte del árbol que sirve el navegador, así
   * que la regla de Fast Refresh —pensada para módulos que React recarga en
   * caliente— no aplica. Las reglas de capas sí se mantienen: un test que
   * necesite componer varias capas vive en `src/test/`, que no es una capa.
   */
  {
    files: ['src/test/**/*.{ts,tsx}', 'src/**/*.test.{ts,tsx}'],
    rules: { 'react-refresh/only-export-components': 'off' },
  },
);
