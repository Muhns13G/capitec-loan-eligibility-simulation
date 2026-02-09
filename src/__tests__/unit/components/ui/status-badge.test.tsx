import { render, screen } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import { StatusBadge } from '@/components/ui/status-badge';

expect.extend(toHaveNoViolations);

describe('StatusBadge Component - Accessibility Tests', () => {
  it('has no accessibility violations', async () => {
    const { container } = render(<StatusBadge variant="success">Approved</StatusBadge>);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});

describe('StatusBadge Component - Functionality Tests', () => {
  it('renders success variant with green styling', () => {
    render(<StatusBadge variant="success">Approved</StatusBadge>);

    const badge = screen.getByText('Approved');
    expect(badge).toBeInTheDocument();
  });

  it('renders warning variant with yellow styling', () => {
    render(<StatusBadge variant="warning">Pending</StatusBadge>);

    const badge = screen.getByText('Pending');
    expect(badge).toBeInTheDocument();
  });

  it('renders error variant with red styling', () => {
    render(<StatusBadge variant="error">Declined</StatusBadge>);

    const badge = screen.getByText('Declined');
    expect(badge).toBeInTheDocument();
  });

  it('renders info variant with blue styling', () => {
    render(<StatusBadge variant="info">Review</StatusBadge>);

    const badge = screen.getByText('Review');
    expect(badge).toBeInTheDocument();
  });
});
