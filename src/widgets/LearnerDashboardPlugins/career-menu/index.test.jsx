import React from 'react';
import { render, screen } from '@testing-library/react';
import { getAppConfig, useIntl } from '@openedx/frontend-base';
import { useWindowSize } from '@openedx/paragon';

import { useInitializeLearnerHome } from '@src/data/hooks';
import UserCareerMenu from './index';

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

describe('User Career Menu', () => {
  beforeEach(() => {
    jest.clearAllMocks();

    (getAppConfig).mockReturnValue({
      CAREER_LINK_URL: 'https://edx.org/career',
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

  it('should render career in the user menu dropdown', () => {
    render(<UserCareerMenu />);

    expect(screen.getByText('Career')).toBeInTheDocument();
    expect(screen.getByText('New')).toBeInTheDocument();

    expect(screen.getByText('Career').closest('a')).toHaveAttribute(
      'href',
      'https://edx.org/career',
    );
  });

  it('should render career as a mobile navigation item', () => {
    (useWindowSize).mockReturnValue({
      width: 500,
    });

    render(<UserCareerMenu />);

    expect(screen.getByText('Career')).toBeInTheDocument();
    expect(screen.getByText('New')).toBeInTheDocument();

    expect(screen.getByText('Career').closest('a')).toHaveClass('nav-link');
  });

  it('should not render career when enterprise dashboard exists', () => {
    (useInitializeLearnerHome).mockReturnValue({
      data: {
        enterpriseDashboard: { url: 'https://enterprise.example.com' },
      },
    });

    render(<UserCareerMenu />);

    expect(screen.queryByText('Career')).not.toBeInTheDocument();
  });

  it('should not render career when career URL is not configured', () => {
    (getAppConfig).mockReturnValue({
      CAREER_LINK_URL: '',
    });

    render(<UserCareerMenu />);

    expect(screen.queryByText('Career')).not.toBeInTheDocument();
  });
});