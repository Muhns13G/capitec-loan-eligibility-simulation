import { render, screen } from '@testing-library/react';
import { Label } from '@/components/ui/label';

describe('Label Component - Functionality Tests', () => {
  it('renders children text', () => {
    render(<Label>Test Label</Label>);

    const label = screen.getByText('Test Label');
    expect(label).toBeInTheDocument();
  });

  it('applies custom className', () => {
    render(<Label className="custom-class">Test Label</Label>);

    const label = screen.getByText('Test Label');
    expect(label).toHaveClass('custom-class');
  });

  it('passes through props to underlying element', () => {
    render(<Label data-testid="test-label">Test Label</Label>);

    const label = screen.getByTestId('test-label');
    expect(label).toBeInTheDocument();
  });
});
