import { render, screen } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

expect.extend(toHaveNoViolations);

describe('Card Components - Accessibility Tests', () => {
  it('Card has no accessibility violations', async () => {
    const { container } = render(
      <Card>
        <CardHeader>
          <CardTitle>Test Card</CardTitle>
        </CardHeader>
        <CardContent>
          <p>Test content</p>
        </CardContent>
      </Card>
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('CardTitle displays text content', () => {
    render(
      <Card>
        <CardHeader>
          <CardTitle>Test Card</CardTitle>
        </CardHeader>
        <CardContent>Test content</CardContent>
      </Card>
    );

    expect(screen.getByText('Test Card')).toBeInTheDocument();
  });
});

describe('Card Components - Functionality Tests', () => {
  it('renders children properly', () => {
    render(
      <Card>
        <CardContent>
          <p>Test content</p>
        </CardContent>
      </Card>
    );

    expect(screen.getByText('Test content')).toBeInTheDocument();
  });

  it('CardTitle displays text', () => {
    render(
      <Card>
        <CardHeader>
          <CardTitle>Test Card</CardTitle>
        </CardHeader>
        <CardContent>Test content</CardContent>
      </Card>
    );

    expect(screen.getByText('Test Card')).toBeInTheDocument();
  });

  it('CardContent renders children', () => {
    render(
      <Card>
        <CardContent>
          <p>Test content</p>
        </CardContent>
      </Card>
    );

    expect(screen.getByText('Test content')).toBeInTheDocument();
  });
});
