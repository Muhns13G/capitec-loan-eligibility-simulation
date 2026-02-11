import { render } from '@testing-library/react';
import { CapitecLogo } from '@/components/capitec-logo';

describe('CapitecLogo', () => {
  it('renders the logo', () => {
    const { container } = render(<CapitecLogo />);
    expect(container.querySelector('svg')).toBeInTheDocument();
  });

  it('renders compact variant', () => {
    const { container } = render(<CapitecLogo variant="compact" />);
    expect(container.querySelector('svg')).toBeInTheDocument();
  });

  it('renders white variant', () => {
    const { container } = render(<CapitecLogo variant="white" />);
    const svg = container.querySelector('svg');
    expect(svg).toHaveClass('text-white');
  });

  it('renders with custom className', () => {
    const { container } = render(<CapitecLogo className="custom-class" />);
    const svg = container.querySelector('svg');
    expect(svg).toHaveClass('custom-class');
  });
});
