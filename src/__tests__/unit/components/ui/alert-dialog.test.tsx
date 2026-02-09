import { render, screen } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import { AlertDialog } from '@/components/ui/alert-dialog';

expect.extend(toHaveNoViolations);

describe('AlertDialog Component - Accessibility Tests', () => {
  it('has no accessibility violations when open', async () => {
    const { container } = render(
      <AlertDialog open>
        <div>
          <h2>Alert Title</h2>
          <p>Alert description</p>
          <button>Action</button>
        </div>
      </AlertDialog>
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});

describe('AlertDialog Component - Functionality Tests', () => {
  it('renders dialog content when open', () => {
    render(
      <AlertDialog open>
        <div>
          <h2>Alert Title</h2>
          <p>Alert description</p>
        </div>
      </AlertDialog>
    );

    expect(screen.getByText('Alert Title')).toBeInTheDocument();
    expect(screen.getByText('Alert description')).toBeInTheDocument();
  });

  it('renders with open prop', () => {
    const { rerender } = render(
      <AlertDialog open={true}>
        <div>
          <h2>Alert Title</h2>
        </div>
      </AlertDialog>
    );

    expect(screen.getByText('Alert Title')).toBeInTheDocument();

    // Test that it handles closed state
    rerender(
      <AlertDialog open={false}>
        <div>
          <h2>Alert Title</h2>
        </div>
      </AlertDialog>
    );

    // Content should still be in DOM but visually hidden
    expect(screen.getByText('Alert Title')).toBeInTheDocument();
  });
});
