import React from 'react';
import { mergeConfig } from '@openedx/frontend-base';
import { injectIntl, IntlProvider } from '@openedx/frontend-base';
import {
  screen,
  render,
} from '@testing-library/react';

import { useInitializeLearnerHome } from 'data/hooks';
import UserDashboardMenu from './index'; // eslint-disable-line

jest.mock(
  'data/hooks',
  () => ({
    useInitializeLearnerHome: jest.fn(() => ({
      data: {
        enterpriseDashboard: null,
        hasAvailableDashboards: false,
      },
    })),
  }),
  { virtual: true },
);
mergeConfig({ ENABLE_EDX_PERSONAL_DASHBOARD: true });
const IntlUserDashboardMenu = injectIntl(UserDashboardMenu);

describe('User Dashboard Menu', () => {
  const Wrapper = children => (
    // eslint-disable-next-line react/jsx-filename-extension
    <IntlProvider locale="en">
      {children}
    </IntlProvider>
  );

  it('should render dashboard menu in the user menu dropdown', () => {
    useInitializeLearnerHome.mockReturnValueOnce({
      data: {
        enterpriseDashboard: {
          url: 'url',
          label: 'test',
        },
      },
    });
    render(Wrapper(<IntlUserDashboardMenu />));

    const dashboardSwitchMenu = screen.getByText('SWITCH DASHBOARD');
    const dashboardMenu = screen.getByText('Personal');
    expect(dashboardMenu).toBeTruthy();
    expect(dashboardSwitchMenu).toBeTruthy();
  });
});
