/* eslint-disable import/no-named-as-default-member */
import { shallow } from '@edx/react-unit-test-utils';
import { useCourseData, useEntitlementInfo } from '@src/hooks';
import UpgradeButtonWrapper from './UpgradeButtonWrapper';

jest.mock('@src/hooks', () => ({
  useCourseData: jest.fn(() => ({
    enrollment: { isVerified: false, isExecEd2UCourse: false },
  })),
  useEntitlementInfo: jest.fn(() => ({
    isEntitlement: false,
  })),
}), { virtual: true });

describe('UpgradeButtonWrapper', () => {
  const props = {
    cardId: 'cardId',
  };
  describe('snapshot', () => {
    test('is visible', () => {
      const wrapper = shallow(<UpgradeButtonWrapper {...props} />);
      expect(wrapper.snapshot).toMatchSnapshot();
    });
    test('is not visible', () => {
      useCourseData.mockReturnValue({
        enrollment: { isVerified: true, isExecEd2UCourse: true },
      });
      useEntitlementInfo.mockReturnValue({
        isEntitlement: true,
      });
      const wrapper = shallow(<UpgradeButtonWrapper {...props} />);
      expect(wrapper.snapshot).toMatchSnapshot();
    });
  });
});
