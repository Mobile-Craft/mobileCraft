/// <reference types="vite/client" />

/** Datos reales del build, inyectados por `vite/plugins/buildInfo.ts`. */
declare const __BUILD_INFO__: {
  commit: string;
  builtAt: string;
  modules: string;
  bundleGzipKb: string;
};
