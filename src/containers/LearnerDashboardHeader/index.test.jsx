import { shallow } from 'enzyme';
import { AppContext } from '@edx/frontend-platform/react';

import { isDesktopSize } from 'data/responsive';

import LearnerDashboardHeader, { UserMenu } from '.';

jest.mock('@edx/frontend-platform/react', () => ({
  AppContext: {
    authenticatedUser: {
      username: 'test-username',
    },
  },
}));
jest.mock('containers/MasqueradeBar', () => 'MasqueradeBar');

jest.mock('./ConfirmEmailBanner', () => 'ConfirmEmailBanner');
jest.mock('./AuthenticatedUserDropdown', () => 'AuthenticatedUserDropdown');
jest.mock('./GreetingBanner', () => 'GreetingBanner');

describe('LearnerDashboardHeader', () => {
  describe('snapshots', () => {
    test('with collapsed', () => {
      isDesktopSize.mockReturnValueOnce(false);
      const wrapper = shallow(<LearnerDashboardHeader />);
      expect(wrapper).toMatchSnapshot();
    });
    test('without collapsed', () => {
      isDesktopSize.mockReturnValueOnce(true);
      const wrapper = shallow(<LearnerDashboardHeader />);
      expect(wrapper).toMatchSnapshot();
    });
  });

  describe('UserMenu', () => {
    describe('snapshots', () => {
      test('with authenticated user', () => {
        const wrapper = shallow(<UserMenu />);
        expect(wrapper).toMatchSnapshot();
      });
      test('without authenticated user', () => {
        AppContext.authenticatedUser = null;
        const wrapper = shallow(<UserMenu />);
        expect(wrapper).toMatchSnapshot();
      });
    });
  });
});
