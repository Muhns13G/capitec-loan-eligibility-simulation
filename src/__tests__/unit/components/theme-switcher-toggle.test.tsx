import { render, screen, act } from '@testing-library/react';
import { ThemeSwitcherToggle } from '@/components/elements/theme-switcher-toggle';

// Mock next-themes
const mockSetTheme = jest.fn();
let mockTheme = 'light';

jest.mock('next-themes', () => ({
  useTheme: () => ({
    theme: mockTheme,
    setTheme: mockSetTheme,
  }),
}));

describe('ThemeSwitcherToggle', () => {
  beforeEach(() => {
    mockSetTheme.mockClear();
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('renders theme toggle button', () => {
    render(<ThemeSwitcherToggle />);

    // Wait for the component to mount (setTimeout in useEffect)
    act(() => {
      jest.advanceTimersByTime(0);
    });

    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  it('switches to dark theme when clicked in light mode', () => {
    mockTheme = 'light';
    render(<ThemeSwitcherToggle />);

    // Wait for the component to mount
    act(() => {
      jest.advanceTimersByTime(0);
    });

    const button = screen.getByRole('button');
    button.click();

    expect(mockSetTheme).toHaveBeenCalledWith('dark');
  });

  it('switches to light theme when clicked in dark mode', () => {
    mockTheme = 'dark';
    render(<ThemeSwitcherToggle />);

    // Wait for the component to mount
    act(() => {
      jest.advanceTimersByTime(0);
    });

    const button = screen.getByRole('button');
    button.click();

    expect(mockSetTheme).toHaveBeenCalledWith('light');
  });
});
