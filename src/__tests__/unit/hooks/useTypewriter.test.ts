import { renderHook, act } from '@testing-library/react';
import { useTypewriter } from '@/hooks/useTypewriter';

describe('useTypewriter', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('returns initial state correctly', () => {
    const { result } = renderHook(() =>
      useTypewriter({ text: 'Hello World', speed: 50, delay: 0 })
    );

    expect(result.current.displayText).toBe('');
    expect(result.current.isTyping).toBe(true);
  });

  it('starts typing after delay', () => {
    const { result } = renderHook(() => useTypewriter({ text: 'Hello', speed: 50, delay: 100 }));

    // Initially empty
    expect(result.current.displayText).toBe('');

    // After delay, should start typing
    act(() => {
      jest.advanceTimersByTime(100);
    });
    expect(result.current.isTyping).toBe(true);
  });

  it('types text character by character', () => {
    const { result } = renderHook(() => useTypewriter({ text: 'Hello', speed: 50, delay: 0 }));

    // After first character
    act(() => {
      jest.advanceTimersByTime(50);
    });
    expect(result.current.displayText).toBe('H');

    // After second character
    act(() => {
      jest.advanceTimersByTime(50);
    });
    expect(result.current.displayText).toBe('He');

    // After all characters
    act(() => {
      jest.advanceTimersByTime(200);
    });
    expect(result.current.displayText).toBe('Hello');
  });

  it('completes typing when all characters are displayed', () => {
    const { result } = renderHook(() => useTypewriter({ text: 'Hi', speed: 50, delay: 0 }));

    // Complete typing
    act(() => {
      jest.advanceTimersByTime(200);
    });
    expect(result.current.displayText).toBe('Hi');
    expect(result.current.isTyping).toBe(false);
  });

  it('respects custom speed', () => {
    const { result } = renderHook(() => useTypewriter({ text: 'Test', speed: 100, delay: 0 }));

    // With speed 100, after 50ms nothing should appear
    act(() => {
      jest.advanceTimersByTime(50);
    });
    expect(result.current.displayText).toBe('');

    // After 100ms, first character
    act(() => {
      jest.advanceTimersByTime(50);
    });
    expect(result.current.displayText).toBe('T');
  });
});
