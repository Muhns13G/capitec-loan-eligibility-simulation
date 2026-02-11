import { render, screen } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import { NavigationHeader } from '@/components/navigation-header';

expect.extend(toHaveNoViolations);

// Mock next/link
jest.mock('next/link', () => {
  return function Link({ children, href }: { children: React.ReactNode; href: string }) {
    return <a href={href}>{children}</a>;
  };
});

// Mock next/navigation
jest.mock('next/navigation', () => ({
  usePathname: () => '/',
}));

// Mock the theme switcher
jest.mock('@/components/elements/theme-switcher-toggle', () => ({
  ThemeSwitcherToggle: () => <button data-testid="theme-switcher">Theme</button>,
}));

describe('NavigationHeader', () => {
  it('renders the navigation header', () => {
    render(<NavigationHeader />);
    expect(screen.getByRole('banner')).toBeInTheDocument();
  });

  it('displays the Capitec logo', () => {
    render(<NavigationHeader />);
    expect(screen.getByText('Loan Simulator')).toBeInTheDocument();
  });

  it('has link to home page', () => {
    render(<NavigationHeader />);
    expect(screen.getByRole('link', { name: /loan simulator/i })).toHaveAttribute('href', '/');
  });

  it('has navigation links', () => {
    render(<NavigationHeader />);
    // Use getAllByRole since there are desktop and mobile versions
    const homeLinks = screen.getAllByRole('link', { name: /home/i });
    expect(homeLinks[0]).toHaveAttribute('href', '/');

    const calculatorLinks = screen.getAllByRole('link', { name: /calculator/i });
    expect(calculatorLinks[0]).toHaveAttribute('href', '/calculator');

    const applyLinks = screen.getAllByRole('link', { name: /apply/i });
    expect(applyLinks[0]).toHaveAttribute('href', '/apply');
  });

  it('displays theme switcher', () => {
    render(<NavigationHeader />);
    expect(screen.getByTestId('theme-switcher')).toBeInTheDocument();
  });

  it('has no accessibility violations', async () => {
    const { container } = render(<NavigationHeader />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
