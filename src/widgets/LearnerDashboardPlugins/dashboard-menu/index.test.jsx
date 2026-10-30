import React from 'react';
import { render, screen } from '@testing-library/react';
import { getAppConfig, useIntl } from '@openedx/frontend-base';
import { useWindowSize } from '@openedx/paragon';

import { useInitializeLearnerHome } from '@src/data/hooks';
import UserDashboardMenu from './index';

jest.mock('@openedx/frontend-base', () => ({
  ...jest.requireActual('@openedx/frontend-base'),
  getAppConfig: jest.fn(),
  useIntl: jest.fn(),
}));

jest.mock('@openedx/paragon', () => ({
  ...jest.requireActual('@openedx/paragon'),
  useWindowSize: jest.fn(),
}));

jest.mock('@src/data/hooks', () => ({
  useInitializeLearnerHome: jest.fn(),
}));

describe('User Dashboard Menu', () => {
  beforeEach(() => {
    jest.clearAllMocks();

    (getAppConfig).mockReturnValue({
      ENABLE_EDX_PERSONAL_DASHBOARD: true,
    });

    (useIntl).mockReturnValue({
      formatMessage: ({ defaultMessage }) => defaultMessage,
    });

    (useWindowSize).mockReturnValue({
      width: 1200,
    });

    (useInitializeLearnerHome).mockReturnValue({
      data: {
        enterpriseDashboard: null,
        hasAvailableDashboards: false,
      },
    });
  });

  it('should render dashboard menu in the user menu dropdown', () => {
    (useInitializeLearnerHome).mockReturnValue({
      data: {
        enterpriseDashboard: {
          url: 'url',
          label: 'test',
        },
      },
    });

    render(<UserDashboardMenu />);

    expect(screen.getByText('SWITCH DASHBOARD')).toBeInTheDocument();
    expect(screen.getByText('Personal')).toBeInTheDocument();
    expect(screen.getByText('test Dashboard')).toBeInTheDocument();
  });

  it('should render only personal dashboard when enterprise dashboard is unavailable', () => {
    render(<UserDashboardMenu />);

    expect(screen.getByText('Personal')).toBeInTheDocument();
    expect(screen.queryByText('test Dashboard')).not.toBeInTheDocument();
  });

  it('should render mobile dashboard navigation', () => {
    (useWindowSize).mockReturnValue({
      width: 500,
    });

    render(<UserDashboardMenu />);

    expect(screen.getByText('Personal')).toHaveClass('nav-link', 'active');
    expect(screen.queryByText('SWITCH DASHBOARD')).not.toBeInTheDocument();
  });

  it('should not render dashboard menu when personal dashboard is disabled', () => {
    (getAppConfig).mockReturnValue({
      ENABLE_EDX_PERSONAL_DASHBOARD: false,
    });

    render(<UserDashboardMenu />);

    expect(screen.queryByText('Personal')).not.toBeInTheDocument();
    expect(screen.queryByText('SWITCH DASHBOARD')).not.toBeInTheDocument();
  });
});