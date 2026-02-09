import { render, screen } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import { Spinner } from '@/components/ui/spinner';

expect.extend(toHaveNoViolations);

describe('Spinner Component - Accessibility Tests', () => {
  it('has no accessibility violations', async () => {
    const { container } = render(<Spinner />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('has role status for screen readers', () => {
    render(<Spinner />);

    const spinner = screen.getByRole('status');
    expect(spinner).toBeInTheDocument();
    expect(spinner).toHaveAttribute('aria-label', 'Loading');
  });
});

describe('Spinner Component - Functionality Tests', () => {
  it('renders with default size', () => {
    render(<Spinner />);

    const spinner = screen.getByRole('status');
    expect(spinner).toBeInTheDocument();
  });

  it('renders with custom className', () => {
    render(<Spinner className="custom-spinner" />);

    const spinner = screen.getByRole('status');
    expect(spinner).toHaveClass('custom-spinner');
  });

  it('renders with loading text', () => {
    render(<Spinner>Loading...</Spinner>);

    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });
});
