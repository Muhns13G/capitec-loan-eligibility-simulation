import { render } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from '@/components/ui/table';
import { WizardProvider } from '@/contexts/wizard-context';
import { LoanSummaryCard } from '@/components/features/loan-summary-card';

expect.extend(toHaveNoViolations);

describe('Accessibility Tests - Components', () => {
  describe('Card Component', () => {
    it('has no accessibility violations', async () => {
      const { container } = render(
        <Card>
          <CardHeader>
            <CardTitle>Test Title</CardTitle>
          </CardHeader>
          <CardContent>Test content</CardContent>
        </Card>
      );
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });

  describe('Input Component', () => {
    it('has no accessibility violations with label', async () => {
      const { container } = render(
        <div>
          <label htmlFor="test-input">Test Label</label>
          <Input id="test-input" placeholder="Enter value" />
        </div>
      );
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('has no accessibility violations with aria-label', async () => {
      const { container } = render(<Input aria-label="Test input" placeholder="Enter value" />);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });

  describe('Button Component', () => {
    it('has no accessibility violations', async () => {
      const { container } = render(<Button>Click me</Button>);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('has no accessibility violations when disabled', async () => {
      const { container } = render(<Button disabled>Disabled button</Button>);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });

  describe('Progress Component', () => {
    it('has no accessibility violations', async () => {
      const { container } = render(
        <div>
          <label htmlFor="progress">Loading progress</label>
          <Progress id="progress" value={50} aria-labelledby="progress" />
        </div>
      );
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });

  describe('Table Component', () => {
    it('has no accessibility violations', async () => {
      const { container } = render(
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Column 1</TableHead>
              <TableHead>Column 2</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell>Data 1</TableCell>
              <TableCell>Data 2</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      );
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });

  describe('LoanSummaryCard Component', () => {
    it('has no accessibility violations', async () => {
      const { container } = render(
        <LoanSummaryCard
          title="Loan Summary"
          loanAmount={150000}
          monthlyPayment={7500}
          totalInterest={30000}
          totalRepayment={180000}
          interestRate={12.5}
          loanTerm={24}
        />
      );
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });
});

describe('Accessibility Tests - Wizard Components', () => {
  it('WizardProvider with content has no violations', async () => {
    const { container } = render(
      <WizardProvider>
        <div role="main">
          <h1>Test Content</h1>
          <button>Continue</button>
        </div>
      </WizardProvider>
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});

describe('Accessibility Tests - Page Structure', () => {
  it('has proper heading hierarchy', async () => {
    const { container } = render(
      <div>
        <h1>Main Title</h1>
        <h2>Section Title</h2>
        <h3>Subsection Title</h3>
        <p>Content text</p>
      </div>
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('has proper landmark regions', async () => {
    const { container } = render(
      <div>
        <header role="banner">Header</header>
        <nav role="navigation">Navigation</nav>
        <main role="main">Main content</main>
        <footer role="contentinfo">Footer</footer>
      </div>
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('has proper form labels', async () => {
    const { container } = render(
      <form>
        <div>
          <label htmlFor="name">Name</label>
          <Input id="name" type="text" />
        </div>
        <div>
          <label htmlFor="email">Email</label>
          <Input id="email" type="email" />
        </div>
        <button type="submit">Submit</button>
      </form>
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});

describe('Accessibility Tests - Interactive Elements', () => {
  it('buttons have accessible names', async () => {
    const { container } = render(
      <div>
        <Button>Primary Action</Button>
        <Button variant="secondary">Secondary Action</Button>
        <Button aria-label="Close dialog">×</Button>
      </div>
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('links have accessible names', async () => {
    const { container } = render(
      <nav>
        {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
        <a href="/">Home</a>
        {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
        <a href="/about">About</a>
        {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
        <a href="/contact" aria-current="page">
          Contact
        </a>
      </nav>
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('images have alt text', async () => {
    const { container } = render(
      <div>
        <img src="/logo.png" alt="Company Logo" />
        <img src="/banner.jpg" alt="Promotional Banner" />
      </div>
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});

describe('Accessibility Tests - Color Contrast', () => {
  it('has sufficient color contrast for text', async () => {
    const { container } = render(
      <div className="bg-white p-4 text-black">
        <h1 className="text-2xl font-bold">High Contrast Heading</h1>
        <p className="text-gray-800">Body text with good contrast</p>
      </div>
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});

describe('Accessibility Tests - Focus Management', () => {
  it('interactive elements are focusable', async () => {
    const { container } = render(
      <div>
        <Input placeholder="Focusable input" />
        <Button>Focusable button</Button>
        {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
        <a href="/">Focusable link</a>
      </div>
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
