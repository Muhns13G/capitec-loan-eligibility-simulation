// Home page tests with mocked canvas component
import { render, screen } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import HomePage from '@/app/page';

expect.extend(toHaveNoViolations);

// Mock IntersectionObserver for framer-motion
const mockIntersectionObserver = jest.fn();
mockIntersectionObserver.mockReturnValue({
  observe: () => null,
  unobserve: () => null,
  disconnect: () => null,
});
window.IntersectionObserver = mockIntersectionObserver;

// Mock the GravityStarsBackground component
jest.mock('@/components/animate-ui/components/backgrounds/gravity-stars', () => ({
  GravityStarsBackground: () => <div data-testid="gravity-stars-background" />,
}));

// Mock the CalculatorPreview component
jest.mock('@/components/calculator-preview', () => ({
  CalculatorPreview: () => <div data-testid="calculator-preview">Calculator Preview</div>,
}));

// Mock the useTypewriter hook - return text as if typing is complete
jest.mock('@/hooks/useTypewriter', () => ({
  useTypewriter: () => ({
    displayText: 'Check Your Loan Eligibility in Minutes',
    isTyping: false,
    isComplete: true,
  }),
}));

// Mock framer-motion
jest.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: { children: React.ReactNode }) => (
      <div {...props}>{children}</div>
    ),
    h1: ({ children, ...props }: { children: React.ReactNode }) => <h1 {...props}>{children}</h1>,
    p: ({ children, ...props }: { children: React.ReactNode }) => <p {...props}>{children}</p>,
    section: ({ children, ...props }: { children: React.ReactNode }) => (
      <section {...props}>{children}</section>
    ),
  },
  AnimatePresence: ({ children }: { children: React.ReactNode }) => <>{children}</>,
}));

describe('HomePage', () => {
  it('renders without crashing', () => {
    render(<HomePage />);
    // Check for main headings/content instead of specific text that may be split
    const headings = screen.getAllByRole('heading');
    expect(headings.length).toBeGreaterThan(0);
  });

  it('displays the hero section', () => {
    render(<HomePage />);
    expect(screen.getByText(/use our free loan simulator/i)).toBeInTheDocument();
  });

  it('displays the hero section', () => {
    render(<HomePage />);
    expect(screen.getByText(/use our free loan simulator/i)).toBeInTheDocument();
  });

  it('has a link to the calculator page', () => {
    render(<HomePage />);
    const calculatorLinks = screen.getAllByRole('link', { name: /calculator/i });
    expect(calculatorLinks.length).toBeGreaterThan(0);
    expect(calculatorLinks[0]).toHaveAttribute('href', '/calculator');
  });

  it('has a link to the apply page', () => {
    render(<HomePage />);
    const applyLinks = screen.getAllByRole('link', { name: /application/i });
    expect(applyLinks.length).toBeGreaterThan(0);
  });

  it('displays feature cards', () => {
    render(<HomePage />);
    expect(screen.getByText('Instant Results')).toBeInTheDocument();
    expect(screen.getByText('Secure Process')).toBeInTheDocument();
    expect(screen.getByText('Better Rates')).toBeInTheDocument();
  });

  it('displays how it works section', () => {
    render(<HomePage />);
    expect(screen.getByText('How It Works')).toBeInTheDocument();
    expect(screen.getByText('Fill Application')).toBeInTheDocument();
    expect(screen.getByText('Get Instant Results')).toBeInTheDocument();
    expect(screen.getByText('Receive Funds')).toBeInTheDocument();
  });

  it('displays the calculator preview section', () => {
    render(<HomePage />);
    expect(screen.getByTestId('calculator-preview')).toBeInTheDocument();
  });

  it('displays trust indicators', () => {
    render(<HomePage />);
    expect(screen.getByText(/trusted by/i)).toBeInTheDocument();
  });

  it('has no accessibility violations', async () => {
    const { container } = render(<HomePage />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('displays CTA section', () => {
    render(<HomePage />);
    expect(screen.getByText('Ready to Check Your Eligibility?')).toBeInTheDocument();
  });
});
