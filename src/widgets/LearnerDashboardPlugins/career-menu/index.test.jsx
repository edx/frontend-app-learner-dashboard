import React from 'react';
import { mergeConfig } from '@openedx/frontend-base';
import { injectIntl, IntlProvider } from '@openedx/frontend-base';
import { screen, render } from '@testing-library/react';

import { useInitializeLearnerHome } from 'data/hooks';
import UserCareerMenu from './index'; // eslint-disable-line

jest.mock('data/hooks', () => ({
  useInitializeLearnerHome: jest.fn(() => ({
    data: {
      enterpriseDashboard: null,
      hasAvailableDashboards: false,
    },
  })),
}), { virtual: true });

mergeConfig({ CAREER_LINK_URL: 'edx.org/career' });
const IntlUserCareerMenu = injectIntl(UserCareerMenu);

describe('User Career Menu', () => {
  const Wrapper = children => (
    // eslint-disable-next-line react/jsx-filename-extension
    <IntlProvider locale="en">
      {children}
    </IntlProvider>
  );

  it('should render career in the user menu dropdown', () => {
    useInitializeLearnerHome.mockReturnValueOnce({
      data: { enterpriseDashboard: { url: 'url' } },
    });
    render(Wrapper(<IntlUserCareerMenu />));

    const careerMenu = screen.getByText('Career');
    const newAlert = screen.getByText('New');
    expect(careerMenu).toBeTruthy();
    expect(newAlert).toBeTruthy();
  });
});
