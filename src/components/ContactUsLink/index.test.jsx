import { render, screen } from '@testing-library/react';
import { IntlProvider } from '@edx/frontend-platform/i18n';

import ContactUsLink from '.';
import messages from './messages';

jest.mock('data/services/lms/urls', () => ({
  baseAppUrl: jest.fn((url) => `http://lms.test${url}`),
}));

describe('ContactUsLink', () => {
  it('links to the LMS Contact Us page', () => {
    render(<IntlProvider locale="en"><ContactUsLink /></IntlProvider>);
    const link = screen.getByRole('link', { name: new RegExp(messages.contactUsForm.defaultMessage) });
    expect(link).toHaveAttribute('href', 'http://lms.test/support/contact_us');
  });
});
