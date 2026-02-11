import { render, screen } from '@testing-library/react';
import ResultsPage from '@/app/results/page';

// Mock Next.js hooks
jest.mock('next/navigation', () => ({
  useSearchParams: () => ({
    get: jest.fn().mockReturnValue(null),
  }),
  useRouter: () => ({
    push: jest.fn(),
  }),
}));

// Mock the ApprovedView and DeclinedView components
jest.mock('@/components/results/approved-view', () => ({
  ApprovedView: () => <div data-testid="approved-view">Approved View</div>,
}));

jest.mock('@/components/results/declined-view', () => ({
  DeclinedView: () => <div data-testid="declined-view">Declined View</div>,
}));

// Mock the useLoanResult hook
jest.mock('@/hooks/useLoanResult', () => ({
  useLoanResult: () => ({
    result: null,
    loading: false,
    error: null,
  }),
}));

describe('ResultsPage', () => {
  it('renders the no results state when no result is available', () => {
    render(<ResultsPage />);
    expect(screen.getByRole('heading', { name: /no results found/i })).toBeInTheDocument();
  });

  it('displays message to complete application form', () => {
    render(<ResultsPage />);
    expect(screen.getByText(/please complete the loan application form/i)).toBeInTheDocument();
  });

  it('has link to start application', () => {
    render(<ResultsPage />);
    expect(screen.getByRole('link', { name: /start loan application/i })).toHaveAttribute(
      'href',
      '/apply'
    );
  });

  it('has link to apply page', () => {
    render(<ResultsPage />);
    const applyLinks = screen.getAllByRole('link', { name: /application/i });
    expect(applyLinks.length).toBeGreaterThan(0);
    expect(applyLinks[0]).toHaveAttribute('href', '/apply');
  });
});
