import React from 'react';
import { IntlProvider } from '@openedx/frontend-base';
import { render, screen } from '@testing-library/react';

import BaseContainer from '../index';

jest.mock('../components/welcome-page-layout', () => ({
  AuthSmallLayout: () => <div data-testid="auth-small-layout" />,
  AuthMediumLayout: () => <div data-testid="auth-medium-layout" />,
  AuthLargeLayout: () => <div data-testid="auth-large-layout" />,
}));

let mockWidth = 1400;

jest.mock('react-responsive', () => ({
  __esModule: true,
  // eslint-disable-next-line react/prop-types
  default: ({ children, minWidth, maxWidth }) => {
    const matches = (minWidth === undefined || mockWidth >= minWidth)
      && (maxWidth === undefined || mockWidth <= maxWidth);
    return matches ? children : null;
  },
}));

const renderAtWidth = (width, props = {}) => {
  mockWidth = width;
  return render(
    <IntlProvider locale="en">
      <BaseContainer {...props}>
        <div>Test Content</div>
      </BaseContainer>
    </IntlProvider>,
  );
};

describe('BaseContainer', () => {
  it('renders children', () => {
    renderAtWidth(1400);
    expect(screen.getByText('Test Content')).toBeInTheDocument();
  });

  it('renders the top stripe', () => {
    const { container } = renderAtWidth(1400);
    expect(container.querySelector('.extra-large-screen-top-stripe')).toBeInTheDocument();
  });

  it('renders AuthSmallLayout at small screen widths', () => {
    renderAtWidth(400);
    expect(screen.getByTestId('auth-small-layout')).toBeInTheDocument();
  });

  it('renders AuthMediumLayout at medium screen widths', () => {
    renderAtWidth(800);
    expect(screen.getByTestId('auth-medium-layout')).toBeInTheDocument();
  });

  it('renders AuthLargeLayout at extra-large screen widths', () => {
    renderAtWidth(1400);
    expect(screen.getByTestId('auth-large-layout')).toBeInTheDocument();
  });

  it('renders without enterpriseBranding prop', () => {
    renderAtWidth(1400);
    expect(screen.getByTestId('auth-large-layout')).toBeInTheDocument();
  });

  it('renders with enterpriseBranding prop without errors', () => {
    const enterpriseBranding = {
      thirdPartyAuthContext: {
        enterpriseBranding: { enterpriseName: 'Test Corp', enterpriseLogoUrl: 'https://example.com/logo.png' },
      },
    };
    renderAtWidth(1400, { enterpriseBranding });
    expect(screen.getByTestId('auth-large-layout')).toBeInTheDocument();
  });
});
