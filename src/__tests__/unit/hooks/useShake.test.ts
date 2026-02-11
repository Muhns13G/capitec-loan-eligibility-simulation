import { renderHook, act } from '@testing-library/react';
import { useShake } from '@/hooks/useShake';

describe('useShake', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('returns initial state with isShaking false', () => {
    const { result } = renderHook(() => useShake());

    expect(result.current.isShaking).toBe(false);
    expect(typeof result.current.shake).toBe('function');
  });

  it('starts shaking when shake is called', () => {
    const { result } = renderHook(() => useShake());

    act(() => {
      result.current.shake();
    });

    expect(result.current.isShaking).toBe(true);
  });

  it('stops shaking after duration (500ms)', () => {
    const { result } = renderHook(() => useShake());

    act(() => {
      result.current.shake();
    });
    expect(result.current.isShaking).toBe(true);

    // After duration
    act(() => {
      jest.advanceTimersByTime(500);
    });
    expect(result.current.isShaking).toBe(false);
  });

  it('can be triggered multiple times', () => {
    const { result } = renderHook(() => useShake());

    // First shake
    act(() => {
      result.current.shake();
    });
    expect(result.current.isShaking).toBe(true);

    act(() => {
      jest.advanceTimersByTime(500);
    });
    expect(result.current.isShaking).toBe(false);

    // Second shake
    act(() => {
      result.current.shake();
    });
    expect(result.current.isShaking).toBe(true);
  });
});
