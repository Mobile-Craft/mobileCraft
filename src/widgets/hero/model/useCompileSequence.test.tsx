import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { act, renderHook } from '@testing-library/react';
import type { ReactNode } from 'react';
import { I18nProvider, es } from '@/shared/i18n';
import { useCompileSequence } from './useCompileSequence';

const wrapper = ({ children }: { children: ReactNode }) => <I18nProvider>{children}</I18nProvider>;

/**
 * La secuencia programa un `setTimeout` por paso. Lo que puede romperse sin
 * verse es que los timers de una compilación anterior sigan vivos —dejando la
 * barra saltando hacia atrás— o que queden pendientes tras desmontar, lo que
 * provoca un `setState` sobre un árbol muerto.
 */
describe('secuencia de compilado', () => {
  beforeEach(() => vi.useFakeTimers());
  afterEach(() => vi.useRealTimers());

  it('arranca en reposo, sin progreso', () => {
    const { result } = renderHook(() => useCompileSequence(), { wrapper });

    expect(result.current.progress).toBe(0);
    expect(result.current.running).toBe(false);
    expect(result.current.done).toBe(false);
    expect(result.current.status).toBe(es.compile.idle);
  });

  it('avanza paso a paso hasta el 100 %', () => {
    const { result } = renderHook(() => useCompileSequence(), { wrapper });

    act(() => result.current.compile());
    act(() => void vi.advanceTimersByTime(100));

    expect(result.current.running).toBe(true);
    expect(result.current.status).toBe(es.compile.steps[0]);

    act(() => void vi.advanceTimersByTime(5000));

    expect(result.current.done).toBe(true);
    expect(result.current.running).toBe(false);
    expect(result.current.progress).toBe(100);
    expect(result.current.status).toBe(es.compile.steps[es.compile.steps.length - 1]);
  });

  it('recompilar cancela los temporizadores de la vuelta anterior', () => {
    const { result } = renderHook(() => useCompileSequence(), { wrapper });

    act(() => result.current.compile());
    act(() => void vi.advanceTimersByTime(1600));
    const midway = result.current.progress;
    expect(midway).toBeGreaterThan(0);
    expect(midway).toBeLessThan(100);

    // La segunda compilación reinicia; si los timers viejos siguieran vivos el
    // progreso daría saltos hacia adelante que no le corresponden.
    act(() => result.current.compile());
    expect(result.current.progress).toBe(0);

    act(() => void vi.advanceTimersByTime(100));
    expect(result.current.status).toBe(es.compile.steps[0]);
  });

  it('no deja temporizadores vivos tras desmontar', () => {
    const { result, unmount } = renderHook(() => useCompileSequence(), { wrapper });

    act(() => result.current.compile());
    unmount();

    expect(() => vi.advanceTimersByTime(10_000)).not.toThrow();
    expect(vi.getTimerCount()).toBe(0);
  });
});
