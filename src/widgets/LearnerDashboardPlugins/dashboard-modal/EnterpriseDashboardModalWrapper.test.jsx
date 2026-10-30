/* eslint-disable import/no-named-as-default-member */
import { shallow } from '@edx/react-unit-test-utils';
import { screen } from '@testing-library/react';

import { useInitializeLearnerHome } from '@src/data/hooks';
import render from '../setupTest';

import EnterpriseDashboardModalWrapper from './EnterpriseDashboardModalWrapper';

jest.mock('@src/data/hooks', () => ({
  useInitializeLearnerHome: jest.fn(),
}), { virtual: true });

jest.mock('@openedx/frontend-base', () => ({
  sendTrackEvent: jest.fn(),
}));

describe('EnterpriseDashboardModalWrapper', () => {
  describe('snapshot', () => {
    test('is not visible', () => {
      useInitializeLearnerHome.mockReturnValue({ data: { hasAvailableDashboards: false } });
      const wrapper = shallow(<EnterpriseDashboardModalWrapper />);
      expect(wrapper.snapshot).toMatchSnapshot();
    });
    test('is visible', () => {
      useInitializeLearnerHome.mockReturnValue({ data: { hasAvailableDashboards: true } });
      const wrapper = shallow(<EnterpriseDashboardModalWrapper />);
      expect(wrapper.snapshot).toMatchSnapshot();
    });
    test('closes properly', async () => {
      const enterpriseDashboardData = { label: 'edX, Inc.', url: '/edx-dashboard' };
      useInitializeLearnerHome.mockReturnValue({
        data: { hasAvailableDashboards: true, enterpriseDashboard: enterpriseDashboardData },
      });
      render(<EnterpriseDashboardModalWrapper />);
      expect(screen.getByText(
        'Start exploring the free courses available to you through the edX, Inc. dashboard.',
      )).toBeInTheDocument();
      const dismissButton = await screen.findByText('Dismiss');
      dismissButton.click();
      expect(await screen.queryByText(
        'Start exploring the free courses available to you through the edX, Inc. dashboard.',
      )).not.toBeInTheDocument();
    });
  });
});
