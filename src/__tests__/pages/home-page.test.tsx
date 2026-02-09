import { render, screen } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import HomePage from '@/app/page';

expect.extend(toHaveNoViolations);

// Suppress console.error for Link component warnings
// eslint-disable-next-line no-console
const originalConsoleError = console.error;
beforeAll(() => {
  // eslint-disable-next-line no-console
  console.error = (...args: unknown[]) => {
    if (
      typeof args[0] === 'string' &&
      (args[0].includes(
        'An update to ForwardRef(LinkComponent) inside a test was not wrapped in act'
      ) ||
        args[0].includes('was not wrapped in act') ||
        args[0].includes(
          'When testing, code that causes React state updates should be wrapped into act'
        ))
    ) {
      return;
    }
    originalConsoleError.apply(console, args);
  };
});

afterAll(() => {
  // eslint-disable-next-line no-console
  console.error = originalConsoleError;
});

describe('HomePage - Accessibility Tests', () => {
  it('has no accessibility violations', async () => {
    const { container } = render(<HomePage />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('has proper heading structure', () => {
    render(<HomePage />);

    const mainHeading = screen.getByRole('heading', { level: 1 });
    expect(mainHeading).toBeInTheDocument();
    expect(mainHeading.textContent).toBe('Capitec Loan Simulator');
  });

  it('has proper landmark regions', () => {
    render(<HomePage />);

    expect(screen.getByRole('main')).toBeInTheDocument();
    expect(screen.getByRole('navigation', { name: 'Primary navigation' })).toBeInTheDocument();
  });

  it('navigation links have accessible names', async () => {
    render(<HomePage />);

    const calculateLink = screen.getByRole('link', { name: /calculate your loan payments/i });
    expect(calculateLink).toBeInTheDocument();

    const applyLink = screen.getByRole('link', { name: /start loan application/i });
    expect(applyLink).toBeInTheDocument();
  });

  it('has proper page title and description', () => {
    render(<HomePage />);

    const heading = screen.getByRole('heading', { level: 1 });
    expect(heading.textContent).toBe('Capitec Loan Simulator');

    const description = screen.getByText('Check your loan eligibility in minutes');
    expect(description).toBeInTheDocument();
  });
});

describe('HomePage - User Interaction Tests', () => {
  it('allows keyboard navigation to all links', () => {
    render(<HomePage />);

    const links = screen.getAllByRole('link');
    expect(links.length).toBeGreaterThan(0);

    links.forEach((link) => {
      expect(link).toBeVisible();
      expect(link.getAttribute('href')).toBeTruthy();
    });
  });

  it('links are properly grouped in navigation', () => {
    render(<HomePage />);

    const nav = screen.getByRole('navigation');
    expect(nav).toBeInTheDocument();

    const list = nav.querySelector('ul');
    expect(list).toBeInTheDocument();

    const listItems = list?.querySelectorAll('li');
    expect(listItems?.length).toBe(2);
  });
});
