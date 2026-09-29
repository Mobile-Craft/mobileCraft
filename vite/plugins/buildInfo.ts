import { execSync } from 'node:child_process';
import { gzipSync } from 'node:zlib';
import type { Plugin } from 'vite';

/**
 * Huecos de ancho fijo donde se escriben las medidas del propio bundle.
 *
 * El dato se mide sobre el bundle que lo contiene, así que sustituirlo por un
 * texto más corto o más largo cambiaría justo la cifra recién medida. Al
 * rellenar siempre los mismos bytes, el número publicado es el real.
 */
const SLOTS = {
  bundleGzipKb: 'BUNDLE_GZIP_KB__',
  modules: 'MODULE_COUNT____',
} as const;

function git(command: string, fallback: string): string {
  try {
    return execSync(command, { stdio: ['ignore', 'pipe', 'ignore'] })
      .toString()
      .trim();
  } catch {
    return fallback;
  }
}

export interface BuildInfo {
  /** SHA corto del commit publicado. */
  commit: string;
  /** Fecha del build en ISO corto. */
  builtAt: string;
  /** Módulos que entraron en el bundle. Viene rellenado a ancho fijo. */
  modules: string;
  /** Peso de JS + CSS comprimido con gzip, en KB. Rellenado a ancho fijo. */
  bundleGzipKb: string;
}

/**
 * Inyecta datos verificables del build para que la tarjeta del hero muestre
 * hechos —commit, fecha, módulos, peso comprimido— en vez de un guion.
 */
export function buildInfo(): Plugin {
  return {
    name: 'portfolio:build-info',

    config() {
      return {
        define: {
          __BUILD_INFO__: JSON.stringify({
            commit: git('git rev-parse --short HEAD', 'dev'),
            builtAt: new Date().toISOString().slice(0, 10),
            modules: SLOTS.modules,
            bundleGzipKb: SLOTS.bundleGzipKb,
          } satisfies BuildInfo),
        },
      };
    },

    generateBundle(_options, bundle) {
      /*
       * Se mide la primera carga, no el build entero: el chunk de entrada más
       * el CSS que arrastra. Los chunks diferidos —el diccionario en inglés, el
       * modal de proyecto— no se cuentan porque un visitante puede no pedirlos
       * nunca, y sumarlos exageraría lo que de verdad descarga.
       */
      const entry = Object.values(bundle).find((asset) => asset.type === 'chunk' && asset.isEntry);
      if (entry?.type !== 'chunk') return;

      const css = entry.viteMetadata?.importedCss ?? new Set<string>();

      let bytes = gzipSync(entry.code).length;
      const modules = Object.keys(entry.modules).length;

      for (const fileName of css) {
        const asset = bundle[fileName];
        if (asset?.type === 'asset' && typeof asset.source === 'string') {
          bytes += gzipSync(asset.source).length;
        }
      }

      const values: Record<keyof typeof SLOTS, string> = {
        bundleGzipKb: (bytes / 1024).toFixed(1),
        modules: String(modules),
      };

      for (const asset of Object.values(bundle)) {
        if (asset.type !== 'chunk') continue;
        for (const [key, slot] of Object.entries(SLOTS)) {
          if (!asset.code.includes(slot)) continue;
          const value = values[key as keyof typeof SLOTS];
          if (value.length > slot.length) continue; // no cabe: se deja el hueco
          asset.code = asset.code.replace(slot, value.padEnd(slot.length, ' '));
        }
      }
    },
  };
}
