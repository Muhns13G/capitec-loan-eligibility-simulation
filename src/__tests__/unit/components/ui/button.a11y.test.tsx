import { render } from '@testing-library/react';
import { axe } from 'jest-axe';
import { Button } from '@/components/ui/button';

describe('Button Accessibility', () => {
  it('should have no accessibility violations', async () => {
    const { container } = render(<Button>Click me</Button>);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('should have no accessibility violations when disabled', async () => {
    const { container } = render(<Button disabled>Disabled</Button>);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('should announce loading state to screen readers', async () => {
    const { container } = render(
      <Button disabled aria-busy="true">
        Loading...
      </Button>
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
