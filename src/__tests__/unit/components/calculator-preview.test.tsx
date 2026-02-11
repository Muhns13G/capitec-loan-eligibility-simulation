import { render, screen } from '@testing-library/react';
import { CalculatorPreview } from '@/components/calculator-preview';

// Mock IntersectionObserver for framer-motion
const mockIntersectionObserver = jest.fn();
mockIntersectionObserver.mockReturnValue({
  observe: () => null,
  unobserve: () => null,
  disconnect: () => null,
});
window.IntersectionObserver = mockIntersectionObserver;

describe('CalculatorPreview', () => {
  it('renders the calculator preview', () => {
    render(<CalculatorPreview />);
    expect(screen.getByText(/estimated monthly/i)).toBeInTheDocument();
  });

  it('displays loan amount label', () => {
    render(<CalculatorPreview />);
    expect(screen.getByText(/loan amount/i)).toBeInTheDocument();
  });

  it('displays loan term label', () => {
    render(<CalculatorPreview />);
    expect(screen.getByText(/term/i)).toBeInTheDocument();
  });

  it('displays estimated monthly payment', () => {
    render(<CalculatorPreview />);
    expect(screen.getByText(/estimated monthly/i)).toBeInTheDocument();
  });

  it('displays Use Full Calculator link', () => {
    render(<CalculatorPreview />);
    expect(screen.getByRole('link', { name: /use full calculator/i })).toHaveAttribute(
      'href',
      '/calculator'
    );
  });

  it('has loan amount input', () => {
    render(<CalculatorPreview />);
    const amountInput = screen.getAllByRole('slider')[0];
    expect(amountInput).toBeInTheDocument();
  });

  it('has loan term input', () => {
    render(<CalculatorPreview />);
    const inputs = screen.getAllByRole('slider');
    expect(inputs.length).toBeGreaterThanOrEqual(1);
  });
});
