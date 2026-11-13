import { render, screen } from '@testing-library/react';
import { formatMessage } from 'testUtils';
import { IntlProvider } from '@edx/frontend-platform/i18n';

import { reduxHooks } from 'hooks';
import { ConfirmPane } from './ConfirmPane';
import messages from './messages';

jest.mock('hooks', () => ({
  reduxHooks: {
    useCardCourseData: jest.fn(() => ({ courseName: 'course name' })),
    useCardEnrollmentData: jest.fn(() => ({})),
  },
}));
jest.mock('data/services/lms/urls', () => ({
  baseAppUrl: jest.fn((url) => `http://lms.test${url}`),
}));

const props = {
  cardId: 'cardId',
  handleClose: jest.fn().mockName('props.handleClose'),
  handleConfirm: jest.fn().mockName('props.handleConfirm'),
};

const renderPane = () => render(<IntlProvider locale="en"><ConfirmPane {...props} /></IntlProvider>);

describe('UnenrollConfirmModal ConfirmPane', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    reduxHooks.useCardEnrollmentData.mockReturnValue({});
  });
  describe('order does not follow the refund policy change', () => {
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
  describe('order follows the refund policy change', () => {
    it('renders the refund notice with a link to the Contact Us form', () => {
      reduxHooks.useCardEnrollmentData.mockReturnValue({ refundPolicyChangeApplies: true });
      renderPane();
      const notice = screen.getByTestId('refund-policy-notice');
      expect(notice).toBeInTheDocument();
      expect(notice).toHaveTextContent('Unenrolling does not automatically issue a refund.');
      expect(notice).toHaveTextContent('within 7 days of your purchase');
      expect(screen.getByRole('link', { name: /Contact Us form/ }))
        .toHaveAttribute('href', 'http://lms.test/support/contact_us');
    });
    it('does not link to an email address', () => {
      reduxHooks.useCardEnrollmentData.mockReturnValue({ refundPolicyChangeApplies: true });
      renderPane();
      expect(screen.queryByRole('link', { name: /@/ })).not.toBeInTheDocument();
    });
  });
});
