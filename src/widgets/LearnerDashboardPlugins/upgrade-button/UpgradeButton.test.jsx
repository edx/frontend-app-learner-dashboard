import { render, screen } from '@testing-library/react';

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

jest.mock('@openedx/frontend-base', () => ({
  defineMessages: (msgs) => msgs,
  useIntl: () => ({
    formatMessage: (
      messageDescriptor,
      values,
    ) => {
      const msg = messageDescriptor.defaultMessage || messageDescriptor.id || '';
      if (!values) return msg;
      return [msg, ...Object.values(values)];
    },
  }),
}));

describe('UpgradeButton', () => {
  const props = {
    cardId: 'cardId',
  };

  const upgradeUrl = 'upgradeUrl';
  const org = 'edX';
  const courseName = 'Demo Course';

  beforeEach(() => {
    jest.clearAllMocks();

    useCourseData.mockReturnValue({
      courseRun: {
        upgradeUrl,
        org,
        title: courseName,
      },
    });

    useActionDisabledState.mockReturnValue({
      disableUpgradeCourse: false,
    });
  });

  describe('render', () => {
    it('can upgrade', () => {
      render(<UpgradeButton {...props} />);

      const button = screen.getByRole('link', { name: /upgrade/i });

      expect(button).toBeInTheDocument();
      expect(button).toHaveAttribute('href', upgradeUrl);
      expect(button).not.toHaveAttribute('disabled');

      expect(useCourseTrackingEvent).toHaveBeenCalledWith(
        upgradeClicked,
        props.cardId,
        org,
        courseName,
        upgradeUrl,
      );
    });

    it('cannot upgrade', () => {
      useActionDisabledState.mockReturnValue({
        disableUpgradeCourse: true,
      });

      render(<UpgradeButton {...props} />);

      const button = screen.getByRole('button', { name: /upgrade/i });

      expect(button).toBeDisabled();
    });
  });
});