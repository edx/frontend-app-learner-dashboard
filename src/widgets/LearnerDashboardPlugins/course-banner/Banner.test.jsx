import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

import { Alert } from '@openedx/paragon';
import Banner from './Banner';

jest.mock('@openedx/paragon', () => ({
  ...jest.requireActual('@openedx/paragon'),
  Alert: ({ children, variant, ...props }) => (
    <div data-testid="alert" data-variant={variant} {...props}>
      {children}
    </div>
  ),
}));

describe('Banner', () => {
  it('renders default info banner', () => {
    render(<Banner>Hello, world!</Banner>);

    expect(screen.getByText('Hello, world!')).toBeInTheDocument();
    expect(screen.getByTestId('alert')).toHaveAttribute('data-variant', 'info');
  });

  it('renders success variant', () => {
    render(<Banner variant="success">Hello, world!</Banner>);
    expect(screen.getByTestId('alert')).toHaveAttribute('data-variant', 'success');
  });

  it('renders custom className', () => {
    const { container } = render(
      <Banner className="custom-class">Hello, world!</Banner>
    );

    expect(container.firstChild).toHaveClass('custom-class');
  });

  it('matches snapshot', () => {
    const { container } = render(<Banner>Hello, world!</Banner>);
    expect(container).toMatchSnapshot();
  });
});