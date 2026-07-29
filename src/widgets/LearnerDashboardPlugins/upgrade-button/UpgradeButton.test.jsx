/* eslint-disable import/no-named-as-default-member */
/* eslint-disable import/no-named-as-default */
import { shallow } from '@edx/react-unit-test-utils';

import { useCourseData, useCourseTrackingEvent } from '@src/hooks';
import { useActionDisabledState } from './data/hooks';
import UpgradeButton from './UpgradeButton';
import { upgradeClicked } from '../tracking/trackers/upgradeButton';

const mockTrackUpgradeClick = jest.fn().mockName('trackUpgradeClick');

jest.mock('../tracking/trackers/upgradeButton', () => ({
  upgradeClicked: jest.fn().mockName('segment.trackUpgradeClicked'),
}));

jest.mock('@src/hooks', () => ({
  useCourseData: jest.fn(),
  useCourseTrackingEvent: jest.fn(() => mockTrackUpgradeClick),
}), { virtual: true });

jest.mock('./data/hooks', () => ({
  useActionDisabledState: jest.fn(() => ({ disableUpgradeCourse: false })),
  useIsCollapsed: jest.fn(() => false),
}));

describe('UpgradeButton', () => {
  const props = {
    cardId: 'cardId',
  };
  const upgradeUrl = 'upgradeUrl';
  const org = 'edX';
  const courseName = 'Demo Course';

  beforeEach(() => {
    useCourseData.mockReturnValue({ courseRun: { upgradeUrl, org, title: courseName } });
  });

  describe('snapshot', () => {
    test('can upgrade', () => {
      const wrapper = shallow(<UpgradeButton {...props} />);
      expect(wrapper.snapshot).toMatchSnapshot();
      expect(wrapper.instance.props.disabled).toEqual(false);
      expect(useCourseTrackingEvent).toHaveBeenCalledWith(
        upgradeClicked,
        props.cardId,
        org,
        courseName,
        upgradeUrl,
      );
      expect(wrapper.instance.props.onClick).toEqual(mockTrackUpgradeClick);
    });
    test('cannot upgrade', () => {
      useActionDisabledState.mockReturnValueOnce({ disableUpgradeCourse: true });
      const wrapper = shallow(<UpgradeButton {...props} />);
      expect(wrapper.snapshot).toMatchSnapshot();
      expect(wrapper.instance.props.disabled).toEqual(true);
    });
  });
});
