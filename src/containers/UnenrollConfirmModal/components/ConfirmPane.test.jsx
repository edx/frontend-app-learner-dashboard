import { render, screen } from '@testing-library/react';
import { formatMessage } from 'testUtils';
import { IntlProvider } from '@edx/frontend-platform/i18n';

import { reduxHooks } from 'hooks';
import { ConfirmPane } from './ConfirmPane';
import messages from './messages';

jest.mock('hooks', () => ({
  reduxHooks: {
    useCardCourseData: jest.fn(() => ({ courseName: 'course name' })),
    usePlatformSettingsData: jest.fn(() => ({})),
  },
}));

const props = {
  cardId: 'cardId',
  handleClose: jest.fn().mockName('props.handleClose'),
  handleConfirm: jest.fn().mockName('props.handleConfirm'),
};
const supportEmail = 'support@example.com';

const renderPane = () => render(<IntlProvider locale="en"><ConfirmPane {...props} /></IntlProvider>);

describe('UnenrollConfirmModal ConfirmPane', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    reduxHooks.usePlatformSettingsData.mockReturnValue({});
  });
  describe('refund policy change disabled', () => {
    beforeEach(() => {
      renderPane();
    });
    it('renders title', () => {
      const header = screen.getByText(formatMessage(messages.confirmHeader));
      expect(header).toBeInTheDocument();
    });
    it('renders cancel button', () => {
      const cancelButton = screen.getByRole('button', { name: formatMessage(messages.confirmCancel) });
      expect(cancelButton).toBeInTheDocument();
    });
    it('renders unenroll button', () => {
      const unenrollButton = screen.getByRole('button', { name: formatMessage(messages.confirmUnenroll) });
      expect(unenrollButton).toBeInTheDocument();
    });
    it('does not render the refund notice', () => {
      expect(screen.queryByTestId('refund-policy-notice')).not.toBeInTheDocument();
    });
  });
  describe('refund policy change enabled', () => {
    it('renders the refund notice with a support email link', () => {
      reduxHooks.usePlatformSettingsData.mockReturnValue({ refundPolicyChangeEnabled: true, supportEmail });
      renderPane();
      const notice = screen.getByTestId('refund-policy-notice');
      expect(notice).toBeInTheDocument();
      expect(screen.getByRole('link', { name: supportEmail })).toHaveAttribute('href', `mailto:${supportEmail}`);
    });
  });
});
