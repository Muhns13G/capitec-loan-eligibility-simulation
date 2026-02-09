import { render, screen } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import { ShareButton } from '@/components/results/share-button';

expect.extend(toHaveNoViolations);

describe('ShareButton - Accessibility Tests', () => {
  it('has no accessibility violations', async () => {
    const { container } = render(<ShareButton />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('has accessible button name', () => {
    render(<ShareButton />);

    const button = screen.getByRole('button', { name: /share/i });
    expect(button).toBeInTheDocument();
  });
});

describe('ShareButton - Functionality Tests', () => {
  it('renders share button', () => {
    render(<ShareButton />);

    const button = screen.getByRole('button');
    expect(button).toBeInTheDocument();
    expect(button).toHaveTextContent(/share/i);
  });

  it('renders Share Results text', () => {
    render(<ShareButton />);

    const button = screen.getByRole('button');
    expect(button).toHaveTextContent(/Share Results/i);
  });
});
