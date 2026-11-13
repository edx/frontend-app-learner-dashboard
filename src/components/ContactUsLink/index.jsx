import React from 'react';

import { useIntl } from '@edx/frontend-platform/i18n';
import { Hyperlink } from '@openedx/paragon';

import { baseAppUrl } from 'data/services/lms/urls';

import messages from './messages';

export const contactUsPath = '/support/contact_us';

export const ContactUsLink = () => {
  const { formatMessage } = useIntl();
  return (
    <Hyperlink isInline target="_blank" destination={baseAppUrl(contactUsPath)}>
      {formatMessage(messages.contactUsForm)}
    </Hyperlink>
  );
};

export default ContactUsLink;
