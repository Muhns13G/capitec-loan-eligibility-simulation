import { render, screen } from '@testing-library/react';
import {
  SkipNavigation,
  ErrorSummary,
  RequiredFieldIndicator,
  PageHeader,
  Breadcrumb,
  LiveRegion,
  VisuallyHidden,
  LoadingState,
  ConfirmationDialog,
} from '@/components/a11y/accessibility-components';

describe('SkipNavigation Component', () => {
  describe('rendering', () => {
    it('renders with skip link by default', () => {
      render(<SkipNavigation />);
      const skipLink = screen.getByRole('link');

      expect(skipLink).toBeInTheDocument();
      expect(skipLink.getAttribute('href')).toBe('#main-content');
    });

    it('is visually hidden by default', () => {
      render(<SkipNavigation />);
      const skipLink = screen.getByText('Skip to main content');

      expect(skipLink.classList.contains('sr-only')).toBe(true);
    });
  });
});

describe('ErrorSummary Component', () => {
  it('renders error summary when errors exist', () => {
    const errors = {
      field1: 'Error message 1',
      field2: 'Error message 2',
    };
    render(<ErrorSummary errors={errors} />);

    expect(screen.getByText('There is a problem')).toBeInTheDocument();
    expect(screen.getByText('Error message 1')).toBeInTheDocument();
    expect(screen.getByText('Error message 2')).toBeInTheDocument();
  });

  it('does not render when no errors exist', () => {
    const errors = {};
    const { container } = render(<ErrorSummary errors={errors} />);

    expect(container.firstChild).toBeNull();
  });

  it('renders custom title', () => {
    const errors = { field: 'Error' };
    render(<ErrorSummary errors={errors} title="Custom Title" />);
    expect(screen.getByText('Custom Title')).toBeInTheDocument();
  });

  it('has correct ARIA attributes', () => {
    const errors = { field: 'Error' };
    render(<ErrorSummary errors={errors} />);

    expect(screen.getByRole('alert')).toBeInTheDocument();
    expect(screen.getByRole('alert')).toHaveAttribute('role', 'alert');
  });
});

describe('RequiredFieldIndicator Component', () => {
  it('renders asterisk with aria-label', () => {
    render(<RequiredFieldIndicator />);
    const indicator = screen.getByLabelText('required');

    expect(indicator).toBeInTheDocument();
    expect(indicator.textContent).toBe('*');
  });

  it('associates aria-label with required text', () => {
    render(<RequiredFieldIndicator />);
    const indicator = screen.getByLabelText('required');

    expect(indicator).toBeInTheDocument();
    expect(indicator).toHaveAttribute('aria-label', 'required');
    expect(indicator.textContent).toBe('*');
  });
});

describe('PageHeader Component', () => {
  it('renders title', () => {
    render(<PageHeader title="Test Title" />);

    const heading = screen.getByRole('heading', { level: 1 });
    expect(heading.textContent).toBe('Test Title');
  });

  it('renders title and description', () => {
    render(<PageHeader title="Test Title" description="Test Description" />);

    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Test Title');
    expect(screen.getByText('Test Description')).toBeInTheDocument();
  });

  it('has heading and description', () => {
    render(<PageHeader title="Test Title" description="Test Description" />);

    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Test Title');
    expect(screen.getByText('Test Description')).toBeInTheDocument();
  });
});

describe('Breadcrumb Component', () => {
  it('renders breadcrumb items', () => {
    const items = [{ label: 'Home', href: '/' }, { label: 'Current Page' }];
    render(<Breadcrumb items={items} />);

    expect(screen.getByRole('navigation', { name: 'Breadcrumb' })).toBeInTheDocument();
    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('Current Page')).toBeInTheDocument();

    const currentPage = screen.getByText('Current Page');
    expect(currentPage.getAttribute('aria-current')).toBe('page');
  });

  it('marks current page correctly', () => {
    const items = [{ label: 'Home', href: '/' }, { label: 'Current' }];
    render(<Breadcrumb items={items} />);

    const currentPage = screen.getByText('Current');
    expect(currentPage.getAttribute('aria-current')).toBe('page');
  });
});

describe('LiveRegion Component', () => {
  it('renders live region with polite priority', () => {
    render(<LiveRegion>Test message</LiveRegion>);
    const region = screen.getByRole('status');

    expect(region.getAttribute('aria-live')).toBe('polite');
    expect(region.textContent).toBe('Test message');
  });

  it('renders live region with assertive priority', () => {
    render(<LiveRegion assertive>Test message</LiveRegion>);
    const region = screen.getByRole('status');

    expect(region.getAttribute('aria-live')).toBe('assertive');
    expect(region.textContent).toBe('Test message');
  });

  it('is visually hidden by default', () => {
    render(<LiveRegion>Test message</LiveRegion>);
    const region = screen.getByRole('status');

    expect(region.classList.contains('sr-only')).toBe(true);
    expect(region.textContent).toBe('Test message');
  });
});

describe('VisuallyHidden Component', () => {
  it('hides content from screen readers but keeps it accessible', () => {
    render(<VisuallyHidden>Hidden text</VisuallyHidden>);

    const hiddenSpan = screen.getByText('Hidden text');
    expect(hiddenSpan).toBeInTheDocument();
    expect(hiddenSpan).toHaveClass('sr-only');
  });
});

describe('LoadingState Component', () => {
  it('renders loading message with progress', () => {
    render(<LoadingState message="Processing your application" progress={50} />);

    expect(screen.getByRole('status')).toBeTruthy();
    expect(screen.getByText(/Processing your application/)).toBeInTheDocument();
    expect(screen.getByText(/50% complete/)).toBeInTheDocument();
  });

  it('renders loading message without progress', () => {
    render(<LoadingState message="Processing your application" />);

    expect(screen.getByRole('status')).toBeTruthy();
    expect(screen.getByText(/Processing your application/)).toBeInTheDocument();
    expect(screen.queryByText(/% complete/)).toBeNull();
  });
});

describe('ConfirmationDialog Component', () => {
  it('renders with title, message, buttons, and cancel', () => {
    render(
      <ConfirmationDialog
        title="Test Title"
        message="Test Message"
        confirmLabel="Confirm"
        cancelLabel="Cancel"
        isOpen
        onConfirm={() => {}}
        onCancel={() => {}}
      />
    );

    const dialog = screen.getByRole('alertdialog');
    expect(dialog).toBeInTheDocument();
    expect(dialog.getAttribute('role')).toBe('alertdialog');
    expect(dialog.getAttribute('aria-modal')).toBe('true');
    expect(dialog.getAttribute('aria-labelledby')).toBe('confirm-title');
    expect(dialog.getAttribute('aria-describedby')).toBe('confirm-message');
  });

  it('renders without buttons when not in DOM', () => {
    render(
      <ConfirmationDialog
        title="Test Title"
        message="Test Message"
        confirmLabel="Confirm"
        cancelLabel="Cancel"
        isOpen={false}
        onConfirm={() => {}}
        onCancel={() => {}}
      />
    );

    const dialog = screen.queryByRole('alertdialog');
    expect(dialog).toBeNull();
  });
});
