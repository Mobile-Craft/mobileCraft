import { useCallback, useEffect, useRef, useState } from 'react';
import { useReducedMotion } from 'framer-motion';
import { useI18n } from '@/shared/i18n';

export interface CompileState {
  /** −1 = sin compilar; 0..n−1 = paso actual. */
  step: number;
  status: string;
  progress: number;
  done: boolean;
  running: boolean;
  compile: () => void;
}

/**
 * Secuencia de "compilación" de la tarjeta del hero.
 *
 * Los timers se guardan en un ref y se limpian tanto al recompilar como al
 * desmontar, para que no queden `setState` colgando sobre un árbol muerto.
 */
export function useCompileSequence(): CompileState {
  const { t } = useI18n();
  const [step, setStep] = useState(-1);
  const timers = useRef<number[]>([]);
  const reduced = useReducedMotion();

  const steps = t.compile.steps;
  const total = steps.length;

  const clear = useCallback(() => {
    timers.current.forEach(clearTimeout);
    timers.current = [];
  }, []);

  useEffect(() => clear, [clear]);

  const compile = useCallback(() => {
    clear();
    setStep(-1);
    const gap = reduced ? 220 : 760;
    for (let i = 0; i < total; i += 1) {
      timers.current.push(window.setTimeout(() => setStep(i), 60 + i * gap));
    }
  }, [clear, reduced, total]);

  const done = step === total - 1;

  return {
    step,
    status: step < 0 ? t.compile.idle : steps[step],
    progress: Math.round(((step + 1) / total) * 100),
    done,
    running: step >= 0 && !done,
    compile,
  };
}
